# ليلة التحدي — Party Night V2.2

Mobile-first Arabic party platform created and developed by **يزن عبد الحليم (Yazan Abdalhaleem)**. The public product version remains **V2.2**; later module/build numbers are internal only.

Party Night is being built as one social-games product that can grow from shared-phone/offline play into purpose-built two-player, same-room multi-device and online private-room modes without splitting into separate apps.

## Current games — 28
1. تحدّي 30 PRO
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
19. الممنوع
20. العميل السري
21. السلسلة
22. مين قالها؟
23. كلمة مشتركة
24. **المزايد الصامت** — private two-player bidding followed by an execution challenge.
25. **نص المعلومة** — cooperative split-information deduction for two players.
26. **سلم المخاطرة** — two-player push-your-luck knowledge ladder.
27. **مصيدة الكلمة** — conversational secret-word trap for two players.
28. **صدام الذاكرة** — simultaneous memory duel.

## Challenge 30 PRO
- 13 round types.
- Balanced scheduling for a chosen question count.
- Weighted content packs.
- Adaptive difficulty.
- Team Power Cards.
- Optional risk-based Final Round.
- Explanations, QA metadata and local question reporting.
- Crash recovery for active matches.
- Curated difficulty tiers that keep basic legacy questions out of medium+ play.

## Content platform
- **6000+ playable questions/prompts** across football, Champions League, World Cup/history, geography, science, history, technology, gaming, cars, film/TV, religion, Arabic/world culture, general sports, logic and general knowledge.
- Cross-session recent-question suppression.
- Quality/review metadata for generated structured content.
- Typed `PN_CONTENT_REGISTRY` for trivia, identities, ordering, estimates, auctions, split signals, prompts, memory, scenarios, missions, rules and future content types.
- Reusable **Content Modes** transform several mechanics at once instead of duplicating games. Football is the first deep mode; it currently powers Challenge 30, مين اللاعب، خمس ثواني، اختيار الأغلبية، رتّبها، فك الشفرة، أقرب رقم and لمحة.
- Barcelona remains one normal football pack; the content library is intentionally global and broad.

## Party Director
The current Director is capability-aware instead of relying on hand-written game lists:
- Uses player-count and format capability metadata.
- Uses realistic per-game time estimates.
- **Never repeats the same game just to fill a generated playlist.**
- Prefers a shorter honest playlist if the requested filters do not have enough unique experiences.
- Supports all-content, football-only and no-football content modes as mutually exclusive choices.
- Two-player sessions can prefer genuine duel-capable games.
- Party taste learning, saved playlists, Party Pulse, Surprise Roulette, intermissions, Host Deck, team balancing and end-of-night awards remain available.

## App-ready foundation
Internal v31 architecture adds:
- `PN_CAPS`: formal game capability registry for player counts, formats, devices, pace, tags and content needs.
- `PN_CONTENT_REGISTRY`: typed content-pool registry.
- `PN_STORE`: IndexedDB-first scalable local storage with localStorage fallback.
- `PN_PLATFORM`: browser/native abstraction for share, haptics, network status and future native adapters.
- Dedicated two-player discovery hub.

This keeps the current Web/PWA fast to iterate while preparing the same codebase for a later native iOS/Android wrapper rather than a rewrite.

## Existing platform systems
- Profiles, XP, levels, titles, achievements and seasons.
- Cosmetic Locker.
- Events Center.
- Game Master controls.
- TV / Presentation Mode.
- Remote Room Beta using optional WebRTC controllers.
- Custom trivia pack creator and share/import links.
- Party setup share links.
- Stats Hub, Hall of Fame and session recap.
- Full local backup/restore.
- Text-to-speech where supported.
- Search, favorites, recent games and resume shortcuts.
- Larger text, reduced motion, higher contrast and extended timers.
- PWA/offline cache after first successful load.
- Optional sound, haptics and screen wake lock.

## Multiplayer direction
Current Remote Room is Beta. The commercial direction is documented in [`docs/PRODUCT-ARCHITECTURE-v31.md`](docs/PRODUCT-ARCHITECTURE-v31.md): shared phone → purpose-built 2P → same-room multi-device → authoritative online private rooms → optional public matchmaking for suitable games.

## Product / QA engineering
- Expansion modules are isolated from the original core.
- GitHub Actions runs `node --check` against every JavaScript file on each push.
- Quality Gate also verifies required production modules are present and wired into runtime/offline cache.
- GitHub Pages deployment is automated from `main`.

## Visual identity
Deep blue, red and gold match-night styling inspired by football-night energy and the creator’s love of FC Barcelona, without using official club marks or copying protected club identity. The **content itself is not Barcelona-focused**.

## Creator
**يزن عبد الحليم (Yazan Abdalhaleem)** — creator and developer of ليلة التحدي / Party Night.
