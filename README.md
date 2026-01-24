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

### 🐋 Docker (Production)

**Quick Start with Docker Compose:**

```bash
docker-compose up
```

**Or build and run manually:**

```bash
# Build the image
docker build -t aayush-portfolio:latest .

# Run the container
docker run -p 3000:3000 aayush-portfolio:latest
```

Access the application at [http://localhost:3000](http://localhost:3000)

📖 See [DOCKER.md](./DOCKER.md) for comprehensive Docker deployment guide.

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

### Docker (Recommended for DevOps)

The application is fully containerized for production deployment:

```bash
docker-compose up -d
```

Features:
- ✅ Multi-stage build for minimal image size (~150MB)
- ✅ Node.js 20 Alpine base
- ✅ Next.js standalone output
- ✅ Non-root user for security
- ✅ Health checks included

See [DOCKER.md](./DOCKER.md) for detailed instructions.

### Vercel

Deploy easily with Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Traditional

Or build for production:

```bash
npm run build
npm start
```

## License

MIT License - feel free to use this template for your own portfolio!

---

Built with ❤️ by Aayush JP
