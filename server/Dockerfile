FROM oven/bun:0.5.9
WORKDIR /app
COPY package.json package.json
COPY bun.lockb bun.lockb
RUN bun install
RUN apt-get update && apt-get install -y procps
COPY . .
ENV PORT 8000
EXPOSE 8000
ENTRYPOINT ["bun", "start"]
