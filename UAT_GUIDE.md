# User Acceptance Testing (UAT) Guide

Friendly step‑by‑step checklist for verifying core features described in `USER_STORIES.md`.

> Tip: Open this file side-by-side with the app in your browser. Check items as you confirm them.

## 1. Test Environment
- Modern browser (Chrome / Firefox / Edge / Safari latest).
- Local copy of the repo (open `index.html` directly) OR deployed GitHub Pages version.
- Stable internet (for CDN scripts). Optional: one test with network throttled/offline (for US9).

## 2. Quick Start
1. Open `index.html` in a browser.
2. Confirm title: "Rich Text to Markdown" and status shows "Ready to convert".
3. Ensure you are in HTML → Markdown mode (default). If not, use the toggle button.

## 3. Test Data Snippets
Use these prepared snippets when a step calls for them.

### A. Simple Table (No Merged Cells)
```
<table>
  <tr><th>Lang</th><th>Level</th></tr>
  <tr><td>Python</td><td>Easy</td></tr>
  <tr><td>C++</td><td>Medium</td></tr>
</table>
```

### B. Complex Table (Has Colspan)
```
<table>
  <tr><th colspan="2">Stats</th></tr>
  <tr><td>Time</td><td>1s</td></tr>
  <tr><td>Memory</td><td>256MB</td></tr>
</table>
```

### C. Table With Special Characters
```
<table>
  <tr><th>Symbol</th><th>Description</th></tr>
  <tr><td>| pipe</td><td>Used to separate columns</td></tr>
  <tr><td>* asterisk *</td><td>Emphasis marker</td></tr>
</table>
```

### D. Mixed Content (Lists, Code, Links)
```
<p>Problem Constraints:</p>
<ul>
  <li>1 &lt;= T &lt;= 100</li>
  <li>N up to 10<sup>5</sup></li>
</ul>
<pre><code>Sample Input\n2\n3 4\n</code></pre>
<p>Reference: <a href="https://www.codechef.com">CodeChef</a></p>
```

---
## 4. Test Cases (Core User Stories)
Mark each as Pass (✅) or Fail (❌). Add notes if failing.

### US1 – Simple Table Converts to GFM
- [ ] Step 1: Paste Simple Table snippet into the rich text editor.
- [ ] Step 2: Click Convert.
- [ ] Step 3: Switch Converted Output view to "Markdown".
- [ ] Expect: Markdown table with header separator line like `| Lang | Level |` then `| --- | --- |` appears.
- [ ] Step 4: Switch to "Preview".
- [ ] Expect: Proper HTML table rendering (rows & columns aligned).

### US2 – Complex Table Preserved (If Implemented in This Phase)
> If not yet implemented, mark as Deferred.
- [ ] Paste Complex Table snippet and Convert.
- [ ] Expect (future Phase 2): Table appears as raw HTML block in Markdown (no malformed pipes). If currently converted, note behavior.

### US3 – Toggle Table Conversion
- [ ] Locate "Convert Tables" setting (if added). Toggle OFF.
- [ ] Re-run conversion with Simple Table.
- [ ] Expect: Raw `<table>` HTML instead of Markdown table.
- [ ] Toggle ON again; reconvert → returns to Markdown table output.

### US4 – Preview Consistency
- [ ] After a successful table conversion, copy Markdown output.
- [ ] Paste into a GitHub comment / gist preview (optional) or any GFM viewer.
- [ ] Expect: Rendered table matches in-app preview (no structural differences).

### US5 – Cell Escaping (Special Characters)
- [ ] Convert Table With Special Characters.
- [ ] Expect: Pipes inside cell text are escaped (e.g., `\|`) OR table structure intact without breaking columns.
- [ ] Asterisks inside cells do not unintentionally bold text unless originally intended.

### US6 – Complex Table Notification (Phase 2+)
- [ ] Convert Complex Table.
- [ ] Expect: One toast or inline info explaining conversion skipped due to complexity (rowspan/colspan).

### US7 – Copy & Download Integrity
- [ ] With a converted Markdown table shown, click Copy.
- [ ] Paste into a plain text editor → Expect identical Markdown table.
- [ ] Click Download → Open `.md` file → Expect same content.

### US8 – Isolated Change (Maintainer Check)
- [ ] Inspect `script.js` diff (Git tools) → Table logic confined to small, commented section; rest unchanged.

### US9 – CDN Failure Graceful Degradation
- [ ] Simulate by disabling network after page load OR blocking the GFM plugin URL in DevTools.
- [ ] Convert Simple Table.
- [ ] Expect: No crash; table may not convert → output is plain text / raw HTML; console shows warning (developer tools).

### US10 – Whitespace Normalization
- [ ] Paste a table where a cell has multiple spaces or line breaks (modify Simple Table cell: `Python   \n` with extra spaces).
- [ ] Convert.
- [ ] Expect: Cell content in Markdown is single-spaced (no random extra blank lines).

---
## 5. Regression (Non-Table Content)
- [ ] Headings (#, ##, ###) convert as before.
- [ ] Lists remain intact (bullets preserved).
- [ ] Inline code & fenced code blocks unaffected.
- [ ] Links still preserved/removed based on setting.
- [ ] Images still convert (if enabled).

---
## 6. Optional Extended (Future Stories)
Mark N/A if not in scope yet.
- [ ] Alignment heuristics (numeric right-align) working (US11).
- [ ] Dark mode toggles table styles (US12).
- [ ] Maintainer test snippet doc exists (US13).
- [ ] Per-table copy button present (US14).
- [ ] Definition-style tables converted (US15).

---
## 7. Recording Results
Recommended outcome notation:
```
US1: ✅ – Works as expected
US2: Deferred – Not in Phase 1 scope
US5: ❌ – Pipes not escaped, breaks table (needs fix)
```

Store UAT session notes in a dated file (e.g., `UAT_RESULTS_2025-09-05.md`).

## 8. Pass Criteria Summary
A release is considered UAT-ready if:
- US1, US3, US4, US5 (basic escaping), US7 pass.
- Any deferred stories explicitly labeled.
- No regression failures in Section 5.

---
## 9. Quick Troubleshooting
| Symptom | Possible Cause | Action |
|---------|----------------|--------|
| Table not converting | Plugin not loaded / toggle off | Check console, verify setting ON |
| Preview differs from GitHub | Preview not using Marked | Confirm implementation of Phase 1 Step P1-05 |
| Broken columns | Unescaped pipes | Implement/verify escape logic (Phase 2) |
| App crash on convert | JS error in new rule | Revert table rule, re-test |

---
## 10. Feedback Loop
After test: create issues for each failed or deferred case, referencing user story ID and attaching the exact input snippet.

Happy testing! ✅
