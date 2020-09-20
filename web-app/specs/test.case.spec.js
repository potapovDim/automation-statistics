import React from 'react';
import {TestCase} from '../src/components/test.case';
import {render, fireEvent, waitFor} from '@testing-library/react'
import {expect} from 'assertior';

test.only('TestCase 1', function() {
  const onClick = jest.fn();
  const onOpen = jest.fn();

  const props = {
    id: 'test id',
    date: Date.now(),
    run: 'test run',
    stack: 'test stack',
    stackTrace: 'test stack trace',
    title: 'test button title',
    className: 'test class name',
    onClick,
    onOpen,
  }
  render(<TestCase {...props} />)
  fireEvent(document.querySelector('.test_case_id'), new MouseEvent('click', {
    cancelable: false,
    bubbles: true
  }))
  expect(onOpen.mock.calls.length).toEqual(1);
  expect(onClick.mock.calls.length).toEqual(0);
})

