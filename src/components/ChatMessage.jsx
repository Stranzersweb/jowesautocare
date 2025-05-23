import { motion } from 'framer-motion';
import { IoCarSport, IoPerson } from 'react-icons/io5';

const ChatMessage = ({ message }) => {
  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div
      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} space-x-2`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {message.isBot && (
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
          <IoCarSport className="text-white" size={14} />
        </div>
      )}
      
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
        message.isBot 
          ? 'bg-white border border-gray-200 text-gray-800' 
          : 'bg-blue-600 text-white'
      }`}>
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
        <p className={`text-xs mt-1 ${
          message.isBot ? 'text-gray-500' : 'text-blue-100'
        }`}>
          {formatTime(message.timestamp)}
        </p>
      </div>

      {!message.isBot && (
        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
          <IoPerson className="text-white" size={14} />
        </div>
      )}
    </motion.div>
  );
};

export default ChatMessage;