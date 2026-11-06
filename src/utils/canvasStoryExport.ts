/**
 * Generates and downloads a 1080 x 1920 Instagram Story card image.
 */
export interface StoryCardData {
  title: string;
  characterName: string;
  personalExperience: string;
  lesson: string;
  reflection: string;
  authorName?: string;
}

export const generateStoryImage = async (data: StoryCardData): Promise<string> => {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context not available');

  // Background: Warm Cream Minimalist Studio Look
  const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1920);
  bgGrad.addColorStop(0, '#FAF7F2');
  bgGrad.addColorStop(0.5, '#F5EFE8');
  bgGrad.addColorStop(1, '#EFEAE2');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1080, 1920);

  // Subtle border frame
  ctx.strokeStyle = '#DDD5CD';
  ctx.lineWidth = 2;
  ctx.strokeRect(64, 64, 952, 1792);

  // Load and render official brand emblem
  try {
    const emblemImg = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Emblem load error'));
      img.src = '/herquran-emblem.png';
    });
    // Draw emblem centered at x=540
    ctx.drawImage(emblemImg, 540 - 55, 80, 110, 98);
  } catch (err) {
    console.warn('Could not render emblem image on canvas', err);
  }

  // Top Wordmark
  ctx.textAlign = 'center';
  ctx.fillStyle = '#46634D'; // Sage
  ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '6px';
  ctx.fillText('HERQURAN', 540, 215);

  ctx.fillStyle = '#7A6555';
  ctx.font = 'italic 20px "Playfair Display", Georgia, serif';
  ctx.letterSpacing = '1px';
  ctx.fillText('Discover Her Story. Reflect on Your Story.', 540, 250);

  // Inner Story Card Container
  ctx.fillStyle = '#FFFFFF';
  ctx.shadowColor = 'rgba(70, 99, 77, 0.06)';
  ctx.shadowBlur = 32;
  ctx.shadowOffsetY = 16;
  roundRect(ctx, 120, 290, 840, 1430, 36);
  ctx.fill();
  ctx.shadowColor = 'transparent';

  // Inner card hairline
  ctx.strokeStyle = '#EDE7E1';
  ctx.lineWidth = 1.5;
  roundRect(ctx, 120, 280, 840, 1440, 36);
  ctx.stroke();

  // Character Label & Name
  ctx.textAlign = 'center';
  ctx.fillStyle = '#46634D';
  ctx.font = '600 22px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '3px';
  ctx.fillText('TERINSPIRASI DARI KISAH', 540, 365);

  ctx.fillStyle = '#223026';
  ctx.font = 'bold 44px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '0px';
  ctx.fillText(data.characterName, 540, 425);

  // Title
  ctx.fillStyle = '#57785F';
  ctx.font = 'italic 32px "Playfair Display", Georgia, serif';
  wrapText(ctx, `"${data.title}"`, 540, 505, 720, 46, true);

  // Divider
  ctx.strokeStyle = '#F3ECE2';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(220, 595);
  ctx.lineTo(860, 595);
  ctx.stroke();

  // Section 1: Catatan Hati
  let currentY = 660;
  ctx.textAlign = 'left';
  ctx.fillStyle = '#46634D';
  ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('CATATAN HATI & PENGALAMAN', 180, currentY);

  currentY += 40;
  ctx.fillStyle = '#3A2E25';
  ctx.font = '28px "Inter", sans-serif';
  currentY = wrapText(ctx, data.personalExperience, 180, currentY, 720, 42);

  // Section 2: Hikmah
  currentY += 40;
  ctx.fillStyle = '#C26C80'; // Soft Blush
  ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('HIKMAH YANG DIPETIK', 180, currentY);

  currentY += 40;
  ctx.fillStyle = '#3A2E25';
  ctx.font = '28px "Inter", sans-serif';
  currentY = wrapText(ctx, data.lesson, 180, currentY, 720, 42);

  // Section 3: Refleksi Diri
  currentY += 40;
  ctx.fillStyle = '#7A6555';
  ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('REFLEKSI UNTUK DIRI SENDIRI', 180, currentY);

  currentY += 40;
  ctx.fillStyle = '#223026';
  ctx.font = 'italic 28px "Playfair Display", Georgia, serif';
  currentY = wrapText(ctx, `“${data.reflection}”`, 180, currentY, 720, 44);

  // Author footnote inside card
  ctx.textAlign = 'center';
  ctx.fillStyle = '#9E8A79';
  ctx.font = '500 24px "Plus Jakarta Sans", sans-serif';
  const author = data.authorName?.trim() ? `Oleh: ${data.authorName}` : 'Oleh: Muslimah Berdaya';
  ctx.fillText(author, 540, 1640);

  // Bottom Footer
  ctx.fillStyle = '#46634D';
  ctx.font = '500 22px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('herquran.app · Kisah Perempuan dalam Al-Qur\'an', 540, 1800);

  return canvas.toDataURL('image/png');
};

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  isCenter: boolean = false
): number {
  const words = text.split(' ');
  let line = '';
  let curY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line.trim(), isCenter ? x : x, curY);
      line = words[n] + ' ';
      curY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), isCenter ? x : x, curY);
  return curY + lineHeight;
}
