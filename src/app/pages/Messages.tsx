import { Menu } from 'lucide-react';
import BottomNav from '../components/BottomNav';

const conversations = [
  {
    id: 1,
    name: 'Sarah',
    lastMessage: 'messaging',
    image: 'https://images.unsplash.com/photo-1685538856920-9c7cdd86a49c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcG9ydHJhaXQlMjBjYXN1YWx8ZW58MXx8fHwxNzc2MjU0OTgxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    name: 'Alex',
    lastMessage: 'messaging',
    image: 'https://images.unsplash.com/photo-1762753674498-73ec49feafc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHBlcnNvbiUyMGhlYWRzaG90fGVufDF8fHx8MTc3NjMwMjQ3MXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    name: 'Jordan',
    lastMessage: '',
    image: 'https://images.unsplash.com/photo-1688167217076-190b0ec8428f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcHJvZmlsZSUyMHBpY3R1cmV8ZW58MXx8fHwxNzc2MzAyNDcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 4,
    name: 'Taylor',
    lastMessage: '',
    image: 'https://images.unsplash.com/photo-1540222797359-e9b786124d4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGFkdWx0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc2Mjc0NTcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 5,
    name: 'Morgan',
    lastMessage: '',
    image: 'https://images.unsplash.com/photo-1770235622269-bf3124d85032?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudCUyMGNhc3VhbHxlbnwxfHx8fDE3NzYzMDI0NzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 6,
    name: 'Casey',
    lastMessage: '',
    image: 'https://images.unsplash.com/photo-1546961329-78bef0414d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc2MjgxOTMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export default function Messages() {
  return (
    <div className="bg-white relative min-h-screen w-full pb-24">
      {/* Header */}
      <div className="flex items-start gap-4 px-6 pt-12 mb-8">
        <button className="p-2 mt-2">
          <Menu className="size-9" />
        </button>
        
        {/* Search Bar */}
        <div className="bg-[#d9d9d9] h-[43px] rounded-[11px] px-4 flex items-center flex-1">
          <input
            type="text"
            placeholder="Search messages..."
            className="bg-transparent font-['ABC_Diatype_Edu:Regular',sans-serif] text-[16px] text-black outline-none w-full"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="px-6 space-y-6">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            className="flex items-center gap-4 w-full hover:opacity-80 transition-opacity"
          >
            <div className="size-[58px] rounded-full overflow-hidden bg-[#d9d9d9] flex-shrink-0">
              <img
                src={conversation.image}
                alt={conversation.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-left">
              <p className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px] text-black">
                {conversation.lastMessage || 'Start a conversation'}
              </p>
            </div>
          </button>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
