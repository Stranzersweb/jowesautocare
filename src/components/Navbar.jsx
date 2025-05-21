import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaPhone } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#0a1c34]/90 backdrop-blur-sm py-4' : 'bg-[#0a1c34] shadow-lg py-3'}`}>
      <div className="container-custom flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="inline-block">
            <div className="bg-white p-3 rounded-md">
              <span className="font-bold text-jowers-blue text-base leading-none block">Jowers</span>
              <span className="text-xs text-jowers-blue font-semibold tracking-wider leading-tight block">AUTO SERVICE</span>
            </div>
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center">
          <a href="#about" className="text-white hover:text-jowers-light-blue transition-colors px-5">About</a>
          <a href="#services" className="text-white hover:text-jowers-light-blue transition-colors px-5">Services</a>
          <a href="#location" className="text-white hover:text-jowers-light-blue transition-colors px-5">Location</a>
          <motion.a 
            href="tel:850-224-3015"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center bg-jowers-blue text-white px-4 py-2 rounded-md font-medium ml-4"
          >
            <FaPhone className="mr-2" />
            <span>850-224-3015</span>
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-[#0a1c34] border-t border-gray-700"
        >
          <div className="container-custom py-4 flex flex-col space-y-4">
            <a href="#about" className="block py-2 text-white hover:text-jowers-light-blue" onClick={() => setIsOpen(false)}>About</a>
            <a href="#services" className="block py-2 text-white hover:text-jowers-light-blue" onClick={() => setIsOpen(false)}>Services</a>
            <a href="#location" className="block py-2 text-white hover:text-jowers-light-blue" onClick={() => setIsOpen(false)}>Location</a>
            <a 
              href="tel:850-224-3015" 
              className="flex items-center justify-center bg-jowers-blue text-white px-4 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              <FaPhone className="mr-2" />
              <span>850-224-3015</span>
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;