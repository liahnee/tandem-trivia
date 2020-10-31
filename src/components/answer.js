import '../stylesheets/answers.css';

const Answer = props => {

    const selected = props.selected ? "highlight" : "regular"; 

    const mark = () => {

        if (props.reveal && props.answer == props.text ) {
            return 'correct'
        };
        if (props.reveal) {
            return 'incorrect'
        };
    }

    return (
        <div data-testid={`answer-${props.idx}`} className={`answers ${selected} ${mark()}`} onClick={() => props.select(props.text)}>
                {props.text}
        </div>
    )
};

export default Answer;