# SanskritLang IDE - Design Guidelines

## Design Approach

**Selected Approach**: Cultural-Themed Utility Design  
Blend traditional Indian/Sanskrit aesthetic elements with modern IDE functionality, inspired by Bhailang's playful approach while maintaining professional coding tool usability.

**Core Principles**:
- Cultural reverence through visual language without sacrificing functionality
- Clean, distraction-free coding environment with subtle cultural motifs
- Educational and approachable, celebrating heritage through technology

---

## Core Design Elements

### A. Color Palette

**Primary Colors (Light Mode)**:
- Sacred Saffron: 25 85% 60% (primary brand, headers, accents)
- Deep Terracotta: 15 65% 45% (secondary, buttons, highlights)
- Lotus White: 40 15% 98% (background, cards)
- Ink Black: 240 10% 15% (text, code editor text)

**Primary Colors (Dark Mode)**:
- Warm Saffron Glow: 30 75% 55% (primary accents, reduced saturation)
- Rich Earth: 20 45% 35% (secondary elements)
- Deep Charcoal: 240 8% 12% (main background)
- Soft Cream: 40 20% 92% (text, code)

**Syntax Highlighting Colors**:
- Keywords (likh, yadi, karya): 25 90% 55% (saffron)
- Strings: 140 50% 45% (sage green)
- Numbers: 260 60% 60% (indigo)
- Comments: 30 15% 55% (muted earth)
- Functions: 200 70% 50% (peacock blue)

### B. Typography

**Font Families**:
- Headers/Branding: 'Tiro Devanagari Sanskrit' or 'Noto Serif Devanagari' (cultural authenticity)
- Body/UI: 'Inter' or 'IBM Plex Sans' (modern readability)
- Code Editor: 'JetBrains Mono' or 'Fira Code' (monospace with ligatures)

**Type Scale**:
- Page Title: text-4xl font-bold (Devanagari font)
- Section Headers: text-2xl font-semibold
- Body Text: text-base font-normal
- Code: text-sm font-mono
- UI Labels: text-sm font-medium

### C. Layout System

**Spacing Units**: Tailwind units of 2, 4, 6, 8, 12, 16 (p-4, m-8, gap-6, etc.)

**IDE Layout Structure**:
- Split-panel design: Code editor (60%) | Output console (40%)
- Top navigation bar: h-16 with logo, docs link, theme toggle
- Code editor area: Full height with subtle border, rounded corners
- Output panel: Scrollable console with clear visual separation
- Bottom status bar: Compact interpreter status, line/column info

**Container Widths**:
- Main IDE container: max-w-7xl mx-auto
- Documentation sections: max-w-4xl
- Code examples: max-w-3xl

### D. Component Library

**Navigation Header**:
- Logo: Sanskrit-inspired "संस्कृत" symbol + "SanskritLang" wordmark
- Navigation items: Documentation, Examples, About
- Theme toggle with sun/moon icons
- Subtle bottom border with saffron accent

**Code Editor Panel**:
- Clean textarea with syntax highlighting
- Line numbers in left gutter
- Subtle background pattern (optional: faint Sanskrit calligraphy watermark)
- Rounded corners (rounded-lg)
- Border with cultural accent color

**Control Buttons**:
- Primary "चलाओ Run" button: Saffron background, rounded-md, shadow-sm
- Secondary buttons: Outline style with terracotta border
- Icon buttons for clear/copy/download: Ghost style

**Output Console**:
- Monospace font display
- Dark background with light text (even in light mode for terminal feel)
- Scrollable area with custom scrollbar styling
- Clear visual header "Output / निर्गम"

**Documentation Cards**:
- White/dark cards with subtle shadows
- Sanskrit keyword in Devanagari font as header
- English translation subtitle
- Code example with syntax highlighting
- Usage description

**Examples Section**:
- Grid layout: 2 columns on desktop, 1 on mobile
- Card-based examples with "Try this" buttons
- Each card shows: Sanskrit code snippet + expected output
- Hover effect: Subtle lift and shadow increase

### E. Cultural Design Elements

**Decorative Motifs**:
- Lotus flower SVG icons for success states
- Mandala patterns as subtle background textures (very low opacity)
- Sanskrit calligraphy flourishes in section dividers
- Om symbol (ॐ) as loading indicator

**Background Treatments**:
- Main IDE area: Clean solid color, no distractions
- Documentation sections: Subtle gradient from lotus white to warm cream
- Hero/header area: Geometric patterns inspired by Indian textiles (very subtle, 5% opacity)

**Border Styles**:
- Primary borders: border-terracotta with rounded corners
- Accent dividers: Thin saffron lines (1-2px)
- Card shadows: Warm-toned shadows (shadow-amber-200/50)

### F. Interaction States

**Button States**:
- Hover: Slight scale (hover:scale-105), deeper shadow
- Active: Scale down slightly (active:scale-95)
- Disabled: Reduced opacity (opacity-50), no hover effects

**Code Editor Interactions**:
- Focus: Subtle saffron glow around editor border
- Error state: Red border-l-4 on error lines
- Success state: Green border-l-4 on successful execution

**Animations**: Minimal and purposeful
- Page transitions: Smooth fade-in (300ms)
- Button clicks: Quick scale feedback (150ms)
- Output reveal: Slide-down animation (200ms)
- Loading state: Gentle pulse on Om symbol

---

## Images

**Hero Section Image**: 
A artistic representation blending ancient Sanskrit manuscripts with modern code, showing Sanskrit text morphing into lines of code. Should have warm, inviting tones (saffron, terracotta, cream) and convey the bridge between ancient wisdom and modern technology.

Placement: Full-width hero section at top of landing page, height approximately 60vh, with overlay text "Code in the Language of the Ancients / प्राचीन भाषा में कोड करें"

**Optional Decorative Images**:
- Background texture: Faint Sanskrit manuscript texture (10% opacity) behind documentation sections
- About section: Historical image of Sanskrit texts alongside modern computer

---

## Responsive Behavior

**Desktop (lg:)**: Full split-panel IDE, side-by-side code and output  
**Tablet (md:)**: Vertical stack, code editor above output  
**Mobile (base:)**: Single column, collapsible panels with tabs

**Critical Breakpoints**:
- Mobile-first base styles
- md: (768px) - Adjust padding, stack panels
- lg: (1024px) - Full horizontal split layout
- xl: (1280px) - Maximum container width, comfortable spacing

---

## Accessibility Considerations

- High contrast ratios maintained in both themes (WCAG AA compliant)
- Keyboard navigation for all interactive elements
- Screen reader labels for cultural symbols
- Focus indicators clearly visible on all interactive elements
- Code editor supports common keyboard shortcuts (Ctrl+Enter to run)
- Color-blind friendly syntax highlighting with distinct patterns