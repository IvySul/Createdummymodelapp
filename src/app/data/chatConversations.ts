export type ChatBubble = {
  id: string;
  text: string;
  fromMe: boolean;
};

export type Conversation = {
  id: number;
  name: string;
  lastMessage: string;
  image: string;
  messages: ChatBubble[];
};

export const conversations: Conversation[] = [
  {
    id: 1,
    name: 'Sarah',
    lastMessage: 'Are you free to tour this weekend?',
    image:
      'https://images.unsplash.com/photo-1685538856920-9c7cdd86a49c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcG9ydHJhaXQlMjBjYXN1YWx8ZW58MXx8fHwxNzc2MjU0OTgxfDA&ixlib=rb-4.1.0&q=90&w=2400',
    messages: [
      { id: '1a', text: 'Hey! Saw your profile — still looking for housing?', fromMe: false },
      { id: '1b', text: 'Yes! Prefer something near campus.', fromMe: true },
      { id: '1c', text: 'Are you free to tour this weekend?', fromMe: false },
    ],
  },
  {
    id: 2,
    name: 'Alex',
    lastMessage: 'Sounds good, I will send the link.',
    image:
      'https://images.unsplash.com/photo-1762753674498-73ec49feafc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHBlcnNvbiUyMGhlYWRzaG90fGVufDF8fHx8MTc3NjMwMjQ3MXww&ixlib=rb-4.1.0&q=90&w=2400',
    messages: [
      { id: '2a', text: 'Hi Alex — do you have a budget range in mind?', fromMe: true },
      { id: '2b', text: 'Around $800–950 if utilities are included.', fromMe: false },
      { id: '2c', text: 'Sounds good, I will send the link.', fromMe: false },
    ],
  },
  {
    id: 3,
    name: 'Jordan',
    lastMessage: 'Start a conversation',
    image:
      'https://images.unsplash.com/photo-1688167217076-190b0ec8428f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcHJvZmlsZSUyMHBpY3R1cmV8ZW58MXx8fHwxNzc2MzAyNDcyfDA&ixlib=rb-4.1.0&q=90&w=2400',
    messages: [],
  },
  {
    id: 4,
    name: 'Taylor',
    lastMessage: 'Start a conversation',
    image:
      'https://images.unsplash.com/photo-1540222797359-e9b786124d4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGFkdWx0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc2Mjc0NTcyfDA&ixlib=rb-4.1.0&q=90&w=2400',
    messages: [],
  },
  {
    id: 5,
    name: 'Morgan',
    lastMessage: 'Start a conversation',
    image:
      'https://images.unsplash.com/photo-1770235622269-bf3124d85032?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudCUyMGNhc3VhbHxlbnwxfHx8fDE3NzYzMDI0NzN8MA&ixlib=rb-4.1.0&q=90&w=2400',
    messages: [],
  },
  {
    id: 6,
    name: 'Casey',
    lastMessage: 'Start a conversation',
    image:
      'https://images.unsplash.com/photo-1546961329-78bef0414d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc2MjgxOTMyfDA&ixlib=rb-4.1.0&q=90&w=2400',
    messages: [],
  },
];
