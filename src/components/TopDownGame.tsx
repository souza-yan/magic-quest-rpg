import { useEffect, useState } from 'react';
import { Character } from '@/types/game';
import { DialogBox } from './DialogBox';
import { QuestionModal } from './QuestionModal';
import { tutorialQuestions } from "@/utils/questions/mathQuestionsTutorial";
import { toast } from 'sonner';

import bibliotecaBg from '@/img/Biblioteca.png';

interface TopDownGameProps {
  onComplete: () => void;
  character: Character;
  setCharacter: (char: Character) => void;
  setShowCalculator: (show: boolean) => void;
}

export const TopDownGame = ({
  onComplete,
  character,
  setCharacter,
  setShowCalculator,
}: TopDownGameProps) => {
  const [inLibrary, setInLibrary] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [dialogMessage, setDialogMessage] = useState('');

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (showDialog || currentQuestion) return;

      const speed = window.innerWidth * 0.013; // 1.3% da largura da tela
      const newPos = { ...character.position };

      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') newPos.y -= speed;
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') newPos.y += speed;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') newPos.x -= speed;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') newPos.x += speed;

      newPos.x = Math.max(50, Math.min(window.innerWidth - 100, newPos.x));
      newPos.y = Math.max(50, Math.min(window.innerHeight - 100, newPos.y));

      setCharacter({ ...character, position: newPos });

      if (e.key === ' ' && !showDialog) handleInteraction();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [character, showDialog, currentQuestion, inLibrary, questionsAnswered]);

  const handleInteraction = () => {
    const wizardX = window.innerWidth / 2;
    const wizardY = window.innerHeight / 2;
    const distance = Math.sqrt(
      Math.pow(character.position.x - wizardX, 2) +
        Math.pow(character.position.y - wizardY, 2)
    );

    if (!inLibrary && distance < 100) {
      if (!character.hasStaff) {
        setDialogMessage(
          'Aprendiz, para se tornar um mago é preciso muita dedicação e poderes MATEMÁTICOS. Por isso, resolva as equações a seguir e se torne um mago e adquira seu cajado!'
        );
        setShowDialog(true);
      } else {
        toast.success('Parabéns! Você conquistou seu cajado! Agora enfrente os desafios!');
        setTimeout(() => onComplete(), 2000);
      }
    }

if (inLibrary && distance < 100) {
      if (questionsAnswered < tutorialQuestions.length) {
        setCurrentQuestion(tutorialQuestions[questionsAnswered]);
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
      setTimeout(() => {
        setDialogMessage(
          'Parabéns, jovem aprendiz! Você dominou os fundamentos da matemática e agora porta o Cajado Arcano! Com ele, você poderá enfrentar criaturas poderosas. Aproxime-se de mim quando estiver pronto para sua primeira batalha!'
        );
        setShowDialog(true);
      }, 500);
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

  const handleHelpUsed = () => {
    toast.info('💡 Dica exibida! No tutorial você pode usar ajuda sem penalidades.');
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={
        inLibrary
          ? {
              backgroundImage: `url(${bibliotecaBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              imageRendering: 'pixelated',
            }
          : {
              background: 'linear-gradient(180deg, #1a4a1a 0%, #0a2a0a 100%)',
            }
      }
    >
      {inLibrary && <div className="absolute inset-0 bg-black/20" />}

      {!inLibrary && (
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      )}

      {/* NPC Central - Responsivo */}
      <div
        className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-float z-10"
        style={{ 
          left: '50%', 
          top: '50%',
          fontSize: 'clamp(3rem, 6vw, 6rem)'
        }}
      >
        {inLibrary ? '📖' : '🧙‍♂️'}
      </div>

      {/* Personagem - Responsivo */}
      <div
        className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100 pixel-art z-10"
        style={{
          left: character.position.x,
          top: character.position.y,
          filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.8))',
          fontSize: 'clamp(2.5rem, 5vw, 5rem)'
        }}
      >
        {character.hasStaff ? '🧙' : '🚶'}
      </div>

      {/* UI Overlay - Responsivo */}
      <div className="absolute top-4 right-4 bg-card/80 backdrop-blur-sm p-3 md:p-4 rounded-lg border-2 border-primary z-20 max-w-[200px] md:max-w-none">
        <div className="text-[10px] md:text-xs space-y-1 md:space-y-2">
          <div>
            <span className="text-muted-foreground">Local:</span>{' '}
            <span className="text-primary font-bold">
              {inLibrary ? 'BIBLIOTECA' : 'FLORESTA'}
            </span>
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

      {/* Instruções - Responsivo */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-card/80 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-full border-2 border-primary z-20">
        <p className="text-[10px] md:text-xs text-center">
          <span className="text-primary font-bold">ESPAÇO</span> para interagir •{' '}
          <span className="text-primary font-bold">WASD/Setas</span> para mover
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
          isTutorial={true}
          onHelpUsed={handleHelpUsed}
        />
      )}
    </div>
  );
};