import {Pencil} from 'lucide-react';
import {useRef, useEffect} from 'react';

const CustomCursor = () => {
   const cursorRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (cursorRef.current == null || cursorRef == null) return;
      document.addEventListener('mousemove', (e) => {
         if (cursorRef.current == null) return;

         cursorRef.current.setAttribute('style', 'top: ' + e.clientY + 'px; left: ' + e.clientX + 'px;');
      });
      document.addEventListener('click', () => {
         if (cursorRef.current == null) return;
         cursorRef.current.classList.add('scale-150');
         setTimeout(() => {
            if (cursorRef.current == null) return;
            cursorRef.current.classList.remove('scale-150');
         }, 500);
      });
   }, []);

   return (
      <div
         className="fixed pointer-events-none w-8 h-8 rounded-standard bg-accent/25 backdrop-blur-sm border border-accent/20 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-transform duration-200"
         ref={cursorRef}
      >
         <Pencil className="text-accent w-3 h-3" />
      </div>
   );
};
export default CustomCursor;
