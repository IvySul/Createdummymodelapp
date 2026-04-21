import { type TouchEvent, useEffect, useMemo, useState } from 'react';
import { Menu, MapPin, DollarSign, Circle, Home, BookOpen } from 'lucide-react';
import BottomNav from '../components/BottomNav';

const names = ['Olivia', 'Maya', 'Jordan', 'Alex', 'Taylor', 'Sofia', 'Riley', 'Noah'];
const knoxvilleLocations = [
  'Downtown Knoxville',
  'Old City',
  'Bearden',
  'Fort Sanders',
  'North Knoxville',
  'South Knoxville',
  'Sequoyah Hills',
  'Market Square',
];
const genders = ['woman', 'woman', 'man', 'man', 'woman', 'woman', 'man', 'man'];
const images = [
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/women/68.jpg',
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/men/75.jpg',
  'https://randomuser.me/api/portraits/women/22.jpg',
  'https://randomuser.me/api/portraits/women/54.jpg',
  'https://randomuser.me/api/portraits/men/41.jpg',
  'https://randomuser.me/api/portraits/men/63.jpg',
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
  home: ['Right', 'Left', 'Not political', 'Moderate'],
  book: ['Christian', 'Muslim', 'Jewish', 'Hindu', 'Buddhist', 'Atheist', 'Agnostic', 'Other', 'Prefer not to say'],
  noise: ['Very quiet', 'Quiet', 'Moderate', 'Loud'],
  clean: ['Very clean', 'Clean', 'Average', 'Messy', 'Very messy'],
};

