import React from 'react';
import Answer from '../components/answer';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';

let container = null;
beforeEach(() => {
	container = document.createElement('div');
	document.body.appendChild(container);
});

afterEach(() => {
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});

it('renders an answer choice', () => {
	const select = jest.fn();
	const propData = {
		idx: 1,
		text: 'One',
		selected: false,
		select: select,
		answer: 'One',
		reveal: false
	};
	act(() => {
		render(<Answer {...propData} />, container);
	});

	const answer = document.getElementById('answer-1');
    expect(answer).toHaveTextContent('One');
    expect(answer).toHaveClass('regular');
});

// it('renders highlighted answer choice when selected', () => {
// 	const select = jest.fn();
// 	const propData = {
// 		idx: 1,
// 		text: 'One',
// 		selected: true,
// 		select: select,
// 		answer: 'One',
// 		reveal: false
// 	};
// 	act(() => {
// 		render(<Answer {...propData} />, container);
// 	});

// 	const answer = screen.getByTestId('answer-1');

// 	expect(answer).toHaveClass('highlight');
// });

it('renders answer choice with correct class name when correct answer is revealed', () => {
	const select = jest.fn();
	const propData = {
		idx: 1,
		text: 'One',
		selected: true,
		select: select,
		answer: 'One',
		reveal: true
	};
	act(() => {
		render(<Answer {...propData} />, container);
	});

	const answer = document.getElementById('answer-1');

	expect(answer).toHaveClass('correct');
});

it('renders answer choice with incorrect class name incorrect selected answer is revealed', () => {
	const select = jest.fn();
	const propData = {
		idx: 1,
		text: 'One',
		selected: true,
		select: select,
		answer: 'Two',
		reveal: true
	};
	act(() => {
		render(<Answer {...propData} />, container);
	});

	const answer = document.getElementById('answer-1');
	expect(answer).toHaveClass('incorrect')
});


