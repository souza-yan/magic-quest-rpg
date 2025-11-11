import { Button } from '@/components/ui/button';
import titleBg from '@/img/TittleScreen.png';

interface TitleScreenProps {
  onStart: () => void;
  onCredits: () => void;
}

export const TitleScreen = ({ onStart, onCredits }: TitleScreenProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      {/* responsive full cover image but keep entire image visible */}
  {/* contain on small screens, cover on large+ to avoid big side bars */}
  <img src={titleBg} alt="Title Background" className="absolute inset-0 w-full h-full object-contain lg:object-cover" />

  {/* soft side gradients to hide bars when image is contained on smaller viewports */}
  <div className="absolute inset-y-0 left-0 w-20 lg:hidden bg-gradient-to-r from-black/80 to-transparent" />
  <div className="absolute inset-y-0 right-0 w-20 lg:hidden bg-gradient-to-l from-black/80 to-transparent" />

  <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 text-center space-y-8 md:space-y-12 p-4 md:p-8 max-w-4xl mx-auto">

        <div className="space-y-3 md:space-y-4 max-w-xs mx-auto">
          <Button
            onClick={onStart}
            className="w-full h-14 md:h-16 text-base md:text-lg bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 border-2 border-purple-400 shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
          >
            ▶ JOGAR
          </Button>

          <Button
            onClick={onCredits}
            variant="outline"
            className="w-full h-10 md:h-12 text-xs md:text-sm border-2 border-purple-600 text-purple-300 hover:bg-purple-900/50"
          >
            CRÉDITOS
          </Button>
        </div>

        <div className="text-xl md:text-3xl text-purple-400/60 animate-pulse px-4">
          Pressione ESPAÇO • Use WASD ou setas para mover
        </div>
      </div>
    </div>
  );
};