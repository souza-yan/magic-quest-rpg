export function validateAnswer(user: string, correct: number | string) {
  if (!user) return false;

  user = user.trim().replace(",", ".").toLowerCase();

  // Caso a resposta correta seja texto
  if (typeof correct === "string") {
    return user === correct.trim().toLowerCase();
  }

  // Caso seja número
  const n = parseFloat(user);
  if (isNaN(n)) return false;

  return Math.abs(n - correct) < 0.01;
}
