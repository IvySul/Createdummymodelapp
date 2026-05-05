import { useEffect, useMemo, useRef, useState } from 'react';
import { Edit, Check } from 'lucide-react';
import { useLocation } from 'react-router';
import BottomNav from '../components/BottomNav';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { MatchesBasicInfoArtboard } from '../components/matches/MatchesBasicInfoArtboard';
import { MatchesLivingHabitsArtboard } from '../components/matches/MatchesLivingHabitsArtboard';

const DEFAULT_NAME = 'Olivia';

function readQuestionnaireStep1(): Record<string, string> | null {
  try {
    const raw = localStorage.getItem('questionnaireStep1');
    if (!raw) return null;
    return JSON.parse(raw) as Record<string, string>;
  } catch {
    return null;
  }
}

/** Name shown everywhere: questionnaire `name`, or Olivia if missing/blank. */
function displayNameFromQuestionnaire(): string {
  const parsed = readQuestionnaireStep1();
  const trimmed = typeof parsed?.name === 'string' ? parsed.name.trim() : '';
  return trimmed !== '' ? trimmed : DEFAULT_NAME;
}

function persistQuestionnaireName(nextName: string) {
  const prev = readQuestionnaireStep1() ?? {};
  localStorage.setItem('questionnaireStep1', JSON.stringify({ ...prev, name: nextName }));
}

const genders = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];
const religions = ['Christian', 'Muslim', 'Jewish', 'Hindu', 'Buddhist', 'Atheist', 'Agnostic', 'Other', 'Prefer not to say'];
const politicalViews = ['Right', 'Left', 'Not political', 'Moderate'];
const scheduleOptions = ['Morning Person', 'Night Owl', 'Flexible Schedule'];
const noiseOptions = ['Very quiet', 'Quiet', 'Moderate', 'Loud'];
const cleanlinessOptions = ['Very clean', 'Clean', 'Average', 'Messy', 'Very messy'];
const educationOptions = ['Undergraduate', 'Sophomore', 'Junior', 'Senior', 'Graduate student'];
const occupationOptions = ['Student', 'Part-time retail', 'Campus dining', 'Intern', 'Tutor', 'Barista', 'Research assistant'];
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

