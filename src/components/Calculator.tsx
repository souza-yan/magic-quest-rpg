import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleNumber = (num: string) => {
    if (display === '0' || display === 'Erro') {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op: string) => {
    if (display === 'Erro') {
      setDisplay('0');
      setEquation('');
      return;
    }
    setEquation(equation + display + ' ' + op + ' ');
    setDisplay('0');
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleParenthesis = (paren: string) => {
    if (paren === '(') {
      setEquation(equation + paren);
      setDisplay('0');
    } else {
      setEquation(equation + display + paren + ' ');
      setDisplay('0');
    }
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleEquals = () => {
    try {
      const fullEquation = equation + display;
      const jsEquation = fullEquation
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, '3.14');
      
      const result = eval(jsEquation);
      const formattedResult = Number.isInteger(result) ? result.toString() : result.toFixed(2);
      
      setDisplay(formattedResult);
      setEquation('');
    } catch {
      setDisplay('Erro');
      setEquation('');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  const handlePi = () => {
    setDisplay('3.14');
  };

  return (
    <Card className="fixed bottom-4 right-4 p-3 bg-card/95 backdrop-blur-sm border-2 border-primary z-50 w-64 shadow-xl">
      <div className="text-xs text-primary mb-2 font-bold text-center">🧮 CALCULADORA</div>
      
      {/* Display */}
      <div className="bg-black/80 p-3 mb-3 rounded border-2 border-primary/50">
        <div className="text-[10px] text-muted-foreground mb-1 h-3 overflow-hidden">
          {equation}
        </div>
        <div className="text-xl font-mono text-right text-white font-bold">
          {display}
        </div>
      </div>

      {/* Linha 1: Funções especiais */}
      <div className="grid grid-cols-4 gap-1 mb-1">
        <Button
          variant="outline"
          size="sm"
          className="h-10 text-xs font-bold"
          onClick={handleClear}
        >
          C
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-10 text-xs font-bold"
          onClick={() => handleParenthesis('(')}
        >
          (
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-10 text-xs font-bold"
          onClick={() => handleParenthesis(')')}
        >
          )
        </Button>
        <Button
          variant="destructive"
          size="sm"
          className="h-10 text-xs font-bold"
          onClick={handleBackspace}
        >
          ⌫
        </Button>
      </div>

      {/* Números e operadores */}
      <div className="grid grid-cols-4 gap-1">
        {['7', '8', '9', '÷'].map((btn) => (
          <Button
            key={btn}
            variant={btn === '÷' ? 'default' : 'secondary'}
            size="sm"
            className="h-11 text-base font-bold"
            onClick={() => btn === '÷' ? handleOperator(btn) : handleNumber(btn)}
          >
            {btn}
          </Button>
        ))}
        {['4', '5', '6', '×'].map((btn) => (
          <Button
            key={btn}
            variant={btn === '×' ? 'default' : 'secondary'}
            size="sm"
            className="h-11 text-base font-bold"
            onClick={() => btn === '×' ? handleOperator(btn) : handleNumber(btn)}
          >
            {btn}
          </Button>
        ))}
        {['1', '2', '3', '-'].map((btn) => (
          <Button
            key={btn}
            variant={btn === '-' ? 'default' : 'secondary'}
            size="sm"
            className="h-11 text-base font-bold"
            onClick={() => btn === '-' ? handleOperator(btn) : handleNumber(btn)}
          >
            {btn}
          </Button>
        ))}
        <Button
          variant="secondary"
          size="sm"
          className="h-11 text-base font-bold"
          onClick={() => handleNumber('0')}
        >
          0
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="h-11 text-base font-bold"
          onClick={handleDecimal}
        >
          .
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-11 text-xs font-bold"
          onClick={handlePi}
        >
          π
        </Button>
        <Button
          variant="default"
          size="sm"
          className="h-11 text-base font-bold"
          onClick={() => handleOperator('+')}
        >
          +
        </Button>
        <Button
          variant="default"
          size="sm"
          className="col-span-4 h-11 text-sm font-bold bg-green-600 hover:bg-green-500"
          onClick={handleEquals}
        >
          = CALCULAR
        </Button>
      </div>
    </Card>
  );
};