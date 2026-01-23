# Simple To-Do Web App

A lightweight, single-file web application for managing to-do tasks with zero dependencies.

GH Copilot Agent Issue Assignment demo creating a To-Do app.

## Features

- ✅ Create, edit, and delete tasks
- ✅ Mark tasks as complete/incomplete with visual strikethrough
- ✅ Character counter (500 character limit per task)
- ✅ Drag-and-drop task reordering
- ✅ LocalStorage persistence (tasks survive browser restarts)
- ✅ Responsive design for mobile and desktop
- ✅ Zero dependencies - pure vanilla JavaScript

## Quick Start

### Prerequisites
- A modern web browser (Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+)
- Python 3.x (for running a local server) OR Node.js

### Running the App

**Option 1: Using Python (Recommended)**
```bash
cd /path/to/demo-to-do-agent-assignment
python -m http.server 8000
```

Then open your browser to: **http://localhost:8000**

**Option 2: Using Node.js**
```bash
cd /path/to/demo-to-do-agent-assignment
npx http-server -p 8000
```

Then open your browser to: **http://localhost:8000**

**Option 3: Direct File Access**
Simply double-click `index.html` to open it in your browser.
Note: LocalStorage may have limited functionality with `file://` protocol.

## Usage

1. **Create a Task**: Type in the input field and click "Add Task" or press Enter
2. **Complete a Task**: Click the checkbox next to a task to mark it complete
3. **Edit a Task**: Click the edit button or double-click the task text
4. **Delete a Task**: Click the delete button (×) on a task
5. **Reorder Tasks**: Drag and drop tasks to change their order

## Architecture

This is a single-file application containing:
- HTML structure
- CSS styling (embedded in `<style>` tag)
- JavaScript logic (embedded in `<script>` tag)

**Total Size**: ~600 lines of code
**Dependencies**: None
**Storage**: Browser LocalStorage API

## Browser Compatibility

- Chrome/Edge 90+ (2021)
- Firefox 88+ (2021)
- Safari 14+ (2020)

## Data Storage

Tasks are stored locally in your browser using the LocalStorage API. Data is:
- Persisted across browser sessions
- Never sent to any server
- Specific to this domain/origin
- Cleared only when you clear browser data

## Technical Details

- **Language**: Vanilla JavaScript (ES6+)
- **Storage**: LocalStorage with graceful degradation
- **Capacity**: Handles 100+ tasks without performance degradation
- **Response Time**: <100ms for all user actions
- **File Size**: Single HTML file (~20-30KB)

## Project Structure

```
demo-to-do-agent-assignment/
├── index.html          # Complete application (HTML + CSS + JS)
├── README.md           # This file
├── .gitignore          # Git ignore patterns
└── specs/              # Feature specifications and design documents
    └── 001-todo-app/
        ├── spec.md              # Feature requirements
        ├── plan.md              # Implementation plan
        ├── data-model.md        # Data structures
        ├── contracts/           # API specifications
        ├── research.md          # Technology decisions
        ├── quickstart.md        # Setup instructions
        └── tasks.md             # Implementation tasks
```

## Custom Agents

This repository includes custom GitHub Copilot agents:

- **python-expert** - Expert Python developer agent following best practices, using PyTest, and leveraging Context7 for documentation lookup
- **speckit agents** - Workflow agents for feature specification and planning

## License

See LICENSE file for details.

## Next Steps

For detailed implementation information, see:
- **Quickstart Guide**: `specs/001-todo-app/quickstart.md`
- **Feature Specification**: `specs/001-todo-app/spec.md`
- **Implementation Plan**: `specs/001-todo-app/plan.md`
