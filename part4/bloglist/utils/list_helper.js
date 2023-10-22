const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {

    const addLikes = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.reduce(addLikes, 0)
}

const favoriteBlog = (blogs) => {
    const findFavoriteBlog = (favBlog, blog) => {
        return favBlog.likes > blog.likes ? favBlog : blog
    }
    const {title, author, likes} = blogs.reduce(findFavoriteBlog, blogs[0])
    console.log({title, author, likes})
    return {title, author, likes}
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}