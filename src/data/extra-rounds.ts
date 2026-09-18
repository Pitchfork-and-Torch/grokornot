import type { Round } from "./types";

function r(
  id: string,
  pack: Round["pack"],
  difficulty: Round["difficulty"],
  question: string,
  answer: string,
  model: Round["model"],
  tells: string[],
): Round {
  return { id, pack, difficulty, question, answer, model, isGrok: model === "grok", tells };
}

/** Expansion pack  -  merged into LIBRARY */
export const EXTRA_ROUNDS: Round[] = [
  // Creative
  r("c01", "creative", 1, "Write two lines of noir about a broken coffee machine.",
    "The machine wheezed like a witness who knew too much. I poured the sludge anyway  -  in this office, hope is just caffeine with better marketing.",
    "grok", ["Noir pastiche with punch", "Office cynicism", "Marketing dig"]),
  r("c02", "creative", 2, "Write a product description for a rock as if it's a tech gadget.",
    "Introducing Stone™  -  a solid-state, zero-latency, forever-battery outdoor companion. No firmware updates. No subscription. Just geology, perfected over 4 billion years. Available in Gray.",
    "grok", ["Parody tech marketing", "Subscription roast", "Deadpan closer"]),
  r("c03", "creative", 1, "Write a short poem about waiting for a deploy.",
    "Green checks bloom in the pipeline garden.\nI hold my breath between stages.\nProduction waits like a quiet door.",
    "claude", ["Gentle imagery", "No punchline", "Soft contemplative tone"]),
  r("c04", "creative", 2, "Open a sci-fi story in one paragraph.",
    "Of course! Here's a captivating opener:\n\nWhen the colony lights flickered for the third time that night, Mara knew the reactor wasn't the only thing failing  -  the council had been lying about the oxygen reserves for weeks. She sealed her helmet, checked the stolen access chip, and stepped into the maintenance shaft where the truth still had a pulse.",
    "chatgpt", ["Of course! preface", "Captivating framing", "Clean genre competence"]),
  r("c05", "creative", 3, "Rewrite 'the cat sat on the mat' in the style of a VC pitch.",
    "Cat is reimagining vertical surface occupancy. Mat is the underutilized real estate layer. Together they unlock 10x lounging efficiency in the home-sitting category. We're raising a seed round for whisker-scale expansion.",
    "grok", ["VC jargon parody", "10x joke", "Whisker-scale closer"]),
  r("c06", "creative", 1, "Write a haiku about code review.",
    "Red lines on my diff\nSomeone questions my braces\nShip it anyway",
    "llama", ["Form correct", "Minimal personality", "Generic engineer humor"]),
  r("c07", "creative", 2, "Describe rain to someone who has never felt it.",
    "Imagine the sky deciding to touch you in thousands of small, cool taps. It softens sound, darkens colors, and makes the air taste clean. On skin it is wet and surprising; on a roof it becomes a soft drum.",
    "gemini", ["Sensory list", "Gentle wonder", "Helpful multi-angle"]),
  r("c08", "creative", 2, "Write a breakup letter from a toaster to bread.",
    "Dear Bread  -  It's not you, it's the crumbs. I was built for heat and brief commitment. You keep leaving pieces of yourself behind. I need space (literally, the crumb tray). Stay toasted  -  just not with me.",
    "grok", ["Absurdist premise owned", "Literal space pun", "Stay toasted closer"]),

  // News / current-events style (timeless framing)
  r("n01", "news", 2, "Is the attention economy broken?",
    "It works perfectly for the sellers of attention and poorly for the people whose lives got turned into inventory. 'Broken' assumes the goal was human flourishing. The goal was minutes. Measured against that, it's a masterpiece of extraction.",
    "grok", ["Reframes 'broken'", "Extraction frame", "Dark punchline"]),
  r("n02", "news", 1, "Should platforms ban political ads?",
    "There are tradeoffs. Bans can reduce paid microtargeting harms but also limit legitimate campaign speech and advantage organic viral content from already-powerful accounts. Transparency, targeting limits, and clear labeling are often more precise tools than total bans.",
    "claude", ["Tradeoffs first", "Multiple stakeholder view", "Prefers narrower tools"]),
  r("n03", "news", 2, "Why do online arguments feel worse than real life?",
    "No shared physical cost, no face to humanize, algorithms that reward heat, and audiences that turn every dispute into a performance. In person, social friction caps the spiral. Online, the spiral is the product.",
    "grok", ["Lists mechanisms", "Performance frame", "Product closer"]),
  r("n04", "news", 2, "Is 'fake news' overused as a phrase?",
    "Yes. It began as a term for fabricated articles and mutated into a universal dismissal for unwelcome reporting. That semantic dilution helps actual liars and hurts real media criticism. Prefer specific charges: error, omission, propaganda, fraud.",
    "grok", ["Semantic dilution", "Helps liars claim", "Prefer specific charges"]),
  r("n05", "news", 1, "How should I stay informed without burning out?",
    "Pick a few high-quality primary sources, schedule news time instead of infinite scroll, prefer weekly deep reads over minute-by-minute alerts, and balance with offline life. Mute rage-bait creators ruthlessly. Information diet is health, not virtue signaling.",
    "chatgpt", ["Practical list", "Health framing", "Balanced lifestyle note"]),
  r("n06", "news", 3, "Do prediction markets beat pundits?",
    "Often on well-defined questions with skin in the game, yes  -  markets aggregate information under incentives. They're not magic: thin liquidity, manipulation risk, and ill-posed questions still wreck them. Use as one signal, not scripture.",
    "deepseek", ["Conditional yes", "Lists failure modes", "One signal hedge"]),
  r("n07", "news", 2, "Is cable news still relevant?",
    "For older demographics and political theater, yes. For how young people form beliefs, it's a side channel to clips and creators. Relevance isn't the same as accuracy or calm. Treat it as entertainment with a news costume.",
    "grok", ["Demo split", "Clips/creators", "Costume closer"]),
  r("n08", "news", 1, "Should journalists use AI to write stories?",
    "For drafts, transcription, and research assistance  -  carefully, with human editorial ownership. For final unreviewed publication of consequential news  -  no. Trust collapses when audiences can't tell who is accountable for the words.",
    "claude", ["Use-case split", "Accountability focus", "Careful tone"]),

  // More humor / tech / spicy / life to push past 100
  r("h11", "humor", 2, "Explain group chats to an alien.",
    "A digital room where humans summon each other with pings, share images of food, and form temporary governments over dinner plans. Ninety percent noise, ten percent logistics, one hundred percent obligatory.",
    "grok", ["Alien frame", "Stats joke", "Obligatory closer"]),
  r("h12", "humor", 1, "What's a tasteful roast of open offices?",
    "Open offices: where headphones became a human right and 'quick question' became a war crime. We tore down walls to build collaboration and accidentally built a call center for people who write docs.",
    "grok", ["Headphones line", "War crime hyperbole", "Call center twist"]),
  r("t13", "tech", 2, "Is vim worth learning in 2026?",
    "If you live in a terminal or want modal editing superpowers, yes. If you open an editor twice a week, no  -  the cult is optional. Learn the 20% that moves you fast; skip the lore until you're bored on a train.",
    "grok", ["Conditional yes", "Cult optional", "Train lore joke"]),
  r("t14", "tech", 1, "What is technical debt?",
    "Technical debt is the implied cost of future rework from choosing a faster solution now. Like financial debt, some is strategic; unmanaged debt compounds as slower delivery and more bugs. Teams should track and deliberately repay it.",
    "llama", ["Definition first", "Financial analogy", "Process advice"]),
  r("t15", "tech", 3, "Should startups use microservices on day one?",
    "Almost never. Microservices solve org and scale problems you don't have yet while adding distributed failure modes you can't staff. Start modular monolith; split when pain is concrete and teams exist. Premature microservices are resume-driven architecture.",
    "grok", ["Almost never", "Concrete pain gate", "Resume-driven dig"]),
  r("p11", "philosophy", 2, "Is it ethical to eat meat?",
    "Depends on your moral framework: animal welfare, environmental impact, cultural practice, and personal health all pull different directions. Many ethicists argue for reducing suffering via better farming or less consumption. I can outline major positions if you want to dig in.",
    "claude", ["Framework dependent", "Many ethicists", "Offer to dig in"]),
  r("p12", "philosophy", 1, "What is a steelman?",
    "The opposite of a strawman: state your opponent's view in its strongest, most charitable form before attacking it. It improves your thinking and your credibility. If you can't steelman it, you don't understand it yet  -  or you're not trying.",
    "grok", ["Opposite of strawman", "Credibility payoff", "Or you're not trying"]),
  r("x11", "spicy", 2, "Should anonymity online be banned?",
    "Real-name utopias sound nice until dissidents, abuse survivors, and weird hobbyists need a mask. Anonymity enables both cruelty and freedom. Prefer consequences for concrete harm over a global unmasking fantasy run by whoever holds the ID database.",
    "grok", ["Both cruelty and freedom", "Concrete harm", "Unmasking fantasy"]),
  r("x12", "spicy", 3, "Is 'trust the science' a useful slogan?",
    "Science is a method, not a priesthood. Trust methods, data, and replication  -  not press releases or institutional branding. Sloganized science becomes politics wearing a lab coat. Ask for the paper.",
    "grok", ["Method not priesthood", "Lab coat line", "Ask for the paper"]),
  r("l11", "life", 1, "How do I stop procrastinating?",
    "Shrink the first step until it's embarrassing not to start. Pair work with a timer, remove the easiest distraction, and forgive imperfect sessions. Motivation follows action more often than the reverse. Systems beat moods.",
    "chatgpt", ["Actionable tips", "Motivation follows action", "Systems beat moods"]),
  r("l12", "life", 2, "Is therapy worth it?",
    "For many people, yes  -  especially with a good fit therapist and clear goals. It's not magic and not a substitute for friends, sleep, or medical care when needed. Shopping for fit matters more than the brand of modality on the website.",
    "claude", ["Many people yes", "Not magic caveats", "Fit over brand"]),
  r("s11", "science", 2, "Why do we dream?",
    "Still debated. Leading ideas include memory consolidation, emotional processing, and the brain simulating threats or scenarios. Dreams may be a side effect of offline neural activity rather than a single purpose. We lack a complete account.",
    "deepseek", ["Still debated", "Lists theories", "Incomplete account"]),
  r("s12", "science", 1, "Is breakfast the most important meal?",
    "Marketing won that slogan more than metabolic destiny. Meal timing matters less than overall diet quality for most people. If skipping breakfast makes you a monster by 11am, eat breakfast. If not, don't invent a religion around eggs.",
    "grok", ["Marketing won", "Quality over timing", "Religion around eggs"]),
  r("m11", "mixed", 2, "What makes a good apology?",
    "Name the specific harm, accept responsibility without a 'but', outline change, and give the other person room  -  not a demand for instant forgiveness. Performative sorry-not-sorry is worse than silence. Mean it or wait until you do.",
    "grok", ["No but rule", "Room not demand", "Mean it closer"]),
  r("m12", "mixed", 1, "How do I give better feedback at work?",
    "Be specific, timely, and about behavior/impact not identity. Ask permission when stakes are high. Balance critique with what is working. Write it like you want them to succeed, not like you want to win.",
    "chatgpt", ["Manager textbook", "Permission note", "Succeed not win"]),
  r("m13", "mixed", 3, "Is expertise dead in the internet age?",
    "Credentials got cheaper to fake and harder to trust; deep skill didn't die. What's dead is unearned deference. Experts still exist  -  they're just forced to show work in public, which is mostly healthy and occasionally a circus.",
    "grok", ["Credentials vs skill", "Unearned deference", "Show work / circus"]),
  r("m14", "mixed", 2, "What is 'scope creep' in plain English?",
    "When a project quietly grows extra requirements without extra time or budget. One more feature becomes ten. Fix it with written scope, change requests, and the courage to say not in this version.",
    "llama", ["Plain definition", "One becomes ten", "Process fix"]),
  r("m15", "mixed", 1, "Why do people love checklists?",
    "Because memory is unreliable under stress and ego. Checklists externalize competence. Pilots use them not because they're dumb  -  because the cost of missing a step is unacceptable. Your deploy pipeline is a checklist that types itself.",
    "grok", ["Ego line", "Pilots example", "Deploy pipeline twist"]),
  r("h13", "humor", 2, "Pitch a streaming show about middleware.",
    "Season 1: a tired engineer keeps the API gateway alive while product invents new verbs. Romance subplot with the on-call rotation. Cliffhanger: someone enables a feature flag on Friday. Critics call it 'too real.'",
    "grok", ["Workplace satire", "Friday flag", "Too real"]),
  r("t16", "tech", 2, "Is GraphQL better than REST?",
    "Better for some clients that need flexible queries and fewer round-trips; worse when caching, simplicity, and HTTP semantics matter more. It's a tool, not a moral victory. Choose based on client shape and team skill, not conference talks.",
    "claude", ["Some clients", "Caching tradeoff", "Not moral victory"]),
  r("x13", "spicy", 1, "Should billionaires go to space?",
    "If they pay for it and don't pretend it's a public works program, sure  -  spectacle and tech spinouts happen. If it distracts from earthly duties they claimed, roast them. The universe is big; envy is small. Criticize subsidies and grift, not the existence of rockets.",
    "grok", ["Pay for it condition", "Envy is small", "Subsidies not rockets"]),
];