const matches = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: names[i % names.length],
  age: 19 + (i % 5),
  gender: genders[i % genders.length],
  school: knoxvilleLocations[i % knoxvilleLocations.length],
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
  const [ignoreSwipe, setIgnoreSwipe] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    gender: 'All',
    politics: 'All',
    religion: 'All',
    schedule: 'All',
    noise: 'All',
    cleanliness: 'All',
    minBudget: '',
    maxBudget: '',
  });

  const filteredMatches = useMemo(() => {
    return matches.filter((m) => {
      const budgetMin = filters.minBudget.trim() ? Number(filters.minBudget) : null;
      const budgetMax = filters.maxBudget.trim() ? Number(filters.maxBudget) : null;

      if (filters.gender !== 'All' && m.gender.toLowerCase() !== filters.gender.toLowerCase()) return false;
      if (filters.politics !== 'All' && m.traits[1].label !== filters.politics) return false;
      if (filters.religion !== 'All' && m.traits[2].label !== filters.religion) return false;
      if (filters.schedule !== 'All' && m.traits[0].label !== filters.schedule) return false;
      if (filters.noise !== 'All' && m.traits[3].label !== filters.noise) return false;
      if (filters.cleanliness !== 'All' && m.traits[4].label !== filters.cleanliness) return false;
      if (budgetMin !== null && !Number.isNaN(budgetMin) && m.budget < budgetMin) return false;
      if (budgetMax !== null && !Number.isNaN(budgetMax) && m.budget > budgetMax) return false;

      return true;
    });
  }, [filters]);

  useEffect(() => {
    if (filteredMatches.length === 0) {
      setMatchIndex(0);
      return;
    }
    if (matchIndex > filteredMatches.length - 1) setMatchIndex(0);
  }, [filteredMatches, matchIndex]);

  const match = filteredMatches[matchIndex];

  const showNextMatch = () => {
    if (!filteredMatches.length) return;
    setMatchIndex((prev) => (prev + 1) % filteredMatches.length);
  };

  const showPreviousMatch = () => {
    if (!filteredMatches.length) return;
    setMatchIndex((prev) => (prev - 1 + filteredMatches.length) % filteredMatches.length);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest('[data-no-swipe="true"]')) {
      setIgnoreSwipe(true);
      setTouchStartX(null);
      return;
    }
    setIgnoreSwipe(false);
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (ignoreSwipe) {
      setIgnoreSwipe(false);
      return;
    }
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
        <button className="p-2" onClick={() => setShowFilters((v) => !v)}>
          <Menu className="size-9" />
        </button>
        <p className="font-['ABC_Diatype_Edu:Regular',sans-serif] text-[48px] text-black">
          Matches
        </p>
        <div className="w-9" /> {/* Spacer */}
      </div>

      {showFilters ? <div className="fixed inset-0 bg-black/25 z-[2500]" onClick={() => setShowFilters(false)} /> : null}
      <div className={`fixed top-0 left-0 h-full w-[280px] bg-[#d9d9d9] z-[2600] p-4 shadow-xl transition-transform duration-200 ${showFilters ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between mb-4">
          <p className="font-['ABC_Diatype_Edu:Regular',sans-serif] text-[24px]">Filters</p>
          <button className="text-[24px] leading-none" onClick={() => setShowFilters(false)}>×</button>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <select value={filters.gender} onChange={(e) => setFilters({ ...filters, gender: e.target.value })} className="h-[34px] rounded-[9px] px-2 bg-white text-[13px]">
            <option>All</option>
            <option>woman</option>
            <option>man</option>
          </select>
          <select value={filters.politics} onChange={(e) => setFilters({ ...filters, politics: e.target.value })} className="h-[34px] rounded-[9px] px-2 bg-white text-[13px]">
            <option>All</option>
            <option>Right</option>
            <option>Left</option>
            <option>Not political</option>
            <option>Moderate</option>
          </select>
          <select value={filters.religion} onChange={(e) => setFilters({ ...filters, religion: e.target.value })} className="h-[34px] rounded-[9px] px-2 bg-white text-[13px]">
            <option>All</option>
            {lifestyleTraits.book.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <select value={filters.schedule} onChange={(e) => setFilters({ ...filters, schedule: e.target.value })} className="h-[34px] rounded-[9px] px-2 bg-white text-[13px]">
            <option>All</option>
            {lifestyleTraits.circle.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <select value={filters.noise} onChange={(e) => setFilters({ ...filters, noise: e.target.value })} className="h-[34px] rounded-[9px] px-2 bg-white text-[13px]">
            <option>All</option>
            {lifestyleTraits.noise.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <select value={filters.cleanliness} onChange={(e) => setFilters({ ...filters, cleanliness: e.target.value })} className="h-[34px] rounded-[9px] px-2 bg-white text-[13px]">
            <option>All</option>
            {lifestyleTraits.clean.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <input
            value={filters.minBudget}
            onChange={(e) => setFilters({ ...filters, minBudget: e.target.value })}
            placeholder="Min budget"
            className="h-[34px] rounded-[9px] px-2 bg-white text-[13px] outline-none"
          />
          <input
            value={filters.maxBudget}
            onChange={(e) => setFilters({ ...filters, maxBudget: e.target.value })}
            placeholder="Max budget"
            className="h-[34px] rounded-[9px] px-2 bg-white text-[13px] outline-none"
          />
        </div>
      </div>

      <div className="px-6" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        {!match ? (
          <div className="bg-[#d9d9d9] rounded-[30px] p-8 text-center font-['ABC_Diatype_Edu:Regular',sans-serif] text-[18px] mb-6">
            No matches found with current filters.
          </div>
        ) : (
          <>
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
          <div data-no-swipe="true" className="no-scrollbar flex items-center border-b border-black pb-4 mb-4 gap-4 overflow-x-auto whitespace-nowrap flex-nowrap">
            <span className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px] shrink-0">
              {match.age}
            </span>
            <div className="w-px h-[35px] bg-black shrink-0" />
            <span className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px] shrink-0">
              {match.gender}
            </span>
            <div className="w-px h-[35px] bg-black shrink-0" />
            <div className="flex items-center gap-1 shrink-0">
              <MapPin className="size-5" />
              <span className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px]">
                {match.school}
              </span>
            </div>
            <div className="w-px h-[35px] bg-black shrink-0" />
            <div className="flex items-center gap-1 shrink-0">
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
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
