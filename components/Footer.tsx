import { asset } from '$fresh/runtime.ts'

export function Footer() {
	return (
		<footer class='Footer'>
			<div class='Footer__links'>
				<h1>@Purple Sheep {new Date().getFullYear()}</h1>
				<a href='https://purple-sheep.com'>
					To... Purple Sheep!
				</a>
			</div>
			<div class='Footer__powered'>
				<strong class='Banner__sheep'>Powered by...</strong>
				<img src={asset('/logo.svg')} alt='Logo Deno Fresh' />
				<img src={asset('/img/logos/deno.png')} alt='Logo Deno' />
				<strong class='Banner__sheep'>...</strong>
			</div>
		</footer>
	)
}
