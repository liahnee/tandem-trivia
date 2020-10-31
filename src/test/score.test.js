import React from 'react';
import Score from '../components/score';
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

it('renders a score', () => {

	act(() => {
		render(<Score score={1} />, container);
	});

	const scoreText = screen.getByTestId('score');
    expect(scoreText).toHaveTextContent('Score:');
	const scoreValue = screen.getByTestId('score-value');
    expect(scoreValue).toHaveTextContent('1');
});