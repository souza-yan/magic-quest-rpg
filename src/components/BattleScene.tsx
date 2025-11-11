import { useState, useEffect } from 'react';
import { Character, Enemy, Spell } from '@/types/game';
import { QuestionModal } from './QuestionModal';
import { Button } from '@/components/ui/button';
import { getRandomQuestionByDifficulty } from "@/utils/questions/allQuestions";

import { toast } from 'sonner';
import waterAtk from '@/img/Agua finalizado.gif';
import fireAtk from '@/img/Fogo definitivo.gif';
import thunderAtk from '@/img/Trovao definitivo.gif';

interface BattleSceneProps {
  character: Character;
  onVictory: () => void;
  onDefeat: () => void;
  setShowCalculator: (show: boolean) => void;
  currentStage: number;
}

const spells: Spell[] = [
  {
    type: 'water',
    name: 'Magia de Água',
    difficulty: 'easy',
    damage: { min: 20, max: 30 },
    icon: '💧',
    color: 'from-blue-500 to-cyan-500',
    description: 'Áreas simples • Dano baixo'
  },
  {
    type: 'fire',
    name: 'Magia de Fogo',
    difficulty: 'medium',
    damage: { min: 40, max: 60 },
    icon: '🔥',
    color: 'from-orange-500 to-red-500',
    description: 'Áreas médias • Dano médio'
  },
  {
    type: 'thunder',
    name: 'Magia de Trovão',
    difficulty: 'hard',
    damage: { min: 80, max: 100 },
    icon: '⚡',
    color: 'from-yellow-400 to-yellow-600',
    description: 'Áreas complexas • Dano alto'
  }
];

// Define os inimigos por fase
const enemies = [
  {
    stage: 2,
    name: 'Goblin Matemático',
    hp: 150,
    damage: 25,
    sprite: '👹',
    background: 'from-purple-950 via-black to-purple-900'
  },
  {
    stage: 3,
    name: 'Morcego das Sombras',
    hp: 200,
    damage: 30,
    sprite: '🦇',
    background: 'from-gray-900 via-purple-950 to-black'
  },
  {
    stage: 4,
    name: 'Cavaleiro das Trevas',
    hp: 300,
    damage: 40,
    sprite: '⚔️',
    background: 'from-blue-950 via-black to-blue-900'
  },
  {
    stage: 5,
    name: 'Dragão Vermelho Ancião',
    hp: 400,
    damage: 50,
    sprite: '🐉',
    background: 'from-red-900 via-orange-950 to-black'
  }
];

