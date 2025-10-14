import { Question } from '@/types/game';

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// ÁGUA - FÁCIL: Retângulos e Quadrados
export const generateEasyQuestion = (): Question => {
  const contexts = [
    { name: 'tapete', unit: 'm²' },
    { name: 'piscina', unit: 'm²' },
    { name: 'quadro', unit: 'cm²' },
    { name: 'mesa', unit: 'm²' },
    { name: 'parede', unit: 'm²' }
  ];
  
  const context = contexts[randomInt(0, contexts.length - 1)];
  const width = randomInt(4, 12);
  const height = randomInt(4, 12);
  const isSquare = Math.random() > 0.7;
  
  if (isSquare) {
    const side = randomInt(5, 10);
    return {
      question: `Calcule a área de um ${context.name} quadrado que mede ${side}m de lado.`,
      answer: side * side,
      type: 'Área do Quadrado',
      figure: {
        shape: 'rectangle' as const,
        dimensions: { width: side, height: side }
      }
    };
  }
  
  return {
    question: `Calcule a área de um ${context.name} retangular de ${width}m por ${height}m.`,
    answer: width * height,
    type: 'Área do Retângulo',
    figure: {
      shape: 'rectangle' as const,
      dimensions: { width, height }
    }
  };
};

// FOGO - MÉDIO: Triângulos, Círculos, Trapézios
export const generateMediumQuestion = (): Question => {
  const operations = [
    () => {
      const contexts = ['jardim', 'telhado', 'escudo', 'vela', 'bandeira'];
      const context = contexts[randomInt(0, contexts.length - 1)];
      const base = randomInt(6, 16);
      const height = randomInt(6, 16);
      return {
        question: `Um ${context} triangular tem base de ${base}m e altura de ${height}m. Qual sua área?`,
        answer: (base * height) / 2,
        type: 'Área do Triângulo',
        figure: {
          shape: 'triangle' as const,
          dimensions: { base, height }
        }
      };
    },
    () => {
      const contexts = ['mesa circular', 'piscina redonda', 'escudo circular', 'jardim circular'];
      const context = contexts[randomInt(0, contexts.length - 1)];
      const radius = randomInt(3, 8);
      return {
        question: `Calcule a área de ${context} com raio de ${radius}m. Use π = 3,14.`,
        answer: Math.round(3.14 * radius * radius * 10) / 10,
        type: 'Área do Círculo',
        figure: {
          shape: 'circle' as const,
          dimensions: { radius }
        }
      };
    },
    () => {
      const base1 = randomInt(6, 12);
      const base2 = randomInt(base1 + 2, base1 + 6);
      const height = randomInt(4, 8);
      return {
        question: `Um terreno em forma de trapézio tem base maior de ${base2}m, base menor de ${base1}m e altura de ${height}m. Calcule sua área.`,
        answer: ((base1 + base2) * height) / 2,
        type: 'Área do Trapézio',
        figure: {
          shape: 'trapezoid' as const,
          dimensions: { base1, base2, height }
        }
      };
    }
  ];
  
  return operations[randomInt(0, operations.length - 1)]();
};

// TROVÃO - DIFÍCIL: Figuras Compostas e Polígonos Complexos
export const generateHardQuestion = (): Question => {
  const operations = [
    () => {
      // Figura em L (dois retângulos)
      const w1 = randomInt(6, 10);
      const h1 = randomInt(4, 7);
      const w2 = randomInt(3, 5);
      const h2 = randomInt(3, 5);
      return {
        question: `Calcule a área desta sala em formato de L: a parte 1 mede ${w1}m x ${h1}m e a parte 2 mede ${w2}m x ${h2}m.`,
        answer: (w1 * h1) + (w2 * h2),
        type: 'Área Composta (L)',
        figure: {
          shape: 'composite' as const,
          dimensions: { w1, h1, w2, h2, type: 'L' }
        }
      };
    },
    () => {
      // Retângulo + Triângulo no topo
      const base = randomInt(8, 14);
      const rectHeight = randomInt(5, 9);
      const triHeight = randomInt(3, 6);
      return {
        question: `Calcule a área total desta figura: um retângulo de ${base}m x ${rectHeight}m com um triângulo no topo (base ${base}m, altura ${triHeight}m).`,
        answer: (base * rectHeight) + ((base * triHeight) / 2),
        type: 'Área Composta (Casa)',
        figure: {
          shape: 'composite' as const,
          dimensions: { base, rectHeight, triHeight, type: 'house' }
        }
      };
    },
    () => {
      // Área sombreada (retângulo grande - retângulo pequeno)
      const bigW = randomInt(10, 16);
      const bigH = randomInt(10, 16);
      const smallW = randomInt(4, 6);
      const smallH = randomInt(4, 6);
      return {
        question: `Calcule a área sombreada: um retângulo grande (${bigW}m x ${bigH}m) com um buraco retangular no meio (${smallW}m x ${smallH}m).`,
        answer: (bigW * bigH) - (smallW * smallH),
        type: 'Área Sombreada',
        figure: {
          shape: 'composite' as const,
          dimensions: { bigW, bigH, smallW, smallH, type: 'shaded' }
        }
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
      type: 'Área do Retângulo',
      figure: {
        shape: 'rectangle' as const,
        dimensions: { width, height }
      }
    };
  } else {
    const base = randomInt(6, 20);
    const height = randomInt(6, 20);
    return {
      question: `Um triângulo tem base ${base}cm e altura ${height}cm. Qual é sua área em cm²?`,
      answer: (base * height) / 2,
      type: 'Área do Triângulo',
      figure: {
        shape: 'triangle' as const,
        dimensions: { base, height }
      }
    };
  }
};

export const validateAnswer = (userAnswer: string, correctAnswer: number): boolean => {
  const parsed = parseFloat(userAnswer);
  if (isNaN(parsed)) return false;
  
  // Accept answer within 0.5 tolerance for area questions
  return Math.abs(parsed - correctAnswer) <= 0.5;
};
