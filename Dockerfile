# Stage: 1
FROM node:alpine AS build

WORKDIR /fableBuild

COPY ./package*.json ./

RUN npm install --frozen-lockfile

COPY . ./

RUN npm run build

# Stage: 2
FROM nginx:alpine AS web-server

COPY --from=build /fableBuild/dist/ /usr/share/nginx/html

# COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]