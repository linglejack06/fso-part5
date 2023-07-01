//import React from 'react';
//import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
//import userEvent from '@testing-library/user-event';
import Blog from '../components/Blog';

const blog = {
  title: 'test with me',
  author: 'tester',
  url: 'https://www.test.com',
  likes: 0,
}
test('blog renders', () => {
  render(<Blog blog={blog} />);
  const component = screen.getByText('test with me by tester');
  expect(component).toBeDefined();
})