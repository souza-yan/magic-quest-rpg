import { Question } from "@/types/game";
import questao2Agua from '@/img/Questão2Agua.png'; 
import questao5Agua from '@/img/Questão5Aguaa.png';

export const mathQuestionsAgua: Question[] = [
  {
    id: 1,
    pergunta: "A área de um terreno triangular é de 196 m². Se a base mede 14 metros, qual é a altura?",
    resposta: 28,
    dica: "A = (b × h) / 2 → 196 × 2 = 14h → h = 28",
    imagem: null,
    dificuldade: "agua"
  },
  {
    id: 2,
    pergunta: null,
    resposta: 92,
    dica: "área do losango = (D × d) / 2",
    imagem: questao2Agua,
    dificuldade: "agua"
  },
  {
    id: 3,
    pergunta: "Um terreno possui formato de triângulo retângulo. Qual é a área desse terreno? Dados: A = 15 H = 8",
    resposta: 60,
    dica: "a*h/2",
    imagem: null,
    dificuldade: "agua"
  },
  {
    id: 4,
    pergunta: "Calcule o perimetro do quadrado com lado de 20 cm.",
    resposta: 80,
    dica: "P= 4*lados",
    imagem: null,
    dificuldade: "agua"
  },
  {
    id: 5,
    pergunta: "Calcule area de um losango  com diagonal menor de 7 cm e diagonal maior de 14 cm.",
    resposta: 49,
    dica: "Diagonal maior*diagonal menor/2",
    imagem: questao5Agua,
    dificuldade: "agua"
  },
];
