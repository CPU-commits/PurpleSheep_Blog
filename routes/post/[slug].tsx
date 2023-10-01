import { Handlers, PageProps } from "$fresh/server.ts";
import { asset, Head } from "$fresh/runtime.ts";
import { Post } from "../../models/post.model.ts";
import { getPost } from "../../utils/posts.ts";
import { CSS, render } from "https://deno.land/x/gfm@0.1.26/mod.ts";
import { join } from "https://deno.land/std@0.150.0/path/mod.ts";
import { formatDate, formatDateJSONLd } from "../../utils/format.ts";

export const handler: Handlers<{ post: Post; css: string }> = {
	async GET(_req, ctx) {
		// Get post
		const post = await getPost(ctx.params.slug);
		if (post === null) return ctx.renderNotFound();
		// Get code css file
		const hightlightCSS = await Deno.readTextFile(
			join("./assets", "css", "highlight.css")
		);
		return ctx.render({
			post,
			css: hightlightCSS,
		});
	},
};

export default function Greet(props: PageProps<{ post: Post; css: string }>) {
	const {
		data: { post, css },
	} = props;
	const jsonLD = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `https://blog.purple-sheep.com/post/${props.params.slug}`,
		},
		headline: post.snippet,
		description: post.snippet,
		image: `https://blog.purple-sheep.com${post.img}`,
		author: {
			"@type": "Person",
			name: "Felipe Cárdenas",
			url: "https://purple-sheep.com",
		},
		publisher: {
			"@type": "Organization",
			name: "PurpleSheep",
			logo: {
				"@type": "ImageObject",
				url: "https://blog.purple-sheep.com/favicon.ico",
			},
		},
		datePublished: formatDateJSONLd(post.published_at),
		dateModified: formatDateJSONLd(post.published_at),
	};
	return (
		<>
			<Head>
				<title>{post.title} - PurpleSheep</title>
				<meta name="description" content={post.snippet} />
				<meta
					name="keywords"
					content={`${post.tags?.join(", ")}, blog` ?? "blog"}
				/>
				<meta
					property="og:title"
					content={`${post.title} - PurpleSheep`}
				/>
				<meta property="og:type" content="article" />
				<meta
					property="og:url"
					content={`https://blog.purple-sheep.com/post/${post.title}`}
				/>
				<meta
					property="og:image"
					content={`https://blog.purple-sheep.com${post.img}`}
				/>
				<meta property="og:description" content={post.snippet} />
				<meta
					name="article:published_time"
					content={post.published_at.toISOString()}
				/>
				<meta
					name="article:modified_time"
					content={post.published_at.toISOString()}
				/>
				<meta
					name="article:author"
					content="https://purple-sheep.com"
				/>
				<meta name="twitter:card" content="summary_large_image" />
				<meta
					name="twitter:title"
					content={`${post.title} - PurpleSheep`}
				/>
				<meta name="twitter:description" content={post.snippet} />
				<meta
					name="twitter:image"
					content={`https://blog.purple-sheep.com${post.img}`}
				/>
				{(() => {
					if ((post.tags?.length ?? 0) > 0) {
						return (
							<meta
								name="article:section"
								content={(post.tags as Array<string>)[0]}
							/>
						);
					} else {
						return <meta name="article:section" content="Blog" />;
					}
				})()}
				{post.tags?.map((tag) => (
					<meta name="article:tag" content={tag} />
				))}
				<meta />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
				/>
				<style dangerouslySetInnerHTML={{ __html: CSS }} />
				<style dangerouslySetInnerHTML={{ __html: css }} />
			</Head>
			<article class="Post">
				<header class="Post__header">
					<img
						class="Post__img"
						src={asset(post.img)}
						alt="Imagen Post"
					/>
					<h1 class="Post__title">{post.title}</h1>
					<h3 class="Post__subtitle">{post.snippet}</h3>
					<footer>
						<span>{formatDate(post.published_at)}</span>
						<a href="/feed" rel="external" target="_blank">
							<i class="fa-solid fa-rss"></i>
						</a>
					</footer>
				</header>
				<div
					class="Post__content"
					dangerouslySetInnerHTML={{ __html: render(post.content) }}
				/>
			</article>
		</>
	);
}
