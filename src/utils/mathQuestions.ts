import { Question } from '@/types/game';

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateEasyQuestion = (): Question => {
  const operations = [
    () => {
      // Retângulo: base × altura
      const base = randomInt(5, 15);
      const altura = randomInt(5, 15);
      return {
        question: `Um retângulo tem base de ${base}cm e altura de ${altura}cm. Qual é sua área em cm²?`,
        answer: base * altura,
        type: 'Área do Retângulo',
        shape: 'rectangle',
        dimensions: { width: base, height: altura }
      };
    },
    () => {
      // Quadrado: lado²
      const lado = randomInt(5, 12);
      return {
        question: `Um quadrado tem lado de ${lado}cm. Qual é sua área em cm²?`,
        answer: lado * lado,
        type: 'Área do Quadrado',
        shape: 'square',
        dimensions: { side: lado }
      };
    },
    () => {
      // Triângulo: (base × altura) / 2
      const base = randomInt(6, 16);
      const altura = randomInt(6, 16);
      return {
        question: `Um triângulo tem base de ${base}cm e altura de ${altura}cm. Qual é sua área em cm²?`,
        answer: (base * altura) / 2,
        type: 'Área do Triângulo',
        shape: 'triangle',
        dimensions: { base: base, height: altura }
      };
    }
  ];
  
  return operations[randomInt(0, operations.length - 1)]();
};

export const generateMediumQuestion = (): Question => {
  const operations = [
    () => {
      // Paralelogramo: base × altura
      const base = randomInt(8, 18);
      const altura = randomInt(6, 14);
      return {
        question: `Um paralelogramo tem base de ${base}cm e altura de ${altura}cm. Qual é sua área em cm²?`,
        answer: base * altura,
        type: 'Área do Paralelogramo',
        shape: 'parallelogram',
        dimensions: { base: base, height: altura }
      };
    },
    () => {
      // Círculo: π × raio² (usar π = 3,14)
      const raio = randomInt(4, 10);
      const area = 3.14 * raio * raio;
      return {
        question: `Um círculo tem raio de ${raio}cm. Qual é sua área em cm²? (use π = 3,14)`,
        answer: parseFloat(area.toFixed(2)),
        type: 'Área do Círculo',
        shape: 'circle',
        dimensions: { radius: raio }
      };
    },
    () => {
      // Trapézio: ((base maior + base menor) × altura) / 2
      const baseMaior = randomInt(12, 20);
      const baseMenor = randomInt(6, baseMaior - 2);
      const altura = randomInt(6, 12);
      return {
        question: `Um trapézio tem base maior de ${baseMaior}cm, base menor de ${baseMenor}cm e altura de ${altura}cm. Qual é sua área em cm²?`,
        answer: ((baseMaior + baseMenor) * altura) / 2,
        type: 'Área do Trapézio',
        shape: 'trapezoid',
        dimensions: { topBase: baseMenor, bottomBase: baseMaior, height: altura }
      };
    }
  ];
  
  return operations[randomInt(0, operations.length - 1)]();
};

export const generateHardQuestion = (): Question => {
  const operations = [
    () => {
      // Losango: (diagonal maior × diagonal menor) / 2
      const diagMaior = randomInt(12, 24);
      const diagMenor = randomInt(8, 18);
      return {
        question: `Um losango tem diagonal maior de ${diagMaior}cm e diagonal menor de ${diagMenor}cm. Qual é sua área em cm²?`,
        answer: (diagMaior * diagMenor) / 2,
        type: 'Área do Losango',
        shape: 'diamond',
        dimensions: { diagonalMajor: diagMaior, diagonalMinor: diagMenor }
      };
    },
    () => {
      // Círculo maior: π × raio²
      const raio = randomInt(8, 15);
      const area = 3.14 * raio * raio;
      return {
        question: `Um escudo circular tem raio de ${raio}cm. Qual é sua área total em cm²? (use π = 3,14)`,
        answer: parseFloat(area.toFixed(2)),
        type: 'Área do Círculo Grande',
        shape: 'circle',
        dimensions: { radius: raio }
      };
    },
    () => {
      // Figura composta: retângulo + triângulo (formato de casa)
      const baseRet = randomInt(8, 14);
      const alturaRet = randomInt(10, 16);
      const alturaTri = randomInt(5, 10);
      const areaRetangulo = baseRet * alturaRet;
      const areaTriangulo = (baseRet * alturaTri) / 2;
      return {
        question: `Uma casa tem formato de um retângulo (${baseRet}cm × ${alturaRet}cm) com um triângulo no topo (base ${baseRet}cm, altura ${alturaTri}cm). Qual é a área total em cm²?`,
        answer: areaRetangulo + areaTriangulo,
        type: 'Área Composta',
        shape: 'house',
        dimensions: { 
          rectWidth: baseRet, 
          rectHeight: alturaRet, 
          triHeight: alturaTri 
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
      shape: 'rectangle',
      dimensions: { width: width, height: height }
    };
  } else {
    const base = randomInt(6, 20);
    const height = randomInt(6, 20);
    return {
      question: `Um triângulo tem base ${base}cm e altura ${height}cm. Qual é sua área em cm²?`,
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
  
  // Accept answer within 0.5 tolerance for area questions
  return Math.abs(parsed - correctAnswer) <= 0.5;
};