FROM node:lts-alpine

USER root

ARG NODE_ENV
RUN echo $NODE_ENV

RUN apk add --update --no-cache dumb-init su-exec

RUN addgroup -S dockerapps && \
    adduser -S dockerapp -G dockerapps && \
    mkdir -p /workspace/src

RUN chown -R dockerapp:dockerapps /workspace

WORKDIR /workspace
USER dockerapp

# in dev, the copy will be shadowed when we mount over the entire `/workspace` folder
COPY ./package.json .
COPY ./package-lock.json .
COPY ./src /workspace/src
COPY ./run /workspace/run

USER root

RUN chmod +x ./run/entrypoint.sh

ENTRYPOINT [ "dumb-init", "--"]
CMD [ "./run/entrypoint.sh" ]
