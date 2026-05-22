// SM-2 Spaced Repetition Algorithm
// Schedules card reviews based on performance and memory fade
// Algorithm: https://en.wikipedia.org/wiki/Spaced_repetition#Leitner_system

class SM2Algorithm {
  constructor() {
    this.DEFAULT_EASINESS = 2.5;
    this.MIN_EASINESS = 1.3;
  }

  // Initialize a new card
  initCard() {
    return {
      easiness: this.DEFAULT_EASINESS,
      repetitions: 0,
      interval: 1,
      nextReview: new Date(),
      lastReview: null,
      quality: 0
    };
  }

  // Calculate next review date based on quality of response
  // quality: 0 = forgot, 1 = hard, 2 = good, 3 = easy
  calculateNextReview(cardState, quality) {
    if (!cardState) {
      cardState = this.initCard();
    }

    // Calculate new easiness factor
    let newEasiness = cardState.easiness + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    newEasiness = Math.max(this.MIN_EASINESS, newEasiness);

    // Calculate new interval
    let newRepetitions, newInterval;

    if (quality < 3) {
      // Forgot or hard - reset
      newRepetitions = 1;
      newInterval = 1;
    } else {
      // Good or easy - progress
      newRepetitions = cardState.repetitions + 1;

      if (newRepetitions === 1) {
        newInterval = 1;
      } else if (newRepetitions === 2) {
        newInterval = 3;
      } else {
        newInterval = Math.round(cardState.interval * newEasiness);
      }
    }

    // Calculate next review date (in days)
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + newInterval);

    return {
      easiness: newEasiness,
      repetitions: newRepetitions,
      interval: newInterval,
      nextReview: nextReview.toISOString(),
      lastReview: new Date().toISOString(),
      quality: quality
    };
  }

  // Check if card is due for review
  isDue(cardState) {
    if (!cardState || !cardState.nextReview) {
      return true;
    }
    const nextReview = new Date(cardState.nextReview);
    return new Date() >= nextReview;
  }

  // Get days until next review
  daysUntilReview(cardState) {
    if (!cardState || !cardState.nextReview) {
      return 0;
    }
    const nextReview = new Date(cardState.nextReview);
    const today = new Date();
    const diffTime = nextReview - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  }

  // Get card mastery status (0-100%)
  getMasteryPercentage(cardState) {
    if (!cardState) {
      return 0;
    }

    // Based on repetitions and easiness
    const maxMastery = Math.min(100, cardState.repetitions * 20 + (cardState.easiness - 1.3) * 10);
    return Math.round(maxMastery);
  }
}

const sm2 = new SM2Algorithm();
