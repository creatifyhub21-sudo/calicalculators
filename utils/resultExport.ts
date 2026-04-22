export function copyTextToClipboard(text: string) {
  if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
    throw new Error('Clipboard not available');
  }
  return navigator.clipboard.writeText(text);
}

function escapePdfText(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

function chunkLine(line: string, maxLength = 88) {
  const words = line.split(/\s+/).filter(Boolean);
  const chunks: string[] = [];
  let current = '';

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxLength && current) {
      chunks.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) chunks.push(current);
  return chunks.length ? chunks : [''];
}

export function downloadSimplePdf(filename: string, title: string, lines: string[]) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const preparedLines = [title, '', ...lines].flatMap((line) => chunkLine(line)).slice(0, 120);
  const commands = ['BT', '/F1 18 Tf', '1 0 0 1 50 790 Tm', `(${escapePdfText(preparedLines[0] || title)}) Tj`, '/F1 11 Tf'];

  let currentY = 768;
  for (const line of preparedLines.slice(1)) {
    if (currentY < 60) break;
    commands.push(`1 0 0 1 50 ${currentY} Tm`);
    commands.push(`(${escapePdfText(line)}) Tj`);
    currentY -= 16;
  }
  commands.push('ET');

  const stream = commands.join('\n');
  const objects = [
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
    '2 0 obj\n<< /Type /Pages /Count 1 /Kids [3 0 R] >>\nendobj\n',
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n',
    '4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n',
    `5 0 obj\n<< /Length ${stream.length} >>\nstream\n${stream}\nendstream\nendobj\n`,
  ];

  let output = '%PDF-1.4\n';
  const offsets = [0];

  for (const obj of objects) {
    offsets.push(output.length);
    output += obj;
  }

  const startxref = output.length;
  output += `xref\n0 ${objects.length + 1}\n`;
  output += '0000000000 65535 f \n';
  for (const offset of offsets.slice(1)) {
    output += `${String(offset).padStart(10, '0')} 00000 n \n`;
  }
  output += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${startxref}\n%%EOF`;

  const blob = new Blob([output], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
