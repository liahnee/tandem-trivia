import { render, fireEvent, screen } from '@testing-library/react';
import App from '../App';

import { unmountComponentAtNode } from 'react-dom';

let container = null;
beforeEach(() => {
	// setup a DOM element as a render target
	container = document.createElement('div');
	document.body.appendChild(container);
});

afterEach(() => {
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});

// beforeAll(done => {
// 	done()
//   })
  
//   afterAll(done => {
// 	// Closing the DB connection allows Jest to exit successfully.
// 	mongoose.connection.close()
// 	done()
//   })
  

//test renders start button
it('start button rendered', () => {
	const { getByText } = render(<App />, container);
	const start = getByText("Start");
	expect(start).not.toBe(null);
});

it('start button renders score which starts at 0', () => {
	const { getByText, getByTestId } = render(<App />, container);


	const start = getByText("Start");
	fireEvent.click(start);

	const scoreValue = getByTestId('score-value');


	expect(getByText('Score:')).not.toBe(null);
	expect(scoreValue).toHaveTextContent('0');
});

it('start button renders questions and answers', () => {
	const { getByText, getByTestId } = render(<App />, container);


	const start = getByText("Start");
	fireEvent.click(start);

	const question = getByTestId('question-1');
	expect(question).not.toBe(null);
	const firstAnswer = getByTestId('answer-0');
	expect(firstAnswer).not.toBe(null);
});

it('next button renders new questions and answers', () => {

	const { getByText, getByTestId } = render(<App />, container);

	const start = getByText("Start");
	fireEvent.click(start);

	const questionOne = screen.getByTestId("question-1").innerHTML;
	console.log("innerhtml", questionOne)
	const confirm = getByTestId("confirm");
	fireEvent.click(confirm);
	const next = getByTestId("next");
	fireEvent.click(next);
	const questionTwo = screen.getByTestId("question-2").innerHTML;
	console.log("innerhtml after", questionOne)

	expect(questionOne).not.toMatch(questionTwo);
});

//reset button
it('reset button clears score and shows new start page', () => {

	const { getByTestId } = render(<App />, container);


	let start = getByTestId("start");
	fireEvent.click(start);
	const confirm = getByTestId("confirm");
	fireEvent.click(confirm);
	for (let i = 0; i < 9; i++ ) {
		const next = getByTestId("next");
		fireEvent.click(next);
		const confirm = getByTestId("confirm");
		fireEvent.click(confirm);
	};

	const complete = getByTestId("complete");
	fireEvent.click(complete);

	const reset = getByTestId("reset");
	fireEvent.click(reset);

	start = getByTestId("start");
	expect(start).not.toBe(null);
	fireEvent.click(start); 

	const score = getByTestId("score-value");
	expect(score).toHaveTextContent('0');

});
