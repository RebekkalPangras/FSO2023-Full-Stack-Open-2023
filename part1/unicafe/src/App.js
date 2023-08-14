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
const StatisticLine = ({text, value}) => (
<tr>
    <td>{text}</td>
    <td>{value}</td>
</tr>
)

const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad
    if(total === 0) {
        return(<h4>No Feedback Given</h4>)
    }
    const average = (good * 1 + neutral * 0 + bad * -1) / total
    const pos_percent = good / total;
    return (
        <>
            <h3>Statistics</h3>
            <table>
                <tbody>
                    <StatisticLine text="Good" value={good} />
                    <StatisticLine text="Neutral" value={neutral} />
                    <StatisticLine text="Bad" value={bad} />
                    <StatisticLine text="Total" value={total} />
                    <StatisticLine text="Average" value={average} />
                    <StatisticLine text="Positive" value={pos_percent} />
                </tbody>
            </table>
        </>
    )
}

export default App;