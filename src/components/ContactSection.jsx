import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="location" className="py-16 md:py-24 bg-gray-50">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Visit <span className="text-jowers-blue">Jowers</span> Auto Service</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            We're conveniently located in Tallahassee and ready to serve you with quality auto repair services.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center mb-4">
              <FaPhone className="text-jowers-blue text-2xl mr-3" />
              <h3 className="text-xl font-bold">Contact Us</h3>
            </div>
            <p className="text-gray-600 mb-4">Have questions? Give us a call today!</p>
            <a 
              href="tel:850-224-3015" 
              className="text-xl font-semibold text-jowers-blue hover:underline block mb-2"
            >
              850-224-3015
            </a>
            <a 
              href="tel:224-3015" 
              className="text-gray-600 hover:text-jowers-blue"
            >
              Call 224-3015 locally
            </a>
          </motion.div>

          {/* Location Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center mb-4">
              <FaMapMarkerAlt className="text-jowers-blue text-2xl mr-3" />
              <h3 className="text-xl font-bold">Location</h3>
            </div>
            <address className="not-italic text-gray-600 mb-4">
              230 E. Pershing Street<br />
              Tallahassee, FL 32301
            </address>
            <a 
              href="https://maps.google.com/?q=230+E.+Pershing+Street+Tallahassee+FL+32301" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-jowers-blue font-semibold hover:underline inline-flex items-center"
            >
              View on Google Maps
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </motion.div>

          {/* Hours of Operation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center mb-4">
              <FaClock className="text-jowers-blue text-2xl mr-3" />
              <h3 className="text-xl font-bold">Hours of Operation</h3>
            </div>
            <div className="space-y-2 text-gray-600">
              <p className="flex justify-between">
                <span>Monday - Friday:</span>
                <span className="font-semibold">8:00 AM - 5:30 PM</span>
              </p>
              <p className="flex justify-between">
                <span>Saturday:</span>
                <span className="font-semibold">Closed</span>
              </p>
              <p className="flex justify-between">
                <span>Sunday:</span>
                <span className="font-semibold">Closed</span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 rounded-lg overflow-hidden shadow-lg"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3440.100874864199!2d-84.28304368489152!3d30.438988081737273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88ecf57a91d1905f%3A0x9cd6d567b9416343!2s230%20E%20Pershing%20St%2C%20Tallahassee%2C%20FL%2032301!5e0!3m2!1sen!2sus!4v1621436993684!5m2!1sen!2sus" 
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy"
            title="Jowers Auto Service Location"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;