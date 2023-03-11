import { SitemapContext } from 'https://deno.land/x/fresh_seo@0.2.1/mod.ts'
import { Handlers } from '$fresh/server.ts'
import manifest from '../fresh.gen.ts'
import { getPosts, getTags } from '../utils/posts.ts'

export const handler: Handlers = {
	async GET() {
		const sitemap = new SitemapContext(
			'https://blog.purple-sheep.com',
			manifest,
		)

		// Add posts and tags
		const posts = await getPosts()
		const tags = await getTags()
		posts.forEach((post) => {
			sitemap.add(`post/${post.slug}`)
		})
		tags.forEach((tag) => {
			sitemap.add(`tag/${tag}`)
		})
		// Remove feed
		sitemap.remove('/feed/')
		return sitemap.render()
	},
}
