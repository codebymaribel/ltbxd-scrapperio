/**
 * 🎬 Letterboxd Scrapper - Portfolio Demo Showcase
 *
 * This demo demonstrates all the key features and capabilities
 * of the ltbxd-scrapperio project for portfolio purposes.
 *
 * Features showcased:
 * - Complete watchlist extraction
 * - IMDB integration
 * - Rate limiting and ethical scraping
 * - Error handling
 * - Performance monitoring
 * - TypeScript implementation
 */
import { getListFilms, getUserLists, getWatchlist, searchFilm } from '.';
import { QUERY_RESULT_STATUS } from './config/constants';

process.env.DEMO_MODE = 'true';
process.env.NODE_ENV ='development';

const DEMO_CONFIG = {
  DEMO_QUERIES: {
    username: 'dave',
    list_url:
      'https://letterboxd.com/crew/list/most-obsessively-rewatched-meryl-streep-films/',
    search_query: 'Jurassic Park',
  },

  DEMO_DELAY: 3000, // 3 second delay between sections
  SHOWCASE_FEATURES: {
    basicWatchlist: true,
    advancedOptions: true,
    userLists: true,
    rateLimiting: true,
    errorHandling: true,
    performanceMetrics: true,
  },
};

/**
 * Demo Introduction
 */
function displayDemoIntro(): void {
  console.clear();
  console.log(
    '╔══════════════════════════════════════════════════════════════╗',
  );
  console.log(
    '║                🎬 LETTERBOXD SCRAPPER DEMO                   ║',
  );
  console.log(
    '║                   Portfolio Showcase                         ║',
  );
  console.log(
    '╚══════════════════════════════════════════════════════════════╝',
  );
  console.log();
  console.log(
    '🎯 Purpose: Demonstrate web scraping, TypeScript, and API design skills',
  );
  console.log('⚖️  Legal: Educational/portfolio use only - respects ToS');
  console.log(
    '🛡️  Features: Rate limiting, error handling, performance monitoring',
  );
  console.log('📊 Tech Stack: TypeScript, Puppeteer, Cheerio, Jest');
  console.log();
  console.log(
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
  );
  console.log();
}

/**
 * Display demo features
 */
function displayDemoFeatures(): void {
  console.log('Features showcased:');
  console.log(' - Complete watchlist extraction');
  console.log(' - IMDB integration');
  console.log(' - Rate limiting and ethical scraping');
  console.log(' - Error handling');
  console.log(' - Performance monitoring');
  console.log(' - TypeScript implementation');
  console.log();
}

/**
 * Demo 1: Basic Watchlist Extraction
 */

async function basicWatchlistDemo(): Promise<void> {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📋 DEMO 1: Basic Watchlist Extraction');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Demonstrates: Core scraping functionality, data extraction');
  console.log();

  const username = DEMO_CONFIG.DEMO_QUERIES.username;
  console.log(`🎯 Extracting watchlist for user: ${username}`);
  console.log('⚙️  Options: Default settings (IMDB IDs + posters)');

  try {
    const result = await getWatchlist({
      username,
      options: {
        IMDBID: true,
        poster: true,
        max: 5, // Limit for demo
      },
    });

    if (result.status === QUERY_RESULT_STATUS.ok) {
      console.log(`✅ Successfully extracted ${result.data.length} films`);
      console.log();
      console.log('📄 Sample Results:');
      result.data.slice(0, 5).forEach((film, index) => {
        console.log(`   ${index + 1}. "${film.name}"`);
        console.log(`      IMDB ID: ${film.id || ' ❌ Not found'}`);
        console.log(`      Poster: ${film.poster || ' ❌ Not found'}`);
        console.log();
      });
    } else {
      console.log(`❌ Extraction failed: ${result.errorMessage}`);
    }
  } catch (error) {
    console.log(`❌ Demo error: ${error}`);
  }
}

/**
 * Demo 2: Advanced Configuration Options
 */
async function customListFilmsDemo(): Promise<void> {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('⚙️  DEMO 2: Custom List Films Extraction');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Demonstrates: Flexible API design, performance optimization');
  console.log();

  const list_url = DEMO_CONFIG.DEMO_QUERIES.list_url;

  // Demo fast extraction (no IMDB lookup)
  console.log('🚀 Fast Extraction (Skip IMDB lookup for speed):');
  console.log(`   List: ${list_url}`);
  console.log('   Options: { IMDBID: false, poster: true, max: 3 }');
  console.log();

  try {
    const result = await getListFilms({
      url: list_url,
      options: {
        IMDBID: false, // Skip time-consuming IMDB lookup
        poster: true,
        max: 3,
      },
    });

    if (result.status === QUERY_RESULT_STATUS.ok) {
      console.log(`✅ Successfully extracted ${result.data.length} films`);
      console.log();
      console.log('📄 Sample Results:');
      result.data.slice(0, 3).forEach((film, index) => {
        console.log(`   ${index + 1}. "${film.name}"`);
        console.log(`      IMDB ID: ${film.id || ' ❌ Not found'}`);
        console.log(`      Poster: ${film.poster || ' ❌ Not found'}`);
        console.log();
      });
      console.log('   Benefits: Faster processing, reduced API calls');
    }
  } catch (error) {
    console.log(`❌ Fast extraction error: ${error}`);
  }

  console.log();

  // Demo minimal extraction
  console.log('🎯 Minimal Data Extraction (Titles only):');
  console.log('   Options: { IMDBID: false, poster: false, max: 3 }');

  try {
    const minimalResult = await getListFilms({
      url: list_url,
      options: {
        IMDBID: false,
        poster: false,
        max: 3,
      },
    });
    if (minimalResult.status === QUERY_RESULT_STATUS.ok) {
      console.log(
        `✅ Minimal extraction: ${minimalResult.data.length} films (titles only)`,
      );
      console.log('');
      console.log('   Use case: Quick title lists, reduced bandwidth');
    }
  } catch (error) {
    console.log(`❌ Minimal extraction error: ${error}`);
  }
}

