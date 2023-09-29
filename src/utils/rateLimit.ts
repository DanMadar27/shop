import type { NextRequest } from 'next/server';

type Limit = {
  ipAddress: string;
  requests: number;
  lastRequestTime: number;
};

export const requestLimit = 100;

class RateLimiter {
  private limits: Limit[];

  constructor(private requestsPerMinute: number) {
    this.limits = [];

    // Set up a timer to periodically clean up the IP addresses every minute
    setInterval(() => this.cleanupLimits(), 60 * 1000);
  }

  private getIp(request: NextRequest): string {
    return request.ip ||
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      request.nextUrl.host;
  }

  public remainingRequests(request: NextRequest) {
    const ipAddress = this.getIp(request);
    const now = Date.now();
    const limitInfo = this.limits.find(limit => limit.ipAddress === ipAddress);

    if (!request.nextUrl.pathname.startsWith('/api/')) {
      // Don't rate limit non-API requests
      return limitInfo ?
        this.requestsPerMinute - limitInfo.requests :
        this.requestsPerMinute - 1;
    }

    if (!limitInfo) {
      // Add a new entry for this IP address if it doesn't exist
      this.limits.push({
        ipAddress,
        requests: 1,
        lastRequestTime: now,
      });

      return this.requestsPerMinute - 1;
    }
    else if (now - limitInfo.lastRequestTime >= 60000) {
      // Reset the rate limit for this IP address if it's a new minute
      limitInfo.requests = 1;
      limitInfo.lastRequestTime = now;

      return this.requestsPerMinute - 1;
    }
    else if (limitInfo.requests < this.requestsPerMinute) {
      // Increment the request count for this IP address
      limitInfo.requests++;
      return this.requestsPerMinute - limitInfo.requests;
    }

    return 0;
  }

  private cleanupLimits() {
    const now = Date.now();

    for (let i = 0; i < this.limits.length; i++) {
      if (now - this.limits[i].lastRequestTime >= 60000) {
        // Remove IP addresses that haven't made requests in the last minute
        this.limits.splice(i, 1);
      }
    }
  }
}

// Export a singleton instance of the rate limiter
const rateLimiterInstance = new RateLimiter(requestLimit);
export default rateLimiterInstance;