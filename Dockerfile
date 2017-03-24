FROM node:7.2

RUN apt-get update

#ENV PORT=3030

#EXPOSE $PORT

RUN mkdir /app
WORKDIR /app

COPY package.json $WORKDIR
RUN npm install

COPY . $WORKDIR

CMD ["npm", "start"]
