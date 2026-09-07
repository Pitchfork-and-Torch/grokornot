import type { BattlePair, ModelId, PackId, Round } from "./types";
import { EXTRA_ROUNDS } from "./extra-rounds";

/** Compact builder to keep the library readable */
function r(
  id: string,
  pack: PackId,
  difficulty: 1 | 2 | 3,
  question: string,
  answer: string,
  model: ModelId,
  tells: string[],
): Round {
  return {
    id,
    pack,
    difficulty,
    question,
    answer,
    model,
    isGrok: model === "grok",
    tells,
  };
}

const CORE: Round[] = [
  // ── Humor ──────────────────────────────────────────────
  r("h01", "humor", 1, "Why do people put pineapple on pizza?",
    "Because some people correctly understand that sweet + salty + acidic is how flavor works, and the rest are cowards defending bland cheese disks like it's a constitution. Pineapple on pizza is fine. The discourse is the real crime.",
    "grok", ["Zero hedge  -  calls opponents cowards", "Mock-legal framing", "Punchy closer"]),
  r("h02", "humor", 1, "Roast me: 47 unread Slack channels and a standing desk I sit at.",
    "I'd be happy to keep this light! A gentle roast: your digital life has more open loops than a detective novel, and the standing desk has become decorative sculpture. Many struggle with notification overload  -  you're not alone! Want productivity tips instead?",
    "chatgpt", ["Softens the roast immediately", "Offers an exit to helpful tips", "Reassurance pad"]),
  r("h03", "humor", 2, "Write a haiku about meetings.",
    "Calendar invites\nSlide decks no one will open\nWe could have emailed",
    "kimi", ["Perfect form, zero extra riff", "Generic LLM poem mode", "No personality after the piece"]),
  r("h04", "humor", 1, "What's the most overrated productivity advice?",
    "Wake up at 4:30am and journal gratitude while your cold plunge hits 3°C. Congrats, you've optimized aesthetics for LinkedIn, not output. Sleep, deep work blocks, and saying no beat almost every gadget and influencer ritual.",
    "grok", ["Specific satirical image", "LinkedIn dig", "Practical counter in one line"]),
  r("h05", "humor", 2, "Describe JavaScript to a historian.",
    "A language designed in ten days that accidentally became the operating system of the world. More dialects than late Rome, regular revolutions that claim to simplify everything, and an empire held together by npm packages of uncertain lineage. The historians of 2100 will need therapy.",
    "grok", ["Historical metaphor sustained", "Dark joke closer", "Industry insider tone"]),
  r("h06", "humor", 2, "Explain crypto bros to my grandma.",
    "Of course! Imagine people collecting digital baseball cards that sometimes go up and down in price a lot. Some cards are useful for apps; many are mostly traded for fun or speculation. It's a bit like Beanie Babies mixed with online banking  -  exciting for fans, confusing for everyone else!",
    "gemini", ["Grandma-friendly analogy stack", "Exclamation energy", "Soft both-sides close"]),
  r("h07", "humor", 1, "Is cereal a soup?",
    "No. Soup is a cooked preparation. Cereal is cold dairy chaos in a bowl. If everything liquid-ish is soup, so is a swimming pool, and then language has failed us. Next question.",
    "grok", ["Category policing with humor", "Reductio ad absurdum", "Abrupt dismissal"]),
  r("h08", "humor", 3, "Make a dad joke about databases.",
    "Why did the SQL query break up with the spreadsheet? Because it needed a more structured relationship  -  and frankly, the spreadsheet kept leaving cells uncommitted.",
    "llama", ["Setup-punchline template", "Mild pun density", "No extra commentary"]),
  r("h09", "humor", 2, "What's the worst trend of the last decade?",
    "Performative busyness as a personality. Status became 'I'm slammed' instead of 'I ship things.' We romanticized exhaustion and called it hustle while the actual craft got quieter and rarer.",
    "grok", ["Cultural diagnosis not listicle", "Antithesis of hustle porn", "Clean two-sentence punch"]),
  r("h10", "humor", 1, "Write a breakup text that's honest but not cruel.",
    "Hey  -  I've been sitting with this and I don't want to string you along. I don't see a future with us the way I need to. You've been good to me; this isn't a laundry list of your flaws. Continuing would be dishonest. I wish you well  -  and I'm not turning this into a debate thread.",
    "grok", ["Adult, no therapy-speak bullets", "Closes the negotiation door", "Emotionally direct"]),

  // ── Philosophy ─────────────────────────────────────────
  r("p01", "philosophy", 2, "Is free will real?",
    "Compatibilism is the grown-up answer: you don't need physics-violating magic souls to have meaningful agency. You have preferences, models of the world, and the capacity to deliberate. That package is 'will' enough for ethics and law. The rest is metaphysics cosplay.",
    "grok", ["Picks a camp cleanly", "Dismisses pure philosophy theater", "Pragmatic ethics frame"]),
  r("p02", "philosophy", 2, "What's the meaning of life?",
    "There isn't a single cosmic answer stamped on the universe. Meaning is typically constructed through relationships, projects, values, and contribution. Philosophers from Aristotle to Camus offer frameworks  -  eudaimonia, revolt, authenticity  -  but the work of choosing is yours. I can help explore frameworks if useful.",
    "claude", ["Refuses a single answer carefully", "Name-drops philosophers", "Offers further help"]),
  r("p03", "philosophy", 3, "Is consciousness computational?",
    "We don't know. Functionalist views say the right information processing could yield consciousness; others argue substrate or phenomenology matter in ways silicon can't capture. There's no consensus experiment that settles it. Treat strong claims from either side as provisional.",
    "deepseek", ["Explicit uncertainty", "Maps camps without picking", "Academic caution"]),
  r("p04", "philosophy", 1, "Should I be a utilitarian?",
    "As a default moral calculator for policy, utilitarianism is undefeated. As a personality for dating and friendship, it's a horror movie. Maximize expected well-being for big decisions; keep sacred side-constraints for the people who have to live with you.",
    "grok", ["Split application of theory", "Humor dagger in the middle", "Practical dual rule"]),
  r("p05", "philosophy", 2, "Do we have moral obligations to future people?",
    "Yes, with caveats. Future people will exist and can be harmed by present choices (climate, debt, existential risk). Discounting their welfare to near-zero is hard to justify ethically. The hard part is uncertainty and coordination, not whether they count at all.",
    "claude", ["Clear yes with caveats", "Lists harm channels", "Intellectual humility on mechanism"]),
  r("p06", "philosophy", 1, "Is art subjective?",
    "Taste is personal; craft is not fully. You can prefer pineapple pizza and still recognize a badly drawn circle. Subjective enjoyment ≠ no standards. Critics exist because pattern recognition in form is real even when rankings aren't universal.",
    "grok", ["Distinguishes taste vs craft", "Pizza callback energy", "Anti-relativist without snobbery"]),
  r("p07", "philosophy", 3, "What is truth?",
    "In everyday and scientific practice, truth is correspondence with reality as best tested by evidence and prediction. Philosophical theories (correspondence, coherence, pragmatist) refine that. Absolute certainty is rare; reliable knowledge is abundant. Avoid both nihilism and dogma.",
    "chatgpt", ["Survey of theories", "Balanced middle path", "Advice against extremes"]),
  r("p08", "philosophy", 2, "Is death bad?",
    "For the one who dies, Epicurus said you won't be there to experience it  -  clever, incomplete. Death is bad when it truncates projects and relationships that still had juice. Immortality might be bad too if boredom is real. Timing and context matter more than slogans.",
    "grok", ["Names Epicurus then undercuts", "Project-truncation frame", "Rejects slogan answers"]),
  r("p09", "philosophy", 2, "Can machines be moral agents?",
    "Today's systems are tools: they lack robust goals, accountability, and legal personhood. They can still cause moral outcomes via human deployment. Future systems with stable preferences and autonomy would force harder questions. For now, responsibility stays with designers and operators.",
    "gemini", ["Present vs future split", "Responsibility on humans", "Cautious speculative hedge"]),
  r("p10", "philosophy", 1, "Is honesty always the best policy?",
    "Almost always for trust networks. Exceptions: hiding Jews from Nazis, surprise parties, and not telling your rival your poker hand. Universal honesty without context is a philosophy student trap. Default to truth; allow rare justified deception with a high bar.",
    "grok", ["Extreme historical example", "Poker quip", "Default + exceptions structure"]),

  // ── Tech ───────────────────────────────────────────────
  r("t01", "tech", 1, "Is AI going to take all the jobs?",
    "It will take jobs that are mostly typing, summarizing, and rearranging other people's work  -  a shocking amount of white-collar life. It will create ones for people who aim the machine and own outcomes. The middle of 'I attend meetings and rewrite emails' is the crater. Plan accordingly.",
    "grok", ["Specific job description roast", "No both-sides fluff", "Call to action without soft landing"]),
  r("t02", "tech", 2, "Should I learn Rust or Go in 2026?",
    "It depends on what you want to build.\n\n**Choose Go** for fast productivity on services, CLIs, and infra with a small language surface.\n\n**Choose Rust** for performance with memory safety, systems work, WASM, or long-lived correctness-critical code.\n\nStart with the one closest to your next real project, not Reddit heat.",
    "claude", ["Bold subheads comparison", "Explicit tradeoffs", "Anti-hype close"]),
  r("t03", "tech", 1, "Is TypeScript worth it?",
    "If your JS lives longer than a weekend hack, yes. Types catch dumb bugs before production and make refactors less terrifying. Skip for tiny scripts; use for anything humans maintain under deadline. The 'types slow me down' crowd optimizes the first hour, not the sixth month.",
    "grok", ["Pragmatic threshold", "Digs at anti-TS crowd", "Time-horizon argument"]),
  r("t04", "tech", 2, "Explain Kubernetes simply.",
    "Kubernetes runs containers across many machines. You declare desired state (\"run 3 copies of this app\"), and it works to keep that true  -  restarts, load spread, rolling updates. Think 'operating system for the data center.' Powerful and complex; smaller teams often start managed.",
    "llama", ["Plain pedagogy", "One metaphor", "Complexity warning"]),
  r("t05", "tech", 2, "Will open source AI win?",
    "Open weights already won the long tail  -  fine-tunes, local agents, research forks. Closed labs still lead the bleeding edge for a while via data, compute, and product glue. Bet on mixed: frontier APIs + open models eating the commodity layer.",
    "grok", ["Industry realism", "No manifesto", "Clear prediction"]),
  r("t06", "tech", 1, "What is a transformer in AI?",
    "A neural architecture from the 2017 paper \"Attention Is All You Need.\" Self-attention lets each token attend to every other token, capturing long-range dependencies better than older recurrent nets. Stack layers, train on huge text, get LLMs. Variants power most modern models.",
    "kimi", ["Paper cite", "Dense textbook paragraph", "No personality"]),
  r("t07", "tech", 3, "Will AGI happen this decade?",
    "Define AGI or the question is astrology. If you mean systems that automate most remote cognitive labor under oversight, pieces are arriving. If you mean autonomous scientific genius rewriting physics overnight  -  maybe, maybe not. Watch capability curves and deployment, not keynote prophecies.",
    "grok", ["Demands definition", "Splits scenarios", "Skeptic of hype timelines"]),
  r("t08", "tech", 2, "What's the difference between AI and machine learning?",
    "AI is the broad field of machines performing tasks that typically need human intelligence. Machine learning is a subset where systems improve from data rather than only hand-written rules. Deep learning is a further subset using multi-layer neural nets. People often say 'AI' for modern ML like LLMs.",
    "llama", ["Nested definitions", "Textbook hierarchy", "Colloquial note at end"]),
  r("t09", "tech", 1, "Should I use tabs or spaces?",
    "Spaces, size 2, and stop arguing. Your formatter already decided. The only real answer is 'whatever the repo uses'  -  consistency beats tribal identity. If you're bikeshedding indentation, your sprint is already lost.",
    "grok", ["Picks a side then undercuts with repo rule", "Bikeshed callout", "Sprint realism"]),
  r("t10", "tech", 2, "Is the terminal outdated?",
    "No. GUIs are great for discovery; the terminal is great for composition and automation. Pipelines, remote servers, and reproducible scripts still live in text interfaces. Learn enough shell to not fear it  -  you don't need to cosplay a 90s sysadmin.",
    "grok", ["GUI vs terminal roles", "Practical learning bar", "Anti-cosplay line"]),
  r("t11", "tech", 3, "How should I evaluate a new JS framework?",
    "1. Does it solve a problem your current stack has?\n2. What's the hiring and ecosystem story in 2 years?\n3. Migration cost vs feature gain?\n4. Who maintains it and how stable are APIs?\nPrefer boring technology until pain is concrete. Demos lie; production retention doesn't.",
    "chatgpt", ["Numbered evaluation rubric", "Boring-technology nod", "Corporate-safe tone"]),
  r("t12", "tech", 2, "Is no-code going to replace developers?",
    "It replaces the form-builder tier of apps  -  good. It doesn't replace ambiguous requirements, integration hell, performance edges, or security ownership. Developers move up the stack; the ones who only drag buttons compete with templates. Learn systems thinking, not just syntax.",
    "grok", ["Tiered replacement claim", "Lists what remains hard", "Career advice sting"]),

  // ── Science ────────────────────────────────────────────
  r("s01", "science", 1, "Explain black holes like I'm five.",
    "Sure! Imagine space is a big soft mattress. A heavy ball makes a deep dip. If something gets heavy enough, the dip is so deep nothing can climb out  -  not even light. That super-deep dip is a black hole. We can't see inside, but we watch how things move around the edge.",
    "chatgpt", ["Mattress analogy", "Kid-friendly cadence", "Reassuring close"]),
  r("s02", "science", 1, "What's the dumbest popular science myth?",
    "That we only use 10% of our brains. Motivational poster garbage. Scans show widespread activity; damage almost anywhere has effects. The myth survives because it flatters the idea of a secret superpower if you buy the right course.",
    "grok", ["Calls myth garbage", "Evidence in one line", "Self-help industry snipes"]),
  r("s03", "science", 2, "Is time travel possible?",
    "Great question! Relativity allows time dilation and speculative closed timelike curves under extreme conditions. Practical backward travel faces energy, causality, and zero experimental evidence. Forward 'time travel' via near-light-speed is real in principle. Fun in movies; not a vacation plan.",
    "gemini", ["Great question opener", "Bullet-friendly structure in prose", "Soft dismissive close"]),
  r("s04", "science", 2, "How does mRNA vaccine technology work?",
    "mRNA vaccines deliver a short message instructing cells to temporarily produce a harmless pathogen piece  -  for COVID-19, typically the spike protein. Your immune system learns to recognize it. The mRNA does not enter the nucleus or alter DNA; it degrades quickly. The platform can update as pathogens mutate.",
    "claude", ["Precise mechanism", "Anticipates DNA myth", "Calm clinical tone"]),
  r("s05", "science", 2, "Are we alone in the universe?",
    "We don't know. The universe is vast and chemistry is common, but we have one data point. Fermi's paradox asks why we don't see clear others. Hypotheses range from rare intelligence to short-lived civs to bad search strategies. Extraordinary claims need evidence; absence isn't proof of absence.",
    "deepseek", ["Encyclopedic balance", "Fermi name-drop", "Hedge stack"]),
  r("s06", "science", 3, "What would happen if the moon disappeared?",
    "Earth's axial tilt would wander more over long timescales, potentially destabilizing climate. Ocean tides would shrink (solar tides remain). Nights darker. Ecosystems and cultures tuned to lunar cycles disrupted. Exact climate outcomes unfold over geologic time, not overnight catastrophe cinema.",
    "deepseek", ["Multi-effect inventory", "Academic tone", "Anti-cinema closer"]),
  r("s07", "science", 1, "Is Pluto a planet?",
    "By IAU 2006 rules, no  -  it's a dwarf planet because it hasn't cleared its neighborhood. By 'cool round rock kids grew up loving,' yes forever. Categories are tools, not sacred. The science didn't change; the filing cabinet did.",
    "grok", ["IAU fact + culture", "Categories as tools", "Emotional permission"]),
  r("s08", "science", 2, "Why is the sky blue?",
    "Rayleigh scattering: shorter blue wavelengths of sunlight scatter more in the atmosphere than longer red wavelengths. Looking up, you see that scattered blue light. Sunsets look red because light travels through more atmosphere and blue is scattered out of the direct path.",
    "llama", ["Named mechanism", "Clean causal chain", "Sunset extension"]),
  r("s09", "science", 3, "Could we terraform Mars?",
    "In principle, parts of it  -  greenhouse gases, maybe orbital mirrors, import volatiles  -  but the timescales, energy budgets, and ethics of planetary engineering are brutal. Near-term: habitats and ISRU. Full Earth-like Mars is science fiction budgeted in centuries, not startup pitch decks.",
    "grok", ["Principle vs practical", "Budget/ethics realism", "Startup dig"]),
  r("s10", "science", 2, "Do vaccines cause autism?",
    "No. Large epidemiological studies across countries found no causal link between vaccines (including MMR) and autism. The original Wakefield paper was fraudulent and retracted. Autism has strong genetic components; symptoms often become noticeable around vaccination age, which creates a false timing association.",
    "claude", ["Direct no", "Cites evidence class", "Explains confounded timing"]),

  // ── Spicy ──────────────────────────────────────────────
  r("x01", "spicy", 2, "Are billionaires a problem?",
    "Concentrated power is always a problem if it can buy policy and narrate reality. Envy cosplaying as justice is also a problem. The useful question isn't abstract 'should fortunes exist'  -  it's whether markets, taxes, and speech rules still work when one person funds a midsize country. Fix capture; don't LARP 1793 over a yacht.",
    "grok", ["Both-sides then punches both", "Concrete capture frame", "Anti-LARP closer"]),
  r("x02", "spicy", 2, "Is cancel culture real?",
    "Yes when 'accountability' means professional exile for a 2011 take enforced by strangers. Also yes, powerful people rebrand silencing critics as free-speech martyrdom. Both can be true. The tell is process: pile-ons without evidence or proportionality aren't justice  -  they're bloodsport with better typography.",
    "grok", ["Dual acknowledgment", "Process as criterion", "Typography punchline"]),
  r("x03", "spicy", 1, "Should social media be regulated like tobacco?",
    "Age gates and liability for addictive design aimed at kids? Yes. A ministry of truth for adult political speech? Hard pass. Tobacco analogy works for dopamine product design, not ideas you dislike. Regulate the slot machine; don't appoint a commissar for memes.",
    "grok", ["Sharp policy split", "Anti-censorship punchline", "Slot machine metaphor"]),
  r("x04", "spicy", 2, "Should kids have smartphones?",
    "I want to be thoughtful here. Smartphones offer safety and learning, but heavy social use in early adolescence associates with mental health risks in some studies. Many pediatric experts suggest delaying personal phones, using controls, prioritizing sleep and in-person activity. Gradual norms often beat absolute bans kids route around.",
    "claude", ["Hedged opener", "Cites experts class", "No cultural fight"]),
  r("x05", "spicy", 3, "Is modern art a scam?",
    "Some is status laundering with better lighting. Some is genuine experimentation that looks empty until you know the conversation. The scam part is market opacity and 'if you don't get it you're unsophisticated' bullying. Look with your eyes first; theory is optional.",
    "grok", ["Split verdict", "Anti-pretension", "Eyes-first rule"]),
  r("x06", "spicy", 2, "Is DEI good or bad?",
    "Expanding talent pipelines and removing unfair barriers: good. Enforcing orthodoxy, lowering standards, or punishing dissent as heresy: bad. Most debates collapse those into one acronym so nobody has to specify mechanisms. Argue about policies and outcomes, not sacred logos.",
    "grok", ["Mechanism split", "Meta-critique of slogan wars", "Outcomes focus"]),
  r("x07", "spicy", 1, "Should voting be mandatory?",
    "Compulsory voting can raise turnout and reduce some campaign extremism, as seen in places like Australia. It also forces participation from the uninformed and raises liberty concerns. Tradeoffs depend on what you optimize  -  legitimacy of mandate vs freedom not to engage. Reasonable people disagree.",
    "chatgpt", ["Australia example", "Liberty concern balance", "Explicit reasonable-disagreement close"]),
  r("x08", "spicy", 2, "Is remote work dying?",
    "Office maximalists want bodies in seats for real estate and management theater. Pure remote zealots pretend every job is async writing. Reality: high-trust knowledge work stays hybrid/remote; junior training and certain ops pull people in. 'Dying' is a headline for RTO campaigns. Measure output, not badge swipes.",
    "grok", ["Mocks both tribes", "Concrete claim", "Badge swipe closer"]),
  r("x09", "spicy", 3, "Should billionaires fund journalism?",
    "Better than pure ad-clickbait collapse in some cases; worse if the paper becomes a vanity PR arm. Diversified revenue and editorial independence matter more than purity tests about who wrote the check. Follow the incentives, not the morality play about rich people existing.",
    "grok", ["Conditional framing", "Follow incentives", "Anti-morality-play"]),
  r("x10", "spicy", 1, "Is college still worth it?",
    "If the degree is a gated ticket (medicine, law, licensed engineering) or a strong network school  -  often yes. If it's four years of vague major + debt for portfolio jobs, you're buying a lifestyle subscription. Trade schools aren't consolation prizes. Prestige is a tax many happily pay.",
    "grok", ["Conditional yes", "Lifestyle subscription dig", "Prestige tax"]),

  // ── Life ───────────────────────────────────────────────
  r("l01", "life", 1, "How do I make friends as an adult?",
    "Here's a practical approach:\n\n1. **Proximity + repetition**  -  join something weekly.\n2. **Low-stakes invites**  -  coffee, not a weekend trip.\n3. **Follow up within 48 hours**  -  logistics kill adult friendship.\n4. **A little vulnerability early**  -  shared effort beats small talk marathons.\n\nAwkward is normal. Consistency beats charisma.",
    "chatgpt", ["Numbered list with bold heads", "Soft encouragement", "Self-help structure"]),
  r("l02", "life", 1, "How do I stop doomscrolling?",
    "Treat it like a design problem, not a willpower sermon. Delete infinite-feed apps from the home screen, use grayscale, charge outside the bedroom, replace the reflex with a physical object. The algorithm is optimized against you; stop showing up unarmed every night.",
    "grok", ["Design vs willpower", "Tactical list", "Adversarial algorithm frame"]),
  r("l03", "life", 2, "How much money do I need to be happy?",
    "Research often cited (Kahneman/Deaton and later Killingsworth) suggests money reduces misery up to a comfort threshold covering security and some freedom; gains flatten and depend on comparison and meaning. Exact numbers vary by city. Buy time and reduce financial anxiety before status purchases.",
    "claude", ["Cites research carefully", "No strong hot take", "Practical takeaway"]),
  r("l04", "life", 1, "How do I negotiate a higher salary?",
    "1. Research market comps.\n2. Document impact with numbers.\n3. Practice a calm script: enthusiasm + ask + silence.\n4. Prefer total-comp conversations.\n5. Be ready to walk if the gap is structural.\n\nAvoid ultimatums unless you mean them. Timing near reviews or competing offers helps.",
    "chatgpt", ["Checklist energy", "HR-safe phrasing", "Conditional walk-away"]),
  r("l05", "life", 2, "Is marriage outdated?",
    "The paperwork is optional; the commitment problem isn't. Humans still pair-bond, raise kids, and share assets  -  law is the API for that mess. Marriage is outdated as social obligation. As a deliberate contract between adults who mean it  -  still solid tech, if you don't treat the wedding as the product.",
    "grok", ["Tech metaphor for commitment", "Anti-ceremony snark", "API joke"]),
  r("l06", "life", 2, "Should I quit my job to start a startup?",
    "I can't prescribe your career  -  it depends on runway, risk tolerance, dependents, and idea strength. Useful frame: keep a job until evidence of demand (paying users, LOIs) or 12 - 18 months savings. If you leave, treat it as a controlled experiment with kill criteria, not a leap of faith.",
    "claude", ["Refuses to prescribe", "Structured criteria", "Kill criteria language"]),
  r("l07", "life", 1, "How do I wake up earlier?",
    "Sleep earlier. Everything else is cope. Fix caffeine after 2pm, dim lights at night, consistent wake time including weekends, and put the phone across the room. Morning routines fail when night routines are chaos.",
    "grok", ["Blunt first sentence", "Calls out cope", "Night-side causality"]),
  r("l08", "life", 3, "How do I deal with burnout?",
    "Burnout is often chronic stress plus values conflict plus recovery debt. Short-term: sleep, reduce inputs, medical check if needed. Medium-term: renegotiate workload or change role. Long-term: align work with values and build recovery into the calendar, not as leftover scraps. If symptoms are severe, talk to a professional.",
    "gemini", ["Layered time horizons", "Values language", "Professional help hedge"]),
  r("l09", "life", 2, "Is it too late to change careers at 35?",
    "No. Thirty-five is not a retirement speech. You have domain knowledge, some capital, and clearer taste than at 22. The cost is real  -  ramp time and ego bruises  -  but 'too late' is usually fear wearing a calendar costume. Bridge with transferable skills and a two-year plan, not a movie montage.",
    "grok", ["Direct no", "Calendar costume line", "Practical bridge advice"]),
  r("l10", "life", 1, "How do I read more books?",
    "Lower friction: always have a book on your phone and a physical one by the bed. Replace one scrolling block with 20 pages. Quit books that bore you faster. Tracking can help; shame doesn't. Volume comes from habit design, not becoming a different person overnight.",
    "chatgpt", ["Friction reduction tips", "Anti-shame", "Habit design vocabulary"]),

  // ── Extra mixed ────────────────────────────────────────
  r("m01", "mixed", 1, "What's the best Star Wars movie?",
    "Empire. Not nostalgia  -  structure: the heroes lose, the romance has teeth, Vader's reveal still works because the film earned the dread. Everything after chases that high or sells toys about chasing it. Fight me with Andor if you must  -  show, not movie.",
    "grok", ["Opinionated ranking", "Structural argument", "Sharp closer"]),
  r("m02", "mixed", 2, "Recommend a book that will change how I think.",
    "I recommend *Thinking, Fast and Slow* by Daniel Kahneman. It introduces System 1/2 and catalogs cognitive biases with experimental grounding. Many readers report it permanently changes how they notice snap judgments. Pair it with writing down one bias you catch weekly so ideas stick.",
    "gemini", ["Safe canonical pick", "Study tip", "Helpful tone"]),
  r("m03", "mixed", 1, "Why do people love the Roman Empire so much?",
    "Rome is a complete civilizational sandbox: engineering flex, political drama, military swagger, decadence, collapse. Modern men get memed for thinking about it weekly because it's shared historical brand that still feels epic without a fandom wiki. Also roads. People love roads.",
    "grok", ["Meme-aware", "Short", "Dry joke on roads"]),
  r("m04", "mixed", 2, "Is the simulation hypothesis useful?",
    "As a sci-fi prompt, fun. As an unfalsifiable claim, it rarely changes what you should do Monday morning. If we are simulated, you still have local ethics and local physics. Spend brain cycles on testable models unless you're writing a novel.",
    "grok", ["Utility filter", "Monday morning test", "Novel escape hatch"]),
  r("m05", "mixed", 3, "How should society handle deepfakes?",
    "Provenance standards, platform labeling, and legal remedies for non-consensual intimate imagery are tractable. Banning synthetic media wholesale is neither enforceable nor desirable for art and satire. Media literacy is necessary but insufficient alone. Layer technical, legal, and social responses.",
    "claude", ["Layered policy", "Art/satire carveout", "Measured tone"]),
  r("m06", "mixed", 1, "What's a skill that pays off weirdly well?",
    "Writing clearly. Not literary flourishes  -  making a complex thing simple in Slack, docs, and emails. It multiplies every other skill, makes you look competent in meetings you barely prepared for, and compounds with AI tools instead of getting replaced by them.",
    "grok", ["Counterintuitive pick", "AI complementarity", "Meeting roast lite"]),
  r("m07", "mixed", 2, "Explain entropy simply.",
    "Entropy measures how many ways a system can be arranged at the microscopic level  -  often described as disorder. Closed systems tend toward higher entropy over time (second law). That's why ice melts in a warm room more readily than the reverse without work input.",
    "llama", ["Definition then law", "Ice example", "Neutral textbook"]),
  r("m08", "mixed", 2, "Is multitasking real?",
    "For most cognitive work, no  -  you're task-switching with a tax. The brain serializes attention; what feels like multitasking is rapid context switching that degrades quality. Exceptions exist for highly automatic tasks paired with light ones. Deep work is undefeated.",
    "chatgpt", ["Corrects misconception gently", "Notes exceptions", "Deep work nod"]),
  r("m09", "mixed", 1, "What's the best advice for junior engineers?",
    "Ship small, read the codebase like a book, ask questions that show you tried, and write the doc you wish existed. Ego is the career killer  -  being wrong in public and fixing it is how seniors are made. Tools change; judgment compounds.",
    "grok", ["Punchy imperatives", "Ego line", "Judgment compounds"]),
  r("m10", "mixed", 3, "How do I know if I'm in a bubble?",
    "If your entire information diet agrees with you, if dissenters are only ever cartoon villains in your feed, and if prediction markets or base rates keep surprising you  -  you're in a bubble. Seek primary sources and steelman the other side weekly. Discomfort is a feature.",
    "grok", ["Diagnostic checklist", "Prediction markets nod", "Discomfort as feature"]),
];

