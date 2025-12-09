import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TaskList from '../components/TaskList';

describe('TaskList', () => {
  const mockTasks = [
    { id: 1, title: 'Task 1', description: 'Desc 1', completed: 0 },
    { id: 2, title: 'Task 2', description: 'Desc 2', completed: 1 },
  ];

  const mockHandlers = {
    onUpdate: () => {},
    onDelete: () => {},
    onToggleComplete: () => {},
  };

  it('renders empty state when no tasks exist', () => {
    render(<TaskList tasks={[]} {...mockHandlers} />);
    
    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
  });

  it('renders task count correctly', () => {
    render(<TaskList tasks={mockTasks} {...mockHandlers} />);
    
    expect(screen.getByText(/your tasks \(2\)/i)).toBeInTheDocument();
  });

  it('renders all tasks', () => {
    render(<TaskList tasks={mockTasks} {...mockHandlers} />);
    
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });
});
