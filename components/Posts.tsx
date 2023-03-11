import { Post } from '../models/post.model.ts'
import { PostCard } from '../components/PostCard.tsx'

export default function Posts({ posts }: { posts: Array<Post | null> }) {
	return (
		<section class='Posts'>
			{posts.filter((post) => post !== null).map((post, i) => {
				if (post) return <PostCard post={post} index={i} />
			})}
		</section>
	)
}
