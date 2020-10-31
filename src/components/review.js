import Question from './question';
import Answer from './answer';

const Review = (props) => {
	return (
		<div>
			You have completed 10 questions. Youre score is {props.score}/10.
			<button onClick={props.reset}>New Round</button>
			Review answers:
			{props.questionList.map((question, idx) => (
				<div className="question-container" key={idx}>
					<Question text={question.question} count={idx + 1} />
					<div className="answers-container">
						{question.allChoices.map((choice, i) => (
							<Answer
								key={i}
								text={choice}
								select={props.selectAnswer}
								selected={question.selectedAnswer == choice ? true : false}
								reveal={true}
								answer={question.correct}
							/>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default Review;
