import { useState } from 'react';
import { copyTextToClipboard, downloadSimplePdf } from '../utils/resultExport';

interface ResultActionsProps {
  title: string;
  targetId: string;
  inputTargetId?: string;
}

function getLinesFromTarget(targetId: string) {
  if (typeof document === 'undefined') return [] as string[];
  const target = document.getElementById(targetId);
  if (!target) return [] as string[];
  return (target.textContent || '')
    .split('\n')
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .slice(0, 80);
}

export default function ResultActions({ title, targetId, inputTargetId = 'calculator-input-panel' }: ResultActionsProps) {
  const [status, setStatus] = useState('');

  const handleCopy = async () => {
    const lines = getLinesFromTarget(targetId);
    if (!lines.length) {
      setStatus('No result available yet.');
      return;
    }
    try {
      await copyTextToClipboard(`${title}\n\n${lines.join('\n')}`);
      setStatus('Result copied.');
    } catch {
      setStatus('Clipboard not available in this browser.');
    }
  };



  const handleBackToInputs = () => {
    if (typeof document === 'undefined') return;
    const target = document.getElementById(inputTargetId);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const handleDownload = () => {
    const lines = getLinesFromTarget(targetId);
    if (!lines.length) {
      setStatus('No result available yet.');
      return;
    }
    downloadSimplePdf(
      `${title.toLowerCase().replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '')}-result`,
      `${title} Result Summary`,
      lines
    );
    setStatus('PDF downloaded.');
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-sm font-semibold uppercase tracking-wide text-[#062B52]">Result tools</div>
          <p className="mt-1 text-sm text-slate-600">Copy the visible result or download a quick PDF summary.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleBackToInputs}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#062B52] hover:text-[#062B52]"
          >
            Back to inputs
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#062B52] hover:text-[#062B52]"
          >
            Copy result
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="rounded-2xl bg-[#062B52] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#041f3b]"
          >
            Download PDF
          </button>
        </div>
      </div>
      {status ? <p className="mt-3 text-sm font-medium text-[#577c12]">{status}</p> : null}
    </div>
  );
}
