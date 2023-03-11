import { asset, Head } from '$fresh/runtime.ts'
import { AppProps } from '$fresh/src/server/types.ts'
import { Footer } from '../components/Footer.tsx'
import { Header } from '../components/Header.tsx'

export default function App({ Component }: AppProps) {
	return (
		<html lang='es'>
			<Head>
				<meta name='author' content='Felipe Cárdenas' />
				<meta charSet='utf-8' />
				<link rel='stylesheet' href={asset('/style.css')} />
			</Head>
			<body class='Main'>
				<Header />
				<main>
					<Component />
				</main>
				<Footer />
			</body>
		</html>
	)
}
