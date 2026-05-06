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
    <div className="relative isolate mx-auto flex h-svh max-h-svh w-full max-w-md flex-col overflow-hidden bg-white px-8 pb-24">
      <div className="shrink-0 pt-[max(0.75rem,env(safe-area-inset-top,0px))] pb-4">
        <div className="flex h-[40px] w-full items-center rounded-[11px] bg-[#ebeff5] px-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search messages..."
            className="w-full bg-transparent text-[16px] text-black outline-none"
          />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto [-webkit-overflow-scrolling:touch]">
        <div className="space-y-5 pb-2">
          {filtered.map((conversation) => (
            <button
              key={conversation.id}
              type="button"
              onClick={() => navigate(`/messages/chat/${conversation.id}`)}
              className="flex w-full items-center gap-4 text-left transition-opacity hover:opacity-80"
            >
              <div className="size-[52px] shrink-0 overflow-hidden rounded-full bg-[#ebeff5]">
                <img
                  src={conversation.image}
                  alt={conversation.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[17px] text-black">
                  {conversation.name}
                </p>
                <p className="truncate font-light text-[14px] text-black/70">
                  {conversation.lastMessage}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
