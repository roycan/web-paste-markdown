# User Stories (Table Conversion & General Enhancement)

Legend: Check items as they are implemented and verified. Stories include concise acceptance criteria.

## Core Table Support
- [x] US1: As a user copying a CodeChef problem statement that contains a simple HTML table (no merged cells), I want it converted to a GitHub-Flavored Markdown (GFM) table so I can paste it directly into a README.
  - Acceptance: Pasting a basic `<table><tr><th>..` produces a Markdown table with header separator row and pipes; preview displays an HTML table.
- [ ] US2: As a user, if a table contains merged cells (rowspan/colspan) or nested tables, I want it preserved as raw HTML instead of a broken Markdown table.
  - Acceptance: Such a table remains HTML block in markdown output; no structural data loss; preview still renders a table.
- [x] US3: As a user, I want an option in "Conversion Settings" to enable/disable table-to-Markdown conversion.
  - Acceptance: Toggling off leaves all tables as raw HTML in output.
- [x] US4: As a user, I want consistent rendering: the Markdown preview should show the same table layout that GitHub would render.
  - Acceptance: The preview uses the same parser (Marked) for all elements, including tables.
- [ ] US5: As a user, I want special characters inside cells (pipes `|`, backticks, asterisks) properly escaped so the table structure is not corrupted.
  - Acceptance: Output table renders correctly and matches original text content.

## Feedback & UX
- [ ] US6: As a user, if a complex table is left as HTML, I want a brief toast or inline note informing me why conversion was skipped.
  - Acceptance: A single non-intrusive message appears once per conversion containing at least one complex table.
- [ ] US7: As a user, I want to copy/download the output and retain valid table formatting (Markdown or HTML as applicable).
  - Acceptance: Copy & download produce identical text to what is shown in source mode.

## Reliability & Quality
- [ ] US8: As a maintainer, I want the code change isolated (plugin + small wrapper) so students can still follow the codebase easily.
  - Acceptance: New logic confined to a small function / initialization block with comments.
- [ ] US9: As a maintainer, I want graceful failure: if the GFM plugin CDN fails to load, conversion still works (tables just not converted) and a console warning appears.
  - Acceptance: App does not crash; other features remain functional.
- [ ] US10: As a user, I want whitespace inside cells normalized (no multiple unintended line breaks) so tables are readable.
  - Acceptance: Multi-line cell content becomes single spaces unless intentional `<br>` present.

## Extended / Future (Optional)
- [ ] US11: As a user, I want column alignment detection (left, right, numeric) for nicer tables.
- [ ] US12: As a user, I want a dark mode so tables and code blocks are readable at night.
- [ ] US13: As a maintainer, I want a simple test snippet doc to manually verify table scenarios quickly.
- [ ] US14: As a user, I want an inline button to copy just a selected table's Markdown.
- [ ] US15: As a user, I want conversion of definition lists or description-like tables (if encountered) into proper Markdown where feasible.

## Notes
- Initial implementation will likely satisfy US1, partial US5, and lay groundwork for US2.
- Complex features (US11+) intentionally deferred until core stability proven.
