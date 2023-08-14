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
            <Button handleClick={increaseGood} text='good' />
            <Button handleClick={increaseNeutral} text="neutral" />
            <Button handleClick={increaseBad} text="bad" />
            <h3>Statistics</h3>
            <p>good {good}</p>
            <p>neutral  {neutral}</p>
            <p>bad {bad}</p>
        </div>
    )
}

const Button = ({ handleClick, text }) => ( <button onClick={handleClick}>{text}</button> )

export default App;