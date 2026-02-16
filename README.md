# Talk to Me

**Your Mind Deserves to Be Heard**

Talk to Me is a mental wellness web application that provides a safe space to explore your thoughts, discover patterns, and find clarity. Express yourself through conversations, journaling, and interactive visualizations of your inner world.

This app stemmed from the drive to build something even when I mentally couldn't. I didn't know I had any mental health struggles due to how occupied I was — until the burnout hit. I suddenly couldn't do anything and had no zeal to do anything. Then I decided to document how I feel. I had this book I had written "Talk to Me" on the front page, so I'd be reminded to talk to it. That's where the name comes from.

---

## Features

### Talk It Out
Have meaningful conversations with an AI that listens, asks the right questions, and helps you understand your thoughts. The system detects emotions in real time and responds with context-aware follow-ups, validation, and deepening questions.

### See Your Mind
Watch your thoughts appear as an interactive mind map in real time, revealing patterns and connections you might not see on your own. Nodes are color-coded by emotion, and highly connected thoughts are highlighted as patterns.

### Private Journal
Write freely in your personal space. Track your mood with emoji-based mood selection, add tags, and reflect with guided writing prompts. Search and filter your entries at any time.

### Track Progress
See your emotional journey over time with mood charts (7, 14, or 30-day views) and discover insights about your patterns. View stats like total conversations, journal entries, average mood, and streaks.

### Find Support
Browse a directory of therapists who specialize in what you need. Filter by specialty, read bios, and reach out directly. You don't have to do this alone.

### Daily Affirmations
Start each day with affirmations that uplift and inspire your journey. Over 50 affirmations covering self-worth, resilience, growth, and more.

---

## How It Works

1. **Share Your Thoughts** — Start a conversation or write in your journal. Express whatever's on your mind.
2. **Discover Patterns** — Watch as your thoughts are visualized and patterns emerge through mind maps and analytics.
3. **Grow & Heal** — Use insights to understand yourself better. Connect with professionals when you're ready.

---

## Tech Stack

- **React 19** with React Router v7 (HashRouter for GitHub Pages compatibility)
- **Firebase** — Authentication only (email/password, Google OAuth, GitHub OAuth)
- **Recharts** — Mood area charts on the Progress dashboard
- **react-force-graph-2d** — Interactive force-directed mind map visualization
- **lucide-react** — Icons throughout the app
- **date-fns** — Date formatting and manipulation
- **uuid** — Unique ID generation for entries
- **Inline CSS-in-JS** — All styles defined as JavaScript objects, no CSS framework

---


---

## Authentication

Firebase Auth was chosen because it handles signup/login, Google/GitHub sign-in, and password reset out of the box. It was the easiest way to implement real security without building a custom backend.

- Email and password registration with validation
- Google and GitHub OAuth
- Persistent sessions across page refreshes
- Auth-aware UI (navbar shows user name or login link)

---

## Data Storage

All user data (conversations, journal entries, mood scores, thought maps, and detected patterns) is stored in the browser's **localStorage**. Nothing is sent to a server — everything stays on the user's device.

---

## Pattern Detection

The app includes a pattern analysis engine that processes conversations and journal entries to detect:

- **Emotions** — Anxiety, sadness, anger, joy, and confusion via keyword matching
- **Cognitive distortions** — Catastrophizing, black-and-white thinking, mind-reading, should statements, and personalization
- **Recurring themes** — Relationships, work, school, health, and self-worth
- **Time patterns** — When the user tends to write (day of week, time of day)
- **Frequent keywords** — Most common words across all entries

---

## Crisis Support

The app includes references to the **988 Suicide & Crisis Lifeline** throughout the interface. The Talkspace conversation system also has crisis keyword detection that triggers a modal directing users to professional help.

---

## Getting Started


