import '../stylesheets/question.css';

const question = props => {



    return (
        <div className="question">
            {props.count > 0? <p>Question {props.count}. {props.text}</p> : null }
        </div>
    )
};

export default question;