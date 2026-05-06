# Aayush JP - Portfolio

A terminal-inspired portfolio website showcasing Cloud, DevOps, and Backend development expertise.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Features

- 🖥️ **Terminal Aesthetic:** Command-line inspired design with typing effects
- 🎨 **Dark Mode First:** Industrial, technical, and minimalist design
- ⚡ **High Performance:** Optimized for speed and responsiveness
- 📱 **Fully Responsive:** Mobile-first design approach
- 🎬 **Smooth Animations:** Powered by Framer Motion

## Project Structure

```
devops/
├── app/
│   ├── globals.css          # Global styles and terminal theme
│   ├── layout.tsx            # Root layout with metadata
│   └── page.tsx              # Main landing page
├── components/
│   ├── Hero.tsx              # Hero section with terminal typing effect
│   ├── TechStack.tsx         # Tech stack grid display
│   ├── Projects.tsx          # Featured projects cards
│   ├── Experience.tsx        # Open source contributions
│   └── Contact.tsx           # Contact links and footer
├── lib/
│   └── utils.ts              # Utility functions
└── public/                   # Static assets
```

## Getting Started

### Development Mode

1. **Install dependencies:**

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. **Run the development server:**

```bash
npm run dev
```

3. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000)

### 🐋 Docker (Local)

```bash
# Build and run locally
docker build -t aayush-portfolio:latest .
docker run -p 3000:3000 aayush-portfolio:latest
```

Access the application at [http://localhost:3000](http://localhost:3000)

📖 See [DOCKER.md](./DOCKER.md) for a full Docker reference.

## Customization

### Update Personal Information

1. **Hero Section** (`components/Hero.tsx`):
   - Modify the `fullText` variable to change the typing animation text

2. **Projects** (`components/Projects.tsx`):
   - Update the `projects` array with your actual projects
   - Add GitHub and demo links

3. **Experience** (`components/Experience.tsx`):
   - Modify the `experiences` array with your contributions

4. **Contact** (`components/Contact.tsx`):
   - Update `contactLinks` with your actual social media and email

### Styling

The color scheme is defined in `tailwind.config.ts`:

```typescript
colors: {
  terminal: {
    bg: "#0a0e14",       // Background
    text: "#b3b1ad",     // Primary text
    green: "#7fd962",    // Success/highlights
    cyan: "#59c2ff",     // Links/interactive
    yellow: "#f29668",   // Warnings/accents
    border: "#1f2937",   // Borders
  },
}
```

## Deployment

Production deployment is fully automated via the CI/CD pipeline. Every push to `main` builds a Docker image on GitHub Actions, pushes it to GitHub Container Registry (GHCR), and deploys it to AWS EC2.

The Dockerfile is a 3-stage build (deps → builder → runner):
- ✅ Multi-stage build for minimal image size
- ✅ Node.js 20 Alpine base
- ✅ Next.js standalone output
- ✅ Non-root user for security
- ✅ Health checks included

See [DOCKER.md](./DOCKER.md) and [AWS_EC2_DEPLOYMENT.md](./AWS_EC2_DEPLOYMENT.md) for manual deployment steps.

## CI/CD Pipeline

This project uses **GitHub Actions** for continuous integration.

### Workflow

The pipeline triggers automatically on every push to `main` or `dev`, and on pull requests to `main`.

```
push to main / dev
        │
        ▼
┌─────────────────────┐
│  Lint & Type Check  │  npm run lint + tsc --noEmit
└─────────┬───────────┘
          │ pass
          ▼
┌─────────────────────┐
│       Build         │  npm run build (Next.js production build)
└─────────┬───────────┘
          │ pass
          ▼
┌─────────────────────┐
│  Docker Build &     │  Build image + push to GHCR
│  Push to GHCR       │  (ghcr.io/aayush-jp/devops-website:latest)
└─────────┬───────────┘
          │ pass (main branch only)
          ▼
┌─────────────────────┐
│   Deploy to EC2     │  SSH → docker pull → docker run
└─────────────────────┘
```

### Jobs

| Job | Trigger | What it does |
|---|---|---|
| `lint-and-typecheck` | push to `main` / `dev`, PR to `main` | ESLint + TypeScript compiler checks |
| `build` | same | Next.js production build |
| `docker` | same | Builds image on GitHub runners and pushes to GHCR |
| `deploy` | push to `main` only | SSH into EC2, pulls pre-built image from GHCR, restarts container |

Jobs run sequentially — a failure in an earlier job stops the pipeline. The `deploy` job is skipped on `dev` pushes and PRs. Workflow file: `.github/workflows/ci.yml`

### Branching Strategy

| Branch | Purpose |
|---|---|
| `main` | Production-ready code |
| `dev` | Active development, merged into main via PR |

## License

MIT License - feel free to use this template for your own portfolio!

---

Built with ❤️ by Aayush JP