/**
 * Demo 3: User Lists Extraction
 */
async function userListsDemo(): Promise<void> {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📝 DEMO 3: User Lists Extraction');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(
    'Demonstrates: Extended functionality, comprehensive data extraction',
  );
  console.log();

  const username = DEMO_CONFIG.DEMO_QUERIES.username;
  console.log(`📋 Extracting public lists for user: ${username}`);

  try {
    // Check if getUserLists is implemented
    if (typeof getUserLists === 'function') {
      const listsResult = await getUserLists({
        username,
        options: {
          posters: true,
          summary: true,
          amount: true,
        },
      });

      if (listsResult.status === QUERY_RESULT_STATUS.ok) {
        console.log(`✅ Found ${listsResult.data.length} public lists`);
        console.log();
        console.log('📄 Sample Lists:');
        listsResult.data.slice(0, 2).forEach((list, index) => {
          console.log(`   ${index + 1}. "${list.title}"`);
          console.log(`      Films: ${list.amount || 'Unknown count'}`);
          console.log(
            `      Summary: ${list.summary ? `✅ ${list.summary}` : '❌ None'}`,
          );
          console.log();
        });
      } else {
        console.log(`❌ Lists extraction failed: ${listsResult.errorMessage}`);
      }
    } else {
      console.log('ℹ️  User lists feature not yet implemented');
      console.log("   Planned feature: Extract user's custom movie lists");
    }
  } catch (error) {
    console.log(`❌ Lists demo error: ${error}`);
  }
}


/**
 * Demo 4: Rate Limiting & Ethical Scraping
 */
async function demoRateLimiting(): Promise<void> {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🛡️  DEMO 4: Rate Limiting & Ethical Scraping');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Demonstrates: Responsible development, API best practices');
  console.log();

  console.log('⏱️  Testing request delay enforcement...');

  // First request
  console.log('📡 Making first request...');
  const result1 = await getWatchlist({
    username: DEMO_CONFIG.DEMO_QUERIES.username,
    options: { IMDBID: false, poster: false, max: 1 },
  });
  console.log(`   Result: ${result1.status}`);

  // Immediate second request (should be rate limited)
  console.log('📡 Making immediate second request...');
  const result2 = await getWatchlist({
    username: DEMO_CONFIG.DEMO_QUERIES.username,
    options: { IMDBID: false, poster: false, max: 1 },
  });

  if (result2.status === 'ERROR' && result2.errorMessage?.includes('wait')) {
    console.log('✅ Rate limiting working correctly!');
    console.log(`   Message: ${result2.errorMessage}`);
  } else {
    console.log('⚠️  Rate limiting may not be configured');
  }

  console.log();
  console.log('🎯 Rate Limiting Features:');
  console.log('   • 2-second minimum delay between requests');
  console.log('   • 15 requests per hour maximum');
  console.log('   • Automatic request tracking');
  console.log('   • User-friendly error messages');
}

/**
 * Demo 5: Error Handling
 */
async function demoErrorHandling(): Promise<void> {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔧 DEMO 5: Comprehensive Error Handling');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Demonstrates: Robust error management, user experience');
    console.log();
  
    // Test invalid username
    console.log('🧪 Testing invalid username handling...');
    const invalidResult = await getWatchlist({
      username: 'this-user-definitely-does-not-exist-12345',
      options: { IMDBID: false, poster: false, max: 1 }
    });
  
    console.log(`   Username: "this-user-definitely-does-not-exist-12345"`);
    console.log(`   Status: ${invalidResult.status}`);``
    console.log(`   Error: ${invalidResult.errorMessage || 'None'}`);
    console.log();
  
    // Test missing parameters
    console.log('🧪 Testing missing parameters...');
    try {
      const missingResult = await searchFilm({
        title: '', // Empty query
        options: { poster: false }
      });
      console.log(`   Empty query result: ${missingResult.status}`);
      console.log(`   Error: ${missingResult.errorMessage}`);
    } catch (error) {
      console.log(`   Caught error: ${error}`);
    }
  
    console.log();
    console.log('🎯 Error Handling Features:');
    console.log('   • User-friendly error messages');
    console.log('   • Specific error codes');
    console.log('   • Graceful failure handling');
    console.log('   • Network error recovery');
  }

/**
 * Main demo function
 */

async function runDemo(): Promise<void> {
  // Set environment for demo
  process.env.NODE_ENV = 'development';
  process.env.DEMO_MODE = 'true';
  //TODO
  process.env.LTBXD_SHOW_METRICS = 'true';
  process.env.LTBXD_VERBOSE_LOGGING = 'true';

  try {
    displayDemoIntro();
    displayDemoFeatures();
    await basicWatchlistDemo();
    await customListFilmsDemo();
    await userListsDemo();
    await demoRateLimiting();
    await demoErrorHandling(); 
  } catch (error) {
    console.error('❌ Error running demo:', error);
  }
}

if (require.main === module) {
  console.log('🚀 Starting Letterboxd Scrapper Portfolio Demo...\n');
  runDemo().then(() => {
    console.log('\n👋 Demo finished. Thank you for viewing!');
    process.exit(0);
  });
}
