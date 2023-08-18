const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
}

const Header = ({ name }) => {
    return (
        <h1>{name}</h1>
    )
}

const Part = ({ name, exercises }) => {
    return (
        <p>{name} {exercises}</p>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
        </div>
    )
}

const Total = ({ parts }) => {
    var total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <h4>Total of {total} exercises</h4>
    )
}

export default Course;