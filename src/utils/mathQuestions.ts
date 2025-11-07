import { Question } from '@/types/game';

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// ==================== NÍVEL ÁGUA (FÁCIL) - PERÍMETROS ====================
export const generateEasyQuestion = (): Question => {
  const perimeterQuestions = [
    () => {
      // Perímetro do quadrado
      const lado = randomInt(15, 25);
      return {
        question: `Calcule o perímetro de um quadrado com lado de ${lado} cm.`,
        answer: lado * 4,
        type: 'Perímetro do Quadrado',
        shape: 'square',
        dimensions: { side: lado }
      };
    },
    () => {
      // Perímetro do retângulo
      const base = randomInt(10, 20);
      const altura = randomInt(8, 15);
      return {
        question: `Calcule o perímetro de um retângulo com ${base} cm de base e ${altura} cm de altura.`,
        answer: (base + altura) * 2,
        type: 'Perímetro do Retângulo',
        shape: 'rectangle',
        dimensions: { width: base, height: altura }
      };
    },
    () => {
      // Perímetro do triângulo - SEM FIGURA (problema contextualizado)
      const a = 8;
      const b = 12;
      const c = 10;
      const perimetro = a + b + c;
      return {
        question: `Carla, Ana e Paula formam um triângulo. Carla está a ${a} cm de Ana, Ana está a ${b} cm de Paula. Se o perímetro é ${perimetro} cm, qual a distância entre Carla e Paula?`,
        answer: c,
        type: 'Perímetro - Problema'
      };
    }
  ];
  
  return perimeterQuestions[randomInt(0, perimeterQuestions.length - 1)]();
};

// ==================== NÍVEL FOGO (MÉDIO) - ÁREAS COM INTERPRETAÇÃO ====================
export const generateMediumQuestion = (): Question => {
  const areaQuestions = [
    () => {
      // Área do triângulo (descobrir altura)
      const base = 14;
      const area = 196;
      const altura = (area * 2) / base;
      return {
        question: `A área de um terreno triangular é ${area} m². Se a base mede ${base} m, qual é a altura? (Área = base × altura ÷ 2)`,
        answer: altura,
        type: 'Área do Triângulo',
        shape: 'triangle',
        dimensions: { base: base, height: altura }
      };
    },
    () => {
      // Área do triângulo simples
      const base = randomInt(10, 20);
      const altura = randomInt(8, 15);
      return {
        question: `Um terreno triangular tem base de ${base} m e altura de ${altura} m. Qual é sua área em m²?`,
        answer: (base * altura) / 2,
        type: 'Área do Triângulo',
        shape: 'triangle',
        dimensions: { base: base, height: altura }
      };
    },
    () => {
      // Losango
      const diagMenor = 7;
      const diagMaior = 14;
      return {
        question: `Um losango tem diagonal menor de ${diagMenor} cm e diagonal maior de ${diagMaior} cm. Qual sua área?`,
        answer: (diagMaior * diagMenor) / 2,
        type: 'Área do Losango',
        shape: 'diamond',
        dimensions: { diagonalMajor: diagMaior, diagonalMinor: diagMenor }
      };
    },
    () => {
      // Retângulo - descobrir lado do quadrado equivalente
      const comprimento = 27;
      const largura = 12;
      const areaRetangulo = comprimento * largura;
      const ladoQuadrado = Math.sqrt(areaRetangulo);
      return {
        question: `Um terreno retangular mede ${comprimento} m × ${largura} m. Um quadrado com mesma área teria qual lado?`,
        answer: ladoQuadrado,
        type: 'Área - Equivalência',
        shape: 'square',
        dimensions: { side: ladoQuadrado }
      };
    },
    () => {
      // Círculo com porcentagem
      const raio = 6;
      const pi = 3.1;
      const areaTotal = pi * raio * raio;
      const areaVerde = parseFloat((areaTotal * 0.6).toFixed(1));
      return {
        question: `Uma praça circular tem raio ${raio} m. Se 60% é área verde, quantos m² tem de área verde? (π = ${pi})`,
        answer: areaVerde,
        type: 'Área do Círculo',
        shape: 'circle',
        dimensions: { radius: raio }
      };
    }
  ];
  
  return areaQuestions[randomInt(0, areaQuestions.length - 1)]();
};

