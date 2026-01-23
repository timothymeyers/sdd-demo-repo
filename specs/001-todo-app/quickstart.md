# Quickstart Guide: Simple To-Do Web App

**Feature**: Simple To-Do Web App  
**Branch**: `001-todo-app`  
**Date**: 2026-01-23

## Overview

This guide will help you get the Simple To-Do Web App up and running in under 60 seconds. The app is a lightweight, single-file web application with zero dependencies.

---

## Prerequisites

**Required**:
- A modern web browser (Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+)

**Optional** (for running a local server):
- Python 3.x (pre-installed on macOS/Linux, easy to install on Windows)
- OR Node.js (if you prefer `npx http-server`)

---

## Quick Start (3 Steps)

### Option A: Using Python (Recommended)

**Step 1**: Navigate to the project directory
```bash
cd /path/to/demo-to-do-agent-assignment
```

**Step 2**: Start the web server
```bash
python -m http.server 8000
```

Or if you have Python 3 specifically:
```bash
python3 -m http.server 8000
```

Or for Python 2:
```bash
python -m SimpleHTTPServer 8000
```

**Step 3**: Open your browser
Navigate to: **http://localhost:8000**

✅ **Done!** The app should now be running.

---

### Option B: Using Node.js

**Step 1**: Navigate to the project directory
```bash
cd /path/to/demo-to-do-agent-assignment
```

**Step 2**: Start the web server (no installation needed)
```bash
npx http-server -p 8000
```

**Step 3**: Open your browser
Navigate to: **http://localhost:8000**

✅ **Done!** The app should now be running.

---

### Option C: Direct File Access (Limited)

**Step 1**: Locate the `index.html` file in the project directory

**Step 2**: Double-click `index.html` to open it in your default browser

⚠️ **Note**: LocalStorage may have limited functionality when opening files directly with `file://` protocol. We recommend using Option A or B for full functionality.

---

## What You Should See

When you open the app, you should see:

1. **App Title**: "Simple To-Do List" at the top
2. **Input Field**: Text box with placeholder "What needs to be done?"
3. **Add Button**: Button to create new tasks
4. **Character Counter**: Shows "0 / 500 characters"
5. **Empty State**: Message saying "No tasks yet. Add one above!"

---

## First Steps - Try These Actions

### 1. Create Your First Task
- Type "Buy groceries" in the input field
- Click the "Add Task" button or press Enter
- ✅ Your task appears in the list below

### 2. Mark a Task Complete
- Click the checkbox next to your task
- ✅ The task text gets a strikethrough, indicating it's done

### 3. Edit a Task
- Double-click on the task text (or click the "Edit" button)
- Modify the text
- Click "Save" or press Enter
- ✅ The task updates with your new text

### 4. Delete a Task
- Click the "Delete" button (trash icon) next to a task
- ✅ The task is removed from the list

### 5. Reorder Tasks
- Click and hold on a task
- Drag it to a new position in the list
- Release to drop
- ✅ The task moves to the new position

### 6. Test Persistence
- Create a few tasks
- Close the browser tab
- Reopen http://localhost:8000
- ✅ Your tasks should still be there (saved in LocalStorage)

---

## Troubleshooting

### Issue: "Address already in use" Error

**Problem**: Port 8000 is already occupied by another process

**Solution**: Use a different port
```bash
python -m http.server 8001
# Then open http://localhost:8001
```

---

### Issue: "python: command not found"

**Problem**: Python is not installed or not in your PATH

