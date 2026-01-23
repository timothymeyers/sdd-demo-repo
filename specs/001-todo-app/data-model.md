# Data Model: Simple To-Do Web App

**Feature**: Simple To-Do Web App  
**Branch**: `001-todo-app`  
**Date**: 2026-01-23  
**Based on**: `specs/001-todo-app/spec.md` (lines 142-150)

## Overview

This document defines the data structures for the Simple To-Do Web App. Since this is a client-side only application using LocalStorage, the data model is simple and focuses on the Task entity.

## Entities

### Task

Represents a single to-do item in the user's list.

**Source**: Feature spec lines 142-150 (Key Entities section)

#### Fields

| Field | Type | Required | Description | Validation |
|-------|------|----------|-------------|------------|
| `id` | String (UUID) | Yes | Unique identifier for the task | Must be unique, generated on creation |
| `text` | String | Yes | Task description/content | 1-500 characters, non-empty after trim |
| `completed` | Boolean | Yes | Completion status | Default: `false` |
| `order` | Number (Integer) | Yes | Display position in list | Positive integer, unique per task |
| `createdAt` | Number (Unix timestamp) | Yes | Creation timestamp in milliseconds | Auto-generated, immutable |
| `updatedAt` | Number (Unix timestamp) | Yes | Last modification timestamp | Auto-updated on any change |

#### JavaScript Representation

```javascript
// Task object structure
const task = {
  id: "550e8400-e29b-41d4-a716-446655440000",  // UUID v4
  text: "Buy groceries",                       // User input
  completed: false,                             // Checkbox state
  order: 1,                                     // Display position (1 = top)
  createdAt: 1706025600000,                    // Date.now() at creation
  updatedAt: 1706025600000                     // Date.now() at last update
};
```

#### Field Details

##### `id` - Unique Identifier
- **Type**: String (UUID v4 format)
- **Purpose**: Uniquely identify tasks for update/delete operations
- **Generation**: `crypto.randomUUID()` (modern browsers) or fallback UUID generator
- **Immutable**: Never changes after creation
- **Example**: `"550e8400-e29b-41d4-a716-446655440000"`

##### `text` - Task Description
- **Type**: String
- **Purpose**: The actual content of the task that user sees
- **Validation**:
  - Minimum: 1 character after trimming whitespace
  - Maximum: 500 characters (FR-011, spec line 136)
  - No HTML allowed (XSS prevention)
- **Display**: Rendered using `textContent` (not `innerHTML`) for security
- **Example**: `"Call dentist to schedule appointment"`

##### `completed` - Completion Status
- **Type**: Boolean
- **Purpose**: Track whether task is done or not done
- **Default**: `false` (new tasks are incomplete)
- **UI Mapping**: Checkbox checked/unchecked state
- **Visual Effect**: When `true`, task displayed with strikethrough style
- **Source**: FR-003, FR-004 (spec lines 128-129)

##### `order` - Display Position
- **Type**: Number (integer)
- **Purpose**: Determine position in task list (1 = top, 2 = second, etc.)
- **Default**: For new tasks, `order = 1`, existing tasks increment by 1
- **Uniqueness**: Each task must have unique order value
- **Reordering**: When user drags task, update order values and re-sort
- **Source**: FR-009, FR-010 (spec lines 134-135)

##### `createdAt` - Creation Timestamp
- **Type**: Number (Unix timestamp in milliseconds)
- **Purpose**: Audit trail, can be used for "created X days ago" display
- **Generation**: `Date.now()` at task creation
- **Immutable**: Never changes after creation
- **Format**: Milliseconds since Unix epoch (e.g., `1706025600000`)

##### `updatedAt` - Last Update Timestamp
- **Type**: Number (Unix timestamp in milliseconds)
- **Purpose**: Track when task was last modified (text, completion, or order)
- **Generation**: `Date.now()` on any update operation
- **Updates on**: Text edit, completion toggle, order change
- **Format**: Milliseconds since Unix epoch

---

## State Structure

### Application State

The application maintains a single array of tasks in memory and LocalStorage.

```javascript
// In-memory state
let tasks = []; // Array of Task objects

// LocalStorage key
const STORAGE_KEY = 'todoApp.tasks';

// Storage structure in LocalStorage
// {
//   "todoApp.tasks": "[{\"id\":\"...\",\"text\":\"...\",\"completed\":false,...},...]"
// }
```

### State Operations

