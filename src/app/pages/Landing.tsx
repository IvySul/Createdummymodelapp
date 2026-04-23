import { useNavigate } from 'react-router';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#ddd] relative size-full min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-10">
        <div className="flex items-end text-[#111] uppercase select-none leading-none">
          <span className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[70px] tracking-[0.06em] font-light">
            Occum
          </span>
          <span aria-hidden="true" className="mx-[1px] mb-[7px] inline-block w-[40px] h-[56px]">
            <svg viewBox="0 0 40 56" className="w-full h-full" fill="none">
              <path d="M1.5 31L20 13L38.5 31" stroke="currentColor" strokeWidth="1.5" strokeLinecap="butt" />
              <path d="M9.5 31V52.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="butt" />
              <path d="M30.5 31V52.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="butt" />
            </svg>
          </span>
          <span className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[70px] tracking-[0.06em] font-light">
            te
          </span>
        </div>
        
        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate('/questionnaire/step1')}
            className="bg-[#d9d9d9] h-[38px] rounded-[11px] w-[125px] font-['ABC_Diatype_Rounded:Regular',sans-serif] text-[16px] text-black hover:bg-[#c9c9c9] transition-colors"
          >
            Get Started
          </button>
          
          <button
            onClick={() => navigate('/matches')}
            className="bg-[#d9d9d9] h-[38px] rounded-[11px] w-[125px] font-['ABC_Diatype_Rounded:Regular',sans-serif] text-[16px] text-black hover:bg-[#c9c9c9] transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
