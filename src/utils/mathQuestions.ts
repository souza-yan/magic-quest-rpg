import { Question } from '@/types/game';

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateEasyQuestion = (): Question => {
  const operations = [
    () => {
      const a = randomInt(10, 50);
      const b = randomInt(10, 50);
      return {
        question: `Quanto é ${a} + ${b}?`,
        answer: a + b,
        type: 'Adição'
      };
    },
    () => {
      const a = randomInt(30, 100);
      const b = randomInt(10, a - 10);
      return {
        question: `Quanto é ${a} - ${b}?`,
        answer: a - b,
        type: 'Subtração'
      };
    }
  ];
  
  return operations[randomInt(0, operations.length - 1)]();
};

export const generateMediumQuestion = (): Question => {
  const operations = [
    () => {
      const a = randomInt(5, 15);
      const b = randomInt(5, 15);
      return {
        question: `Quanto é ${a} × ${b}?`,
        answer: a * b,
        type: 'Multiplicação'
      };
    },
    () => {
      const b = randomInt(5, 12);
      const answer = randomInt(10, 20);
      const a = b * answer;
      return {
        question: `Quanto é ${a} ÷ ${b}?`,
        answer: answer,
        type: 'Divisão'
      };
    },
    () => {
      const value = randomInt(100, 500);
      const percent = randomInt(10, 50);
      return {
        question: `Quanto é ${percent}% de ${value}?`,
        answer: Math.round((value * percent) / 100),
        type: 'Porcentagem'
      };
    }
  ];
  
  return operations[randomInt(0, operations.length - 1)]();
};

export const generateHardQuestion = (): Question => {
  const operations = [
    () => {
      const b = randomInt(-10, 10);
      const c = randomInt(-20, 20);
      const delta = b * b - 4 * c;
      if (delta < 0 || delta % 1 !== 0) return generateHardQuestion();
      const x1 = Math.round((-b + Math.sqrt(delta)) / 2);
      return {
        question: `Resolva x² + ${b}x + ${c} = 0. Qual é a maior raiz? (arredonde se necessário)`,
        answer: x1,
        type: 'Equação 2º grau'
      };
    },
    () => {
      const angle = [0, 30, 45, 60, 90][randomInt(0, 4)];
      const values: { [key: number]: number } = {
        0: 0,
        30: 0.5,
        45: 0.71,
        60: 0.87,
        90: 1
      };
      return {
        question: `Quanto é sen(${angle}°)? (use 2 casas decimais)`,
        answer: values[angle],
        type: 'Trigonometria'
      };
    },
    () => {
      const a = randomInt(2, 8);
      const b = randomInt(3, 10);
      const x = randomInt(2, 5);
      return {
        question: `Se f(x) = ${a}x + ${b}, quanto é f(${x})?`,
        answer: a * x + b,
        type: 'Função'
      };
    }
  ];
  
  return operations[randomInt(0, operations.length - 1)]();
};

export const generateAreaQuestion = (shape: 'rectangle' | 'triangle'): Question => {
  if (shape === 'rectangle') {
    const width = randomInt(5, 15);
    const height = randomInt(5, 15);
    return {
      question: `Um retângulo tem largura ${width}cm e altura ${height}cm. Qual é sua área em cm²?`,
      answer: width * height,
      type: 'Área do Retângulo'
    };
  } else {
    const base = randomInt(6, 20);
    const height = randomInt(6, 20);
    return {
      question: `Um triângulo tem base ${base}cm e altura ${height}cm. Qual é sua área em cm²?`,
      answer: (base * height) / 2,
      type: 'Área do Triângulo'
    };
  }
};

export const validateAnswer = (userAnswer: string, correctAnswer: number): boolean => {
  const parsed = parseFloat(userAnswer);
  if (isNaN(parsed)) return false;
  
  // Accept answer within 0.05 tolerance for decimal questions
  return Math.abs(parsed - correctAnswer) < 0.05;
};
