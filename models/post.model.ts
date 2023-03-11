import { PostAttrs } from "./attrs.model.ts"

export type Post = {
	slug: string
	content: string
} & PostAttrs
