# 🎬 Letterboxd Scrapper

> A TypeScript library for scraping Letterboxd public lists with automatic IMDB integration and movie poster extraction

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)
[![Test Coverage](https://img.shields.io/badge/coverage-97.1%25-brightgreen)](#testing)

## 📋 Table of Contents

- [⚖️ Legal Notice & Disclaimer](#%EF%B8%8F-legal-notice--disclaimer)
- [✨ Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [🎬 Portfolio Demo](#-portfolio-demo)
- [📊 Performance](#-performance)
- [🛠️ API Reference](#%EF%B8%8F-api-reference)
- [🔧 Error Handling](#-error-handling)
- [🧪 Testing](#-testing)
- [🚀 Development](#-development)
- [📋 Requirements](#-requirements)
- [🛡️ Rate Limiting & Ethics](#%EF%B8%8F-rate-limiting--ethics)
- [🔄 Production Alternatives](#-production-alternatives)
- [🤝 Contributing](#-contributing)
- [🙏 Acknowledgments](#-acknowledgments)
- [📈 Roadmap](#-roadmap)

## ⚖️ Legal Notice & Disclaimer

**🎓 EDUCATIONAL & PORTFOLIO PURPOSE ONLY**

This project is created for **educational and portfolio demonstration purposes only**. It showcases web scraping techniques, TypeScript development, and API design patterns as part of a technical portfolio.

**Important Legal Considerations:**
- Users are responsible for complying with [Letterboxd's Terms of Use](https://letterboxd.com/legal/terms-of-use/).
- This tool uses automated scraping which may violate Letterboxd's interface access requirements.
- **Not intended for production use, commercial distribution, or mass data extraction.**
- Consider using official APIs where available for production applications.

**Disclaimer:** The author disclaims any responsibility for misuse of this tool. Users should respect Letterboxd's terms of service and use this code responsibly.

---

## ✨ Features

- 🔍 **Extract complete watchlists** with automatic pagination.
- 🎯 **IMDB ID integration** for each film automatically.
- 🖼️ **High-quality movie posters** with optimized URLs.
- ⚡ **Configurable scraping options** (limits, posters, IMDB IDs).
- 🛡️ **Robust error handling** with detailed error messages.
- 📦 **Ready-to-use NPM package** with full TypeScript support.
- 🧪 **Comprehensive test suite** with 97.1% coverage.
- 🚀 **Built-in pagination** handles large watchlists automatically.

## 🚀 Quick Start

### Installation

```bash
npm install ltbxdscrapper
```

### Basic Usage

```typescript
import { getWatchlist } from 'ltbxdscrapper';

// Get a user's complete watchlist
const userWatchlist = await getWatchlist({
  username: "username", // Required
  options: {
    poster: true,
    IMDBID: true,
  }, // Optional
});

console.log(userWatchlist);
// Returns:
// {
//   status: 'OK',
//   data: [
//     {
//       id: 'tt1234567',
//       name: 'Persepolis',
//       type: 'movie',
//       poster: 'https://a.ltrbxd.com/resized/sm/upload/28/um/1t/jq/...'
//     }
//   ],
//   errorMessage: null,
// }
```

### Advanced Configuration

```typescript
// Extract with custom options
const result = await getWatchlist({
  username: "filmcritic",
  options: {
    poster: true,      // Include movie posters (default: true)
    IMDBID: true,      // Include IMDB IDs (default: true) 
    max: 50            // Limit results to 50 films
  }
});

// Fast scraping without IMDB lookup
const quickScrape = await getWatchlist({
  username: "moviebuff",
  options: {
    poster: true,
    IMDBID: false     // Skip IMDB lookup for faster scraping
  }
});

// Minimal data extraction
const minimal = await getWatchlist({
  username: "cinephile",
  options: {
    poster: false,
    IMDBID: false
  }
});
```

## 🎬 Portfolio Demo

**Experience the scraper in action with an interactive demonstration!**

This project includes a comprehensive portfolio demo that showcases:
- ✨ **Real-time scraping** with animated progress indicators
- 🛡️ **Rate limiting** and responsible scraping practices  
- 🔧 **Error handling** and edge case management
- 📊 **Performance monitoring** and metrics collection
- ⚙️ **Multi-stage processing** with detailed progress tracking

### 🚀 Running the Demo

To experience the portfolio demonstration:

```bash
# Clone the repository
git clone https://github.com/codebymaribel/ltbxd-scrapperio.git
cd ltbxd-scrapperio

# Install dependencies
npm install

# Run the interactive portfolio demo
npm run demo
```

**Recommended Package.json Scripts:**
Add these scripts to your `package.json` for the best demo experience:

```json
{
  "scripts": {
    "demo": "echo '🎬 Starting Portfolio Demo...' && LTBXD_PORTFOLIO_DEMO=true NODE_ENV=development npx --node-options='--no-deprecation' ts-node demo/portfolio-showcase.ts",
    "demo:quick": "echo '⚡ Quick Demo (2 min)...' && LTBXD_PORTFOLIO_DEMO=true npx ts-node demo/quick-demo.ts",
    "demo:interactive": "echo '🎪 Interactive Demo...' && LTBXD_PORTFOLIO_DEMO=true npx ts-node demo/interactive-demo.ts"
  }
}
```

### 📺 Demo Features

The portfolio demo showcases:

1. **🎯 Basic Watchlist Extraction**
   - Real user data extraction
   - IMDB integration demonstration
   - Poster URL retrieval

2. **⚙️ Advanced Configuration Options**
   - Performance optimization techniques
   - Flexible API design
   - Multiple extraction modes

3. **🛡️ Rate Limiting & Ethics**
   - Responsible scraping practices
   - Request throttling demonstration
   - Terms of service compliance

4. **🔧 Error Handling**
   - Invalid username handling
   - Network error recovery
   - Graceful failure management

5. **📊 Performance Monitoring**
   - Real-time metrics collection
   - Response time tracking
   - Success rate monitoring

### 🎨 Demo Output Example

```
🎬 Letterboxd Scrapper - Portfolio Demonstration
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎓 Educational Purpose: Portfolio & skill demonstration
⚖️  Legal Compliance: Users must respect Letterboxd ToS
🛡️  Rate Limited: Responsible scraping practices

📋 DEMO 1: Basic Watchlist Extraction
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎬 Extracting watchlist for karyn
✅ Successfully extracted 5 films

📄 Sample Results:
   1. "Persepolis"
      IMDB ID: tt1175727
      Poster: ✅ Available

📊 Performance Statistics:
   Total Requests: 1
   Average Response Time: 1250ms
   Success Rate: 100%
```

## 📊 Performance

- **Speed**: Processes 100+ films per minute
- **Memory Efficient**: Handles large watchlists with automatic pagination
- **Rate Limiting**: Built-in delays to respect Letterboxd's servers
- **Error Recovery**: Robust error handling for network issues

## 🛠️ API Reference

### `getWatchlist(params)`

Extracts a user's watchlist from Letterboxd with optional IMDB integration.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `username` | `string` | ✅ | Letterboxd username |
| `options` | `OptionsProps` | ❌ | Configuration options |

#### Options

```typescript
type OptionsProps = {
  poster?: boolean;   // Include movie poster URLs (default: true)
  IMDBID?: boolean;   // Include IMDB IDs (default: true)
  max?: number;       // Maximum number of films to extract
};
```

#### Response

```typescript
type QueryResponseProps = {
  status: 'OK' | 'FAILED' | 'PENDING' | '404' | 'ERROR';
  data: FilmObject[];
  errorMessage: string | null;
};

type FilmObject = {
  id: string | null;      // IMDB ID (e.g., 'tt1234567')
  name: string;           // Film title
  type: string;           // Always 'movie'
  poster: string | null;  // High-quality poster URL
};
```

## 🔧 Error Handling

The library provides comprehensive error handling with specific error messages:

```typescript
const result = await getWatchlist({ username: 'nonexistent-user' });

if (result.status === 'ERROR') {
  console.log('Error occurred:', result.errorMessage);
  // Handle error appropriately
}

// Possible error scenarios:
// - USER_NOT_FOUND: Invalid or non-existent username
// - NETWORK_ERROR: Connection issues
// - SCRAPPER_METHOD_FAILED: Internal scraping error
// - PAGE_NOT_FOUND: Watchlist not accessible
```

Common error types handled:
- **Invalid usernames** - Returns specific error message
- **Network connectivity issues** - Automatic retry logic
- **Rate limiting** - Built-in delays and respect for robots.txt
- **Empty watchlists** - Graceful handling with empty data array
- **Private profiles** - Clear error messaging

## 🧪 Testing

The project includes a comprehensive test suite with 97.1% coverage:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode  
npm run test:watch

# Run linting
npm run lint

# Format code
npm run format
```

Test coverage includes:
- ✅ Unit tests for all functions
- ✅ Integration tests for scraping pipeline
- ✅ Error handling scenarios
- ✅ Mock data for reliable testing
- ✅ Edge cases and boundary conditions

## 🚀 Development

```bash
# Clone the repository
git clone https://github.com/codebymaribel/ltbxd-scrapperio.git
cd ltbxd-scrapperio

# Install dependencies
npm install

# Development mode
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Format code with Prettier
npm run format

# Portfolio demonstration
npm run demo
```

### Project Structure

```
ltbxd-scrapperio/
├── src/
│   ├── config/         # Configuration constants
│   ├── limits/         # Rate limiting logic
│   ├── lists/          # List scraping logic
│   ├── scrapper/       # Core scraping functionality  
│   ├── utils/          # Utility functions
│   ├── index.ts        # Main entry point
│   └── demo.ts         # Main demo script
├── tests/              # Comprehensive test suite
├── types/              # TypeScript type definitions
└── dist/               # Built output
```

## 📋 Requirements

- **Node.js**: 18+ 
- **TypeScript**: 5.0+
- **Browser**: Puppeteer handles browser automation

## 🛡️ Rate Limiting & Ethics

This library is designed with respect for Letterboxd's infrastructure:

- **Built-in delays** prevent overwhelming servers
- **Respectful scraping** follows best practices
- **Error handling** prevents infinite retry loops
- **Configurable limits** allow responsible usage

### Usage Guidelines:
- Don't make excessive concurrent requests
- Consider caching results for repeated access
- Respect Letterboxd's terms of service
- Use primarily for personal projects and research

## 🔄 Production Alternatives

For production applications, consider these compliant approaches:

- **Official Letterboxd API** (if/when available)
- **User-initiated data export** features within Letterboxd
- **Manual data entry** tools for personal use

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Make** your changes with appropriate tests
4. **Commit** your changes (`git commit -m 'Add amazing feature'`)
5. **Push** to the branch (`git push origin feature/amazing-feature`)
6. **Open** a Pull Request

### Development Guidelines:
- Write tests for new features
- Follow the existing code style
- Update documentation as needed
- Ensure all tests pass before submitting
- **Maintain educational/portfolio focus**

## 🙏 Acknowledgments

- **[Letterboxd](https://letterboxd.com)** - For creating an amazing movie platform
- **[IMDB](https://imdb.com)** - For comprehensive movie database
- **[Puppeteer](https://pptr.dev/)** - For reliable web scraping capabilities
- **[Cheerio](https://cheerio.js.org/)** - For server-side HTML parsing

## 📈 Roadmap

- [ ] Support for other Letterboxd lists (liked films, reviews)
- [ ] Batch processing for multiple users
- [ ] Export functionality (CSV, JSON)
- [ ] Caching layer for improved performance
- [ ] Command-line interface (CLI)
- [ ] Real-time progress callbacks
- [ ] Official API integration (when available)

---

**Built with ❤️ by [CodebyMaribel](https://github.com/codebymaribel)**
