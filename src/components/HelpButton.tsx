import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface HelpButtonProps {
  formulaType: string;
  onHelpUsed?: () => void;
  dica?: string;
}

export const HelpButton = ({ formulaType, onHelpUsed, dica }: HelpButtonProps) => {
  const [showHelp, setShowHelp] = useState(false);
  
  const help = {
    title: 'Dica',
    formula: dica || 'Dica não disponível'
  };

  const handleHelpClick = () => {
    setShowHelp(!showHelp);
    if (!showHelp && onHelpUsed) {
      onHelpUsed();
    }
  };

  return (
    <div className="relative">
      <Button
        onClick={handleHelpClick}
        variant="outline"
        size="sm"
        className="bg-yellow-600 hover:bg-yellow-500 text-white border-2 border-yellow-400"
      >
        💡 AJUDA
      </Button>

      {showHelp && (
        <Card className="absolute top-12 right-0 w-80 p-4 bg-yellow-950 border-2 border-yellow-600 z-50 animate-scale-in">
          <h3 className="text-sm font-bold text-yellow-400 mb-2">{help.title}</h3>
          <div className="text-xs space-y-2">
            <div className="bg-black/30 p-2 rounded">
              <span className="text-yellow-300 font-bold">Dica:</span>
              <p className="text-white mt-1 whitespace-pre-line">{help.formula}</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};