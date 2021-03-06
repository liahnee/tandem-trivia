import Question from '../components/question';


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

it("renders question text with the question number", () => {
    
    act(() => {
        render(<Question text={"This is a test trivia question."} count={1}/>, container);
    });

    expect(container.textContent).toBe("Question 1 This is a test trivia question.")
});