# ليلة التحدي — Party Night V2.2

Mobile-first Arabic party platform created and developed by **يزن عبد الحليم (Yazan Abdalhaleem)**. It is designed primarily for one shared phone, 2–10 players, fast setup and face-to-face play. The public product version remains **V2.2**; later build numbers are internal only.

## Current games — 23
1. تحدّي 30 PRO — weighted packs, adaptive difficulty, 13 round types, Power Cards, QA/report tools and a risk-based Final Round.
2. مين اللاعب؟
3. الجواب المزوّر
4. نفس التفكير
5. على المقياس
6. احكيها بدونها
7. ارسم ومرّر
8. وعاء الكلمات
9. القنبلة
10. خمس ثواني
11. اختيار الأغلبية
12. رتّبها
13. فك الشفرة
14. أقرب رقم
15. لمحة
16. همسة
17. محكمة الأصدقاء
18. أقنعني
19. الممنوع — persistent secret rules layered over the whole party.
20. العميل السري — persistent secret missions layered over the whole party.
21. السلسلة
22. مين قالها؟ — anonymous answers + author guessing.
23. كلمة مشتركة — two players converge toward the same secret word.

## Challenge 30 PRO
- 13 round types: direct, clue/Who Am I, list/auction, speed, multiple choice, steal, double, higher/lower, timeline, closest-number, odd-one-out, fix-the-fact and captain.
- Balanced scheduling for a chosen question count.
- Weighted content packs (1x / 2x / 3x).
- Adaptive difficulty.
- Team Power Cards: swap, double, shield and hint.
- Optional Final Round with 1–5 point risk per team.
- Explanations and QA metadata after reveal.
- Local question reporting for incorrect, ambiguous, repeated, inappropriate or too-easy cards.
- Crash-recovery snapshot for an active Challenge 30 match.
- Curated difficulty tiers that keep legacy/basic questions out of medium+ play.
- Mega content engine with **6000+ playable questions** across football, world clubs and national teams, Champions League, World Cup, geography, history, science, technology, gaming, cars, film/TV, religion, Arabic/world culture, general sports, logic and mixed knowledge.
- FC Barcelona remains one football pack among many; the content library is intentionally global and balanced.
- Cross-session recent-question suppression reduces repetition even across different party nights.

## Party OS
- **Instant Party**: one tap builds a four-game session and can generate temporary Guest players automatically.
- **Party Director** builds a varied queue from session length, player count, vibe, energy and content filters.
- Persistent Party Queue with opener / middle / finale flow and a compact next-game control while playing.
- **Next Best Game** recommendations consider player count, recently played games, variety and current Party Pulse.
- **Local group taste learning**: quick 😍 / 🙂 / 👎 ratings teach the recommender which games the group prefers, with all taste data stored only on the device.
- Saved Playlists for repeating a successful party flow.
- Surprise Roulette for instant random game selection.
- **Party Pulse** lets the host tell the app whether the group wants laughs, knowledge, speed, competition or football and how energetic the room currently is.
- **Host Deck** combines recommendations, breaks, team balancing, player spotlight, soundboard and end-of-night awards.
- Fair **Snake Team Balancer** can use lifetime/session scores to spread stronger players across two teams.
- Intermission challenges and optional break timer keep longer sessions paced instead of feeling like a list of disconnected games.
- Player Spotlight randomly chooses who starts next.
- Built-in party Soundboard for correct / wrong / whistle / suspense / win cues.
- Automatic end-of-night awards from session scores, strikes and game history.
- First-run onboarding focuses on getting from launch to an active party with minimal setup.

## Party platform systems
- Party presets plus an Events Center: Champions Night, Clásico night, World Cup, 2000s retro, Ramadan/family and Summer Mix.
- Championship mode across multiple mini-games.
- Player Profiles with avatars, XP, levels, titles, lifetime score and wins.
- Cosmetic Locker with unlockable visual themes, player frames and celebration sounds. Cosmetics never affect game balance.
- Achievements, badges, seasonal XP, daily and weekly challenges.
- Game Master control center.
- TV / Presentation Mode for a synchronized second browser window, AirPlay or screen mirroring.
- **Remote Room Beta**: optional multi-phone WebRTC controllers with room link/code/QR, buzzer, A/B/C/D, yes/no and reactions. Internet is required for this optional mode; normal one-phone play remains offline-first.
- Reactions/emotes.
- Stats Hub, Hall of Fame and session Recap.
- Custom trivia pack creator with share/import links.
- Party setup share links for reusing session configuration.
- Full local backup/restore.
- Text-to-speech for the current prompt when supported by the browser.
- Favorites, search, recent games and resume shortcuts.
- First-time contextual help per game.
- Session filters including family, football-focused, no-football and less-personal modes.
- Larger text, reduced motion, higher contrast and extended timers.
- PWA/offline cache after the first successful load.
- Optional sound, haptics and screen wake lock.
- No account required; local data stays in browser storage unless the user explicitly shares/exports it.

## Product / QA engineering
- Modular expansion layers keep new games and platform systems isolated from the original core.
- Question metadata includes quality, review date, evergreen flag and local verification state.
- Duplicate/legacy content can be excluded by the Pro trivia engine.
- GitHub Actions quality gate runs `node --check` against every JavaScript file on each push.
- GitHub Pages deployment is automated from `main`.

## Visual identity
Deep blue, red and gold match-night styling inspired by the creator’s love of FC Barcelona, without using official club marks or copying the club’s protected identity. The visual inspiration does not determine or dominate the content mix.

## Creator
**يزن عبد الحليم (Yazan Abdalhaleem)** — creator and developer of ليلة التحدي / Party Night.