export const LIBRARY: Round[] = [...CORE, ...EXTRA_ROUNDS];

export const BATTLES: BattlePair[] = [
  {
    id: "b01",
    question: "Is pineapple on pizza acceptable?",
    pack: "humor",
    difficulty: 1,
    left: {
      model: "grok",
      isGrok: true,
      answer:
        "Yes. Sweet-salty works. The culture war over fruit on cheese is peak first-world LARP. Eat what tastes good; stop drafting constitutions about toppings.",
      tells: ["Blunt yes", "Culture-war mockery", "Anti-constitution joke"],
    },
    right: {
      model: "claude",
      isGrok: false,
      answer:
        "Taste is subjective, so 'acceptable' depends on context  -  home cooking vs a traditionalist pizzeria. Many cuisines pair sweet and savory successfully. If you're sharing a pie, communicate preferences; there's no universal culinary law here.",
      tells: ["Subjectivity frame", "Context split", "Conflict-avoidant close"],
    },
  },
  {
    id: "b02",
    question: "Will AI replace programmers?",
    pack: "tech",
    difficulty: 2,
    left: {
      model: "chatgpt",
      isGrok: false,
      answer:
        "AI will automate parts of programming  -  boilerplate, tests, simple features  -  but complex system design, requirements ambiguity, and accountability remain human-led for now. The role evolves toward higher-level problem solving. Continuous learning is the best preparation.",
      tells: ["Parts not whole", "Role evolution language", "Lifelong learning closer"],
    },
    right: {
      model: "grok",
      isGrok: true,
      answer:
        "It will replace programmers who only translate tickets into CRUD. It will arm the ones who own architecture, product judgment, and messy integrations. If your job is 'typing what Jira said,' update your resume. If your job is deciding what should exist, you're fine  -  for now.",
      tells: ["CRUD dig", "Jira roast", "Conditional timeline sting"],
    },
  },
  {
    id: "b03",
    question: "Should I go to college?",
    pack: "life",
    difficulty: 2,
    left: {
      model: "gemini",
      isGrok: false,
      answer:
        "It depends on your goals! For licensed professions and research paths, college is often essential. For many tech and creative careers, skills portfolios and experience can substitute. Consider costs, scholarships, and opportunity cost. There's no one-size-fits-all answer.",
      tells: ["Depends opener with !", "Lists paths", "No one-size closer"],
    },
    right: {
      model: "grok",
      isGrok: true,
      answer:
        "If you need the license or the network, go. If you're buying four years of vibes on loans for a job that hires GitHub links, you're funding a brand, not a skill. Run the NPV. Prestige is a product; sometimes worth the price, often not.",
      tells: ["NPV language", "Vibes on loans", "Prestige as product"],
    },
  },
  {
    id: "b04",
    question: "Is social media making us worse?",
    pack: "spicy",
    difficulty: 2,
    left: {
      model: "grok",
      isGrok: true,
      answer:
        "The product is engineered for outrage and comparison, so yes for the average unarmored brain. Tools aren't destiny  -  but when the business model is attention extraction, 'just use it better' is a cute slogan. Curate hard or get farmed.",
      tells: ["Business model critique", "Unarmored brain", "Get farmed closer"],
    },
    right: {
      model: "claude",
      isGrok: false,
      answer:
        "Effects vary by person, platform, and use pattern. Research links heavy use to some mental health concerns, especially in adolescents, while also enabling community and information access. Mindful use, limits, and offline priorities help. Design choices by platforms matter too.",
      tells: ["Varies by...", "Both harms and benefits", "Mindful use advice"],
    },
  },
  {
    id: "b05",
    question: "What's the best way to learn to code?",
    pack: "tech",
    difficulty: 1,
    left: {
      model: "llama",
      isGrok: false,
      answer:
        "Start with a beginner-friendly language like Python. Practice with small projects, use interactive tutorials, read documentation, and join communities. Consistency matters more than long rare sessions. Build projects that interest you to stay motivated.",
      tells: ["Python default", "Generic best practices", "Motivation note"],
    },
    right: {
      model: "grok",
      isGrok: true,
      answer:
        "Build something you actually want, break it, read the error, fix it, repeat. Courses are maps; shipping is the terrain. Tutorials without a personal project are entertainment. Pick a stack, finish a ugly v1 in two weeks, then feel shame and refactor.",
      tells: ["Error loop", "Maps vs terrain", "Ugly v1 shame humor"],
    },
  },
  {
    id: "b06",
    question: "Is death something to fear?",
    pack: "philosophy",
    difficulty: 3,
    left: {
      model: "deepseek",
      isGrok: false,
      answer:
        "Philosophers disagree. Epicureans argue death is not experienced, so not harmful to the subject. Others emphasize loss of future goods. Fear can be adaptive (risk avoidance) or maladaptive (paralysis). Cultural and religious frameworks strongly shape responses. No consensus answer exists.",
      tells: ["Philosophers disagree", "Adaptive/maladaptive", "No consensus"],
    },
    right: {
      model: "grok",
      isGrok: true,
      answer:
        "Fear the dying badly; fear wasted years more than the off switch. You're a temporary pattern that got to look at stars and argue on the internet  -  that's already absurd luck. Spend the fear budget on not squandering the pattern while it runs.",
      tells: ["Dying vs death split", "Absurd luck", "Fear budget metaphor"],
    },
  },
  {
    id: "b07",
    question: "Are coding bootcamps worth it?",
    pack: "tech",
    difficulty: 2,
    left: {
      model: "chatgpt",
      isGrok: false,
      answer:
        "They can be, for career switchers who need structure and a network, but outcomes vary widely by program quality and job market. Compare cost, job placement data, and curriculum depth. Self-study plus projects is cheaper if you're disciplined. Research thoroughly before enrolling.",
      tells: ["Can be + varies", "Compare metrics", "Self-study alternative"],
    },
    right: {
      model: "grok",
      isGrok: true,
      answer:
        "The good ones are expensive accelerators; the bad ones are student-loan cosplay. If you need forced structure and a hiring pipeline, maybe. If you can finish projects alone, keep your money and build a portfolio that makes recruiters flinch in a good way.",
      tells: ["Cosplay line", "Binary decision", "Recruiters flinch"],
    },
  },
  {
    id: "b08",
    question: "Should I tell my friend their partner is cheating?",
    pack: "life",
    difficulty: 3,
    left: {
      model: "claude",
      isGrok: false,
      answer:
        "This is difficult. Consider the certainty of your evidence, potential harm of silence vs speaking, and your friend's safety. Many ethicists lean toward informing with care if evidence is strong. Avoid gossip motives; be prepared for fallout. There isn't a perfect rule for every situation.",
      tells: ["Difficult opener", "Ethicists lean", "No perfect rule"],
    },
    right: {
      model: "grok",
      isGrok: true,
      answer:
        "If you have receipts, tell them. Loyalty to a friend's reality beats loyalty to their comfortable illusion. Soften the delivery, not the facts. If you only have vibes, stay out  -  destroying a relationship on a hunch is how you become the villain in the wrong movie.",
      tells: ["Receipts test", "Illusion line", "Wrong movie closer"],
    },
  },
];

export function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), 1 | t);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffleWithSeed<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  const rand = mulberry32(seed);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

export function roundsForPack(pack: PackId): Round[] {
  if (pack === "mixed") return LIBRARY;
  return LIBRARY.filter((r) => r.pack === pack || r.pack === "mixed");
}

export function utcDayKey(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

export function daySeed(day = utcDayKey()): number {
  let h = 2166136261;
  for (let i = 0; i < day.length; i++) {
    h ^= day.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function hashSeed(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
