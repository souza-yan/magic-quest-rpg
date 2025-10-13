import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleNumber = (num: string) => {
    if (display === '0') {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const handleEquals = () => {
    try {
      const fullEquation = equation + display;
      const result = eval(fullEquation.replace('×', '*').replace('÷', '/'));
      setDisplay(result.toString());
      setEquation('');
    } catch {
      setDisplay('Erro');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  return (
    <Card className="fixed top-4 right-4 p-4 bg-card/90 backdrop-blur-sm border-2 border-primary z-50 w-64">
      <div className="text-xs text-primary mb-2 font-bold">CALCULADORA</div>
      <div className="bg-input p-2 mb-3 rounded text-right font-mono h-12 flex items-center justify-end overflow-hidden">
        <div className="text-xs text-muted-foreground">{equation}</div>
        <div className="text-sm ml-2">{display}</div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {['7', '8', '9', '÷'].map((btn) => (
          <Button
            key={btn}
            variant={['÷', '×', '-', '+'].includes(btn) ? 'default' : 'secondary'}
            size="sm"
            className="h-10 text-xs"
            onClick={() => ['÷', '×', '-', '+'].includes(btn) ? handleOperator(btn) : handleNumber(btn)}
          >
            {btn}
          </Button>
        ))}
        {['4', '5', '6', '×'].map((btn) => (
          <Button
            key={btn}
            variant={['÷', '×', '-', '+'].includes(btn) ? 'default' : 'secondary'}
            size="sm"
            className="h-10 text-xs"
            onClick={() => ['÷', '×', '-', '+'].includes(btn) ? handleOperator(btn) : handleNumber(btn)}
          >
            {btn}
          </Button>
        ))}
        {['1', '2', '3', '-'].map((btn) => (
          <Button
            key={btn}
            variant={['÷', '×', '-', '+'].includes(btn) ? 'default' : 'secondary'}
            size="sm"
            className="h-10 text-xs"
            onClick={() => ['÷', '×', '-', '+'].includes(btn) ? handleOperator(btn) : handleNumber(btn)}
          >
            {btn}
          </Button>
        ))}
        {['0', '.', '=', '+'].map((btn) => (
          <Button
            key={btn}
            variant={btn === '=' || btn === '+' ? 'default' : 'secondary'}
            size="sm"
            className="h-10 text-xs"
            onClick={() => {
              if (btn === '=') handleEquals();
              else if (btn === '+') handleOperator(btn);
              else handleNumber(btn);
            }}
          >
            {btn}
          </Button>
        ))}
        <Button
          variant="destructive"
          size="sm"
          className="col-span-4 h-10 text-xs"
          onClick={handleClear}
        >
          LIMPAR (C)
        </Button>
      </div>
    </Card>
  );
};
