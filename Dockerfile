# ── Stage 1: Install dependencies ────────────────────────────────────────────
FROM mcr.microsoft.com/playwright:v1.49.0-jammy AS deps

WORKDIR /app

COPY package*.json ./
RUN npm ci --ignore-scripts

# ── Stage 2: Test runner ──────────────────────────────────────────────────────
FROM mcr.microsoft.com/playwright:v1.49.0-jammy AS runner

WORKDIR /app

# Install Allure CLI
RUN apt-get update && apt-get install -y default-jre-headless && \
    npm install -g allure-commandline && \
    rm -rf /var/lib/apt/lists/*

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Create report directories
RUN mkdir -p reports/html reports/artifacts reports/performance allure-results allure-report

ENV CI=true
ENV HEADED=false
ENV TEST_ENV=demo

# Default: run smoke tests
CMD ["npx", "playwright", "test", "--project=smoke", "--reporter=allure-playwright,list"]
