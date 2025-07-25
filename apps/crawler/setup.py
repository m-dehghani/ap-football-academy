"""
Setup script for Football Intelligence Crawler
"""

from setuptools import setup, find_packages
import os

# Read README file
def read_file(filename):
    with open(os.path.join(os.path.dirname(__file__), filename), encoding='utf-8') as f:
        return f.read()

# Read requirements
def read_requirements(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        return [line.strip() for line in f if line.strip() and not line.startswith('#')]

setup(
    name="football-intelligence-crawler",
    version="1.0.0",
    author="AP Football Academy",
    author_email="info@apfootball.academy",
    description="Persian Football Information Extraction System with LLM Agent",
    long_description=read_file("README.md"),
    long_description_content_type="text/markdown",
    url="https://github.com/ap-football-academy/football-crawler",
    packages=find_packages(),
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: Developers",
        "Intended Audience :: Sports Analytics",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Topic :: Internet :: WWW/HTTP :: Dynamic Content",
        "Topic :: Software Development :: Libraries :: Python Modules",
        "Topic :: Text Processing :: Linguistic",
        "Topic :: Scientific/Engineering :: Artificial Intelligence",
    ],
    python_requires=">=3.8",
    install_requires=read_requirements("requirements.txt"),
    extras_require={
        "dev": [
            "pytest>=7.0.0",
            "pytest-asyncio>=0.21.0",
            "pytest-cov>=4.0.0",
            "black>=23.0.0",
            "flake8>=6.0.0",
            "isort>=5.12.0",
            "mypy>=1.0.0",
            "pre-commit>=3.0.0",
        ],
        "test": [
            "pytest>=7.0.0",
            "pytest-asyncio>=0.21.0",
            "pytest-cov>=4.0.0",
            "pytest-mock>=3.10.0",
            "factory-boy>=3.2.0",
            "faker>=18.0.0",
        ],
        "docs": [
            "sphinx>=6.0.0",
            "sphinx-rtd-theme>=1.2.0",
            "sphinxcontrib-asyncio>=0.3.0",
            "myst-parser>=1.0.0",
        ],
    },
    entry_points={
        "console_scripts": [
            "football-crawler=main:app",
            "fcrawler=main:app",
        ],
    },
    include_package_data=True,
    package_data={
        "crawler": [
            "data/*.json",
            "data/*.txt",
            "templates/*.html",
            "static/*",
        ],
    },
    zip_safe=False,
    keywords=[
        "football",
        "soccer",
        "persian",
        "farsi",
        "crawling",
        "web-scraping",
        "llm",
        "ai",
        "nlp",
        "sports-analytics",
        "news-extraction",
        "content-analysis",
    ],
    project_urls={
        "Bug Reports": "https://github.com/ap-football-academy/football-crawler/issues",
        "Source": "https://github.com/ap-football-academy/football-crawler",
        "Documentation": "https://football-crawler.readthedocs.io/",
        "Changelog": "https://github.com/ap-football-academy/football-crawler/blob/main/CHANGELOG.md",
    },
) 