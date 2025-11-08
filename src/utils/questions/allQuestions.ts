import { mathQuestionsAgua } from "./mathQuestionsAgua";
import { mathQuestionsFogo } from "./mathQuestionsFogo";
import { mathQuestionsRaio } from "./mathQuestionsRaio";

export const allQuestions = [
  ...mathQuestionsAgua,
  ...mathQuestionsFogo,
  ...mathQuestionsRaio,
];

import { questionManager } from "../questionManager";

export function getRandomQuestionByDifficulty(
  difficulty: "agua" | "fogo" | "raio"
) {
  const filtered = allQuestions.filter(q => q.dificuldade === difficulty);
  return questionManager.getRandomQuestion(filtered);
}
