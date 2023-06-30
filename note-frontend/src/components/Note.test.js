import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
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
