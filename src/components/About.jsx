import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="about" className="py-16 md:py-24 bg-gray-50">
      <div className="container-custom">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-10 items-center"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-jowers-blue">Welcome</span> to Jowers Auto Service
            </h2>
            <div className="space-y-4">
              <p className="text-lg text-gray-700">
                Jowers Auto Service, founded by Homer Jowers and Roscco Dollinger, was established January 2, 1959. Today, Jowers remains as one of Tallahassee's best auto repair shops specializing in AC, computer diagnostics, & electrical.
              </p>
              <p className="text-lg text-gray-700">
                Serving Tallahassee since 1959, Jowers is dedicated to providing its customers and community with the best service possible.
              </p>
              <p className="text-lg text-gray-700">
                Our team of experienced technicians are committed to maintaining the highest standards of quality and integrity, ensuring your vehicle receives the best care.
              </p>
            </div>
            <div className="mt-8">
              <motion.a 
                href="#services"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary inline-block"
              >
                Explore Our Services
              </motion.a>
            </div>
          </div>
          <div className="relative h-full">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="/about-image.svg" 
                alt="Auto Repair Shop Interior" 
                className="w-full h-auto rounded-lg"
              />
            </div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="absolute -bottom-8 -right-8 bg-white p-4 rounded-lg shadow-lg max-w-xs"
            >
              <p className="text-jowers-blue font-semibold">
                Over 60 years of trusted service in Tallahassee
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;