#### Load State (App Initialization)
```javascript
function loadTasks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      tasks = JSON.parse(stored);
      // Sort by order (ascending: 1, 2, 3...)
      tasks.sort((a, b) => a.order - b.order);
    }
  } catch (e) {
    // Handle localStorage failure
    console.error('Failed to load tasks:', e);
    showWarning('Tasks could not be loaded. Using in-memory storage.');
    tasks = [];
  }
}
```

#### Save State (After Any Change)
```javascript
function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    // Handle quota exceeded or localStorage disabled
    console.error('Failed to save tasks:', e);
    showWarning('Tasks could not be saved. Changes may not persist.');
  }
}
```

---

## Validation Rules

### Task Creation Validation

```javascript
function validateNewTask(text) {
  // Rule 1: Non-empty after trimming (FR-007)
  if (!text || text.trim().length === 0) {
    return { valid: false, error: 'Task cannot be empty' };
  }
  
  // Rule 2: Maximum 500 characters (FR-011)
  if (text.length > 500) {
    return { valid: false, error: 'Task cannot exceed 500 characters' };
  }
  
  return { valid: true };
}
```

### Task Update Validation

```javascript
function validateTaskUpdate(taskId, newText) {
  // Same validation as creation
  const validation = validateNewTask(newText);
  if (!validation.valid) return validation;
  
  // Additional check: task must exist
  const task = tasks.find(t => t.id === taskId);
  if (!task) {
    return { valid: false, error: 'Task not found' };
  }
  
  return { valid: true };
}
```

---

## State Transitions

### Task Lifecycle

```
[Non-existent]
     |
     | CREATE (with text, order)
     |
     v
[Active, completed=false] <-----> [Completed, completed=true]
     |                                    |
     | UPDATE (text)                     | UPDATE (text)
     | REORDER (order)                   | REORDER (order)
     |                                    |
     v                                    v
[Active, completed=false] <-----> [Completed, completed=true]
     |                                    |
     | DELETE                            | DELETE
     |                                    |
     v                                    v
[Deleted/Non-existent]        [Deleted/Non-existent]
```

### State Transition Details

#### CREATE Operation
- **Input**: Task text (string)
- **Actions**:
  1. Validate text (non-empty, ≤500 chars)
  2. Generate new UUID for `id`
  3. Set `completed = false`
  4. Set `order = 1`, increment existing tasks' order
  5. Set `createdAt = Date.now()`
  6. Set `updatedAt = Date.now()`
  7. Add to tasks array
  8. Save to LocalStorage
  9. Render in DOM
- **Output**: New task object
- **Source**: FR-001 (spec line 126)

#### UPDATE Operation
- **Input**: Task ID, new text (string)
- **Actions**:
  1. Find task by ID
  2. Validate new text
  3. Update `text` field
  4. Update `updatedAt = Date.now()`
  5. Save to LocalStorage
  6. Re-render task in DOM
- **Output**: Updated task object
- **Source**: FR-006 (spec line 131)

#### TOGGLE COMPLETION Operation
- **Input**: Task ID
- **Actions**:
  1. Find task by ID
  2. Toggle `completed` field (`true` ↔ `false`)
  3. Update `updatedAt = Date.now()`
  4. Save to LocalStorage
  5. Update visual styling (add/remove strikethrough)
- **Output**: Updated task object
- **Source**: FR-003 (spec line 128)

#### REORDER Operation
- **Input**: Task ID, new position (integer)
- **Actions**:
  1. Find task by ID
  2. Remove task from current position
  3. Insert task at new position
  4. Recalculate `order` values for all tasks (1, 2, 3, ...)
  5. Update `updatedAt` for moved task
  6. Save to LocalStorage
  7. Re-render entire list
- **Output**: Updated tasks array
- **Source**: FR-010 (spec line 135)

#### DELETE Operation
- **Input**: Task ID
- **Actions**:
  1. Find task by ID
  2. Remove from tasks array
  3. Recalculate `order` values for remaining tasks
  4. Save to LocalStorage
  5. Remove from DOM
- **Output**: Removed task object (for undo feature in future)
- **Source**: FR-005 (spec line 130)

---

## Data Integrity

### Invariants (Must Always Be True)

1. **Unique IDs**: No two tasks can have the same `id`
2. **Unique Order**: No two tasks can have the same `order` value
3. **Sequential Order**: Order values must be sequential (1, 2, 3, ..., n)
4. **Valid Text**: All tasks must have non-empty text ≤500 characters
5. **Valid Timestamps**: `updatedAt` ≥ `createdAt` for all tasks
6. **Boolean Completed**: `completed` must be strictly `true` or `false`

