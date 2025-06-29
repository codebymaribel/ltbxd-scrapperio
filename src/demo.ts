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
import { projectManager } from './limits/project-manager';

const DEMO_CONFIG = {
  DEMO_QUERIES: {
    username: 'dave',
    list_url:
      'https://letterboxd.com/crew/list/most-obsessively-rewatched-meryl-streep-films/',
    search_query: 'Jurassic Park',
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
  console.log();

  try {
    const result = await getWatchlist({
      username,
      options: {
        IMDBID: true,
        poster: true,
        max: 3, // Limit for demo
      },
    });

    if (result.status === QUERY_RESULT_STATUS.ok) {
      console.log(`✅ Successfully extracted ${result.data.length} films`);
      console.log();
      console.log('📄 Sample Results:');
      result.data.slice(0, 3).forEach((film, index) => {
        console.log(`   ${index + 1}. "${film.name}"`);
        console.log(`      ✅IMDB ID: ${film.id}` || ' ❌IMDB ID: Not found');
        console.log(`      ✅Poster: ${film.poster}` || ' ❌Poster: Not found');
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
  console.log('📋 DEMO 2: Custom List Films Extraction');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Demonstrates: Flexible API design, performance optimization');
  console.log();

  const list_url = DEMO_CONFIG.DEMO_QUERIES.list_url;

  // Demo fast extraction (no IMDB lookup)
  console.log('🎯 Fast Extraction (Skip IMDB lookup for speed):');
  console.log('ℹ️ Benefits: Faster processing, reduced API calls');
  console.log(`🔗 List: ${list_url}`);
  console.log('⚙️ Options: { IMDBID: false, poster: true, max: 3 }');
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
        console.log(
          !film.id
            ? '      ✅IMDB ID: Not found'
            : `     ❌IMDB ID:  ${film.id}`,
        );
        console.log(
          `      ✅Poster: ${film.poster}` || '      ❌Poster: Not found',
        );
        console.log();
      });
      console.log();
    }
  } catch (error) {
    console.log(`❌ Fast extraction error: ${error}`);
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
    'Demonstrates: Extended runtime query (user has a lot of lists) with automatic pagination handling',
  );
  console.log();

  const username = DEMO_CONFIG.DEMO_QUERIES.username;
  console.log(`🎯 Extracting public lists for user: ${username}`);
  console.log('⚙️ Options: { posters: true, summary: false, amount: true }');
  console.log();
  try {
    const listsResult = await getUserLists({
      username,
      options: {
        posters: true,
        summary: false,
        amount: true,
      },
    });

    if (listsResult.status === QUERY_RESULT_STATUS.ok) {
      console.log(`✅ Found ${listsResult.data.length} public lists`);
      console.log();
      console.log('📄 Sample Lists:');
      listsResult.data.slice(0, 2).forEach((list, index) => {
        console.log(`   ${index + 1}. "${list.title}"`);
        console.log(
          `      ✅Films: ${list.amount}` || '❌Films: Unknown count',
        );
        console.log(
          !list.summary
            ? '      ✅Summary: None'
            : `      ❌Summary: ${list.summary}`,
        );
        if (list.posters) {
          console.log(`      ✅Posters:`);
          list.posters.forEach((poster, index) => {
            console.log(`         ${index + 1}.- ${poster}`);
          });
        } else {
          console.log(`      ❌Posters: None`);
        }
        console.log(
          list.url ? `      ✅URL: ${list.url}` : '      ❌URL: Not found',
        );
        console.log();
      });
    } else {
      console.log(`❌ List extraction error`);
    }
  } catch (error) {
    console.log(`❌ Lists demo error: ${error}`);
  }
}

/**
 * Demo 4:  Search Film
 */
async function searchFilmDemo(): Promise<void> {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📝 DEMO 4: Search Film');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Demonstrates: Search film by name functionality');
  console.log();

  const title = DEMO_CONFIG.DEMO_QUERIES.search_query;
  console.log(`📋 Extracting search results for: ${title}`);
  console.log(
    '⚙️ Options: { poster: false, alternativeTitles: true, director: true }',
  );

  try {
    const searchResult = await searchFilm({
      title,
      options: {
        poster: false,
      },
    });

    if (searchResult.status === QUERY_RESULT_STATUS.ok) {
      console.log(`✅ Found ${searchResult.data.length} related films`);

      console.log('📄 Sample Films:');
      searchResult.data.slice(0, 3).forEach((film, index) => {
        console.log(`   ${index + 1}. "${film.title}"`);
        console.log(`      ✅ Year: ${film.year || 'Unknown count'}`);
        console.log(`      ✅ Director: ${film.director || 'Unknown count'}`);
        if (film.alternativeTitles) {
          console.log('      ✅ Alternative Titles:');
          film.alternativeTitles.slice(0, 3).forEach((title, index) => {
            console.log(`         ${index + 1}.- ${title}`);
          });
        } else {
          console.log('      ❌ Alternative Titles: None');
        }
        if (film.poster) {
          console.log(`      ✅❌Poster: ${film.poster}`);
        } else {
          console.log(`      ✅Poster: None`);
        }
        console.log();
      });
    } else {
      console.log(`❌ Search extraction failed: ${searchResult.errorMessage}`);
    }
  } catch (error) {
    console.log(`❌ Search demo error: ${error}`);
  }
}

