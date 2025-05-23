import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import ContactSection from './components/ContactSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import AdminLogin from './components/AdminLogin';
import ManagementDashboard from './components/ManagementDashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href').slice(1);
        const element = document.getElementById(id);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80, // Adjust for navbar height
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  // Public Website Component
  const PublicWebsite = () => (
    <div className="bg-white">
      <Navbar />
      <main className="pt-16"> {/* Add padding-top for fixed navbar */}
        <Hero />
        <About />
        <Services />
        <ContactSection />
        <CTASection />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
  };

  return (
    <Router>
      <Routes>
        {/* Public Website */}
        <Route path="/" element={<PublicWebsite />} />
        
        {/* Admin Login */}
        <Route 
          path="/admin/login" 
          element={
            isAuthenticated ? 
              <Navigate to="/admin/dashboard" replace /> : 
              <AdminLogin onLogin={setIsAuthenticated} />
          } 
        />
        
        {/* Management Dashboard */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <ManagementDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;