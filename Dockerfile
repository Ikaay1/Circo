# Common build stage
FROM node:16.16.0 as common-build-stage

# Install ffmpeg
RUN apt-get update && \
    apt-get install -y ffmpeg && \
    rm -rf /var/lib/apt/lists/*

COPY . ./app

WORKDIR /app

RUN npm install -f

EXPOSE 3000

# Development build stage
FROM common-build-stage as development-build-stage



ENV NODE_ENV development

CMD ["npm", "run", "dev"]

# Production build stage
FROM common-build-stage as production-build-stage

ENV NODE_ENV production

CMD ["npm", "run", "start"]
