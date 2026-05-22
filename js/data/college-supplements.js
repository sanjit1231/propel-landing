// College-Specific Supplement Prompts (2024-2025)
// Data sourced from Common Application and individual college websites

const collegeSupplements = {
  1: {
    name: "MIT",
    supplements: [
      { id: "1", title: "Why MIT?", limit: 250, type: "characters" },
      { id: "2", title: "Share an idea or concept you find intellectually exciting", limit: 250, type: "characters" }
    ]
  },
  2: {
    name: "Stanford University",
    supplements: [
      { id: "1", title: "What is important to you, and why?", limit: 250, type: "characters" },
      { id: "2", title: "Why Stanford for you?", limit: 250, type: "characters" },
      { id: "3", title: "Intellectual curiosity: What drives your learning?", limit: 250, type: "characters" }
    ]
  },
  3: {
    name: "Harvard University",
    supplements: [
      { id: "1", title: "Why do you want to attend Harvard?", limit: 250, type: "characters" },
      { id: "2", title: "What do you care about and why?", limit: 250, type: "characters" }
    ]
  },
  4: {
    name: "Yale University",
    supplements: [
      { id: "1", title: "Why Yale?", limit: 250, type: "characters" },
      { id: "2", title: "What do you want to explore and why?", limit: 250, type: "characters" }
    ]
  },
  5: {
    name: "Princeton University",
    supplements: [
      { id: "1", title: "Why Princeton?", limit: 250, type: "characters" },
      { id: "2", title: "What matters to you and why?", limit: 250, type: "characters" }
    ]
  },
  6: {
    name: "UChicago",
    supplements: [
      { id: "1", title: "Essay Question (choose one of several prompts)", limit: 650, type: "words" },
      { id: "2", title: "How does the University of Chicago match your interests?", limit: 250, type: "characters" }
    ]
  },
  7: {
    name: "Columbia University",
    supplements: [
      { id: "1", title: "Why Columbia?", limit: 250, type: "characters" },
      { id: "2", title: "What matters most to you and why?", limit: 250, type: "characters" }
    ]
  },
  8: {
    name: "University of Pennsylvania",
    supplements: [
      { id: "1", title: "Why UPenn?", limit: 250, type: "characters" },
      { id: "2", title: "What do you want to explore?", limit: 250, type: "characters" }
    ]
  },
  9: {
    name: "Northwestern University",
    supplements: [
      { id: "1", title: "Why Northwestern?", limit: 250, type: "characters" },
      { id: "2", title: "Intellectual Interest Essay", limit: 300, type: "characters" }
    ]
  },
  10: {
    name: "Duke University",
    supplements: [
      { id: "1", title: "Why Duke?", limit: 250, type: "characters" },
      { id: "2", title: "Tell us about yourself beyond academics", limit: 250, type: "characters" }
    ]
  },
  11: {
    name: "Caltech",
    supplements: [
      { id: "1", title: "Why Caltech?", limit: 250, type: "characters" },
      { id: "2", title: "What scientific problem intrigues you?", limit: 250, type: "characters" }
    ]
  },
  12: {
    name: "Johns Hopkins University",
    supplements: [
      { id: "1", title: "Why Johns Hopkins?", limit: 250, type: "characters" },
      { id: "2", title: "Your intellectual interest or hobby", limit: 250, type: "characters" }
    ]
  },
  13: {
    name: "UC San Diego",
    supplements: [
      { id: "1", title: "Why UC San Diego appeals to you", limit: 250, type: "characters" },
      { id: "2", title: "Academic or personal interest essay", limit: 250, type: "characters" }
    ]
  },
  14: {
    name: "Georgia Tech",
    supplements: [
      { id: "1", title: "Why Georgia Tech?", limit: 250, type: "characters" },
      { id: "2", title: "Your interest in Georgia Tech and major", limit: 250, type: "characters" }
    ]
  },
  15: {
    name: "University of Michigan",
    supplements: [
      { id: "1", title: "Michigan Essay", limit: 650, type: "words" }
    ]
  },
  16: {
    name: "USC",
    supplements: [
      { id: "1", title: "Why USC?", limit: 250, type: "characters" },
      { id: "2", title: "Meaningful commitment or activity", limit: 250, type: "characters" }
    ]
  },
  17: {
    name: "Carnegie Mellon University",
    supplements: [
      { id: "1", title: "Why Carnegie Mellon?", limit: 250, type: "characters" },
      { id: "2", title: "Short Answer: Tell us more", limit: 250, type: "characters" }
    ]
  },
  18: {
    name: "University of Texas at Austin",
    supplements: [
      { id: "1", title: "Why UT Austin?", limit: 250, type: "characters" },
      { id: "2", title: "Academic or personal interest", limit: 250, type: "characters" }
    ]
  },
  19: {
    name: "UCLA",
    supplements: [
      { id: "1", title: "UCLA Essay - Academic major/career", limit: 250, type: "characters" },
      { id: "2", title: "UCLA Essay - Personal background", limit: 250, type: "characters" }
    ]
  },
  20: {
    name: "UC Berkeley",
    supplements: [
      { id: "1", title: "UC Berkeley Essay 1", limit: 350, type: "words" },
      { id: "2", title: "UC Berkeley Essay 2", limit: 350, type: "words" }
    ]
  },
  21: {
    name: "Boston College",
    supplements: [
      { id: "1", title: "Why Boston College?", limit: 250, type: "characters" },
      { id: "2", title: "Your faith/spirituality and how it relates to BC", limit: 250, type: "characters" }
    ]
  },
  22: {
    name: "Washington University in St. Louis",
    supplements: [
      { id: "1", title: "Why WashU?", limit: 250, type: "characters" },
      { id: "2", title: "Community and belonging", limit: 250, type: "characters" }
    ]
  },
  23: {
    name: "University of Virginia",
    supplements: [
      { id: "1", title: "Why UVA?", limit: 250, type: "characters" },
      { id: "2", title: "Your most meaningful activity", limit: 250, type: "characters" }
    ]
  },
  24: {
    name: "Emory University",
    supplements: [
      { id: "1", title: "Why Emory?", limit: 250, type: "characters" },
      { id: "2", title: "Emory community contribution", limit: 250, type: "characters" }
    ]
  },
  25: {
    name: "Rice University",
    supplements: [
      { id: "1", title: "Why Rice?", limit: 250, type: "characters" },
      { id: "2", title: "What will you contribute to Rice?", limit: 250, type: "characters" }
    ]
  },
  26: {
    name: "Arizona State University",
    supplements: [
      { id: "1", title: "Why ASU?", limit: 250, type: "characters" }
    ]
  },
  27: {
    name: "University of Colorado Boulder",
    supplements: [
      { id: "1", title: "Why CU Boulder?", limit: 250, type: "characters" },
      { id: "2", title: "Academic interest essay", limit: 250, type: "characters" }
    ]
  },
  28: {
    name: "University of Florida",
    supplements: [
      { id: "1", title: "Why UF?", limit: 250, type: "characters" },
      { id: "2", title: "Your major and career interests", limit: 250, type: "characters" }
    ]
  },
  29: {
    name: "Indiana University",
    supplements: [
      { id: "1", title: "Why IU?", limit: 250, type: "characters" }
    ]
  },
  30: {
    name: "University of Wisconsin-Madison",
    supplements: [
      { id: "1", title: "Why Wisconsin?", limit: 250, type: "characters" },
      { id: "2", title: "Community engagement or activity", limit: 250, type: "characters" }
    ]
  }
};
