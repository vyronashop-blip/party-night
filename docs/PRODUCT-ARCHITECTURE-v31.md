# Party Night — Product & Architecture Baseline v31

Public product version remains **V2.2**. This document tracks internal architecture/research decisions only.

## Product north star
Party Night should be the first app opened when people want games together. It must work across four increasingly capable modes without fragmenting into separate products:

1. Shared phone / offline-first.
2. Two-player focused play.
3. Same-room multi-device play with one host and private player screens.
4. Online private rooms, later optional matchmaking where appropriate.

The same game may support one or more modes, but game logic must declare capabilities instead of relying on hard-coded lists.

## Phase order

### Phase A — current foundation
- Keep the existing Web/PWA as the fastest production surface.
- Formal `PN_CAPS` registry for player counts, formats, devices, pace, tags and content needs.
- Formal `PN_CONTENT_REGISTRY` for trivia, identities, ordering, estimates, auctions, signals, prompts, memory, scenarios, hidden missions and future content types.
- IndexedDB-first `PN_STORE` for scalable local structured data, with localStorage fallback.
- `PN_PLATFORM` abstraction for browser/native differences.
- Party Director generates unique playlists using capability metadata and real duration estimates.
- Reusable content modes (football first) transform several mechanics instead of duplicating games.
- First original two-player wave.

### Phase B — content & gameplay depth
- Expand every strong mechanic with substantial first-party content.
- Create thematic modes beyond football: family, knowledge, movies/TV, Arabic culture, kids, quick chaos, couples/friends where appropriate.
- Add semantic duplicate suppression and content freshness metadata.
- Human QA factual content before commercial release.
- Continue original game prototyping; do not inflate game count with reskins.

### Phase C — same-room multi-device
- Host creates room; players join with code/QR.
- Private screens for hidden information, simultaneous answers, drawing, voting, auctions and buzzer play.
- Authoritative host/room state, reconnect and late join.
- Shared-phone mode remains fully supported.

### Phase D — online private rooms
- Server-authoritative room lifecycle.
- Reconnect, presence, host migration/recovery, room expiry and abuse controls.
- Guest identity first; accounts only when they provide clear value.
- Public matchmaking only for games that remain fun and safe with strangers.

### Phase E — native release
- Keep web codebase and wrap with Capacitor rather than rewriting the product.
- Add native purchase, notification, haptic, deep-link, analytics and crash-reporting adapters behind `PN_PLATFORM`.
- Keep the web/PWA as acquisition and instant-play surface.

## Technology research decisions

### Native path: Capacitor
Capacitor is designed to drop into an existing modern web project and target iOS/Android while keeping web technologies. Current official documentation: https://capacitorjs.com/docs and https://capacitorjs.com/

Decision: continue building the Web/PWA now, but keep platform-specific work behind adapters so the native step is incremental.

### Local structured data: IndexedDB
Service workers remain responsible for offline app assets. IndexedDB is the preferred browser storage for larger structured local datasets and future content indexes.

Decision: new scalable local systems should use `PN_STORE` instead of adding more independent localStorage blobs where practical.

### Multiplayer rooms
Cloudflare Durable Objects provide stateful coordination and WebSocket support suitable for authoritative rooms: https://developers.cloudflare.com/durable-objects/

Supabase Realtime provides Broadcast and Presence primitives and is a useful alternative/complement for profiles/auth/persistent social state: https://supabase.com/docs/guides/realtime

WebRTC data channels remain useful for peer-to-peer same-room/optional paths but should not be the only commercial room architecture because signaling, reconnect, authoritative state and relay fallbacks need a reliable server layer.

Decision for future implementation research prototype: **Cloudflare Durable Objects + WebSockets** for authoritative room state; evaluate Supabase separately for auth/profile/cloud persistence. Current Trystero/WebRTC Remote Room stays Beta and is not the final commercial networking layer.

## Content sourcing & licensing

### First-party content
Preferred source for prompts, social games, original mechanics and authored trivia. Store provenance/quality/review metadata.

### Wikidata
Wikidata structured data is available under CC0 and is suitable as a future factual backbone for generated/validated structured facts: https://www.wikidata.org/wiki/Wikidata:Licensing

Do not directly turn raw facts into thousands of low-quality questions. Templates require human-readable wording, ambiguity checks, difficulty calibration and date/freshness rules.

### Sports APIs
Do not make offline/core gameplay dependent on third-party sports APIs. Commercial terms vary and may restrict app-store usage. Dynamic/current sports data should be an optional licensed layer only.

## Original-game design principles
- Start from mechanic families (simultaneous choice, hidden information, auction, push-your-luck, memory, deduction, drafting, cooperative information split, reaction, wordplay), not from copying a commercial game's protected expression.
- Every new game needs a one-sentence hook that remains fun without theme/content dressing.
- A reskin is a content mode, not a new game.
- Two-player games must be designed for two, not merely group games with fewer names.
- Multi-device modes should use phone-specific affordances: private information, touch, drawing, motion/reaction, simultaneous input and personal controls.

## Capability model
Each game should eventually declare:
- `min` / `max` players
- formats: duel / coop / group / team / asymmetric
- implemented devices: shared / multi / online
- future modes separately from implemented modes
- estimated duration
- pace
- personal-content flag
- family suitability
- tags/themes
- content pool types

Party Director must use these declarations rather than maintaining hand-written game lists.

## Party Director rules
- Never repeat the same game in one generated playlist merely to fill time.
- Prefer a shorter honest playlist over duplicated filler.
- Use realistic per-game duration estimates.
- Avoid back-to-back games with the same interaction pattern where possible.
- Theme filters must transform content, not only hide games.
- Conflicting filters must be represented as one mutually-exclusive control.
- For two players, prefer purpose-built duel games plus genuinely compatible existing games.

## Current first-party duel wave
1. **المزايد الصامت** — private bidding + execution challenge.
2. **نص المعلومة** — cooperative split-information deduction.
3. **سلم المخاطرة** — push-your-luck knowledge ladder.
4. **مصيدة الكلمة** — conversational secret-word trap.
5. **صدام الذاكرة** — simultaneous memory competition.

These ship shared-phone first. Multi-device/online versions should preserve the same core rules rather than becoming different games.

## Commercial-readiness gates (later)
- Human device QA on iPhone and Android.
- Factual content audit and source/provenance tooling.
- Privacy policy and terms.
- If community/public UGC is introduced: moderation, report/block/filter systems before store release.
- Analytics and crash reporting with privacy review.
- Purchase/restore flows and entitlement architecture.
- Network abuse/rate limiting for public online features.
- Store assets, onboarding and accessibility audit.
