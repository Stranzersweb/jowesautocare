import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const Hero = () => {
  return (
    <section className="relative h-screen">
      {/* Hero Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="w-full h-full bg-jowers-navy">
          <img 
            src="/hero-background.svg" 
            alt="Jowers Auto Service Shop" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-jowers-navy/90 via-jowers-navy/80 to-jowers-navy/90"></div>
      </div>

      {/* Hero Content */}
      <div className="container-custom h-full flex flex-col justify-center items-start relative z-10 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="font-cursive text-5xl md:text-7xl text-white">Tallahassee's</span>
            <br />
            Premier Auto Service
            <br />
            <span className="text-jowers-light-blue">Since 1959</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-lg">
            Specializing in AC, computer diagnostics, and electrical repairs with a commitment to quality service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.a 
              href="#services"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center justify-center"
            >
              Our Services
              <FaArrowRight className="ml-2" />
            </motion.a>
            <motion.a 
              href="tel:850-224-3015"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-jowers-blue px-6 py-3 rounded-md font-medium flex items-center justify-center"
            >
              Call Now: 850-224-3015
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;