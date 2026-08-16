import { NumberTickerComp } from "./number-ticker-comp";

export default function AboutUsCard() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#134587] w-full rounded-2xl py-8 sm:py-10 px-4 sm:px-8 shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-white divide-y-0 md:divide-x divide-white/20">
          <div className="flex flex-col items-center justify-center p-2 text-center">
            <div className="flex items-center justify-center gap-x-1 font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              <NumberTickerComp value={45} />
              <span>+</span>
            </div>
            <span className="text-xs sm:text-sm md:text-base font-medium text-white/90 mt-2 tracking-wider">Courses</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 text-center md:pl-6">
            <div className="flex items-center justify-center gap-x-1 font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              <NumberTickerComp value={100} />
              <span>+</span>
            </div>
            <span className="text-xs sm:text-sm md:text-base font-medium text-white/90 mt-2 tracking-wider">Videos</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 text-center md:pl-6">
            <div className="flex items-center justify-center gap-x-1 font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              <NumberTickerComp value={500} />
              <span>+</span>
            </div>
            <span className="text-xs sm:text-sm md:text-base font-medium text-white/90 mt-2 tracking-wider">Hours</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 text-center md:pl-6">
            <div className="flex items-center justify-center gap-x-1 font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              <NumberTickerComp value={120} />
              <span>+</span>
            </div>
            <span className="text-xs sm:text-sm md:text-base font-medium text-white/90 mt-2 tracking-wider">Students</span>
          </div>
        </div>
      </div>
    </div>
  );
}
