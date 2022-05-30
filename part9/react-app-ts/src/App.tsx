interface CoursePartBase {
  name: string
  exerciseCount: number
  type: string
}

interface CoursePartDescription extends CoursePartBase {
  description: string
}

interface CourseNormalPart extends CoursePartDescription {
  type: 'normal'
}
interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject'
  groupProjectCount: number
}

interface CourseSubmissionPart extends CoursePartDescription {
  type: 'submission'
  exerciseSubmissionLink: string
}

interface CourseSpecialPart extends CoursePartDescription {
  type: 'special'
  requirements: string[]
}

type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const Header = ({ courseName }: { courseName: string }): JSX.Element => (
  <h1>{courseName}</h1>
)
const Paragraph = ({
  name,
  exerciseCount,
  ...props
}: CoursePart): JSX.Element => (
  <p>
    <b>
      {name} {exerciseCount}{' '}
    </b>
  </p>
)

const Content = ({
  courseParts,
}: {
  courseParts: CoursePart[]
}): JSX.Element => (
  <>
    {courseParts.map((part) => (
      <Part part={part} key={part.name} />
    ))}
  </>
)

const Part = ({ part }: { part: CoursePart }): JSX.Element => {
  switch (part.type) {
    case 'normal':
      return (
        <Paragraph
          name={part.name}
          exerciseCount={part.exerciseCount}
          type={part.type}
          description={part.description}
        />
      )
    case 'groupProject':
      return (
        <Paragraph
          name={part.name}
          exerciseCount={part.exerciseCount}
          type={part.type}
          groupProjectCount={part.groupProjectCount}
        />
      )
    case 'submission':
      return (
        <Paragraph
          name={part.name}
          exerciseCount={part.exerciseCount}
          type={part.type}
          exerciseSubmissionLink={part.exerciseSubmissionLink}
          description={part.description}
        />
      )
    case 'special':
      return (
        <Paragraph
          name={part.name}
          exerciseCount={part.exerciseCount}
          type={part.type}
          requirements={part.requirements}
          description={part.description}
        />
      )
    default:
      return assertNever(part)
  }
}

const Total = ({ total }: { total: number }): JSX.Element => (
  <p>Number of exercises {total}</p>
)

const App = () => {
  const courseName = 'Half Stack application development'
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is the leisured course part',
      type: 'normal',
    },
    {
      name: 'Advanced',
      exerciseCount: 7,
      description: 'This is the harded course part',
      type: 'normal',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      type: 'groupProject',
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
      type: 'submission',
    },
    {
      name: 'Backend development',
      exerciseCount: 21,
      description: 'Typing the backend',
      requirements: ['nodejs', 'jest'],
      type: 'special',
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
