# Table Conversion Implementation Plan

Tasklist to track the incremental rollout of table conversion support and related improvements.

## Phase 1: Minimal GFM Table Support
- [x] P1-01 Add CDN script for `turndown-plugin-gfm` in `index.html` (after Turndown, before `script.js`).
- [x] P1-02 Initialize plugin: `turndownService.use(turndownPluginGfm.tables)` inside `updateSettings()` (or constructor) after recreating the service.
- [x] P1-03 Add settings checkbox: "Convert Tables" (default ON) near other Conversion Settings in `index.html`.
- [x] P1-04 Wire checkbox to enable/disable tables (if OFF, skip plugin usage or temporarily remove rule before conversion).
- [x] P1-05 Replace custom regex-based `renderMarkdownPreview` with Marked’s parser for consistency & native table rendering.
- [x] P1-06 Ensure existing styling (prose classes, etc.) still applied to preview container.
- [ ] P1-07 Manual test: simple 2x2 table from a sample HTML snippet.
- [ ] P1-08 Manual test: table with header row `<th>`.
- [ ] P1-09 Manual test: non-table content regression (headings, lists, code blocks).
- [x] P1-10 Update `README.md` with new capability (brief note under Features) and mention limitation with complex tables.

## Phase 2: Robustness & Fallback
- [ ] P2-01 Implement preprocessing function to sanitize pasted table HTML (strip style/class, collapse nested `<p>` inside `<td>`).
- [ ] P2-02 Add complexity detector: detect `rowspan`, `colspan`, nested `<table>`; if found, mark table as complex.
- [ ] P2-03 For complex tables, bypass Markdown conversion: inject raw HTML block (surrounded by blank lines) into final markdown.
- [ ] P2-04 Add toast once per conversion if any complex tables preserved (maps to US6).
- [ ] P2-05 Escape pipe `|`, backticks, asterisks inside cells for safety (US5).
- [ ] P2-06 Normalize whitespace in cells (trim lines, collapse multiple spaces) (US10).
- [ ] P2-07 Manual test: table with a merged cell (simulate `rowspan`).
- [ ] P2-08 Manual test: adjacent tables.
- [ ] P2-09 Manual test: table containing a link & inline code.
- [ ] P2-10 Document fallback behavior in README.

## Phase 3: Enhancements (Optional)
- [ ] P3-01 Column alignment heuristics: detect numeric columns (align right) / default left.
- [ ] P3-02 Add small "Table copied" button for each detected table block in Markdown output (US14).
- [ ] P3-03 Provide a quick test snippet panel (# of tables, complexity summary) for maintainers.
- [ ] P3-04 Dark mode toggle & ensure table styles adapt (US12).
- [ ] P3-05 Alignment rule user toggle (enable/disable alignment detection).
- [ ] P3-06 Provide mini contrib doc explaining table pipeline.
- [ ] P3-07 Add manual test checklist markdown (US13).

## Phase 4: Stretch / Nice-to-Have
- [ ] P4-01 Attempt structured conversion for definition/description tables (US15) → convert to definition lists or simple bullet lists.
- [ ] P4-02 Add drag-and-drop of HTML snippet file (.html) into editor area for conversion.
- [ ] P4-03 Provide performance metrics (time to convert) for large tables.
- [ ] P4-04 Local caching of last conversion (localStorage) for recovery.
- [ ] P4-05 Accessibility review: ensure table semantics preserved.

## Risk Mitigation / Notes
- If plugin CDN fails: wrap usage in try/catch, log a warning, proceed without tables.
- Keep custom logic minimal in Phase 1 to reduce surface area for bugs.
- Avoid over-optimizing alignment until real need confirmed.
- Ensure README clearly sets expectations for complex tables.

## Cross-Reference to User Stories
- Phase 1 covers: US1, partial US4, partial US5.
- Phase 2 covers: US2, US5, US6, US7, US8, US9, US10.
- Phase 3 adds: US11, US12, US13, US14.
- Phase 4 adds: US15 + extras.
