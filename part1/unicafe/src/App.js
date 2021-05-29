import React, {useState} from 'react'

const Header = ({text}) => {
    return (<h1>{text}</h1>)
}

const Button = ({handleClick, text}) => {
    return <button title={text} onClick={handleClick}>{text} </button>
}

const Display = ({lines}) => {
    return (
        <>
            <Line elem={lines.good}/>
            <Line elem={lines.neutral}/>
            <Line elem={lines.bad}/>
            <Line elem={lines.all}/>
            <Line elem={lines.average}/>
            <Line elem={lines.positive}/>
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
    const [all, setAll] = useState(0);
    const [average, setAverage] = useState(0);
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
        },
        all: {
            text: 'All',
            value: all,
        },
        average: {
            text: 'Average',
            value: all === 0 ? 0 : average / all,
        },
        positive: {
            text: 'Positive',
            value: all === 0 ? 0 : (good * 100) / all + ' %',
        }
    }

    const handleGood = () => {
        setGood(good + 1)
        setAll(all + 1)
        setAverage(average + 1)
    }
    const handleNeutral = () => {
        setNeutral(neutral + 1)
        setAll(all + 1)
    }
    const handleBad = () => {
        setBad(bad + 1)
        setAll(all + 1)
        setAverage(average - 1)
    }

    return (
        <div>
            <Header text={'Give feedback'}/>
            <Button handleClick={handleGood} text={'Good'}/>
            <Button handleClick={handleNeutral} text={'Neutral'}/>
            <Button handleClick={handleBad} text={'Bad'}/>
            <Header text={'Statistics'}/>
            <Display lines={lines}/>
        </div>
    )
}

export default App