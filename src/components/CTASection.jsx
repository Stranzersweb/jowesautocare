import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaPhoneAlt } from 'react-icons/fa';

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-16 bg-jowers-blue text-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between"
        >
          <div className="mb-8 md:mb-0 md:mr-8 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Experience Quality Auto Service?</h2>
            <p className="text-white/90 text-lg max-w-xl">
              Call us today or stop by our Pershing Street location and allow us to serve you!
            </p>
          </div>
          <motion.a
            href="tel:850-224-3015"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-jowers-blue px-6 py-4 rounded-md font-semibold text-lg flex items-center shadow-lg"
          >
            <FaPhoneAlt className="mr-2" />
            Call Now: 850-224-3015
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;