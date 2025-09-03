# Module Split Plan

Goal: Refactor the monolithic `script.js` (~600 lines) into smaller, focused ES module files while keeping the app fully static and student-friendly. Each phase is incremental and shippable.

> Principle: After every phase, the app still works exactly the same.

## Phase 0 (Preparation) – In Place Refactor (No Modules Yet)
- [ ] M0-01 Add section divider comments inside `script.js` (STATE, EVENT BINDING, VIEW MODES, CONVERSION, PREVIEW, STATS, CLIPBOARD, DOWNLOAD, UTILITIES).
- [ ] M0-02 Remove obsolete legacy custom markdown renderer logic & leave only Marked delegate (keep method stub with comment for students).
- [ ] M0-03 Add JSDoc headers to: `convertHtmlToMarkdown`, `convertMarkdownToHtml`, `updateSettings`, `updateMarkdownPreview`, `setOutputView`.
- [ ] M0-04 Introduce small helper `getEl(id)` internally to reduce repeated `document.getElementById` calls.
- [ ] M0-05 Ensure no function exceeds ~50 lines (split if needed) – especially `updateSettings`.
- [ ] M0-06 Confirm lint / formatting still OK after changes.

## Phase 1 – Introduce ES Module Entry
- [ ] M1-01 Rename `script.js` to `app.js` (temporary) OR keep `script.js` and add `type="module"` in HTML.
- [ ] M1-02 Wrap DOMContentLoaded bootstrap in a small `bootstrap()` function exported by `app.js`.
- [ ] M1-03 Verify GitHub Pages static load still succeeds (no bundler required).

## Phase 2 – Extract Pure Utility & Constants
- [ ] M2-01 Create `js/constants.js` for enum-like objects (e.g., `VIEW = { MARKDOWN:'markdown', PREVIEW:'preview', HTML:'html' }`).
- [ ] M2-02 Create `js/dom.js` with `q(id)`/`qa(selector)` helpers and maybe cached selectors.
- [ ] M2-03 Move `escapeHtml` and any future sanitizers to `js/util.js`.
- [ ] M2-04 Update `app.js` imports and remove duplicated helper definitions.
- [ ] M2-05 Manual test: full conversion still works (tables, preview, copy, download).

## Phase 3 – Split Core Responsibilities
- [ ] M3-01 `js/settings.js`: responsibility for building a configured Turndown instance (`buildTurndown(options)`), handling plugin attachment.
- [ ] M3-02 `js/converter.js`: export `htmlToMarkdown(turndown, html)` and `markdownToHtml(md)`.
- [ ] M3-03 `js/preview.js`: export `renderMarkdown(md)` (wrapper over Marked) and future enhancements.
- [ ] M3-04 `js/state.js`: central plain object or class to hold mode/view/toggles.
- [ ] M3-05 Shrink main class/controller to orchestration only (no direct conversion logic).
- [ ] M3-06 Remove now-redundant methods from controller (delegate to modules).
- [ ] M3-07 Manual test regression suite (UAT Guide Section 5).

## Phase 4 – Event Layer & Controller Slimming
- [ ] M4-01 Create `js/events.js` that wires DOM events to controller methods.
- [ ] M4-02 Controller becomes a thin facade: `init()`, `convert()`, `updateViews()`, `updateSettings()`.
- [ ] M4-03 Replace direct DOM query patterns inside controller with event payloads or utility helpers.
- [ ] M4-04 Add JSDoc to each exported module function (params, returns, side effects).
- [ ] M4-05 Manual test full user flow (paste → convert → toggle views → copy → download).

## Phase 5 – Optional Educational Enhancements
- [ ] M5-01 Add `ARCHITECTURE.md` describing each module’s purpose (student friendly).
- [ ] M5-02 Provide a simplified `minimal-app.js` showing only core conversion (for teaching).
- [ ] M5-03 Add inline `// STUDENT TIP:` comments in 3–5 strategic spots.
- [ ] M5-04 Add a lightweight test harness page `test/index.html` to load modules individually.
- [ ] M5-05 Add sample snippet JSON (tables, lists) for quick manual tests.

## Phase 6 – Future Extensibility Hooks
- [ ] M6-01 Add a plugin registration pattern (e.g., `registerPostProcessor(fn)` for markdown output).
- [ ] M6-02 Add hook for pre-conversion HTML sanitizers (Phase 2 table preprocessing reuse).
- [ ] M6-03 Document hooks in `ARCHITECTURE.md`.

## Risk Mitigation / Rollback Strategy
- Keep each phase in its own commit; if an issue appears, revert the latest commit only.
- Avoid circular imports: utilities must not import app/controller.
- Test after every file move using at least one sample table + basic formatting snippet.

## Acceptance Criteria Summary
- After Phase 3: No single module >250 lines; controller <150 lines.
- After Phase 4: Controller primarily orchestration; pure logic resides in dedicated modules.
- After Phase 5: Students can read `ARCHITECTURE.md` first and open modules in order.

## Cross Reference
- Supports maintainability goals from USER_STORIES (US8) and sets groundwork for future advanced features.

## Tracking Legend
Use `[x]` when complete; add date or commit hash inline if desired, e.g., `[x] M2-03 (abc123)`.
