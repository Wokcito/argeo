# Argeo

![NPM Version](https://img.shields.io/npm/v/argeo?label=version&color=%23da4949)
![NPM Downloads](https://img.shields.io/npm/dt/argeo?color=%23da4949)

Wrapper de la [API del Servicio de Normalización de Datos Geográficos de Argentina](https://datosgobar.github.io/georef-ar-api/) que agrega el tipado necesario para hacer solicitudes y gestionar respuestas, facilitando a los desarrolladores el uso de la misma.

## Características

- Tipado estático para las interacciones con la API
- Posibilidad de definir el `baseURL`
- Autenticación con JWT

## Instalación e importación

Para instalar `argeo` en tu proyecto usá uno de los siguientes comandos

```sh
$ npm install argeo
# or
$ pnpm add argeo
```

Importá la librería e instanciá la clase Argeo

```js
import { Argeo } from 'argeo'
const argeo = new Argeo()
```

## Configuración

La clase Argeo permite pasarle un objeto de configuración con los siguientes atributos:

### baseURL

`string`

Por defecto es `https://apis.datos.gob.ar/georef` pero en el caso de tener tu propio servicio (por ejemplo usando Docker) podés especificar la ruta. La librería une automáticamente tu `baseURL` con los endpoints.

```js
const defaultArgeo = new Argeo()
const customArgeo = new Argeo({ baseURL: 'https://mi.url.personalizada' })

// https://apis.datos.gob.ar/georef/api/provincias
defaultArgeo.provincias.buscar()

// https://mi.url.personalizada/api/provincias
customArgeo.provincias.buscar()
```

### token

`string` | `{ secret: string, key: string }`

En el caso de poseer un JWT para incrementar la cuota de uso de la API, podés configurar la librería para utilizarlo.

> [!TIP]
> Si en vez de disponer de un `token` se dispone del `secret` y el `key`, se puede pasar un objeto con dichos atributos. La librería se encarga de generar un `token` con estos datos según se indica en [Autenticarse con JWT](https://datosgobar.github.io/georef-ar-api/jwt-token/).

```js
// En el caso de contar con un token
const argeo = new Argeo({ token: 'acá va tu token' })

// En el caso de disponer de un 'secret' y un 'key'
const argeo = new Argeo({ token: { secret: 'tu secret', key: 'tu key' } })
```

## Uso

Hacé una solicitud usando el método `buscar` de los distintos `módulos`. El siguiente ejemplo usa el módulo de `provincias`.

> [!IMPORTANT]  
> Las solicitudes retornan un objeto con los atributos `data` y `error`. En el caso de ser exitosa la solicitud `error` será *null* y `data` tendrá la información solicitada. Por otra parte, si hay un error `data` será *null* y `error` tendrá la información del error.

```js
const argeo = new Argeo()
const { data, error } = await argeo.provincias.buscar({ nombre: 'entre rios' })

console.log(data)
/*
{
	cantidad: 1,
	inicio: 0,
	parametros: { nombre: 'entre rios' },
	provincias: [
        {
            centroide: { lat: -32.0589278938558, lon: -59.201262616496 },
            id: '30',
            nombre: 'Entre Ríos'
        }
    ],
	total: 1
}
*/

console.log(error)
/*
null
*/

```

## Contribución

En el caso de querer contribuir

1. Hacé un fork del repositorio y clonalo localmente
2. Ejecutá uno de los siguientes comandos

```sh
$ npm run prepare
# or
$ pnpm prepare
```

3. Creá una nueva rama con tus cambios y hacé un pull request detallando lo que desarrollaste

> [!IMPORTANT]
> El repositorio utiliza [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) y no te permitirá hacer commits con textos que no sigan la convención.  
> Por otra parte al intentar hacer un push se ejecutarán todos los tests y si alguno falla se cancelará el push.

## Tests

Para ejecutar los tests manualmente usá uno de los siguientes comandos

```sh
$ npm run test
# or
$ pnpm test
```

> [!TIP]
> Por defecto los tests se ejecutan en `watch mode`, si querés correrlos una vez usá el flag `--run` de `vitest`, más información [acá](https://vitest.dev/guide/cli#commands).

## License

MIT License
