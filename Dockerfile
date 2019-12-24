FROM node:10.15.3

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

ENV Mongo_HOST mongo
ENV Mongo_PORT 27017
ENV Github_Client_ID bf7641912a592abf5fd7
ENV Github_Client_SECRET db0c54f52575634cb381a6e001af449a0b87d2f3
ENV Github_CALLBACK http://localhost/auth/github/callback


COPY package*.json ./
# Creates a user for our container
USER node
# Installs our NPM packages from the "package.json" file we moved from local in to our container
RUN npm install
# Tells our container who owns the copied content
COPY --chown=node:node . .
# Exposes the port "3000" from our container
# This is also how we can connect to our container from our host machine (the one you're reading this from now)
EXPOSE 80
# An array of commands our container needs to run when we start it
CMD ["npm", "run", "start"]