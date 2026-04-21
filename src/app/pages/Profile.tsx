import { useState } from 'react';
import { MapPin, DollarSign, Circle, Home, BookOpen, Edit, Check } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import BottomNav from '../components/BottomNav';

const genders = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];
const religions = ['Christian', 'Muslim', 'Jewish', 'Hindu', 'Buddhist', 'Atheist', 'Agnostic', 'Other', 'Prefer not to say'];
const politicalViews = ['Right', 'Left', 'Not political', 'Moderate'];
const scheduleOptions = ['Morning person', 'Night person', 'Flexible'];
const noiseOptions = ['Very quiet', 'Quiet', 'Moderate', 'Loud'];
const cleanlinessOptions = ['Very clean', 'Clean', 'Average', 'Messy', 'Very messy'];

export default function Profile() {
  const [isEditingMain, setIsEditingMain] = useState(false);
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Your Name',
    image:
      'https://images.unsplash.com/photo-1546961329-78bef0414d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    bio: "Hi, my name is___ I'm a sophomore looking for housing! I'm a quiet roommate, mostly studying in my room. I love animals, music, and TV. Looking for someone similar!",
    age: '19',
    gender: 'Female',
    location: 'UTK',
    budget: '900',
    apartmentStartDate: '2026-08-01',
    apartmentEndDate: '2027-05-31',
    traits: ['Morning person', 'Not political', 'Christian', 'Moderate', 'Clean'],
  });

  const updateTrait = (index: number, value: string) => {
    const nextTraits = [...profile.traits];
    nextTraits[index] = value;
    setProfile({ ...profile, traits: nextTraits });
  };

  return (
    <div className="bg-white relative min-h-screen w-full max-w-md mx-auto pb-24">
      {/* Header */}
      <div className="flex items-center gap-4 px-6 pt-12 mb-8">
        <div className="size-[58px] rounded-full overflow-hidden bg-[#eaddff] flex items-center justify-center flex-shrink-0">
          <svg className="w-10 h-10" viewBox="0 0 40 37" fill="none">
            <path
              d="M20 11C23.3137 11 26 8.31371 26 5C26 1.68629 23.3137 -1 20 -1C16.6863 -1 14 1.68629 14 5C14 8.31371 16.6863 11 20 11Z"
              fill="#4F378A"
            />
            <path
              d="M6 36.5257C6 27.9167 12.9167 21 21.5257 21H18.4743C27.0833 21 34 27.9167 34 36.5257"
              fill="#4F378A"
            />
          </svg>
        </div>
        {isEditingMain ? (
          <input
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="bg-transparent border-b border-black/30 px-1 py-1 font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px] text-black w-full outline-none"
          />
        ) : (
          <p className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px] text-black">
            {profile.name}
          </p>
        )}
      </div>

      <div className="px-6">
        {/* Profile Image Card */}
        <div className="relative bg-[#d9d9d9] rounded-[51px] p-6 mb-6">
          <button
            className="absolute top-4 right-4 z-20 p-2 hover:opacity-80"
            onClick={() => setIsEditingMain((v) => !v)}
          >
            {isEditingMain ? <Check className="size-6" /> : <Edit className="size-6" />}
          </button>
          
          {/* Image Placeholder */}
          <div className="relative z-0 w-full aspect-square rounded-[20px] overflow-hidden mb-4 bg-[#c0c0c0] flex items-center justify-center">
            <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" />
          </div>
          {isEditingMain ? (
            <input
              value={profile.image}
              onChange={(e) => setProfile({ ...profile, image: e.target.value })}
              placeholder="Paste image URL"
              className="w-full bg-transparent border-b border-black/30 px-1 py-2 mb-3 font-['ABC_Diatype_Edu:Thin',sans-serif] text-[14px] outline-none"
            />
          ) : null}

          {/* Bio */}
          {isEditingMain ? (
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full min-h-[90px] bg-transparent border border-black/20 rounded-[11px] p-3 font-['ABC_Diatype_Edu:Thin',sans-serif] text-[14px] text-black outline-none resize-none"
            />
          ) : (
            <p className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[14px] text-black">
              {profile.bio}
            </p>
          )}
        </div>

        {/* Details Card */}
        <div className="relative bg-[#d9d9d9] rounded-[51px] p-6 shadow-lg">
          <button
            className="absolute top-4 right-4 z-20 p-2 hover:opacity-80"
            onClick={() => setIsEditingDetails((v) => !v)}
          >
            {isEditingDetails ? <Check className="size-6" /> : <Edit className="size-6" />}
          </button>

          {/* Stats Row */}
          <div className="no-scrollbar flex items-center border-b border-black pb-4 mb-4 gap-4 overflow-x-auto whitespace-nowrap flex-nowrap">
            {isEditingDetails ? (
              <input
                value={profile.age}
                onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                className="bg-transparent border-b border-black/30 px-1 py-1 w-[56px] font-['ABC_Diatype_Edu:Thin',sans-serif] text-[18px] outline-none"
              />
            ) : (
              <span className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px]">
                {profile.age}
              </span>
            )}
            <div className="w-px h-[35px] bg-black" />
            {isEditingDetails ? (
              <Select value={profile.gender} onValueChange={(value) => setProfile({ ...profile, gender: value })}>
                <SelectTrigger className="bg-transparent h-[34px] rounded-[8px] border border-black/20 w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {genders.map((option) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <span className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px]">
                {profile.gender}
              </span>
            )}
            <div className="w-px h-[35px] bg-black" />
            <div className="flex items-center gap-1">
              <MapPin className="size-5" />
              {isEditingDetails ? (
                <input
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="bg-transparent border-b border-black/30 px-1 py-1 w-[110px] font-['ABC_Diatype_Edu:Thin',sans-serif] text-[18px] outline-none"
                />
              ) : (
                <span className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px]">
                  {profile.location}
                </span>
              )}
            </div>
            <div className="w-px h-[35px] bg-black" />
            <div className="flex items-center gap-1">
              <DollarSign className="size-5" />
              {isEditingDetails ? (
                <input
                  value={profile.budget}
                  onChange={(e) => setProfile({ ...profile, budget: e.target.value })}
                  className="bg-transparent border-b border-black/30 px-1 py-1 w-[80px] font-['ABC_Diatype_Edu:Thin',sans-serif] text-[18px] outline-none"
                />
              ) : (
                <span className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px]">
                  {profile.budget}
                </span>
              )}
            </div>
            <div className="w-px h-[35px] bg-black" />
            {isEditingDetails ? (
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={profile.apartmentStartDate}
                  onChange={(e) => setProfile({ ...profile, apartmentStartDate: e.target.value })}
                  className="bg-transparent border-b border-black/30 px-1 py-1 w-[132px] font-['ABC_Diatype_Edu:Thin',sans-serif] text-[16px] outline-none"
                />
                <span className="text-[14px]">to</span>
                <input
                  type="date"
                  value={profile.apartmentEndDate}
                  onChange={(e) => setProfile({ ...profile, apartmentEndDate: e.target.value })}
                  className="bg-transparent border-b border-black/30 px-1 py-1 w-[132px] font-['ABC_Diatype_Edu:Thin',sans-serif] text-[16px] outline-none"
                />
              </div>
            ) : (
              <span className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px]">
                {profile.apartmentStartDate} to {profile.apartmentEndDate}
              </span>
            )}
          </div>

          {/* Traits */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Circle className="size-6 fill-[#d9d9d9]" />
              {isEditingDetails ? (
                <Select value={profile.traits[0]} onValueChange={(value) => updateTrait(0, value)}>
                  <SelectTrigger className="bg-transparent h-[34px] rounded-[8px] border border-black/20 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {scheduleOptions.map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <span className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px]">
                  {profile.traits[0]}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <Home className="size-6" />
              {isEditingDetails ? (
                <Select value={profile.traits[1]} onValueChange={(value) => updateTrait(1, value)}>
                  <SelectTrigger className="bg-transparent h-[34px] rounded-[8px] border border-black/20 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {politicalViews.map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <span className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px]">
                  {profile.traits[1]}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <BookOpen className="size-6" />
              {isEditingDetails ? (
                <Select value={profile.traits[2]} onValueChange={(value) => updateTrait(2, value)}>
                  <SelectTrigger className="bg-transparent h-[34px] rounded-[8px] border border-black/20 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {religions.map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <span className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px]">
                  {profile.traits[2]}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <svg className="size-6" viewBox="0 0 24 24" fill="none">
                <path d="M12 3L15 9L12 15L9 9L12 3Z" stroke="currentColor" strokeWidth="2" />
                <line x1="9" y1="12" x2="15" y2="12" stroke="currentColor" strokeWidth="2" />
              </svg>
              {isEditingDetails ? (
                <Select value={profile.traits[3]} onValueChange={(value) => updateTrait(3, value)}>
                  <SelectTrigger className="bg-transparent h-[34px] rounded-[8px] border border-black/20 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {noiseOptions.map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <span className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px]">
                  {profile.traits[3]}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <svg className="size-6" viewBox="0 0 24 24" fill="none">
                <path d="M12 3L12 21M6 9L18 9M9 15L15 15" stroke="currentColor" strokeWidth="2" />
              </svg>
              {isEditingDetails ? (
                <Select value={profile.traits[4]} onValueChange={(value) => updateTrait(4, value)}>
                  <SelectTrigger className="bg-transparent h-[34px] rounded-[8px] border border-black/20 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cleanlinessOptions.map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <span className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px]">
                  {profile.traits[4]}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
