import { type TouchEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Circle, Home, BookOpen } from 'lucide-react';

/** Equal-length tracks with slider handles at ~75%, ~25%, ~65% (filter / settings style). */
function FilterSlidersIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <g stroke="currentColor" strokeWidth={1.35} strokeLinecap="round">
        <line x1={3} y1={6} x2={21} y2={6} />
        <line x1={16.5} y1={4.25} x2={16.5} y2={7.75} />
        <line x1={3} y1={12} x2={21} y2={12} />
        <line x1={7.5} y1={10.25} x2={7.5} y2={13.75} />
        <line x1={3} y1={18} x2={21} y2={18} />
        <line x1={14.7} y1={16.25} x2={14.7} y2={19.75} />
      </g>
    </svg>
  );
}
import BottomNav from '../components/BottomNav';
import { CompatibilityKeyMeter } from '../components/matches/CompatibilityKeyMeter';
import { MatchCelebrationOverlay } from '../components/matches/MatchCelebrationOverlay';
import { MatchesBasicInfoArtboard } from '../components/matches/MatchesBasicInfoArtboard';
import { MatchesLivingHabitsArtboard } from '../components/matches/MatchesLivingHabitsArtboard';

const names = ['Olivia', 'Maya', 'Jordan', 'Alex', 'Taylor', 'Sofia', 'Riley', 'Noah'];
const distanceFromYou = [
  '15 miles away',
  '10 miles away',
  '8 miles away',
  '22 miles away',
  '5 miles away',
  '18 miles away',
  '3 miles away',
  '12 miles away',
];
const genders = ['woman', 'woman', 'man', 'man', 'woman', 'woman', 'man', 'man'];
/** Unsplash — real portraits, high resolution (object-cover in UI). */
const images = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=2400&q=90',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=2400&q=90',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=2400&q=90',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=2400&q=90',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=2400&q=90',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=2400&q=90',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=2400&q=90',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=2400&q=90',
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
const educations = ['Undergraduate', 'Sophomore', 'Junior', 'Senior', 'Graduate student'];
const occupations = ['Student', 'Part-time retail', 'Campus dining', 'Intern', 'Tutor', 'Barista', 'Research assistant'];
const petsOptions = ['No pets', 'Cat', 'Dog', 'Cat and dog', 'Other pets', 'Open to pets', 'Allergic to pets'];
const guestPolicyOptions = ['Rarely', 'Occasionally', 'Often', 'Open house', 'No overnight guests', 'Weekends only'];
const substanceUseOptions = ['Non-smoker', '420 friendly', 'Social drinking', 'No drinking', 'No substances in unit', 'Prefer not to say'];

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

const matches = Array.from({ length: 8 }, (_, i) => {
  const budget = 700 + i * 100;
  return {
  id: i + 1,
  name: names[i % names.length],
  age: 19 + (i % 5),
  gender: genders[i % genders.length],
  distanceLabel: distanceFromYou[i % distanceFromYou.length],
  budget,
  budgetLow: Math.max(200, budget - 200),
  budgetHigh: budget + 200,
  apartmentStartDate: availabilityRanges[i % availabilityRanges.length].start,
  apartmentEndDate: availabilityRanges[i % availabilityRanges.length].end,
  image: images[i % images.length],
  bio: bios[i % bios.length],
  education: educations[i % educations.length],
  occupation: occupations[i % occupations.length],
  traits: [
    { icon: Circle, label: lifestyleTraits.circle[i % lifestyleTraits.circle.length] },
    { icon: Home, label: lifestyleTraits.home[i % lifestyleTraits.home.length] },
    { icon: BookOpen, label: lifestyleTraits.book[i % lifestyleTraits.book.length] },
    { icon: 'noise', label: lifestyleTraits.noise[i % lifestyleTraits.noise.length] },
    { icon: 'clean', label: lifestyleTraits.clean[i % lifestyleTraits.clean.length] },
  ],
  pets: petsOptions[i % petsOptions.length],
  guestPolicy: guestPolicyOptions[i % guestPolicyOptions.length],
  substanceUse: substanceUseOptions[i % substanceUseOptions.length],
  /** Dummy compatibility for the key meter (52–96%). */
  compatibilityScore: 52 + ((i * 17 + 11) % 45),
};
});

