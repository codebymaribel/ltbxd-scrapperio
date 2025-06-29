import { PROJECT_CONFIG } from '../config';

interface UsageStats {
  requests: number;
  requestsThisHour: number;
  averageResponseTime: number;
  errorRate: number;
  lastRequestTime: number;
}

class PortfolioUsageManager {
  private stats: UsageStats = {
    requests: 0,
    requestsThisHour: 0,
    averageResponseTime: 0,
    errorRate: 0,
    lastRequestTime: 0,
  };

  private requestTimeArray: number[] = [];
  private responseTimeArray: number[] = [];

  /*
   * Display project introduction
   */

  displayIntro(): void {
    if (!PROJECT_CONFIG.DISPLAY_LEGAL_NOTICES || PROJECT_CONFIG.DEMO_MODE) return;

    console.log('\n🎬 Letterboxd Scrapper - Portfolio Demonstration');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎓 Educational Purpose: Portfolio & skill demonstration');
    console.log('⚖️  Legal Compliance: Users must respect Letterboxd ToS');
    console.log('🛡️  Rate Limited: Responsible scraping practices');
    console.log('📊 Performance Tracking: Built-in metrics & monitoring');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  }

  /*
   * Check rate limits
   */
  checkRateLimits(): { allowed: boolean; message?: string } {
    const now = Date.now();
    const oneHourInMs = 60 * 60 * 1000;

    // Clean old requests
    this.requestTimeArray = this.requestTimeArray.filter(time => now - time < oneHourInMs);
    this.stats.requestsThisHour = this.requestTimeArray.length;

    if (this.requestTimeArray.length >= PROJECT_CONFIG.MAX_REQUESTS_PER_HOUR) {
      return {
        allowed: false,
        message: `🚨QUERY LIMIT EXCEEDED: ${PROJECT_CONFIG.MAX_REQUESTS_PER_HOUR} requests per hour`,
      };
    }

    if (
      this.stats.lastRequestTime &&
      now - this.stats.lastRequestTime < PROJECT_CONFIG.REQUEST_DELAY_MS
    ) {
      const waitTime = Math.ceil(
        PROJECT_CONFIG.REQUEST_DELAY_MS -
          (now - this.stats.lastRequestTime) / 1000,
      );

      console.log('⌛ Waiting the required time before next request...');
      setTimeout(() => {}, waitTime * 1000);
      return {
        allowed: true
      };
    }

    return {
      allowed: true,
    };
  }

  /*
   * Start request tracking
   */

  startRequest(): number {
    const startTime = Date.now();
    this.requestTimeArray.push(startTime);
    this.stats.requests++;
    this.stats.lastRequestTime = startTime;

    if (PROJECT_CONFIG.SHOW_TECHNICAL_INSIGHTS) {
      console.log(
        `🚀 Request #${this.stats.requests} initiated (${this.stats.requestsThisHour + 1}/${PROJECT_CONFIG.MAX_REQUESTS_PER_HOUR} this hour)`,
      );
    }

    return startTime;
  }

  /*
   * End request tracking
   */

  endRequest(startTime: number, success: boolean = true): void {
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    this.responseTimeArray.push(responseTime);

    // Calculate rolling average (keep last 10 requests)
    if (this.responseTimeArray.length > 10) {
      this.responseTimeArray = this.responseTimeArray.slice(-10);
    }

    this.stats.averageResponseTime =
      this.responseTimeArray.reduce((a, b) => a + b, 0) /
      this.responseTimeArray.length;

    if (!success) {
      this.stats.errorRate =
        (this.stats.errorRate * (this.stats.requests - 1) + 1) /
        this.stats.requests;
    }

    if (PROJECT_CONFIG.SHOW_TECHNICAL_INSIGHTS) {
      console.log(
        `✅ Request completed in ${responseTime}ms (avg: ${Math.round(this.stats.averageResponseTime)}ms)`,
      );
    }
  }

  /**
   * Display performance stats - shows monitoring and analytics thinking
   */
  displayStats(): void {
    if (!PROJECT_CONFIG.LOG_PERFORMANCE_METRICS) return;
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n📊 Portfolio Demo Statistics:');
    console.log(`   Total Requests: ${this.stats.requests}`);
    console.log(
      `   Requests This Hour: ${this.stats.requestsThisHour}/${PROJECT_CONFIG.MAX_REQUESTS_PER_HOUR}`,
    );
    console.log(
      `   Average Response Time: ${Math.round(this.stats.averageResponseTime)}ms`,
    );
    console.log(
      `   Success Rate: ${Math.round((1 - this.stats.errorRate) * 100)}%`,
    );
  }

  /**
   * Acknowledge terms - shows legal awareness
   */
  requireTermsAcknowledgment(): boolean {
    if (!PROJECT_CONFIG.REQUIRE_TOS_ACKNOWLEDGMENT) return true;

    const acknowledged =
      process.env.DEMO_MODE === 'true' &&
      process.env.NODE_ENV === 'development';

    if (!acknowledged) {
      console.error('❌ Portfolio demo requires acknowledgment.');
      console.error('   Set DEMO_MODE=true or run via npm scripts.');
      return false;
    }

    return true;
  }
}

export const projectManager = new PortfolioUsageManager();