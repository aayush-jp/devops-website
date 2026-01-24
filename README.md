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

Deploy easily with Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Or build for production:

```bash
npm run build
npm start
```

## License

MIT License - feel free to use this template for your own portfolio!

---

Built with ❤️ by Aayush JP
