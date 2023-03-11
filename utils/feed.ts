import { stringify } from "https://deno.land/x/xml@2.1.0/mod.ts"
import { Post } from "../models/post.model.ts"
import { getPosts } from './posts.ts'

function addXML(xml: string) {
	return `<?xml version="1.0" encoding="utf-8"?>
	${xml}
	`
}

function getLastUpdated(posts: Array<Post>): Date {
	let lastPost = posts[0]
	for (const post of posts) {
		if (post.published_at.getTime() > lastPost.published_at.getTime())
			lastPost = post
	}

	return lastPost.published_at
}

export async function createRSS() {
	const posts = (await getPosts()).filter((post) => post !== null)

	return addXML(stringify({
		feed: {
			'@xmlns': 'http://www.w3.org/2005/Atom',
			'@xmlns:media': 'http://search.yahoo.com/mrss/',
			id: 'https://blog.purple-sheep.com',
			title: 'Blog - Purple Sheep',
			subtitle: 'Escritura casual sobre tecnología y la vida misma',
			updated: getLastUpdated(posts).toISOString(),
			link: [
				{
					'@rel': 'self',
					'@href': 'https://blog.purple-sheep.com/feed',
				},
				{
					'@href': 'https://blog.purple-sheep.com',
				},
			],
			icon: 'https://blog.purple-sheep.com/favicon.ico',
			author: {
				name: 'Felipe Cárdenas',
				email: 'felipecardenas301@gmail.com',
			},
			entry: posts.map((post) => ({
				title: post.title,
				id: `https://blog.purple-sheep.com/post/${post.slug}`,
				link: {
					'@href': `https://blog.purple-sheep.com/post/${post.slug}`,
				},
				updated: post.published_at.toISOString(),
				author: {
					name: 'Felipe Cárdenas',
					email: 'felipecardenas301@gmail.com',
				},
				summary: post.snippet,
				'media:content': {
					'@url': `https://blog.purple-sheep${post.img}`,
					'@type': 'img/jpg',
				},
				content: {
					'@type': 'text/markdown',
					'#text': `<![CDATA[
					${post.content}
					]]>`,
				},
			})),
		},
	}))
}
