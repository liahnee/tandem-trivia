import '../stylesheets/score.css';

const Score = props => {

    return (
        <div className="score">
            <p id="score-text">Score</p><p id="score-value">{props.score}</p>
        </div>
    )
};

export default Score;