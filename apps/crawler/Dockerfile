# Use Python 3.11 slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    wget \
    git \
    postgresql-client \
    libpq-dev \
    gcc \
    g++ \
    gnupg \
    && rm -rf /var/lib/apt/lists/*

# Install Chrome for Selenium/Playwright (modern approach)
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /usr/share/keyrings/google-chrome-keyring.gpg \
    && echo "deb [arch=amd64 signed-by=/usr/share/keyrings/google-chrome-keyring.gpg] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install Playwright browsers
RUN playwright install --with-deps chromium

# Copy application code
COPY . .

# Create necessary directories
RUN mkdir -p storage/logs storage/images storage/data

# Set environment variables
ENV PYTHONPATH=/app
ENV PYTHONUNBUFFERED=1
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

# Create non-root user
RUN useradd -m -u 1000 crawler && chown -R crawler:crawler /app
USER crawler

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Default command
CMD ["python", "main.py", "server"] 