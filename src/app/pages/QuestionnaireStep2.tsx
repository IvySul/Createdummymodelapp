import { useEffect, useState } from 'react';
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
import { Input } from "../components/ui/input";

export default function QuestionnaireStep2() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bio: '',
    budget: [500, 2500],
    apartmentStartDate: '',
    apartmentEndDate: '',
    drinking: '',
    smoking: '',
    otherSubstances: '',
    pets: '',
    cleanliness: '',
    guests: '',
    schedule: '',
    noise: '',
  });
  const [budgetRange, setBudgetRange] = useState({
    min: 0,
    max: 10000,
  });
  const [budgetRangeInput, setBudgetRangeInput] = useState({
    min: '0',
    max: '10000',
  });

  const substanceOptions = ['Never', 'Socially', 'Regularly', 'Prefer not to say'];
  const petOptions = ['No pets', 'Have pets', 'Love pets but don\'t have', 'Allergic to pets'];
  const cleanlinessOptions = ['Very clean', 'Clean', 'Average', 'Messy', 'Very messy'];
  const guestOptions = ['Love guests', 'Okay with guests', 'Rarely have guests', 'No guests'];
  const scheduleOptions = ['Morning person', 'Night person', 'Flexible'];
  const noiseOptions = ['Very quiet', 'Quiet', 'Moderate', 'Loud'];

  const commitBudgetRangeInput = (field: 'min' | 'max') => {
    const rawValue = budgetRangeInput[field];
    const fallbackValue = budgetRange[field];

    if (rawValue.trim() === '') {
      setBudgetRangeInput({
        ...budgetRangeInput,
        [field]: String(fallbackValue),
      });
      return;
    }

    const parsed = Number(rawValue);
    if (Number.isNaN(parsed)) {
      setBudgetRangeInput({
        ...budgetRangeInput,
        [field]: String(fallbackValue),
      });
      return;
    }

    const clampedValue = Math.min(10000, Math.max(0, parsed));
    const next = { ...budgetRange, [field]: clampedValue };

    if (next.min >= next.max) {
      setBudgetRangeInput({
        ...budgetRangeInput,
        min: String(budgetRange.min),
        max: String(budgetRange.max),
      });
      return;
    }

    const clampedBudgetMin = Math.min(next.max, Math.max(next.min, formData.budget[0]));
    const clampedBudgetMax = Math.min(next.max, Math.max(next.min, formData.budget[1]));
    const normalizedBudget = [
      Math.min(clampedBudgetMin, clampedBudgetMax),
      Math.max(clampedBudgetMin, clampedBudgetMax),
    ];
    setBudgetRange(next);
    setBudgetRangeInput({
      min: String(next.min),
      max: String(next.max),
    });
    setFormData({ ...formData, budget: normalizedBudget });
  };

  useEffect(() => {
    localStorage.setItem('questionnaireStep2', JSON.stringify(formData));
  }, [formData]);

  return (
    <div className="relative isolate mx-auto min-h-screen w-full max-w-md overflow-x-hidden bg-white pb-24">
      <div className="px-6 pt-12">
        <p className="text-[40px] text-black mb-8">
          Questionnaire
        </p>

        {/* Bio */}
        <div className="mb-8">
          <p className="text-[24px] text-black mb-2">
            Bio
          </p>
          <Textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            placeholder="Tell us about yourself..."
            className="bg-[#ebeff5] min-h-[95px] rounded-[11px] border-none resize-none"
          />
        </div>

        {/* Budget */}
        <div className="mb-8">
          <p className="text-[16px] text-black mb-4">
            Budget
          </p>
          <div className="flex items-center gap-4">
            <Input
              type="number"
              value={budgetRangeInput.min}
              onChange={(e) => setBudgetRangeInput({ ...budgetRangeInput, min: e.target.value })}
              onBlur={() => commitBudgetRangeInput('min')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.currentTarget.blur();
                }
              }}
              className="no-number-spinner bg-[#ebeff5] h-[30px] rounded-[11px] border-none px-2 text-center text-[16px] min-w-[60px] w-[60px]"
            />
            <Slider
              value={formData.budget}
              onValueChange={(value) => setFormData({ ...formData, budget: value })}
              min={budgetRange.min}
              max={budgetRange.max}
              step={100}
              className="flex-1"
            />
            <Input
              type="number"
              value={budgetRangeInput.max}
              onChange={(e) => setBudgetRangeInput({ ...budgetRangeInput, max: e.target.value })}
              onBlur={() => commitBudgetRangeInput('max')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.currentTarget.blur();
                }
              }}
              className="no-number-spinner bg-[#ebeff5] h-[30px] rounded-[11px] border-none px-2 text-center text-[16px] min-w-[60px] w-[60px]"
            />
          </div>
          <div className="mt-2 text-center">
            <span className="text-[20px]">
              ${formData.budget[0]} - ${formData.budget[1]}
            </span>
          </div>
        </div>

        {/* Living Habits Section */}
        <p className="text-[24px] text-black mb-6">
          Living Habits
        </p>

        {/* Apartment Date Range */}
        <div className="mb-6">
          <p className="text-[16px] text-black mb-2">
            How long do you need an apartment?
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="date"
              value={formData.apartmentStartDate}
              onChange={(e) => setFormData({ ...formData, apartmentStartDate: e.target.value })}
              className="bg-[#ebeff5] h-[37px] rounded-[11px] border-none"
            />
            <Input
              type="date"
              value={formData.apartmentEndDate}
              onChange={(e) => setFormData({ ...formData, apartmentEndDate: e.target.value })}
              className="bg-[#ebeff5] h-[37px] rounded-[11px] border-none"
            />
          </div>
        </div>

        {/* Substances */}
        <div className="mb-6">
          <p className="text-[16px] text-black mb-3">
            Drinking / Smoking / Other substances
          </p>
          <div className="grid grid-cols-3 gap-2">
            <Select value={formData.drinking} onValueChange={(value) => setFormData({ ...formData, drinking: value })}>
              <SelectTrigger className="bg-[#ebeff5] h-[38px] rounded-[11px] border-none w-full">
                <SelectValue placeholder="Drinking" />
              </SelectTrigger>
              <SelectContent>
                {substanceOptions.map(option => (
                  <SelectItem key={`drinking-${option}`} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={formData.smoking} onValueChange={(value) => setFormData({ ...formData, smoking: value })}>
              <SelectTrigger className="bg-[#ebeff5] h-[38px] rounded-[11px] border-none w-full">
                <SelectValue placeholder="Smoking" />
              </SelectTrigger>
              <SelectContent>
                {substanceOptions.map(option => (
                  <SelectItem key={`smoking-${option}`} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={formData.otherSubstances} onValueChange={(value) => setFormData({ ...formData, otherSubstances: value })}>
              <SelectTrigger className="bg-[#ebeff5] h-[38px] rounded-[11px] border-none w-full">
                <SelectValue placeholder="Other" />
              </SelectTrigger>
              <SelectContent>
                {substanceOptions.map(option => (
                  <SelectItem key={`other-${option}`} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Pets */}
        <div className="mb-6">
          <p className="text-[16px] text-black mb-2">
            Do you have any pets?
          </p>
          <Select value={formData.pets} onValueChange={(value) => setFormData({ ...formData, pets: value })}>
            <SelectTrigger className="bg-[#ebeff5] h-[37px] rounded-[11px] border-none w-full">
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
          <p className="text-[16px] text-black mb-2">
            How clean do you keep your space?
          </p>
          <Select value={formData.cleanliness} onValueChange={(value) => setFormData({ ...formData, cleanliness: value })}>
            <SelectTrigger className="bg-[#ebeff5] h-[37px] rounded-[11px] border-none w-full">
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
          <p className="text-[16px] text-black mb-2">
            Thoughts on guests?
          </p>
          <Select value={formData.guests} onValueChange={(value) => setFormData({ ...formData, guests: value })}>
            <SelectTrigger className="bg-[#ebeff5] h-[37px] rounded-[11px] border-none w-full">
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
          <p className="text-[16px] text-black mb-2">
            Morning or night person?
          </p>
          <Select value={formData.schedule} onValueChange={(value) => setFormData({ ...formData, schedule: value })}>
            <SelectTrigger className="bg-[#ebeff5] h-[37px] rounded-[11px] border-none w-full">
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
          <p className="text-[16px] text-black mb-2">
            Noise level
          </p>
          <Select value={formData.noise} onValueChange={(value) => setFormData({ ...formData, noise: value })}>
            <SelectTrigger className="bg-[#ebeff5] h-[37px] rounded-[11px] border-none w-full">
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
          onClick={() => {
            localStorage.setItem('questionnaireStep2', JSON.stringify(formData));
            navigate('/matches');
          }}
          className="flex items-center gap-2 ml-auto mb-8"
        >
          <p className="text-[16px] text-black">
            Get Matching
          </p>
          <ChevronDown className="rotate-[-90deg] size-6" />
        </button>
      </div>
    </div>
  );
}
