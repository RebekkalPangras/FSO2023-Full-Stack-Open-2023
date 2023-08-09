import { useState } from "react";

const App = () => {
  const [counter, setCounter] = useState(0);
  console.log('Rendering with counter value ', counter);

  const resetToZero = () => {
    setCounter(0);
  }
  const increaseByOne = () => setCounter(counter + 1);
  const decreaseByOne = () => setCounter(counter - 1)

  return (
    <div>
      <Display counter={counter} />
      <Button handleClick={increaseByOne} text='plus' />
      <Button handleClick={decreaseByOne} text='minus' />
      <Button handleClick={resetToZero} text='reset' />
    </div>
  )
}

const Button = ({ handleClick, text }) => { <button onClick={handleClick}>{text}</button> }

const Display = ({ counter }) => { <div>{counter}</div> }

export default App;