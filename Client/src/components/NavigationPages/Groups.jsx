import React, { useState } from 'react';
import { 
  Search, 
  MessageSquare, 
  Send, 
  Image as ImageIcon, 
  Smile, 
  Phone,
  Video,
  Info
} from 'lucide-react';

const Groups = () => {
  // TODO: Replace this mock state with your Zustand store actions/state later
  const [chats, setChats] = useState([
    {
      _id: 'group_1',
      name: 'Goa Trip Expenses',
      lastMessage: 'Alex paid ₹4,500 for hotel booking',
      time: '12:45 PM',
      unreadCount: 3,
      isGroup: true,
      profilePic: '',
      members: [
        { name: 'You' }, 
        { name: 'Sarah' }, 
        { name: 'Alex' }
      ]
    },
    {
      _id: 'group_2',
      name: 'Flat 402 Rent & Utilities',
      lastMessage: 'Electricity bill is generated.',
      time: '11:20 AM',
      unreadCount: 0,
      isGroup: true,
      profilePic: '',
      members: [
        { name: 'You' }, 
        { name: 'Ganesh' }
      ]
    },
    {
      _id: 'chat_3',
      name: 'Sarah Jenkins',
      lastMessage: 'Let me check the receipts.',
      time: 'Yesterday',
      unreadCount: 1,
      isGroup: false,
      profilePic: ''
    }
  ]);

  const [activeChat, setActiveChat] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');
  
  // Local messages mock state (Connect to Zustand later)
  const [messages, setMessages] = useState([
    { _id: 'm1', sender: 'Sarah', text: 'Hey, did you calculate the split for yesterday?', time: '12:30 PM', isSender: false },
    { _id: 'm2', sender: 'You', text: 'Working on it right now, will update shortly.', time: '12:32 PM', isSender: true },
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeChat) return;

    const newMessage = {
      _id: Date.now().toString(),
      sender: 'You',
      text: messageInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSender: true
    };

    setMessages([...messages, newMessage]);
    setMessageInput('');
  };

  // Filter chats based on search input
  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen w-screen bg-black text-white overflow-hidden pt-16 md:pt-20">
      
      {/* LEFT SIDEBAR: Chat & Group List */}
      <div className="w-full md:w-[380px] lg:w-[420px] bg-[#0a0a0a] border-r border-[#2ee6a8]/20 flex flex-col h-full">
        
        {/* Search Bar */}
        <div className="p-3 bg-[#0a0a0a] pt-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-white/40">
              <Search className="w-4 h-4 text-[#2ee6a8]" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search or start new chat"
              className="w-full bg-black border border-[#2ee6a8]/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#2ee6a8]"
            />
          </div>
        </div>

        {/* Chat List Scrollable Area */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#2ee6a8]/10 mt-1">
          {filteredChats.length === 0 ? (
            <p className="text-white/40 text-xs text-center py-8">No chats or groups found.</p>
          ) : (
            filteredChats.map((chat) => (
              <div
                key={chat._id}
                onClick={() => setActiveChat(chat)}
                className={`flex items-center gap-3 p-3.5 cursor-pointer transition-colors ${
                  activeChat?._id === chat._id ? 'bg-[#2ee6a8]/10 border-l-4 border-[#2ee6a8]' : 'hover:bg-black/40'
                }`}
              >
                <div className="relative">
                  <img 
                    src={chat.profilePic || "/avatar.png"} 
                    alt="" 
                    className="w-12 h-12 rounded-full object-cover border border-[#2ee6a8]/30"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-semibold truncate text-white">{chat.name}</h4>
                    <span className="text-[10px] text-white/40">{chat.time}</span>
                  </div>
                  <p className="text-xs text-white/60 truncate">{chat.lastMessage}</p>
                </div>

                {chat.unreadCount > 0 && (
                  <span className="bg-[#2ee6a8] text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {chat.unreadCount}
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* RIGHT MAIN PANEL: Active Chat Window or Splash Screen */}
      <div className="flex-1 flex flex-col bg-black h-full">
        {activeChat ? (
          <>
            {/* Chat Top Nav */}
            <div className="h-16 px-6 bg-[#0a0a0a] border-b border-[#2ee6a8]/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src={activeChat.profilePic || "/avatar.png"} 
                  alt="" 
                  className="w-10 h-10 rounded-full object-cover border border-[#2ee6a8]/30"
                />
                <div>
                  <h3 className="text-sm font-semibold text-white">{activeChat.name}</h3>
                  <p className="text-[10px] text-[#2ee6a8] font-mono">
                    {activeChat.isGroup ? activeChat.members?.map(m => m.name).join(', ') : 'online'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-white/70">
                <button className="hover:text-[#2ee6a8] cursor-pointer" title="Voice Call"><Phone className="w-5 h-5" /></button>
                <button className="hover:text-[#2ee6a8] cursor-pointer" title="Video Call"><Video className="w-5 h-5" /></button>
                <button className="hover:text-[#2ee6a8] cursor-pointer" title="Group Info"><Info className="w-5 h-5" /></button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-black">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`flex flex-col ${msg.isSender ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-md px-4 py-2.5 rounded-2xl text-xs md:text-sm ${
                      msg.isSender
                        ? 'bg-[#2ee6a8] text-black font-medium rounded-tr-none'
                        : 'bg-[#0a0a0a] border border-[#2ee6a8]/30 text-white rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-white/40 mt-1 px-1">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Message Input Bar */}
            <form onSubmit={handleSendMessage} className="p-4 bg-[#0a0a0a] border-t border-[#2ee6a8]/20 flex items-center gap-3">
              <button type="button" className="text-white/60 hover:text-[#2ee6a8] cursor-pointer">
                <Smile className="w-6 h-6" />
              </button>
              <button type="button" className="text-white/60 hover:text-[#2ee6a8] cursor-pointer">
                <ImageIcon className="w-6 h-6" />
              </button>
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-black border border-[#2ee6a8]/30 rounded-xl px-4 py-3 text-xs md:text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#2ee6a8]"
              />
              <button
                type="submit"
                className="bg-[#2ee6a8] hover:bg-[#25b888] text-black p-3 rounded-xl transition-colors cursor-pointer flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </>
        ) : (
          /* Empty State Splash Screen */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-black">
            <div className="w-20 h-20 rounded-full bg-[#2ee6a8]/10 border border-[#2ee6a8]/30 flex items-center justify-center text-[#2ee6a8] mb-4">
              <MessageSquare className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">SplitSettle</h2>
            <p className="text-xs text-white/60 max-w-sm">
              Select Any Group From The Left Sidebar To Find The Trip Expenses.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Groups;