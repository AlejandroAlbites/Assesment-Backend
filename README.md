## Assesment Backend II

Este proyecto es una API para crear listas de favoritos. En la cual un usuario puede realizar las siguientes funciones:

1. Crear una cuenta mediante el Registro y luego realizar un Login.

2. Con el usuario Logeado usted puede crear una lista de favoritos (Por ejemplo ropas, musica etc.).

3. El usuario puede ver todas las listas de favoritos que ha creado.

4. El usuario puede ver una lista de favoritos específica.

5. El usuario puede eliminar una lista de favoritos.

6. El usuario puede ir agregando favoritos a una lista (por ejemplo, dentro de la lista de Ropas puede agregar pantalon, zapatillas, polo, etc.)

7. El usuario puede ver todas los favoritos de una lista

8. El usuario puede ver un favorito específico.

9. El usuario puede eliminar un favorito si lo desea.

### Requerimientos

Para ejecutar la API de manera local se requiere clonar el repositorio y tener instalado node v16.14.0

1. Ejecutar el comando `npm i` para instalar los node_modules

2. Ejecutar el comando `npm start` o `npm run start`

3. Ejecutar `Control + C` para detener el proceso

### End Points

| Route                         | HTTP verb | Route Middleware | Description                                   |
| ----------------------------- | --------- | ---------------- | --------------------------------------------- |
| /auth/local/register          | POST      |                  | Registrarse con email y password              |
| /auth/local/login             | POST      |                  | Logearse con email y password                 |
| /api/favs                     | POST      | validateJWT()    | Crea una nueva lista de favoritos             |
| /api/favs                     | GET       | validateJWT()    | Muestra todas las listas del usuario          |
| /api/favs/:id                 | GET       | validateJWT()    | Muestra una lista del usuario                 |
| /api/favs/:id                 | DELETE    | validateJWT()    | Elimina una lista del usuario                 |
| /api/listFavs/fav             | POST      | validateJWT()    | Crea un favorito en una lista de favoritos    |
| /api/listFavs/favs/:listFavId | GET       | validateJWT()    | Muestra todos los favoritos de una lista      |
| /api/listFavs/fav/:favId      | GET       | validateJWT()    | Muestra un favorito específico                |
| /api/listFavs/fav/:favId      | DELETE    | validateJWT()    | Elimina un favorito de una lista de favoritos |

### Prueba la API

Puede utilizar la aplicación Postman o similares para probar la API:

##### Register and Login

1. Para crear un nuevo usuario realice un POST al siguiente end point de registro:

`http://localhost:8080/auth/local/register`

Seleccionar body, tipo raw, formato Json e ingresar por ejemplo:

```json
{
  "email": "correo1@correo.com",
  "password": "123456Aa"
}
```

Los campos Email y Password son requeridos para crear un usuario, si usted no los ingresa obtendra una respuesta negativa (status 400).

De obtener una respuesta exitosa (status 200) en la respuesta podra obtener un token de autenticación el cual le servira para realizar las demas peticiones.

Nota: En este proyecto los token tienen una vigencia de 24 horas.

2. Si usted ya cuenta con una cuenta creada puede realizar una petición POST al siguiente end point de Login:

`http://localhost:8080/auth/local/login`

Al igual que con el registro debe seleccionar body, tipo raw, formato Json e ingresar por ejemplo:

```json
{
  "email": "correo1@correo.com",
  "password": "123456Aa"
}
```

Los campos Email y Password también son requeridos para ingresar con un usuario, si usted no los ingresa obtendra una respuesta negativa (status 400).

De obtener una respuesta exitosa (status 200) en la respuesta podra obtener un token de autenticación el cual le servira para realizar las demas peticiones.

##### Listas de favoritos

Para las siguientes funcionalidades usted requiere estar autenticado y contar con un token ya que estas rutas estan protegidas con un middleware de autenticación.

Para los siguientes end point se requiere que el usuario ingrese su token de autenticación en la opcion de Headers del postman. en Key colocar: authorization y en value: Bearer (el valor del token)

por ejemplo:

`KEY: authorization`
`VALUE: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmIyMzBkOTQ1YTZjODRhMzEwY2FlNDAiLCJpYXQiOjE2NTU4NDYxODAsImV4cCI6MTY1NTkzMjU4MH0.FzPrHjyq6YGZLUAGMKfTZSctPTg`

1. Para crear una lista de favoritos realice un POST al siguiente end point:

`http://localhost:8080/api/favs`

