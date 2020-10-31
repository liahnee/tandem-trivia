import Question from '../components/question';
import Answer from '../components/answer';

const Review = (props) => {
	return (
		<div className='review'>
			<div className="review-header">
				You have completed 10 questions. 
			</div>
			<div >
				Youre score is <span className="review-score" data-testid={'review-score'}>{props.score}/{props.questionList.length}</span>.
			</div>
			<button onClick={props.reset}>New Round</button>
			<div>
				Review answers:
				{props.questionList.map((question, idx) => (
					<div className="question-container" data-testid={`review-qa-container-${idx}`} key={idx}>
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
		</div>
	);
};

export default Review;
