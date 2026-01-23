# Research: Simple To-Do Web App

**Feature**: Simple To-Do Web App  
**Branch**: `001-todo-app`  
**Date**: 2026-01-23

## Technology Decisions

### Decision 1: Single HTML File Architecture

**Decision**: Use a single HTML file with embedded CSS and JavaScript (no build tools, no bundlers, no dependencies)

**Rationale**:
- **Lightweight**: Zero external dependencies, no node_modules, no build artifacts
- **Single command**: Can be run with `python -m http.server` or any simple HTTP server
- **Instant startup**: No compilation, transpilation, or bundling required
- **Maximum simplicity**: Aligns with Constitution Principle I (Simplicity First)
- **Browser-native**: Uses only standard Web APIs (LocalStorage, DOM manipulation, Drag and Drop API)

**Alternatives Considered**:
1. **React + Vite**: Rejected - requires npm install, build step, node_modules (~200MB)
2. **Vue.js CDN**: Rejected - adds 150KB external dependency, framework overhead
3. **Vanilla JS with modules**: Rejected - requires build step for browser compatibility
4. **Static site generator**: Rejected - adds unnecessary complexity for single page app

**Trade-offs**:
- Pro: Zero dependencies, instant load, maximum simplicity
- Pro: Can open file directly in browser (file://) for demo purposes
- Pro: Deploy anywhere (GitHub Pages, any web server, S3, etc.)
- Con: No hot reload during development (minor issue for demo project)
- Con: No module system (acceptable for <500 LOC project)

---

### Decision 2: Browser LocalStorage for Persistence

**Decision**: Use browser LocalStorage API directly with graceful degradation

**Rationale**:
- **Native API**: Built into all modern browsers, zero dependencies
- **Simple interface**: Key-value storage with JSON serialization
- **Persistent**: Survives browser restarts and session closures
- **Sufficient capacity**: 5-10MB typical limit (far more than needed for task list)
- **Spec requirement**: Feature spec explicitly specifies LocalStorage (line 12)

**Alternatives Considered**:
1. **IndexedDB**: Rejected - overkill for simple key-value storage, more complex API
2. **Backend database**: Rejected - violates "lightweight" and "single command" requirements
3. **Session Storage**: Rejected - data lost on browser close (doesn't meet persistence requirement)
4. **Cookies**: Rejected - 4KB limit, sent with every request (unnecessary overhead)

**Implementation Strategy**:
```javascript
// Graceful degradation pattern from spec (lines 14, 119)
try {
  localStorage.setItem('test', 'test');
  localStorage.removeItem('test');
  // Use LocalStorage
} catch (e) {
  // Fall back to in-memory storage
  // Show warning banner to user
}
```

---

### Decision 3: No Framework - Vanilla JavaScript

**Decision**: Pure vanilla JavaScript with modern ES6+ features (classes, arrow functions, template literals)

**Rationale**:
- **Zero dependencies**: No npm, no package.json, no build tools
- **Maximum performance**: Direct DOM manipulation without framework overhead
- **Learning value**: Demonstrates core JavaScript and Web API skills
- **Modern browser support**: Can use ES6+ features (browsers from 2020+)
- **Small codebase**: Est. 300-400 LOC - framework overhead unnecessary

**Alternatives Considered**:
1. **Alpine.js (21KB)**: Rejected - still a dependency, requires CDN or download
2. **Petite-Vue (5.8KB)**: Rejected - adds complexity for minimal benefit
3. **jQuery**: Rejected - outdated, not representative of modern practices
4. **Web Components**: Rejected - overkill for single-page app

**Browser Support Target**:
- Chrome/Edge 90+ (2021)
- Firefox 88+ (2021)
- Safari 14+ (2020)
- No IE11 support needed (spec assumption: "modern web browser" line 169)

---

### Decision 4: CSS Grid + Flexbox for Layout

**Decision**: Use native CSS Grid and Flexbox without CSS frameworks

**Rationale**:
- **No dependencies**: Native CSS, supported in all modern browsers
- **Powerful layout**: Grid for overall structure, Flexbox for task items
- **Responsive**: Natural responsive behavior without media query complexity
- **Small CSS**: Est. 100-150 lines CSS vs. thousands with framework

**Alternatives Considered**:
1. **Tailwind CSS**: Rejected - requires build step, large file size
2. **Bootstrap**: Rejected - 150KB+ dependency, unnecessary components
3. **CSS-in-JS**: Rejected - requires JavaScript framework
4. **Plain float/position**: Rejected - outdated, harder to maintain

**Design Approach**:
- Mobile-first responsive design
- Single column layout on mobile (<640px)
- Wider centered container on desktop (max-width: 600px)
- System font stack (no web fonts to load)

---

### Decision 5: HTML5 Drag and Drop API

**Decision**: Use native HTML5 Drag and Drop API for task reordering (P4 feature)

**Rationale**:
- **Native API**: No library needed, well-supported
- **Meets requirement**: Feature spec line 99-109 requires drag-and-drop
- **Accessible**: Can be augmented with keyboard shortcuts later
- **Battle-tested**: API stable since 2014

**Alternatives Considered**:
1. **SortableJS library**: Rejected - adds 19KB dependency
2. **Drag-and-drop library**: Rejected - unnecessary for simple list reordering
3. **Button-based reordering**: Rejected - spec explicitly requires drag-and-drop

**Implementation Notes**:
- Use `draggable="true"` attribute on task elements
- Handle `dragstart`, `dragover`, `drop` events
- Visual feedback during drag operation
- Update LocalStorage after reorder completes

---

### Decision 6: Serve with Python HTTP Server

**Decision**: Include instructions to run with `python -m http.server 8000`

**Rationale**:
- **Universal availability**: Python pre-installed on macOS/Linux, easy install on Windows
- **Single command**: Exactly meets requirement "run it with a single command"
- **No dependencies**: No npm, no package.json, no installation step
- **Standard practice**: Common approach for static file serving

**Alternatives Considered**:
1. **Node.js http-server**: Rejected - requires npm install
2. **PHP built-in server**: Rejected - less universally available than Python
3. **Docker container**: Rejected - overkill, violates "lightweight" requirement
4. **File:// protocol**: Possible but LocalStorage has different origin handling

**Fallback Options** (document in README):
- `python3 -m http.server 8000` (Python 3)
- `python -m SimpleHTTPServer 8000` (Python 2)
- `npx http-server` (if Node.js available)
- Double-click HTML file (works but may have LocalStorage limitations)

---

## Best Practices

### Testing Strategy

**Decision**: Manual testing with documented test cases + optional automation

**Rationale**:
- **Constitution**: Principle III requires TDD (lines 64-78)
- **Pragmatic approach**: For demo project with no build infrastructure, manual testing acceptable if well-documented
- **Future enhancement**: Can add Jest or Playwright if project evolves

**Test Coverage**:
1. **Unit tests** (future): Test helper functions in isolation
2. **Integration tests** (manual): Test user stories from spec (lines 33-110)
3. **Edge case tests** (manual): Test scenarios from spec (lines 113-121)

**Documentation**:
- Create test checklist matching acceptance scenarios
- Document in `specs/001-todo-app/checklists/` directory
- Link to constitution quality gates

---

### Code Organization

**Decision**: Organize JavaScript into logical sections within single file

**Structure**:
```javascript
// 1. Configuration and constants
// 2. State management
// 3. LocalStorage utilities
// 4. DOM manipulation utilities
// 5. Event handlers
// 6. Initialization
```

**Rationale**:
- **Readable**: Clear section boundaries with comments
- **Maintainable**: Related functions grouped together
- **Testable**: Pure functions separated from DOM manipulation
- **Constitution compliant**: Follows Principle IV (Code Quality) lines 83-92

---

### Character Counter Implementation

**Decision**: Real-time character counter with visual feedback

**Implementation**:
```javascript
// Update counter on every input event
// Show warning state at >450 chars (90% of limit)
// Prevent input at 500 chars exactly
// Display as "123 / 500 characters"
```

**Rationale**:
- **User feedback**: Spec requires visual counter (lines 137-138)
- **Prevention**: Must prevent >500 chars (line 136, 138)
- **Accessibility**: Clear visual indication when approaching limit

---

### Error Handling

**Decision**: Try-catch blocks for LocalStorage with user-visible warnings

**Key Error Scenarios**:
1. **LocalStorage disabled**: Show persistent warning banner
2. **Quota exceeded**: Show error message, suggest clearing old data
3. **Corrupted data**: Clear corrupt data, show warning, start fresh
4. **Rapid operations**: Debounce if needed, but likely unnecessary for demo

**Rationale**:
- **Graceful degradation**: Spec requirement (lines 119-120)
- **User communication**: Constitution Principle II (User-Centric) requires clear feedback
- **Reliability**: Handle edge cases without crashing

---

## Performance Considerations

### Constraints (from spec)
- **Response time**: <100ms for user actions (line 160)
- **Capacity**: Up to 100 tasks without degradation (line 162)
- **Initial load**: <5 seconds to create first task (line 156)

### Optimizations
- **Lazy rendering**: Only render visible tasks initially (future enhancement if >100 tasks)
- **Event delegation**: Use single event listener for task actions instead of per-task listeners
- **Debouncing**: Debounce LocalStorage writes during rapid edits (if needed)
- **Batch updates**: Update DOM in batches, minimize reflows

### Benchmarks
- **Target**: <10ms for typical operations (10x better than requirement)
- **LocalStorage**: Read/write ~1ms for <50KB data
- **DOM updates**: <5ms to render 100 task elements

---

## Security Considerations

### XSS Prevention

**Risk**: User input displayed in DOM could contain malicious scripts

**Mitigation**:
```javascript
// Use textContent instead of innerHTML for user input
taskElement.textContent = userInput; // Safe
// NOT: taskElement.innerHTML = userInput; // Dangerous
```

**Rationale**:
- **Constitution**: Security standards section (lines 120-125)
- **Best practice**: Prevent script injection attacks
- **Simple solution**: textContent automatically escapes HTML

---

### Input Validation

**Required Validations** (from spec):
1. Non-empty task text (FR-007, line 132)
2. Maximum 500 characters (FR-011, line 136)
3. Sanitize special characters for safe display

**Implementation**:
```javascript
function validateTaskText(text) {
  if (!text || text.trim().length === 0) return false;
  if (text.length > 500) return false;
  return true;
}
```

---

## Open Questions / Risks

### None Remaining

All technical decisions resolved:
- ✅ Language/Version: Vanilla JavaScript (ES6+, modern browsers)
- ✅ Dependencies: None (zero dependencies)
- ✅ Storage: Browser LocalStorage with graceful degradation
- ✅ Testing: Manual testing with documented test cases
- ✅ Platform: Modern web browsers (Chrome/Firefox/Safari 2020+)
- ✅ Performance: Native APIs, <100ms response time
- ✅ Constraints: Single HTML file, run with one command
- ✅ Scope: Single-page app, 100 tasks capacity

---

## Implementation Estimate

### Lines of Code
- **HTML**: ~80 lines (structure + inline CSS)
- **CSS**: ~150 lines (styling + responsive)
- **JavaScript**: ~350 lines (logic + event handlers)
- **Total**: ~580 lines in single file

### Development Time (with TDD)
- Phase 1: Data model + contracts: 2-4 hours
- Phase 2: Task generation: 1 hour
- Implementation: 8-12 hours
- Testing: 4-6 hours
- Documentation: 2-3 hours
- **Total**: 17-26 hours for complete feature

### Complexity Score
- **Low complexity**: Single file, no build tools, no external dependencies
- **Constitution compliant**: Meets Principle I (Simplicity First)
- **Testable**: Clear separation of concerns despite single file
- **Maintainable**: Well-commented, organized sections