// ==================== NÍVEL TROVÃO (DIFÍCIL) - VESTIBULAR/ENEM ====================
export const generateHardQuestion = (): Question => {
  const hardQuestions = [
    () => {
      // Densidade em área retangular
      const comprimento = 120;
      const largura = 150;
      const area = comprimento * largura;
      const pessoasPorM2 = 4;
      const totalPessoas = area * pessoasPorM2;
      return {
        question: `Um parque ${comprimento} m × ${largura} m terá uma festa. Polícia recomenda máximo 4 pessoas/m². Quantas pessoas cabem?`,
        answer: totalPessoas,
        type: 'Área - Aplicação',
        shape: 'rectangle',
        dimensions: { width: comprimento, height: largura }
      };
    },
    () => {
      // Círculo grande
      const raio = 18;
      const pi = 3.14;
      const area = parseFloat((pi * raio * raio).toFixed(2));
      return {
        question: `Uma praça circular tem raio ${raio} m. Qual sua área em m²? (π = ${pi})`,
        answer: area,
        type: 'Área do Círculo',
        shape: 'circle',
        dimensions: { radius: raio }
      };
    },
    () => {
      // Área composta - SEM FIGURA (muito complexa)
      const comprimento = 15;
      const largura = 12;
      const raioAdulto = 3;
      const raioInfantil = 2;
      const pi = 3;
      
      const areaTerr = comprimento * largura;
      const areaPiscinaAdulto = pi * raioAdulto * raioAdulto;
      const areaPiscinaInfantil = pi * raioInfantil * raioInfantil;
      const areaPintar = areaTerr - areaPiscinaAdulto - areaPiscinaInfantil;
      const galaoPor = 11;
      const galoes = Math.ceil(areaPintar / galaoPor);
      
      return {
        question: `Área ${comprimento}×${largura}m tem 2 piscinas circulares (raios ${raioAdulto}m e ${raioInfantil}m). Um galão pinta 11m². Quantos galões? (π=${pi})`,
        answer: galoes,
        type: 'Área Composta'
      };
    },
    () => {
      // Trapézio
      const baseMaior = randomInt(16, 24);
      const baseMenor = randomInt(8, 14);
      const altura = randomInt(8, 12);
      const area = ((baseMaior + baseMenor) * altura) / 2;
      return {
        question: `Um trapézio tem base maior ${baseMaior} cm, base menor ${baseMenor} cm e altura ${altura} cm. Qual sua área?`,
        answer: area,
        type: 'Área do Trapézio',
        shape: 'trapezoid',
        dimensions: { topBase: baseMenor, bottomBase: baseMaior, height: altura }
      };
    },
    () => {
      // Paralelogramo
      const base = randomInt(12, 20);
      const altura = randomInt(8, 14);
      const area = base * altura;
      return {
        question: `Um paralelogramo tem base ${base} cm e altura ${altura} cm. Qual é sua área em cm²?`,
        answer: area,
        type: 'Área do Paralelogramo',
        shape: 'parallelogram',
        dimensions: { base: base, height: altura }
      };
    }
  ];
  
  return hardQuestions[randomInt(0, hardQuestions.length - 1)]();
};

// Para o tutorial (biblioteca)
export const generateAreaQuestion = (shape: 'rectangle' | 'triangle'): Question => {
  if (shape === 'rectangle') {
    const width = randomInt(5, 15);
    const height = randomInt(5, 15);
    return {
      question: `Um retângulo tem largura ${width} cm e altura ${height} cm. Qual é sua área em cm²?`,
      answer: width * height,
      type: 'Área do Retângulo',
      shape: 'rectangle',
      dimensions: { width: width, height: height }
    };
  } else {
    const base = randomInt(6, 20);
    const height = randomInt(6, 20);
    return {
      question: `Um triângulo tem base ${base} cm e altura ${height} cm. Qual é sua área em cm²?`,
      answer: (base * height) / 2,
      type: 'Área do Triângulo',
      shape: 'triangle',
      dimensions: { base: base, height: height }
    };
  }
};

export const validateAnswer = (userAnswer: string, correctAnswer: number): boolean => {
  const parsed = parseFloat(userAnswer);
  if (isNaN(parsed)) return false;
  
  // Tolerância ajustada baseada no tamanho do número
  let tolerance = 0.5;
  if (correctAnswer > 100) tolerance = 2;
  if (correctAnswer > 1000) tolerance = 10;
  
  return Math.abs(parsed - correctAnswer) <= tolerance;
};