import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaSnowflake, FaLaptop, FaBolt, FaOilCan, FaTools, FaCar } from 'react-icons/fa';

const ServiceCard = ({ icon, title, description, delay }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
    >
      <div className="text-jowers-blue text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const Services = () => {
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true, amount: 0.3 });

  const services = [
    {
      icon: <FaSnowflake />,
      title: "AC Service & Repair",
      description: "Complete air conditioning diagnostics, repair, and maintenance to keep you cool in Tallahassee's heat."
    },
    {
      icon: <FaLaptop />,
      title: "Computer Diagnostics",
      description: "Advanced diagnostic equipment to accurately identify issues with your vehicle's computer systems."
    },
    {
      icon: <FaBolt />,
      title: "Electrical Systems",
      description: "Expert troubleshooting and repair of all vehicle electrical components and systems."
    },
    {
      icon: <FaOilCan />,
      title: "Preventative Maintenance",
      description: "Regular maintenance services to keep your vehicle running smoothly and prevent costly repairs."
    },
    {
      icon: <FaTools />,
      title: "General Repairs",
      description: "Comprehensive repair services for all makes and models, performed by our experienced technicians."
    },
    {
      icon: <FaCar />,
      title: "Check Engine Light",
      description: "Accurate diagnosis and resolution of check engine light issues to ensure your vehicle's optimal performance."
    }
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our <span className="text-jowers-blue">Expert</span> Services</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            We specialize in AC, computer diagnostics, and electrical systems, providing comprehensive auto repair services to keep your vehicle running at its best.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={0.2 + (index * 0.1)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-lg mb-6">
            Don't see what you need? We offer many more services!
          </p>
          <motion.a
            href="tel:850-224-3015"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary inline-block"
          >
            Call For More Information
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;