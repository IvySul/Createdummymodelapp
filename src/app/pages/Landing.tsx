import { useNavigate } from 'react-router';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="bg-white relative size-full min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <div className="flex items-end text-black uppercase select-none leading-none">
          <span className="font-['ABC_Diatype_Rounded:Regular',sans-serif] text-[62px] tracking-[0.08em]">
            Occum
          </span>
          <span aria-hidden="true" className="mx-1 mb-[7px] inline-block w-[42px] h-[52px]">
            <svg viewBox="0 0 42 52" className="w-full h-full" fill="none">
              <path d="M2 30L21 12L40 30" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
              <path d="M11 30V49" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
              <path d="M31 30V49" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
            </svg>
          </span>
          <span className="font-['ABC_Diatype_Rounded:Regular',sans-serif] text-[62px] tracking-[0.08em]">
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
