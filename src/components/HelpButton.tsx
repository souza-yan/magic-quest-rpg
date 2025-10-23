import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface HelpButtonProps {
  formulaType: string;
  onHelpUsed?: () => void;
}

export const HelpButton = ({ formulaType, onHelpUsed }: HelpButtonProps) => {
  const [showHelp, setShowHelp] = useState(false);

  const formulas: Record<string, { title: string; formula: string; example: string }> = {
    'Área do Retângulo': {
      title: 'Área do Retângulo',
      formula: 'Área = base × altura',
      example: 'Ex: Se base = 5cm e altura = 10cm\nÁrea = 5 × 10 = 50cm²'
    },
    'Área do Quadrado': {
      title: 'Área do Quadrado',
      formula: 'Área = lado × lado (ou lado²)',
      example: 'Ex: Se lado = 8cm\nÁrea = 8 × 8 = 64cm²'
    },
    'Área do Triângulo': {
      title: 'Área do Triângulo',
      formula: 'Área = (base × altura) ÷ 2',
      example: 'Ex: Se base = 6cm e altura = 8cm\nÁrea = (6 × 8) ÷ 2 = 24cm²'
    },
    'Área do Círculo': {
      title: 'Área do Círculo',
      formula: 'Área = π × raio²  (use π = 3,14)',
      example: 'Ex: Se raio = 5cm\nÁrea = 3,14 × 5² = 3,14 × 25 = 78,5cm²'
    },
    'Área do Círculo Grande': {
      title: 'Área do Círculo',
      formula: 'Área = π × raio²  (use π = 3,14)',
      example: 'Ex: Se raio = 10cm\nÁrea = 3,14 × 10² = 3,14 × 100 = 314cm²'
    },
    'Área do Paralelogramo': {
      title: 'Área do Paralelogramo',
      formula: 'Área = base × altura',
      example: 'Ex: Se base = 12cm e altura = 7cm\nÁrea = 12 × 7 = 84cm²'
    },
    'Área do Trapézio': {
      title: 'Área do Trapézio',
      formula: 'Área = ((base maior + base menor) × altura) ÷ 2',
      example: 'Ex: Base maior = 10cm, base menor = 6cm, altura = 5cm\nÁrea = ((10 + 6) × 5) ÷ 2 = 40cm²'
    },
    'Área do Losango': {
      title: 'Área do Losango',
      formula: 'Área = (diagonal maior × diagonal menor) ÷ 2',
      example: 'Ex: Diag. maior = 12cm, diag. menor = 8cm\nÁrea = (12 × 8) ÷ 2 = 48cm²'
    },
    'Área Composta': {
      title: 'Área Composta (Casa)',
      formula: 'Some as áreas: Retângulo + Triângulo',
      example: 'Calcule cada parte separadamente e some!'
    }
  };

  const help = formulas[formulaType] || {
    title: 'Ajuda',
    formula: 'Fórmula não disponível',
    example: ''
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
              <span className="text-yellow-300 font-bold">Fórmula:</span>
              <p className="text-white mt-1">{help.formula}</p>
            </div>
            {help.example && (
              <div className="bg-black/30 p-2 rounded">
                <span className="text-yellow-300 font-bold">Exemplo:</span>
                <p className="text-white mt-1 whitespace-pre-line">{help.example}</p>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};