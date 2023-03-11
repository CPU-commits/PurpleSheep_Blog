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
