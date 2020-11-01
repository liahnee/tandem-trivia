import '../stylesheets/question.css';

const question = props => {



    return (
        <div className="question" data-testid={`question-${props.count}`} id={`question-${props.count}`}>
            {props.count > 0? <div><p className="question-count">Question {props.count} </p><p className="question-text">{props.text}</p></div> : null }
        </div>
    )
};

export default question;