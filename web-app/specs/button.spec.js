import React from 'react';
import {Button} from '../src/components/button';
import {render, fireEvent, waitFor} from '@testing-library/react'
import {expect} from 'assertior';

test('test', () => {

  const onClick = jest.fn();

  expect(onClick.mock.calls.length).toEqual(0);

  render(<Button onClick={onClick} className={"test-button"} title={"test title"}/>);

  fireEvent(document.querySelector('.test-button'), new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  }));

  expect(onClick.mock.calls.length).toEqual(1);
  expect(document.querySelector('.test-button').textContent).toEqual('test title')
})