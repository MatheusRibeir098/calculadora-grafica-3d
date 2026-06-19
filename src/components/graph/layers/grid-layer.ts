import { Viewport } from '@/types/graph';

export function niceStep(range: number, targetSteps: number): number {
  const rough = range / targetSteps;
  const pow = Math.pow(10, Math.floor(Math.log10(rough)));
  const normalized = rough / pow;
  const nice = normalized < 1.5 ? 1 : normalized < 3.5 ? 2 : normalized < 7.5 ? 5 : 10;
  return nice * pow;
}

function worldToScreenX(x: number, width: number, viewport: Viewport): number {
  return ((x - viewport.xMin) / (viewport.xMax - viewport.xMin)) * width;
}

function worldToScreenY(y: number, height: number, viewport: Viewport): number {
  return ((viewport.yMax - y) / (viewport.yMax - viewport.yMin)) * height;
}

export function drawGrid(ctx: CanvasRenderingContext2D, width: number, height: number, viewport: Viewport): void {
  const xRange = viewport.xMax - viewport.xMin;
  const yRange = viewport.yMax - viewport.yMin;
  const stepX = niceStep(xRange, 10);
  const stepY = niceStep(yRange, 10);

  // Grid lines
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 1;
  ctx.beginPath();

  const xStart = Math.ceil(viewport.xMin / stepX) * stepX;
  for (let x = xStart; x <= viewport.xMax; x += stepX) {
    const sx = worldToScreenX(x, width, viewport);
    ctx.moveTo(sx, 0);
    ctx.lineTo(sx, height);
  }

  const yStart = Math.ceil(viewport.yMin / stepY) * stepY;
  for (let y = yStart; y <= viewport.yMax; y += stepY) {
    const sy = worldToScreenY(y, height, viewport);
    ctx.moveTo(0, sy);
    ctx.lineTo(width, sy);
  }
  ctx.stroke();

  // Axis X (y=0)
  if (viewport.yMin <= 0 && viewport.yMax >= 0) {
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    const sy = worldToScreenY(0, height, viewport);
    ctx.moveTo(0, sy);
    ctx.lineTo(width, sy);
    ctx.stroke();
  }

  // Axis Y (x=0)
  if (viewport.xMin <= 0 && viewport.xMax >= 0) {
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    const sx = worldToScreenX(0, width, viewport);
    ctx.moveTo(sx, 0);
    ctx.lineTo(sx, height);
    ctx.stroke();
  }
}

function formatLabel(n: number): string {
  return Number.isInteger(n) ? n.toString() : parseFloat(n.toPrecision(10)).toString();
}

export function drawLabels(ctx: CanvasRenderingContext2D, width: number, height: number, viewport: Viewport): void {
  const xRange = viewport.xMax - viewport.xMin;
  const yRange = viewport.yMax - viewport.yMin;
  const stepX = niceStep(xRange, 10);
  const stepY = niceStep(yRange, 10);

  ctx.font = '10px monospace';
  ctx.fillStyle = 'rgba(255,255,255,0.5)';

  const axisY = Math.max(0, Math.min(height - 12, worldToScreenY(0, height, viewport)));
  const axisX = Math.max(12, Math.min(width - 4, worldToScreenX(0, width, viewport)));

  // X-axis labels
  const xStart = Math.ceil(viewport.xMin / stepX) * stepX;
  for (let x = xStart; x <= viewport.xMax; x += stepX) {
    const sx = worldToScreenX(x, width, viewport);
    if (sx < 0 || sx > width) continue;
    const label = x === 0 ? '0' : formatLabel(x);
    ctx.fillText(label, sx + 2, axisY + 12);
  }

  // Y-axis labels
  const yStart = Math.ceil(viewport.yMin / stepY) * stepY;
  for (let y = yStart; y <= viewport.yMax; y += stepY) {
    if (y === 0) continue; // already drawn with x-axis
    const sy = worldToScreenY(y, height, viewport);
    if (sy < 0 || sy > height) continue;
    ctx.fillText(formatLabel(y), axisX + 4, sy - 2);
  }
}
