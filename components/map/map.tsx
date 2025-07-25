'use client';

import {GoogleMap, useJsApiLoader, Marker} from '@react-google-maps/api';
import {Point, ReactSketchCanvas, ReactSketchCanvasRef} from 'react-sketch-canvas';
import {useAnimationControls, AnimatePresence} from 'framer-motion';
import {toast} from 'sonner';
import {isMobile} from 'react-device-detect';

import {Button} from '@/components/ui/button';
import MapCursor from '@/components/map/map-cursor';

import api from '@/services/go-api.service';

import {useCallback, useEffect, useRef, useState} from 'react';
import {cn} from '@/lib/utils';
import {RefreshCcw} from 'lucide-react';
import Animated from '@/components/animated';
import {Property} from '@/types/property';
import {colors} from '@/constants';
import {ExtendedProperty} from '@/types/gpt/extended-property';

interface Props {
   centralPoint: Coordinate;
   width?: number | string;
   height?: number | string;
   drawable?: boolean;
   initialMarker?: boolean;
   setIsReady?(state: boolean): any;
   pointClick?(immobiles: Property[]): any;
   immobileClick?(property: ExtendedProperty): any;
   clickToDrawCallback?: any;
   onSearch?(ids: string[]): any;
   onReset?(): any;
   className?: string;
   propertyIds?: string[];
}

interface MarkerProps {
   lat: number | null;
   lng: number | null;
   count?: number;
}

