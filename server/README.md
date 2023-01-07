# Server

En esta parte del proyecto se encuentra el desarrollo del back-end de la aplicación.

Puede ser ejecutado en modo desarrollo con el comando `npm start`.

Se necesita de un archivo `.env`

## Dependencias

- Express 4.18.2
- DotEnv 16.0.3
- Cors 2.8.5
- JsonWebToken 8.5.1
- Mssql 9.0.1
- Nodemon 2.0.20 (develop)
- Body-Parser 1.20.1

# Archivo .env

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
