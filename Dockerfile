FROM node:lts-gallium as motorway-app

# Working directory
WORKDIR /usr/src/app

# Copy files
COPY . .

# Setup dependencies
RUN yarn

# Expose ports
EXPOSE 80

# Start the container
CMD [ "yarn", "start" ]
