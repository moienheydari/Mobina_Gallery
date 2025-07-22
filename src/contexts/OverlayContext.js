import React, { createContext, useState } from 'react';

/**
 * OverlayContext provides a global boolean flag `inOverlay` that is true
 * whenever an image overlay is active. Components like Navbar and
 * ContactSnippet can consume this to hide themselves while the overlay is
 * displayed. The setter `setInOverlay` is exposed so that any component
 * (e.g. ImageCarousel) can toggle the state.
 */
export const OverlayContext = createContext({
  inOverlay: false,
  setInOverlay: () => {},
});

export const OverlayProvider = ({ children }) => {
  const [inOverlay, setInOverlay] = useState(false);

  return (
    <OverlayContext.Provider value={{ inOverlay, setInOverlay }}>
      {children}
    </OverlayContext.Provider>
  );
};
