---
description: "Task list for Simple To-Do Web App implementation"
---

# Tasks: Simple To-Do Web App

**Feature Branch**: `001-todo-app`  
**Input**: Design documents from `/specs/001-todo-app/`  
**Prerequisites**: plan.md, spec.md, data-model.md, contracts/javascript-api.md, research.md, quickstart.md  
**Architecture**: Single HTML file with embedded CSS and JavaScript  
**Target File**: `index.html` (all tasks modify this single file)

**Tests**: Manual testing approach - no automated test tasks (aligns with lightweight requirement and constitution exception)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `- [ ] [ID] [P?] [Story?] Description`

- **Checkbox**: `- [ ]` (markdown task checkbox)
- **[ID]**: Task identifier (T001, T002, T003...)
- **[P]**: Can run in parallel (different sections, no dependencies)
- **[Story]**: User story label (US1, US2, US3, US4, US5)
- **File path**: All tasks target `index.html`

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Create basic project structure and skeleton HTML file

- [ ] T001 Create index.html with basic HTML5 structure and metadata (title, charset, viewport)
- [ ] T002 Add main container structure with header, input section, and task list sections in index.html
- [ ] T003 Initialize git repository and create .gitignore file for project
- [ ] T004 Create README.md with project description and setup instructions per quickstart.md

**Checkpoint**: Basic HTML structure ready, project initialized

---

## Phase 2: Foundational (Core Infrastructure)

**Purpose**: Implement data model, state management, and storage infrastructure that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T005 [P] Add CSS reset and base styles (variables, fonts, layout) in index.html `<style>` section
- [ ] T006 Implement Task data structure and state management (tasks array, STORAGE_KEY constant) in index.html `<script>` section
- [ ] T007 Implement loadTasksFromStorage() function with error handling and data sanitization in index.html
- [ ] T008 Implement saveTasksToStorage() function with quota exceeded and disabled handling in index.html
- [ ] T009 Implement validateTaskText() function (non-empty, ≤500 chars) in index.html
- [ ] T010 Implement generateTaskId() utility using crypto.randomUUID() with fallback in index.html
- [ ] T011 Implement showWarning() function for displaying error/warning banners in index.html
- [ ] T012 Add initialization code to call loadTasksFromStorage() on DOMContentLoaded in index.html

**Checkpoint**: Foundation ready - data model, storage, validation infrastructure complete

---

## Phase 3: User Story 1 - Create Tasks (Priority: P1) 🎯 MVP

**Goal**: Users can add new tasks to their to-do list and see them appear immediately

**Why P1**: Core value proposition - users need to create tasks before anything else works

**Independent Test**: Open app, type "Buy groceries" in input field, click Add/press Enter, verify task appears in list and persists after refresh

### Implementation for User Story 1

- [ ] T013 [P] [US1] Add HTML markup for task input form (text input, character counter, submit button) in index.html
- [ ] T014 [P] [US1] Style the input form section with CSS (layout, colors, spacing) in index.html `<style>` section
- [ ] T015 [US1] Implement createTask() function (generate ID, set order=1, timestamps, add to array, save) in index.html
- [ ] T016 [US1] Implement renderTaskList() function to display all tasks in DOM in index.html
- [ ] T017 [US1] Add event listener for form submit to call createTask() and clear input in index.html
- [ ] T018 [US1] Implement real-time character counter update on input event in index.html
- [ ] T019 [US1] Add visual feedback for character limit (warning at >450 chars, prevent at 500) in index.html
- [ ] T020 [US1] Add validation to prevent empty task submission with user feedback in index.html
- [ ] T021 [US1] Style task list items with CSS (checkboxes, text, spacing, hover states) in index.html `<style>` section
- [ ] T022 [US1] Add empty state message "No tasks yet. Add one above!" with styling in index.html

**Checkpoint**: User Story 1 complete - users can create tasks and see them in the list. This is the MVP! ✅

**Manual Test Scenarios for US1**:
1. Enter "Buy groceries" and submit → Task appears in list
2. Create second task "Call dentist" → Both tasks visible
3. Try to submit empty task → Validation prevents submission with message
4. Type 500 characters → Counter shows limit, prevents additional input
5. Refresh page → Tasks still visible (LocalStorage persistence)

---

## Phase 4: User Story 2 - Delete Tasks (Priority: P2)

