import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IoChatbubbleEllipsesOutline, 
  IoClose, 
  IoSend, 
  IoCarSport,
  IoPerson
} from 'react-icons/io5';
import { sendChatMessage } from '../utils/chatAPI';
import ChatMessage from './ChatMessage';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm here to help you with any questions about Jower's Auto Service. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const botResponse = await sendChatMessage(inputMessage, messages);
      
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: messages.length + 2,
        text: "I'm sorry, I'm having trouble connecting right now. Please try again or contact us directly at (555) 123-4567.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What services do you offer?",
    "What are your hours?",
    "How much does an oil change cost?",
    "Do you offer warranties?",
    "Can I get a quote?"
  ];

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
    setTimeout(handleSendMessage, 100);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white transition-colors duration-300 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <IoClose size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <IoChatbubbleEllipsesOutline size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-40 w-96 h-[32rem] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <IoCarSport className="text-blue-600" size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold">Jower's Auto Assistant</h3>
                  <p className="text-blue-100 text-sm">How can we help you today?</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              
              {/* Quick Questions (show only initially) */}
              {messages.length === 1 && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 font-medium">Quick questions:</p>
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="block w-full text-left p-2 text-sm bg-white hover:bg-blue-50 border border-gray-200 rounded-lg transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex items-center space-x-2 text-gray-500">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                  </div>
                  <span className="text-sm">Assistant is typing...</span>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about our services..."
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <IoSend size={16} />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Powered by AI • Available 24/7
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;