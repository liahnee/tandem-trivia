import '../stylesheets/answer.css';

const Answer = props => {

    const mark = () => {
        const classname = 'answers';
        const selected = props.selected ? "highlight" : "regular"; 
        let reveal = new String;

        if (props.reveal && props.answer == props.text ) {
            reveal = 'correct';
        } else if (props.reveal && props.answer !== props.text ) {
            reveal = 'incorrect';
        } else {
            reveal = 'choices';
        };
        return classname + ' ' + selected + ' ' + reveal;
    }

    const clickAnswer = () =>{
        if (props.reveal) {
            if (props.count < 10 ) {
                props.nextQuestion();
            } else {
                props.complete();
            }
        } else {
            props.showAnswer(props.text);
        }
    }

    return (
        <div id={`answer-${props.idx}`} className={mark()} onClick={clickAnswer}>
                {props.text}
        </div>
    )
};

export default Answer;