**Goal**: Users can remove tasks they no longer need from their list

**Why P2**: Essential list maintenance - users need to clean up completed or unwanted tasks

**Independent Test**: Create a task, click delete button, verify task is removed and deletion persists after refresh

### Implementation for User Story 2

- [ ] T023 [P] [US2] Add delete button HTML to task item template in renderTaskList() function in index.html
- [ ] T024 [P] [US2] Style delete button with CSS (icon, colors, hover, positioning) in index.html `<style>` section
- [ ] T025 [US2] Implement deleteTask() function (find by ID, remove, recalculate order, save) in index.html
- [ ] T026 [US2] Add event delegation for delete button clicks in index.html
- [ ] T027 [US2] Add confirmation or visual feedback for task deletion in index.html
- [ ] T028 [US2] Update empty state handling when last task is deleted in index.html

**Checkpoint**: User Story 2 complete - users can create AND delete tasks independently ✅

**Manual Test Scenarios for US2**:
1. Given task "Buy groceries", click delete → Task removed from list
2. With multiple tasks, delete one specific task → Only that task removed, others remain
3. Delete last remaining task → Empty state message appears
4. Create and delete tasks → Refresh page → Deleted tasks do not reappear

---

## Phase 5: User Story 3 - Mark Tasks Complete (Priority: P2)

**Goal**: Users can mark tasks as complete/incomplete with visual distinction (strikethrough)

**Why P2**: Core to-do functionality - tracking completion status is fundamental to task management

**Independent Test**: Create a task, click checkbox to mark complete (text gets strikethrough), click again to unmark

### Implementation for User Story 3

- [ ] T029 [P] [US3] Add checkbox input to task item template in renderTaskList() function in index.html
- [ ] T030 [P] [US3] Style completed tasks with CSS (strikethrough, opacity, checkbox styling) in index.html `<style>` section
- [ ] T031 [US3] Implement toggleTaskCompletion() function (find by ID, toggle completed, update timestamp, save) in index.html
- [ ] T032 [US3] Add event delegation for checkbox change events in index.html
- [ ] T033 [US3] Update renderTaskList() to apply completed styling based on task.completed state in index.html
- [ ] T034 [US3] Add smooth CSS transition for completion state changes in index.html `<style>` section

**Checkpoint**: User Story 3 complete - users can create, delete, AND complete tasks independently ✅

**Manual Test Scenarios for US3**:
1. Given incomplete task "Buy groceries", click checkbox → Task shows strikethrough
2. Given completed task, click checkbox again → Strikethrough removed
3. With multiple tasks in mixed states → Completed and incomplete clearly distinguishable
4. Mark task complete → Refresh page → Task still shows as completed

---

## Phase 6: User Story 4 - Edit Tasks (Priority: P3)

**Goal**: Users can modify task text without deleting and recreating

**Why P3**: Convenience feature - editing improves UX but users can work around with delete/recreate

**Independent Test**: Create task with typo "Buy grocieres", double-click to edit, change to "Buy groceries", verify change persists

### Implementation for User Story 4

- [ ] T035 [P] [US4] Add edit button HTML to task item template in renderTaskList() function in index.html
- [ ] T036 [P] [US4] Style edit button and edit mode UI (inline input, save/cancel buttons) in index.html `<style>` section
- [ ] T037 [US4] Implement editTask() function to show inline edit input with current text in index.html
- [ ] T038 [US4] Implement updateTask() function (find by ID, validate new text, update text and timestamp, save) in index.html
- [ ] T039 [US4] Add event delegation for edit button clicks and double-click on task text in index.html
- [ ] T040 [US4] Implement edit mode with save/cancel functionality in index.html
- [ ] T041 [US4] Add validation in edit mode (prevent empty text, respect 500 char limit) in index.html
- [ ] T042 [US4] Add character counter for edit mode input field in index.html
- [ ] T043 [US4] Handle Escape key to cancel edit and Enter key to save in index.html

**Checkpoint**: User Story 4 complete - users have full CRUD operations on tasks ✅

**Manual Test Scenarios for US4**:
1. Given task "Buy grocieres", click edit, change to "Buy groceries" → Task text updates
2. While editing, click cancel → Original text remains unchanged
3. Try to save empty text → Validation prevents saving with message
4. Edit task with 400 chars, try to add more → Counter shows limit enforcement
5. Edit task → Refresh page → Edited text persists

