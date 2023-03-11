import { Handlers, PageProps } from '$fresh/server.ts'
import { asset, Head } from '$fresh/runtime.ts'
import { Post } from '../../models/post.model.ts'
import { getPost } from '../../utils/posts.ts'
import { CSS, render } from 'https://deno.land/x/gfm@0.1.26/mod.ts'
import { formatDate, formatDateJSONLd } from '../../utils/format.ts'

export const handler: Handlers<Post> = {
	async GET(_req, ctx) {
		const post = await getPost(ctx.params.slug)
		if (post === null) return ctx.renderNotFound()
		return ctx.render(post)
	},
}

export default function Greet(props: PageProps<Post>) {
	const { data: post } = props
	const jsonLD = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		'mainEntityOfPage': {
			'@type': 'WebPage',
			'@id': `https://blog.purple-sheep.com/post/${props.params.slug}`,
		},
		'headline': post.snippet,
		'description': post.snippet,
		'image': `https://blog.purple-sheep.com${post.img}`,
		'author': {
			'@type': 'Person',
			'name': 'Felipe Cárdenas',
			'url': 'https://purple-sheep.com',
		},
		'publisher': {
			'@type': 'Organization',
			'name': 'PurpleSheep',
			'logo': {
				'@type': 'ImageObject',
				'url': 'https://blog.purple-sheep.com/favicon.ico',
			},
		},
		'datePublished': formatDateJSONLd(post.published_at),
		'dateModified': formatDateJSONLd(post.published_at),
	}
	return (
		<>
			<Head>
				<title>{post.title} - PurpleSheep</title>
				<meta name='description' content={post.snippet} />
				<meta
					name='keywords'
					content={`${post.tags?.join(', ')}, blog` ?? 'blog'}
				/>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
				/>
				<style dangerouslySetInnerHTML={{ __html: CSS }} />
			</Head>
			<article class='Post'>
				<header class='Post__header'>
					<img
						class='Post__img'
						src={asset(post.img)}
						alt='Imagen Post'
					/>
					<h1 class='Post__title'>{post.title}</h1>
					<h3 class='Post__subtitle'>{post.snippet}</h3>
					<footer>
						<span>{formatDate(post.published_at)}</span>
						<a href='/feed' rel='external' target='_blank'>
							<i class='fa-solid fa-rss'></i>
						</a>
					</footer>
				</header>
				<div
					class='Post__content'
					dangerouslySetInnerHTML={{ __html: render(post.content) }}
				/>
			</article>
		</>
	)
}
