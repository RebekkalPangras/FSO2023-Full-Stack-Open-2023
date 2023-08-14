import { useState } from 'react'

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const increaseGood = () => setGood(good + 1);
    const increaseNeutral = () => setNeutral(neutral + 1);
    const increaseBad = () => setBad(bad + 1);

    return (
        <div>
            <h3>Give Feedback</h3>
            <Button handleClick={increaseGood} text="good" />
            <Button handleClick={increaseNeutral} text="neutral" />
            <Button handleClick={increaseBad} text="bad" />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

const Button = ({ handleClick, text }) => (<button onClick={handleClick}>{text}</button>)

const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad
    const average = (good * 1 + neutral * 0 + bad * -1) / total
    const pos_percent = good / total;
    return (
        <>
            <h3>Statistics</h3>
            <p>Good :  {good}</p>
            <p>Neutral :   {neutral}</p>
            <p>Bad :  {bad}</p>
            <p>Total Scores : {total}</p>
            <p>Average : {average}</p>
            <p>Positive : {pos_percent} %</p>
        </>
    )
}

export default App;