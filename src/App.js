import './stylesheets/App.css';

import allQuestions from './Apprentice_TandemFor400_Data.json';
import { useState, useEffect } from 'react';

import Question from './components/question';
import Answer from './components/answer';
import Score from './components/score';
import Review from './container/review';

function App() {
	const [ score, setScore ] = useState(0);
	const [ questionList, setQuestionList ] = useState(new Array());
	const [ question, setQuestion ] = useState(null);
	const [ answer, setAnswer ] = useState(null);
	const [ answerChoices, setAnswerChoices ] = useState(new Array());

	const [ selectedAnswer, setSelectedAnswer ] = useState(null);
	const [ showAnswerButton, setShowAnswerButton ] = useState(false);
	const [ revealAnswer, setRevealAnswer ] = useState(false);

	const [ questionCount, setQuestionCount ] = useState(0);

	useEffect(() => {
		createQuestionList();
	}, []);

	const createQuestionList = () => {
		setQuestionList(null);
		const max = allQuestions.length - 1;
		const tempIdx = [];
		const tempList = [];
		let count = 0;
		while (count < 10) {
			let num = randomInt(max);
			if (tempIdx.includes(num)) {
				continue;
			} else {
				tempIdx.push(num);

				const newQ = allQuestions[num];
				newQ.selectedAnswer = null;
				newQ.allChoices = [ ...newQ.incorrect ];
				newQ.allChoices.splice(randomInt(4), 0, newQ.correct);
				tempList.push(newQ);
				count++;
			}
		}
		setQuestionList(tempList);
		return;
	};

	const pullQuestion = () => {
		const pulledQuestion = questionList[questionCount];
		setQuestion(pulledQuestion.question);
		setAnswer(pulledQuestion.correct);

		setAnswerChoices(pulledQuestion.allChoices);

		countQuestion();
		return;
	};

	const nextQuestion = () => {
		pullQuestion();
		setShowAnswerButton(true);
		setRevealAnswer(false);
		setSelectedAnswer(null);
		return;
	};

	const showAnswer = () => {
		if (selectedAnswer == answer) {
			setScore(score + 1);
		}
		setShowAnswerButton(false);
		setRevealAnswer(true);
		questionList[questionCount - 1].selectedAnswer = selectedAnswer;
		return;
	};

	const selectAnswer = (choice) => {
		if (!revealAnswer) {
			// cannot change answer while answer is being shown
			setSelectedAnswer(choice);
		}
		return;
	};

	const countQuestion = () => {
		setQuestionCount(questionCount + 1);
		return;
	};

	const reset = () => {
		createQuestionList();
		setQuestionCount(0);
		setQuestion(null);
		setAnswerChoices(new Array());
		setAnswer(null);
		setScore(0);
		setSelectedAnswer(null);
		setShowAnswerButton(false);
		setRevealAnswer(false);

		return;
	};

	const startSession = () => {
		countQuestion();
		nextQuestion();
		return;
	};

	const fakeRoute = () => {
		if (questionCount == 0) {
			return (
				<div>
					<div id="start-bg"/>
					<div data-testid="start" id="start" className="div-button" onClick={startSession}>
						START
					</div>
				</div>
			);
		} else if (questionCount <= 10) {
			return (
				<div className="qna-container">
					<Score score={score} />
					<div className="qna">
						<div className="question-container">
							<Question text={question} count={questionCount} />
						</div>
						<div className="answers-container">
							{answerChoices.map((choice, i) => (
								<Answer
									key={i}
									idx={i}
									text={choice}
									select={selectAnswer}
									selected={selectedAnswer == choice ? true : false}
									reveal={revealAnswer}
									answer={answer}
								/>
							))}
						</div>
						{showAnswerButton ? (
							<div data-testid="confirm" id="confirm" className="div-button" onClick={showAnswer}>
								Confirm
							</div>
						) : (
							<div>
								{questionCount == 10 ? (
									<div
										data-testid="complete"
										id="complete"
										className="div-button"
										onClick={countQuestion}
									>
										Complete
									</div>
								) : (
									<div data-testid="next" id="next" className="div-button" onClick={nextQuestion}>
										{' '}
										Next Question
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			);
		} else {
			return <Review questionList={questionList} score={score} reset={reset} selectAnswer={selectAnswer} />;
		}
	};

	return (
		<div className="App">
			<header className="App-header"><span id="tandem-text">tandem</span> Trivia</header>
			{fakeRoute()}
		</div>
	);
}

const randomInt = (max) => {
	return Math.floor(Math.random() * Math.floor(max));
};

export default App;
