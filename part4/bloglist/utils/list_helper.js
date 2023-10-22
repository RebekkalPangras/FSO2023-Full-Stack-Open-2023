const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {

    const addLikes = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.reduce(addLikes, 0)
}

module.exports = {
    dummy,
    totalLikes
}