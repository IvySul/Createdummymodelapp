import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { Slider } from "../components/ui/slider";

export default function QuestionnaireStep2() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bio: '',
    budget: [500],
    substances: '',
    pets: '',
    cleanliness: '',
    guests: '',
    schedule: '',
    noise: '',
  });

  const substanceOptions = ['Never', 'Socially', 'Regularly', 'Prefer not to say'];
  const petOptions = ['No pets', 'Have pets', 'Love pets but don\'t have', 'Allergic to pets'];
  const cleanlinessOptions = ['Very clean', 'Clean', 'Average', 'Messy', 'Very messy'];
  const guestOptions = ['Love guests', 'Okay with guests', 'Rarely have guests', 'No guests'];
  const scheduleOptions = ['Morning person', 'Night person', 'Flexible'];
  const noiseOptions = ['Very quiet', 'Quiet', 'Moderate', 'Loud'];

  return (
    <div className="bg-white relative min-h-screen w-full overflow-y-auto pb-24">
      <div className="max-w-md mx-auto px-8 pt-12">
        <p className="font-['ABC_Diatype_Edu:Regular',sans-serif] text-[40px] text-black mb-8">
          Questionnaire
        </p>

        {/* Bio */}
        <div className="mb-8">
          <p className="font-['ABC_Diatype_Edu:Regular',sans-serif] text-[24px] text-black mb-2">
            Bio
          </p>
          <Textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            placeholder="Tell us about yourself..."
            className="bg-[#d9d9d9] min-h-[95px] rounded-[11px] border-none font-['ABC_Diatype_Edu:Regular',sans-serif] resize-none"
          />
        </div>

        {/* Budget */}
        <div className="mb-8">
          <p className="font-['ABC_Diatype_Edu:Regular',sans-serif] text-[16px] text-black mb-4">
            Budget
          </p>
          <div className="flex items-center gap-4">
            <div className="bg-[#d9d9d9] h-[30px] rounded-[11px] px-3 flex items-center justify-center min-w-[60px]">
              <span className="font-['ABC_Diatype_Edu:Regular',sans-serif] text-[16px]">0</span>
            </div>
            <Slider
              value={formData.budget}
              onValueChange={(value) => setFormData({ ...formData, budget: value })}
              min={0}
              max={10000}
              step={100}
              className="flex-1"
            />
            <div className="bg-[#d9d9d9] h-[30px] rounded-[11px] px-3 flex items-center justify-center min-w-[60px]">
              <span className="font-['ABC_Diatype_Edu:Regular',sans-serif] text-[16px]">10000</span>
            </div>
          </div>
          <div className="mt-2 text-center">
            <span className="font-['ABC_Diatype_Edu:Regular',sans-serif] text-[20px]">
              ${formData.budget[0]}
            </span>
          </div>
        </div>

        {/* Living Habits Section */}
        <p className="font-['ABC_Diatype_Edu:Regular',sans-serif] text-[24px] text-black mb-6">
          Living Habits
        </p>

        {/* Substances */}
        <div className="mb-6">
          <p className="font-['ABC_Diatype_Edu:Regular',sans-serif] text-[16px] text-black mb-2">
            Do you smoke, drink, or use other substances?
          </p>
          <Select value={formData.substances} onValueChange={(value) => setFormData({ ...formData, substances: value })}>
            <SelectTrigger className="bg-[#d9d9d9] h-[38px] rounded-[11px] border-none w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {substanceOptions.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Pets */}
        <div className="mb-6">
          <p className="font-['ABC_Diatype_Edu:Regular',sans-serif] text-[16px] text-black mb-2">
            Do you have any pets?
          </p>
          <Select value={formData.pets} onValueChange={(value) => setFormData({ ...formData, pets: value })}>
            <SelectTrigger className="bg-[#d9d9d9] h-[37px] rounded-[11px] border-none w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {petOptions.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Cleanliness */}
        <div className="mb-6">
          <p className="font-['ABC_Diatype_Edu:Regular',sans-serif] text-[16px] text-black mb-2">
            How clean do you keep your space?
          </p>
          <Select value={formData.cleanliness} onValueChange={(value) => setFormData({ ...formData, cleanliness: value })}>
            <SelectTrigger className="bg-[#d9d9d9] h-[37px] rounded-[11px] border-none w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {cleanlinessOptions.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Guests */}
        <div className="mb-6">
          <p className="font-['ABC_Diatype_Edu:Regular',sans-serif] text-[16px] text-black mb-2">
            Thoughts on guests?
          </p>
          <Select value={formData.guests} onValueChange={(value) => setFormData({ ...formData, guests: value })}>
            <SelectTrigger className="bg-[#d9d9d9] h-[37px] rounded-[11px] border-none w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {guestOptions.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Schedule */}
        <div className="mb-6">
          <p className="font-['ABC_Diatype_Edu:Regular',sans-serif] text-[16px] text-black mb-2">
            Morning or night person?
          </p>
          <Select value={formData.schedule} onValueChange={(value) => setFormData({ ...formData, schedule: value })}>
            <SelectTrigger className="bg-[#d9d9d9] h-[37px] rounded-[11px] border-none w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {scheduleOptions.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Noise */}
        <div className="mb-12">
          <p className="font-['ABC_Diatype_Edu:Regular',sans-serif] text-[16px] text-black mb-2">
            Noise level
          </p>
          <Select value={formData.noise} onValueChange={(value) => setFormData({ ...formData, noise: value })}>
            <SelectTrigger className="bg-[#d9d9d9] h-[37px] rounded-[11px] border-none w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {noiseOptions.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Get Matching Button */}
        <button
          onClick={() => navigate('/matches')}
          className="flex items-center gap-2 ml-auto mb-8"
        >
          <p className="font-['ABC_Diatype_Edu:Regular',sans-serif] text-[16px] text-black">
            Get Matching
          </p>
          <ChevronDown className="rotate-[-90deg] size-6" />
        </button>
      </div>
    </div>
  );
}
