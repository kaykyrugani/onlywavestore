export const heroVariants = {
  slice: {
    hidden: {
      clipPath: 'inset(100% 0 0 0)',
    },
    visible: (i) => ({
      clipPath: 'inset(0% 0 0 0)',
      transition: {
        duration: 0.8,
        ease: [0.645, 0.045, 0.355, 1.0],
        delay: i * 0.2,
      },
    }),
  },
  image: {
    hidden: {
      scale: 1.2,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
  },
}; 