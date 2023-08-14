import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [voteCount, setVoteCount] = useState({})

  const setNext = () => {
    const random_number = Math.floor(Math.random() * 8)
    setSelected(random_number)
  }

  const increaseVote = () => {
    var currentVoteCount = { ...voteCount }
    if (currentVoteCount[selected]) {
      currentVoteCount[selected] += 1
    } else {
      currentVoteCount[selected] = 1
    }
    setVoteCount(currentVoteCount)
  }

  return (
    <>
      <div>
        {anecdotes[selected]}
      </div>
      <DisplayVote voteCount={voteCount[selected]} />
      <Button handleClick={setNext} text="next anecdote" />
      <Button handleClick={increaseVote} text="Vote" />
    </>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)
const DisplayVote = ({ voteCount }) => {
  if (voteCount === undefined) {
    voteCount = 0
  }
  return (
    <p>Has {voteCount} votes</p>
  )
}
export default App