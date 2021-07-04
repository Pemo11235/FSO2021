const dummy = (blogs) => {
	return 1;
}

const totalLikes = (blogs) => {
	if(blogs.length > 0) {
		const reducer = (totLikes, blogLike) => {
			return totLikes + blogLike
		}
		return blogs.map((blog) => blog.likes).reduce(reducer, 0)
	}
	return 0;
}

const  favoriteBlog = (blogs) => {
	if(blogs.length < 1){
		return {
			title: '',
			author: '',
			likes: 0,
		}
	}
	const likes = blogs.map((blog) => blog.likes)
	const max = Math.max(...likes)
	const favoriteBlog = blogs.find(blog => blog.likes === max)

	return {
		title: favoriteBlog.title,
		author: favoriteBlog.author,
		likes: favoriteBlog.likes,
	}
}
module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
}