export const BattleScene = ({ character: playerChar, onVictory, onDefeat, setShowCalculator, currentStage }: BattleSceneProps) => {

  const enemyData = enemies.find(e => e.stage === currentStage) || enemies[0];
  
  const [enemy, setEnemy] = useState<Enemy>({
    name: enemyData.name,
    hp: enemyData.hp,
    maxHp: enemyData.hp,
    damage: enemyData.damage,
    sprite: enemyData.sprite
  });

  const [player, setPlayer] = useState(playerChar);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [attacking, setAttacking] = useState(false);
  const [enemyAttacking, setEnemyAttacking] = useState(false);
  const [usedHelp, setUsedHelp] = useState(false);

  useEffect(() => {
    if (enemy.hp <= 0) {
      toast.success(`Vitória! Você derrotou o ${enemy.name}!`);
      setTimeout(onVictory, 2000);
    } else if (player.hp <= 0) {
      toast.error('Derrota! Você foi derrotado...');
      setTimeout(onDefeat, 2000);
    }
  }, [enemy.hp, player.hp]);

  const handleSpellSelect = (spell: Spell) => {
    if (!isPlayerTurn) return;
    
    setSelectedSpell(spell);
    setUsedHelp(false);
    
    const question = getRandomQuestionByDifficulty(
  spell.type === "water"
    ? "agua"
    : spell.type === "fire"
    ? "fogo"
    : "raio"
);
    
    setCurrentQuestion(question);
    setShowCalculator(true);
  };

  const handleHelpUsed = () => {
    setUsedHelp(true);
    toast.warning('⚠️ Você usou ajuda! O dano será reduzido em 50%.');
  };

  const handleCorrectAnswer = () => {
    setCurrentQuestion(null);
    setShowCalculator(false);
    
    if (selectedSpell) {
      setAttacking(true);
      
      let damage = Math.floor(
        Math.random() * (selectedSpell.damage.max - selectedSpell.damage.min + 1) + 
        selectedSpell.damage.min
      );
      
      if (usedHelp) {
        damage = Math.floor(damage / 2);
      }
      
      setTimeout(() => {
        setEnemy({ ...enemy, hp: Math.max(0, enemy.hp - damage) });
        
        if (usedHelp) {
          toast.success(`Acertou! Causou ${damage} de dano (50% reduzido por usar ajuda)`);
        } else {
          toast.success(`Acertou! Causou ${damage} de dano! Continue atacando!`);
        }
        
        setAttacking(false);
        setUsedHelp(false);
        setIsPlayerTurn(true);
      }, 600);
    }
  };

  const handleIncorrectAnswer = () => {
    setCurrentQuestion(null);
    setShowCalculator(false);
    setUsedHelp(false);
    
    toast.error('Resposta incorreta! Você tomou dano!');
    
    setTimeout(() => {
      setEnemyAttacking(true);
      setTimeout(() => {
        const damage = enemy.damage;
        setPlayer({ ...player, hp: Math.max(0, player.hp - damage) });
        toast.error(`Tomou ${damage} de dano!`);
        setEnemyAttacking(false);
        setIsPlayerTurn(true);
      }, 800);
    }, 500);
  };

  return (
    <div className={`fixed inset-0 bg-gradient-to-b ${enemyData.background} overflow-hidden`}>
      {/* Battle UI */}
      <div className="relative h-full flex flex-col">
        {/* Indicador de Fase - Responsivo */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm px-4 md:px-6 py-2 rounded-full border-2 border-red-500 z-10">
          <p className="text-white text-xs md:text-sm font-bold">
            ⚔️ FASE {currentStage} - {enemy.name.toUpperCase()}
          </p>
        </div>

        {/* Battle Area - Responsivo */}
        <div className="flex-1 relative flex items-center justify-between px-8 md:px-20">
          {/* Player */}
          <div className="relative">
            <div 
              className={`transition-all duration-300 ${player.hp <= 0 ? 'opacity-30 grayscale' : ''}`}
              style={{ width: 'clamp(4rem, 8vw, 8rem)', height: 'auto' }}
            >
              {player.hasStaff ? (
                <img src="/Maguinho.gif" alt="Player" style={{ width: '100%', height: 'auto' }} />
              ) : (
                <div style={{ fontSize: 'clamp(4rem, 8vw, 8rem)' }}>🧙‍♂️</div>
              )}
            </div>
            <div className="absolute -top-12 md:-top-16 left-1/2 transform -translate-x-1/2 w-32 md:w-48">
              <div className="text-[10px] md:text-xs text-center mb-2 font-bold text-primary">VOCÊ</div>
              <div className="bg-black/50 rounded-full p-1 border-2 border-primary">
                <div 
                  className="h-3 md:h-4 bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-500"
                  style={{ width: `${(player.hp / player.maxHp) * 100}%` }}
                />
              </div>
              <div className="text-[10px] md:text-xs text-center mt-1 text-muted-foreground">
                HP: {player.hp}/{player.maxHp}
              </div>
            </div>
          </div>

          {/* Enemy */}
          <div className="relative">
            <div 
              className={`transition-all duration-300 ${enemyAttacking ? 'animate-shake' : ''} ${enemy.hp <= 0 ? 'opacity-30 grayscale' : ''}`}
              style={{ fontSize: 'clamp(4rem, 8vw, 8rem)' }}
            >
              {enemy.sprite}
            </div>
            <div className="absolute -top-12 md:-top-16 left-1/2 transform -translate-x-1/2 w-32 md:w-48">
              <div className="text-[10px] md:text-xs text-center mb-2 font-bold text-destructive">{enemy.name}</div>
              <div className="bg-black/50 rounded-full p-1 border-2 border-destructive">
                <div 
                  className="h-3 md:h-4 bg-gradient-to-r from-red-500 to-red-400 rounded-full transition-all duration-500"
                  style={{ width: `${(enemy.hp / enemy.maxHp) * 100}%` }}
                />
              </div>
              <div className="text-[10px] md:text-xs text-center mt-1 text-muted-foreground">
                HP: {enemy.hp}/{enemy.maxHp}
              </div>
            </div>
          </div>
        </div>

        {/* Spell Cards - Responsivo */}
        <div className="bg-gradient-to-t from-black to-transparent p-4 md:p-8">
          <div className="flex gap-2 md:gap-4 justify-center flex-wrap">
            {spells.map((spell) => (
              <Button
                key={spell.type}
                onClick={() => handleSpellSelect(spell)}
                disabled={!isPlayerTurn || attacking || enemyAttacking}
                className={`
                  h-24 w-28 md:h-32 md:w-40 flex flex-col items-center justify-center gap-1 md:gap-2
                  bg-gradient-to-br ${spell.color}
                  hover:scale-105 transition-all duration-300
                  disabled:opacity-50 disabled:cursor-not-allowed
                  border-2 md:border-4 border-white/20
                  ${!isPlayerTurn ? 'grayscale' : ''}
                `}
              >
                <span className="text-2xl md:text-4xl">{spell.icon}</span>
                <span className="text-[10px] md:text-xs font-bold">{spell.name}</span>
                <span className="text-[8px] md:text-[10px] opacity-80 text-center leading-tight">
                  {spell.description}
                </span>
              </Button>
            ))}
          </div>
          
          <div className="text-center mt-3 md:mt-4">
            <p className="text-[10px] md:text-xs text-muted-foreground">
              {isPlayerTurn ? (
                <span className="text-primary font-bold animate-pulse">▶ SEU TURNO - Escolha uma magia</span>
              ) : (
                <span className="text-destructive">Turno do inimigo...</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Attack animation overlay - positioned over enemy, sized with enemy sprite */}
      {attacking && selectedSpell && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-end px-8 md:px-20 z-40">
          <div style={{ width: 'clamp(4rem, 8vw, 8rem)', height: 'auto', transform: 'translateY(-60px)' }}>
            <img
              src={
                selectedSpell.type === 'water'
                  ? waterAtk
                  : selectedSpell.type === 'fire'
                  ? fireAtk
                  : thunderAtk
              }
              alt="Ataque"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </div>
      )}

      {currentQuestion && (
        <QuestionModal
          question={currentQuestion}
          onCorrect={handleCorrectAnswer}
          onIncorrect={handleIncorrectAnswer}
          spellType={selectedSpell?.type}
          isTutorial={false}
          onHelpUsed={handleHelpUsed}
        />
      )}
    </div>
  );
};