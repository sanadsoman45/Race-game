# 🏎️ Grand Prix

**A 3D Formula-style racing game built with Angular and Three.js.**

Grand Prix is a browser-based racing game project inspired by the world of Formula racing. The project aims to combine an immersive 3D experience, iconic racing cars, and competitive AI-driven opponents.

The current development focuses on building the foundation of the game, including an interactive landing page, driver registration, and a 3D car showcase.

---

## ✨ Features

### Implemented

- **Interactive landing page** – A racing-inspired interface with responsive layouts and a dedicated car showcase.
- **Driver registration** – Players can register their driver name before entering the game.
- **Form validation** – Driver names are validated for required fields, minimum and maximum length, and supported characters using Angular Signal Forms.
- **3D car showcase** – Interactive 3D vehicle models rendered using Three.js.
- **Car selection** – Browse available racing cars using previous/next controls and selection indicators.
- **3D model loading** – GLTF/GLB models loaded using `GLTFLoader` and `MeshoptDecoder`.
- **Camera controls** – Multiple camera views for inspecting the selected vehicle.
- **Model orientation and scaling** – Per-vehicle orientation configuration, automatic centering and scaling.
- **Model caching** – Reuse loaded models to improve the car selection experience.
- **Credits** – A dedicated entry point for acknowledging asset creators.

### Planned

- Playable racing environment and circuit generation.
- Vehicle movement and arcade-style physics.
- Third-person racing camera.
- Race HUD, lap tracking and timing.
- AI-controlled racing opponents.
- Distinct AI driving personalities and adaptive difficulty.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Angular | Application framework |
| TypeScript | Application logic |
| Three.js | 3D rendering |
| GLTF / GLB | 3D vehicle assets |
| GLTFLoader | Loading 3D models |
| MeshoptDecoder | Compressed model decoding |
| OrbitControls | Interactive camera controls |
| Angular Signals | Reactive application state |
| Angular Signal Forms | Driver registration and validation |
| SCSS | Styling and responsive layouts |

---

## 🚗 3D Vehicle Showcase

The landing page features a Three.js-powered vehicle viewer.

Key implementation details:

- Dynamically loads GLTF/GLB vehicle models.
- Supports individual model orientation configurations.
- Automatically calculates model bounds for centering and scaling.
- Provides multiple camera presets.
- Caches loaded models to avoid unnecessary reloads.
- Updates the displayed vehicle when the player changes their selection.

---

## 👤 Driver Registration

Before entering the game, players can register a driver name.

Validation rules:

- Required field.
- Minimum 3 characters.
- Maximum 16 characters.
- Supports letters, numbers, spaces, hyphens and underscores.

The registration flow uses Angular Signal Forms.

---

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- Angular CLI

### Installation

Clone the repository:

```bash
git clone <YOUR_REPOSITORY_URL>
```

Navigate to the project directory:

```bash
cd grand-prix
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
ng serve
```

Open the application at:

```text
http://localhost:4200
```

---

## 📁 Project Structure

The application is organised around Angular components and services, with Three.js responsible for the 3D experience.

A simplified conceptual overview:

```text
src/
└── app/
    ├── core/
    │   └── services/
    │       └── player/
    │
    ├── components/
    │   ├── credits/
    │   └── hero-scene/
    │
    ├── features/
    │   ├── landing/
    │   └── player-registration/
    │
    └── models/
        └── car-option.model.ts
```

*Note: Adjust this overview to match the actual repository structure.*

---

## 🗺️ Development Roadmap

| Phase | Description | Status |
|---|---|---|
| 01 | Landing page and UI foundation | Completed |
| 02 | Driver registration and validation | Completed |
| 03 | Interactive 3D car showcase | Completed |
| 04 | Race environment and circuit | Upcoming |
| 05 | Vehicle movement and physics | Upcoming |
| 06 | Race management and HUD | Upcoming |
| 07 | AI opponents and racing tactics | Upcoming |
| 08 | Adaptive AI difficulty | Upcoming |

---

## 🎯 Vision

The long-term goal is to create an engaging single-player racing experience featuring multiple AI opponents with distinct driving personalities.

Rather than relying on identical racing bots, the game aims to introduce opponents that can race competitively, overtake, defend positions and adapt to the player's driving style.

---

## 📜 Credits

Credits and acknowledgements for 3D models and other third-party assets will be maintained within the project.

Please refer to the in-game Credits section and individual asset licences for attribution details.


Grand Prix — Every race tells a story. 🏁



https://github.com/user-attachments/assets/82807888-b8d2-4994-adea-8a537c0b4598


---

**Grand Prix** — Every race tells a story. 🏁