export default function Profile() {
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const basicFieldsRef = useRef<HTMLDivElement>(null);
  const livingFieldsRef = useRef<HTMLDivElement>(null);

  const [profile, setProfile] = useState(() => ({
    name: displayNameFromQuestionnaire(),
    image:
      'https://images.unsplash.com/photo-1546961329-78bef0414d7c?auto=format&fit=crop&w=2400&q=90',
    bio: "Hi, my name is___ I'm a sophomore looking for housing! I'm a quiet roommate, mostly studying in my room. I love animals, music, and TV. Looking for someone similar!",
    age: '19',
    gender: 'Female',
    distanceLabel: '12 miles away',
    budget: '900',
    apartmentStartDate: '2026-08-01',
    apartmentEndDate: '2027-05-31',
    education: 'Sophomore',
    occupation: 'Student',
    traits: ['Morning Person', 'Not political', 'Christian', 'Quiet', 'Clean'] as string[],
    pets: 'No pets',
    guestPolicy: 'Rarely',
    substanceUse: 'Non-smoker',
  }));

  useEffect(() => {
    if (location.pathname !== '/profile') return;
    setProfile((prev) => ({ ...prev, name: displayNameFromQuestionnaire() }));
  }, [location.pathname]);

  const resolvedName = (profile.name || '').trim() || DEFAULT_NAME;

  const { budgetLow, budgetHigh } = useMemo(() => {
    const b = Number.parseInt(profile.budget, 10);
    const n = Number.isNaN(b) ? 900 : b;
    return { budgetLow: Math.max(200, n - 200), budgetHigh: n + 200 };
  }, [profile.budget]);

  const ageDisplay = Number.parseInt(profile.age, 10);

  const updateTrait = (index: number, value: string) => {
    const nextTraits = [...profile.traits];
    nextTraits[index] = value;
    setProfile({ ...profile, traits: nextTraits });
  };

  const genderDisplay = profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1);

  const toggleHeroEditing = () => setIsEditing((v) => !v);

  const scrollToEditingSection = (which: 'basic' | 'living') => {
    setIsEditing(true);
    window.requestAnimationFrame(() => {
      const el = which === 'basic' ? basicFieldsRef.current : livingFieldsRef.current;
      el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  };

  const setNameAndSyncQuestionnaire = (raw: string) => {
    setProfile((prev) => ({ ...prev, name: raw }));
    persistQuestionnaireName(raw);
  };

  return (
    <div className="relative isolate mx-auto min-h-screen w-full max-w-md overflow-x-hidden bg-white pb-24">
      <div className="flex min-w-0 items-center gap-4 px-6 pt-12 mb-8">
        <div className="size-[58px] shrink-0 overflow-hidden rounded-full bg-[#eaddff] ring-1 ring-black/10">
          <img
            src={profile.image}
            alt=""
            className="h-full w-full object-cover object-top"
            decoding="async"
            aria-hidden
          />
        </div>
        {isEditing ? (
          <input
            value={profile.name}
            onChange={(e) => setNameAndSyncQuestionnaire(e.target.value)}
            className="min-w-0 flex-1 bg-transparent text-[22px] font-light uppercase leading-tight text-black outline-none placeholder:text-black/40"
            placeholder={DEFAULT_NAME}
            aria-label="Your name"
          />
        ) : (
          <p className="min-w-0 flex-1 truncate text-[22px] font-light uppercase leading-tight text-black">
            {resolvedName}
          </p>
        )}
      </div>

      <div className="overflow-x-hidden overflow-y-visible px-0">
        <div className="mb-7 flex w-full flex-col">
          <div className="relative z-0 aspect-[3/4] w-full rounded-[51px] overflow-hidden">
            <button
              type="button"
              className="absolute top-4 right-4 z-20 rounded-full bg-black/25 p-2 text-white hover:bg-black/35"
              onClick={toggleHeroEditing}
              aria-label={isEditing ? 'Finish editing photo and bio' : 'Edit photo and bio'}
            >
              {isEditing ? <Check className="size-6" /> : <Edit className="size-6" />}
            </button>
            <img src={profile.image} alt={resolvedName} className="h-full w-full object-cover" />
          </div>

          <div className="relative z-10 -mt-20 flex w-full min-h-[7.75rem] flex-col rounded-[22px] bg-white px-6 py-5 shadow-[0_4px_18px_rgba(0,0,0,0.12)]">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={profile.image}
                  onChange={(e) => setProfile({ ...profile, image: e.target.value })}
                  placeholder="Paste image URL"
                  className="mb-3 w-full border-b border-black/25 bg-transparent text-[13px] text-neutral-800 outline-none"
                />
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="min-h-[7rem] w-full resize-none border border-black/15 bg-transparent px-1 py-2 text-[14px] font-normal leading-relaxed text-neutral-900 outline-none"
                />
              </>
            ) : (
              <p className="w-full text-left text-[14px] font-normal leading-relaxed text-neutral-900">
                {profile.bio}
              </p>
            )}
          </div>
        </div>

        <div className="relative w-full">
          <button
            type="button"
            className="absolute right-4 top-4 z-[30] rounded-full bg-white/95 p-2 text-neutral-900 shadow-[0_2px_12px_rgba(0,0,0,0.12)] ring-1 ring-black/10 hover:bg-white"
            onClick={() => scrollToEditingSection('basic')}
            aria-label="Edit basic info"
          >
            <Edit className="size-5" aria-hidden />
          </button>
          <MatchesBasicInfoArtboard
            age={Number.isNaN(ageDisplay) ? 0 : ageDisplay}
            genderDisplay={genderDisplay}
            location={profile.distanceLabel}
            priceRange={`$${budgetLow}–$${budgetHigh}`}
            timeRange={`${formatDisplayDate(profile.apartmentStartDate)} – ${formatDisplayDate(profile.apartmentEndDate)}`}
            politics={profile.traits[1]}
            education={profile.education}
            occupation={profile.occupation}
            religion={profile.traits[2]}
          />
        </div>

        <div className="relative w-full">
          <button
            type="button"
            className="absolute right-4 top-9 z-[30] rounded-full bg-white/95 p-2 text-neutral-900 shadow-[0_2px_12px_rgba(0,0,0,0.12)] ring-1 ring-black/10 hover:bg-white"
            onClick={() => scrollToEditingSection('living')}
            aria-label="Edit living habits"
          >
            <Edit className="size-5" aria-hidden />
          </button>
          <MatchesLivingHabitsArtboard
            schedule={profile.traits[0]}
            noise={profile.traits[3]}
            cleanliness={profile.traits[4]}
            pets={profile.pets}
            guestPolicy={profile.guestPolicy}
            substanceUse={profile.substanceUse}
          />
        </div>

        {isEditing ? (
          <div className="relative mt-8 flex w-full flex-col rounded-[22px] bg-[#ebeff5] p-6 shadow-[0_4px_18px_rgba(0,0,0,0.08)]">
            <div ref={basicFieldsRef}>
              <p className="mb-4 text-[16px] text-black">Basic info</p>
              <div className="grid grid-cols-1 gap-4 pb-8">
                <div>
                  <p className="mb-1 text-[12px]">Age</p>
                  <input
                    value={profile.age}
                    onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                    inputMode="numeric"
                    className="h-[34px] w-full rounded-[9px] border border-black/15 bg-white px-3 text-[14px] outline-none"
                  />
                </div>
                <div>
                  <p className="mb-1 text-[12px]">Gender</p>
                  <Select value={profile.gender} onValueChange={(value) => setProfile({ ...profile, gender: value })}>
                    <SelectTrigger className="h-[34px] w-full rounded-[9px] border border-black/15 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {genders.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="mb-1 text-[12px]">
                    Distance label (shows on card)
                  </p>
                  <input
                    value={profile.distanceLabel}
                    onChange={(e) => setProfile({ ...profile, distanceLabel: e.target.value })}
                    className="h-[34px] w-full rounded-[9px] border border-black/15 bg-white px-3 text-[14px] outline-none"
                    placeholder='e.g. "12 miles away"'
                  />
                </div>
                <div>
                  <p className="mb-1 text-[12px]">
                    Budget midpoint ($)
                  </p>
                  <input
                    value={profile.budget}
                    onChange={(e) => setProfile({ ...profile, budget: e.target.value })}
                    inputMode="numeric"
                    className="h-[34px] w-full rounded-[9px] border border-black/15 bg-white px-3 text-[14px] outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="mb-1 text-[12px]">Lease start</p>
                    <input
                      type="date"
                      value={profile.apartmentStartDate}
                      onChange={(e) => setProfile({ ...profile, apartmentStartDate: e.target.value })}
                      className="h-[34px] w-full rounded-[9px] border border-black/15 bg-white px-2 text-[13px] outline-none"
                    />
                  </div>
                  <div>
                    <p className="mb-1 text-[12px]">Lease end</p>
                    <input
                      type="date"
                      value={profile.apartmentEndDate}
                      onChange={(e) => setProfile({ ...profile, apartmentEndDate: e.target.value })}
                      className="h-[34px] w-full rounded-[9px] border border-black/15 bg-white px-2 text-[13px] outline-none"
                    />
                  </div>
                </div>
                <div>
                  <p className="mb-1 text-[12px]">Education</p>
                  <Select value={profile.education} onValueChange={(value) => setProfile({ ...profile, education: value })}>
                    <SelectTrigger className="h-[34px] w-full rounded-[9px] border border-black/15 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {educationOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="mb-1 text-[12px]">Occupation</p>
                  <Select value={profile.occupation} onValueChange={(value) => setProfile({ ...profile, occupation: value })}>
                    <SelectTrigger className="h-[34px] w-full rounded-[9px] border border-black/15 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {occupationOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="mb-1 text-[12px]">Politics</p>
                  <Select value={profile.traits[1]} onValueChange={(value) => updateTrait(1, value)}>
                    <SelectTrigger className="h-[34px] w-full rounded-[9px] border border-black/15 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {politicalViews.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="mb-1 text-[12px]">Religion</p>
                  <Select value={profile.traits[2]} onValueChange={(value) => updateTrait(2, value)}>
                    <SelectTrigger className="h-[34px] w-full rounded-[9px] border border-black/15 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {religions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div ref={livingFieldsRef} className="border-t border-black/10 pt-6">
              <p className="mb-4 text-[16px] text-black">Living habits</p>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <p className="mb-1 text-[12px]">Schedule</p>
                  <Select value={profile.traits[0]} onValueChange={(value) => updateTrait(0, value)}>
                    <SelectTrigger className="h-[34px] w-full rounded-[9px] border border-black/15 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {scheduleOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="mb-1 text-[12px]">Noise level</p>
                  <Select value={profile.traits[3]} onValueChange={(value) => updateTrait(3, value)}>
                    <SelectTrigger className="h-[34px] w-full rounded-[9px] border border-black/15 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {noiseOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="mb-1 text-[12px]">Cleanliness</p>
                  <Select value={profile.traits[4]} onValueChange={(value) => updateTrait(4, value)}>
                    <SelectTrigger className="h-[34px] w-full rounded-[9px] border border-black/15 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cleanlinessOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="mb-1 text-[12px]">Pets</p>
                  <Select value={profile.pets} onValueChange={(value) => setProfile({ ...profile, pets: value })}>
                    <SelectTrigger className="h-[34px] w-full rounded-[9px] border border-black/15 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {petsOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="mb-1 text-[12px]">Guest policy</p>
                  <Select
                    value={profile.guestPolicy}
                    onValueChange={(value) => setProfile({ ...profile, guestPolicy: value })}
                  >
                    <SelectTrigger className="h-[34px] w-full rounded-[9px] border border-black/15 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {guestPolicyOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="mb-1 text-[12px]">Substance use</p>
                  <Select
                    value={profile.substanceUse}
                    onValueChange={(value) => setProfile({ ...profile, substanceUse: value })}
                  >
                    <SelectTrigger className="h-[34px] w-full rounded-[9px] border border-black/15 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {substanceUseOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <BottomNav />
    </div>
  );
}
