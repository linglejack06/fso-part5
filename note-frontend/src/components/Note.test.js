import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Note from './Note';

test('renders content', () => {
  const note = {
    content: 'test',
    important: true,
  };
  const { container } = render(<Note note={note} />);
  const div = container.querySelector('.note');
  screen.debug();
  expect(div).toHaveTextContent(
    'test',
  );
});
test('clicking button causes event handler to run', async () => {
  const note = {
    content: 'test',
    important: false,
  };
  const mockHandler = jest.fn();

  render(<Note note={note} toggleImportance={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText('make important');
  await user.click(button);
  expect(mockHandler.mock.calls).toHaveLength(1);
});
