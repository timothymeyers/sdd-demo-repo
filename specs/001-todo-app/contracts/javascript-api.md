# JavaScript API Contract: Simple To-Do Web App

**Feature**: Simple To-Do Web App  
**Branch**: `001-todo-app`  
**Date**: 2026-01-23  
**Format**: JavaScript Function Signatures

## Overview

Since this is a client-side only application with no backend API, this document defines the JavaScript function contracts for task management. These functions serve as the "API" that the UI layer calls to manipulate task state.

---

## Core Task API

### `createTask(text: string): Task | Error`

Creates a new task with the provided text.

**Parameters**:
- `text` (string): Task description, 1-500 characters

**Returns**:
- Success: Task object with generated ID, order, and timestamps
- Failure: Error object with validation message

**Side Effects**:
- Adds task to in-memory `tasks` array
- Updates order values for existing tasks (increment by 1)
- Saves updated state to LocalStorage
- Triggers DOM re-render

**Validation**:
- Text must be non-empty after trimming
- Text length must be ≤500 characters

**Error Conditions**:
- Empty text: `{ error: 'Task cannot be empty' }`
- Text too long: `{ error: 'Task cannot exceed 500 characters' }`
- LocalStorage failure: Warning shown, but task still created in memory

**Example**:
```javascript
const result = createTask('Buy groceries');
// Success: { id: '...', text: 'Buy groceries', completed: false, ... }

const error = createTask('');
// Error: { error: 'Task cannot be empty' }
```

**Source**: FR-001 (spec line 126)

---

### `getTask(id: string): Task | null`

Retrieves a single task by ID.

**Parameters**:
- `id` (string): UUID of the task

**Returns**:
- Success: Task object
- Failure: `null` if task not found

**Side Effects**: None (read-only operation)

**Example**:
```javascript
const task = getTask('550e8400-e29b-41d4-a716-446655440000');
// { id: '...', text: 'Buy groceries', ... }

const notFound = getTask('invalid-id');
// null
```

---

### `getAllTasks(): Task[]`

Retrieves all tasks sorted by display order.

**Parameters**: None

**Returns**: Array of Task objects sorted by `order` field (ascending)

**Side Effects**: None (read-only operation)

**Example**:
```javascript
const tasks = getAllTasks();
// [
//   { id: '...', text: 'Task 1', order: 1, ... },
//   { id: '...', text: 'Task 2', order: 2, ... }
// ]
```

**Source**: FR-002 (spec line 127)

---

### `updateTask(id: string, newText: string): Task | Error`

Updates the text content of an existing task.

**Parameters**:
- `id` (string): UUID of task to update
- `newText` (string): New task description, 1-500 characters

**Returns**:
- Success: Updated Task object
- Failure: Error object with message

**Side Effects**:
- Updates task's `text` field
- Updates task's `updatedAt` timestamp
- Saves to LocalStorage
- Re-renders task in DOM

**Validation**:
- Same as `createTask` (non-empty, ≤500 chars)
- Task must exist

**Error Conditions**:
- Task not found: `{ error: 'Task not found' }`
- Empty text: `{ error: 'Task cannot be empty' }`
- Text too long: `{ error: 'Task cannot exceed 500 characters' }`

**Example**:
```javascript
const updated = updateTask('550e8400-...', 'Buy groceries and milk');
// { id: '550e8400-...', text: 'Buy groceries and milk', updatedAt: 1706026100000, ... }
```

**Source**: FR-006 (spec line 131)

---

### `deleteTask(id: string): Task | Error`

Removes a task from the list.

**Parameters**:
- `id` (string): UUID of task to delete

**Returns**:
- Success: Deleted Task object (for potential undo)
- Failure: Error object with message

**Side Effects**:
- Removes task from `tasks` array
- Recalculates order values for remaining tasks
- Saves to LocalStorage
- Removes task element from DOM

**Error Conditions**:
- Task not found: `{ error: 'Task not found' }`

**Example**:
```javascript
const deleted = deleteTask('550e8400-...');
// { id: '550e8400-...', text: 'Buy groceries', ... }
```

**Source**: FR-005 (spec line 130)

---

### `toggleTaskCompletion(id: string): Task | Error`

Toggles a task's completion status between complete and incomplete.

