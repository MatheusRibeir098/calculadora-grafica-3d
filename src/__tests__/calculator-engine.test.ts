import { evaluateExpression } from '@/lib/calculator-engine';

describe('evaluateExpression', () => {
  it('avalia expressões básicas', () => {
    expect(evaluateExpression('2+2')).toEqual({ result: '4', error: null });
    expect(evaluateExpression('10/2')).toEqual({ result: '5', error: null });
  });

  it('avalia funções matemáticas', () => {
    expect(evaluateExpression('sin(0)')).toEqual({ result: '0', error: null });
    expect(evaluateExpression('sqrt(4)')).toEqual({ result: '2', error: null });
  });

  it('retorna erro para expressões inválidas', () => {
    expect(evaluateExpression('abc')).toEqual({ result: null, error: expect.any(String) });
    expect(evaluateExpression('')).toEqual({ result: null, error: 'Expressão vazia' });
  });

  it('retorna resultado para 1/0 (Infinity)', () => {
    expect(evaluateExpression('1/0')).toEqual({ result: '∞', error: null });
  });

  it('auto-fecha parênteses desbalanceados', () => {
    expect(evaluateExpression('(2+3')).toEqual({ result: '5', error: null });
  });
});
