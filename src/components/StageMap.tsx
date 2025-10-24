import { useEffect, useState } from 'react';

interface StageMapProps {
  currentStage: number;
  onComplete: () => void;
  showRetryMessage?: boolean;
}

const stages = [
  { id: 1, name: 'Tutorial', icon: '📚', x: 15, y: 80 },
  { id: 2, name: 'Batalha 1', icon: '👹', x: 30, y: 60 },
  { id: 3, name: 'Batalha 2', icon: '🦇', x: 50, y: 50 },
  { id: 4, name: 'Batalha 3', icon: '🐉', x: 70, y: 40 },
  { id: 5, name: 'Boss Final', icon: '👑', x: 85, y: 20 }
];

export const StageMap = ({ currentStage, onComplete }: StageMapProps) => {
  const [playerPosition, setPlayerPosition] = useState(0);
  const [canProceed, setCanProceed] = useState(false);

  useEffect(() => {
    // Anima o personagem até a próxima fase
    const timer = setTimeout(() => {
      setPlayerPosition(currentStage);
      // Após chegar na posição, permite prosseguir
      setTimeout(() => {
        setCanProceed(true);
      }, 500);
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentStage]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === ' ' && canProceed) {
        onComplete();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [canProceed, onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-blue-900 via-purple-900 to-black overflow-hidden">
      {/* Nuvens/Fundo decorativo */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 text-6xl animate-float">☁️</div>
        <div className="absolute top-32 right-20 text-5xl animate-float" style={{ animationDelay: '1s' }}>☁️</div>
        <div className="absolute top-64 left-1/3 text-7xl animate-float" style={{ animationDelay: '2s' }}>☁️</div>
      </div>

      {/* Título */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center z-20">
        <h1 className="text-4xl font-bold text-white mb-2" style={{
          textShadow: '0 0 20px rgba(168, 85, 247, 1), 0 0 40px rgba(168, 85, 247, 0.8)'
        }}>
          JORNADA MATEMÁGICA
        </h1>
        <p className="text-lg text-purple-300">Avançando para a próxima fase...</p>
      </div>

      {/* Container do mapa */}
      <div className="relative w-full h-full flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          {/* Desenha o caminho conectando as fases */}
          {stages.map((stage, index) => {
            if (index === stages.length - 1) return null;
            const nextStage = stages[index + 1];
            const isUnlocked = stage.id <= currentStage;
            
            return (
              <line
                key={`path-${stage.id}`}
                x1={stage.x}
                y1={stage.y}
                x2={nextStage.x}
                y2={nextStage.y}
                stroke={isUnlocked ? '#a855f7' : '#4b5563'}
                strokeWidth="0.8"
                strokeDasharray={isUnlocked ? '0' : '2,2'}
                className={isUnlocked ? 'animate-pulse' : ''}
              />
            );
          })}

          {/* Desenha os nodos das fases */}
          {stages.map((stage) => {
            const isCompleted = stage.id < currentStage;
            const isCurrent = stage.id === currentStage;
            const isLocked = stage.id > currentStage;

            return (
              <g key={stage.id}>
                {/* Círculo da fase */}
                <circle
                  cx={stage.x}
                  cy={stage.y}
                  r="4"
                  fill={isCompleted ? '#10b981' : isCurrent ? '#a855f7' : '#374151'}
                  stroke={isCurrent ? '#fbbf24' : isCompleted ? '#34d399' : '#6b7280'}
                  strokeWidth="0.5"
                  className={isCurrent ? 'animate-pulse' : ''}
                />
                
                {/* Ícone da fase */}
                <text
                  x={stage.x}
                  y={stage.y - 6}
                  textAnchor="middle"
                  fontSize="6"
                  style={{ filter: isLocked ? 'grayscale(100%)' : 'none' }}
                >
                  {stage.icon}
                </text>

                {/* Nome da fase */}
                <text
                  x={stage.x}
                  y={stage.y + 8}
                  textAnchor="middle"
                  fontSize="2.5"
                  fill={isLocked ? '#6b7280' : '#ffffff'}
                  fontWeight="bold"
                >
                  {stage.name}
                </text>

                {/* Checkmark se completado */}
                {isCompleted && (
                  <text
                    x={stage.x + 2}
                    y={stage.y + 2}
                    textAnchor="middle"
                    fontSize="3"
                    fill="#10b981"
                  >
                    ✓
                  </text>
                )}

                {/* Cadeado se bloqueado */}
                {isLocked && (
                  <text
                    x={stage.x}
                    y={stage.y + 1}
                    textAnchor="middle"
                    fontSize="3"
                  >
                    🔒
                  </text>
                )}
              </g>
            );
          })}

          {/* Personagem andando no caminho */}
          {playerPosition > 0 && playerPosition <= stages.length && (
            <g style={{ 
              transition: 'all 2s ease-in-out',
              transform: `translate(${stages[playerPosition - 1].x}px, ${stages[playerPosition - 1].y}px)`
            }}>
              <text
                x="0"
                y="0"
                textAnchor="middle"
                fontSize="8"
              >
                🧙‍♂️
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Progresso na parte inferior */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm px-8 py-4 rounded-full border-2 border-purple-500">
        <p className="text-white text-lg font-bold">
          Fase {currentStage} de {stages.length}
        </p>
        {canProceed && (
          <p className="text-yellow-400 text-sm mt-2 animate-pulse">
            Pressione ESPAÇO para continuar
          </p>
        )}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};