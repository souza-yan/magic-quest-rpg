import { useState } from 'react';
import { TitleScreen } from '@/components/TitleScreen';
import { CreditsScreen } from '@/components/CreditsScreen';
import { TopDownGame } from '@/components/TopDownGame';
import { BattleScene } from '@/components/BattleScene';
import { StageMap } from '@/components/StageMap';
import { VictoryScreen } from '@/components/VictoryScreen';
import { Calculator } from '@/components/Calculator';
import { GameState, Character } from '@/types/game';
import { toast } from 'sonner';
import { questionManager } from '@/utils/questionManager';

type ExtendedGameState = GameState | 'stagemap' | 'victory';

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
  const [showRetryMessage, setShowRetryMessage] = useState(false);

  const handleStart = () => {
    // Reset questions when starting a new game so session starts fresh
    questionManager.reset();
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
    setShowRetryMessage(false);
    setGameState('stagemap');
  };

  const handleStageMapComplete = () => {
    setShowRetryMessage(false);
    setGameState('battle');
  };

  const handleBattleVictory = () => {
    toast.success('🎉 Vitória! Avançando para a próxima fase!');
    setShowRetryMessage(false);
    // Incrementa a fase ao vencer
    setCurrentStage(currentStage + 1);
    setGameState('stagemap');
  };

  const handleBattleDefeat = () => {
    toast.error('💔 Você foi derrotado! Mas não desista!');
    setShowRetryMessage(true);
    // Volta para o mapa SEM incrementar a fase (tenta de novo)
    setTimeout(() => {
      setGameState('stagemap');
    }, 1500);
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
          showRetryMessage={showRetryMessage}
        />
      )}
      
      {gameState === 'battle' && (
        <BattleScene
          character={character}
          onVictory={handleBattleVictory}
          onDefeat={handleBattleDefeat}
          setShowCalculator={setShowCalculator}
          currentStage={currentStage}
        />
      )}
    </>
  );
};

export default Index;