import { Viewport } from '@/types/graph';

interface Point { x: number; y: number; }

interface CurveOptions {
  color: string;
  lineWidth?: number;
  glowSize?: number;
}

export function drawCurve(
  ctx: CanvasRenderingContext2D,
  points: Point[],
  width: number,
  height: number,
  viewport: Viewport,
  options: CurveOptions
): void {
  const lineWidth = options.lineWidth ?? 2;
  const glowSize = options.glowSize ?? 10;

  const toPixelX = (x: number) => (x - viewport.xMin) / (viewport.xMax - viewport.xMin) * width;
  const toPixelY = (y: number) => height - (y - viewport.yMin) / (viewport.yMax - viewport.yMin) * height;

  const drawPass = (lw: number, glow: boolean) => {
    ctx.save();
    ctx.strokeStyle = options.color;
    ctx.lineWidth = lw;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    if (glow) {
      ctx.shadowBlur = glowSize;
      ctx.shadowColor = options.color;
    }

    ctx.beginPath();
    let prevPy: number | null = null;
    let drawing = false;

    for (const pt of points) {
      if (!isFinite(pt.x) || !isFinite(pt.y)) {
        drawing = false;
        continue;
      }

      const px = toPixelX(pt.x);
      const py = toPixelY(pt.y);

      if (!isFinite(px) || !isFinite(py)) {
        drawing = false;
        continue;
      }

      const discontinuity = prevPy !== null && Math.abs(py - prevPy) > height / 2;

      if (!drawing || discontinuity) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }

      prevPy = py;
      drawing = true;
    }

    ctx.stroke();
    ctx.restore();
  };

  // Glow pass
  drawPass(lineWidth + 2, true);
  // Crisp pass
  drawPass(lineWidth, false);
}