---

## Phase 7: User Story 5 - Reorder Tasks (Priority: P4)

**Goal**: Users can manually reorder tasks by dragging, with newest tasks appearing at top by default

**Why P4**: Nice-to-have feature - default ordering handles most cases, manual reordering is enhancement

**Independent Test**: Create 3 tasks, drag task from position 3 to position 1, refresh page, verify new order persists

### Implementation for User Story 5

- [ ] T044 [P] [US5] Add draggable="true" attribute to task items in renderTaskList() function in index.html
- [ ] T045 [P] [US5] Style drag-and-drop states (dragging, drag-over, drop-target) in index.html `<style>` section
- [ ] T046 [US5] Implement handleDragStart() event handler to store dragged task ID in index.html
- [ ] T047 [US5] Implement handleDragOver() event handler to allow drop and show visual feedback in index.html
- [ ] T048 [US5] Implement handleDragLeave() event handler to remove visual feedback in index.html
- [ ] T049 [US5] Implement handleDrop() event handler to reorder tasks array in index.html
- [ ] T050 [US5] Implement reorderTask() function (calculate new order values, update timestamps, save) in index.html
- [ ] T051 [US5] Add event listeners for all drag-and-drop events (dragstart, dragover, dragleave, drop, dragend) in index.html
- [ ] T052 [US5] Ensure new tasks appear at top (order=1) by incrementing existing task orders in createTask() in index.html
- [ ] T053 [US5] Add smooth visual transition when tasks reorder in index.html `<style>` section

**Checkpoint**: User Story 5 complete - all P1-P4 features fully functional ✅

**Manual Test Scenarios for US5**:
1. With multiple tasks, drag task from position 3 to position 1 → Task moves to top, others shift
2. Reorder tasks → Refresh page → Custom order persists
3. Create new task → New task appears at top of list by default
4. Drag task down the list → Visual feedback shows drop target
5. Complete task, then drag it → Reordering works regardless of completion state

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Refinements, edge cases, and improvements affecting all user stories

- [ ] T054 [P] Add responsive CSS for mobile devices (<640px) with touch-friendly targets in index.html `<style>` section
- [ ] T055 [P] Add CSS transitions and animations for smooth interactions (task creation, deletion, reordering) in index.html `<style>` section
- [ ] T056 [P] Add ARIA labels and semantic HTML for accessibility in index.html
- [ ] T057 Implement graceful LocalStorage failure banner (persistent warning, dismiss button) in index.html
- [ ] T058 Add loading state handling during initial data load in index.html
- [ ] T059 Optimize performance for 100+ tasks (event delegation, efficient re-renders) in index.html
- [ ] T060 Add data sanitization for special characters and HTML/script tags in task text in index.html
- [ ] T061 Add visual feedback for all user actions (success states, error states) in index.html
- [ ] T062 Test and fix edge cases: rapid clicking, special characters, emoji support in index.html
- [ ] T063 Add keyboard shortcuts documentation (Enter to submit, Escape to cancel edit) in index.html comments
- [ ] T064 [P] Update README.md with complete feature list and usage instructions
- [ ] T065 [P] Validate quickstart.md instructions work end-to-end
- [ ] T066 Code cleanup: Add comments, consistent formatting, remove console.logs in index.html
- [ ] T067 Final cross-browser testing (Chrome, Firefox, Safari, Edge) and fixes in index.html

**Checkpoint**: All user stories polished, edge cases handled, production-ready ✅

---

## Dependencies & Execution Order

### Phase Dependencies

```text
Phase 1 (Setup)
    ↓
Phase 2 (Foundational) ← BLOCKS all user stories
    ↓
Phase 3 (US1 - Create) ← MVP / P1 🎯
    ↓ (can run in parallel with P2 stories)
Phase 4 (US2 - Delete) ← P2
    ↓ (can run in parallel with other P2 story)
Phase 5 (US3 - Complete) ← P2
    ↓
Phase 6 (US4 - Edit) ← P3
    ↓
Phase 7 (US5 - Reorder) ← P4
    ↓
Phase 8 (Polish)
```

### User Story Dependencies

