import { useMemo, useState } from 'react';
import { Edit, Check } from 'lucide-react';
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
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Your Name',
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
  });

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

  return (
    <div className="relative min-h-screen w-full max-w-md mx-auto bg-white pb-24">
      {/* Same top gutter rhythm as Matches (menu strip height) */}
      <div className="flex items-center px-6 pt-12 mb-8">
        <div className="size-9" aria-hidden />
      </div>

      <div className="px-6 overflow-x-hidden overflow-y-visible">
        <div className="mb-7 flex w-full flex-col">
          <div className="relative z-0 aspect-[3/4] w-full rounded-[51px] overflow-hidden">
            <button
              type="button"
              className="absolute top-4 right-4 z-20 rounded-full bg-black/25 p-2 text-white hover:bg-black/35"
              onClick={() => setIsEditing((v) => !v)}
              aria-label={isEditing ? 'Finish editing profile' : 'Edit profile'}
            >
              {isEditing ? <Check className="size-6" /> : <Edit className="size-6" />}
            </button>
            <img src={profile.image} alt={profile.name} className="h-full w-full object-cover" />
            {isEditing ? (
              <input
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="absolute left-5 top-5 max-w-[calc(100%-5rem)] bg-transparent font-['Open_Sans',sans-serif] text-[28px] font-light uppercase leading-none text-white outline-none placeholder:text-white/70 drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]"
              />
            ) : (
              <p className="pointer-events-none absolute left-5 top-5 font-['Open_Sans',sans-serif] text-[28px] font-light uppercase leading-none text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]">
                {profile.name}
              </p>
            )}
          </div>

          <div className="relative z-10 -mt-20 flex w-full min-h-[7.75rem] flex-col rounded-[22px] bg-white px-6 py-5 shadow-[0_4px_18px_rgba(0,0,0,0.12)]">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={profile.image}
                  onChange={(e) => setProfile({ ...profile, image: e.target.value })}
                  placeholder="Paste image URL"
                  className="mb-3 w-full border-b border-black/25 bg-transparent font-['Open_Sans',sans-serif] text-[13px] text-neutral-800 outline-none"
                />
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="min-h-[7rem] w-full resize-none border border-black/15 bg-transparent px-1 py-2 font-['Open_Sans',sans-serif] text-[14px] font-normal leading-relaxed text-neutral-900 outline-none"
                />
              </>
            ) : (
              <p className="w-full text-left font-['Open_Sans',sans-serif] text-[14px] font-normal leading-relaxed text-neutral-900">
                {profile.bio}
              </p>
            )}
          </div>
        </div>

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

        <MatchesLivingHabitsArtboard
          schedule={profile.traits[0]}
          noise={profile.traits[3]}
          cleanliness={profile.traits[4]}
          pets={profile.pets}
          guestPolicy={profile.guestPolicy}
          substanceUse={profile.substanceUse}
        />

        {isEditing ? (
          <div className="relative mt-8 flex w-full flex-col rounded-[22px] bg-[#eaeaea] p-6 shadow-[0_4px_18px_rgba(0,0,0,0.08)]">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="mb-1 font-['ABC_Diatype_Edu:Regular',sans-serif] text-[12px]">Age</p>
                <input
                  value={profile.age}
                  onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                  inputMode="numeric"
                  className="h-[34px] w-full rounded-[9px] border border-black/15 bg-white px-3 font-['Open_Sans',sans-serif] text-[14px] outline-none"
                />
              </div>
              <div>
                <p className="mb-1 font-['ABC_Diatype_Edu:Regular',sans-serif] text-[12px]">Gender</p>
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
                <p className="mb-1 font-['ABC_Diatype_Edu:Regular',sans-serif] text-[12px]">
                  Distance label (shows on card)
                </p>
                <input
                  value={profile.distanceLabel}
                  onChange={(e) => setProfile({ ...profile, distanceLabel: e.target.value })}
                  className="h-[34px] w-full rounded-[9px] border border-black/15 bg-white px-3 font-['Open_Sans',sans-serif] text-[14px] outline-none"
                  placeholder='e.g. "12 miles away"'
                />
              </div>
              <div>
                <p className="mb-1 font-['ABC_Diatype_Edu:Regular',sans-serif] text-[12px]">
                  Budget midpoint ($)
                </p>
                <input
                  value={profile.budget}
                  onChange={(e) => setProfile({ ...profile, budget: e.target.value })}
                  inputMode="numeric"
                  className="h-[34px] w-full rounded-[9px] border border-black/15 bg-white px-3 font-['Open_Sans',sans-serif] text-[14px] outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="mb-1 font-['ABC_Diatype_Edu:Regular',sans-serif] text-[12px]">Lease start</p>
                  <input
                    type="date"
                    value={profile.apartmentStartDate}
                    onChange={(e) => setProfile({ ...profile, apartmentStartDate: e.target.value })}
                    className="h-[34px] w-full rounded-[9px] border border-black/15 bg-white px-2 text-[13px] outline-none"
                  />
                </div>
                <div>
                  <p className="mb-1 font-['ABC_Diatype_Edu:Regular',sans-serif] text-[12px]">Lease end</p>
                  <input
                    type="date"
                    value={profile.apartmentEndDate}
                    onChange={(e) => setProfile({ ...profile, apartmentEndDate: e.target.value })}
                    className="h-[34px] w-full rounded-[9px] border border-black/15 bg-white px-2 text-[13px] outline-none"
                  />
                </div>
              </div>
              <div>
                <p className="mb-1 font-['ABC_Diatype_Edu:Regular',sans-serif] text-[12px]">Education</p>
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
                <p className="mb-1 font-['ABC_Diatype_Edu:Regular',sans-serif] text-[12px]">Occupation</p>
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
                <p className="mb-1 font-['ABC_Diatype_Edu:Regular',sans-serif] text-[12px]">Schedule</p>
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
                <p className="mb-1 font-['ABC_Diatype_Edu:Regular',sans-serif] text-[12px]">Politics</p>
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
                <p className="mb-1 font-['ABC_Diatype_Edu:Regular',sans-serif] text-[12px]">Religion</p>
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
              <div>
                <p className="mb-1 font-['ABC_Diatype_Edu:Regular',sans-serif] text-[12px]">Noise level</p>
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
                <p className="mb-1 font-['ABC_Diatype_Edu:Regular',sans-serif] text-[12px]">Cleanliness</p>
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
                <p className="mb-1 font-['ABC_Diatype_Edu:Regular',sans-serif] text-[12px]">Pets</p>
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
                <p className="mb-1 font-['ABC_Diatype_Edu:Regular',sans-serif] text-[12px]">Guest policy</p>
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
                <p className="mb-1 font-['ABC_Diatype_Edu:Regular',sans-serif] text-[12px]">Substance use</p>
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
        ) : null}
      </div>

      <BottomNav />
    </div>
  );
}
