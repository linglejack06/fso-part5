import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Togglable from './Togglable';

describe('<Togglable />', () => {
  let container;

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show...">
        <div className="test-div">
          togglable content
        </div>
      </Togglable>,
    ).container;
  });
  test('renders children', async () => {
    await screen.findAllByText('togglable content');
  });
  test('children are not displayed at start', () => {
    const div = container.querySelector('.togglable-content');
    screen.debug();
    expect(div).toHaveStyle('display: none');
  });
  test('children are displayed after clicking', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('show...');
    await user.click(button);
    const div = container.querySelector('.togglable-content');
    expect(div).not.toHaveStyle('display: none');
  });
  test('Toggled content can be closed', async () => {
    const user = userEvent.setup();
    const displayButton = screen.getByText('show...');
    await user.click(displayButton);
    const hideButton = screen.getByText('Cancel');
    await user.click(hideButton);

    const div = container.querySelector('.togglable-content');
    expect(div).toHaveStyle('display: none');
  });
});
