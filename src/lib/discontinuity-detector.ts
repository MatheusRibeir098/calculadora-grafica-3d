interface Point { x: number; y: number; }

export function detectDiscontinuities(
  points: Point[],
  threshold?: number
): Array<Point & { break?: boolean }> {
  if (points.length === 0) return [];

  const yValues = points.filter(p => isFinite(p.y)).map(p => p.y);
  if (yValues.length < 2) return points.map(p => ({ ...p }));

  const deltas: number[] = [];
  for (let i = 1; i < yValues.length; i++) {
    deltas.push(Math.abs(yValues[i] - yValues[i - 1]));
  }

  const adaptiveThreshold = threshold ?? (deltas.reduce((a, b) => a + b, 0) / deltas.length) * 10;

  const result: Array<Point & { break?: boolean }> = [{ ...points[0] }];

  for (let i = 1; i < points.length; i++) {
    const dy = Math.abs(points[i].y - points[i - 1].y);
    const signChange = Math.sign(points[i].y) !== Math.sign(points[i - 1].y);

    if (dy > adaptiveThreshold && signChange) {
      result.push({ ...points[i], break: true });
    } else {
      result.push({ ...points[i] });
    }
  }

  return result;
}
