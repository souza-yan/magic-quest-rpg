import { useState } from 'react';
import { TitleScreen } from '@/components/TitleScreen';
import { CreditsScreen } from '@/components/CreditsScreen';
import { TopDownGame } from '@/components/TopDownGame';
import { BattleScene } from '@/components/BattleScene';
import { StageMap } from '@/components/StageMap';
import { Calculator } from '@/components/Calculator';
import { GameState, Character } from '@/types/game';

type ExtendedGameState = GameState | 'stagemap';

const Index = () => {
  const [gameState, setGameState] = useState<ExtendedGameState>('title');
  const [character, setCharacter] = useState<Character>({
    position: { x: 200, y: 200 },
    hp: 100,
    maxHp: 100,
    hasStaff: false
  });
  const [showCalculator, setShowCalculator] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);

  const handleStart = () => {
    setGameState('forest');
    setCurrentStage(1);
    setCharacter({
      position: { x: 200, y: 200 },
      hp: 100,
      maxHp: 100,
      hasStaff: false
    });
  };

  const handleCredits = () => {
    setGameState('credits');
  };

  const handleBackToTitle = () => {
    setGameState('title');
  };

  const handleForestComplete = () => {
    setCurrentStage(currentStage + 1);
    setGameState('stagemap');
  };

  const handleStageMapComplete = () => {
    setGameState('battle');
  };

  const handleBattleVictory = () => {
    setGameState('forest');
  };

  const handleBattleDefeat = () => {
    setGameState('title');
  };

  return (
    <>
      {showCalculator && <Calculator />}
      
      {gameState === 'title' && (
        <TitleScreen onStart={handleStart} onCredits={handleCredits} />
      )}
      
      {gameState === 'credits' && (
        <CreditsScreen onBack={handleBackToTitle} />
      )}
      
      {gameState === 'forest' && (
        <TopDownGame
          onComplete={handleForestComplete}
          character={character}
          setCharacter={setCharacter}
          setShowCalculator={setShowCalculator}
        />
      )}

      {gameState === 'stagemap' && (
        <StageMap
          currentStage={currentStage}
          onComplete={handleStageMapComplete}
        />
      )}
      
      {gameState === 'battle' && (
        <BattleScene
          character={character}
          onVictory={handleBattleVictory}
          onDefeat={handleBattleDefeat}
          setShowCalculator={setShowCalculator}
        />
      )}
    </>
  );
};

export default Index;