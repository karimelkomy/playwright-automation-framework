# Use official Playwright Docker image with all browsers pre-installed
FROM mcr.microsoft.com/playwright:v1.57.0-noble

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Set environment variables for CI mode
ENV CI=true

# Default command to run tests
CMD ["npm", "run", "test:ci"]
