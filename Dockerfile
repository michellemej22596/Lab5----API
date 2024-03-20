# Dockerfile

# Utilizar una imagen oficial de MySQL
FROM mysql:latest

# Establecer variables de entorno para la configuración de MySQL
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=blog_michi
ENV MYSQL_USER=michimejia
ENV MYSQL_PASSWORD=password

# Copiar el script SQL al contenedor
COPY schema.sql /docker-entrypoint-initdb.d/

# Puerto en el que se ejecutará MySQL
EXPOSE 3306

CMD ["mysqld"]
