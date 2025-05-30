FROM node:19-alpine
WORKDIR /app/
COPY package*.json ./
RUN npm ci --only=production
COPY . .

# Set the default command to run the migration script
CMD ["node","libs/db-mgmt/lib/db-mgmt.js", "migrate", "do"]