import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { heroVariants } from './variants/heroVariants';

const HeroImageReveal = ({ imageSrc }) => {
  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-3 w-full h-full">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="relative h-full overflow-hidden"
            variants={heroVariants.slice}
            initial="hidden"
            animate="visible"
            custom={index}
          >
            <motion.div
              className="absolute inset-0"
              variants={heroVariants.image}
              style={{
                backgroundImage: `url(${imageSrc})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                left: `${-100 * index}%`,
                right: `${100 * (2 - index)}%`
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

HeroImageReveal.propTypes = {
  imageSrc: PropTypes.string.isRequired
};

export default HeroImageReveal; 