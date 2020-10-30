import './stylesheets/App.css';

import allQuestions from './Apprentice_TandemFor400_Data.json';
import { useState, useEffect } from 'react';

import Question from './components/question';
import Answer from './components/answers';
import Score from './components/score';

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
        newQ.allChoices = [...newQ.incorrect];
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

		// const randAnswerChoices = pulledQuestion.incorrect;
		// randAnswerChoices.splice(randomInt(4), 0, pulledQuestion.correct);
    // setAnswerChoices(randAnswerChoices);
    
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
			console.log('answer');
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
    setQuestionCount(questionCount + 1 )
    return;
  }

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

	return (
		<div className="App">
			{questionCount <= 10 ? (
				<div>
					<Score score={score} />
					{showAnswerButton ? (
						<button onClick={showAnswer}>Confirm</button>
					) : (
            <div> 
              {questionCount == 10 ? (<button onClick={countQuestion}>Complete</button>) : (
						<button onClick={nextQuestion}> Next Question</button> )}

            </div>
					)}
					<div className="question-container">
						<Question text={question} count={questionCount} />
						<div className="answers-container">
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
					</div>
				</div>
			) : (
				<div>
					You have completed 10 questions. Youre score is {score}/10.
					<button onClick={reset}>New Round</button>
					Review answers:
          {console.log(questionList)}
					{questionList.map((question, idx) => (
						<div className="question-container" key={idx}>
							<Question text={question.question} count={idx + 1} />
							<div className="answers-container">
								{question.allChoices.map((choice, i) => (
									<Answer
										key={i}
										text={choice}
										select={selectAnswer}
										selected={question.selectedAnswer == choice ? true : false}
										reveal={true}
										answer={question.correct}
									/>
								))}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

const randomInt = (max) => {
	return Math.floor(Math.random() * Math.floor(max));
};

export default App;
