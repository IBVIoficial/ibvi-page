/* eslint-disable react/display-name */
'use client';

import React, {forwardRef} from 'react';
import {motion, HTMLMotionProps} from 'framer-motion';

interface AnimatedProps extends HTMLMotionProps<'div'> {
   children: React.ReactNode;
   direction?: 'left' | 'right' | 'top' | 'bottom';
   delay?: number;
   incorporate?: boolean;
   className?: string;
   layout?: boolean;
}

const Animated = forwardRef<HTMLDivElement, AnimatedProps>(({children, incorporate = true, direction = 'top', delay = 0, className, layout, ...props}, ref) => {
   const variants = {
      hidden: {
         opacity: 0,
         x: direction === 'left' ? -25 : direction === 'right' ? 25 : 0,
         y: direction === 'top' ? -25 : direction === 'bottom' ? 25 : 0,
         ...((props.initial && typeof props.initial === 'object' && props.initial) as any),
      },
      visible: {
         opacity: 1,
         x: 0,
         y: 0,
         transition: {
            type: 'spring',
            mass: 0.1,
            delay: delay,
         },
         ...((props.animate && typeof props.animate === 'object' && props.animate) as any),
      },
      exit: {
         opacity: 0,
         x: direction === 'left' ? -25 : direction === 'right' ? 25 : 0,
         y: direction === 'top' ? -25 : direction === 'bottom' ? 25 : 0,
         ...((props.exit && typeof props.exit === 'object' && props.exit) as any),
      },
   };

   if (!incorporate) {
      return (
         <motion.div ref={ref} initial="hidden" exit="exit" variants={variants} className={className} layout={layout} {...props} animate="visible">
            {children}
         </motion.div>
      );
   }

   const MotionComponent = motion(
      forwardRef((props: React.HTMLAttributes<HTMLDivElement>, innerRef: React.Ref<HTMLDivElement>) => (
         <div ref={innerRef} {...props}>
            {children}
         </div>
      )),
   );

   return <MotionComponent ref={ref} initial="hidden" animate="visible" exit="exit" variants={variants} className={className} layout={layout} {...props} />;
});

Animated.displayName = 'Animated';

export default Animated;

export const ScaleFade = {
   hidden: {opacity: 0, scale: 0.95},
   visible: (i = 0) => ({
      opacity: 1,
      scale: 1,
      transition: {
         duration: 1,
         delay: i * 0.2,
         ease: 'easeOut',
      },
   }),
};

export const FadeInUp = {
   hidden: {opacity: 0, y: 20},
   visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
         duration: 0.8,
         delay: i * 0.2,
         ease: 'easeOut',
      },
   }),
};