/**
 * Demo 5: Error Handling
 */
async function demoErrorHandling(): Promise<void> {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📋 DEMO 5: Comprehensive Error Handling');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Demonstrates: Robust error management, user experience');
  console.log();
  console.log('🎯 Error Handling Features:');
  console.log('   • User-friendly error messages');
  console.log('   • Specific error codes');
  console.log('   • Graceful failure handling');
  console.log('   • Network error recovery');
  console.log();

  // Test invalid username
  console.log('🧪 Testing invalid username handling...');
  console.log();
  const invalidResult = await getWatchlist({
    username: 'this-user-definitely-does-not-exist-12345',
    options: { IMDBID: false, poster: false, max: 1 },
  });

  console.log(`   Username: "this-user-definitely-does-not-exist-12345"`);
  console.log(
    (invalidResult.status === QUERY_RESULT_STATUS.error ? `   ✅` : '   ❌') +
      `Status: ${invalidResult.status}`,
  );
  console.log(`   ✅Error: ${invalidResult.errorMessage || 'None'}`);
  console.log();

  // Test missing parameters
  console.log('🧪 Testing missing parameters...');
  try {
    const missingResult = await searchFilm({
      title: '', // Empty query
      options: { poster: false },
    });
    console.log(
      (missingResult.status === QUERY_RESULT_STATUS.failed
        ? `   ✅`
        : '   ❌') + `Status: ${missingResult.status}`,
    );
    console.log(`   ✅Error: ${missingResult.errorMessage}`);
  } catch (error) {
    console.log(`   Caught error: ${error}`);
  }

  console.log();
}

/**
 * Demo 6: Rate Limiting & Ethical Scraping
 */
async function demoRateLimiting(): Promise<void> {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🛡️  DEMO 6: Rate Limiting & Ethical Scraping');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Demonstrates: Responsible development, API best practices');
  console.log();

  console.log('🎯 Rate Limiting Features:');
  console.log('   • 2-second minimum delay between requests');
  console.log('   • 6 requests per hour maximum');
  console.log('   • Automatic request tracking');
  console.log('   • User-friendly error messages');
  console.log();
  // Immediate sixth request (should be rate limited)
  console.log('📡 Making sixth request...');
  console.log();
  const result = await getWatchlist({
    username: DEMO_CONFIG.DEMO_QUERIES.username,
    options: { IMDBID: false, poster: false, max: 1 },
  });

  if (
    result.status === QUERY_RESULT_STATUS.error &&
    result.errorMessage?.includes('LIMIT')
  ) {
    console.log('✅ Scrapping limiting working correctly!');
    console.log(`   Message: ${result.errorMessage}`);
  } else {
    console.log('⚠️  Scrapping limiting may not be configured');
  }
}
/**
 * Display demo features
 */

function displayDemoFeatures(): void {
  console.log();
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('ℹ️ Features showcased:');
  console.log();
  console.log(' ✅ Watchlist extraction');
  console.log(" ✅ User's public lists extraction");
  console.log(' ✅ Films from a list extraction');
  console.log(' ✅ Film search by title');
  console.log(' ✅ Automatic pagination for long lists');
  console.log(' ✅ Configurable data options (posters, IMDB IDs)');
  console.log(' ✅ Performance tuning (fast extraction mode)');
  console.log(' ✅ Rate limiting & ethical scraping');
  console.log(' ✅ Comprehensive error handling');
  console.log(' ✅ Performance monitoring');
  console.log(' ✅ TypeScript implementation');
  console.log();
}

/**
 * Main demo function
 */

async function runDemo(): Promise<void> {
  // Set environment for demo
  process.env.NODE_ENV = 'development';
  process.env.DEMO_MODE = 'true';
  process.env.SHOW_TECHNICAL_INSIGHTS = 'true';

  try {
    displayDemoIntro();
    await basicWatchlistDemo();
    await customListFilmsDemo();
    await userListsDemo();
    await searchFilmDemo();
    await demoErrorHandling();
    await demoRateLimiting();
    displayDemoFeatures();
    projectManager.displayStats();
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
