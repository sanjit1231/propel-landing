// Essay Quality Analyzer - Client-side heuristic analysis
// Analyzes Common App essays for quality indicators

class EssayAnalyzer {
  constructor() {
    this.idealWordCount = 650;
    this.wordCountTolerance = 0.15; // ±15%
  }

  analyze(essayText) {
    if (!essayText || essayText.trim().length === 0) {
      return {
        score: 0,
        wordCount: 0,
        feedback: "Please enter your essay to analyze quality."
      };
    }

    const metrics = {
      wordCount: this.countWords(essayText),
      readabilityGrade: this.calculateReadability(essayText),
      personalityScore: this.analyzePersonalVoice(essayText),
      specificityScore: this.analyzeSpecificity(essayText),
      aiSuspicionScore: this.detectAIPatterns(essayText),
      depthScore: this.analyzeDepth(essayText)
    };

    const score = this.calculateOverallScore(metrics);
    const feedback = this.generateFeedback(metrics, score);

    return {
      score: Math.round(score),
      wordCount: metrics.wordCount,
      readabilityGrade: metrics.readabilityGrade.toFixed(1),
      personalityScore: metrics.personalityScore,
      specificityScore: metrics.specificityScore,
      aiSuspicionScore: metrics.aiSuspicionScore,
      depthScore: metrics.depthScore,
      feedback: feedback,
      color: this.scoreToColor(score)
    };
  }

  countWords(text) {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  }

  calculateReadability(text) {
    // Flesch-Kincaid Grade Level
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const words = this.countWords(text);
    const syllables = this.countSyllables(text);

    if (sentences === 0 || words === 0) return 0;

    const grade = (0.39 * (words / sentences)) + (11.8 * (syllables / words)) - 15.59;
    return Math.max(0, Math.min(grade, 18)); // Clamp to 0-18
  }

  countSyllables(text) {
    let count = 0;
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];

    for (let word of words) {
      count += this.syllablesInWord(word);
    }

