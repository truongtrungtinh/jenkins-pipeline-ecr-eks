# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV DATABASE=mongodb+srv://truongtrungtinh1:<PASSWORD>@cluster0.vrgov1b.mongodb.net/
ENV DATABASE_LOCAL=mongodb://localhost:27017/natours
ENV DATABASE_PASSWORD=admin
ENV JWT_SECRET=my-ultra-secure-and-ultra-long-secret
ENV JWT_EXPIRES_IN=90d
ENV JWT_COOKIE_EXPIRES_IN=90
ENV EMAIL_USERNAME=a124458539192a
ENV EMAIL_PASSWORD=1e3caf48074eba
ENV EMAIL_HOST=smtp.mailtrap.io
ENV EMAIL_PORT=25
ENV EMAIL_FROM=hello@jonas.io
ENV SENDGRID_USERNAME=apikey
ENV SENDGRID_PASSWORD=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
ENV STRIPE_SECRET_KEY=sk_test_iL5ZUfa6lae7nWHwv0a7MjNk00BpcyaGWr

# Copy package.json and package-lock.json to the container
COPY package*.json ./

RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port your Express.js app is running on (change if your app runs on a different port)
EXPOSE 3000

# Start your Node.js app using the start script defined in package.json
CMD ["npm", "run", "start:prod"]
