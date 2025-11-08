import { Button } from '@/components/ui/button';
import titleBg from '../img/TitleScreen.jpeg';

interface TitleScreenProps {
  onStart: () => void;
  onCredits: () => void;
}

export const TitleScreen = ({ onStart, onCredits }: TitleScreenProps) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{
        backgroundImage: `url(${titleBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 text-center space-y-8 md:space-y-12 p-4 md:p-8 max-w-4xl mx-auto">
        <div className="space-y-3 md:space-y-4 animate-float">
          <div className="text-4xl md:text-6xl mb-4"></div><br /> <br /> <br />
          <h1
            className="text-4xl md:text-6xl font-bold text-stroke"
            style={{
              background:
                'linear-gradient(135deg, #a855f7 0%, #fb923c 50%, #ef4444 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
          
          </h1>
          <p className="text-base md:text-2xl text-purple-200 max-w-md mx-auto leading-relaxed px-4">
            
          </p>
        </div>

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