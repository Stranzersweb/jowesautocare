import { FaPhone, FaMapMarkerAlt, FaClock, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-jowers-dark text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Tagline */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <img src="/logo-white.svg" alt="Jowers Auto Service" className="h-12 mr-3" />
              <span className="font-cursive text-2xl">Jowers</span>
            </div>
            <p className="text-gray-300 mb-6">
              Serving Tallahassee with quality auto repair since 1959.
            </p>
            <a 
              href="https://www.facebook.com/jowersautoservice" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-jowers-light-blue transition-colors inline-block"
              aria-label="Facebook"
            >
              <FaFacebook size={24} />
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors">Our Services</a></li>
              <li><a href="#location" className="text-gray-300 hover:text-white transition-colors">Location</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaPhone className="text-jowers-light-blue mt-1 mr-3" />
                <div>
                  <a href="tel:850-224-3015" className="text-gray-300 hover:text-white transition-colors">850-224-3015</a>
                </div>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-jowers-light-blue mt-1 mr-3" />
                <div>
                  <a 
                    href="https://maps.google.com/?q=230+E.+Pershing+Street+Tallahassee+FL+32301" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    230 E. Pershing Street<br />
                    Tallahassee, FL 32301
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-bold mb-4">Hours of Operation</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <FaClock className="text-jowers-light-blue mt-1 mr-3" />
                <div>
                  <span className="block text-gray-300">Monday - Friday</span>
                  <span className="block text-white">8:00 AM - 5:30 PM</span>
                </div>
              </li>
              <li className="flex items-start">
                <FaClock className="text-jowers-light-blue mt-1 mr-3 opacity-0" />
                <div>
                  <span className="block text-gray-300">Saturday & Sunday</span>
                  <span className="block text-white">Closed</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Jowers Auto Service. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm">
            Proudly serving Tallahassee for over 60 years.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;