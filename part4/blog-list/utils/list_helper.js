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
module.exports = {
	dummy,
	totalLikes
}
