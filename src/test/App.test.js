import { unmountComponentAtNode } from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import { act } from "react-dom/test-utils";

import App from '../App';

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


it('start button rendered', () => {
	act(() => {
		render(<App />, container);
	  });
	const start = document.getElementById("start");
	expect(start).not.toBe(null);
});

it('clicking a start button renders score which starts at 0', () => {
	act(() => {
		render(<App />, container);
	  });
	const start = document.getElementById("start");
	fireEvent.click(start);
	const scoreValue = document.getElementById('score-value');
	expect(scoreValue).toHaveTextContent('0');

});

it('clicking a start button renders questions and answers', () => {

	act(() => {
		render(<App />, container);
	  });
	const start = document.getElementById("start");
	fireEvent.click(start);

	const question = document.getElementById('question-1');
	expect(question).not.toBe(null);
	const firstAnswer = document.getElementById('answer-0');
	expect(firstAnswer.innerText).not.toBe(null);
});

it('when yet selected, clicking any answer choice reveals an answer', () => {
	act(() => {
		render(<App />, container);
	});

	const start = document.getElementById("start");
	fireEvent.click(start);


	const questionOne = document.getElementById("question-1").innerHTML;
	const answer = document.getElementById('answer-2');
	fireEvent.click(answer);

	let correctAnswer = !!document.getElementsByClassName("correct") ? document.getElementsByClassName("correct") : null;

	expect(correctAnswer).not.toBe(null);
});


it('clicking any answer choice renders next question set if clicked after the answer is revealed', () => {
	act(() => {
		render(<App />, container);
	});

	const start = document.getElementById("start");
	fireEvent.click(start);


	const questionOne = document.getElementById("question-1").innerHTML;
	const skip = document.getElementById("skip");
	fireEvent.click(skip);
	const answer = document.getElementById('answer-2');
	fireEvent.click(answer);
	const questionTwo = document.getElementById("question-2").innerHTML;

	expect(questionOne).not.toMatch(questionTwo);
})

it('next button renders new questions and answers', () => {

	act(() => {
		render(<App />, container);
	});

	const start = document.getElementById("start");
	fireEvent.click(start);

	const questionOne = document.getElementById("question-1").innerHTML;
	const skip = document.getElementById("skip");
	fireEvent.click(skip);
	const next = document.getElementById("next");
	fireEvent.click(next);
	const questionTwo = document.getElementById("question-2").innerHTML;

	expect(questionOne).not.toMatch(questionTwo);
});

it('reset button clears score and shows new start page', () => {

	act(() => {
		render(<App />, container);
	});

	let start = document.getElementById("start");
	fireEvent.click(start);
	const skip = document.getElementById("skip");
	fireEvent.click(skip);
	for (let i = 0; i < 9; i++ ) {
		const next = document.getElementById("next");
		fireEvent.click(next);
		const skip = document.getElementById("skip");
		fireEvent.click(skip);
	};

	const complete = document.getElementById("complete");
	fireEvent.click(complete);

	const reset = document.getElementById("reset");
	fireEvent.click(reset);

	start = document.getElementById("start");
	expect(start).not.toBe(null);
	fireEvent.click(start); 

	const score = document.getElementById("score-value");
	expect(score).toHaveTextContent('0');

});
