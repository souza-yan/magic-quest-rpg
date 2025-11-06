import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Question } from '@/types/game';
import { validateAnswer } from '@/utils/mathQuestions';
import { HelpButton } from './HelpButton';

interface QuestionModalProps {
  question: Question;
  onCorrect: () => void;
  onIncorrect: () => void;
  spellType?: string;
  isTutorial?: boolean;
  onHelpUsed?: () => void;
}

const ShapeVisualization = ({ shape, dimensions }: { shape?: string; dimensions?: any }) => {
  if (!shape || !dimensions) return null;

  const scale = 6; // Aumentado de 5 para 6 (20% maior)

  const renderShape = () => {
    switch (shape) {
      case 'rectangle':
        return (
          <svg width={dimensions.width * scale + 40} height={dimensions.height * scale + 40} className="mx-auto">
            <rect 
              x="20" 
              y="20" 
              width={dimensions.width * scale} 
              height={dimensions.height * scale}
              fill="rgba(168, 85, 247, 0.3)"
              stroke="rgb(168, 85, 247)"
              strokeWidth="3"
            />
            <text x={20 + (dimensions.width * scale) / 2} y="15" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
              {dimensions.width} cm
            </text>
            <text x="10" y={20 + (dimensions.height * scale) / 2} textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" transform={`rotate(-90, 10, ${20 + (dimensions.height * scale) / 2})`}>
              {dimensions.height} cm
            </text>
          </svg>
        );

      case 'square':
        const side = dimensions.side * scale;
        return (
          <svg width={side + 40} height={side + 40} className="mx-auto">
            <rect 
              x="20" 
              y="20" 
              width={side} 
              height={side}
              fill="rgba(168, 85, 247, 0.3)"
              stroke="rgb(168, 85, 247)"
              strokeWidth="3"
            />
            <text x={20 + side / 2} y="15" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
              {dimensions.side} cm
            </text>
          </svg>
        );

      case 'triangle':
        const triWidth = dimensions.base * scale;
        const triHeight = dimensions.height * scale;
        return (
          <svg width={triWidth + 40} height={triHeight + 60} className="mx-auto">
            <polygon 
              points={`20,${triHeight + 20} ${triWidth + 20},${triHeight + 20} ${(triWidth / 2) + 20},20`}
              fill="rgba(168, 85, 247, 0.3)"
              stroke="rgb(168, 85, 247)"
              strokeWidth="3"
            />
            <text x={20 + triWidth / 2} y={triHeight + 40} textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
              base: {dimensions.base} cm
            </text>
            <line 
              x1={(triWidth / 2) + 20} 
              y1="20" 
              x2={(triWidth / 2) + 20} 
              y2={triHeight + 20}
              stroke="rgb(251, 146, 60)"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            <text x={(triWidth / 2) + 35} y={20 + triHeight / 2} fill="rgb(251, 146, 60)" fontSize="16" fontWeight="bold">
              h: {dimensions.height} cm
            </text>
          </svg>
        );

      case 'circle':
        const radius = dimensions.radius * scale;
        return (
          <svg width={radius * 2 + 60} height={radius * 2 + 60} className="mx-auto">
            <circle 
              cx={radius + 30} 
              cy={radius + 30} 
              r={radius}
              fill="rgba(168, 85, 247, 0.3)"
              stroke="rgb(168, 85, 247)"
              strokeWidth="3"
            />
            <line 
              x1={radius + 30} 
              y1={radius + 30} 
              x2={radius * 2 + 30} 
              y2={radius + 30}
              stroke="rgb(251, 146, 60)"
              strokeWidth="2"
            />
            <text x={radius + 30 + radius / 2} y={radius + 20} textAnchor="middle" fill="rgb(251, 146, 60)" fontSize="14" fontWeight="bold">
              r: {dimensions.radius}cm
            </text>
          </svg>
        );

      case 'parallelogram':
        const paraWidth = dimensions.base * scale;
        const paraHeight = dimensions.height * scale;
        const offset = paraHeight * 0.3;
        return (
          <svg width={paraWidth + offset + 40} height={paraHeight + 60} className="mx-auto">
            <polygon 
              points={`${20 + offset},20 ${paraWidth + offset + 20},20 ${paraWidth + 20},${paraHeight + 20} 20,${paraHeight + 20}`}
              fill="rgba(168, 85, 247, 0.3)"
              stroke="rgb(168, 85, 247)"
              strokeWidth="3"
            />
            <text x={20 + offset + paraWidth / 2} y="15" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
              base: {dimensions.base}cm
            </text>
            <line 
              x1={20 + offset} 
              y1="20" 
              x2="20" 
              y2={paraHeight + 20}
              stroke="rgb(251, 146, 60)"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            <text x="10" y={20 + paraHeight / 2} fill="rgb(251, 146, 60)" fontSize="14" fontWeight="bold">
              h: {dimensions.height}cm
            </text>
          </svg>
        );

      case 'trapezoid':
        const trapBottom = dimensions.bottomBase * scale;
        const trapTop = dimensions.topBase * scale;
        const trapHeight = dimensions.height * scale;
        const trapOffset = (trapBottom - trapTop) / 2;
        return (
          <svg width={trapBottom + 40} height={trapHeight + 60} className="mx-auto">
            <polygon 
              points={`${20 + trapOffset},20 ${20 + trapOffset + trapTop},20 ${trapBottom + 20},${trapHeight + 20} 20,${trapHeight + 20}`}
              fill="rgba(168, 85, 247, 0.3)"
              stroke="rgb(168, 85, 247)"
              strokeWidth="3"
            />
            <text x={20 + trapOffset + trapTop / 2} y="15" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
              {dimensions.topBase}cm
            </text>
            <text x={20 + trapBottom / 2} y={trapHeight + 40} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
              {dimensions.bottomBase}cm
            </text>
            <line 
              x1={20 + trapOffset} 
              y1="20" 
              x2="20" 
              y2={trapHeight + 20}
              stroke="rgb(251, 146, 60)"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            <text x="10" y={20 + trapHeight / 2} fill="rgb(251, 146, 60)" fontSize="14" fontWeight="bold">
              h: {dimensions.height}cm
            </text>
          </svg>
        );

      case 'diamond':
        const dMajor = dimensions.diagonalMajor * scale;
        const dMinor = dimensions.diagonalMinor * scale;
        return (
          <svg width={dMajor + 40} height={dMinor + 40} className="mx-auto">
            <polygon 
              points={`${20 + dMajor / 2},20 ${20 + dMajor},${20 + dMinor / 2} ${20 + dMajor / 2},${20 + dMinor} 20,${20 + dMinor / 2}`}
              fill="rgba(168, 85, 247, 0.3)"
              stroke="rgb(168, 85, 247)"
              strokeWidth="3"
            />
            <line x1={20 + dMajor / 2} y1="20" x2={20 + dMajor / 2} y2={20 + dMinor} stroke="rgb(251, 146, 60)" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="20" y1={20 + dMinor / 2} x2={20 + dMajor} y2={20 + dMinor / 2} stroke="rgb(251, 146, 60)" strokeWidth="2" strokeDasharray="5,5" />
            <text x={20 + dMajor / 2} y={dMinor + 40} textAnchor="middle" fill="rgb(251, 146, 60)" fontSize="12" fontWeight="bold">
              D: {dimensions.diagonalMajor}cm
            </text>
            <text x={dMajor + 35} y={20 + dMinor / 2} fill="rgb(251, 146, 60)" fontSize="12" fontWeight="bold">
              d: {dimensions.diagonalMinor}cm
            </text>
          </svg>
        );

      case 'house':
        const houseWidth = dimensions.rectWidth * scale;
        const houseRectHeight = dimensions.rectHeight * scale;
        const houseTriHeight = dimensions.triHeight * scale;
        return (
          <svg width={houseWidth + 40} height={houseRectHeight + houseTriHeight + 40} className="mx-auto">
            <rect 
              x="20" 
              y={20 + houseTriHeight} 
              width={houseWidth} 
              height={houseRectHeight}
              fill="rgba(168, 85, 247, 0.3)"
              stroke="rgb(168, 85, 247)"
              strokeWidth="3"
            />
            <polygon 
              points={`20,${20 + houseTriHeight} ${houseWidth + 20},${20 + houseTriHeight} ${(houseWidth / 2) + 20},20`}
              fill="rgba(239, 68, 68, 0.3)"
              stroke="rgb(239, 68, 68)"
              strokeWidth="3"
            />
            <text x={20 + houseWidth / 2} y={20 + houseTriHeight + houseRectHeight + 20} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
              {dimensions.rectWidth}cm × {dimensions.rectHeight}cm
            </text>
            <text x={20 + houseWidth / 2} y="15" textAnchor="middle" fill="rgb(239, 68, 68)" fontSize="12" fontWeight="bold">
              △ altura: {dimensions.triHeight}cm
            </text>
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div className="my-6 p-4 bg-black/40 rounded-lg border-2 border-primary/30">
      <div className="text-xs text-muted-foreground text-center mb-3">📐 Visualização da Figura</div>
      {renderShape()}
    </div>
  );
};

export const QuestionModal = ({ question, onCorrect, onIncorrect, spellType, isTutorial = false, onHelpUsed }: QuestionModalProps) => {
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
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in p-2 md:p-4">
      <Card className="max-w-2xl w-full mx-auto p-4 md:p-8 bg-card border-4 border-primary animate-scale-in max-h-[90vh] overflow-y-auto">
        {spellType && (
          <div className="text-center mb-3 md:mb-4">
            <span className="text-xl md:text-2xl">{spellType === 'water' ? '💧' : spellType === 'fire' ? '🔥' : '⚡'}</span>
            <h3 className="text-xs md:text-sm font-bold text-primary mt-2">
              {spellType === 'water' ? 'MAGIA DE ÁGUA' : spellType === 'fire' ? 'MAGIA DE FOGO' : 'MAGIA DE TROVÃO'}
            </h3>
          </div>
        )}
        
        <div className="mb-4 md:mb-6">
          <div className="flex justify-between items-center mb-2">
            <div className="text-[10px] md:text-xs text-muted-foreground">{question.type}</div>
            <HelpButton 
              formulaType={question.type} 
              onHelpUsed={onHelpUsed}
            />
          </div>
          <h2 className="text-xs md:text-sm font-bold mb-3 md:mb-4 text-foreground leading-relaxed">
            {question.question}
          </h2>
        </div>

        {/* Visualização da Figura Geométrica */}
        <ShapeVisualization shape={question.shape} dimensions={question.dimensions} />

        {!showFeedback ? (
          <div className="space-y-3 md:space-y-4">
            <Input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua resposta..."
              className="text-center text-base md:text-lg h-12 md:h-14 bg-input border-2 border-primary"
              autoFocus
            />
            <Button 
              onClick={handleSubmit}
              className="w-full h-10 md:h-12 text-xs md:text-sm bg-primary hover:bg-primary/80"
              disabled={!answer}
            >
              CONFIRMAR RESPOSTA
            </Button>
          </div>
        ) : (
          <div className={`text-center py-6 md:py-8 ${isCorrect ? 'animate-pulse-glow' : 'animate-shake'}`}>
            <div className="text-5xl md:text-6xl mb-4">
              {isCorrect ? '✓' : '✗'}
            </div>
            <h3 className={`text-base md:text-lg font-bold ${isCorrect ? 'text-green-400' : 'text-destructive'}`}>
              {isCorrect ? 'CORRETO!' : 'INCORRETO!'}
            </h3>
            {!isCorrect && (
              <p className="text-xs md:text-sm text-muted-foreground mt-2">
                A resposta correta era: {question.answer}
              </p>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};