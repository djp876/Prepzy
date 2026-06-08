/** Canned demo content for the "See Prepzy in action" section.
 *  One entry per CBSE class/stream plus NEET-UG.
 *  All copy avoids the word "AI" per brand rules. */

export type Tutor = "Ramanujan" | "Curie" | "Gargi";

export interface Doubt {
  q: string;
  steps: string[];
  answer: string;
}

export interface QuizQuestion {
  q: string;
  options: string[];
  correct: number;
  why: string;
}

export interface ClassDemo {
  doubts: Doubt[];
  lesson: { title: string; tutor: Tutor; line: string };
  quiz: QuizQuestion[];
}

export const TUTOR_STYLE: Record<
  Tutor,
  { bg: string; color: string; subject: string; line: string }
> = {
  Ramanujan: {
    bg: "#ffb84d",
    color: "#1a1a2e",
    subject: "Maths tutor",
    line: "Pause anywhere and I will rework the step with you.",
  },
  Curie: {
    bg: "#3d348b",
    color: "#ffffff",
    subject: "Science tutor",
    line: "Ask me mid-video, the lesson waits for you.",
  },
  Gargi: {
    bg: "#1a1a2e",
    color: "#ffb84d",
    subject: "Social Science tutor",
    line: "Stuck? I will give you the context, right here.",
  },
};

export interface LessonCard {
  subject: string;
  title: string;
}

/** Lesson rail per selection — mirrors the live "Visual Learning" demo. */
export const LESSON_RAIL: Record<string, LessonCard[]> = {
  "Class 6": [
    { subject: "Science", title: "Food: where does it come from?" },
    { subject: "Mathematics", title: "Knowing our numbers" },
    { subject: "Social Science", title: "The Earth in the solar system" },
  ],
  "Class 7": [
    { subject: "Science", title: "Nutrition in plants" },
    { subject: "Mathematics", title: "Integers" },
    { subject: "Social Science", title: "On equality" },
  ],
  "Class 8": [
    { subject: "Science", title: "Crop production and management" },
    { subject: "Mathematics", title: "Linear equations in one variable" },
    { subject: "Social Science", title: "From trade to territory" },
  ],
  "Class 9": [
    { subject: "Science", title: "Motion" },
    { subject: "Mathematics", title: "Polynomials" },
    { subject: "Social Science", title: "The French Revolution" },
  ],
  "Class 10": [
    { subject: "Mathematics", title: "Trigonometry: heights and distances" },
    { subject: "Science", title: "The human eye and the colourful world" },
    { subject: "Social Science", title: "Nationalism in India" },
  ],
  "Class 11 (PCM)": [
    { subject: "Physics", title: "Motion in a straight line" },
    { subject: "Mathematics", title: "Limits and derivatives" },
    { subject: "Chemistry", title: "Some basic concepts of chemistry" },
  ],
  "Class 11 (PCB)": [
    { subject: "Biology", title: "Cell: the unit of life" },
    { subject: "Chemistry", title: "Structure of the atom" },
    { subject: "Physics", title: "Units and measurement" },
  ],
  "Class 11 (Commerce)": [
    { subject: "Accountancy", title: "Recording of transactions" },
    { subject: "Economics", title: "Demand and its determinants" },
    { subject: "Business Studies", title: "Forms of business organisation" },
  ],
  "Class 11 (Humanities)": [
    { subject: "Political Science", title: "Constitution: why and how" },
    { subject: "History", title: "From the beginning of time" },
    { subject: "Geography", title: "India: location and physiography" },
  ],
  "Class 12 (PCM)": [
    { subject: "Mathematics", title: "Integrals" },
    { subject: "Physics", title: "Current electricity" },
    { subject: "Chemistry", title: "Electrochemistry" },
  ],
  "Class 12 (PCB)": [
    { subject: "Biology", title: "Molecular basis of inheritance" },
    { subject: "Chemistry", title: "Haloalkanes and haloarenes" },
    { subject: "Physics", title: "Ray optics" },
  ],
  "Class 12 (Commerce)": [
    { subject: "Economics", title: "Demand and elasticity" },
    { subject: "Accountancy", title: "Partnership accounts" },
    { subject: "Business Studies", title: "Principles of management" },
  ],
  "Class 12 (Humanities)": [
    { subject: "History", title: "Mahatma Gandhi and the national movement" },
    { subject: "Political Science", title: "Challenges of nation building" },
    { subject: "Geography", title: "Human geography: nature and scope" },
  ],
  "NEET-UG": [
    { subject: "Biology", title: "Human physiology: circulation" },
    { subject: "Physics", title: "Laws of motion" },
    { subject: "Chemistry", title: "Chemical bonding" },
  ],
};

