const wordsPerMinute = 130

export function formatDate(date: Date | string) {
	const dateTo = new Date(date)
	const year = dateTo.getFullYear().toString().substring(-2)
	const month = dateTo.toLocaleString('default', { month: 'short' })
	const day = dateTo.getDate()
	return `${day.toString().padStart(2, "0")} ${month}. ${year}`
}

export function formatDateJSONLd(date: Date | string) {
	const dateTo = new Date(date)
	const year = dateTo.getFullYear()
	const month = dateTo.getMonth() + 1
	const day = dateTo.getDate()
	return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
}

export function timeToRead(text: string) {
	return Math.floor(text.split(' ').length / wordsPerMinute) || 1
}

export function randomPurpleWord(text: string) {
	// Generate new text
	const newText: Array<string> = []
	const words = text.split(' ')
	const randomWord = Math.floor(Math.random() * words.length)
	words.forEach((word, i) => {
		if (i !== randomWord)
			newText.push(word)
		else newText.push(`<span class='Banner__sheep'>${word}</span>`)
	})
	return newText.join(' ')
}
