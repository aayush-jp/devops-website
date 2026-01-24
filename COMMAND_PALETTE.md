# Command Palette Feature

## Overview

Added a VS Code-style command palette to the portfolio website for quick navigation and actions.

## Installation

Installed `cmdk` package for the command palette functionality:
```bash
npm install cmdk
```

## Components Created

### 1. Navbar Component (`components/Navbar.tsx`)
- Fixed navigation bar at the top
- Displays logo: "aayush@devops:~$"
- Shows command palette hint button with "Press Ctrl+K to navigate"
- Terminal-styled with neon green accents

### 2. CommandPalette Component (`components/CommandPalette.tsx`)
- Styled as a floating terminal window
- Opens with **Ctrl+K** (Windows/Linux) or **Cmd+K** (Mac)
- Closes with **ESC** or by clicking outside

#### Commands Available:

**Navigation Commands** (Green highlight):
- `home` - Scroll to top of page
- `projects` - Scroll to projects section
- `contact` - Scroll to contact section

**Action Commands** (Yellow/Cyan highlight):
- `email` - Copies email (imaayushjp@gmail.com) to clipboard with toast notification
- `github` - Opens GitHub profile (github.com/aayush-jp)
- `linkedin` - Opens LinkedIn profile (linkedin.com/in/aayushjp)

### 3. Toast Component (`components/Toast.tsx`)
- Shows success notifications (e.g., "Email copied to clipboard!")
- Auto-dismisses after 3 seconds
- Terminal-styled with neon green border and glow effect

## Features

### Keyboard Shortcuts
- **Ctrl+K / Cmd+K**: Open command palette
- **↑↓ Arrow Keys**: Navigate through commands
- **Enter**: Execute selected command
- **ESC**: Close palette
- **Type to search**: Filter commands

### Design Elements

#### Terminal Aesthetic
- Dark background (`#0a0e14`)
- Neon green highlights (`#39ff14`) with glow effects
- Border with green accent (`border-terminal-green/30`)
- Terminal header with icon and title
- Command prompt (`$`) before search input

#### Animations
- Fade-in backdrop blur
- Zoom-in animation for palette
- Smooth transitions on hover
- Toast slide-in from top-right

### Styling

All components use the terminal color scheme:
- Background: `#0a0e14`
- Text: `#b3b1ad`
- Green (neon): `#39ff14`
- Cyan: `#59c2ff`
- Yellow: `#f29668`
- Border: `#1f2937`

## Integration

Updated `app/page.tsx`:
- Added `"use client"` directive
- State management for command palette open/close
- Added section IDs for smooth scrolling:
  - `#hero`
  - `#tech-stack`
  - `#projects`
  - `#experience`
  - `#contact`

## CSS Additions

Added to `app/globals.css`:
- Command palette fade-in/zoom-in animations
- Custom scrollbar for command list
- Group heading styles
- Animation utilities

## Usage

### Opening the Command Palette
1. Press `Ctrl+K` (or `Cmd+K` on Mac)
2. Or click the hint button in the navbar

### Using Commands
1. Type to search/filter commands
2. Use arrow keys to navigate
3. Press Enter to execute
4. Commands are grouped by type (Navigation / Actions)

### Visual Feedback
- Hover effects on commands with green background tint
- Icons color-coded by command type
- Toast notifications for clipboard actions
- Smooth scroll animations for navigation

## Server

Portfolio is now running at: **http://localhost:3001**

## Next Steps

To further enhance the command palette:
1. Add more commands as the site grows
2. Add keyboard shortcuts display (e.g., `Ctrl+H` for home)
3. Add recent commands history
4. Add command categories toggle
5. Add fuzzy search for better command matching
