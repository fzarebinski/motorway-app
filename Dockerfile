FROM node:lts-gallium AS motorway-app

# Working directory
WORKDIR /usr/src/app

# Copy files
COPY . .

# Setup dependencies
RUN yarn

# Start the container
CMD [ "yarn", "start" ]
