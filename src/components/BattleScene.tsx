import { useState, useEffect } from 'react';
import { Character, Enemy, Spell } from '@/types/game';
import { QuestionModal } from './QuestionModal';
import { Button } from '@/components/ui/button';
import { generateEasyQuestion, generateMediumQuestion, generateHardQuestion } from '@/utils/mathQuestions';
import { toast } from 'sonner';

interface BattleSceneProps {
  character: Character;
  onVictory: () => void;
  onDefeat: () => void;
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

export const BattleScene = ({ character: playerChar, onVictory, onDefeat }: BattleSceneProps) => {
  const [enemy, setEnemy] = useState<Enemy>({
    name: 'Goblin Matemático',
    hp: 150,
    maxHp: 150,
    damage: 25,
    sprite: '👹'
  });

  const [player, setPlayer] = useState(playerChar);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [attacking, setAttacking] = useState(false);
  const [enemyAttacking, setEnemyAttacking] = useState(false);

  useEffect(() => {
    if (enemy.hp <= 0) {
      toast.success('Vitória! Você derrotou o inimigo!');
      setTimeout(onVictory, 2000);
    } else if (player.hp <= 0) {
      toast.error('Derrota! Você foi derrotado...');
      setTimeout(onDefeat, 2000);
    }
  }, [enemy.hp, player.hp]);

  const handleSpellSelect = (spell: Spell) => {
    if (!isPlayerTurn) return;
    
    setSelectedSpell(spell);
    
    const question = spell.difficulty === 'easy' 
      ? generateEasyQuestion()
      : spell.difficulty === 'medium'
      ? generateMediumQuestion()
      : generateHardQuestion();
    
    setCurrentQuestion(question);
  };

  const handleCorrectAnswer = () => {
    setCurrentQuestion(null);
    
    if (selectedSpell) {
      setAttacking(true);
      const damage = Math.floor(
        Math.random() * (selectedSpell.damage.max - selectedSpell.damage.min + 1) + 
        selectedSpell.damage.min
      );
      
      setTimeout(() => {
        setEnemy({ ...enemy, hp: Math.max(0, enemy.hp - damage) });
        toast.success(`Acertou! Causou ${damage} de dano! Continue atacando!`);
        setAttacking(false);
        // Jogador continua no turno quando acerta
        setIsPlayerTurn(true);
      }, 600);
    }
  };

  const handleIncorrectAnswer = () => {
    setCurrentQuestion(null);
    
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
    <div className="fixed inset-0 bg-gradient-to-b from-purple-950 via-black to-purple-900 overflow-hidden">
      {/* Battle UI */}
      <div className="relative h-full flex flex-col">
        {/* Battle Area - Side view */}
        <div className="flex-1 relative flex items-center justify-between px-20">
          {/* Player side */}
          <div className="relative">
            <div className={`text-8xl transition-all duration-300 ${attacking ? 'animate-attack' : ''} ${player.hp <= 0 ? 'opacity-30 grayscale' : ''}`}>
              🧙‍♂️
            </div>
            {/* Player HP Bar */}
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-48">
              <div className="text-xs text-center mb-2 font-bold text-primary">VOCÊ</div>
              <div className="bg-black/50 rounded-full p-1 border-2 border-primary">
                <div 
                  className="h-4 bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-500"
                  style={{ width: `${(player.hp / player.maxHp) * 100}%` }}
                />
              </div>
              <div className="text-xs text-center mt-1 text-muted-foreground">
                HP: {player.hp}/{player.maxHp}
              </div>
            </div>
          </div>

          {/* Enemy side */}
          <div className="relative">
            <div className={`text-8xl transition-all duration-300 ${enemyAttacking ? 'animate-shake' : ''} ${enemy.hp <= 0 ? 'opacity-30 grayscale' : ''}`}>
              {enemy.sprite}
            </div>
            {/* Enemy HP Bar */}
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-48">
              <div className="text-xs text-center mb-2 font-bold text-destructive">{enemy.name}</div>
              <div className="bg-black/50 rounded-full p-1 border-2 border-destructive">
                <div 
                  className="h-4 bg-gradient-to-r from-red-500 to-red-400 rounded-full transition-all duration-500"
                  style={{ width: `${(enemy.hp / enemy.maxHp) * 100}%` }}
                />
              </div>
              <div className="text-xs text-center mt-1 text-muted-foreground">
                HP: {enemy.hp}/{enemy.maxHp}
              </div>
            </div>
          </div>
        </div>

        {/* Spell Cards */}
        <div className="bg-gradient-to-t from-black to-transparent p-8">
          <div className="flex gap-4 justify-center">
            {spells.map((spell) => (
              <Button
                key={spell.type}
                onClick={() => handleSpellSelect(spell)}
                disabled={!isPlayerTurn || attacking || enemyAttacking}
                className={`
                  h-32 w-40 flex flex-col items-center justify-center gap-2
                  bg-gradient-to-br ${spell.color}
                  hover:scale-105 transition-all duration-300
                  disabled:opacity-50 disabled:cursor-not-allowed
                  border-4 border-white/20
                  ${!isPlayerTurn ? 'grayscale' : ''}
                `}
              >
                <span className="text-4xl">{spell.icon}</span>
                <span className="text-xs font-bold">{spell.name}</span>
                <span className="text-[10px] opacity-80 text-center leading-tight">
                  {spell.description}
                </span>
              </Button>
            ))}
          </div>
          
          <div className="text-center mt-4">
            <p className="text-xs text-muted-foreground">
              {isPlayerTurn ? (
                <span className="text-primary font-bold animate-pulse">▶ SEU TURNO - Escolha uma magia</span>
              ) : (
                <span className="text-destructive">Turno do inimigo...</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {currentQuestion && (
        <QuestionModal
          question={currentQuestion}
          onCorrect={handleCorrectAnswer}
          onIncorrect={handleIncorrectAnswer}
          spellType={selectedSpell?.type}
        />
      )}
    </div>
  );
};
