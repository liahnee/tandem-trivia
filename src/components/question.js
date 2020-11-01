import '../stylesheets/question.css';

const question = props => {



    return (
        <div className="question" data-testid={`question-${props.count}`} name={`question-${props.count}`}>
            {props.count > 0? <p>Question {props.count}. {props.text}</p> : null }
        </div>
    )
};

export default question;