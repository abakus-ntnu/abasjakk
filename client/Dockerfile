# frontend
FROM oven/bun:1.0.6
WORKDIR /app
COPY package.json package.json
COPY bun.lockb bun.lockb
RUN bun install
COPY . .
EXPOSE 3000
ENTRYPOINT ["bun", "dev"]
