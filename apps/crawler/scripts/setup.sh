#!/bin/bash

# Football Intelligence Crawler Setup Script
# This script sets up the development environment

set -e

echo "🏈 Football Intelligence Crawler Setup"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Check if Python is installed
check_python() {
    print_header "Checking Python installation..."
    
    if ! command -v python3 &> /dev/null; then
        print_error "Python 3 is not installed. Please install Python 3.8 or higher."
        exit 1
    fi
    
    PYTHON_VERSION=$(python3 -c 'import sys; print(".".join(map(str, sys.version_info[:2])))')
    print_status "Python $PYTHON_VERSION found"
    
    if python3 -c 'import sys; exit(0 if sys.version_info >= (3, 8) else 1)'; then
        print_status "Python version is compatible"
    else
        print_error "Python 3.8 or higher is required"
        exit 1
    fi
}

# Check if PostgreSQL is installed
check_postgresql() {
    print_header "Checking PostgreSQL installation..."
    
    if command -v psql &> /dev/null; then
        print_status "PostgreSQL found"
    else
        print_warning "PostgreSQL not found. You can install it or use Docker."
        echo "  Ubuntu/Debian: sudo apt-get install postgresql postgresql-contrib"
        echo "  macOS: brew install postgresql"
        echo "  Or use Docker: docker run --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres"
    fi
}

# Check if Redis is installed
check_redis() {
    print_header "Checking Redis installation..."
    
    if command -v redis-server &> /dev/null; then
        print_status "Redis found"
    else
        print_warning "Redis not found. You can install it or use Docker."
        echo "  Ubuntu/Debian: sudo apt-get install redis-server"
        echo "  macOS: brew install redis"
        echo "  Or use Docker: docker run --name redis -p 6379:6379 -d redis"
    fi
}

# Create virtual environment
create_venv() {
    print_header "Creating virtual environment..."
    
    if [ ! -d "venv" ]; then
        python3 -m venv venv
        print_status "Virtual environment created"
    else
        print_status "Virtual environment already exists"
    fi
}

# Activate virtual environment and install dependencies
install_dependencies() {
    print_header "Installing Python dependencies..."
    
    source venv/bin/activate
    pip install --upgrade pip
    pip install -r requirements.txt
    
    print_status "Dependencies installed"
}

# Install Playwright browsers
install_playwright() {
    print_header "Installing Playwright browsers..."
    
    source venv/bin/activate
    playwright install
    
    print_status "Playwright browsers installed"
}

# Create environment file
create_env_file() {
    print_header "Creating environment file..."
    
    if [ ! -f ".env" ]; then
        cat > .env << EOF
# Environment Configuration
ENVIRONMENT=development

# Database Configuration
DATABASE_URL=postgresql://crawler:password@localhost:5432/football_crawler

# Redis Configuration
REDIS_URL=redis://localhost:6379/0

# OpenAI Configuration
OPENAI_API_KEY=

# Security
SECRET_KEY=your-secret-key-here

# API Configuration
API_HOST=0.0.0.0
API_PORT=8000

# Logging
LOG_LEVEL=INFO
EOF
        print_status "Environment file created (.env)"
        print_warning "Please edit .env file and add your OpenAI API key"
    else
        print_status "Environment file already exists"
    fi
}

# Create necessary directories
create_directories() {
    print_header "Creating necessary directories..."
    
    mkdir -p storage/logs
    mkdir -p storage/images
    mkdir -p storage/data
    
    print_status "Directories created"
}

# Setup database
setup_database() {
    print_header "Setting up database..."
    
    if command -v psql &> /dev/null; then
        # Check if database exists
        if psql -lqt | cut -d \| -f 1 | grep -qw football_crawler; then
            print_status "Database already exists"
        else
            print_status "Creating database..."
            createdb football_crawler
            print_status "Database created"
        fi
    else
        print_warning "PostgreSQL not found. Skipping database setup."
    fi
}

# Run database migrations
run_migrations() {
    print_header "Running database migrations..."
    
    source venv/bin/activate
    python -c "
from crawler.database.connection import DatabaseManager
db = DatabaseManager()
db.create_tables()
print('Database tables created')
"
    
    print_status "Database migrations completed"
}

# Test installation
test_installation() {
    print_header "Testing installation..."
    
    source venv/bin/activate
    
    # Test imports
    python -c "
import crawler.config
import crawler.agents.llm_agent
print('✓ Core modules imported successfully')
"
    
    # Test database connection
    python -c "
from crawler.database.connection import DatabaseManager
try:
    db = DatabaseManager()
    print('✓ Database connection successful')
except Exception as e:
    print(f'✗ Database connection failed: {e}')
"
    
    print_status "Installation test completed"
}

# Main setup function
main() {
    echo "Starting setup process..."
    echo
    
    check_python
    check_postgresql
    check_redis
    create_venv
    install_dependencies
    install_playwright
    create_env_file
    create_directories
    setup_database
    run_migrations
    test_installation
    
    echo
    echo "🎉 Setup completed successfully!"
    echo
    echo "Next steps:"
    echo "1. Edit .env file and add your OpenAI API key"
    echo "2. Start the services:"
    echo "   - PostgreSQL: sudo systemctl start postgresql"
    echo "   - Redis: sudo systemctl start redis"
    echo "3. Run the crawler:"
    echo "   source venv/bin/activate"
    echo "   python main.py --help"
    echo
    echo "Or use Docker:"
    echo "   docker-compose up -d"
    echo
    echo "API Documentation will be available at: http://localhost:8000/docs"
}

# Handle command line arguments
case "$1" in
    --docker)
        print_header "Setting up with Docker..."
        
        if ! command -v docker &> /dev/null; then
            print_error "Docker is not installed. Please install Docker first."
            exit 1
        fi
        
        if ! command -v docker-compose &> /dev/null; then
            print_error "Docker Compose is not installed. Please install Docker Compose first."
            exit 1
        fi
        
        create_env_file
        docker-compose up -d
        print_status "Docker setup completed"
        ;;
    --help|-h)
        echo "Usage: $0 [OPTIONS]"
        echo
        echo "Options:"
        echo "  --docker    Setup using Docker"
        echo "  --help      Show this help message"
        echo
        echo "Without options, performs local setup"
        ;;
    *)
        main
        ;;
esac 