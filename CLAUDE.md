# CLAUDE.md - TalktoMe Project Guide

This document provides essential information for AI assistants working with the TalktoMe codebase.

## Project Overview

TalktoMe is a React-based mental wellness application that provides daily affirmations and conversational support features. The app is built with Create React App and uses React Router for navigation.

**Current Status:** MVP (Minimum Viable Product) stage - core pages implemented with authentication UI.

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.3 | UI framework |
| React Router DOM | 7.11.0 | Client-side routing |
| Lucide React | 0.562.0 | Icon library |
| React Scripts | 5.0.1 | Build tooling (CRA) |
| Testing Library | 16.3.1 | Component testing |

## Project Structure

```
/home/user/Talktome/
├── public/
│   └── index.html           # SPA entry point
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AuthPage.jsx     # Login/signup form
│   │   └── NavBar.jsx       # Responsive navigation
│   ├── pages/               # Page-level components
│   │   ├── Affirmation.jsx  # Daily affirmations page
│   │   └── Home.jsx         # Landing page
│   ├── App.jsx              # Root component with routing
│   ├── index.js             # Application entry point
│   ├── index.css            # Global styles (minimal)
│   └── reportWebVitals.js   # Performance monitoring
├── package.json
└── .gitignore
```

### Directory Conventions

- **`src/components/`** - Reusable UI components (NavBar, AuthPage)
- **`src/pages/`** - Page-level components that map to routes
- Use `.jsx` extension for all React component files

## Routing Structure

Routes are defined in `src/App.jsx`:

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Home` | Landing page with hero section |
| `/AuthPage` | `AuthPage` | Login/signup authentication |
| `/Affirmation` | `Affirmation` | Daily affirmations display |
| `/TalkSpace` | Not implemented | Future feature (in NavBar only) |

**Navigation pattern:** Use `useNavigate()` hook from React Router for programmatic navigation.

## Development Commands

```bash
npm start          # Start dev server (localhost:3000)
npm run build      # Create production build
npm test           # Run Jest tests in watch mode
npm run eject      # Eject from CRA (irreversible)
```

## Code Conventions

### Component Structure

All components are **functional components** using React hooks:

```jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ComponentName = () => {
  // State declarations
  const [state, setState] = useState(initialValue);

  // Effects
  useEffect(() => {
    // Side effects
  }, [dependencies]);

  // Event handlers
  const handleEvent = () => { /* ... */ };

  // Inline styles object
  const styles = {
    container: { /* CSS properties */ }
  };

  return (
    <div style={styles.container}>
      {/* JSX */}
    </div>
  );
};

export default ComponentName;
```

### Styling Approach

**Primary method:** Inline CSS via JavaScript objects (CSS-in-JS)

```jsx
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minHeight: '100vh',
  },
  button: {
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
  }
};
```

**Color palette:**
- Primary: `#667eea` (purple-blue)
- Secondary: `#764ba2` (dark purple)
- Text: `#2d3748`, `#0e0e0f` (dark grays)
- Background: `rgba(255, 255, 255, 0.95)` (near white)

**Common patterns:**
- Gradient backgrounds with the purple theme
- Box shadows for depth: `0 4px 6px rgba(0, 0, 0, 0.1)`
- Border radius for rounded corners: `8px`, `12px`
- Hover effects via `onMouseEnter`/`onMouseLeave` handlers

### Responsive Design

Mobile breakpoint: **768px**

```jsx
// Check window width for responsive behavior
const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

// Or use inline conditional styles
style={{
  flexDirection: window.innerWidth <= 768 ? 'column' : 'row'
}}
```

### State Management

- **Local state:** `useState` hook for component-level state
- **No global state:** Currently no Redux/Context API implementation
- Form data typically stored as object: `{ field1: '', field2: '' }`

### Form Validation Pattern

See `AuthPage.jsx` for the validation pattern:

```jsx
const [formData, setFormData] = useState({ email: '', password: '' });
const [errors, setErrors] = useState({});

const validate = () => {
  const newErrors = {};
  if (!formData.email) newErrors.email = 'Email is required';
  // Email regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

## Key Files Reference

| File | Purpose | Key Exports |
|------|---------|-------------|
| `src/App.jsx` | Root component, routing | `App` (default) |
| `src/components/NavBar.jsx` | Navigation bar | `NavBar` (default) |
| `src/components/AuthPage.jsx` | Auth forms | `AuthPage` (default) |
| `src/pages/Home.jsx` | Landing page | `Home` (default) |
| `src/pages/Affirmation.jsx` | Affirmations | `Affirmation` (default) |

## Testing

Testing libraries are installed but no tests exist yet:
- `@testing-library/react`
- `@testing-library/jest-dom`
- `@testing-library/user-event`

Test files should be placed alongside components with `.test.jsx` extension.

## Known Issues and TODOs

1. **TalkSpace route** - NavBar links to `/TalkSpace` but no route/component exists
2. **Affirmation edge case** - Component returns `null` if `currentAffirmation` is falsy (index 0 issue)
3. **No test coverage** - Testing libraries installed but no tests written
4. **Auth is UI only** - No backend integration for authentication

## Git Workflow

**Main branch:** (not specified)
**Current working branch:** `claude/claude-md-mkztag904oj5n2vv-0zGOm`

Commit message style (from history):
- Start with action verb: "Add", "Update", "Fix", "Initialize"
- Keep concise but descriptive

## Adding New Features

### Adding a New Page

1. Create component in `src/pages/NewPage.jsx`
2. Add route in `src/App.jsx`:
   ```jsx
   <Route path="/NewPage" element={<NewPage />} />
   ```
3. Add navigation link in `src/components/NavBar.jsx`

### Adding a New Component

1. Create component in `src/components/ComponentName.jsx`
2. Use functional component with hooks pattern
3. Apply inline styles following the existing color scheme
4. Import and use where needed

## Dependencies Notes

- **Lucide React** - Used for hamburger menu icons (`Menu`, `X`)
- **React Router v7** - Uses new data API; current implementation uses basic routing only
- **Web Vitals** - Performance monitoring enabled but not configured for external reporting
