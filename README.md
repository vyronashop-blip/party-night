# ليلة التحدي — Party Night V2.2

Mobile-first Arabic party platform created and developed by **يزن عبد الحليم (Yazan Abdalhaleem)**. It is designed primarily for one shared phone, 2–10 players, fast setup and face-to-face play. The public product version remains **V2.2**; later build numbers are internal only.

## Current games — 21
1. تحدّي 30 PRO — packs, weighted packs, adaptive difficulty, 13 round types, Power Cards, team turns, report/QA tools and a risk-based Final Round.
2. مين اللاعب؟ — football packs, difficulty and optional timer.
3. الجواب المزوّر — secret pass-the-phone answers + private voting.
4. نفس التفكير — secret answers + match scoring.
5. على المقياس — clue spectrum + proximity scoring.
6. احكيها بدونها — team timed forbidden-word rounds.
7. ارسم ومرّر — draw/guess chains with canvas undo.
8. وعاء الكلمات — describe / one-word / charades loop.
9. القنبلة — hidden random timer + pass-the-phone category pressure.
10. خمس ثواني — name three things before time ends.
11. اختيار الأغلبية — private A/B voting and majority scoring.
12. رتّبها — order events and facts correctly.
13. فك الشفرة — emoji decoding.
14. أقرب رقم — private estimates; closest answer wins.
15. لمحة — short-term memory challenge.
16. همسة — telephone-style phrase mutation.
17. محكمة الأصدقاء — funny accusation, defence and secret jury vote.
18. أقنعني — sell an impossible product in a short pitch.
19. الممنوع — a persistent secret rule that stays active across the whole party.
20. العميل السري — long-running secret missions layered over the rest of the night.
21. السلسلة — fast category answers with no repeats.

## Challenge 30 PRO
- 13 round types: direct, clue/Who Am I, list/auction, speed, multiple choice, steal, double, higher/lower, timeline, closest-number, odd-one-out, fix-the-fact and captain.
- Balanced round scheduling for a chosen question count.
- Weighted content packs (1x / 2x / 3x).
- Adaptive difficulty that increases challenge as the match develops.
- Power Cards per team: swap, double, shield and hint.
- Optional Final Round with 1–5 point risk per team.
- Explanations and QA metadata after reveal.
- Local question reporting for incorrect, ambiguous, repeated or too-easy cards.
- Crash recovery snapshot for an active Challenge 30 match.
- Curated difficulty system that keeps legacy/basic questions out of medium+ play.

## Party platform systems
- Smart Party Director: builds a varied playlist based on time, vibe and player count.
- Party presets: football, experts, family, quick, chaos and Barça-inspired nights.
- Championship mode across multiple mini-games.
- Player Profiles with emoji identity, XP, levels, titles, lifetime score and wins.
- Achievements, badges, seasonal XP, daily and weekly challenges.
- Game Master control center for quick scoring, skip/reveal, timers, fullscreen and TV tools.
- TV / Presentation Mode using a synchronized second browser tab/window; ideal for AirPlay or screen mirroring.
- Reactions/emotes that also appear on the presentation screen.
- Stats Hub, Hall of Fame and session Recap timeline.
- Custom trivia pack creator with share/import links.
- Party setup share links (“Party Codes”) for reusing a session configuration.
- Full local backup/restore of Party Night data.
- Text-to-speech for reading the current prompt aloud when supported by the browser.
- Favorites, search, recent games and resume shortcuts.
- First-time contextual rules per game.
- Content profiles: all, family, football-only or without the religion pack.
- Larger text, reduced motion, higher contrast and extended timers.
- PWA/offline cache after the first successful load.
- Optional sound, haptics and screen wake lock.
- No account required; local data stays in browser storage unless the user explicitly shares/export it.

## Product / QA engineering
- Modular expansion scripts keep new games and systems isolated from the original core.
- Question metadata includes quality, review date, evergreen flag and local verification state.
- Duplicate/legacy content can be excluded by the Pro trivia engine.
- GitHub Actions quality gate runs `node --check` against every JavaScript file on each push.
- GitHub Pages deployment is automated from `main`.

## Visual identity
Deep blue, red and gold match-night styling inspired by the creator’s love of FC Barcelona, without using official club marks or copying the club’s protected identity.

## Creator
**يزن عبد الحليم (Yazan Abdalhaleem)** — creator and developer of ليلة التحدي / Party Night.
