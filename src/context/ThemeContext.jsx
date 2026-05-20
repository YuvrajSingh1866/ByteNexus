import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isLight, setIsLight] = useState(() => {
    const saved = localStorage.getItem('byteNexus_theme');
    // Night is default.
    // "morning" is the warm mode requested by the design.
    if (saved === 'morning') return true;
    // Backward-compat: previously stored "light" as warm mode.
    if (saved === 'light') return true;
    return false;
  });


  useEffect(() => {
    // Persist the new semantic theme names.
    localStorage.setItem('byteNexus_theme', isLight ? 'morning' : 'night');

    // Smoothly apply theme classes to HTML root
    const root = document.documentElement;


    // Requested modes: Night (default) + Morning (warm)
    if (isLight) {
      root.classList.add('morning');
      root.classList.remove('night');

      // Keep legacy "light" class working with existing CSS.
      root.classList.add('light');
    } else {
      root.classList.remove('morning');
      root.classList.add('night');

      // Remove legacy class.
      root.classList.remove('light');
    }

    
    // Optional: Flash transition effect similar to legacy but optimized
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.inset = '0';
    flash.style.zIndex = '99999';
    flash.style.pointerEvents = 'none';
    flash.style.background = isLight
      ? 'radial-gradient(circle at top right, rgba(245, 158, 11, 0.35), transparent)'
      : 'radial-gradient(circle at top right, rgba(34, 211, 238, 0.35), transparent)';

    flash.style.opacity = '1';
    flash.style.transition = 'opacity 0.6s ease';
    document.body.appendChild(flash);
    
    requestAnimationFrame(() => {
      flash.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(flash)) document.body.removeChild(flash);
      }, 600);
    });

  }, [isLight]);

  const toggleTheme = () => setIsLight(!isLight);

  return (
    <ThemeContext.Provider value={{ isLight, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
