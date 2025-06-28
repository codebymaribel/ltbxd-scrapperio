import { PROJECT_MANAGER_MESSAGES } from '../config/constants';
import { projectManager } from './project-manager';

interface RequestOptions {
  respectRateLimit?: boolean;
  showProgress?: boolean;
  logErrors?: boolean;
}

export async function limitWrapper<T>(
  requestFunction: () => Promise<T>,
  options: RequestOptions = {},
): Promise<T> {
  const {
    respectRateLimit = true,
    showProgress = false,
    logErrors = true,
  } = options;

  if (!projectManager.requireTermsAcknowledgment()) {
    throw new Error(PROJECT_MANAGER_MESSAGES.terms_not_acknowledged);
  }

  if (respectRateLimit) {
    const rateCheck = projectManager.checkRateLimits();
    if (!rateCheck.allowed) {
      throw new Error(rateCheck.message || 'Rate limit exceeded');
    }
  }

  const startTime = projectManager.startRequest();

  try {
    const result = await requestFunction();
    projectManager.endRequest(startTime, true);
    if (showProgress) {
      projectManager.displayStats();
    }
    return result;
  } catch (error) {
    projectManager.endRequest(startTime, false);
    if (logErrors) {
      console.error('❌ Request failed:', error);
    }
    throw error;
  }
}