**Parameters**:
- `id` (string): UUID of task to toggle

**Returns**:
- Success: Updated Task object
- Failure: Error object with message

**Side Effects**:
- Toggles `completed` field (`true` ↔ `false`)
- Updates `updatedAt` timestamp
- Saves to LocalStorage
- Updates visual styling in DOM (adds/removes strikethrough)

**Error Conditions**:
- Task not found: `{ error: 'Task not found' }`

**Example**:
```javascript
const task = toggleTaskCompletion('550e8400-...');
// First call: { id: '...', completed: true, ... }
// Second call: { id: '...', completed: false, ... }
```

**Source**: FR-003, FR-004 (spec lines 128-129)

---

### `reorderTask(id: string, newPosition: number): Task[] | Error`

Moves a task to a new position in the list.

**Parameters**:
- `id` (string): UUID of task to move
- `newPosition` (number): Target position (1 = top, 2 = second, etc.)

**Returns**:
- Success: Updated array of all tasks with new order values
- Failure: Error object with message

**Side Effects**:
- Updates `order` field for moved task and affected tasks
- Updates `updatedAt` for moved task
- Saves to LocalStorage
- Re-renders entire task list in DOM

**Validation**:
- `newPosition` must be between 1 and `tasks.length`
- Task must exist

**Error Conditions**:
- Task not found: `{ error: 'Task not found' }`
- Invalid position: `{ error: 'Invalid position' }`

**Example**:
```javascript
// Move task from position 3 to position 1
const tasks = reorderTask('550e8400-...', 1);
// All tasks with updated order values
```

**Source**: FR-010 (spec line 135)

---

## Storage API

### `loadTasksFromStorage(): Task[]`

Loads tasks from LocalStorage on app initialization.

**Parameters**: None

**Returns**: Array of Task objects (empty array if no data or error)

**Side Effects**:
- Populates in-memory `tasks` array
- Sorts tasks by `order` field
- Sanitizes corrupted data if necessary
- Shows warning if LocalStorage unavailable

**Error Handling**:
- LocalStorage disabled: Returns empty array, shows warning
- Corrupted data: Sanitizes and returns valid tasks, shows warning
- No data: Returns empty array (first-time user)

**Example**:
```javascript
const tasks = loadTasksFromStorage();
// [{ id: '...', text: 'Task 1', ... }, ...]
```

**Source**: FR-014 (spec line 139)

---

### `saveTasksToStorage(): boolean`

Saves current task state to LocalStorage.

**Parameters**: None

**Returns**:
- `true` if save successful
- `false` if save failed (quota exceeded, disabled, etc.)

**Side Effects**:
- Serializes `tasks` array to JSON
- Writes to LocalStorage under key `'todoApp.tasks'`
- Shows warning banner if save fails

**Error Handling**:
- LocalStorage disabled: Shows warning, app continues in-memory mode
- Quota exceeded: Shows warning suggesting to delete old tasks
- Other errors: Shows generic warning

**Example**:
```javascript
const success = saveTasksToStorage();
// true (saved successfully)
// false (save failed, warning shown to user)
```

**Source**: FR-014, FR-015 (spec lines 139-140)

---

## Validation API

### `validateTaskText(text: string): { valid: boolean, error?: string }`

Validates task text for creation or update operations.

**Parameters**:
- `text` (string): Text to validate

**Returns**: Validation result object
- `{ valid: true }` if text is valid
- `{ valid: false, error: 'message' }` if validation fails

**Validation Rules**:
1. Non-empty after trimming whitespace (FR-007)
2. Length ≤500 characters (FR-011)

**Example**:
```javascript
validateTaskText('Buy groceries');
// { valid: true }

validateTaskText('');
// { valid: false, error: 'Task cannot be empty' }

validateTaskText('a'.repeat(501));
// { valid: false, error: 'Task cannot exceed 500 characters' }
```

**Source**: FR-007, FR-011 (spec lines 132, 136)

---

## Summary

This JavaScript API contract defines:
- **5 core CRUD operations**: Create, Read, Update, Delete, Toggle
- **1 reordering operation**: Drag-and-drop support
- **2 storage operations**: Load and Save to LocalStorage
- **Performance targets**: All operations <100ms

All functions are designed to be testable, resilient, user-friendly, and performant.
