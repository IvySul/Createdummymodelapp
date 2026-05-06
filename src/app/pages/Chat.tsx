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
    <div className="relative isolate mx-auto flex h-svh max-h-svh w-full max-w-md flex-col overflow-hidden bg-white pb-24">
      <div className="flex shrink-0 items-center gap-3 border-b border-[#e5e5e5] px-6 pb-3 pt-[max(0.75rem,env(safe-area-inset-top,0px))]">
        <button type="button" onClick={() => navigate('/messages')} className="p-1 -ml-1">
          <ChevronLeft className="size-8" />
        </button>
        <button
          type="button"
          onClick={() => navigate('/profile')}
          className="flex min-w-0 flex-1 items-center gap-3 text-left"
        >
          <div className="size-11 shrink-0 overflow-hidden rounded-full bg-[#ebeff5]">
            <img src={conversation.image} alt="" className="h-full w-full object-cover" />
          </div>
          <span className="truncate text-[20px] text-black">
            {conversation.name}
          </span>
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4 space-y-3">
        {thread.length === 0 ? (
          <p className="pt-6 text-center font-light text-[16px] text-black/60">
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

      <div className="shrink-0 bg-white px-6 pb-2 pt-1">
        <div className="flex items-center gap-2 rounded-[11px] bg-[#ebeff5] px-4 py-[0.4rem]">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') sendMessage();
            }}
            placeholder="Message..."
            className="min-w-0 flex-1 bg-transparent text-[16px] text-black outline-none"
          />
          <button
            type="button"
            className="shrink-0 text-[14px] text-black/70"
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
