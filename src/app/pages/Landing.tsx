import { useNavigate } from 'react-router';
import splashLogo from '../../assets/occumate-splash-logo.png';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="bg-white relative size-full min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <img src={splashLogo} alt="Occumate" className="w-[440px] max-w-[90vw] h-auto" />
        
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
