---
title: Cómo hacer SEO técnico para tu sitio web
published_at: 2023-03-11T02:53:00.000Z
snippet: Resumen paso a paso de qué tener en cuenta para gestionar el SEO técnico de tu sitio web
img: /img/seo.jpg
tags: ['seo', 'technical']
---

Todo ciclo de vida de construcción de un sitio web está repleto de problemas. En una web hay un sinfín de cosas que perfectamente podrían botar tu trabajo al traste. Aspectos técnicos como
rendimiento, eficiencia y funcionalidad, aspectos visuales como UX y UI, o aspectos tan invisibles y que hasta a veces ignoramos: **visibilidad**.

La manera más óptima para conseguir visibilidad es que tu sitio sea encontrado a través
de los motores de búsqueda, para dicha tarea es que existe el SEO o por sus ciclas *Search Engine Optimization*. El SEO en simples palabras es la tarea de óptimizar nuestro sitio para
que sea encontrado por los diferentes motores de búsqueda. Ahora bien, el SEO tiene dos caras 
a afrontar, la gestión de contenido y disponer de manera técnica ese contenido, este artículo
es sobre lo segundo.

## SEO Técnico

### Metaetiquetas

Las metaetiquetas son etiquetas escritas en *HTML* que se encuentran dentro del encabezado, es
decir dentro de la etiqueta **\<head />**. Estas etiquetas nos dan información sobre el 
contenido dentro de la página, entre estas están:

```html
<head>
	<!-- Titulo de la página -->
	<title>Title</title>
	<!-- Descripción -->
	<meta name="description" content="Descripción de la pagina" />
	<!-- Palabras clave -->
	<meta name="keywords" content="keyword1, keyword2..." />
</head>
```

Todas estas etiquetas se dan a nivel de cada página dentro del sitio.

Existen muchas más meta etiquetas que necesitaremos usar dentro del SEO técnico, que ya son
más específicas, las cuales te cuento más abajo.

### Sitemap

Sitemap es una herramienta que permite a los motores de búsqueda determinar cuál es la 
distribución de las rutas de nuestro sitio. Se escribe en *xml* y generalmente se encuentra
en todos las aplicaciones web en la ruta *domain.com/sitemap.xml* a modo de ejemplo
en este mismo blog puedes encontrar el [sitemap](/sitemap.xml).

A modo de ejemplo un sitemap está construido de la siguiente forma:

```xml
<!-- Esta parte declara el objeto global y el formato de sitemap a usar. Es como declarar la versión del sitemap -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml"> 
	<!-- De aquí en adelante se declaran los url bloques -->
	<url>
		<loc>https://blog.purple-sheep.com/</loc> <!-- Localización dentro de tu sitio -->
		<lastmod>2023-03-19</lastmod> <!-- Fecha de última modificación de esta página -->
		<changefreq>daily</changefreq> <!-- Declaración de frecuencia de cambio de la página -->
		<priority>0.8</priority> <!-- Prioridad de la página en función a tu criterio -->
	</url>
</urlset>
```

