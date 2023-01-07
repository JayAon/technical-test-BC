
En este proyecto se encuentra mi solución particular para la prueba técnica FullStack versión 3.0.

# Para empezar
El proyecto se encuentra dividido en dos secciones:
##Client  
En este se encuentra el desarrollo del Front-End. Puede ser ejecutado con los siguientes comandos: 
```console
    cd .\client\  
    npm start  
```
    
#### Dependencias  
- Angular CLI 14.2.6  
- FontAwesome 6.2.0  
- Jest 28.1.3  
- MDB-Angular-UI-Kit 3.0.0  
- Bootstrap 5.2.2  
- Rxjs 7.5.7  
#### Build
Ejecutar el comando `ng build` para generar la versión de producción del proyecto. El resultado se guardará en la carpeta `dist`.  
#### Pruebas unitarias
Ejecutar el comando `npm run coverage` para realizar las pruebas unitarias y observar la cobertura del código.  
O ejecutar el comando `npm run test` para realizar solamente las pruebas unitarias.  
#### Otros idiomas
Es posible iniciar el front-end con otro idioma (inglés) ejecutando el comando `npm run start:en` desde la raiz de la carpeta `client`
## Server
En este se encuentra el desarrollo del Back-End. Puede ser ejecutado con los siguientes comandos:
```console
    cd .\client\  
    npm start  
```

Tener en cuenta que es necesario un archivo *.env* donde configurar variables como el nombre de la base de datos, la dirección del host, etc.
#### Dependencias

- Express 4.18.2
- DotEnv 16.0.3
- Cors 2.8.5
- JsonWebToken 8.5.1
- Mssql 9.0.1
- Nodemon 2.0.20 (develop)
- Body-Parser 1.20.1
#### Estructura del archivo .env

    ## SERVER

    PORT = "3000"

    ## DATABASE

    DB_HOST="Your Host"
    DB_USER = "Your database user"
    DB_PASSWORD = "Your database password"
    DB_NAME = "Your database name"
    DB_PORT = "Your database port"

    ## JSON WEB TOKEN

    JWT_KEY = "Your secret key"