- **User Story 1 (P1 - Create)**: Depends on Phase 2 completion - NO dependencies on other stories
- **User Story 2 (P2 - Delete)**: Depends on US1 (need tasks to delete) - Can start once US1 complete
- **User Story 3 (P2 - Complete)**: Depends on US1 (need tasks to complete) - Can run in parallel with US2
- **User Story 4 (P3 - Edit)**: Depends on US1 (need tasks to edit) - Independent of US2/US3
- **User Story 5 (P4 - Reorder)**: Depends on US1 (need tasks to reorder) - Can integrate with all previous stories

### Within Each User Story

For all user stories in this single-file architecture:
1. HTML markup and CSS styling (marked [P]) can be done in parallel
2. JavaScript implementation follows markup/styling
3. Event listeners and integration come last
4. Test story independently before moving to next priority

### Parallel Opportunities

**Setup Phase**:
- T001 (HTML structure), T003 (git init), T004 (README) can run in parallel

**Foundational Phase**:
- T005 (CSS), T006 (data structure), T009 (validation), T010 (generateID), T011 (warnings) can run in parallel
- T007, T008, T012 must run sequentially (storage functions interdependent)

**Within Each User Story**:
- HTML + CSS tasks marked [P] can run in parallel
- JavaScript functions can be implemented after markup is ready

**Polish Phase**:
- T054 (responsive), T055 (animations), T056 (a11y), T064 (README), T065 (quickstart) can run in parallel

**Note**: Single-file architecture means parallel work is within separate sections (HTML/CSS/JS), not separate files

---

## Parallel Example: User Story 1 (Create Tasks)

```bash
# Can work simultaneously on different sections:
Parallel Task 1: T013 - Add HTML markup for input form (HTML section)
Parallel Task 2: T014 - Style the input form (CSS section)

# Then sequential:
Task: T015 - Implement createTask() function (needs HTML structure)
Task: T016 - Implement renderTaskList() function
Task: T017 - Add form submit event listener (needs createTask function)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. **Complete Phase 1**: Setup (T001-T004) → ~30 min
2. **Complete Phase 2**: Foundational (T005-T012) → ~3-4 hours
3. **Complete Phase 3**: User Story 1 (T013-T022) → ~3-4 hours
4. **STOP and VALIDATE**: Test US1 independently with manual scenarios
5. **Deploy/Demo**: You have a working task creation app! 🎉

**MVP Deliverable**: Users can create tasks, see them in a list, and tasks persist across sessions.

### Incremental Delivery

1. **Foundation** (Phase 1+2) → Data model and storage work
2. **+ User Story 1** (Phase 3) → Can create tasks ✅ MVP
3. **+ User Story 2** (Phase 4) → Can delete tasks ✅ 
4. **+ User Story 3** (Phase 5) → Can complete tasks ✅ Full to-do functionality
5. **+ User Story 4** (Phase 6) → Can edit tasks ✅ Full CRUD
6. **+ User Story 5** (Phase 7) → Can reorder tasks ✅ Complete feature
7. **+ Polish** (Phase 8) → Production ready ✅

Each increment adds value without breaking previous functionality.

### Parallel Team Strategy

With multiple developers working on single file:

**Strategy**: Sequential by user story (single file reduces parallel options)

1. **Together**: Complete Setup + Foundational (Phase 1+2)
2. **Developer A**: User Story 1 (Phase 3) → Commit
3. **Developer B**: User Story 2 (Phase 4) → Rebase on A's work → Commit  
4. **Developer C**: User Story 3 (Phase 5) → Rebase on B's work → Commit

**Alternative**: Split by sections if experienced team:
- **Dev A**: HTML structure + CSS styling for multiple stories
- **Dev B**: JavaScript functions and event handlers
- **Dev C**: Testing, edge cases, polish

---

## Testing Strategy (Manual)

### Why Manual Testing

Per constitution exception and plan.md (lines 45-47):
- Automated testing framework would violate "lightweight as possible" requirement
- Would add dependencies (Jest, Playwright) and build steps
- Manual testing with comprehensive scenarios acceptable for demo project

### Test Checklist Location

Manual test scenarios documented in this file under each user story's "Checkpoint" section.

Additional comprehensive test checklist: `specs/001-todo-app/checklists/manual-testing.md` (to be created during Phase 8)

### Test Execution

After completing each user story phase:
1. Execute all manual test scenarios for that story
2. Verify independent functionality (story works without later stories)
3. Check persistence (refresh page, restart browser)
4. Test edge cases from spec.md (lines 113-121)
5. Document any issues found

### Cross-Browser Testing

During Phase 8, test on:
- ✅ Chrome 90+ (2021)
- ✅ Firefox 88+ (2021)
- ✅ Safari 14+ (2020)
- ✅ Edge 90+ (2021)

---

## Performance Targets

Per spec.md success criteria (lines 155-163):

- **SC-001**: Create task in <5 seconds from app open ✅
- **SC-002**: Mark complete/incomplete in 1 click ✅
- **SC-003**: Delete task in 1 click ✅
- **SC-004**: Edit and save task in <10 seconds ✅
- **SC-005**: Actions respond within 100ms ✅
- **SC-007**: Handle 100 tasks without degradation ✅
- **SC-008**: Tasks persist across sessions ✅

Monitor during development and optimize in Phase 8 if needed.

---

## Edge Cases to Handle

From spec.md (lines 113-121):

1. **Character limit** (FR-013): Prevent input >500 chars, show warning state (T019)
2. **Rapid task creation**: Multiple quick clicks on Add button (T062)
3. **Special characters**: Emojis, quotes, HTML tags in task text (T060)
4. **Race conditions**: Edit + delete simultaneously (T062)
5. **LocalStorage failure**: Disabled, quota exceeded, unavailable (T057)
6. **Corrupted data**: Malformed LocalStorage data recovery (T007, data sanitization)

Address these during Phase 8 (Polish).

---

## File Structure

```text
demo-to-do-agent-assignment/
├── index.html                    # Complete application (target of all tasks)
├── README.md                     # Project documentation (T004, T064)
├── .gitignore                    # Git ignore patterns (T003)
├── .specify/                     # Planning and agent configuration
└── specs/001-todo-app/          # Feature specifications
    ├── spec.md                   # Feature requirements
    ├── plan.md                   # Implementation plan  
    ├── data-model.md            # Task entity structure
    ├── contracts/
    │   └── javascript-api.md    # API specifications
    ├── research.md              # Technology decisions
    ├── quickstart.md            # Setup instructions
    ├── tasks.md                 # This file
    └── checklists/              # Manual test checklists (Phase 8)
