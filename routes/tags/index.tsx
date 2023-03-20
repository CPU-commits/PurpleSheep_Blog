import { Handlers, PageProps } from '$fresh/server.ts'
import { Head } from '$fresh/runtime.ts'
import { getTags } from '../../utils/posts.ts'

export const handler: Handlers<Array<string>> = {
	async GET(_req, ctx) {
		const tags = await getTags()
		return ctx.render(tags)
	},
}

export default function Tags(props: PageProps<Array<string>>) {
	const tags = props.data

	return (
		<>
			<Head>
				<title>Etiquetas blog - PurpleSheep</title>
				<meta
					name='description'
					content='Etiquetas de publicaciones Purple Sheep'
				/>
				<meta
					property='og:title'
					content='Etiquetas blog - PurpleSheep'
				/>
				<meta property='og:type' content='website' />
				<meta
					property='og:url'
					content='https://blog.purple-sheep.com/tags'
				/>
				<meta
					property='og:image'
					content='https://blog.purple-sheep.com/img/sheep.jpg'
				/>
				<meta
					property='og:description'
					content='Etiquetas de publicaciones Purple Sheep'
				/>
				<meta name='twitter:card' content='summary' />
				<meta
					name='twitter:title'
					content='Etiquetas blog - PurpleSheep'
				/>
				<meta
					name='twitter:description'
					content='Etiquetas blog - PurpleSheep'
				/>
				<meta
					name='twitter:image'
					content='https://blog.purple-sheep.com/img/sheep.jpg'
				/>
			</Head>
			<section class='TagsContainer'>
				<h1>
					Etiquetas <span class='Banner__sheep'>...</span>
				</h1>
				<section class='Tags TagsPage'>
					{tags.map((tag) => (
						<a href={`/tag/${tag}`}>
							<i class='fa-solid fa-hashtag'></i> {tag}
						</a>
					))}
				</section>
			</section>
		</>
	)
}
