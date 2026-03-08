

## Plan: Full i18n for all pages + English overflow fix + YouTube background music

### Problem Summary
1. **i18n only covers Navbar, Hero, ContentCards, Footer** — all subpages (History, HangulDay, Quotes, News) and main page sections (PrinciplesSection, LettersShowcase, CombineSection, PhilosophySection) are fully hardcoded in Korean
2. **English hero title "Hunminjeongeum"** is too long at `text-9xl`, overflows on smaller screens
3. **YouTube background music** not yet implemented

### What stays in Korean (한글 유지)
These are Korean linguistic/cultural artifacts that should NOT be translated:
- Hangul letters themselves (ㄱ, ㄴ, ㅏ, etc.) and their names (기역, 니은)
- The Hunminjeongeum quote in PhilosophySection (나랏말싸미...)
- The 가나다라 decorative text
- Korean quotes in the Quotes page (the original quote text)
- Hangul syllable combiner labels (초성/중성/종성 as functional Korean terms)
- The decorative 한, 음 background characters
- "훈민정음" in the footer (cultural name)

### Implementation Plan

#### 1. Fix English hero text overflow
- Make the h1 font size responsive to locale — use smaller sizes for longer romanized titles (e.g., `text-4xl md:text-6xl lg:text-7xl` for non-Korean locales vs current `text-6xl md:text-8xl lg:text-9xl`)

#### 2. Expand i18n translations in `src/lib/i18n.tsx`
Add translation keys for all sections and pages:
- **PrinciplesSection**: section label, heading, description, each principle's title/subtitle/description
- **LettersShowcase**: section label, heading, description, tab labels, letter origins (tooltip descriptions)
- **CombineSection**: section label, heading, description, panel labels (초성·첫소리, etc.), result label
- **PhilosophySection**: section label, heading, description, quote attribution, stat labels
- **History page**: page title, description, each event's title/desc/detail
- **HangulDay page**: page title, subtitle, description, all facts and globalReach items (titles, descriptions, detail texts), section headings, "자세히 보기" button text, quote attribution
- **Quotes page**: page title, description, author bios, context descriptions (original Korean quotes stay in Korean)
- **News page**: page title, description, news item descriptions (titles kept as original English headlines), CTA text

This is a very large volume of translations (5 languages x ~200+ keys). We'll add all keys systematically.

#### 3. Apply `useI18n()` to all components
Update each component/page to import `useI18n` and replace hardcoded strings with `t("key")` calls, while preserving Korean-only content as-is.

#### 4. YouTube background music auto-play
- Create a `YouTubePlayer` component that embeds the YouTube IFrame API
- URL: `https://www.youtube.com/watch?v=MrNeTVM1fYw`
- Use `?autoplay=1&loop=1&playlist=MrNeTVM1fYw` params with the embed
- Hidden/minimal player (audio only), with a small mute/unmute toggle button (floating, bottom-right corner)
- Note: browsers block autoplay with sound, so we'll start muted and let users unmute

### Files to create/modify
- **Edit** `src/lib/i18n.tsx` — add ~200+ translation keys for all 5 languages
- **Edit** `src/components/HeroSection.tsx` — locale-aware font sizing
- **Edit** `src/components/PrinciplesSection.tsx` — add i18n
- **Edit** `src/components/LettersShowcase.tsx` — add i18n (keep letter data in Korean)
- **Edit** `src/components/CombineSection.tsx` — add i18n (keep Hangul functional terms)
- **Edit** `src/components/PhilosophySection.tsx` — add i18n (keep original quote)
- **Edit** `src/pages/History.tsx` — add i18n for all timeline events
- **Edit** `src/pages/HangulDay.tsx` — add i18n for all content
- **Edit** `src/pages/Quotes.tsx` — add i18n (keep original Korean quotes)
- **Edit** `src/pages/News.tsx` — add i18n
- **Create** `src/components/YouTubePlayer.tsx` — hidden audio player with mute toggle
- **Edit** `src/pages/Index.tsx` — include YouTubePlayer

