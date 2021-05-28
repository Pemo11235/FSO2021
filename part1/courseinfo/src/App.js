import React from 'react'

const Header = ({course}) => {
    return (
        <h1>{course}</h1>
    )
}

const Content = ({part, exercises}) => {
    return <p>{part} {exercises}</p>
}

const Total = ({ex1, ex2, ex3}) => {
    return <p>Number of exercises {ex1 + ex2 + ex3}</p>
}
const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <div>
            <Header course={course}/>
            <Content part={part1} exercises={exercises1}/>
            <Content part={part2} exercises={exercises2}/>
            <Content part={part3} exercises={exercises3}/>
            <Total ex1={exercises1} ex2={exercises2} ex3={exercises3}/>
        </div>
    )
}

export default App