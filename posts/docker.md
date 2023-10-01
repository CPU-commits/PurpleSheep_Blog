---
title: ¿Cómo hacer Docker y no fallar como Frontend?
published_at: 2023-09-16T02:53:00.000Z
snippet: Dedicado al frontend que alguna vez fui...
img: /img/contenedores.jpg
tags: ['docker', 'frontend', 'backend', 'containers']
---

Docker... La tecnología de la 🐳 definitivamente no deja a nadie indiferente. A día de hoy, Docker no necesita presentaciones (por algo estás aquí), mas, una pequeña introducción:

**LA MEJOR HERRAMIENTA DEL MUNDO**. Ah, y gestiona contenedores...

*Docker proporciona un conjunto de herramientas de desarrollo, servicios, contenido confiable y automatizaciones, utilizados individualmente o en conjunto, para acelerar la entrega de aplicaciones seguras.* Docker: Accelerated Container Application Development. (2023). Docker. https://www.docker.com/

Así se vende Docker a sí mismo, sin embargo, lo importante es entender... (SI QUIERES IR DIRECTAMENTE A LOS EJEMPLOS DE USO [AQUÍ](#🧐-usemos-docker))

> 💡 Como aclaración, esta guía no pretende que aprendas Docker a profundidad, pasaré por
alto contenedores, máquinas virtuales, la capa de abstracción extra que añade Docker, el
deamon, red, entre muchos otros conceptos...

## ¿Qué mierd@ soluciona Docker? Con ejemplos...

### 🔨 Construir

Docker construye entornos, herramientas, librerías, binarios, aplicaciones, etc, etc. Todo a
través de la coherencia y sin necesidad de tener nada de eso instalado *perse* en tu
computadora.

¿De qué me sirve esto? Docker permite construir imágenes, dichas imágenes mantienen el entorno
donde se va a ejecutar el ENTRYPOINT (el sistema operativo base, como Alpine), los binarios/librerías/paquetes
necesarias para tu aplicativo (como lo puede ser por ejemplo NodeJS), ejecuciones previas de scripts, en resumen, cualquier acción, requerimiento o binario (o símil) necesario y así
disponer el entorno completo para ejecutar un aplicativo (en la gran mayoría de los casos).

### 🔊 Compartir

El "**EN MI MÁQUINA SÍ FUNCIONA**" nunca más lo volverás a escuchar si usas Docker.

Docker replica el mismo entorno construido de manera exacta. No cambios. No diferencias. No nada distinto. Todo igual.
Esto facilita el compartir tu aplicativo, ya que está empaquetado en un todo en uno, lo cual
permite replicar tu aplicación todas las millones de veces que quieras.

Haznos a todos un favor y hagamos de la colaboración algo más fácil con Docker.

### 🏃 Correr/Ejecutar

Docker facilita la automatización de la ejecución de aplicativos, porque desde ahora en adelante
crea un entorno completo, replicable, consistente, todo a la altura de un comando.

## 🧐 Usemos Docker

Vamos a lo bueno, ¿cómo empiezo con Docker?

### Instala y hace un Hello World!

Te dejaré como instalar Docker en la [documentación oficial para Ubuntu](https://docs.docker.com/engine/install/ubuntu/).

### Ejecuta Node con una web app dentro de Docker

No hay mejor forma de demostrar las tres bases que te di anteriormente, que ejecutando lo siguiente:

```txt
docker run --rm -it -p 8000:8080 node:20.6.1-alpine3.18 sh -c "npx --yes http-server && /bin/sh"
```

Corremos un contenedor con el sistema operativo linux alpine 3.18, con nodejs versión 20.6.1,
levantamos un servidor web en la máquina y exponemos el puerto 8080 del contenedor haciendo
binding de él con el puerto 8000 de nuestra máquina. *Fascinante*.

¿Algo más complejo? Levantemos todo PurpleSheep Blog en un contenedor.

```txt
docker run --rm -p 8080:8000 denoland/deno:alpine-1.25.0 sh -c "\
	apk add git && \
	git clone https://github.com/CPU-commits/PurpleSheep_Blog.git && \
	cd PurpleSheep_Blog && \
	deno run -A main.ts"
```

Todo funciona según lo esperado... Construir - Compartir - Correr

### Dockeriza tu aplicativo

Ahora bien, tal vez quieras Dockerizar tu entorno de desarrollo para trabajar con él. Vamos
a ello, asumiré que estás ocupando Node con algún framework/metaframework de Javascript como Vite con 
Vue - React, Sveltekit, Nuxt, Next, entre muchos otros. Para todos es casi lo mismo...

#### Dockerfile

Hasta el momento hemos solamente ejecutado imágenes base ya construidas por terceros,
mas, podemos construir las nuestras propias, y estas se declaran a través de un archivo Dockerfile, hagamos uno entonces:

> 💡 Todo esto, dentro de la carpeta fuente de tu código

```txt
// tu_carpeta_fuente/Dockerfile.dev
// * Utiliza la versión de Node que ocupes normalmente para ejecutar tu app
FROM node:$VERSION // <- Todos los Dockerfile empiezan con un FROM, lo cual declara la imagen
base que usaremos para construir nuestra imagen

WORKDIR /app // <- Aquí declaramos la carpeta de trabajo donde se alojará nuestro código fuente

COPY package*.json ./ // <- Ahora copiaremos el package.lock.json y el package.json para saber qué instalar a continuación con npm

RUN npm install // <- Con RUN podemos ejecutar un comando dentro del contenedor de Docker, en 
este caso haremos instalación de los paquetes necesarios para nuestra aplicación con npm install.

EXPOSE $PUERTO // <- Exponemos a la red de Docker el puerto por el cual escucha tu aplicación

ENTRYPOINT [ "npm", "run", "dev" ] // Por último declaramos el ENTRYPOINT, esto es lo más
importante, ya que esta declaración se va a ejecutar una vez hagamos docker run, es decir,
ejecutemos el contenedor
```

Si se dan cuenta, en ningún momento hago un *COPY* del código fuente, esto porque usaré
un volumen montado dentro del contenedor, es decir, haremos que nuestros archivos fuentes
estén sincronizados dentro del sistema de archivos del propio contenedor. El fundamento
detrás de esto, es porque si lo piensas, en un entorno de desarrollo, el código cambia
constantemente, por lo cual, necesitamos que estos cambios también se vean reflejados en
el contenedor.

¡Ahora los comandos!

#### Build image

Primero construimos la imagen (**UNA SOLA VEZ**)

```txt
docker build --tag=$NOMBRE_DE_TU_APLICACION --file=Dockerfile.dev .
```

#### Run container

Ahora el run:

```txt
docker run -p $PUERTO:$PUERTO -v ./:/app -v /app/node_modules $NOMBRE_DE_TU_APLICACION
```

> 💡 Si estás con Vite, configura el server bloque, con host en true -> { server: { host: true } }

#### Eliminar contenedor

Para eliminar el contenedor haz un:

```txt
docker ps
```

Cuestión que te dará una vista como esta:

```txt
CONTAINER ID   IMAGE                      COMMAND         CREATED       STATUS       PORTS                                                           NAMES
0b1f753caf15   $NOMBRE_DE_TY_APLICACION   "npm run dev"   9 hours ago   Up 7 hours   0.0.0.0:$PUERTO->$PUERTO/tcp, :::$PUERTO->$PUERTO/tcp           nombre_container
```

Puedes hacer un kill del contenedor tal que así:

```txt
docker kill 0b1f753caf15
```

O...

```txt
docker kill nombre_container
```

Y luego

```txt
docker container prune
```

Esto para eliminar los contenedores basura dentro del sistema (es decir, los apagados)

#### Tip

Si quieres sincronizar el node_modules, y que cada vez que instales una dependencia no tengas
que re construir la imagen, quita del Dockerfile el *COPY* y el *RUN*. Luego haz un npm install en tu carpeta. Y al momento de ejecutar la app, hazlo con este comando:

```txt
docker run -p $PUERTO:$PUERTO -v ./:/app -v ./node_modules:/app/node_modules $NOMBRE_DE_TU_APLICACION
```

### Desplegar con docker-compose, Traefik y certificado SSL

Ahora bien, voy a compartir una configuración en docker-compose que les ayudará
a desplegar en una VM (*virtual machine*) en la que tengan instalada Docker.

Docker compose es una herramienta para definir por medio de manifiestos *yaml* aplicaciones
de Docker a partir de configuraciones. Docker compose es la herramienta completa para que
por medio de un solo archivo se pueda declarar todo el estado de una aplicación completa.

Backend, frontend, base de datos y proxy son en la gran mayoría de casos todos los servidores
que vamos a declarar para desplegar nuestra aplicación completa. En este caso, solo enseñaré
la manifestación de un proxy (Traefik) con SSL más el frontend.

```txt
version: '3.8'

services:
    traefik: # Declaramos el servicio de Traefik más los comandos
        container_name: traefik
        image: traefik:v2.5
        command:
            - "--api=true"
            - "--api.insecure=true"
            - "--api.dashboard=false" # Desactivamos el dashboard de Traefik de manera explicita
            - "--log.level=DEBUG" # Aquí declaramos el nivel mínimo de log, para producción es mejor INFO
            - "--providers.docker=true" # Declaramos el proveedor como Docker
            - "--providers.docker.exposedbydefault=false" # Declaramos que los contenedores de Docker que encuentre Traefik NO se exponen por defecto
            - "--entrypoints.web.address=:80" # Declaramos un entrypoint para el puerto 80
            - "--entrypoints.websecure.address=:443" # Lo mismo, pero para el 443 (SSL)
            - "--providers.docker.network=app_network" # Declaramos que la red donde sacará los contenedores de de app_network
            # Letsencrypt
            - --certificatesresolvers.letsencrypt.acme.tlschallenge=true # <== Enable TLS-ALPN-01 to generate and renew ACME certs
            - --certificatesresolvers.letsencrypt.acme.email=tucorreo@ejemplo.com
            - --certificatesresolvers.letsencrypt.acme.storage=/letsencrypt/acme.json
        volumes:
          - /var/run/docker.sock:/var/run/docker.sock:ro # Volumen para enlazar con el socket de Docker (deamon)
          - ./letsencrypt:/letsencrypt # Volumen montado para almacenar dentro de la carpeta letsencrypt los certificados
        networks:
            - app_network # La red donde queremos que se conecte (de manera interna) el contenedor
        ports:
            - 80:80 # Exponemos al público el puerto 80. A modo de sugerencia, activenlo para luego, con otra configuración, redirigir a https
            - 443:443 # Y 443
        restart: on-failure:10 # Hasta 10 fallos para reiniciar el contenedor
    front:
        container_name: app_frontend
        restart: on-failure:10
        build:
            context: . # Aquí declaramos la carpeta donde está (tomando como referencia este archivo) el proyecto
            dockerfile: Dockerfile # Nombre del Dockerfile
        expose:
          - 3000 # Exponer el puerto 3000 de mi aplicación a la red interna
        networks:
            - app_network
        env_file:
            - ./.env # Archivo con variables de entorno
        labels: # Declarar etiquetas necesarias para que Traefik exponga el contenedor al público
            - "traefik.enable=true" # Habilitar que Traefik lo exponga
            - "traefik.http.routers.websecure.rule=Host(`tudominio.com`)" # Regla para el dominio
            - "traefik.http.routers.websecure.entrypoints=websecure" # Se puede entrar a esta aplicación a través de websecure declarado más arriba
            - "traefik.http.routers.websecure.tls=true" # Habilita tls
            - "traefik.http.routers.websecure.tls.certresolver=letsencrypt" # Usar como cert resolver a letsencrypt resolver identificado más arriba
            - "traefik.http.services.websecure.loadbalancer.server.port=3000" # Usar el puerto 3000 como puerto por donde entrar al aplicativo
            - "traefik.http.routers.websecure.service=websecure" # Declarar que el servicio ocupa el router es websecure declarado en la linea anterior
        depends_on:
            - traefik # Depende de que inicie primero Traefik como servicio

networks:
    app_network:
        driver: bridge
        external: true # SE DEBE CREAR LA RED ANTES DEL DOCKER COMPOSE
```

Con este manifiesto podrás levantar el proxy de Traefik y cuando se ingrese con tudominio.com
se redirigirá al contenedor de front por el puerto 3000.

Para crear la red de Docker llamada app_network correr el siguiente comando:

```txt
docker network create app_network
```

Con todo esto podrás finalmente crear tu propia aplicación productiva con Docker.

## Conclusión

Docker es la herramienta más importante del mundo del Software por lejos. Espero que todo
lo que te mostré en este pequeño articulo te sirva y puedas empezar a perderle el miedo
a Docker. Todos lo que mostré son casi al 100% prácticos, así que por favor, te recomiendo
encarecidamente leer la documentación oficial de Docker, ver algún tutorial más completo y 
técnico, para volver aquí y que entiendas en la totalidad los conceptos descritos. ¡Suerte!
