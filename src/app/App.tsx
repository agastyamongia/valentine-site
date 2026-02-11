import { useState } from 'react';
// import { useTheme } from './theme'; // Hidden for now
import { RainOverlay } from '../components/RainOverlay';
// import { StyleToggle } from '../components/StyleToggle'; // Hidden for now
import { LockedScreen } from '../screens/LockedScreen';
import { ValentineScreen } from '../screens/ValentineScreen';
import { GalleryScreen } from '../screens/GalleryScreen';
import { VideoScreen } from '../screens/VideoScreen';

function App() {
  // Theme toggle hidden for now - uncomment to re-enable:
  // import { StyleToggle } from '../components/StyleToggle';
  // const { theme, toggleTheme } = useTheme();

  // Rain state (reset on refresh)
  const [hasRained, setHasRained] = useState(false);

  // Unlock state (reset on refresh)
  const [unlocked, setUnlocked] = useState(false);

  // Gallery state
  const [showGallery, setShowGallery] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  // Transition logic
  const [opacity, setOpacity] = useState(1);
  const [blur, setBlur] = useState(0);

  const handleUnlock = () => {
    // Fade out
    setOpacity(0);
    setBlur(10);

    setTimeout(() => {
      setUnlocked(true);
      // Fade in
      setOpacity(1);
      setBlur(0);
    }, 600); // Wait for fade out
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col transition-colors duration-500 bg-bg text-text">
      {/* Background Rain (only when locked and triggered) */}
      <RainOverlay active={!unlocked && hasRained} />

      {/* Top Right Controls (hidden for now)
      <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
        <StyleToggle theme={theme} onToggle={toggleTheme} />
      </div>
      */}

      {/* Main Content Area */}
      <main
        className="flex-grow relative w-full h-full transition-all duration-700 ease-in-out"
        style={{ opacity, filter: `blur(${blur}px)` }}
      >
        {!unlocked ? (
          <LockedScreen
            visible={!unlocked}
            onUnlock={handleUnlock}
            onHint={() => setHasRained(true)}
          />
        ) : (
          <ValentineScreen
            visible={unlocked}
            onViewGallery={() => setShowGallery(true)}
            onViewVideo={() => setShowVideo(true)}
          />
        )}
      </main>

      {/* Gallery Screen (overlay) */}
      <GalleryScreen
        visible={showGallery}
        onBack={() => setShowGallery(false)}
      />

      {/* Video Screen (overlay) */}
      <VideoScreen
        visible={showVideo}
        onBack={() => setShowVideo(false)}
      />

      {/* Footer / Copyright (Optional) */}
      <div className="absolute bottom-4 w-full text-center text-xs text-accent/30 pointer-events-none">

      </div>
    </div>
  );
}

export default App;
