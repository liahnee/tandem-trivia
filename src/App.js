import './stylesheets/App.css';

import allQuestions from './Apprentice_TandemFor400_Data.json';
import { useState } from 'react';

import Question from './components/question';
import Answer from './components/answers';
import Score from './components/score';

function App() {

	const [ score, setScore ] = useState(0);
	const [ questionList, setquestionList ] = useState([...allQuestions]);
	const [ question, setQuestion ] = useState(null);
	const [ answer, setAnswer ] = useState(null);
	const [ answerChoices, setAnswerChoices ] = useState(new Array());

	const [ selectedAnswer, setSelectedAnswer ] = useState(null);
	const [ showAnswerButton, setShowAnswerButton ] = useState(false);
	const [ revealAnswer, setRevealAnswer ] = useState(false);

	const [ questionCount, setQuestionCount ] = useState(0);

	const pullQuestion = () => {
		const max = questionList.length - 1;
    const pulledQuestion = questionList.splice(randomInt(max), 1)[0];
    console.log('pulledQuestion', pulledQuestion)
    console.log('allQuestions', allQuestions);
    console.log("questioncount", questionCount);
		setQuestion(pulledQuestion.question);
		setAnswer(pulledQuestion.correct);

		const randAnswerChoices = pulledQuestion.incorrect;
		randAnswerChoices.splice(randomInt(4), 0, pulledQuestion.correct);
		setAnswerChoices(randAnswerChoices);

		return;
	};

	const nextQuestion = () => {
		pullQuestion();
		setShowAnswerButton(true);
		setRevealAnswer(false);
		countQuestion();
		return;
	};

	const showAnswer = () => {
		if (selectedAnswer == answer) {
			setScore(score + 1);
			console.log('answer');
		}
		setShowAnswerButton(false);
		setRevealAnswer(true);
		return;
	};

	const selectAnswer = (choice) => {
		if (!revealAnswer) {
			setSelectedAnswer(choice);
		}
		return;
	};

	const countQuestion = () => {
		setQuestionCount(questionCount + 1);
		return;
	};

	const reset = () => {
		setQuestionCount(0);
    setquestionList([...allQuestions]);
    setQuestion(null);
    setAnswerChoices(new Array);
    setAnswer(null);
    setScore(0);
    setSelectedAnswer(null);
    setShowAnswerButton(true);
    setRevealAnswer(false);

		return;
	};

	return (
		<div className="App">
			{questionCount <= 10 ?(
				<div>
					<Score score={score} />
					{showAnswerButton ? (
						<button onClick={showAnswer}>Confirm</button>
					) : (
						<button onClick={nextQuestion}> Next Question</button>
					)}

					<Question text={question} count={questionCount} />
					{answerChoices.map((choice, i) => (
						<Answer
							key={i}
							text={choice}
							select={selectAnswer}
							selected={selectedAnswer == choice ? true : false}
							reveal={revealAnswer}
							answer={answer}
						/>
					))}
				</div>
			) : (
				<div>
					You have completed 10 questions. Youre score is {score}/10.
					<button onClick={reset}>New Round</button>
				</div>
			)}
		</div>
	);
}

export default App;

const randomInt = (max) => {
	return Math.floor(Math.random() * Math.floor(max));
};
