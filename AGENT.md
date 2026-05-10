# Metronome Web Application

## Project Overview
A web-based metronome with responsive UI built with TypeScript, React, and matraic/m3e components.

## Technologies
- **TypeScript** - Type-safe JavaScript
- **React** - UI framework
- **matraic/m3e** - UI component library
- **Vite** - Build tool (assumed for modern React setup)

## Features
- Responsive UI for laptops, tablets, and phones
- Common metronome settings: beats per measure, tempo, etc.
- Tempo automation: ability to increase/decrease tempo over time

## Project Structure
```
metronome/
├── src/
│   ├── components/
│   │   ├── Metronome.tsx       # Main metronome component
│   │   ├── TempoControl.tsx    # Tempo slider and display
│   │   ├── BeatSettings.tsx    # Beats per measure, subdivision
│   │   ├── PlayControls.tsx    # Play/Pause/Stop buttons
│   │   └── TempoAutomation.tsx # Tempo automation controls
│   ├── hooks/
│   │   ├── useMetronome.ts     # Metronome logic hook
│   │   └── useAudioEngine.ts   # Web Audio API hook
│   ├── types/
│   │   └── metronome.ts        # TypeScript interfaces
│   ├── utils/
│   │   ├── audio.ts            # Audio utilities
│   │   └── tempo.ts            # Tempo calculations
│   ├── App.tsx
│   └── main.tsx
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
└── index.html
```

## Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run linter
- `npm run typecheck` - Run TypeScript type checking