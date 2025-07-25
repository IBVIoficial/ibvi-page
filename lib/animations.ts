export const fadeIn = {
   initial: {opacity: 0},
   animate: {opacity: 1},
   exit: {opacity: 0},
};

export const slideUp = {
   initial: {opacity: 0, y: 20},
   animate: {opacity: 1, y: 0},
   exit: {opacity: 0, y: -20},
};

export const slideRight = {
   initial: {opacity: 0, x: -20},
   animate: {opacity: 1, x: 0},
   exit: {opacity: 0, x: -20},
};

export const slideLeft = {
   initial: {opacity: 0, x: 20},
   animate: {opacity: 1, x: 0},
   exit: {opacity: 0, x: 20},
};

export const scale = {
   initial: {opacity: 0, scale: 0.9},
   animate: {opacity: 1, scale: 1},
   exit: {opacity: 0, scale: 0.9},
};

export const staggerChildren = {
   animate: {
      transition: {
         staggerChildren: 0.07,
      },
   },
};

export const springTransition = {
   type: 'spring',
   stiffness: 300,
   damping: 30,
};

export const easeTransition = {
   type: 'tween',
   ease: 'easeInOut',
   duration: 0.3,
};
