import { MapPin, DollarSign, Circle, Home, BookOpen, Edit } from 'lucide-react';
import BottomNav from '../components/BottomNav';

export default function Profile() {
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
        <p className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px] text-black">
          Your Name
        </p>
      </div>

      <div className="px-6">
        {/* Profile Image Card */}
        <div className="relative bg-[#d9d9d9] rounded-[51px] p-6 mb-6">
          <button className="absolute top-4 right-4 p-2 hover:opacity-80">
            <Edit className="size-6" />
          </button>
          
          {/* Image Placeholder */}
          <div className="relative w-full aspect-square rounded-[20px] overflow-hidden mb-4 bg-[#c0c0c0] flex items-center justify-center">
            <svg className="w-32 h-32 text-gray-500" viewBox="0 0 248 248" fill="none">
              <path
                d="M104 104C104 95.1634 111.163 88 120 88H128C136.837 88 144 95.1634 144 104V112C144 120.837 136.837 128 128 128H120C111.163 128 104 120.837 104 112V104Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M48 200L92 156L132 196L200 128L248 176V200C248 217.673 233.673 232 216 232H80C62.3269 232 48 217.673 48 200Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <rect x="1" y="1" width="246" height="246" rx="19" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>

          {/* Bio */}
          <p className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[14px] text-black">
            Hi, my name is___ I'm a sophomore looking for housing! I'm a quiet roommate, mostly studying in my room. I love animals, music, and TV. Looking for someone similar!
          </p>
        </div>

        {/* Details Card */}
        <div className="relative bg-[#d9d9d9] rounded-[51px] p-6 shadow-lg">
          <button className="absolute top-4 right-4 p-2 hover:opacity-80">
            <Edit className="size-6" />
          </button>

          {/* Stats Row */}
          <div className="flex items-center border-b border-black pb-4 mb-4 gap-4 flex-wrap">
            <span className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px]">
              19
            </span>
            <div className="w-px h-[35px] bg-black" />
            <span className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px]">
              woman
            </span>
            <div className="w-px h-[35px] bg-black" />
            <div className="flex items-center gap-1">
              <MapPin className="size-5" />
              <span className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px]">
                UTK
              </span>
            </div>
            <div className="w-px h-[35px] bg-black" />
            <div className="flex items-center gap-1">
              <DollarSign className="size-5" />
              <span className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px]">
                900
              </span>
            </div>
          </div>

          {/* Traits */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Circle className="size-6 fill-[#d9d9d9]" />
              <span className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px]">
                Morning Person
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <Home className="size-6" />
              <span className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px]">
                Not Political
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <BookOpen className="size-6" />
              <span className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px]">
                Not Religious
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <svg className="size-6" viewBox="0 0 24 24" fill="none">
                <path d="M12 3L15 9L12 15L9 9L12 3Z" stroke="currentColor" strokeWidth="2" />
                <line x1="9" y1="12" x2="15" y2="12" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px]">
                Not Noisy
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <svg className="size-6" viewBox="0 0 24 24" fill="none">
                <path d="M12 3L12 21M6 9L18 9M9 15L15 15" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span className="font-['ABC_Diatype_Edu:Thin',sans-serif] text-[20px]">
                Likes it Clean
              </span>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
