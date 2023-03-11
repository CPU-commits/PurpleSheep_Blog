import { Handlers, PageProps } from '$fresh/server.ts'
import { asset, Head } from '$fresh/runtime.ts'
import Posts from '../components/Posts.tsx'
import { Post } from '../models/post.model.ts'
import { getPosts } from '../utils/posts.ts'

export const handler: Handlers<Array<Post>> = {
	async GET(_req, ctx) {
		const posts = await getPosts()
		return ctx.render(posts)
	},
}

export default function Home(props: PageProps<Array<Post | null>>) {
	const jsonLD = {
		'@context': 'https://schema.org/',
		'@type': 'WebSite',
		'name': 'Blog - Purple Sheep',
		'url': 'https://blog.purple-sheep.com',
		'potentialAction': {
			'@type': 'SearchAction',
			'target': '{search_term_string}',
			'query-input': 'required name=search_term_string',
		},
	}

	return (
		<>
			<Head>
				<title>Blog - PurpleSheep</title>
				<meta
					name='description'
					content='Blog de Purple Sheep - Escritura casual sobre tecnología y la vida misma'
				/>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
				/>
			</Head>
			<section class='Banner'>
				<h2>
					Purple <span class='Banner__sheep'>Sheep. /</span>
					Blog
				</h2>
				<img
					src={asset('/img/sheep.jpg')}
					alt='Oveja en blanco y negro'
				/>
				<p>Escritura casual sobre tecnolog&iacute;a y la vida misma</p>
			</section>
			<Posts posts={props.data} />
		</>
	)
}
