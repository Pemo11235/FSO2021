interface CoursePart {
  name: string
  exerciseCount: number
}

const Header = ({ courseName }: { courseName: string }): JSX.Element => (
  <h1>{courseName}</h1>
)
const Paragraph = ({ name, exerciseCount }: CoursePart): JSX.Element => (
  <p>
    {name} {exerciseCount}
  </p>
)

const Content = ({
  courseParts,
}: {
  courseParts: CoursePart[]
}): JSX.Element => (
  <>
    {courseParts.map(({ name, exerciseCount }) => (
      <Paragraph name={name} exerciseCount={exerciseCount} key={name} />
    ))}
  </>
)

const Total = ({ total }: { total: number }): JSX.Element => (
  <p>Number of exercises {total}</p>
)

const App = () => {
  const courseName = 'Half Stack application development'
  const courseParts = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
    },
  ]
  const totalExercises = courseParts.reduce(
    (carry, part) => carry + part.exerciseCount,
    0
  )

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total total={totalExercises} />
    </div>
  )
}

export default App
