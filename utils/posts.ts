import { z } from 'https://deno.land/x/zod@v3.21.0/mod.ts'
import { join } from "https://deno.land/std@0.150.0/path/mod.ts"
import { extract } from 'https://deno.land/std@0.150.0/encoding/front_matter.ts'
import { Post } from "../models/post.model.ts"
import { PostAttrs } from '../models/attrs.model.ts'

function validateAttrs(post: unknown): post is PostAttrs {
	try {
		const schemaAttrs = z.object({
			title: z.string(),
			published_at: z.date(),
			snippet: z.string(),
			img: z.string(),
			tags: z.array(z.string()).optional(),
		})
		schemaAttrs.parse(post)
		return true
	} catch (err) {
		return false
	}
}

export async function getPost(slug: string): Promise<Post | null> {
	const text = await Deno.readTextFile(join('./posts', `${slug}.md`))
	const { attrs, body } = extract(text)
	if (validateAttrs(attrs))
		return {
			slug,
			title: attrs.title,
			published_at: attrs.published_at,
			content: body,
			snippet: attrs.snippet,
			img: attrs.img,
			tags: attrs.tags,
		}
	return null
}

export async function getPosts(): Promise<Array<Post>> {
	const files = Deno.readDir('./posts')
	const promises = []
	for await (const file of files) {
		const slug = file.name.replace('.md', '')
		promises.push(getPost(slug))
	}
	const posts = await Promise.all(promises) as Array<Post>
	posts.sort((a, b) => b.published_at.getTime() - a.published_at.getTime())

	return posts
}

export async function getPostsByTag(tag: string): Promise<Array<Post>> {
	const posts = await getPosts()

	return posts.filter((post) => post !== null && post.tags?.includes(tag))
}

export async function getTags(): Promise<Array<string>> {
	const posts = await getPosts()

	return posts
		.filter((post) => post !== null && post?.tags)
		.flatMap((post) => post?.tags ?? [])
}
