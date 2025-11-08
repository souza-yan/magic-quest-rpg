import { Question } from "@/types/game";

class QuestionManager {
  private usedQuestions: Set<number>;

  constructor() {
    this.usedQuestions = new Set();
  }

  getRandomQuestion(questions: Question[]): Question {
    // Filtra as questões que ainda não foram usadas
    const availableQuestions = questions.filter(q => !this.usedQuestions.has(q.id));

    // Se todas as questões já foram usadas, reinicia a lista
    if (availableQuestions.length === 0) {
      this.usedQuestions.clear();
      return this.getRandomQuestion(questions);
    }

    // Seleciona uma questão aleatória das disponíveis
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selectedQuestion = availableQuestions[randomIndex];

    // Marca a questão como usada
    this.usedQuestions.add(selectedQuestion.id);

    return selectedQuestion;
  }

  // Método para reiniciar o gerenciador (pode ser usado ao iniciar uma nova batalha)
  reset() {
    this.usedQuestions.clear();
  }
}

// Exporta uma instância única para ser usada em toda a aplicação
export const questionManager = new QuestionManager();