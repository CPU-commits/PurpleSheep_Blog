import { Handlers } from '$fresh/server.ts'
import { createRSS } from '../../utils/feed.ts'

export const handler: Handlers = {
	async GET() {
		const feed = await createRSS()
		return new Response(feed, {
			headers: {
				'Content-Type': 'application/xml',
			},
		})
	},
}
