import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from '../components/TaskItem';

describe('TaskItem', () => {
  const mockTask = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    completed: 0,
  };

  const mockHandlers = {
    onUpdate: vi.fn(),
    onDelete: vi.fn(),
    onToggleComplete: vi.fn(),
  };

  it('renders task information correctly', () => {
    render(<TaskItem task={mockTask} {...mockHandlers} />);
    
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders checkbox in unchecked state for incomplete task', () => {
    render(<TaskItem task={mockTask} {...mockHandlers} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('renders checkbox in checked state for completed task', () => {
    const completedTask = { ...mockTask, completed: 1 };
    render(<TaskItem task={completedTask} {...mockHandlers} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('calls onToggleComplete when checkbox is clicked', () => {
    render(<TaskItem task={mockTask} {...mockHandlers} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(mockHandlers.onToggleComplete).toHaveBeenCalledWith(mockTask.id);
  });

  it('shows edit form when edit button is clicked', () => {
    render(<TaskItem task={mockTask} {...mockHandlers} />);
    
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);
    
    expect(screen.getByDisplayValue('Test Task')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('calls onUpdate when save button is clicked in edit mode', async () => {
    mockHandlers.onUpdate.mockResolvedValue(true);
    
    render(<TaskItem task={mockTask} {...mockHandlers} />);
    
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);
    
    const titleInput = screen.getByDisplayValue('Test Task');
    fireEvent.change(titleInput, { target: { value: 'Updated Task' } });
    
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);
    
    // Wait for async operation
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(mockHandlers.onUpdate).toHaveBeenCalledWith(mockTask.id, {
      title: 'Updated Task',
      description: 'Test Description',
      completed: 0,
    });
  });

  it('cancels editing when cancel button is clicked', () => {
    render(<TaskItem task={mockTask} {...mockHandlers} />);
    
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);
    
    const titleInput = screen.getByDisplayValue('Test Task');
    fireEvent.change(titleInput, { target: { value: 'Changed' } });
    
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);
    
    // Should be back to display mode
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.queryByDisplayValue('Changed')).not.toBeInTheDocument();
  });
});
