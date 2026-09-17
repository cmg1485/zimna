
import React, { useState, useEffect, useMemo } from 'react';
import { XIcon } from './icons/XIcon';

interface WalkthroughProps {
  step: number;
  onNext: () => void;
  onPrev: () => void;
  onFinish: () => void;
  firstEventName?: string;
}

interface Step {
  target: string;
  title: string;
  content: string;
  position: 'top' | 'bottom' | 'right' | 'left' | 'center';
}

const Walkthrough: React.FC<WalkthroughProps> = ({ step, onNext, onPrev, onFinish, firstEventName }) => {
  const steps: Step[] = useMemo(() => [
    {
      target: '[data-walkthrough="header"]',
      title: 'Welcome to Zimna!',
      content: "Let's take a quick tour of how to set alarms for your daily Jewish Halachic times (Zmanim).",
      position: 'bottom',
    },
    {
      target: `[data-walkthrough="time-card-${firstEventName}"]`,
      title: 'Halachic Zmanim Cards',
      content: 'Each card displays a specific Zman, its Hebrew name, and a detailed description of the daily obligations and mitzvos due at that time.',
      position: 'bottom',
    },
    {
      target: `[data-walkthrough="toggle-${firstEventName}"]`,
      title: 'Enable an Alarm',
      content: 'Click this toggle switch to activate a sound alarm for that Zman. The bell icon on the card will light up!',
      position: 'left',
    },
    {
      target: `[data-walkthrough="select-${firstEventName}"]`,
      title: 'Set Advance Notice',
      content: 'Once an alarm is enabled, you can choose to be notified minutes before the Zman occurs (e.g. 15 minutes before Shema).',
      position: 'left',
    },
    {
      target: 'body',
      title: "You're all set!",
      content: "That's it! Now you can configure your daily Zmanim alarms. Never miss a halachic deadline!",
      position: 'center',
    },
  ], [firstEventName]);

  const [highlightStyle, setHighlightStyle] = useState<React.CSSProperties>({});
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
  const [currentStep, setCurrentStep] = useState<Step | null>(null);

  useEffect(() => {
    if (step >= steps.length) {
      onFinish();
      return;
    }

    const current = steps[step];
    if (!current || (current.target.includes('undefined') && current.position !== 'center')) {
        return; // Don't proceed if the target is not ready
    }

    setCurrentStep(current);

    const targetElement = document.querySelector<HTMLElement>(current.target);

    if (!targetElement || current.position === 'center') {
      setHighlightStyle({ display: 'none' });
      setTooltipStyle({
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'fixed',
        transition: 'all 0.3s ease-in-out',
      });
      return;
    }

    targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    const targetRect = targetElement.getBoundingClientRect();
    const padding = 10;

    // A brief timeout to allow the scroll to finish before positioning
    setTimeout(() => {
        const freshTargetRect = targetElement.getBoundingClientRect();
        setHighlightStyle({
          width: `${freshTargetRect.width + padding}px`,
          height: `${freshTargetRect.height + padding}px`,
          top: `${freshTargetRect.top - padding / 2}px`,
          left: `${freshTargetRect.left - padding / 2}px`,
          boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.75)',
          borderRadius: '8px',
          position: 'fixed',
          transition: 'all 0.3s ease-in-out',
          pointerEvents: 'none',
          zIndex: 100
        });

        const tooltipPos: React.CSSProperties = { top: 0, left: 0, transform: 'translate(0, 0)' };
        
        switch (current.position) {
            case 'bottom':
                tooltipPos.top = freshTargetRect.bottom + padding;
                tooltipPos.left = freshTargetRect.left + freshTargetRect.width / 2;
                tooltipPos.transform = 'translateX(-50%)';
                break;
            case 'top':
                tooltipPos.top = freshTargetRect.top - padding;
                tooltipPos.left = freshTargetRect.left + freshTargetRect.width / 2;
                tooltipPos.transform = 'translate(-50%, -100%)';
                break;
            case 'left':
                tooltipPos.top = freshTargetRect.top + freshTargetRect.height / 2;
                tooltipPos.left = freshTargetRect.left - padding;
                tooltipPos.transform = 'translate(-100%, -50%)';
                break;
            case 'right':
                tooltipPos.top = freshTargetRect.top + freshTargetRect.height / 2;
                tooltipPos.left = freshTargetRect.right + padding;
                tooltipPos.transform = 'translateY(-50%)';
                break;
        }
        
        setTooltipStyle({
            position: 'fixed',
            ...tooltipPos,
            transition: 'all 0.3s ease-in-out',
            zIndex: 101
        });
    }, 300); // sync with scroll behavior

  }, [step, steps, onFinish]);

  if (!currentStep) return null;

  const isFirstStep = step === 0;
  const isLastStep = step === steps.length - 1;

  return (
    <div className="fixed inset-0 z-50">
      <div style={highlightStyle} />
      <div style={tooltipStyle} className="bg-slate-900 border border-brand-500 rounded-2xl shadow-2xl p-5 w-80 max-w-[90vw]">
        <button
            onClick={onFinish}
            className="absolute top-2 right-2 text-slate-400 hover:text-white transition-colors"
            aria-label="Skip walkthrough"
        >
            <XIcon className="h-6 w-6" />
        </button>
        <h3 className="text-xl font-extrabold text-brand-400 mb-2">{currentStep.title}</h3>
        <p className="text-slate-300 mb-4 font-medium text-sm leading-relaxed">{currentStep.content}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xs text-slate-500 font-bold">{step + 1} / {steps.length}</span>
          <div className="flex gap-2">
            {!isFirstStep && (
              <button
                onClick={onPrev}
                className="bg-slate-800 text-white font-semibold py-2 px-4 rounded-xl hover:bg-slate-700 transition-colors text-xs"
              >
                Prev
              </button>
            )}
            <button
              onClick={isLastStep ? onFinish : onNext}
              className="bg-brand-600 text-white font-extrabold py-2 px-4 rounded-xl hover:bg-brand-500 transition-all text-xs"
            >
              {isLastStep ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Walkthrough;
