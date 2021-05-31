import React from "react";

const Header = ({course}) => {
    return (
        <h1>{course}</h1>
    )
}

const Content = ({parts}) => {
    return (
        <div>
            {parts.map(part => <Part key={part.name} part={part.name} exercise={part.exercises}/>)}
        </div>
    )
}
const Part = ({part, exercise}) => {
    return <p>{part} {exercise}</p>
}

const Total = ({exercises}) => {
    return <p><b>Number of exercises {exercises.reduce((acc, curr) => acc += curr)}</b></p>
}

const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total exercises={course.parts.map(part => part.exercises)}/>
        </div>
    )
}

export default Course;