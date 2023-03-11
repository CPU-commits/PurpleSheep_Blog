import { Head } from '$fresh/runtime.ts'
import { Handlers, PageProps } from '$fresh/server.ts'
import Posts from '../../components/Posts.tsx'
import { Post } from '../../models/post.model.ts'
import { getPostsByTag } from '../../utils/posts.ts'

export const handler: Handlers<Array<Post>> = {
	async GET(_req, ctx) {
		const posts = await getPostsByTag(ctx.params.tag)
		if (posts.length === 0) return ctx.renderNotFound()
		return ctx.render(posts)
	},
}

export default function Tag(props: PageProps<Array<Post>>) {
	const { data: posts } = props
	return (
		<>
			<Head>
				<title>Etiqueta {props.params.tag} - PurpleSheep</title>
				<meta
					name='description'
					content={`Publicaciones para tiqueta ${props.params.tag}`}
				/>
			</Head>
			<section class='TagsContainer'>
				<h1>
					Tag<span class='Banner__sheep'>...</span>{' '}
					<i class='fa-solid fa-hashtag'></i>
					{props.params.tag}
				</h1>
				<Posts posts={posts} />
			</section>
		</>
	)
}
