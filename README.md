# Proyecto NOC

El objetivo es crear una serie de tareas usando Arquitectura Limpia con TypeScript

# dev

1. Clonar el archivo .env.template a .env
2. Configurar las variables de entorno

```
PORT=3000
MAILER_SERVICE=
MAILER_EMAIL=
MAILER_SECRET_KEY=
PROD=false

MONGO_URL=
MONGO_DB_NAME=
MONGO_USER=
MONGO_PASS=


POSTGRES_URL=
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=

```

3. Ejecutar el comando `npm install`

4. Levantar las bases de datos con el comando

```
docker compose up -d
```

5. Ejecutar `npm run dev`
