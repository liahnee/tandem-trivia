import { render, fireEvent } from '@testing-library/react';

import App from '../App';

import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

let container = null;
beforeEach(() => {
	// setup a DOM element as a render target
	container = document.createElement('div');
	document.body.appendChild(container);
});

afterEach(() => {
	// cleanup on exiting
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});

//test renders start button
it('start button rendered', () => {
	const { getByText } = render(<App />, container);
	const start = getByText("Start");
	expect(start).not.toBe(null);
});

it('start button renders score', () => {
	const { getByText, getByTestId } = render(<App />, container);


	const start = getByText("Start");
	fireEvent.click(start);

	const scoreValue = getByTestId('score-value');


	expect(getByText('Score:')).not.toBe(null);
	expect(scoreValue).toHaveTextContent('0');
});

//confirm button

//next question button

//review page



//reset button

// it('renders answer choices that highlights on click', () => {
// 	render(<App />, container);

//     const answer = document.querySelector("[data-testid=answer-1]")

//     act(()=> {
//         answer.dispatchEvent(new MouseEvent("click", {bubbles: true}))
//     });

// 	expect(answer).toHaveClass('highlight');
// });