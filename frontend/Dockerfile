# Étape 1 : Construction du projet React avec Node.js
FROM node:18-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape 2 : Utilisation d'un serveur web léger (Nginx)
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html 

# Exposer le port utilisé par Nginx
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