export const DEMO: Record<string, ClassDemo> = {
  "Class 6": {
    doubts: [
      {
        q: "Why does the Moon change shape every night?",
        steps: [
          "The Sun always lights up one half of the Moon.",
          "As the Moon orbits Earth, we see different amounts of that lit half.",
          "The part we can see from Earth is called a phase.",
        ],
        answer: "Phases come from our viewing angle, not Earth's shadow.",
      },
      {
        q: "Solve: 48 ÷ 6 + 7",
        steps: [
          "Follow BODMAS, so divide before adding.",
          "48 ÷ 6 = 8.",
          "Now add: 8 + 7.",
        ],
        answer: "15",
      },
      {
        q: "What is a food chain?",
        steps: [
          "Every living thing needs energy from food.",
          "Energy passes from plants to herbivores to carnivores.",
          "This chain of who-eats-whom is a food chain.",
        ],
        answer: "A food chain shows how energy flows from one living thing to the next.",
      },
    ],
    lesson: {
      title: "Science · Food and where it comes from",
      tutor: "Curie",
      line: "Stuck mid-video? Ask Curie without leaving the lesson.",
    },
    quiz: [
      {
        q: "Which of these animals is a herbivore?",
        options: ["Lion", "Cow", "Eagle", "Snake"],
        correct: 1,
        why: "Herbivores eat only plants, and cows graze on grass.",
      },
      {
        q: "1/2 + 1/4 = ?",
        options: ["1/6", "2/6", "3/4", "1/8"],
        correct: 2,
        why: "Turn halves into quarters: 2/4 + 1/4 = 3/4.",
      },
    ],
  },

  "Class 7": {
    doubts: [
      {
        q: "What is photosynthesis?",
        steps: [
          "Leaves take in carbon dioxide from air and water from the roots.",
          "Chlorophyll traps sunlight inside the leaf.",
          "That light energy turns carbon dioxide and water into glucose and oxygen.",
        ],
        answer: "Plants make their own food using sunlight, water and carbon dioxide.",
      },
      {
        q: "Find the perimeter of a rectangle 8 cm long and 5 cm wide.",
        steps: [
          "Perimeter = 2 × (length + width).",
          "2 × (8 + 5) = 2 × 13.",
          "Multiply: 2 × 13 = 26.",
        ],
        answer: "26 cm",
      },
      {
        q: "Why do winds blow?",
        steps: [
          "The Sun heats land and sea unevenly.",
          "Warm air rises and cooler air rushes in to take its place.",
          "That moving air is what we feel as wind.",
        ],
        answer: "Winds blow because uneven heating keeps air moving.",
      },
    ],
    lesson: {
      title: "Maths · Perimeter and area",
      tutor: "Ramanujan",
      line: "Pause anywhere and ask Ramanujan to redo a step.",
    },
    quiz: [
      {
        q: "Which gas do plants take in for photosynthesis?",
        options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
        correct: 1,
        why: "Leaves absorb carbon dioxide through tiny pores called stomata.",
      },
      {
        q: "-3 + 7 = ?",
        options: ["-10", "-4", "4", "10"],
        correct: 2,
        why: "Start at -3 and move 7 steps to the right: you land on 4.",
      },
    ],
  },

  "Class 8": {
    doubts: [
      {
        q: "What is crop rotation?",
        steps: [
          "Growing the same crop again and again drains the same nutrients.",
          "Farmers alternate crops like cereals and legumes season by season.",
          "Legumes put nitrogen back into the soil while they grow.",
        ],
        answer: "Changing crops each season keeps the soil fertile naturally.",
      },
      {
        q: "Solve: 3x - 7 = 11",
        steps: [
          "Add 7 to both sides: 3x = 18.",
          "Divide both sides by 3.",
          "x = 6.",
        ],
        answer: "x = 6",
      },
      {
        q: "What were the causes of the Revolt of 1857?",
        steps: [
          "Sepoys resented the greased cartridges and unfair treatment.",
          "Rulers lost their states through the Doctrine of Lapse.",
          "Peasants and artisans suffered under heavy taxes.",
        ],
        answer: "Military, political and economic anger combined into one great revolt.",
      },
    ],
    lesson: {
      title: "Science · Crop production and management",
      tutor: "Curie",
      line: "Ask Curie a doubt right inside the chapter video.",
    },
    quiz: [
      {
        q: "Which gas do legumes help fix into the soil?",
        options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Methane"],
        correct: 1,
        why: "Rhizobium bacteria in legume roots fix nitrogen.",
      },
      {
        q: "(-2) × (-9) = ?",
        options: ["-18", "18", "-11", "11"],
        correct: 1,
        why: "A negative times a negative is always positive.",
      },
    ],
  },

  "Class 9": {
    doubts: [
      {
        q: "State Newton's first law in simple words.",
        steps: [
          "A body keeps doing what it is already doing unless a force acts on it.",
          "At rest it stays at rest; moving, it keeps moving the same way.",
          "This tendency to resist change is called inertia.",
        ],
        answer: "No net force means no change in motion.",
      },
      {
        q: "Factorise: x² + 5x + 6",
        steps: [
          "Find two numbers that multiply to 6 and add to 5.",
          "2 and 3 work.",
          "Split and group the terms.",
        ],
        answer: "(x + 2)(x + 3)",
      },
      {
        q: "What is the difference between weather and climate?",
        steps: [
          "Weather is the day-to-day state of the atmosphere.",
          "Climate is the average pattern measured over about 30 years.",
          "Weather changes fast; climate changes slowly.",
        ],
        answer: "Weather is today; climate is the long-term trend.",
      },
    ],
    lesson: {
      title: "Maths · Polynomials",
      tutor: "Ramanujan",
      line: "Rewind any step and ask Ramanujan why it works.",
    },
    quiz: [
      {
        q: "What is the SI unit of force?",
        options: ["Joule", "Newton", "Pascal", "Watt"],
        correct: 1,
        why: "Force is measured in newtons (N).",
      },
      {
        q: "x² - 9 factorised is?",
        options: ["(x - 3)(x - 3)", "(x + 3)(x - 3)", "(x + 9)(x - 1)", "(x - 9)(x + 1)"],
        correct: 1,
        why: "Difference of squares: a² - b² = (a + b)(a - b).",
      },
    ],
  },

  "Class 10": {
    doubts: [
      {
        q: "Solve x² - 5x + 6 = 0",
        steps: [
          "Find two numbers that multiply to 6 and add to -5: they are -2 and -3.",
          "Factorise: (x - 2)(x - 3) = 0.",
          "Set each bracket to zero.",
        ],
        answer: "x = 2 or x = 3",
      },
      {
        q: "A ladder leaning at 60° reaches 6 m up a wall. How long is it?",
        steps: [
          "sin 60° = height ÷ ladder length.",
          "Ladder = 6 ÷ sin 60° = 6 ÷ (√3/2).",
          "Simplify: 12 ÷ √3 = 4√3 ≈ 6.93.",
        ],
        answer: "About 6.9 m",
      },
      {
        q: "What is a reflex action?",
        steps: [
          "Danger needs a response faster than thinking.",
          "The signal loops through the spinal cord instead of the brain.",
          "The muscle reacts before you even feel the pain.",
        ],
        answer: "A reflex is a rapid, automatic response through the spinal cord.",
      },
    ],
    lesson: {
      title: "Maths · Trigonometry: heights and distances",
      tutor: "Ramanujan",
      line: "Stuck on a step? Ramanujan reworks it with you.",
    },
    quiz: [
      {
        q: "sin 30° = ?",
        options: ["1", "√3/2", "1/2", "0"],
        correct: 2,
        why: "From the standard table, sin 30° = 1/2.",
      },
      {
        q: "Which mirror is used as a rear-view mirror?",
        options: ["Concave", "Convex", "Plane", "Parabolic"],
        correct: 1,
        why: "Convex mirrors give a wide, erect, smaller view of traffic.",
      },
    ],
  },

  "Class 11 (PCM)": {
    doubts: [
      {
        q: "Differentiate y = x² from first principles.",
        steps: [
          "dy/dx is the limit of [f(x + h) - f(x)] ÷ h as h tends to 0.",
          "Expand: [(x + h)² - x²] ÷ h = (2xh + h²) ÷ h.",
          "Cancel h, then let h go to 0.",
        ],
        answer: "dy/dx = 2x",
      },
      {
        q: "A ball is thrown up at 20 m/s. How high does it rise? (g = 10)",
        steps: [
          "At the highest point the velocity v = 0.",
          "Use v² = u² - 2gh.",
          "0 = 400 - 20h, so h = 20.",
        ],
        answer: "20 m",
      },
      {
        q: "What is a unit vector?",
        steps: [
          "A vector has both size and direction.",
          "Divide any vector by its own magnitude.",
          "What remains has magnitude exactly 1, keeping only direction.",
        ],
        answer: "A direction-only vector of length 1.",
      },
    ],
    lesson: {
      title: "Physics · Motion in a straight line",
      tutor: "Ramanujan",
      line: "Ask Ramanujan to slow any derivation down.",
    },
    quiz: [
      {
        q: "d(sin x)/dx = ?",
        options: ["cos x", "-cos x", "-sin x", "tan x"],
        correct: 0,
        why: "The derivative of sine is cosine.",
      },
      {
        q: "The dimensional formula of force is?",
        options: ["MLT⁻¹", "MLT⁻²", "ML²T⁻²", "MT⁻²"],
        correct: 1,
        why: "F = ma gives [M][L][T⁻²].",
      },
    ],
  },

  "Class 11 (PCB)": {
    doubts: [
      {
        q: "Why are mitochondria called the powerhouse of the cell?",
        steps: [
          "Every cell activity runs on ATP energy.",
          "Mitochondria break down glucose with oxygen during respiration.",
          "That process releases the ATP that powers the cell.",
        ],
        answer: "They produce the ATP that fuels everything the cell does.",
      },
      {
        q: "How many molecules are in 18 g of water?",
        steps: [
          "The molar mass of H₂O is 18 g, so 18 g is exactly 1 mole.",
          "One mole contains Avogadro's number of molecules.",
          "That is 6.022 × 10²³.",
        ],
        answer: "6.022 × 10²³ molecules",
      },
      {
        q: "What is the difference between diffusion and osmosis?",
        steps: [
          "Diffusion: particles spread from high to low concentration.",
          "Osmosis: only water moves, across a semi-permeable membrane.",
          "So osmosis is a special, water-only case of diffusion.",
        ],
        answer: "Osmosis is water-only diffusion through a membrane.",
      },
    ],
    lesson: {
      title: "Biology · Cell: the unit of life",
      tutor: "Curie",
      line: "Curie answers inside the lecture, the video waits for you.",
    },
    quiz: [
      {
        q: "The site of photosynthesis in a cell is the?",
        options: ["Mitochondrion", "Chloroplast", "Nucleus", "Ribosome"],
        correct: 1,
        why: "Chloroplasts hold the chlorophyll that traps light.",
      },
      {
        q: "Avogadro's number is about?",
        options: ["6.022 × 10²³", "3.142", "9.8", "1.6 × 10⁻¹⁹"],
        correct: 0,
        why: "One mole of anything contains 6.022 × 10²³ particles.",
      },
    ],
  },

  "Class 11 (Commerce)": {
    doubts: [
      {
        q: "What is the double entry system?",
        steps: [
          "Every transaction touches at least two accounts.",
          "One account is debited and another credited with equal amounts.",
          "So the books always balance: assets = liabilities + capital.",
        ],
        answer: "Each entry has an equal debit and an equal credit.",
      },
      {
        q: "Define opportunity cost with an example.",
        steps: [
          "Choosing one option means giving up the next best option.",
          "The value of that skipped option is your real cost.",
          "Studying tonight instead of a movie: the movie is the opportunity cost.",
        ],
        answer: "The next-best alternative you give up.",
      },
      {
        q: "What is GST in simple words?",
        steps: [
          "Many older indirect taxes were merged into one.",
          "Tax is charged at every stage on the value added.",
          "Businesses pass it along; the final consumer bears it.",
        ],
        answer: "One nationwide tax on goods and services.",
      },
    ],
    lesson: {
      title: "Accountancy · Recording transactions",
      tutor: "Gargi",
      line: "Confused by an entry? Ask Gargi right there.",
    },
    quiz: [
      {
        q: "Assets = Liabilities + ?",
        options: ["Revenue", "Capital", "Expenses", "Stock"],
        correct: 1,
        why: "That is the basic accounting equation.",
      },
      {
        q: "GST is which type of tax?",
        options: ["Direct", "Indirect", "Wealth", "Income"],
        correct: 1,
        why: "It is collected through sellers, so it is indirect.",
      },
    ],
  },

  "Class 11 (Humanities)": {
    doubts: [
      {
        q: "What does the Preamble promise?",
        steps: [
          "It opens with We, the People of India.",
          "It promises justice, liberty, equality and fraternity.",
          "It declares India a sovereign, socialist, secular, democratic republic.",
        ],
        answer: "The Constitution's goals, captured in one paragraph.",
      },
      {
        q: "Fundamental Rights vs Directive Principles?",
        steps: [
          "Fundamental Rights are enforceable in court.",
          "Directive Principles guide governments but courts cannot enforce them.",
          "Rights protect citizens; principles steer policy.",
        ],
        answer: "Rights are justiciable; principles are guidance.",
      },
      {
        q: "Why is 1991 important for the Indian economy?",
        steps: [
          "India faced a severe foreign exchange crisis.",
          "Reforms opened the market: liberalisation, privatisation, globalisation.",
          "Licence raj shrank and trade opened up.",
        ],
        answer: "1991 began India's economic liberalisation.",
      },
    ],
    lesson: {
      title: "Political Science · Constitution: why and how",
      tutor: "Gargi",
      line: "Ask Gargi to unpack any article, mid-lecture.",
    },
    quiz: [
      {
        q: "Fundamental Rights are enforceable by?",
        options: ["Parliament", "Courts", "Police", "President"],
        correct: 1,
        why: "Article 32 lets you move the courts directly.",
      },
      {
        q: "The LPG reforms began in?",
        options: ["1981", "1991", "2001", "1971"],
        correct: 1,
        why: "The 1991 crisis triggered liberalisation.",
      },
    ],
  },

  "Class 12 (PCM)": {
    doubts: [
      {
        q: "Integrate: ∫ 2x dx",
        steps: [
          "Raise the power of x by one: x becomes x².",
          "Divide by the new power: 2x² ÷ 2.",
          "Simplify and add the constant of integration.",
        ],
        answer: "x² + C",
      },
      {
        q: "State Ohm's law and where it fails.",
        steps: [
          "V = IR at constant temperature.",
          "Current is directly proportional to voltage.",
          "It fails for diodes and other non-ohmic devices.",
        ],
        answer: "V = IR, valid only for ohmic conductors.",
      },
      {
        q: "What is a differential equation?",
        steps: [
          "It links a function with its own derivatives.",
          "Its order is the highest derivative present.",
          "Solving it means recovering the original function.",
        ],
        answer: "An equation that contains derivatives.",
      },
    ],
    lesson: {
      title: "Maths · Integrals",
      tutor: "Ramanujan",
      line: "Each integral, reworked step by step on request.",
    },
    quiz: [
      {
        q: "∫ cos x dx = ?",
        options: ["sin x + C", "-sin x + C", "cos x + C", "tan x + C"],
        correct: 0,
        why: "Since d(sin x)/dx = cos x, the integral of cos is sin.",
      },
      {
        q: "The unit of resistance is?",
        options: ["Volt", "Ampere", "Ohm", "Farad"],
        correct: 2,
        why: "Resistance is measured in ohms (Ω).",
      },
    ],
  },

  "Class 12 (PCB)": {
    doubts: [
      {
        q: "Why is DNA replication called semi-conservative?",
        steps: [
          "The double helix unzips into two single strands.",
          "Each old strand acts as a template for a new partner.",
          "Every new DNA keeps one old strand and one new strand.",
        ],
        answer: "Each copy conserves exactly half of the original.",
      },
      {
        q: "SN1 vs SN2 in one line each?",
        steps: [
          "SN1: two steps, a carbocation forms first, rate depends on one species.",
          "SN2: one step, backside attack, rate depends on both species.",
          "Tertiary halides favour SN1; primary halides favour SN2.",
        ],
        answer: "SN1 is two-step via carbocation; SN2 is one-step with inversion.",
      },
      {
        q: "Define Mendel's law of segregation.",
        steps: [
          "Every trait is controlled by a pair of alleles.",
          "The pair separates when gametes form.",
          "Each gamete carries only one allele of the pair.",
        ],
        answer: "Allele pairs split, and each gamete receives one.",
      },
    ],
    lesson: {
      title: "Biology · Molecular basis of inheritance",
      tutor: "Curie",
      line: "Ask Curie to redraw any diagram, mid-video.",
    },
    quiz: [
      {
        q: "DNA replication is?",
        options: ["Conservative", "Semi-conservative", "Dispersive", "Random"],
        correct: 1,
        why: "Meselson and Stahl's experiment proved it.",
      },
      {
        q: "The functional group in alcohols is?",
        options: ["-COOH", "-OH", "-CHO", "-NH₂"],
        correct: 1,
        why: "Alcohols carry the hydroxyl (-OH) group.",
      },
    ],
  },

  "Class 12 (Commerce)": {
    doubts: [
      {
        q: "What is working capital?",
        steps: [
          "Current assets fund the day-to-day running of a business.",
          "Subtract current liabilities from current assets.",
          "A positive result means smooth daily operations.",
        ],
        answer: "Working capital = current assets - current liabilities.",
      },
      {
        q: "Define elasticity of demand.",
        steps: [
          "It measures how strongly demand reacts to price.",
          "Elasticity = % change in quantity ÷ % change in price.",
          "Above 1 it is elastic; below 1 it is inelastic.",
        ],
        answer: "Demand's sensitivity to a change in price.",
      },
      {
        q: "Gross profit vs net profit?",
        steps: [
          "Gross profit = sales minus the cost of goods sold.",
          "Net profit = gross profit minus all indirect expenses.",
          "Net is what finally belongs to the owner.",
        ],
        answer: "Gross is the trading margin; net is the final profit.",
      },
    ],
    lesson: {
      title: "Economics · Demand and elasticity",
      tutor: "Gargi",
      line: "Gargi explains every curve as the lecture plays.",
    },
    quiz: [
      {
        q: "Working capital = current assets minus?",
        options: ["Fixed assets", "Current liabilities", "Capital", "Debtors"],
        correct: 1,
        why: "That difference funds daily operations.",
      },
      {
        q: "If elasticity is greater than 1, demand is?",
        options: ["Elastic", "Inelastic", "Unitary", "Zero"],
        correct: 0,
        why: "Quantity responds faster than the price change.",
      },
    ],
  },

  "Class 12 (Humanities)": {
    doubts: [
      {
        q: "What is judicial review?",
        steps: [
          "Courts can examine laws and executive orders.",
          "Anything that violates the Constitution is struck down.",
          "This keeps Parliament within constitutional limits.",
        ],
        answer: "Courts checking laws against the Constitution.",
      },
      {
        q: "Causes of the Non-Cooperation Movement?",
        steps: [
          "Anger after Jallianwala Bagh and the Rowlatt Act.",
          "The Khilafat issue united Hindus and Muslims.",
          "Gandhi called for boycotting British goods, schools and courts.",
        ],
        answer: "Repression, Khilafat and Gandhi's call combined.",
      },
      {
        q: "What is globalisation in one line?",
        steps: [
          "Economies link up through trade and investment.",
          "Goods, services, capital and people move across borders.",
          "Local markets join one connected world market.",
        ],
        answer: "The world economy becoming one connected market.",
      },
    ],
    lesson: {
      title: "History · Mahatma Gandhi and the national movement",
      tutor: "Gargi",
      line: "Pause the lecture and ask Gargi for the context.",
    },
    quiz: [
      {
        q: "Judicial review power mainly lies with?",
        options: ["Parliament", "Supreme Court", "President", "Cabinet"],
        correct: 1,
        why: "The higher judiciary guards the Constitution.",
      },
      {
        q: "The Non-Cooperation Movement began in?",
        options: ["1905", "1920", "1930", "1942"],
        correct: 1,
        why: "Gandhi launched it in 1920.",
      },
    ],
  },

  "NEET-UG": {
    doubts: [
      {
        q: "Why is the SA node called the pacemaker?",
        steps: [
          "The SA node sits in the wall of the right atrium.",
          "It fires electrical impulses on its own, about 70 times a minute.",
          "Its rhythm spreads through the heart and sets the beat.",
        ],
        answer: "It initiates every heartbeat, so it is the pacemaker.",
      },
      {
        q: "Why is projectile range maximum at 45°?",
        steps: [
          "Range = u² sin 2θ ÷ g.",
          "sin 2θ is maximum when 2θ = 90°.",
          "So θ = 45° gives the maximum range.",
        ],
        answer: "Because sin 2θ peaks at 45°.",
      },
      {
        q: "Why is fluorine the strongest oxidising agent?",
        steps: [
          "It has the smallest size and highest electronegativity.",
          "F⁻ has a very high hydration enthalpy.",
          "The weak F-F bond breaks easily, so it reacts eagerly.",
        ],
        answer: "Size, electronegativity and hydration energy together make fluorine unbeatable.",
      },
    ],
    lesson: {
      title: "Biology · Human physiology: circulation",
      tutor: "Curie",
      line: "Ask Curie mid-lecture, the video waits for you.",
    },
    quiz: [
      {
        q: "The pacemaker of the human heart is the?",
        options: ["AV node", "SA node", "Purkinje fibres", "Bundle of His"],
        correct: 1,
        why: "The sinoatrial node sets the heart's rhythm.",
      },
      {
        q: "At what angle is projectile range maximum?",
        options: ["30°", "45°", "60°", "90°"],
        correct: 1,
        why: "sin 2θ = 1 when θ = 45°.",
      },
    ],
  },
};
