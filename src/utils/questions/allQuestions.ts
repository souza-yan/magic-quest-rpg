import { mathQuestionsAgua } from "./mathQuestionsAgua";
import { mathQuestionsFogo } from "./mathQuestionsFogo";
import { mathQuestionsRaio } from "./mathQuestionsRaio";

export const allQuestions = [
  ...mathQuestionsAgua,
  ...mathQuestionsFogo,
  ...mathQuestionsRaio,
];

export function getRandomQuestionByDifficulty(
  difficulty: "agua" | "fogo" | "raio"
) {
  const filtered = allQuestions.filter(q => q.dificuldade === difficulty);
  const i = Math.floor(Math.random() * filtered.length);
  return filtered[i];
}
