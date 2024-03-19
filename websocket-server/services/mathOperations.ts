export function calculate(mathOperation: string): number | string {
  try {
    const result = eval(mathOperation);
    return result;
  } catch (error) {
    return "erro: operação inválida.";
  }
}