```

**Note**: Single-file architecture means all 67 tasks modify the same `index.html` file (different sections).

---

## Summary

**Total Tasks**: 67 tasks
- **Phase 1 (Setup)**: 4 tasks
- **Phase 2 (Foundational)**: 8 tasks (CRITICAL PATH)
- **Phase 3 (US1 - Create)**: 10 tasks (MVP - P1) 🎯
- **Phase 4 (US2 - Delete)**: 6 tasks (P2)
- **Phase 5 (US3 - Complete)**: 6 tasks (P2)
- **Phase 6 (US4 - Edit)**: 9 tasks (P3)
- **Phase 7 (US5 - Reorder)**: 10 tasks (P4)
- **Phase 8 (Polish)**: 14 tasks

**User Stories**:
- **US1 (P1)**: Create Tasks - 10 tasks ✅ MVP
- **US2 (P2)**: Delete Tasks - 6 tasks
- **US3 (P2)**: Mark Complete - 6 tasks
- **US4 (P3)**: Edit Tasks - 9 tasks
- **US5 (P4)**: Reorder Tasks - 10 tasks

**Parallel Opportunities**: 15+ tasks marked [P] can run in parallel within their phases

**MVP Scope**: Phase 1 (Setup) + Phase 2 (Foundational) + Phase 3 (US1) = 22 tasks → Working task creation app

**Suggested Timeline**:
- MVP (US1): 8-10 hours
- +US2, US3 (P2): +6-8 hours → Full to-do functionality
- +US4 (P3): +4-5 hours → Full CRUD
- +US5 (P4): +4-5 hours → Complete feature
- +Polish: +4-6 hours → Production ready
- **Total**: 26-34 hours development time

**Format Validation**: ✅ All tasks follow checklist format: `- [ ] T### [P?] [Story?] Description with file path`

---

**Ready for Implementation!** 🚀

Start with Phase 1 (Setup), complete Phase 2 (Foundational - critical path), then implement user stories in priority order (P1 → P2 → P3 → P4).