const Map = ({
   centralPoint,
   width = '100%',
   height = '100%',
   drawable,
   initialMarker,
   setIsReady,
   pointClick,
   immobileClick,
   clickToDrawCallback,
   onSearch,
   onReset,
   className,
   propertyIds,
}: Props) => {
   const mapRef = useRef<google.maps.Map>(undefined);
   // const [markers] = useState<MarkerProps[]>([]);
   const [isDrawing, setIsDrawing] = useState(false);
   // const [drawPoints, setDrawPoints] = useState<Point[]>([]);
   // const [isLoading, setIsLoading] = useState(false);
   const [isMapLoaded, setIsMapLoaded] = useState(false);

   const [immobiles, setImmobiles] = useState<Property[]>([]);
   const [centralMarker, setCentralMarker] = useState<MarkerProps>({
      lat: null,
      lng: null,
   });
   const [internalCentralPoint, setInternalCentralPoint] = useState<Coordinate>({
      lat: centralPoint?.lat || -23.5846429,
      lng: centralPoint?.lng || -46.6830219,
   });
   const [cursor, setCursor] = useState<'default' | 'draw'>();
   const [, setIsFetching] = useState<boolean>(false);

   const polygonRef = useRef<google.maps.Polygon>(undefined);
   const polylineRef = useRef<google.maps.Polyline>(undefined);
   const drawerLoadedInterval = useRef<ReturnType<typeof setInterval>>(undefined);
   const verifyMapInterval = useRef<ReturnType<typeof setInterval>>(undefined);

   const cursorRootDivRef = useRef<Element>(undefined);

   const sketchRef = useRef<ReactSketchCanvasRef>(null);
   const mobilePolyRef = useRef<google.maps.Polygon>(null);
   const [mobileDrawingMode, setMobileDrawingMode] = useState(false);

   const clickToDrawControl = useAnimationControls();

   const {isLoaded} = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      libraries: ['places', 'drawing'],
      mapIds: ['6b38c9595e61f2a3', '4640df9248e8727f'],
   });

   function drawFreeHand() {
      if (!mapRef.current) return;

      if (polygonRef.current) polygonRef.current.setMap(null);

      let poly = new google.maps.Polyline({
         map: mapRef.current,
         clickable: false,
      });

      google.maps.event.addListener(mapRef.current, 'mousemove', function (e: google.maps.PolyMouseEvent) {
         poly.getPath().push(e.latLng!);
      });

      google.maps.event.addListenerOnce(mapRef.current, 'mouseup', async function () {
         setCursor('default');

         polylineRef.current?.setMap(null);
         poly.setMap(null);

         const path = poly.getPath();
         poly = new google.maps.Polygon({map: mapRef.current, paths: path});

         if (mapRef.current) {
            google.maps.event.clearListeners(mapRef.current, 'mousedown');
            google.maps.event.clearListeners(mapRef.current, 'mousemove');
         }

         polylineRef.current = poly;

         const coordinates: Coordinate[] = path.getArray().map((c) => ({
            lat: c.lat(),
            lng: c.lng(),
         }));

         const centralPointRef = await getImmobilesInRange(coordinates);

         if (centralPointRef?.lat !== 0 && centralPointRef?.lng !== 0) {
            setInternalCentralPoint(centralPointRef);
         } else {
            toast.warning('Não há imóveis nessa região.');
         }

         enable();
         setIsDrawing(false);
      });
   }

   function disable() {
      if (!mapRef.current) return;

      mapRef.current.setOptions({
         draggable: false,
         zoomControl: false,
         scrollwheel: false,
         disableDoubleClickZoom: false,
      });
   }

   function enable() {
      if (!mapRef.current) return;

      mapRef.current.setOptions({
         draggable: true,
         zoomControl: true,
         scrollwheel: true,
         disableDoubleClickZoom: true,
      });
   }

   const onLoad = useCallback(function callback(map: google.maps.Map) {
      map.setOptions({
         zoom: 15,
         minZoom: 12,
         maxZoom: 17,
         draggableCursor: 'default',
         draggingCursor: 'pointer',
      });
      mapRef.current = map;
   }, []);

   const onUnmount = useCallback(function callback() {
      mapRef.current = undefined;
   }, []);

   function clickToDraw(e: React.MouseEvent<HTMLButtonElement>) {
      if (!mapRef.current) return;
      setCursor('draw');
      if (polygonRef.current) polygonRef.current.setMap(null);
      clickToDrawControl.start({
         scale: 0.9,
      });
      setTimeout(() => {
         clickToDrawControl.start({
            scale: 1,
         });
      }, 100);
      e.preventDefault();
      disable();
      google.maps.event.addListener(mapRef.current, 'mousedown', function () {
         drawFreeHand();
      });
   }

   function mobileClickToDraw() {
      setMobileDrawingMode(true);
   }

   async function getImmobilesInRange(coordinates: Coordinate[]) {
      setIsFetching(true);

      try {
         const {
            data,
         }: {
            data: {
               count: number;
               immobiles: Property[];
               central_point: {
                  lat: number;
                  lng: number;
               };
            };
         } = await api.post('/get-all-in-range', {
            bounds: coordinates,
         });

         setImmobiles(data.immobiles);

         if (onSearch) onSearch(data.immobiles.map((i) => i.id));
         if (pointClick) {
            pointClick(data.immobiles);
         }

         setCentralMarker(data.central_point);
         return data.central_point;
      } catch (error) {
         console.log(error);
         toast.error('Erro ao buscar imóveis!');
         return null;
      } finally {
         setIsFetching(false);
      }
   }

   const getImmobilesFromIds = useCallback(
      async (ids: string[]) => {
         setIsFetching(true);

         try {
            const {
               data,
            }: {
               data: {
                  centralPoint: {
                     lat: number;
                     lng: number;
                  };
                  zoomFactor: number;
                  properties: Property[];
               };
            } = await api.post('/api/properties-by-ids', {
               property_ids: ids,
            });

            setImmobiles(data.properties);

            if (onSearch) onSearch(data.properties.map((i) => i.id));
            if (pointClick) {
               pointClick(data.properties);
            }

            if (mapRef?.current)
               mapRef.current.setOptions({
                  zoom: data.zoomFactor,
               });
            setInternalCentralPoint(data.centralPoint);
            return data.centralPoint;
         } catch (error) {
            console.log(error);
            toast.error('Erro ao buscar imóveis!');
            return null;
         } finally {
            setIsFetching(false);
         }
      },
      [onSearch, pointClick],
   );

   function onZoomChanged() {
      // const zoom = mapRef.current?.getZoom() || 15;
      // let threshold = 0.01;
      // switch (zoom) {
      //   case 17:
      //     threshold = 0;
      //     break;
      //   case 16:
      //     threshold = 0.001;
      //     break;
      //   case 15:
      //     threshold = 0.01;
      //     break;
      // }
      // let headCoordinates = markers.sort((a, b) => {
      //   return Number(
      //     (a.lat ?? 0) - (b.lat ?? 0) < threshold ||
      //       (a.lat ?? 0) - (b.lat ?? 0) < threshold * -1
      //   );
      // });
      // headCoordinates = headCoordinates.length > 0 ? headCoordinates : markers;
   }

   function verifyMapAndRemoveCursor() {
      const active = document.querySelector('.gm-style-moc');
      const prev = active?.previousElementSibling;

      if (prev) {
         cursorRootDivRef.current = prev;
         setCursor('default');
         clearInterval(verifyMapInterval.current);
      }
   }

   function clickToDrawButton(e: React.MouseEvent<HTMLButtonElement>) {
      if (isMobile) {
         mobileClickToDraw();
      } else {
         clickToDraw(e);
      }
      setIsDrawing(true);
      if (clickToDrawCallback) clickToDrawCallback();
   }

   const handleFinishMobileDrawing = async () => {
      if (mobileDrawingMode && sketchRef.current) {
         if (mobilePolyRef.current) mobilePolyRef.current.setMap(null);

         const coordinates = extractCoordinatesFromPaths(Array.from(await sketchRef.current.exportPaths())[0].paths);
         setMobileDrawingMode(false);
         const centralPointAux = await getImmobilesInRange(coordinates);
         setInternalCentralPoint({
            lat: centralPointAux!.lat,
            lng: centralPointAux!.lng,
         });

         mobilePolyRef.current = new google.maps.Polygon({
            map: mapRef.current,
            paths: coordinates,
         });

         setIsDrawing(false);
      }
   };

   const pixelToLatlng = function (xcoor: number, ycoor: number): google.maps.LatLng | {lat: () => number; lng: () => number} {
      if (!mapRef.current) return {lat: () => 0, lng: () => 0};

      const bounds = mapRef.current.getBounds();
      const projection = mapRef.current.getProjection();

      if (!bounds || !projection) return {lat: () => 0, lng: () => 0};

      const ne = bounds.getNorthEast();
      const sw = bounds.getSouthWest();
      const topRight = projection.fromLatLngToPoint(ne);
      const bottomLeft = projection.fromLatLngToPoint(sw);

      if (!topRight || !bottomLeft) return {lat: () => 0, lng: () => 0};

      const scale = 1 << (mapRef.current.getZoom() || 0);

      const newLatlng = projection.fromPointToLatLng(new google.maps.Point(xcoor / scale + bottomLeft.x, ycoor / scale + topRight.y));

      return newLatlng || {lat: () => 0, lng: () => 0};
   };

   const extractCoordinatesFromPaths = (paths: Point[]) => {
      const coordinates: {lat: number; lng: number}[] = [];

      paths.map((path) => {
         const latLng = pixelToLatlng(path.x, path.y);

         coordinates.push({
            lat: latLng.lat(),
            lng: latLng.lng(),
         });
      });

      return coordinates;
   };

   function reset() {
      setImmobiles([]);
      setCentralMarker({lat: null, lng: null});

      if (polygonRef.current) {
         polygonRef.current.setMap(null);
         polygonRef.current = undefined;
      }

      if (polylineRef.current) {
         polylineRef.current.setMap(null);
         polylineRef.current = undefined;
      }

      setIsDrawing(false);

      if (onReset) onReset();
   }

   useEffect(() => {
      if (typeof window !== 'undefined' && isLoaded && !isMapLoaded) {
         setIsMapLoaded(true);
         if (setIsReady) setIsReady(true);
      }
   }, [isLoaded, isMapLoaded, setIsReady]);

   useEffect(() => {
      if (cursorRootDivRef.current) {
         const element = cursorRootDivRef.current as HTMLElement;
         switch (cursor) {
            case 'default':
               element.style.cursor = 'default';
               break;
            case 'draw':
               element.style.cursor = 'none';
               break;
            default:
               element.style.cursor = 'default';
               break;
         }
      }
   }, [cursor]);

   useEffect(() => {
      if (propertyIds && propertyIds.length > 0) {
         getImmobilesFromIds(propertyIds);
      }
   }, [propertyIds, getImmobilesFromIds]);

   useEffect(() => {
      drawerLoadedInterval.current = setInterval(() => {
         if (document.querySelector("[title^='Draw a shape']")) {
            if (setIsReady) setIsReady(true);
         }
      }, 500);

      verifyMapInterval.current = setInterval(verifyMapAndRemoveCursor, 100);

      // eslint-disable-next-line react-hooks/exhaustive-deps
      clickToDrawCallback = isMobile ? mobileClickToDraw : clickToDraw;

      return () => {
         clearInterval(verifyMapInterval.current);
      };
   }, []);

   return (
      isLoaded && (
         <>
            <GoogleMap
               mapContainerStyle={{
                  width,
                  height,
               }}
               center={{
                  lat: internalCentralPoint?.lat || 0,
                  lng: internalCentralPoint?.lng || 0,
               }}
               options={{streetViewControl: false, cameraControl: false, fullscreenControl: false}}
               onLoad={onLoad}
               onUnmount={onUnmount}
               onZoomChanged={onZoomChanged}
               onDragEnd={() => {
                  const center = mapRef.current?.getCenter();

                  setInternalCentralPoint({
                     lat: center?.lat() || 0,

                     lng: center?.lng() || 0,
                  });
               }}
               mapContainerClassName={cn('cursor-none rounded-radius relative', className)}
            >
               {cursor === 'draw' && <MapCursor />}

               {centralPoint && initialMarker && (
                  <Marker
                     position={{
                        lat: centralPoint.lat,
                        lng: centralPoint.lng,
                     }}
                     icon={{
                        path: 'M 0, 0 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0',
                        strokeColor: colors.secondary,
                        strokeWeight: 2,
                        strokeOpacity: 0.5,
                        fillColor: colors.primary,
                        fillOpacity: 0.75,
                        scale: 25,
                     }}
                     animation={google.maps.Animation.DROP}
                     // onClick={immobileClick}
                     zIndex={99999}
                  />
               )}

               {/* {centralMarker.lat !== null && centralMarker.lng !== null && (
                  <Marker
                     position={{
                        lat: centralMarker.lat,
                        lng: centralMarker.lng,
                     }}
                     icon={{
                        path: 'M 0, 0 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0',
                        strokeColor: colors.secondary,
                        strokeWeight: 2,
                        strokeOpacity: 0.5,
                        fillColor: colors.primary,
                        fillOpacity: 1,
                        scale: 10,
                     }}
                     animation={google.maps.Animation.DROP}
                     opacity={1}
                     label={{
                        text: immobiles.length.toString(),
                        color: 'white',
                        fontFamily: 'Helvetica Neue',
                        fontSize: '1.25rem',
                     }}
                     onClick={() => pointClick && pointClick(immobiles)}
                  />
               )} */}

               {immobiles?.map((i) => (
                  <Marker
                     key={i.id}
                     position={{
                        lat: i?.location?.coordinates?.[0] ?? 0,
                        lng: i?.location?.coordinates?.[1] ?? 0,
                     }}
                     icon={{
                        path: 'M 0, 0 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0',
                        strokeColor: 'rgb(30,140,110)',
                        strokeWeight: 2,
                        strokeOpacity: 0.5,
                        fillColor: 'rgb(60,166,134)',
                        fillOpacity: 1,
                        scale: 7,
                     }}
                     animation={google.maps.Animation.DROP}
                     opacity={1}
                     label={{
                        text: '1',
                        color: 'white',
                        fontFamily: 'Helvetica Neue',
                        fontSize: '1.25rem',
                     }}
                     onClick={() => immobileClick && immobileClick(i)}
                  />
               ))}

               <AnimatePresence>
                  {drawable && (
                     // <Animated
                     //   exit={{
                     //     scale: 0.75,
                     //     opacity: 0,
                     //   }}
                     //   animate={clickToDrawControl}
                     // >
                     <span className="flex items-center gap-2 absolute bottom-8 left-8 z-10">
                        <Button aria-label={isDrawing ? 'Arraste para desenhar' : 'Clique para desenhar'} size="lg" onClick={clickToDrawButton}>
                           {isDrawing ? 'Arraste para desenhar' : 'Clique para desenhar'}
                        </Button>
                        <AnimatePresence>
                           {centralMarker.lat !== null && centralMarker.lng !== null && (
                              <Animated direction="bottom">
                                 <Button className="p-5" onClick={reset}>
                                    <RefreshCcw />
                                    Limpar
                                 </Button>
                              </Animated>
                           )}
                        </AnimatePresence>
                     </span>
                     // </Animated>
                  )}
               </AnimatePresence>

               {mobileDrawingMode && (
                  <ReactSketchCanvas
                     ref={sketchRef}
                     strokeColor="black"
                     strokeWidth={3}
                     canvasColor="transparent"
                     onStroke={(path) => {
                        if (path.paths.length > 1) {
                           handleFinishMobileDrawing();
                        }
                     }}
                     style={{
                        position: 'fixed',
                        top: mobileDrawingMode ? 0 : '-100%',
                        left: mobileDrawingMode ? 0 : '-100%',
                     }}
                  />
               )}
            </GoogleMap>
            {/* <AnimatePresence>
               {isFetching && (
                  <motion.div
                     className="fixed top-0 left-0 w-screen h-screen bg-background/75 flex items-center justify-center z-50"
                     initial={{
                        opacity: 0,
                     }}
                     animate={{
                        opacity: 1,
                     }}
                     exit={{
                        opacity: 0,
                     }}
                  >
                     <Loader />
                  </motion.div>
               )}
            </AnimatePresence> */}
         </>
      )
   );
};

export default Map;
