import { type TouchEvent, useEffect, useMemo, useState } from 'react';
import { Circle, Home, BookOpen } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import matchesWomanReference from '../../assets/matches-woman-reference.png';

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
  matchesWomanReference,
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
const availabilityRanges = [
  { start: '2026-08-01', end: '2027-05-31' },
  { start: '2026-09-01', end: '2027-08-31' },
  { start: '2026-06-01', end: '2026-12-31' },
  { start: '2026-10-01', end: '2027-10-01' },
  { start: '2026-07-15', end: '2027-07-15' },
  { start: '2026-11-01', end: '2027-04-30' },
  { start: '2026-05-01', end: '2026-11-30' },
  { start: '2026-08-15', end: '2027-08-14' },
];

function formatDisplayDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

const matches = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: names[i % names.length],
  age: 19 + (i % 5),
  gender: genders[i % genders.length],
  school: knoxvilleLocations[i % knoxvilleLocations.length],
  budget: 700 + i * 100,
  apartmentStartDate: availabilityRanges[i % availabilityRanges.length].start,
  apartmentEndDate: availabilityRanges[i % availabilityRanges.length].end,
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
  const navigate = useNavigate();
  const [matchIndex, setMatchIndex] = useState(0);
  const [likedMatchIds, setLikedMatchIds] = useState<number[]>([]);
  const [swipedMatchIds, setSwipedMatchIds] = useState<number[]>([]);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [swipeOffsetX, setSwipeOffsetX] = useState(0);
  const [ignoreSwipe, setIgnoreSwipe] = useState(false);
  const [isAnimatingSwipe, setIsAnimatingSwipe] = useState(false);
  const [isResettingSwipePosition, setIsResettingSwipePosition] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    gender: 'All',
    politics: 'All',
    religion: 'All',
    schedule: 'All',
    noise: 'All',
    cleanliness: 'All',
    apartmentStartDate: '',
    apartmentEndDate: '',
    minBudget: '',
    maxBudget: '',
  });
  const [questionnaireStep1, setQuestionnaireStep1] = useState<any>(null);
  const [questionnaireStep2, setQuestionnaireStep2] = useState<any>(null);

  useEffect(() => {
    try {
      const step1 = localStorage.getItem('questionnaireStep1');
      const step2 = localStorage.getItem('questionnaireStep2');
      setQuestionnaireStep1(step1 ? JSON.parse(step1) : null);
      setQuestionnaireStep2(step2 ? JSON.parse(step2) : null);
    } catch {
      setQuestionnaireStep1(null);
      setQuestionnaireStep2(null);
    }
  }, []);

  const baseFilteredMatches = useMemo(() => {
    return matches.filter((m) => {
      const budgetMin = filters.minBudget.trim() ? Number(filters.minBudget) : null;
      const budgetMax = filters.maxBudget.trim() ? Number(filters.maxBudget) : null;

      if (filters.gender !== 'All' && m.gender.toLowerCase() !== filters.gender.toLowerCase()) return false;
      if (filters.politics !== 'All' && m.traits[1].label !== filters.politics) return false;
      if (filters.religion !== 'All' && m.traits[2].label !== filters.religion) return false;
      if (filters.schedule !== 'All' && m.traits[0].label !== filters.schedule) return false;
      if (filters.noise !== 'All' && m.traits[3].label !== filters.noise) return false;
      if (filters.cleanliness !== 'All' && m.traits[4].label !== filters.cleanliness) return false;
      if (filters.apartmentStartDate && m.apartmentEndDate < filters.apartmentStartDate) return false;
      if (filters.apartmentEndDate && m.apartmentStartDate > filters.apartmentEndDate) return false;
      if (budgetMin !== null && !Number.isNaN(budgetMin) && m.budget < budgetMin) return false;
      if (budgetMax !== null && !Number.isNaN(budgetMax) && m.budget > budgetMax) return false;

      return true;
    });
  }, [filters]);

  const filteredMatches = useMemo(
    () => baseFilteredMatches.filter((m) => !swipedMatchIds.includes(m.id)),
    [baseFilteredMatches, swipedMatchIds]
  );

  useEffect(() => {
    if (filteredMatches.length === 0) {
      setMatchIndex(0);
      return;
    }
    if (matchIndex > filteredMatches.length - 1) setMatchIndex(0);
  }, [filteredMatches, matchIndex]);

  const match = filteredMatches[matchIndex];

  const normalize = (value: string) =>
    value.toLowerCase().replace(/[^a-z0-9]/g, '');

  const compatibilityScore = useMemo(() => {
    if (!match) return 0;

    let total = 0;
    let matched = 0;

    const check = (condition: boolean) => {
      total += 1;
      if (condition) matched += 1;
    };

    if (questionnaireStep1?.politics) {
      check(normalize(match.traits[1].label) === normalize(String(questionnaireStep1.politics)));
    }
    if (questionnaireStep1?.religion) {
      check(normalize(match.traits[2].label) === normalize(String(questionnaireStep1.religion)));
    }
    if (questionnaireStep2?.schedule) {
      const userSchedule = normalize(String(questionnaireStep2.schedule));
      const candidateSchedule = normalize(match.traits[0].label);
      const scheduleMatch =
        userSchedule === candidateSchedule ||
        (userSchedule === 'morningperson' && candidateSchedule === 'morningperson') ||
        (userSchedule === 'nightperson' && (candidateSchedule === 'nightowl' || candidateSchedule === 'nightperson')) ||
        (userSchedule === 'flexible' && candidateSchedule === 'flexibleschedule');
      check(scheduleMatch);
    }
    if (questionnaireStep2?.noise) {
      check(normalize(match.traits[3].label) === normalize(String(questionnaireStep2.noise)));
    }
    if (questionnaireStep2?.cleanliness) {
      check(normalize(match.traits[4].label) === normalize(String(questionnaireStep2.cleanliness)));
    }
    if (Array.isArray(questionnaireStep2?.budget) && questionnaireStep2.budget.length === 2) {
      const min = Number(questionnaireStep2.budget[0]);
      const max = Number(questionnaireStep2.budget[1]);
      if (!Number.isNaN(min) && !Number.isNaN(max)) {
        check(match.budget >= Math.min(min, max) && match.budget <= Math.max(min, max));
      }
    }
    if (questionnaireStep2?.apartmentStartDate && questionnaireStep2?.apartmentEndDate) {
      check(
        !(match.apartmentEndDate < questionnaireStep2.apartmentStartDate ||
          match.apartmentStartDate > questionnaireStep2.apartmentEndDate)
      );
    }

    if (total === 0) return null;
    return Math.round((matched / total) * 100);
  }, [match, questionnaireStep1, questionnaireStep2]);

  const showNextMatch = () => {
    if (!filteredMatches.length) return;
    setMatchIndex((prev) => (prev + 1) % filteredMatches.length);
  };

  const markCurrentAsSwiped = (liked: boolean) => {
    const current = filteredMatches[matchIndex];
    if (!current) return;
    setSwipedMatchIds((prev) => (prev.includes(current.id) ? prev : [...prev, current.id]));
    if (liked) {
      setLikedMatchIds((prev) => (prev.includes(current.id) ? prev : [...prev, current.id]));
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (isAnimatingSwipe) return;
    const target = event.target as HTMLElement;
    if (target.closest('[data-no-swipe="true"]')) {
      setIgnoreSwipe(true);
      setTouchStartX(null);
      return;
    }
    setIgnoreSwipe(false);
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (ignoreSwipe || touchStartX === null || isAnimatingSwipe) return;
    const currentX = event.touches[0].clientX;
    const deltaX = currentX - touchStartX;
    // Cap drag distance so the card doesn't fly off while still dragging.
    setSwipeOffsetX(Math.max(-180, Math.min(180, deltaX)));
  };

  const animateSwipe = (direction: 'left' | 'right') => {
    if (isAnimatingSwipe) return;
    setIsAnimatingSwipe(true);
    setSwipeOffsetX(direction === 'left' ? -460 : 460);

    window.setTimeout(() => {
      if (direction === 'left') markCurrentAsSwiped(false);
      else markCurrentAsSwiped(true);

      // Hard reset without transition so the new profile starts on the opposite side.
      setIsResettingSwipePosition(true);
      setSwipeOffsetX(direction === 'left' ? 300 : -300);

      // Next paint: animate that opposite-side card into center.
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setIsResettingSwipePosition(false);
          setSwipeOffsetX(0);
          window.setTimeout(() => {
            setIsAnimatingSwipe(false);
          }, 260);
        });
      });
    }, 220);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (ignoreSwipe) {
      setIgnoreSwipe(false);
      return;
    }
    if (touchStartX === null) return;
    const swipeDistance = event.changedTouches[0].clientX - touchStartX;
    const swipeThreshold = 65;

    if (swipeDistance <= -swipeThreshold) animateSwipe('left');
    else if (swipeDistance >= swipeThreshold) animateSwipe('right');
    else setSwipeOffsetX(0);

    setTouchStartX(null);
  };

  const swipeProgress = Math.min(1, Math.abs(swipeOffsetX) / 180);
  const cardRotate = swipeOffsetX / 26;
  const cardScale = 1 - swipeProgress * 0.04;
  const cardOpacity = 1 - swipeProgress * 0.18;

  return (
    <div className="matches-exact-font bg-[#dcdcdc] relative min-h-screen w-full max-w-md mx-auto pb-[72px]">
      {/* Header */}
      <div className="flex items-center gap-4 px-5 pt-4 mb-3">
        <button className="p-1" onClick={() => setShowFilters((v) => !v)}>
          <svg className="w-[28px] h-[28px]" viewBox="0 0 28 28" fill="none">
            <path d="M2 8.5H26" stroke="black" strokeWidth="1.1" />
            <path d="M2 14H26" stroke="black" strokeWidth="1.1" />
            <path d="M2 19.5H26" stroke="black" strokeWidth="1.1" />
            <path d="M8 4V12" stroke="black" strokeWidth="1.1" />
            <path d="M20 10V18" stroke="black" strokeWidth="1.1" />
          </svg>
        </button>
        <p className="text-[56px] leading-[0.88] text-[#de6f1d] bg-[#eedecb] rounded-[16px] px-3 py-[2px] font-light">
          Matches
        </p>
      </div>

      {showFilters ? <div className="fixed inset-0 bg-black/25 z-[2500]" onClick={() => setShowFilters(false)} /> : null}
      <div className={`fixed top-0 left-0 h-full w-[280px] bg-[#d9d9d9] z-[2600] p-4 shadow-xl transition-transform duration-200 ${showFilters ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between mb-4">
          <p className="font-['ABC_Diatype_Edu:Regular',sans-serif] text-[24px]">Filters</p>
          <button className="text-[24px] leading-none" onClick={() => setShowFilters(false)}>×</button>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <div>
            <p className="text-[12px] mb-1 font-['ABC_Diatype_Edu:Regular',sans-serif]">Gender</p>
          <select value={filters.gender} onChange={(e) => setFilters({ ...filters, gender: e.target.value })} className="h-[34px] rounded-[9px] px-2 bg-white text-[13px]">
            <option>All</option>
            <option>woman</option>
            <option>man</option>
          </select>
          </div>
          <div>
            <p className="text-[12px] mb-1 font-['ABC_Diatype_Edu:Regular',sans-serif]">Politics</p>
          <select value={filters.politics} onChange={(e) => setFilters({ ...filters, politics: e.target.value })} className="h-[34px] rounded-[9px] px-2 bg-white text-[13px]">
            <option>All</option>
            <option>Right</option>
            <option>Left</option>
            <option>Not political</option>
            <option>Moderate</option>
          </select>
          </div>
          <div>
            <p className="text-[12px] mb-1 font-['ABC_Diatype_Edu:Regular',sans-serif]">Religion</p>
          <select value={filters.religion} onChange={(e) => setFilters({ ...filters, religion: e.target.value })} className="h-[34px] rounded-[9px] px-2 bg-white text-[13px]">
            <option>All</option>
            {lifestyleTraits.book.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          </div>
          <div>
            <p className="text-[12px] mb-1 font-['ABC_Diatype_Edu:Regular',sans-serif]">Schedule</p>
          <select value={filters.schedule} onChange={(e) => setFilters({ ...filters, schedule: e.target.value })} className="h-[34px] rounded-[9px] px-2 bg-white text-[13px]">
            <option>All</option>
            {lifestyleTraits.circle.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          </div>
          <div>
            <p className="text-[12px] mb-1 font-['ABC_Diatype_Edu:Regular',sans-serif]">Noise Level</p>
          <select value={filters.noise} onChange={(e) => setFilters({ ...filters, noise: e.target.value })} className="h-[34px] rounded-[9px] px-2 bg-white text-[13px]">
            <option>All</option>
            {lifestyleTraits.noise.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          </div>
          <div>
            <p className="text-[12px] mb-1 font-['ABC_Diatype_Edu:Regular',sans-serif]">Cleanliness</p>
          <select value={filters.cleanliness} onChange={(e) => setFilters({ ...filters, cleanliness: e.target.value })} className="h-[34px] rounded-[9px] px-2 bg-white text-[13px]">
            <option>All</option>
            {lifestyleTraits.clean.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          </div>
          <div>
            <p className="text-[12px] mb-1 font-['ABC_Diatype_Edu:Regular',sans-serif]">Need Apartment Between (Start)</p>
          <input
            type="date"
            value={filters.apartmentStartDate}
            onChange={(e) => setFilters({ ...filters, apartmentStartDate: e.target.value })}
            className="h-[34px] rounded-[9px] px-2 bg-white text-[13px] outline-none"
          />
          </div>
          <div>
            <p className="text-[12px] mb-1 font-['ABC_Diatype_Edu:Regular',sans-serif]">Need Apartment Between (End)</p>
          <input
            type="date"
            value={filters.apartmentEndDate}
            onChange={(e) => setFilters({ ...filters, apartmentEndDate: e.target.value })}
            className="h-[34px] rounded-[9px] px-2 bg-white text-[13px] outline-none"
          />
          </div>
          <div>
            <p className="text-[12px] mb-1 font-['ABC_Diatype_Edu:Regular',sans-serif]">Min Budget</p>
          <input
            value={filters.minBudget}
            onChange={(e) => setFilters({ ...filters, minBudget: e.target.value })}
            placeholder="Min budget"
            className="h-[34px] rounded-[9px] px-2 bg-white text-[13px] outline-none"
          />
          </div>
          <div>
            <p className="text-[12px] mb-1 font-['ABC_Diatype_Edu:Regular',sans-serif]">Max Budget</p>
          <input
            value={filters.maxBudget}
            onChange={(e) => setFilters({ ...filters, maxBudget: e.target.value })}
            placeholder="Max budget"
            className="h-[34px] rounded-[9px] px-2 bg-white text-[13px] outline-none"
          />
          </div>
        </div>
      </div>

      <div className="px-5 overflow-hidden" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        <div
          style={{
            transform: `translateX(${swipeOffsetX}px) rotate(${cardRotate}deg) scale(${cardScale})`,
            opacity: cardOpacity,
            transition: touchStartX !== null && !isAnimatingSwipe
              ? 'none'
              : isResettingSwipePosition
              ? 'none'
              : 'transform 260ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease',
            willChange: 'transform, opacity',
          }}
        >
          {!match ? (
            <div className="bg-[#d9d9d9] rounded-[20px] p-8 text-center text-[18px] mb-4">
              No more matches in this lineup.
            </div>
          ) : (
            <>
              <div className="bg-[#d0d0d0] rounded-[22px] border border-black/10 shadow-[0_1px_1px_rgba(0,0,0,0.08)] overflow-hidden">
                <div className="relative h-[360px]">
                  <img src={match.image} alt={match.name} className="absolute inset-0 w-full h-full object-cover object-center" />
                  <p className="absolute top-[10px] left-[10px] text-[44px] leading-none text-black font-light">{match.name}</p>
                </div>
                <div className="relative -mt-[18px] px-[6px] pb-[8px]">
                  <div className="bg-[#ebebeb] border border-black/20 rounded-[24px] min-h-[84px] px-4 py-3 pr-[90px] shadow-[0_2px_4px_rgba(0,0,0,0.12)]">
                    <p className="text-[14px] leading-[1.35] text-black/65 font-light">{match.bio}</p>
                  </div>
                  <div className="absolute right-[12px] -top-[30px] flex items-center">
                    <span className="size-[50px] rounded-full border border-[#d87014]" />
                    <span className="-ml-[19px] size-[50px] rounded-full border border-[#d87014] flex items-center justify-center text-[13px] text-[#d87014] font-light">
                      {compatibilityScore === null ? '--' : `${compatibilityScore}%`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-[#e8e8e8] rounded-[24px] border border-black/20 px-3 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
                <div data-no-swipe="true" className="no-scrollbar flex items-center gap-2 overflow-x-auto whitespace-nowrap border-b border-black/45 pb-2 mb-2">
                  <span className="text-[32px] leading-none font-light shrink-0">{match.age}</span>
                  <div className="w-px h-[30px] bg-black/55 shrink-0" />
                  <span className="text-[32px] leading-none font-light shrink-0">{match.gender}</span>
                  <div className="w-px h-[30px] bg-black/55 shrink-0" />
                  <span className="text-[25px] leading-none font-light shrink-0">16 miles away</span>
                  <div className="w-px h-[30px] bg-black/55 shrink-0" />
                  <span className="text-[32px] leading-none font-light shrink-0">${match.budget}</span>
                </div>

                <div className="space-y-[6px]">
                  <div className="flex items-center gap-3">
                    <Circle className="size-[20px] stroke-[1.1] fill-transparent" />
                    <span className="text-[18px] leading-none font-light">{match.traits[0].label}</span>
                  </div>
                  <div className="border-t border-black/35" />
                  <div className="flex items-center gap-3">
                    <Home className="size-[20px] stroke-[1.1]" />
                    <span className="text-[18px] leading-none font-light">Independent</span>
                  </div>
                  <div className="border-t border-black/35" />
                  <div className="flex items-center gap-3">
                    <BookOpen className="size-[20px] stroke-[1.1]" />
                    <span className="text-[18px] leading-none font-light">{match.traits[2].label}</span>
                  </div>
                  <div className="border-t border-black/35" />
                  <div className="flex items-center gap-3">
                    <svg className="size-[20px]" viewBox="0 0 24 24" fill="none">
                      <path d="M12 3L15 9L12 15L9 9L12 3Z" stroke="currentColor" strokeWidth="1.2" />
                      <line x1="9" y1="12" x2="15" y2="12" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                    <span className="text-[18px] leading-none font-light">Somewhat Noisy</span>
                  </div>
                  <div className="border-t border-black/35" />
                  <div className="flex items-center gap-3">
                    <svg className="size-[20px]" viewBox="0 0 24 24" fill="none">
                      <path d="M12 3L12 21M6 9L18 9M9 15L15 15" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                    <span className="text-[18px] leading-none font-light">Likes it Clean</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