export default function Matches() {
  const [matchIndex, setMatchIndex] = useState(0);
  const [likedMatchIds, setLikedMatchIds] = useState<number[]>([]);
  const [swipedMatchIds, setSwipedMatchIds] = useState<number[]>([]);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [swipeOffsetX, setSwipeOffsetX] = useState(0);
  const [ignoreSwipe, setIgnoreSwipe] = useState(false);
  const [isAnimatingSwipe, setIsAnimatingSwipe] = useState(false);
  const [isResettingSwipePosition, setIsResettingSwipePosition] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showMatchOverlay, setShowMatchOverlay] = useState(false);
  const overlayTimeoutRef = useRef<number | null>(null);
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
      else {
        markCurrentAsSwiped(true);
        setShowMatchOverlay(true);
        if (overlayTimeoutRef.current !== null) {
          window.clearTimeout(overlayTimeoutRef.current);
        }
        overlayTimeoutRef.current = window.setTimeout(() => {
          setShowMatchOverlay(false);
          overlayTimeoutRef.current = null;
        }, 3200);
      }

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

  useEffect(() => {
    return () => {
      if (overlayTimeoutRef.current !== null) {
        window.clearTimeout(overlayTimeoutRef.current);
      }
    };
  }, []);

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
    <div className="relative isolate mx-auto min-h-screen w-full max-w-md overflow-x-hidden bg-white pb-24">
      <MatchCelebrationOverlay visible={showMatchOverlay} />
      {/* Header */}
      <div className="flex items-center px-6 pt-12 mb-8">
        <button
          type="button"
          className="p-2 text-neutral-900"
          onClick={() => setShowFilters((v) => !v)}
          aria-label="Open filters"
        >
          <FilterSlidersIcon className="size-9" />
        </button>
      </div>

      {/* Mounted only while open — dimmer + drawer are removed from DOM when filters are closed. */}
      {showFilters ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[2500] cursor-default bg-black/25"
            aria-label="Close filters"
            onClick={() => setShowFilters(false)}
          />

          {/* Drawer aligns to same centered max-w-md column as the match card. */}
          <div className="pointer-events-none fixed inset-x-0 top-0 z-[2600] flex h-screen justify-center">
            <div className="relative h-full w-full max-w-md pointer-events-auto">
              <div className="absolute left-0 top-0 flex h-full w-[min(280px,100%)] flex-col overflow-y-auto bg-[#ebeff5] p-4 shadow-[4px_0_24px_rgba(0,0,0,0.06)]">
                <div className="mb-4 flex shrink-0 items-center justify-between">
                  <p className="text-[24px]">Filters</p>
                  <button type="button" className="text-[24px] leading-none" onClick={() => setShowFilters(false)}>
                    ×
                  </button>
                </div>
                <div className="grid shrink-0 grid-cols-1 gap-2 pb-4">
                  <div>
                    <p className="mb-1 text-[12px]">Gender</p>
                    <select
                      value={filters.gender}
                      onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
                      className="h-[34px] w-full rounded-[9px] bg-white px-2 text-[13px]"
                    >
                      <option>All</option>
                      <option>woman</option>
                      <option>man</option>
                    </select>
                  </div>
                  <div>
                    <p className="mb-1 text-[12px]">Politics</p>
                    <select
                      value={filters.politics}
                      onChange={(e) => setFilters({ ...filters, politics: e.target.value })}
                      className="h-[34px] w-full rounded-[9px] bg-white px-2 text-[13px]"
                    >
                      <option>All</option>
                      <option>Right</option>
                      <option>Left</option>
                      <option>Not political</option>
                      <option>Moderate</option>
                    </select>
                  </div>
                  <div>
                    <p className="mb-1 text-[12px]">Religion</p>
                    <select
                      value={filters.religion}
                      onChange={(e) => setFilters({ ...filters, religion: e.target.value })}
                      className="h-[34px] w-full rounded-[9px] bg-white px-2 text-[13px]"
                    >
                      <option>All</option>
                      {lifestyleTraits.book.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <p className="mb-1 text-[12px]">Schedule</p>
                    <select
                      value={filters.schedule}
                      onChange={(e) => setFilters({ ...filters, schedule: e.target.value })}
                      className="h-[34px] w-full rounded-[9px] bg-white px-2 text-[13px]"
                    >
                      <option>All</option>
                      {lifestyleTraits.circle.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <p className="mb-1 text-[12px]">Noise Level</p>
                    <select
                      value={filters.noise}
                      onChange={(e) => setFilters({ ...filters, noise: e.target.value })}
                      className="h-[34px] w-full rounded-[9px] bg-white px-2 text-[13px]"
                    >
                      <option>All</option>
                      {lifestyleTraits.noise.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <p className="mb-1 text-[12px]">Cleanliness</p>
                    <select
                      value={filters.cleanliness}
                      onChange={(e) => setFilters({ ...filters, cleanliness: e.target.value })}
                      className="h-[34px] w-full rounded-[9px] bg-white px-2 text-[13px]"
                    >
                      <option>All</option>
                      {lifestyleTraits.clean.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <p className="mb-1 text-[12px]">Need Apartment Between (Start)</p>
                    <input
                      type="date"
                      value={filters.apartmentStartDate}
                      onChange={(e) => setFilters({ ...filters, apartmentStartDate: e.target.value })}
                      className="h-[34px] w-full rounded-[9px] bg-white px-2 text-[13px] outline-none"
                    />
                  </div>
                  <div>
                    <p className="mb-1 text-[12px]">Need Apartment Between (End)</p>
                    <input
                      type="date"
                      value={filters.apartmentEndDate}
                      onChange={(e) => setFilters({ ...filters, apartmentEndDate: e.target.value })}
                      className="h-[34px] w-full rounded-[9px] bg-white px-2 text-[13px] outline-none"
                    />
                  </div>
                  <div>
                    <p className="mb-1 text-[12px]">Min Budget</p>
                    <input
                      value={filters.minBudget}
                      onChange={(e) => setFilters({ ...filters, minBudget: e.target.value })}
                      placeholder="Min budget"
                      className="h-[34px] w-full rounded-[9px] bg-white px-2 text-[13px] outline-none"
                    />
                  </div>
                  <div>
                    <p className="mb-1 text-[12px]">Max Budget</p>
                    <input
                      value={filters.maxBudget}
                      onChange={(e) => setFilters({ ...filters, maxBudget: e.target.value })}
                      placeholder="Max budget"
                      className="h-[34px] w-full rounded-[9px] bg-white px-2 text-[13px] outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      <div className="overflow-x-hidden overflow-y-visible px-0" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        {!match ? (
          <div className="mx-6 mb-6 rounded-[30px] bg-[#ebeff5] p-8 text-center text-[18px]">
            No more matches in this lineup.
          </div>
        ) : (
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
        <div className="mb-7 flex w-full flex-col">
          <div className="relative z-0 aspect-[3/4] w-full rounded-[51px] overflow-hidden">
            <img
              src={match.image}
              alt={match.name}
              className="w-full h-full object-cover"
            />
            <p className="pointer-events-none absolute left-5 top-5 text-[28px] font-light uppercase leading-none text-white">
              {match.name}
            </p>
          </div>
          <div
            className="relative z-10 -mt-20 flex w-full min-h-[7.75rem] items-center rounded-[22px] bg-white px-6 py-5 shadow-[0_3px_14px_rgba(0,0,0,0.06)]"
          >
            <p className="w-full text-left text-[14px] font-normal leading-relaxed text-neutral-900">
              {match.bio}
            </p>
          </div>
        </div>

        <div className="mb-6 w-full">
          <CompatibilityKeyMeter key={match.id} value={match.compatibilityScore} />
        </div>

        <MatchesBasicInfoArtboard
          age={match.age}
          genderDisplay={match.gender.charAt(0).toUpperCase() + match.gender.slice(1)}
          location={match.distanceLabel}
          priceRange={`$${match.budgetLow}–$${match.budgetHigh}`}
          timeRange={`${formatDisplayDate(match.apartmentStartDate)} – ${formatDisplayDate(match.apartmentEndDate)}`}
          politics={match.traits[1].label}
          education={match.education}
          occupation={match.occupation}
          religion={match.traits[2].label}
        />

        <MatchesLivingHabitsArtboard
          schedule={match.traits[0].label}
          noise={match.traits[3].label}
          cleanliness={match.traits[4].label}
          pets={match.pets}
          guestPolicy={match.guestPolicy}
          substanceUse={match.substanceUse}
        />
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
