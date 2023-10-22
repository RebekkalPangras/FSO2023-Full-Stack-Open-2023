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
    const { title, author, likes } = blogs.reduce(findFavoriteBlog, blogs[0])
    console.log({ title, author, likes })
    return { title, author, likes }
}

const mostBlogs = (blogs) => {

    if (blogs.length === 0) {
        return null;
    }

    const authorCounts = blogs.reduce((counts, blog) => {
        counts[blog.author] = (counts[blog.author] || 0) + 1;
        return counts;
    }, {});

    const maxAuthor = Object.keys(authorCounts).reduce((a, b) =>
        authorCounts[a] > authorCounts[b] ? a : b
    );

    return {
        author: maxAuthor,
        blogs: authorCounts[maxAuthor],
    };
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null;
    }

    const authorLikes = blogs.reduce((likes, blog) => {
        const author = blog.author;
        const blogLikes = blog.likes;
        likes[author] = (likes[author] || 0) + blogLikes;
        return likes;
    }, {});

    const [maxAuthor, maxLikes] = Object.entries(authorLikes).reduce(
        (acc, [author, likes]) => (likes > acc[1] ? [author, likes] : acc),
        ['', 0]
    );

    return {
        author: maxAuthor,
        likes: maxLikes,
    };
};


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}