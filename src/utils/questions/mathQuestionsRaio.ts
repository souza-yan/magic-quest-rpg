import { Question } from "@/types/game";
import Questão1 from '../../img/questionImg/Questão1.png';
import Questão2 from '../../img/questionImg/Questão2.png';
import Questão4 from '../../img/questionImg/Questão4.png';
import Questão5 from '../../img/questionImg/Questão5.png';
import Questão6 from '../../img/questionImg/Questão6.png';
import Questão7 from '../../img/questionImg/Questão7.png';

export const mathQuestionsRaio: Question[] = [
  {
    "id": 1,
    "pergunta": "Uma placa decorativa tem o formato de um quadrado (lado 40cm) com um semicírculo (raio 20cm) em cima. (Use π = 3,14). Qual é a área total de 10 dessas placas?",
    "resposta": "22280",
    "dica": "Área Placa = (π*r²/2) + L². (r=20, L=40). Multiplique o total por 10.",
    "imagem": Questão1,
    "dificuldade": "raio"
  },
  {
    "id": 2,
    "pergunta": "Um loteamento é composto por 12 quarteirões quadrados, cada um com 100 metros de lado. O custo total do empreendimento foi de R$ 3.600.000,00. Qual foi o custo por metro quadrado (m²) do loteamento?",
    "resposta": "30",
    "dica": "Área total = (12 * (L * L)). Custo por m² = Custo Total / Área Total.",
    "imagem": Questão2,
    "dificuldade": "raio"
  },
  {
    "id": 3,
    "pergunta": "(IFSP - 2016) Uma praça pública em forma de circunferência tem raio de 18 metros. Assinale a alternativa que apresenta sua área. (Use π = 3,14)",
    "resposta": "1017.36",
    "dica": "A = π * R². (A = 3,14 * 18 * 18)",
    "imagem": null,
    "dificuldade": "raio"
  },
  {
    "id": 4,
    "pergunta": "A Figura A é um retângulo de lados 'x' e 'x+7'. A Figura B é composta por dois triângulos (base 15m, altura 15m; e base 3m, altura 21m). Sabendo que as Áreas de A e B são iguais, qual o valor do maior lado (x+7) da Figura A?",
    "resposta": "16",
    "dica": "Área B = (15*15)/2 + (3*21)/2. Área A = x * (x+7). Igualar as áreas e achar x+7.",
    "imagem": Questão4,
    "dificuldade": "raio"
  },
  {
    "id": 5,
    "pergunta": "(IFG 2017) Uma área de lazer retangular (15m x 12m) tem duas piscinas circulares (raios 3m e 2m). O chão será pintado (menos as piscinas). Um galão pinta 11 m². Quantos galões são necessários? (Use π = 3)",
    "resposta": "13",
    "dica": "Área Pintar = A_Retângulo - A_Piscina1 - A_Piscina2. Galões = (Área Pintar / 11). Arredonde para cima.",
    "imagem": Questão5,
    "dificuldade": "raio"
  },
  {
    "id": 6,
    "pergunta": "Um Tangram é formado por: 2 triângulos grandes (área 4 cada), 1 triângulo médio (área 2), 2 triângulos pequenos (área 1 cada), 1 quadrado (área 2) e 1 paralelogramo (área 2). Qual a área total do Tangram?",
    "resposta": "16",
    "dica": "Some a área de todas as 7 peças.",
    "imagem": Questão6,
    "dificuldade": "raio"
  },
  {
    "id": 7,
    "pergunta": "A área total de um terreno é 104.000 m². Uma área de reserva (Área Menor) corresponde a 4% (0,04) da área total. Essa Área Menor será dividida em 26 lotes iguais (de tamanho 'x'). Qual é a área 'x' de cada lote?",
    "resposta": "160",
    "dica": "1: Area Menor = 0.04 * 104000. 2: x = Area Menor / 26.",
    "imagem": Questão7,
    "dificuldade": "raio"
  }
]