### Corruption Recovery

If data loaded from LocalStorage is corrupted or violates invariants:

```javascript
function sanitizeLoadedData(tasks) {
  // Remove invalid tasks
  tasks = tasks.filter(task => 
    task.id && 
    task.text && 
    task.text.length > 0 && 
    task.text.length <= 500 &&
    typeof task.completed === 'boolean' &&
    typeof task.order === 'number'
  );
  
  // Ensure unique IDs
  const seenIds = new Set();
  tasks = tasks.filter(task => {
    if (seenIds.has(task.id)) return false;
    seenIds.add(task.id);
    return true;
  });
  
  // Fix order values (make sequential)
  tasks.sort((a, b) => a.order - b.order);
  tasks.forEach((task, index) => {
    task.order = index + 1;
  });
  
  // Fix timestamps if invalid
  tasks.forEach(task => {
    if (!task.createdAt || typeof task.createdAt !== 'number') {
      task.createdAt = Date.now();
    }
    if (!task.updatedAt || typeof task.updatedAt !== 'number' || task.updatedAt < task.createdAt) {
      task.updatedAt = task.createdAt;
    }
  });
  
  return tasks;
}
```

---

## Performance Characteristics

### Time Complexity

| Operation | Complexity | Notes |
|-----------|-----------|-------|
| Create task | O(n) | Must increment order for all tasks |
| Read all tasks | O(n log n) | Sort by order |
| Update task text | O(n) | Find task, update, save array |
| Toggle completion | O(n) | Find task, update, save array |
| Delete task | O(n) | Find task, remove, reorder remaining |
| Reorder task | O(n) | Update order values, save array |
| Save to LocalStorage | O(n) | Serialize entire array |
| Load from LocalStorage | O(n log n) | Parse and sort |

### Space Complexity

| Data | Size | Notes |
|------|------|-------|
| Single task (JSON) | ~200 bytes | Including all fields |
| 100 tasks | ~20 KB | Well within 5MB LocalStorage limit |
| In-memory array | ~32 bytes per task | JavaScript object overhead |

### Performance Goals

- **Target**: 100 tasks without degradation (FR-008, spec line 162)
- **Expected**: <5ms for any operation with 100 tasks
- **LocalStorage**: ~1-2ms read/write for <50KB data
- **DOM rendering**: ~10ms to render 100 task elements

---

## Example Data

### Empty State
```json
[]
```

### Single Task
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "text": "Buy groceries",
    "completed": false,
    "order": 1,
    "createdAt": 1706025600000,
    "updatedAt": 1706025600000
  }
]
```

### Multiple Tasks (Typical Use Case)
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "text": "Buy groceries",
    "completed": false,
    "order": 1,
    "createdAt": 1706025600000,
    "updatedAt": 1706025600000
  },
  {
    "id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    "text": "Call dentist",
    "completed": true,
    "order": 2,
    "createdAt": 1706025700000,
    "updatedAt": 1706026000000
  },
  {
    "id": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    "text": "Finish project report",
    "completed": false,
    "order": 3,
    "createdAt": 1706025800000,
    "updatedAt": 1706025800000
  }
]
```

---

## Migration & Versioning

### Current Version: 1.0

**Schema Version**: Not stored (future enhancement)

### Future Considerations

If data model evolves, add schema version field:

```javascript
const state = {
  version: "1.0",
  tasks: [ /* task objects */ ]
};
```

Migration function for future schema changes:

```javascript
function migrateData(data) {
  // If no version, assume 1.0
  if (!data.version) {
    data = { version: "1.0", tasks: data };
  }
  
  // Handle future migrations
  // if (data.version === "1.0") { ... }
  
  return data;
}
```

---

## Summary

- **Single entity**: Task with 6 fields (id, text, completed, order, createdAt, updatedAt)
- **Simple storage**: Array of tasks serialized to LocalStorage
- **Clear operations**: CREATE, READ, UPDATE, DELETE, TOGGLE, REORDER
- **Strong validation**: Non-empty text, 500 char limit, unique IDs and order
- **Data integrity**: Invariants enforced, corruption recovery implemented
- **Performance**: O(n) operations, scales to 100+ tasks easily
- **Constitution aligned**: Simple, testable, well-documented (Principles I, IV, V)
