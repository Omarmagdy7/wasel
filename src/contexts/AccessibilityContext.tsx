import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilityContextType {
  isVisuallyImpaired: boolean | null;
  setIsVisuallyImpaired: (value: boolean) => void;
  largeFontSize: boolean;
  setLargeFontSize: (value: boolean) => void;
  highContrast: boolean;
  setHighContrast: (value: boolean) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [isVisuallyImpaired, setIsVisuallyImpaired] = useState<boolean | null>(null);
  const [largeFontSize, setLargeFontSize] = useState(() => {
    const saved = localStorage.getItem('largeFontSize');
    return saved ? JSON.parse(saved) : false;
  });
  const [highContrast, setHighContrast] = useState(() => {
    const saved = localStorage.getItem('highContrast');
    return saved ? JSON.parse(saved) : false;
  });

  // Apply font size changes
  useEffect(() => {
    document.documentElement.classList.toggle('text-large', largeFontSize);
    localStorage.setItem('largeFontSize', JSON.stringify(largeFontSize));
  }, [largeFontSize]);

  // Apply high contrast changes
  useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', highContrast);
    localStorage.setItem('highContrast', JSON.stringify(highContrast));
  }, [highContrast]);

  return (
    <AccessibilityContext.Provider 
      value={{ 
        isVisuallyImpaired, 
        setIsVisuallyImpaired,
        largeFontSize,
        setLargeFontSize,
        highContrast,
        setHighContrast
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}