y en el body ingresar el nombre de la lista:

```json
{
  "name": "colección de ropas"
}
```

El campo name es requerido, si usted no lo ingresa obtendra una respuesta negativa (status 400), y tiene un mínimo de 4 caracteres y 20 como máximo.

2. Para obtener todas las listas de favoritos que el usuario ha creado se debe realizar una petición GET al siguiente end point:

`http://localhost:8080/api/favs`

Nota: Solo se mostrarán las listas que el usuario haya creado, esto se verifica mediante el token.

3. Para obtener una lista específica se debe realizar una petición GET al siguiente end point:

`http://localhost:8080/api/favs/:id`

Debe reemplazar el :id por el ID de la lista de favoritos que desea buscar. Puede obtener el ID mediante la petición anterior de obtener todas las listas de favoritos.

Nota: Solo se mostrará la lista si el usuario fue quien la creo, de no ser el caso obtendra una respuesta negativa (status 404) y en consola "List fav does not belong to this user"

4. Para eliminar una lista de favoritos se debe realizar una petición DELETE al siguiente end point:

`http://localhost:8080/api/favs/:id`

Debe reemplazar el :id por el ID de la lista de favoritos que desea eliminar. Puede obtener el ID mediante la petición anterior de obtener todas las listas de favoritos.

Nota: Solo se eliminará la lista si el usuario fue quien la creo, de no ser el caso obtendra una respuesta negativa (status 404) y en consola "List fav does not belong to this user"

##### Favoritos

El usuario puede empezar a llenar sus listas de favoritos con los favoritos que desee:

Por ejemplo:

    Lista de Ropas
    	Guantes
    	Medias
    	Pantalón
    	Polo
    	Zapatillas

Al igual que con las Listas de Favoritos, para las siguientes funcionalidades usted requiere estar autenticado y contar con un token ya que estas rutas estan protegidas con un middleware de autenticación.

Para los siguientes end point se requiere que el usuario ingrese su token de autenticación en la opcion de Headers del postman. en Key colocar: authorization y en value: Bearer (el valor del token)

1. Para crear un favoritos realice un POST al siguiente end point:

`http://localhost:8080/api/listFavs/fav`

y en el body ingresar los siguientes datos del item favorito:

```json
{
  "title": "Pantalón",
  "description": "Ropa de Invierno",
  "link": "http://google/ropa/images/Invierno",
  "listFavId": "62b24151bb9ffefcc8aec56b"
}
```

Todos los campos que se muestran son requeridos para crear un favorito, de no ingresarlos obtendra una respuesta negativa (status 400).

el campo listFavId, es el id de la lista en la cual se desea crear el favorito, este lo puede obtener de los end point anteriores mediante petición GET.

Nota: Solo el usuario que creo la lista de favoritos puede agregar un favorito a la lista. si usted ingresa un id de una lista que no ha creado el usuario autenticado obtendra una respuesta negativa (status 404) y en consola "List fav does not belong to this user"

2. Para obtener todos los favoritos de esa lista, se debe realizar una petición GET al siguiente end point:

`http://localhost:8080/api/listFavs/favs/:listFavId`

Se debe reemplazar :listFavId por el id de la lista para poder obtener todos los favoritos de esa lista.

Nota: Solo se mostrarán los favoritos de esa lista si el usuario fue quien la creo, esto se verifica mediante el token.

3. Para obtener un favorito específico se debe realizar una petición GET al siguiente end point:

`http://localhost:8080/api/listFavs/fav/:favId`

Debe reemplazar el :favId por el ID del favorito que desea buscar. Puede obtener el ID mediante la petición anterior de obtener todos los favoritos

Nota: Solo se mostrará el favorito si el usuario fue quien la creo, de no ser el caso obtendra una respuesta negativa (status 404) y en consola "List fav does not belong to this user"

4. Para eliminar un favorito se debe realizar una petición DELETE al siguiente end point:

`http://localhost:8080/api/listFavs/fav/:favId`

Debe reemplazar el :favId por el ID del favorito que desea eliminar. Puede obtener el ID mediante la petición anterior de obtener todos los favoritos

Nota: Solo se eliminará el favorito si el usuario fue quien lo creo, de no ser el caso obtendra una respuesta negativa (status 404) y en consola "List fav does not belong to this user"

##### Test

Esta aplicación se probo a mas de un 50% por fines academicos.

Puede verificarlo mediante el comando:

`npm run test:coverage`

##### END
