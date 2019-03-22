FROM node:8.10.0-alpine
EXPOSE 3000
COPY . /app
WORKDIR /app
RUN npm install &&\
		npm install -g nodemon
CMD ["npm", "start"]