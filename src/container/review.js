import '../stylesheets/review.css';

import Question from '../components/question';
import Answer from '../components/answer';

const Review = (props) => {
	return (
		<div className="review">
			<div id="reset" className="div-button" onClick={props.reset}>
				New Round
			</div>
			<div className="review-header">
				<p>You have completed 10 questions.</p>
				<p>
					Youre score is{' '}
					<span className="review-score">
						{props.score}/{props.questionList.length}
					</span>.
				</p>
			</div>
			<p>* * *</p>
			<p>Review answers</p>
			<div className="review-qna">
				{props.questionList.map((question, idx) => (
					<div className="r-question-container" id={`review-qa-container-${idx}`} key={idx}>
						<Question text={question.question} count={idx + 1} />
						<div className="answers-container">
							{question.allChoices.map((choice, i) => (
								<Answer
									key={i}
									text={choice}
									selected={question.selectedAnswer == choice ? true : false}
									reveal={true}
									answer={question.correct}
									review={true}
									idx={i}
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
