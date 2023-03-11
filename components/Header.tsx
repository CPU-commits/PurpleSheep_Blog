export function Header() {
	return (
		<header class='Header'>
			<a href='/'>
				<h1>
					PurpleSheep
					<small>blog...</small>
				</h1>
			</a>
			<div class='Header__right'>
				<a href='/tags'>
					Etiquetas
				</a>
				<a href='https://github.com' rel='external' target='_blank'>
					<i class='fa-brands fa-github'></i>
				</a>
			</div>
		</header>
	)
}
