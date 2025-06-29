
export const PROJECT_CONFIG = {
    PORTFOLIO_MODE: process.env.NODE_ENV !== 'production',
    DEMO_MODE: process.env.DEMO_MODE !== 'true',
    SHOW_TECHNICAL_INSIGHTS: false,

    MAX_REQUESTS_PER_HOUR: 6,
    REQUEST_DELAY_MS: 2000,

    TRACK_USAGE_STATS:true,
    LOG_PERFORMANCE_METRICS:true,

    REQUIRE_TOS_ACKNOWLEDGMENT:true,
    DISPLAY_LEGAL_NOTICES:process.env.DEMO_MODE !== 'true',
} as const;