**Solutions**:
1. **Install Python**: Download from [python.org](https://www.python.org/downloads/)
2. **Use Node.js instead**: Try Option B above
3. **Use Direct File Access**: Try Option C (with limitations)

---

### Issue: Tasks Not Saving

**Symptoms**: Tasks disappear when you refresh the page

**Possible Causes**:
1. **Private/Incognito Mode**: LocalStorage is often disabled
   - **Solution**: Use a regular browser window
   
2. **LocalStorage Disabled**: Browser settings block LocalStorage
   - **Solution**: Enable LocalStorage in browser settings
   
3. **File:// Protocol**: Opening file directly has LocalStorage limitations
   - **Solution**: Use Option A or B to run a local server

4. **Browser Storage Full**: LocalStorage quota exceeded
   - **Solution**: Clear browser data or delete old data from other sites

**Expected Behavior**: If LocalStorage is unavailable, you should see a warning banner at the top saying "Tasks will not persist across sessions"

---

### Issue: Character Counter Not Updating

**Symptoms**: Counter stays at "0 / 500 characters" when typing

**Possible Cause**: JavaScript not loaded or browser compatibility issue

**Solutions**:
1. Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
2. Check browser console for errors (F12 → Console tab)
3. Verify you're using a modern browser (see Prerequisites)

---

### Issue: Drag-and-Drop Not Working

**Symptoms**: Can't reorder tasks by dragging

**Possible Causes**:
1. **Touch device**: Drag-and-drop is for mouse/trackpad primarily
   - **Workaround**: Use edit function to change task priority
   
2. **Browser incompatibility**: Very old browser versions
   - **Solution**: Update to a modern browser

---

## Browser Compatibility

### ✅ Fully Supported (Tested)
- Chrome/Edge 90+ (2021)
- Firefox 88+ (2021)
- Safari 14+ (2020)

### ⚠️ Partial Support
- Older browser versions (2018-2020): Core features work, some modern APIs may not be available

### ❌ Not Supported
- Internet Explorer 11 and earlier

---

## Feature Overview

Once you're up and running, the app supports:

- ✅ **Create Tasks**: Add new to-do items (up to 500 characters each)
- ✅ **Complete Tasks**: Check off completed items with visual feedback
- ✅ **Edit Tasks**: Modify task text inline
- ✅ **Delete Tasks**: Remove tasks you no longer need
- ✅ **Reorder Tasks**: Drag-and-drop to prioritize
- ✅ **Persistence**: Tasks saved automatically to browser LocalStorage
- ✅ **Character Counter**: Real-time feedback on task length
- ✅ **Validation**: Prevents empty tasks and >500 character tasks
- ✅ **Graceful Degradation**: Works in-memory if LocalStorage unavailable

---

## Performance Expectations

- **First Task Created**: Within 5 seconds of opening the app
- **Task Actions**: <100ms response time (instant feedback)
- **Capacity**: Handles 100+ tasks without performance issues
- **Persistence**: Data survives browser restarts and session closures

---

## Data Storage

**Location**: Browser LocalStorage (stored in your browser, not on a server)

**Storage Key**: `todoApp.tasks`

**Data Format**: JSON array of task objects

**Privacy**: Your data never leaves your device. No server, no tracking, no accounts.

**Clearing Data**: To reset the app completely:
1. Open browser DevTools (F12)
2. Go to Application/Storage tab
3. Find LocalStorage → http://localhost:8000
4. Delete the `todoApp.tasks` key

Or clear all site data in your browser settings.

---

## Architecture Notes

**Technology Stack**:
- Pure HTML5, CSS3, and vanilla JavaScript (ES6+)
- Zero external dependencies
- No build tools or bundlers required
- Single file: `index.html` (~600 lines total)

**Why This Approach**:
- **Lightweight**: No npm install, no node_modules, no compilation
- **Portable**: Copy the single HTML file anywhere
- **Educational**: Clear, readable code demonstrating web fundamentals
- **Fast**: Instant startup, no loading delays

---

## Next Steps

**For Users**:
- Start adding your real to-do items
- Explore all the features (edit, delete, reorder)
- Test persistence by closing and reopening the browser

**For Developers**:
- Read the source code in `index.html` (well-commented)
- Review `/specs/001-todo-app/` for detailed documentation:
  - `spec.md` - Feature specification and requirements
  - `data-model.md` - Data structure documentation
  - `contracts/javascript-api.md` - Function signatures and API
  - `research.md` - Technology decisions and rationale
  - `plan.md` - Implementation plan

**For Contributors**:
- Check the Constitution: `.specify/memory/constitution.md`
- Follow TDD practices (tests before implementation)
- Maintain code quality standards
- Update documentation with code changes

---

## Support

**Questions or Issues?**
- Check the Troubleshooting section above
- Review the specification: `specs/001-todo-app/spec.md`
- Check browser console for error messages (F12 → Console)

**Browser Console**: Press F12 to open DevTools and check for any errors or warnings

---

## Summary

✅ **Setup Time**: <60 seconds  
✅ **Command**: `python -m http.server 8000`  
✅ **URL**: http://localhost:8000  
✅ **Dependencies**: None (zero npm packages)  
✅ **Data Storage**: Browser LocalStorage (local only)  

**You're ready to start managing your tasks!** 🎉
