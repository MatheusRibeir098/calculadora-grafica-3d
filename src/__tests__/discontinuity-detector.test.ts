import { detectDiscontinuities } from '@/lib/discontinuity-detector';

describe('detectDiscontinuities', () => {
  it('não detecta breaks em pontos suaves (sin)', () => {
    const points = Array.from({ length: 20 }, (_, i) => ({
      x: i * 0.1,
      y: Math.sin(i * 0.1),
    }));
    const result = detectDiscontinuities(points);
    expect(result.every(p => !p.break)).toBe(true);
  });

  it('detecta break em salto grande com mudança de sinal', () => {
    const points = [
      { x: 0, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: -1000 }, // salto grande + sign change
      { x: 4, y: -2 },
    ];
    const result = detectDiscontinuities(points, 10);
    expect(result.some(p => p.break === true)).toBe(true);
  });
});
