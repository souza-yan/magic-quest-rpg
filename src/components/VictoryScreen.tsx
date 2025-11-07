import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface VictoryScreenProps {
  onBackToTitle: () => void;
}

export const VictoryScreen = ({ onBackToTitle }: VictoryScreenProps) => {
  const [showText, setShowText] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Animação do texto
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 1000);

    // Mostra botão depois
    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 4000);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-yellow-900 via-orange-900 to-black overflow-hidden">
      {/* Partículas de estrelas */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(2px 2px at 20% 30%, white, transparent), radial-gradient(2px 2px at 60% 70%, white, transparent), radial-gradient(1px 1px at 50% 50%, white, transparent), radial-gradient(1px 1px at 80% 10%, white, transparent), radial-gradient(2px 2px at 90% 60%, white, transparent), radial-gradient(2px 2px at 10% 90%, white, transparent), radial-gradient(1px 1px at 40% 20%, white, transparent)',
        backgroundSize: '200% 200%',
        animation: 'twinkle 4s ease-in-out infinite'
      }} />

      {/* Dragão derrotado no fundo */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20 text-[20rem] animate-pulse">
        🐉
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 md:px-8">
        {/* Título */}
        <div className="text-center mb-8 md:mb-12 animate-scale-in">
          <div className="text-6xl md:text-8xl mb-6 animate-bounce">
            🏆
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-yellow-300 mb-4" style={{
            textShadow: '0 0 30px rgba(253, 224, 71, 1), 0 0 60px rgba(253, 224, 71, 0.8)'
          }}>
            VITÓRIA!
          </h1>
          <div className="text-2xl md:text-4xl text-orange-300 font-bold animate-pulse">
            ⭐ VOCÊ CONQUISTOU O MUNDO! ⭐
          </div>
        </div>

        {/* Mensagem final */}
        {showText && (
          <div className="max-w-3xl mx-auto mb-8 md:mb-12 animate-fade-in">
            <div className="bg-black/70 backdrop-blur-sm p-6 md:p-8 rounded-lg border-4 border-yellow-500 shadow-2xl">
              <p className="text-base md:text-xl text-yellow-100 leading-relaxed text-center font-serif">
                E no fim você se tornou um <span className="text-yellow-300 font-bold">mago tão poderoso</span> que o mundo todo te conheceu e pode descansar em paz sabendo que contribuiu com seus <span className="text-orange-300 font-bold">poderes matemáticos</span> para <span className="text-green-300 font-bold">salvar a humanidade</span>.
              </p>
            </div>
          </div>
        )}

        {/* Conquistas */}
        {showText && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-fade-in max-w-4xl mx-auto">
            <div className="bg-purple-900/50 p-4 rounded-lg border-2 border-purple-500 text-center">
              <div className="text-3xl mb-2">🎓</div>
              <div className="text-xs md:text-sm text-purple-300 font-bold">Tutorial</div>
              <div className="text-xs text-purple-400">Completo</div>
            </div>
            <div className="bg-blue-900/50 p-4 rounded-lg border-2 border-blue-500 text-center">
              <div className="text-3xl mb-2">⚔️</div>
              <div className="text-xs md:text-sm text-blue-300 font-bold">4 Batalhas</div>
              <div className="text-xs text-blue-400">Vencidas</div>
            </div>
            <div className="bg-red-900/50 p-4 rounded-lg border-2 border-red-500 text-center">
              <div className="text-3xl mb-2">🐉</div>
              <div className="text-xs md:text-sm text-red-300 font-bold">Boss Final</div>
              <div className="text-xs text-red-400">Derrotado</div>
            </div>
            <div className="bg-yellow-900/50 p-4 rounded-lg border-2 border-yellow-500 text-center">
              <div className="text-3xl mb-2">🧙‍♂️</div>
              <div className="text-xs md:text-sm text-yellow-300 font-bold">Grande Mago</div>
              <div className="text-xs text-yellow-400">Alcançado</div>
            </div>
          </div>
        )}

        {/* Botão */}
        {showButton && (
          <div className="animate-fade-in">
            <Button
              onClick={onBackToTitle}
              className="h-14 md:h-16 px-8 md:px-12 text-base md:text-xl bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 border-4 border-yellow-400 shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-110"
            >
              🏠 VOLTAR AO MENU
            </Button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        @keyframes scale-in {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .animate-scale-in {
          animation: scale-in 0.8s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};