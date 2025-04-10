/* eslint-disable no-console */
import React, {useState, useEffect} from 'react';

export const logEvent = (name: string) => (event: unknown) => {
  console.log(`[${name}]`, event);
};

export const Result = ({children}: {children: React.ReactNode}) => <div className="result">{children}</div>;

export const ErrorResult = ({children}: {children: React.ReactNode}) => (
  <div className="error">{children}</div>
);

// Demo hook to dynamically change font size based on window size.
export const useDynamicFontSize = () => {
  const [fontSize, setFontSize] = useState(
    window.innerWidth < 450 ? '14px' : '18px'
  );

  useEffect(() => {
    const onResize = () => {
      setFontSize(window.innerWidth < 450 ? '14px' : '18px');
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return fontSize;
};
