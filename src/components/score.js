const Score = props => {

    return (
        <div className="score">
            <p data-testid="score">Score: </p><p data-testid="score-value">{props.score}</p>
        </div>
    )
};

export default Score;