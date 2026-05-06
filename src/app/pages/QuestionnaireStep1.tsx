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
import { Input } from "../components/ui/input";

const step1Defaults = {
  name: '',
  month: '',
  day: '',
  year: '',
  gender: '',
  ethnicity: '',
  occupation: '',
  religion: '',
  politics: '',
} as const;

function loadQuestionnaireStep1State() {
  if (typeof window === 'undefined') return { ...step1Defaults };
  try {
    const raw = window.localStorage.getItem('questionnaireStep1');
    if (!raw) return { ...step1Defaults };
    return { ...step1Defaults, ...JSON.parse(raw) };
  } catch {
    return { ...step1Defaults };
  }
}

export default function QuestionnaireStep1() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(loadQuestionnaireStep1State);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const years = Array.from({ length: 80 }, (_, i) => (2024 - i).toString());

  const genders = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];
  const ethnicities = ['Asian', 'Black', 'Hispanic/Latino', 'White', 'Middle Eastern', 'Mixed', 'Other', 'Prefer not to say'];
  const religions = ['Christian', 'Muslim', 'Jewish', 'Hindu', 'Buddhist', 'Atheist', 'Agnostic', 'Other', 'Prefer not to say'];
  const politicalViews = ['Right', 'Left', 'Not political', 'Moderate'];

  useEffect(() => {
    localStorage.setItem('questionnaireStep1', JSON.stringify(formData));
  }, [formData]);

  return (
    <div className="relative isolate mx-auto min-h-screen w-full max-w-md overflow-x-hidden bg-white pb-24">
      <div className="px-8 pt-10">
        <p className="text-[40px] text-black mb-12">
          Hello! tell us a little about yourself
        </p>

        {/* Name */}
        <div className="mb-6">
          <p className="text-[16px] text-black mb-2">
            Your Name
          </p>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter your name"
            className="bg-[#ebeff5] h-[38px] rounded-[11px] border-none "
          />
        </div>

        {/* Birthday */}
        <div className="mb-6">
          <p className="text-[16px] text-black mb-2">
            Birthday
          </p>
          <div className="flex gap-3">
            <Select value={formData.month} onValueChange={(value) => setFormData({ ...formData, month: value })}>
              <SelectTrigger className="bg-[#ebeff5] h-[38px] rounded-[11px] border-none flex-1">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map(month => (
                  <SelectItem key={month} value={month}>{month}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={formData.day} onValueChange={(value) => setFormData({ ...formData, day: value })}>
              <SelectTrigger className="bg-[#ebeff5] h-[38px] rounded-[11px] border-none flex-1">
                <SelectValue placeholder="Day" />
              </SelectTrigger>
              <SelectContent>
                {days.map(day => (
                  <SelectItem key={day} value={day}>{day}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={formData.year} onValueChange={(value) => setFormData({ ...formData, year: value })}>
              <SelectTrigger className="bg-[#ebeff5] h-[38px] rounded-[11px] border-none flex-1">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map(year => (
                  <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Gender */}
        <div className="mb-6">
          <p className="text-[16px] text-black mb-2">
            Gender
          </p>
          <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
            <SelectTrigger className="bg-[#ebeff5] h-[38px] rounded-[11px] border-none w-full">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              {genders.map(gender => (
                <SelectItem key={gender} value={gender}>{gender}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Ethnicity */}
        <div className="mb-6">
          <p className="text-[16px] text-black mb-2">
            Ethnicity
          </p>
          <Select value={formData.ethnicity} onValueChange={(value) => setFormData({ ...formData, ethnicity: value })}>
            <SelectTrigger className="bg-[#ebeff5] h-[38px] rounded-[11px] border-none w-full">
              <SelectValue placeholder="Select ethnicity" />
            </SelectTrigger>
            <SelectContent>
              {ethnicities.map(ethnicity => (
                <SelectItem key={ethnicity} value={ethnicity}>{ethnicity}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Occupation */}
        <div className="mb-6">
          <p className="text-[16px] text-black mb-2">
            Occupation
          </p>
          <Input
            value={formData.occupation}
            onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
            placeholder="Type your occupation"
            className="bg-[#ebeff5] h-[38px] rounded-[11px] border-none "
          />
        </div>

        {/* Religion */}
        <div className="mb-6">
          <p className="text-[16px] text-black mb-2">
            Religion
          </p>
          <Select value={formData.religion} onValueChange={(value) => setFormData({ ...formData, religion: value })}>
            <SelectTrigger className="bg-[#ebeff5] h-[38px] rounded-[11px] border-none w-full">
              <SelectValue placeholder="Select religion" />
            </SelectTrigger>
            <SelectContent>
              {religions.map(religion => (
                <SelectItem key={religion} value={religion}>{religion}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Politics */}
        <div className="mb-12">
          <p className="text-[16px] text-black mb-2">
            Politics
          </p>
          <div className="grid grid-cols-4 gap-2">
            {politicalViews.map(view => (
              <button
                key={view}
                onClick={() => setFormData({ ...formData, politics: view })}
                className={`bg-[#ebeff5] h-[38px] rounded-[11px] text-[12px] text-black hover:bg-[#dfe5f0] transition-colors ${
                  formData.politics === view ? 'ring-2 ring-black' : ''
                }`}
              >
                {view}
              </button>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={() => {
            localStorage.setItem('questionnaireStep1', JSON.stringify(formData));
            navigate('/questionnaire/step2');
          }}
          className="flex items-center gap-2 ml-auto mb-8"
        >
          <p className="text-[16px] text-black">
            Roommate Matching Questions
          </p>
          <ChevronDown className="rotate-[-90deg] size-6" />
        </button>
      </div>
    </div>
  );
}
