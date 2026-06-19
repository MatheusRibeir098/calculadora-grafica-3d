import { Viewport } from '@/types/graph';

export function drawCrosshair(
  ctx: CanvasRenderingContext2D,
  mouseX: number,
  mouseY: number,
  width: number,
  height: number,
  viewport: Viewport
): void {
  ctx.save();
  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth = 1;

  ctx.beginPath();
  ctx.moveTo(mouseX, 0);
  ctx.lineTo(mouseX, height);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, mouseY);
  ctx.lineTo(width, mouseY);
  ctx.stroke();

  // Convert pixel to world coordinates
  const worldX = viewport.xMin + (mouseX / width) * (viewport.xMax - viewport.xMin);
  const worldY = viewport.yMax - (mouseY / height) * (viewport.yMax - viewport.yMin);

  const label = `(${worldX.toFixed(2)}, ${worldY.toFixed(2)})`;
  ctx.font = '11px monospace';
  const metrics = ctx.measureText(label);
  const padX = 4;
  const padY = 3;
  const boxW = metrics.width + padX * 2;
  const boxH = 14 + padY * 2;

  const lx = Math.min(mouseX + 10, width - boxW - 2);
  const ly = Math.max(mouseY - boxH - 4, 2);

  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.fillRect(lx, ly, boxW, boxH);

  ctx.fillStyle = '#ffffff';
  ctx.fillText(label, lx + padX, ly + padY + 12);

  ctx.restore();
}
