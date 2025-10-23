import { useEffect, useState } from 'react';
import { Character, Position } from '@/types/game';
import { DialogBox } from './DialogBox';
import { QuestionModal } from './QuestionModal';
import { generateAreaQuestion } from '@/utils/mathQuestions';
import { toast } from 'sonner';

interface TopDownGameProps {
  onComplete: () => void;
  character: Character;
  setCharacter: (char: Character) => void;
  setShowCalculator: (show: boolean) => void;
}

export const TopDownGame = ({ onComplete, character, setCharacter, setShowCalculator }: TopDownGameProps) => {
  const [inLibrary, setInLibrary] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [dialogMessage, setDialogMessage] = useState('');

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (showDialog || currentQuestion) return;

      const speed = 25;
      const newPos = { ...character.position };

      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') newPos.y -= speed;
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') newPos.y += speed;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') newPos.x -= speed;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') newPos.x += speed;

      // Boundaries
      newPos.x = Math.max(50, Math.min(window.innerWidth - 100, newPos.x));
      newPos.y = Math.max(50, Math.min(window.innerHeight - 100, newPos.y));

      setCharacter({ ...character, position: newPos });

      // Interactions
      if ((e.key === ' ' || e.key === 'e' || e.key === 'E') && !showDialog) {
        handleInteraction();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [character, showDialog, currentQuestion, inLibrary, questionsAnswered]);

  const handleInteraction = () => {
    // Check if near wizard (center of screen)
    const wizardX = window.innerWidth / 2;
    const wizardY = window.innerHeight / 2;
    const distance = Math.sqrt(
      Math.pow(character.position.x - wizardX, 2) + 
      Math.pow(character.position.y - wizardY, 2)
    );

    if (!inLibrary && distance < 100) {
      if (!character.hasStaff) {
        setDialogMessage('Aprendiz, para se tornar um mago é preciso muita dedicação e poderes MATEMÁTICOS. Por isso, resolva as equações a seguir e se torne um mago e adquira seu cajado!');
        setShowDialog(true);
      } else {
        toast.success('Parabéns! Você conquistou seu cajado! Agora enfrente os desafios!');
        setTimeout(() => onComplete(), 2000);
      }
    }

    // Check if near book in library
    if (inLibrary && distance < 100) {
      if (questionsAnswered === 0) {
        setCurrentQuestion(generateAreaQuestion('rectangle'));
        setShowCalculator(true);
      } else if (questionsAnswered === 1) {
        setCurrentQuestion(generateAreaQuestion('triangle'));
        setShowCalculator(true);
      }
    }
  };

  const handleCorrectAnswer = () => {
    const newAnswered = questionsAnswered + 1;
    setQuestionsAnswered(newAnswered);
    setCurrentQuestion(null);
    setShowCalculator(false);

    if (newAnswered === 1) {
      toast.success('Ótimo! Você criou o cajado!');
    } else if (newAnswered === 2) {
      toast.success('Perfeito! A pedra mágica foi criada!');
      setTimeout(() => {
        setCharacter({ ...character, hasStaff: true });
        setInLibrary(false);
        toast('Retorne ao Mago para continuar sua jornada!');
      }, 2000);
    }
  };

  const handleIncorrectAnswer = () => {
    setCurrentQuestion(null);
    setShowCalculator(false);
    toast.error('Resposta incorreta! Tente novamente.');
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    if (!character.hasStaff && !inLibrary) {
      setInLibrary(true);
      toast('Você foi transportado para a Biblioteca!');
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden" style={{
      background: inLibrary 
        ? 'linear-gradient(180deg, #4a1a1a 0%, #2a0a0a 100%)'
        : 'linear-gradient(180deg, #1a4a1a 0%, #0a2a0a 100%)'
    }}>
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      {/* Central NPC/Object */}
      <div 
        className="absolute transform -translate-x-1/2 -translate-y-1/2 text-6xl animate-float"
        style={{ 
          left: '50%', 
          top: '50%'
        }}
      >
        {inLibrary ? '📖' : '🧙‍♂️'}
      </div>

      {/* Player character */}
      <div
        className="absolute transform -translate-x-1/2 -translate-y-1/2 text-5xl transition-all duration-100 pixel-art"
        style={{
          left: character.position.x,
          top: character.position.y,
          filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.8))'
        }}
      >
        {character.hasStaff ? '🧙' : '🚶'}
      </div>

      {/* UI Overlay */}
      <div className="absolute top-4 left-4 bg-card/80 backdrop-blur-sm p-4 rounded-lg border-2 border-primary">
        <div className="text-xs space-y-2">
          <div>
            <span className="text-muted-foreground">Local:</span>{' '}
            <span className="text-primary font-bold">{inLibrary ? 'BIBLIOTECA' : 'FLORESTA'}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Cajado:</span>{' '}
            <span className={character.hasStaff ? 'text-green-400' : 'text-red-400'}>
              {character.hasStaff ? '✓ Equipado' : '✗ Não obtido'}
            </span>
          </div>
          {inLibrary && (
            <div>
              <span className="text-muted-foreground">Questões:</span>{' '}
              <span className="text-secondary font-bold">{questionsAnswered}/2</span>
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-card/80 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-primary">
        <p className="text-xs text-center">
          <span className="text-primary font-bold">ESPAÇO/E</span> para interagir • 
          <span className="text-primary font-bold"> WASD/Setas</span> para mover
        </p>
      </div>

      {showDialog && (
        <DialogBox
          speaker={inLibrary ? 'Livro Mágico' : 'Mago Sábio'}
          text={dialogMessage}
          onClose={handleDialogClose}
        />
      )}

      {currentQuestion && (
        <QuestionModal
          question={currentQuestion}
          onCorrect={handleCorrectAnswer}
          onIncorrect={handleIncorrectAnswer}
        />
      )}
    </div>
  );
};