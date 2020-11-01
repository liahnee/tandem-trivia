import React from 'react';
import Review from '../container/review';
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
const reset = jest.fn();

const propData = {
    questionList: [
        {
            question: "question1",
            allChoices: ["One", "Two", "Three", "Four"],
            correct: "One",
            incorrect: ["Two", "Three", "Four"],
            selectedAnswer: "Two"
        }, {
            question: "question2",
            allChoices: ["AA", "BB", "CC", "DD"],
            correct: "BB",
            incorrect: ["AA", "CC", "DD"],
            selectedAnswer: "BB"
        }
    ],
    reset: reset,
    score: 1,
};

it('renders total score', () => {
	act(() => {
		render(<Review {...propData} />, container);
	});

    const score = screen.getByText('1/2');
    expect(score).not.toBe(null);
});
it('renders new round button', () => {
	act(() => {
		render(<Review {...propData} />, container);
	});

	const button = document.getElementById('reset');
    expect(button).not.toBe(null);
});
it('renders previous questions and answers', () => {
	act(() => {
		render(<Review {...propData} />, container);
    });
    for (let i = 0; i < propData.questionList.length; i++ ) {
        const questionSet = document.getElementById(`review-qa-container-${i}`);
        expect(questionSet).not.toBe(null);
    };
});
