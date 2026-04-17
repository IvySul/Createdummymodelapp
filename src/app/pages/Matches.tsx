import { type TouchEvent, useMemo, useState } from 'react';
import { Menu, MapPin, DollarSign, Circle, Home, BookOpen } from 'lucide-react';
import BottomNav from '../components/BottomNav';

const names = ['Olivia', 'Maya', 'Jordan', 'Alex', 'Taylor', 'Sofia', 'Riley', 'Noah'];
const schools = ['UTK', 'Pellissippi State', 'South College', 'LMU Knoxville'];
const genders = ['woman', 'man', 'non-binary'];
const images = [
  'https://images.unsplash.com/photo-1546961329-78bef0414d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1542206395-9feb3edaa68d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
];
const bios = [
  "I'm a junior looking for a calm apartment close to campus. I keep shared spaces tidy and usually cook at home during the week.",
  'I am easygoing and social but respectful of quiet hours. I like music, gym mornings, and planning things early.',
  "I work part-time and study late some nights. I'm communicative, clean up after myself, and want a friendly roommate dynamic.",
  'I like a balanced routine: classes, library, and weekend downtime. Looking for someone dependable and considerate.',
  "I'm organized with bills and chores, and I enjoy a peaceful home setup. Big fan of movie nights and meal prep.",
];
const lifestyleTraits = {
  circle: ['Morning Person', 'Night Owl', 'Flexible Schedule'],
  home: ['Independent', 'Collaborative', 'Balanced'],
  book: ['Christian', 'Not Religious', 'Spiritual'],
  noise: ['Very Quiet', 'Somewhat Noisy', 'Moderate Noise'],
  clean: ['Likes it Clean', 'Average Cleanliness', 'Very Organized'],
};

const matches = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: names[i % names.length],
  age: 19 + (i % 5),
  gender: genders[i % genders.length],
  school: schools[i % schools.length],
  budget: 700 + i * 100,
  image: images[i % images.length],
  bio: bios[i % bios.length],
  traits: [
    { icon: Circle, label: lifestyleTraits.circle[i % lifestyleTraits.circle.length] },
    { icon: Home, label: lifestyleTraits.home[i % lifestyleTraits.home.length] },
    { icon: BookOpen, label: lifestyleTraits.book[i % lifestyleTraits.book.length] },
    { icon: 'noise', label: lifestyleTraits.noise[i % lifestyleTraits.noise.length] },
    { icon: 'clean', label: lifestyleTraits.clean[i % lifestyleTraits.clean.length] },
  ],
}));

export default function Matches() {
  const [matchIndex, setMatchIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const match = useMemo(() => matches[matchIndex], [matchIndex]);

  const showNextMatch = () => {
    setMatchIndex((prev) => (prev + 1) % matches.length);
  };

  const showPreviousMatch = () => {
    setMatchIndex((prev) => (prev - 1 + matches.length) % matches.length);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return;
    const swipeDistance = event.changedTouches[0].clientX - touchStartX;
    const swipeThreshold = 50;

    if (swipeDistance <= -swipeThreshold) showNextMatch();
    if (swipeDistance >= swipeThreshold) showPreviousMatch();

    setTouchStartX(null);
  };

  return (
    <div className="bg-white relative min-h-screen w-full max-w-md mx-auto pb-24">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-12 mb-8">
        <button className="p-2">
          <Menu className="size-9" />
        </button>
        <p className="font-['ABC_Diatype_Edu:Regular',sans-serif] text-[48px] text-black">
          Matches
        </p>
        <div className="w-9" /> {/* Spacer */}
      </div>

      <div className="px-6" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        {/* Profile Card */}
        <div className="bg-[#d9d9d9] rounded-[51px] p-6 mb-6">
          <p className="font-['ABC_Diatype_Edu:Regular',sans-serif] text-[36px] text-black mb-4">
            {match.name}
          </p>
          
          {/* Image */}
          <div className="relative w-full aspect-square rounded-[20px] overflow-hidden mb-4">
            <img
              src={match.image}
              alt={match.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bio */}
          <p className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[14px] text-black mb-6">
            {match.bio}
          </p>
        </div>

        {/* Details Card */}
        <div className="bg-[#d9d9d9] rounded-[51px] p-6 shadow-lg">
          {/* Stats Row */}
          <div className="flex items-center border-b border-black pb-4 mb-4 gap-4">
            <span className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px]">
              {match.age}
            </span>
            <div className="w-px h-[35px] bg-black" />
            <span className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px]">
              {match.gender}
            </span>
            <div className="w-px h-[35px] bg-black" />
            <div className="flex items-center gap-1">
              <MapPin className="size-5" />
              <span className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px]">
                {match.school}
              </span>
            </div>
            <div className="w-px h-[35px] bg-black" />
            <div className="flex items-center gap-1">
              <DollarSign className="size-5" />
              <span className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px]">
                {match.budget}
              </span>
            </div>
          </div>

          {/* Traits */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Circle className="size-6 fill-[#d9d9d9]" />
              <span className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px]">
                {match.traits[0].label}
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <Home className="size-6" />
              <span className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px]">
                {match.traits[1].label}
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <BookOpen className="size-6" />
              <span className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px]">
                {match.traits[2].label}
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <svg className="size-6" viewBox="0 0 24 24" fill="none">
                <path d="M12 3L15 9L12 15L9 9L12 3Z" stroke="currentColor" strokeWidth="2" />
                <line x1="9" y1="12" x2="15" y2="12" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px]">
                {match.traits[3].label}
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <svg className="size-6" viewBox="0 0 24 24" fill="none">
                <path d="M12 3L12 21M6 9L18 9M9 15L15 15" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px]">
                {match.traits[4].label}
              </span>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
