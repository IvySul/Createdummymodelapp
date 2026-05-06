import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import BottomNav from '../components/BottomNav';
import { conversations } from '../data/chatConversations';

export default function Messages() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return conversations;
    return conversations.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.lastMessage.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="relative isolate mx-auto min-h-screen w-full max-w-md overflow-x-hidden bg-white px-8 pb-24">
      <div className="pt-12 mb-8">
        <div className="bg-[#ebeff5] h-[43px] rounded-[11px] px-4 flex items-center w-full">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search messages..."
            className="bg-transparent text-[16px] text-black outline-none w-full"
          />
        </div>
      </div>

      <div className="space-y-6">
        {filtered.map((conversation) => (
          <button
            key={conversation.id}
            type="button"
            onClick={() => navigate(`/messages/chat/${conversation.id}`)}
            className="flex items-center gap-4 w-full text-left hover:opacity-80 transition-opacity"
          >
            <div className="size-[58px] rounded-full overflow-hidden bg-[#ebeff5] flex-shrink-0">
              <img
                src={conversation.image}
                alt={conversation.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[18px] text-black truncate">
                {conversation.name}
              </p>
              <p className="font-light text-[15px] text-black/70 truncate">
                {conversation.lastMessage}
              </p>
            </div>
          </button>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
