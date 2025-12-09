import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AddTaskForm from './AddTaskForm';

describe('AddTaskForm', () => {
  it('renders the form with title and description inputs', () => {
    render(<AddTaskForm onAdd={() => {}} />);
    
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });

  it('updates input values when typing', () => {
    render(<AddTaskForm onAdd={() => {}} />);
    
    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    
    fireEvent.change(titleInput, { target: { value: 'Test Task' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    
    expect(titleInput.value).toBe('Test Task');
    expect(descriptionInput.value).toBe('Test Description');
  });

  it('calls onAdd with correct data when form is submitted', async () => {
    let submittedData = null;
    const mockOnAdd = async (data) => {
      submittedData = data;
      return true;
    };
    
    render(<AddTaskForm onAdd={mockOnAdd} />);
    
    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const submitButton = screen.getByRole('button', { name: /add task/i });
    
    fireEvent.change(titleInput, { target: { value: 'New Task' } });
    fireEvent.change(descriptionInput, { target: { value: 'Task Details' } });
    fireEvent.click(submitButton);
    
    // Wait a bit for async operation
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(submittedData).toEqual({
      title: 'New Task',
      description: 'Task Details',
    });
  });

  it('clears form after successful submission', async () => {
    const mockOnAdd = async () => true;
    
    render(<AddTaskForm onAdd={mockOnAdd} />);
    
    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const submitButton = screen.getByRole('button', { name: /add task/i });
    
    fireEvent.change(titleInput, { target: { value: 'Test' } });
    fireEvent.change(descriptionInput, { target: { value: 'Description' } });
    fireEvent.click(submitButton);
    
    // Wait for async operation
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(titleInput.value).toBe('');
    expect(descriptionInput.value).toBe('');
  });
});
