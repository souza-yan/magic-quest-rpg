import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Question } from '@/types/game';
import { validateAnswer } from '@/utils/mathQuestions';
import { GeometricFigure } from './GeometricFigure';

interface QuestionModalProps {
  question: Question;
  onCorrect: () => void;
  onIncorrect: () => void;
  spellType?: string;
}

export const QuestionModal = ({ question, onCorrect, onIncorrect, spellType }: QuestionModalProps) => {
  const [answer, setAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    const correct = validateAnswer(answer, question.answer);
    setIsCorrect(correct);
    setShowFeedback(true);
    
    setTimeout(() => {
      if (correct) {
        onCorrect();
      } else {
        onIncorrect();
      }
      setShowFeedback(false);
      setAnswer('');
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in">
      <Card className="max-w-2xl w-full mx-8 p-8 bg-card border-4 border-primary animate-scale-in">
        {spellType && (
          <div className="text-center mb-4">
            <span className="text-2xl">{spellType === 'water' ? '💧' : spellType === 'fire' ? '🔥' : '⚡'}</span>
            <h3 className="text-sm font-bold text-primary mt-2">
              {spellType === 'water' ? 'MAGIA DE ÁGUA' : spellType === 'fire' ? 'MAGIA DE FOGO' : 'MAGIA DE TROVÃO'}
            </h3>
          </div>
        )}
        
        <div className="mb-6">
          <div className="text-xs text-muted-foreground mb-2">{question.type}</div>
          <h2 className="text-sm font-bold mb-4 text-foreground leading-relaxed">
            {question.question}
          </h2>
          
          {question.figure && (
            <GeometricFigure shape={question.figure.shape} dimensions={question.figure.dimensions} />
          )}
        </div>

        {!showFeedback ? (
          <div className="space-y-4">
            <Input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua resposta..."
              className="text-center text-lg h-14 bg-input border-2 border-primary"
              autoFocus
            />
            <Button 
              onClick={handleSubmit}
              className="w-full h-12 text-sm bg-primary hover:bg-primary/80"
              disabled={!answer}
            >
              CONFIRMAR RESPOSTA
            </Button>
          </div>
        ) : (
          <div className={`text-center py-8 ${isCorrect ? 'animate-pulse-glow' : 'animate-shake'}`}>
            <div className="text-6xl mb-4">
              {isCorrect ? '✓' : '✗'}
            </div>
            <h3 className={`text-lg font-bold ${isCorrect ? 'text-green-400' : 'text-destructive'}`}>
              {isCorrect ? 'CORRETO!' : 'INCORRETO!'}
            </h3>
            {!isCorrect && (
              <p className="text-sm text-muted-foreground mt-2">
                A resposta correta era: {question.answer}
              </p>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};
