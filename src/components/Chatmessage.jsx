const ChatMessage = ({ message, isOwnMessage, showAvatar = true }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const getInitials = (username) => {
    if (!username) return "U";
    return username.substring(0, 2).toUpperCase();
  };

  return (
    <div className={`flex gap-3 mb-4 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      {showAvatar && (
        <div className={`flex-shrink-0 ${isOwnMessage ? 'order-last' : ''}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${
            isOwnMessage ? 'bg-blue-600' : 'bg-gray-700'
          }`}>
            {getInitials(message.username)}
          </div>
        </div>
      )}

      {/* Message Content */}
      <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'} max-w-[70%]`}>
        {/* Username and Time */}
        <div className={`flex items-center gap-2 mb-1 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="text-gray-400 text-xs font-medium">
            {message.username}
          </span>
          <span className="text-gray-500 text-xs">
            {formatTime(message.timestamp)}
          </span>
        </div>

        {/* Message Bubble */}
        <div className={`rounded-lg px-4 py-2 break-words ${
          isOwnMessage
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-gray-800 text-white rounded-bl-none'
        }`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
        </div>

        {/* Message Status (for own messages) */}
        {isOwnMessage && message.status && (
          <div className="mt-1 text-xs text-gray-500">
            {message.status === 'sending' && '⏳ Sending...'}
            {message.status === 'sent' && '✓ Sent'}
            {message.status === 'delivered' && '✓✓ Delivered'}
            {message.status === 'read' && '✓✓ Read'}
            {message.status === 'failed' && '❌ Failed'}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;