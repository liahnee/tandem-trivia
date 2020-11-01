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

    return (
        <div data-testid={`answer-${props.idx}`} className={mark()} onClick={() => props.select(props.text)}>
                {props.text}
        </div>
    )
};

export default Answer;