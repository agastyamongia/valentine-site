# Valentine Site

A minimal, luxury Valentine's Day proposal site built with React, Vite, TypeScript, and Tailwind CSS.
Features a password-protected entry, ambient rain effects, toggleable themes (Luxe/Cute), and a playful main interaction.

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open http://localhost:5173 to view.

3. **Build for Production**
   ```bash
   npm run build
   # Preview the build
   npm run preview
   ```

## Configuration

- **Password**: The default password is `rainy` (case-insensitive).
- **Audio**: By default, it uses a placeholder remote URL for rain sounds. To use a local file:
  - Place your audio file (e.g., `rain.mp3`) in the `public/` folder.
  - Update `src/components/SoundToggle.tsx`:
    ```typescript
    const RAIN_AUDIO_URL = '/rain.mp3';
    ```

## Features

- **Locked Screen**: Password protection with hint system.
- **Rain Overlay**: Canvas-based particle system.
- **Themes**: "Luxe" (Clean, Ivory/Blue-Gray) and "Cute" (Warm, Pink/Rose). Persisted via LocalStorage.
- **Dodge Button**: The "No" button evades the cursor on desktop.
- **Sound**: Optional ambient rain sound (user-initiated).

## Technologies

- Vite + React + TypeScript
- Tailwind CSS
- Canvas API (for rain)
- LocalStorage (for state persistence)
