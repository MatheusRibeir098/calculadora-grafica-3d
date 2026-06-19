import { validateExpression } from '@/lib/expression-validator';

describe('validateExpression', () => {
  it('valida expressão correta', () => {
    expect(validateExpression('sin(x)')).toEqual({ isValid: true, error: null });
  });

  it('retorna inválido para string vazia', () => {
    expect(validateExpression('')).toEqual({ isValid: false, error: null });
  });

  it('retorna inválido sem erro para expressão sendo digitada', () => {
    expect(validateExpression('2+')).toEqual({ isValid: false, error: null });
  });

  it('retorna erro para expressão inválida', () => {
    const result = validateExpression('blabla)');
    expect(result.isValid).toBe(false);
    expect(result.error).toEqual(expect.any(String));
  });
});
