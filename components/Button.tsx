import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  scrollTargetId?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = '',
  disabled = false,
  scrollTargetId = 'calculator-result-content',
}) => {
  const triggerAutoScroll = () => {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(new CustomEvent('calculator:scrollToResult', { detail: { targetId: scrollTargetId } }));
  };

  return (
    <button
      type="button"
      onClick={() => {
        onClick();
        window.setTimeout(triggerAutoScroll, 120);
        window.setTimeout(triggerAutoScroll, 320);
      }}
      disabled={disabled}
      className={`inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#062B52] px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-[#041f3b] focus:outline-none focus:ring-4 focus:ring-[#9ACD32]/25 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
