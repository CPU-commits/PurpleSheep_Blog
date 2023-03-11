import { Post } from '../models/post.model.ts'
import { asset } from '$fresh/runtime.ts'
import { formatDate, randomPurpleWord, timeToRead } from '../utils/format.ts'

export function PostCard({ post, index }: { post: Post; index: number }) {
	return (
		<a
			class={`PostCard ${index % 5 === 0 ? 'PostCardLarge' : ''}`}
			href={`/post/${post.slug}`}
		>
			<header>
				<img loading='lazy' src={asset(post.img)} alt='Imagen Post' />
			</header>
			<div class='PostCard__content'>
				<div>
					<h2
						dangerouslySetInnerHTML={{
							__html: randomPurpleWord(post.title),
						}}
					/>
					<p>{post.snippet}</p>
				</div>
				<footer>
					{(() => {
						if (post.tags) {
							return (
								<small class='Tags'>
									<i class='fa-solid fa-hashtag'></i>{' '}
									{post?.tags?.map((tag, i) => (
										<p>
											{tag}{' '}
											{(post.tags?.length ?? 0) > i + 1
												? '-'
												: ''}
										</p>
									))}
								</small>
							)
						}
					})()}
					<small>
						{formatDate(post.published_at)}
						<i class='fa-solid fa-circle'></i>{' '}
						{timeToRead(post.content)} MIN. EAT
					</small>
				</footer>
			</div>
		</a>
	)
}
