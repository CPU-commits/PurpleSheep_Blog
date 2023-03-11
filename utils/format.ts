import dayjs from 'npm:dayjs'

dayjs.locale('es')

const wordsPerMinute = 130

export function formatDate(date: Date | string) {
	return dayjs(date).format('DD MMM. YY')
}

export function formatDateJSONLd(date: Date | string) {
	return dayjs(date).format('YYYY-MM-DD')
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
