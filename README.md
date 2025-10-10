<div align="center">
  <img src="./public/assets/bloggo.webp" width="196" height="196" />

# Bloggo Frontend

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
[![License](https://img.shields.io/badge/License-GPL--3.0-blue?style=for-the-badge)](../LICENSE)
[![Builds](https://img.shields.io/badge/Download-gold?style=for-the-badge&logo=esbuild&logoColor=black)](https://github.com/Elagoht/bloggo)

The React-based frontend for Bloggo - a modern full-stack blog platform.

**⚠️ This is a submodule repository. For releases and deployment, see the [main build repository](https://github.com/Elagoht/bloggo).**

</div>

## ✨ Features

- 🎨 Beautiful, responsive UI with TailwindCSS
- 🌓 Dark mode support
- 📊 Analytics dashboard with charts
- 🖼️ Image upload and management
- 🔍 Full-text search
- 📱 Mobile-friendly design
- ⚡ Lightning-fast with Vite
- 🎭 Smooth animations and transitions

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: TailwindCSS 3 + Tailwind Typography
- **Routing**: React Router DOM 6
- **State Management**: Zustand
- **UI Components**: Custom components with Tabler Icons
- **Markdown**: Marked.js
- **Charts**: Recharts
- **Notifications**: React Hot Toast
- **HTTP Client**: Fetch API with query string support

## 📋 Prerequisites

- Node.js 20 or higher
- npm, pnpm, or yarn

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/Elagoht/bloggo-frontend.git
cd bloggo-frontend

# Install dependencies
npm install
# or
pnpm install
# or
yarn install
```

### Development

```bash
# Start development server
npm run dev
# or
npm start
```

The development server will start at [http://localhost:3000](http://localhost:3000)

The page will automatically reload when you make edits.

### Build

```bash
# Build for production
npm run build
```

Builds the app for production to the `dist` folder. The build is optimized and minified.

### Preview Production Build

```bash
# Preview the production build locally
npm run serve
```

### Linting

```bash
# Run ESLint
npm run lint

# Fix ESLint issues automatically
npm run lint:fix
```

## 📂 Project Structure

```
frontend/
├── public/              # Static assets
│   └── favicon.ico
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── store/          # Zustand state management
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript type definitions
│   ├── api/            # API client functions
│   ├── App.tsx         # Main App component
│   └── main.tsx        # Application entry point
├── index.html          # HTML template
├── vite.config.ts      # Vite configuration
├── tailwind.config.js  # Tailwind configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies and scripts
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8723/api
```

### Tailwind Configuration

TailwindCSS is configured in `tailwind.config.js`. The project uses:

- Custom color palette
- Typography plugin for markdown rendering
- Custom utility classes

## 🤝 Contributing

This repository is part of the Bloggo project. For contribution guidelines, please refer to the [main repository](https://github.com/Elagoht/bloggo).

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow the ESLint configuration
- Use TypeScript for type safety
- Follow React best practices
- Keep components small and focused
- Use functional components with hooks

## 📦 Deployment

This frontend is designed to be embedded into the backend binary. For deployment:

1. Build the frontend: `npm run build`
2. The `dist` folder is automatically copied to the backend during the build process
3. See the [main repository](https://github.com/Elagoht/bloggo) for complete deployment instructions

You can also deploy the `dist` folder to any static host (Netlify, Vercel, etc.) for standalone deployment.

## 🔗 Related Repositories

- **Main Repository**: [bloggo](https://github.com/Elagoht/bloggo) - Build orchestrator and releases
- **Backend**: [bloggo-backend](https://github.com/Elagoht/bloggo-backend) - Go backend API

## 📄 License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](../LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- Powered by [Vite](https://vitejs.dev/)
- Styled with [TailwindCSS](https://tailwindcss.com/)
- Icons from [Tabler Icons](https://tabler-icons.io/)
