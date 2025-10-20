# Usa una imagen base de Node.js. Se recomienda usar una versión específica.
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de definición de dependencias
COPY package*.json ./

# Instala las dependencias de producción
RUN npm install

# Copia el resto de los archivos de tu aplicación
COPY . .

# Expone el puerto en el que corre tu aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD [ "node", "bin/www" ]