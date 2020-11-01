import React from 'react';
import Score from '../components/score';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

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

it('renders a score', () => {

	act(() => {
		render(<Score score={1} />, container);
	});

	const scoreText = document.getElementById('score-text');
    expect(scoreText).toHaveTextContent('Score');
	const scoreValue = document.getElementById('score-value');
    expect(scoreValue).toHaveTextContent('1');
});