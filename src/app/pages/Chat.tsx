import { useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import { ChevronLeft } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { conversations, type ChatBubble } from '../data/chatConversations';

export default function Chat() {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const [draft, setDraft] = useState('');
  const [thread, setThread] = useState<ChatBubble[]>([]);

  const conversation = useMemo(
    () => conversations.find((c) => String(c.id) === conversationId),
    [conversationId]
  );

  useEffect(() => {
    if (conversation) setThread(conversation.messages);
  }, [conversation]);

  if (!conversationId || !conversation) {
    return <Navigate to="/messages" replace />;
  }

  const sendMessage = () => {
    const text = draft.trim();
    if (!text) return;
    setThread((prev) => [...prev, { id: `local-${Date.now()}`, text, fromMe: true }]);
    setDraft('');
  };

  return (
    <div className="bg-white relative min-h-screen w-full max-w-md mx-auto flex flex-col pb-24">
      <div className="flex items-center gap-3 px-6 pt-12 pb-4 border-b border-[#e5e5e5]">
        <button type="button" onClick={() => navigate('/messages')} className="p-1 -ml-1">
          <ChevronLeft className="size-8" />
        </button>
        <button
          type="button"
          onClick={() => navigate('/profile')}
          className="flex items-center gap-3 min-w-0 flex-1 text-left"
        >
          <div className="size-11 rounded-full overflow-hidden bg-[#ebeff5] shrink-0">
            <img src={conversation.image} alt="" className="w-full h-full object-cover" />
          </div>
          <span className="text-[20px] text-black truncate">
            {conversation.name}
          </span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-3">
        {thread.length === 0 ? (
          <p className="font-light text-[16px] text-black/60 text-center pt-8">
            No messages yet. Say hello!
          </p>
        ) : (
          thread.map((m) => (
            <div key={m.id} className={`flex ${m.fromMe ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] rounded-[14px] px-4 py-2 font-light text-[15px] ${
                  m.fromMe ? 'bg-[#ebeff5] text-black' : 'bg-[#f5f7fa] text-black'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="px-6 pb-2">
        <div className="bg-[#ebeff5] rounded-[11px] px-4 py-2 flex items-center gap-2">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') sendMessage();
            }}
            placeholder="Message..."
            className="bg-transparent text-[16px] text-black outline-none flex-1 min-w-0"
          />
          <button
            type="button"
            className="text-[14px] text-black/70 shrink-0"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
