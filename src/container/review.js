import '../stylesheets/review.css';

import Question from '../components/question';
import Answer from '../components/answer';

const Review = (props) => {
	return (
		<div className="review">
			<div data-testid="reset" id="reset" className="div-button" onClick={props.reset}>
				New Round
			</div>
			<div className="review-header">
				<p>You have completed 10 questions.</p>
				<p>
					Youre score is{' '}
					<strong className="review-score" data-testid={'review-score'}>
						{props.score}/{props.questionList.length}
					</strong>.
				</p>
			</div>
			<p>* * *</p>
			<p>Review answers</p>
			<div className="review-qna">
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
