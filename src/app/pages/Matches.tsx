import { Menu, MapPin, DollarSign, Circle, Home, BookOpen } from 'lucide-react';
import BottomNav from '../components/BottomNav';

const matches = [
  {
    id: 1,
    name: 'Olivia',
    age: 20,
    gender: 'woman',
    school: 'UTK',
    budget: 1000,
    image: 'https://images.unsplash.com/photo-1546961329-78bef0414d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc2MjgxOTMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    bio: "Hi, my name is___ I'm a sophomore looking for housing! I'm a quiet roommate, mostly studying in my room. I love animals, music, and TV. Looking for someone similar!",
    traits: [
      { icon: Circle, label: 'Morning Person' },
      { icon: Home, label: 'Independent' },
      { icon: BookOpen, label: 'Christian' },
      { icon: 'noise', label: 'Somewhat Noisy' },
      { icon: 'clean', label: 'Likes it Clean' },
    ]
  }
];

export default function Matches() {
  const match = matches[0];

  return (
    <div className="bg-white relative min-h-screen w-full pb-24">
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

      <div className="px-6">
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
                Morning Person
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <Home className="size-6" />
              <span className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px]">
                Independent
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <BookOpen className="size-6" />
              <span className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px]">
                Christian
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <svg className="size-6" viewBox="0 0 24 24" fill="none">
                <path d="M12 3L15 9L12 15L9 9L12 3Z" stroke="currentColor" strokeWidth="2" />
                <line x1="9" y1="12" x2="15" y2="12" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px]">
                Somewhat Noisy
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <svg className="size-6" viewBox="0 0 24 24" fill="none">
                <path d="M12 3L12 21M6 9L18 9M9 15L15 15" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px]">
                Likes it Clean
              </span>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