    return Math.max(1, count);
  }

  syllablesInWord(word) {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;

    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');

    const matches = word.match(/[aeiouy]{1,2}/g);
    return matches ? matches.length : 1;
  }

  analyzePersonalVoice(text) {
    // Look for first-person voice, specific stories, personal pronouns
    const personalPronouns = (text.match(/\b(I|me|my|we|us|our)\b/gi) || []).length;
    const wordCount = this.countWords(text);

    const pronounScore = Math.min(100, (personalPronouns / (wordCount / 10)) * 100);

    // Check for specificity indicators (dates, names, places)
    const specificity = this.analyzeSpecificity(text);

    return Math.round((pronounScore * 0.6) + (specificity * 0.4));
  }

  analyzeSpecificity(text) {
    // Look for concrete details, examples, specific facts
    const hasNumbers = /\b\d+\b/.test(text);
    const hasQuotes = /"[^"]{5,}"/.test(text);
    const hasDialogue = /['"][^'"]{3,}['"]/.test(text);
    const hasVerbs = /(realized|discovered|learned|achieved|created|built|founded|started)\b/i.test(text);

    let specificityScore = 0;
    if (hasNumbers) specificityScore += 20;
    if (hasQuotes) specificityScore += 20;
    if (hasDialogue) specificityScore += 20;
    if (hasVerbs) specificityScore += 20;

    // Check for concrete vs abstract language
    const concreteWords = (text.match(/\b(place|time|moment|day|year|person|thing|object|building|room|event)\b/gi) || []).length;
    const abstractWords = (text.match(/\b(essence|nature|concept|idea|theory|philosophy|abstract|meaning|purpose)\b/gi) || []).length;

    const concreteness = concreteWords > abstractWords ? 20 : 0;

    return Math.min(100, specificityScore + concreteness);
  }

  detectAIPatterns(text) {
    // Detect suspicious AI-generation patterns
    const lowerText = text.toLowerCase();

    let suspicionScore = 0;

    // Check for overly repetitive phrase patterns
    const phrases = text.split(/[.!?]+/);
    const uniquePhrases = new Set(phrases.map(p => p.trim().split(/\s+/).slice(0, 3).join(' ')));
    const repetitionRate = 1 - (uniquePhrases.size / Math.max(phrases.length, 1));

    suspicionScore += Math.min(30, repetitionRate * 100);

    // Check for overly transitional language
    const transitions = (lowerText.match(/\b(moreover|furthermore|consequently|subsequently|inevitably|undoubtedly|certainly)\b/g) || []).length;
    suspicionScore += Math.min(20, transitions * 5);

    // Check for overly eloquent/polished language that seems unnatural
    const overcomplexWords = (lowerText.match(/\b(quintessential|perspicacious|obfuscate|mellifluous|precipitate|ameliorate)\b/g) || []).length;
    suspicionScore += Math.min(20, overcomplexWords * 10);

    // Check for lack of contractions (formal tone)
    const contractions = (text.match(/\b(I'm|you're|don't|won't|can't|shouldn't|wouldn't|couldn't)\b/gi) || []).length;
    const wordCount = this.countWords(text);
    const contractionRate = contractions / (wordCount / 100);

    if (contractionRate < 2) {
      suspicionScore += 15; // Suspiciously formal
    }

    // Return inverse score (lower is better - less suspicion)
    return Math.max(0, 100 - Math.min(100, suspicionScore));
  }

  analyzeDepth(text) {
    // Check for evidence of deep thinking and reflection
    const reflectiveWords = (text.match(/\b(realize|understand|believe|think|felt|learned|discovered|wondered|questioned|reflect)\b/gi) || []).length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const avgSentenceLength = this.countWords(text) / Math.max(sentences, 1);

    // Longer sentences suggest more complex thinking
    const sentenceLengthScore = Math.min(100, (avgSentenceLength / 20) * 100);

    // Reflective language indicates depth
    const reflectiveScore = Math.min(100, (reflectiveWords / (this.countWords(text) / 20)) * 100);

    return Math.round((sentenceLengthScore * 0.4) + (reflectiveScore * 0.6));
  }

  calculateOverallScore(metrics) {
    // Word count component (20 points)
    const wordCountScore = this.wordCountQualityScore(metrics.wordCount);

    // Readability component (15 points) - target 8-11 grade level
    const readabilityScore = this.readabilityQualityScore(metrics.readabilityGrade);

    // Personal voice (20 points)
    const voiceScore = metrics.personalityScore;

    // Specificity (15 points)
    const specificityScore = metrics.specificityScore;

    // AI suspicion (10 points - higher is better, means less AI-like)
    const aiScore = metrics.aiSuspicionScore;

    // Depth (20 points)
    const depthScore = metrics.depthScore;

    const totalScore = (wordCountScore * 0.20) +
                       (readabilityScore * 0.15) +
                       (voiceScore * 0.20) +
                       (specificityScore * 0.15) +
                       (aiScore * 0.10) +
                       (depthScore * 0.20);

    return totalScore;
  }

  wordCountQualityScore(wordCount) {
    // Ideal: 650 ± 10% (585-715)
    const min = this.idealWordCount * (1 - this.wordCountTolerance);
    const max = this.idealWordCount * (1 + this.wordCountTolerance);

    if (wordCount >= min && wordCount <= max) {
      return 100;
    }

    if (wordCount < min) {
      // Linear decrease: 585 words = 50%, 0 words = 0%
      return Math.max(0, (wordCount / min) * 100);
    } else {
      // Linear decrease: 715+ words = penalties
      const overage = wordCount - max;
      return Math.max(0, 100 - (overage / 100) * 10); // -10 points per 100 words over
    }
  }

  readabilityQualityScore(grade) {
    // Ideal grade level: 8-11 (advanced high school level)
    if (grade >= 8 && grade <= 11) {
      return 100;
    }

    if (grade < 8) {
      // Too simple: grade 5-7 = 75%, grade 0-4 = 0%
      return Math.max(0, (grade / 8) * 100);
    } else {
      // Too complex: grade 12-14 = 75%, grade 15+ = 25%
      if (grade <= 14) {
        return Math.max(75, 100 - ((grade - 11) * 8.33));
      } else {
        return 25;
      }
    }
  }

  generateFeedback(metrics, score) {
    const feedback = [];

    // Word count feedback
    const min = this.idealWordCount * (1 - this.wordCountTolerance);
    const max = this.idealWordCount * (1 + this.wordCountTolerance);

    if (metrics.wordCount < min) {
      feedback.push(`📏 Your essay is ${Math.round(min - metrics.wordCount)} words short. Aim for ~650 words.`);
    } else if (metrics.wordCount > max) {
      feedback.push(`📏 Your essay is ${Math.round(metrics.wordCount - max)} words over. Trim to ~650.`);
    } else {
      feedback.push(`✓ Word count is excellent (${metrics.wordCount} words).`);
    }

    // Readability feedback
    if (metrics.readabilityGrade < 8) {
      feedback.push(`📚 Consider using more sophisticated vocabulary and varied sentence structures.`);
    } else if (metrics.readabilityGrade > 11) {
      feedback.push(`📚 Some sentences are very complex. Ensure they're clear and intentional.`);
    } else {
      feedback.push(`✓ Readability is excellent (Grade ${metrics.readabilityGrade}).`);
    }

    // Personal voice feedback
    if (metrics.personalityScore < 50) {
      feedback.push(`🎯 Use more personal pronouns and specific examples to strengthen your voice.`);
    } else if (metrics.personalityScore > 75) {
      feedback.push(`✓ Your personal voice comes through clearly.`);
    }

    // Specificity feedback
    if (metrics.specificityScore < 50) {
      feedback.push(`🎯 Add concrete details, examples, dates, or anecdotes to strengthen your essay.`);
    } else if (metrics.specificityScore > 75) {
      feedback.push(`✓ Your essay is rich with specific details.`);
    }

    // AI suspicion feedback
    if (metrics.aiSuspicionScore < 60) {
      feedback.push(`⚠️ Some sections read very polished. Ensure this reflects your authentic voice.`);
    } else if (metrics.aiSuspicionScore > 85) {
      feedback.push(`✓ Your essay has a natural, authentic tone.`);
    }

    // Overall quality feedback
    if (score >= 85) {
      feedback.push(`🌟 This is a strong essay with genuine depth and voice.`);
    } else if (score >= 70) {
      feedback.push(`👍 This essay has solid fundamentals. Consider the suggestions above to strengthen it.`);
    } else {
      feedback.push(`📝 This essay needs more work. Focus on specificity, voice, and depth.`);
    }

    return feedback;
  }

  scoreToColor(score) {
    if (score >= 80) return '#10b981'; // Green
    if (score >= 60) return '#f59e0b'; // Yellow/Orange
    return '#ef4444'; // Red
  }
}

// Make available globally
const essayAnalyzer = new EssayAnalyzer();
