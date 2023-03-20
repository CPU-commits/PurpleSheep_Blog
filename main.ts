/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";
import { join } from 'https://deno.land/std@0.150.0/path/mod.ts'
import sass from 'https://deno.land/x/denosass@1.0.6/mod.ts'

async function compileScss() {
	// Get code css file
	const scss = await Deno.readTextFile(
		join('./assets', 'scss', 'highlight.scss'),
	)
	sass(scss).to_file({
		destDir: join('./assets', 'out'),
		destFile: 'hightlight.css',
	})
}

await compileScss()

await start(manifest);