De todas formas, toda la documentación respecto de qué otros esquemas tomar o qué es obligatorio o no en un sitemap, lo puedes consultar [aquí](https://www.sitemaps.org/protocol.html).

A modo de ayuda, también puedes usar librerías o módulos de *node* que ayudan a implementar
sitemaps de manera más fácil. [Este](https://www.npmjs.com/package/sitemap) es mi favorito.

### Open Graph [Twitter Cards y Facebook OG]

Siguiendo en la linea de las meta etiquetas, con encontramos con Open Graph. ¿Esto qué es? 
Bueno, Open Graph es un protocolo para que cualquier sitio web tércero le sea más fácil
obtener de manera inriquecida información sobre tu sitio. OG es el estándar más representativo
, sin embargo Twitter con sus Twitter Cards, hace algo bastante parecido.

Estos datos enriquecidos podrán ser accedidos a través de esas meta etiquetas de nuestro sitio
, y que finalmente nos recompensarán con tarjetas de nuestro contenido al momento de compartir
un enlace de nustra aplicación.

#### OG
```html
<html prefix="og: https://ogp.me/ns#">
	<head>
		<meta property="og:title" content="The Rock" /> <!-- Titulo del sitio -->
		<meta property="og:type" content="video.movie" /> <!-- Tipo de contenido dentro del sitio -->
		<meta property="og:url" content="https://www.imdb.com/title/tt0117500/" /> <!-- URL del sitio -->
		<!-- Imagen del sitio (Si la página NO tiene imagenes, usa una por defecto para todo la aplicación) -->
		<meta property="og:image" content="https://ia.media-imdb.com/images/rock.jpg" />
	</head>
</html>
```

> Ejemplo usado de https://ogp.me/

#### Twitter Cards
```html
<head>
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content="@nytimesbits" />
	<meta name="twitter:creator" content="@nickbilton" />
</head>
```
> Ejemplo usado de https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started

De esta forma, idealmente debes usar las dos, en conjunto son muy poderosas y permitirás
que cualquier sitio pueda generar una tarjeta enriquecida fácilmente.

Te dejo también dos sitios para válidar [OG](https://debug.iframely.com/) y [Twitter Cards](https://cards-dev.twitter.com/validator) de tu sitio.

### Canonical

Canonical es una etiqueta para hacer que los motores de búsqueda identifiquen nuestras 
páginas que deben ser indexadas en caso de duplicaciones.

Un pequeño ejemplo:

|Enlace 1                   | Enlace 2                          |
| ------------------------- | --------------------------------- |
| dominio.com/ordenadores/1 | dominio.com/ordenadores/laptop-42 |
| dominio.com/              | dominio.com/index.html            |

En los dos ejemplos hay dos sitios que por URL son completamente distintos pero apuntan
a la misma página, es decir, al mismo contenido.

Es entonces que el robot o motor de búsqueda va a tratar de indexar los dos sitios, cuestión
que nos perjudica, ya que es realmente confuso tener dos enlaces al mismo contenido... Cosa
que no es muy premiada tampoco por los motores de búsqueda.

Es por este problema que existe la etiqueta:

```html
<link rel="canonical" href=”https://dominio.com/contenido_indexado” />
```
De la manera que funciona es que en los sitios donde está duplicado el contenido, debes
colocar dicha etiqueta apuntando al que en base a tu criterio quieras indexar. El atributo 
*href* contenido, como dije es a criterio, ¡coloca el enlace que creas es mejor para tu sitio!

### JSON-LD
JSON-LD por sus siglas *Javascript Object Notation for Linked Data*, es en sencillo un método
para añadir datos estructurados a tu sitio web a través de un formato JSON. Este método
ayuda a los motores a poder conseguir el contenido de tu sitio de una manera más estructurada,
de manera tal, que te recomponensan en las búsquedas.

Google por ejemplo, permite habilitar [funciones y mejoras en los resultados de búsqueda](https://developers.google.com/search/docs/appearance/structured-data/search-gallery?hl=es).
Que vendrían siendo las tarjetas de recetas, reseñas de libros, entre otras, que hemos visto de toda la vida en una búsqueda.

Un [ejemplo de receta por Google](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data?hl=es#how-structured-data-works-in-google-search):
```html
<head>
    <title>Party Coffee Cake</title>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org/",
      "@type": "Recipe",
      "name": "Party Coffee Cake",
      "author": {
        "@type": "Person",
        "name": "Mary Stone"
      },
      "datePublished": "2018-03-10",
      "description": "This coffee cake is awesome and perfect for parties.",
      "prepTime": "PT20M"
    }
    </script>
  </head>
```
Finalmente, un JSON-LD es un JSON que está incrustado justo debajo de una etiqueta \<script type="application/ld+json" />
y que está estructurado en base a un [esquema](https://json-ld.org/).

De todas formas, hay hacks que nos hacen la vida más fácil, el que yo ocupo para generar mis
datos enriquecidos es [technicalseo.com, en su herramienta de generación de JSON-LD](https://technicalseo.com/tools/schema-markup-generator/).

### Meta robots y robots.txt
Ahh... Robots y robots.txt, cuando yo los vi por primera vez me pareció confuso a más no poder,
porque la idea central detrás de estos dos (que son parecidos pero **NO IGUALES**) es poder
hablar con el *robot* (es decir, el motor de búsqueda) y decirle por dónde buscar, qué contenido indexar y finalmente, cómo comportarse.

#### robots.txt
Primero robots.txt, este es un archivo de texto plano con la extensión txt, que debe encontrarse en tu sitio en la ruta dominio.com/robots.txt. Este archivo le indica a qué robot
o robots sobre qué URLs pueden o no acceder. Es para evitar, por ejemplo, sobre carga de solicitudes, o que no existan solicitudes sobre determinadas rutas. Esto **no significa que no se vaya a indexar dicha ruta en caso de negarle el acceso a un robot a tu sitio**.

Su sintaxis es sencilla:
```txt
User-agent: *
Allow: /

User-agent: Googlebot-Image
Disallow: /
```
Este es el [robots.txt de mi sitio por ejemplo](/robots.txt). Es una lista donde lo que debes
hacer es declarar a qué robot, agente o motor de búsqueda quieres hablarle, y luego declarar
dos partes, el *Allow* y *Disallow*, donde Allow es que rutas quieres habilitar, y disallow
deshabilitar.

Verdaderamente, robots.txt no tiene mucha utilidad real, más que limitar a robots de imagenes a que entren a tu sitio, o decirle a los agentes que no consulten
en tu carpeta de estáticos o imagenes. Ya que casi nadie quiere que se indexen archivos.

#### Meta robots
Bien, meta etiqueta para robots por otro lado, sí tiene más utilidad. Es parecido a lo anterior, pero con muchas más reglas y funcionalidades, ejemplo de reglas:

- noindex: Evita que la página se indexe.
- nofollow: Evita que se sigan los enlaces que están inmersos en dicha página.
- none: Es un noindex + nofollow en una sola regla.

Etc... Puedes consultarlas [aquí de todas formas](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag?hl=es#directives).

Principalmente yo las uso para evitar que contenido que debería ser privado, o limitado, sea
indexado por Google u otros motores.

Esta se escribe de la siguiente forma:
```html
<head>
	<meta name="robots" content="noindex" />
</head>
```
Esto en cualquier página que no quieras indexar y listo.

PD: En teoria puedes no usar esta meta etiqueta y en su lugar ocupar *headers*, pero es
más problema si esto lo montas sin servidor o proxy :). Sin embargo te lo dejo equivalente por si acaso:

```txt
HTTP/1.1 200 OK
Date: Tue, 25 May 2010 21:42:43 GMT
(…)
X-Robots-Tag: noindex
(…)
```
> https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag?hl=es#xrobotstag

### RSS - Feed
Hemos por fin terminado con las meta etiquetas. Y ahora entramos en materia digamosle opcional, pero util.

RSS por sus siglas Really Simple Syndication, es un formato escrito en XML para distribuir y
compartir contenido en la web. Es más que nada un formato para poder simplificar el proceso
de compartir el contenido con térceros que no van a ser máquinas, sino que humanos.

Este lo podrás encontrar en dominio.com/feed, como en este [mismo blog](/feed).

Ahora bien, aquí un ejemplo:

```xml
<!-- Declaración del bloque Feed global. Con su respectivo schema -->
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
	<id>https://blog.purple-sheep.com</id> <!-- Identificador del feed -->
	<title>Blog - Purple Sheep</title> <!-- Titulo del sitio -->
	<subtitle>Escritura casual sobre tecnología y la vida misma</subtitle> <!-- Descripción / Subtitulo del sitio -->
	<updated>2023-03-11T02:53:00.000Z</updated> <!-- Última actualización -->
	<link rel="self" href="https://blog.purple-sheep.com/feed"/> <!-- Enlace del feed -->
	<link href="https://blog.purple-sheep.com"/> <!-- Enlace del sitio -->
	<icon>https://blog.purple-sheep.com/favicon.ico</icon> <!-- Icono del sitio -->
	<author> <!-- Author con nombre y email -->
		<name>Felipe Cárdenas</name>
		<email>felipecardenas301@gmail.com</email>
	</author>
	<!-- Desde este punto, vienen las entradas de tu contenido -->
	<entry> 
		<title>¡Primera publicación de Purple Sheep Blog...!</title> <!-- Titulo de la entrada -->
		<id>https://blog.purple-sheep.com/post/first-post</id> <!-- Identificador de tu entrada -->
		<link href="https://blog.purple-sheep.com/post/first-post"/> <!-- Enlace de la entrada -->
		<updated>2023-03-11T02:53:00.000Z</updated> <!-- Última actualización de tu entrada -->
		<author> <!-- Autor o autores de tu entrada -->
			<name>Felipe Cárdenas</name>
			<email>felipecardenas301@gmail.com</email>
		</author>
		<!-- Una pequeña descripción -->
		<summary>Primera publicación del blog de Purple Sheep, emocionante.</summary>
		<!-- Imágen -->
		<media:content url="https://blog.purple-sheep/img/sheeps.jpg" type="img/jpg"/>
		<!-- Contenido con su atributo type, que describe el tipo de contenido dentro -->
		<content type="text/markdown">
			...
		</content>
	</entry>
</feed>
```
Es mucho... Pero no es tanto si consideras que es una forma muy óptima de compartir contenido.

[He aquí el esquema para que te guies](https://datatracker.ietf.org/doc/html/rfc4287).

### Rutas
Por último, a modo de consejo, trata de siempre utilizar, pocos niveles de profundidad
en tus rutas URLs, con niveles me refiero a:

> dominio.com/nivel1/nivel2/nivel3...

Trata de conseguir un máximo de entre 4 a 5 niveles. También trata de que los nombres de las
rutas que vayas a usar signifiquen algo, que las puedas leer y entiendas más o menos
a qué apunta esa URL, eso también ayuda mucho.

## Conclusiones...

A modo de conclusión, a sido realmente mucho ¡eh! Pero trata realmente de implementar todas
estas herramientas que te acabo de mencionar, investigalas y si por último no las vas a investigar,
di ejemplos bastantes claros sobre cómo son, dónde van y qué forma tienen. Puedes copiar y pegarlas y empezar a editarlas desde ahí.

También consulta alguna otras guias sobre cómo gestionar el contenido de tu web, ya que yo no
soy definitivamente el más experto.

Pero siempre recuerda si tu sitio no llega, entonces no es un buen sitio. ¡Suerte!
