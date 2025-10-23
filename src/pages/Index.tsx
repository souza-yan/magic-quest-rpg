import { useState } from 'react';
import { TitleScreen } from '@/components/TitleScreen';
import { CreditsScreen } from '@/components/CreditsScreen';
import { TopDownGame } from '@/components/TopDownGame';
import { BattleScene } from '@/components/BattleScene';
import { Calculator } from '@/components/Calculator';
import { GameState, Character } from '@/types/game';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('title');
  const [character, setCharacter] = useState<Character>({
    position: { x: 200, y: 200 },
    hp: 100,
    maxHp: 100,
    hasStaff: false
  });
  const [showCalculator, setShowCalculator] = useState(false);

  const handleStart = () => {
    setGameState('forest');
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