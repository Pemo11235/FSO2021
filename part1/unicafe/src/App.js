import React, {useState} from 'react'

const Header = ({text}) => {
    return (<h1>{text}</h1>)
}

const Button = ({handleClick, text}) => {
    return <button title={text} onClick={handleClick}>{text} </button>
}

const Display = ({good, neutral, bad}) => {
    const lines = {
        good: {
            text: 'Good',
            value: good,
        },
        neutral: {
            text: 'Neutral',
            value: neutral,
        },
        bad: {
            text: 'Bad',
            value: bad,
        }
    }
    return (
        <>
            <Line elem={lines.good}/>
            <Line elem={lines.neutral}/>
            <Line elem={lines.bad}/>
        </>
    )
}

const Line = ({elem}) => {
    return <p>{elem.text} {elem.value}</p>
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGood = () => setGood(good + 1)
    const handleNeutral = () => setNeutral(neutral + 1)
    const handleBad = () => setBad(bad + 1)

    return (
        <div>
            <Header text={'Give feedback'}/>
            <Button handleClick={handleGood} text={'Good'}/>
            <Button handleClick={handleNeutral} text={'Neutral'}/>
            <Button handleClick={handleBad} text={'Bad'}/>
            <Header text={'Statistics'} />
            <Display good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

export default App