// Editorial polish pass 1: de-templating.
// Applies hand-authored replacements to the module JSON sources:
//   1. Zeigarnik hooks: 68/76 started with "If" — rewritten to varied constructions.
//   2. "Spend two minutes / for two minutes" duration phrases (21) — varied or cut.
//   3. conceptualTension openers "The framework's ..." (22) — varied.
//   4. connectionNode "It also connects to ..." (19) — varied connectors.
//   5. Bug fix: 6.6 connectionNode self-reference ("6.6's neighbors").
// Run: bun run scripts/polish-pass.ts   (idempotent-ish; each find must match exactly once)

interface Fix {
  file: number; // module number
  find?: string; // substring to replace (must occur exactly once across the file's content fields)
  replace?: string;
  hook?: string; // full replacement for zeigarnikHook of `code`
  code?: string;
}

const hookRewrites: Record<string, string> = {
  "2.2": "Suppose your tools and rooms really are part of your thinking. What remains of the thinker when they are taken away — and who is left to ask the question?",
  "2.4": "The political, on this account, is organized at the level of circulating intensity. What happens to the assumption that better arguments change minds? And what would a politics built for affect, rather than against it, look like?",
  "2.5": "The deliberate mind, on this account, spends much of its time laundering the intuitive mind's verdicts. In what sense are you the author of your considered judgments — and what is the thing in you that sometimes refuses to sign?",
  "2.6": "The satisfier, not the optimizer, turns out to be the rational agent. What happens to an institutional world — rankings, markets, algorithmic pricing — built on the premise that optimization is what agents do?",
  "2.7": "Reason, most days, is the lawyer for desires it did not choose. What would it take — and what would it cost you specifically — to let it plead the other side's case once, in full?",
  "2.8": "You are, on this account, a story being told. So who is the narrator? Is there someone behind the narration listening to it, or is the listener also a character — and if so, who wrote them in?",
  "2.9": "Sustained inquiry fails to find the self that is doing the inquiring. What would be liberated by seeing through it, and why does the very question produce such resistance?",
  "2.10": "The threats that feel most real are often just the ones retold most often. So what is your fear actually tracking — and what are you not afraid of because nobody keeps showing it to you?",
  "3.1": "The institutions that feel most inevitable are precisely the ones whose histories we cannot remember. Which of your certainties is currently waiting for its construction date to be rediscovered?",
  "3.2": "The self, on this account, is what the performance retroactively posits. What happens to the part of you that watches the performance? Is it a performer too — and if so, performing for whom?",
  "3.3": "The market economy only looks productive because the care beneath it is not counted. What would the economy look like if the accounting were honest, and who would lose from the correction?",
  "3.4": "Your tastes and ease feel like personal character; they function as class markers. How much of the self you experience as most yours is a deposit of a position you did not choose?",
  "3.5": "Desire is borrowed. Which of your desires is actually yours — and if you could subtract every borrowed one, what would be left of you?",
  "3.6": "The obvious, it turns out, is always someone's interest wearing a disguise. Which of your 'obvious' beliefs would you least want to see unmasked? And what does that reluctance itself tell you?",
  "3.7": "Your opponent's morality may be a different grammar rather than a failure of intelligence. What obligation does that place on you — and what would your own grammar look like described by someone who does not share it?",
  "3.8": "Solidarity, it turns out, is a product of ritual assembly. What is a society that has replaced assembly with feeds, and where is its effervescence being manufactured now?",
  "3.9": "Your day is held together by the cooperation of thousands of non-humans. What happens to the idea of individual responsibility, and where does it actually live?",
  "3.10": "The boundary of the sayable is maintained by institutions and moved by patience. Which of your own convictions is currently being kept sayable for you — and who is doing the keeping?",
  "4.1": "The authority to name is power's first instrument. Who named the categories you live inside, and what would it mean to renegotiate the names?",
  "4.2": "You have become the watcher of your own compliance. What would you have to stop measuring in order to notice who the measurement serves?",
  "4.3": "The same state that fosters one population's life can expose another's bare life. Where exactly does the line run — and who gets to draw it, using what instruments?",
  "4.4": "The line between policy and killing is drawn by administrative routine. What does it mean to be morally responsible for a death your government administers? And what would responsibility look like from inside the routine?",
  "4.5": "The system that prices your morning coffee also prices human difference. What would it mean to consume ethically — and is the category itself a way of not asking the question?",
  "4.6": "Your education handed you a canon assembled by a colonial structure. Which parts of what you know would you have to give up to know otherwise? And is giving up the only option?",
  "4.7": "The structure of elimination is ongoing, and your own institutions sit on its land. What does it mean to say 'we' about the place you live, and who is entitled to decide?",
  "4.8": "Every single-axis story leaves something invisible at the crossing. What is currently invisible in the story you tell about your own life — and which axis are you using to keep it that way?",
  "4.9": "Authenticity has become a manufactured product. What would genuine experience look like, and how would you tell the difference from the inside?",
  "4.10": "Power no longer encloses you; it adjusts you continuously. Where is the outside? And is the last unmonitored place actually the inside of your own attention?",
  "5.1": "The systems you inhabit keep producing outcomes nobody intends. Which outcome in your life right now is the structure's work rather than anyone's choice — and which loop would you have to rewire to change it?",
  "5.2": "The Flash Crash had no cause, only conditions. How many of the events you blame on causes actually have only conditions? And what does blame mean in a world like that?",
  "5.3": "Every population of agents adapts to whatever rules you set. What is the difference between governing and negotiating — and what would power look like if it expected to be answered?",
  "5.4": "The systems we most admire for efficiency are the ones release will hit hardest. What is the difference between managing for resilience and simply postponing the burn? And who gets to choose which fires are allowed?",
  "5.5": "The safe operating space held for 11,700 years and was breached within two centuries. What does 'safe' mean for a species that only learned to measure the space after it started leaving it?",
  "5.6": "The largest facts about your world are too big and too slow to be experienced as objects. What does it mean to be responsible for something you cannot perceive — and what would a mind built for hyperobjects feel like from the inside?",
  "5.7": "Nothing exists independently. So what separates 'nothing exists inherently' from 'nothing matters' — and why do the two claims feel so similar when one is liberation and the other despair?",
  "5.8": "Your daily life is organized by decisions made before you were born. Which of those decisions would you most want to relitigate, and what would relitigating it actually require?",
  "5.9": "Your description of a situation changes the situation. When you finally describe it accurately, which is accurate: the description, or the situation it has just produced?",
  "5.10": "The events that matter most cannot be predicted. What, then, is the value of all the forecasting we do? And what would an institution built on that admission actually look like?",
  "6.1": "You have been trained to experience yourself as human capital. What would remain of you if you stopped accounting for yourself entirely? And what does the fear of that question tell you about who installed it?",
  "6.2": "The reserve of unenclosed things is what keeps capital alive through crisis. What will be the last commons to go — and what will it be like to live on the other side of its fence?",
  "6.3": "The economy's productivity is subsidized by unpaid care. What would happen to every price you know if the subsidy were withdrawn? And what does your reluctance to imagine it reveal about who the subsidy serves?",
  "6.4": "The system's survival has always depended on finding new rifts to patch the old ones. What happens when the last reserves are opened — and is 'sustainability' a repair of the cycle or a name for its slowest possible exhaustion?",
  "6.5": "Enough people believed an economic model, and it became true. Which models are currently making your economy true, who chose them, and what happens when belief in one of them fails?",
  "6.6": "The economy's choke points are owned, and the rest of us are tenants. What would it take to build infrastructure nobody rents out? And what does the history of previous commons tell you about what happens to it?",
  "6.7": "The market you inhabit is partly a fiefdom and partly a market. How would you know which you are in at any moment — and who profits from your not knowing?",
  "6.8": "Your behavior is mined to predict and shape what you will want next. What is the difference between your desire and its prediction? And at what point does the prediction become the desire?",
  "6.9": "The system that makes you time-poor also blames you for not using your time well. What would it take to hear 'you're not managing your time' as a statement about the economy rather than about you?",
  "6.10": "The economy you were promised keeps growing toward a ceiling it cannot see. What would 'enough' feel like — and is the harder problem the ceiling, or the fact that no one in your life can describe what enough would mean?",
  "7.1": "The image of the event is the event. What happens to the concept of truth for a species that increasingly lives in the image — and is 'post-truth' a crisis of honesty or a change in what reality itself has become?",
  "7.2": "The strongest epistemic prisons are the ones that eat their own contradictions. What would it take for you to recognize the walls of your own? And would you trust the messenger who told you?",
  "7.3": "Your mind is also a selection environment. What is its current fitness function rewarding, and what ideas are you currently spreading that you did not actually choose?",
  "7.4": "The algorithm is law, and no one can read it. In what sense is the governed society still self-governing — and what does 'consent of the governed' mean when the governing is unintelligible?",
  "7.5": "Winner-take-most is the inherent topology. What does 'competition' mean in digital markets — and is a framework built for industrial monopolies even capable of seeing the network-monopoly it faces?",
  "7.6": "The intelligence we celebrate as ours rests on labor we refuse to see. In what sense is it ours? And what would acknowledging the labor change about how we build, buy, and bow to it?",
  "7.7": "The structures that once absorbed collective anxiety have dissolved and offloaded it onto you as freedom. What would it cost to build new structures — and is the liquid life as free as it feels, or is the feeling itself the offloading?",
  "7.8": "The most fluent writer you now work with has no understanding of what it writes. What does that do to your own reading? And at what point does relying on the parrot's fluency become delegating your judgment to a statistical echo of everyone else's?",
  "8.1": "The crises share roots, so solving them one at a time re-sows them one at a time. What would an institution look like that was built to see the tangle while acting inside it?",
  "8.2": "The environment has become incomprehensible in the framework's own sense. What is the value of the framework that tells you so? And what do you do with the gap between understanding the diagnosis and knowing what to do?",
  "8.3": "The most expensive institutional failures come from applying expertise to the wrong domain. What is the tell — and why do institutions so reliably prefer the frame that flatters their experts?",
  "8.4": "Irony and sincerity are both available, and neither is sufficient. What does honesty look like here? Is the oscillation itself a new way of being honest, or a new way of evading the choice?",
  "8.5": "Every synthesis framework, including this curriculum's, is partial. How do you use a map you do not fully trust? And is the ability to use partial maps without mistaking them for the territory the actual skill the whole curriculum has been building?",
  "8.6": "Every institution you want to reform is managing a condition you tolerate. What is the difference between your reformism and your complicity — and what would you have to give up to answer honestly?",
  "8.7": "Sustained inspection fails to find the self that does the inspecting. What exactly becomes free? And is the urge to stop looking, to file this away as metaphor, the last maneuver of the very thing the practice would dissolve?",
  "8.8": "Every frame is partial, and the case exceeds any synthesis. What is this curriculum finally for? And is 'a practice of seeing that includes seeing its own blindness' an answer, or one more elegant way of not being done?",
};

const fixes: Fix[] = [
  // ── Duration phrases ──────────────────────────────────────────────
  { file: 3, find: "Spend two minutes tracing its history backward to a decision someone made, and notice how quickly you run out of memory.", replace: "Trace its history backward to a decision someone made, and notice how quickly you run out of memory." },
  { file: 4, find: "Spend two minutes writing the apparatus that produced the category: the committee, the criteria, the institution that administers it.", replace: "Write the apparatus that produced the category: the committee, the criteria, the institution that administers it, and the year it was assembled." },
  { file: 4, find: "Ask, for two minutes, which population it is designed to foster and which population it exposes.", replace: "Ask which population it is designed to foster and which population it exposes." },
  { file: 4, find: "Spend two minutes tracing the racialized and globalized labor that made it cheap, down one real branch of the supply chain.", replace: "Trace the racialized and globalized labor that made it cheap, down one real branch of the supply chain, as far as the trail will take you." },
  { file: 4, find: "Spend two minutes with the specificity.", replace: "Stay with the specificity until it stops being abstract." },
  { file: 4, find: "Rewrite it, for two minutes, with a second axis added: what changes at the crossing?", replace: "Rewrite it with a second axis added: what changes at the crossing?" },
  { file: 4, find: "Spend two minutes separating the experience from the image and asking which you actually want.", replace: "Separate the experience from the image and ask which you actually want." },
  { file: 5, find: "Spend two minutes on the drawing, not the solution.", replace: "Give the drawing your attention; leave the solution alone." },
  { file: 5, find: "Spend two minutes identifying what adapted around your fix — who learned, what changed their behavior in response.", replace: "Identify what adapted around your fix — who learned, what changed their behavior in response." },
  { file: 5, find: "Try, for two minutes, to point at it: to find the place where it is.", replace: "Try to point at it: to find the place where it is." },
  { file: 5, find: "dismantle its existence for two minutes: the materials, the labor, the transport, the concepts that name it, the needs that called it into being.", replace: "dismantle its existence: the materials, the labor, the transport, the concepts that name it, the needs that called it into being." },
  { file: 5, find: "Spend two minutes separating what you think is happening from what your thinking is causing to happen.", replace: "Separate what you think is happening from what your thinking is causing to happen." },
  { file: 6, find: "Spend two minutes separating the project from the person running it.", replace: "Separate the project from the person running it." },
  { file: 6, find: "Spend two minutes on the single break, not the whole chain.", replace: "Stay on the single break; leave the whole chain alone." },
  { file: 7, find: "Spend two minutes on the difference.", replace: "Sit with the difference." },
  { file: 7, find: "Spend two minutes distinguishing: have you merely", replace: "Distinguish honestly: have you merely" },
  { file: 7, find: "Spend two minutes on the descent.", replace: "Keep descending until the names stop appearing." },
  { file: 7, find: "Spend two minutes separating its fluency (high) from its grounding (unknown, possibly absent), and name one claim", replace: "Separate its fluency (high) from its grounding (unknown, possibly absent), and name one claim" },
  { file: 8, find: "Spend two minutes tracing two other crises it is causally entangled with", replace: "Trace two other crises it is causally entangled with" },
  { file: 8, find: "Ask for two minutes whether it is actually complex", replace: "Ask whether it is actually complex" },
  { file: 8, find: "Spend two minutes holding both at full strength, without collapsing either into the other.", replace: "Hold both at full strength, without collapsing either into the other." },

  // ── conceptualTension openers ─────────────────────────────────────
  { file: 3, find: "The framework's weak point is its own origin:", replace: "Where the account strains is in its own origin:" },
  { file: 3, find: "The framework is influential and contested.", replace: "Girard has drawn influence and resistance in equal measure." },
  { file: 3, find: "The framework's difficulties are practical rather than logical.", replace: "The difficulties here are practical rather than logical." },
  { file: 3, find: "The framework's weakness is its own comfort:", replace: "The concept's weakness is the comfort it offers:" },
  { file: 4, find: "The framework's difficulty is its tendency to totalize.", replace: "The difficulty is the concept's tendency to totalize." },
  { file: 4, find: "The framework is contested mainly at its edges.", replace: "The contestation happens mainly at the edges." },
  { file: 4, find: "The framework's critics press two questions.", replace: "Its critics press two questions." },
  { file: 4, find: "The framework's critics include Indigenous scholars themselves.", replace: "The strongest critics include Indigenous scholars themselves." },
  { file: 4, find: "The framework's defenders reply that the tests", replace: "Its defenders reply that the tests" },
  { file: 4, find: "The framework's internal debates are substantive.", replace: "The internal debates are substantive." },
  { file: 4, find: "defenders of the framework reply that the variables", replace: "the reply from its defenders is that the variables" },
  { file: 4, find: "The concept's defenders reply that the calibration", replace: "Its defenders reply that the calibration" },
  { file: 4, find: "The framework's weak point is its almost totalizing abstraction.", replace: "The weak point is the essay's almost totalizing abstraction." },
  { file: 5, find: "The framework is sometimes accused of conservatism in disguise:", replace: "A recurring accusation is conservatism in disguise:" },
  { file: 5, find: "The framework's transfer from ecology to social systems is its most contested step.", replace: "The most contested step is the transfer from ecology to social systems." },
  { file: 5, find: "the framework's own policy lesson is to build resilience", replace: "the model's own policy lesson is to build resilience" },
  { file: 5, find: "The framework is contested on several fronts.", replace: "The contestation runs on several fronts." },
  { file: 5, find: "The framework's authors accept the first set of criticisms", replace: "The authors accept the first set of criticisms" },
  { file: 5, find: "The framework's status must be stated honestly.", replace: "The status of the concept must be stated honestly." },
  { file: 5, find: "The framework's limits are its determinism's edge.", replace: "The limits show at the edge of determinism." },
  { file: 6, find: "The framework's debates are about boundaries.", replace: "The debates here are about boundaries." },
  { file: 6, find: "The framework's contested question is whether the rift can be closed", replace: "The contested question is whether the rift can be closed" },
  { file: 6, find: "The framework's main debate is about whether the platform", replace: "The main debate is whether the platform" },
  { file: 6, find: "The concept's contested question is whether the precariat is a class at all.", replace: "Whether the precariat is a class at all is the contested question." },
  { file: 7, find: "The framework's contested edge is the boundary:", replace: "The contested edge is the boundary itself:" },
  { file: 7, find: "The framework's contested question is the totality of the melt.", replace: "The contested question is the totality of the melt." },
  { file: 7, find: "The framework's defenders reply that the description holds", replace: "Bauman's defenders reply that the description holds" },
  { file: 8, find: "The framework's danger is that it becomes the same vagueness it was built against.", replace: "The danger is that the term becomes the same vagueness it was built against." },

  // ── connectionNode connectors + 6.6 self-reference bug ───────────
  { file: 4, find: "It also connects to 4.1 (Power/Knowledge) — statistics and demography are knowledge practices through which populations become governable — and it prepares the colonial extension in 4.4 (Necropolitics).", replace: "Its machinery runs on the statistics and demography of 4.1 (Power/Knowledge), through which populations become governable, and it prepares the colonial extension in 4.4 (Necropolitics)." },
  { file: 5, find: "It also connects to 1.2 (Paradigm), whose scientific revolutions are release-and-reorganization at the scale of a discipline, and to 5.8 (Path Dependency), which explains why reorganization rarely retraces the old path.", replace: "The cycle also describes 1.2 (Paradigm), whose scientific revolutions are release-and-reorganization at the scale of a discipline; and with 5.8 (Path Dependency) it explains why reorganization rarely retraces the old path." },
  { file: 5, find: "It also connects to 5.4 (Panarchy) — reorganization after release is constrained by what the release left standing — and to 2.6 (Bounded Rationality), since satisficing early choices are exactly what later generations inherit as structure.", replace: "The same lock-in runs through 5.4 (Panarchy), where reorganization after release is constrained by what the release left standing, and through 2.6 (Bounded Rationality), since satisficing early choices are exactly what later generations inherit as structure." },
  { file: 6, find: "It also connects to 6.4 (Metabolic Rift) — the soil, water, and energy commons are enclosed and then exhausted — and to 4.5 (Racial Capitalism), since the dispossessed have always been sorted by race.", replace: "The same enclosure exhausts the soil, water, and energy commons of 6.4 (Metabolic Rift), and the dispossessed, as 4.5 (Racial Capitalism) shows, have always been sorted by race." },
  { file: 6, find: "It also connects to 6.9 (The Precariat), whose time poverty is partly the care economy's debt collected from the individual.", replace: "And the debt is collected, in 6.9 (The Precariat), as time poverty — the care economy's bill, presented to the individual." },
  { file: 6, find: "It also connects to 6.2 (Accumulation by Dispossession) — the commons being enclosed here is the nutrient cycle itself — and it grounds the ecological vector that 1.9 (Two-Eyed Seeing) names relationally.", replace: "The commons being enclosed here is the nutrient cycle itself, which ties the lesson to 6.2 (Accumulation by Dispossession) and grounds the ecological vector that 1.9 (Two-Eyed Seeing) names relationally." },
  { file: 6, find: "It also connects to 3.2 (Performativity in Butler's sense) — both descend from Austin's speech acts — and to 1.4 (Map ≠ Territory), whose maps here stop describing and start building the terrain.", replace: "The word descends from Austin's speech acts, as does 3.2 (Performativity in Butler's sense), and the lesson extends 1.4 (Map ≠ Territory): here the maps stop describing and start building the terrain." },
  { file: 6, find: "It also connects to 6.6's neighbors — 6.8 (Surveillance Capitalism) is what advertising platforms do with the data, and 7.5 (Network Effects) is the mechanism that makes the choke point stick.", replace: "Downstream, 6.8 (Surveillance Capitalism) is what advertising platforms do with the data, and 7.5 (Network Effects) is the mechanism that makes the choke point stick." },
  { file: 6, find: "It also connects to 4.2 (Disciplinary Society) — the panopticon here is privatized and predictive — and to 7.4 (Algorithmic Governance), where the prediction products leave the marketplace and enter bail, credit, and welfare decisions.", replace: "The connection to 4.2 (Disciplinary Society) is direct: the panopticon here is privatized and predictive. And in 7.4 (Algorithmic Governance), the prediction products leave the marketplace and enter bail, credit, and welfare decisions." },
  { file: 6, find: "It also connects to 6.3 (Care Economy) — time poverty is partly unpaid care's debt collected at the individual level — and to 7.7 (Liquid Modernity), whose dissolved institutions are the precariat's habitat.", replace: "The tie to 6.3 (Care Economy) is arithmetic: time poverty there is partly unpaid care's debt collected at the individual level. And 7.7 (Liquid Modernity) supplies the habitat — dissolved institutions — in which the precariat lives." },
  { file: 7, find: "It also connects to 6.8 (Surveillance Capitalism) — prediction products leave the marketplace and enter the courthouse — and to 4.2 (Disciplinary Society), whose norm is now computed in real time.", replace: "The thread runs from 6.8 (Surveillance Capitalism), whose prediction products leave the marketplace and enter the courthouse, back to 4.2 (Disciplinary Society), whose norm is now computed in real time." },
  { file: 7, find: "It also connects to 6.8 (Surveillance Capitalism), whose behavioral surplus is the raw material being extracted.", replace: "The raw material being extracted is the behavioral surplus described in 6.8 (Surveillance Capitalism)." },
  { file: 7, find: "It also connects to 6.9 (The Precariat) — precarity is liquidity at the labor-market level — and to 4.10 (Society of Control), whose fluid, unenclosed power is the regime that governs the liquid world.", replace: "The tie to 6.9 (The Precariat) is close: precarity is liquidity at the labor-market level. And 4.10 (Society of Control) supplies the regime — fluid, unenclosed power — that governs the liquid world." },
  { file: 7, find: "It also connects to 2.1 (Predictive Processing) — the human brain and the LLM are both prediction machines, and the difference between their kinds of prediction is one of the deepest open questions in the curriculum — and to 7.6 (Ghost Work), whose hidden labor the parrot's training consumed.", replace: "The comparison with 2.1 (Predictive Processing) is the deepest one available: human brain and LLM are both prediction machines, and the difference between their kinds of prediction is one of the open questions of the curriculum. Behind it stands 7.6 (Ghost Work), whose hidden labor the parrot's training consumed." },
  { file: 8, find: "It also connects to 8.1 (Polycrisis) — the four qualities are what a polycrisis feels like from inside an institution — and to 2.10 (Availability Cascades), since anxiety is partly a media-environment effect.", replace: "The four qualities are what a polycrisis feels like from inside an institution, which ties this lesson to 8.1 (Polycrisis). And anxiety, as 2.10 (Availability Cascades) shows, is partly a media-environment effect." },
  { file: 8, find: "It also connects to 5.3 (Complex Adaptive Systems) — the complex domain is that lesson's territory — and to 8.1 (Polycrisis), which is what happens when multiple complex domains couple.", replace: "The complex domain is 5.3's territory (Complex Adaptive Systems), and a polycrisis — 8.1 — is what happens when multiple complex domains couple." },
  { file: 8, find: "It also connects to 7.1 (Hyperreality) — the both/and is a strategy for living inside the simulacrum — and it prefigures the held oscillation that 8.8 (the capstone) will ask you to practice deliberately.", replace: "The both/and is a strategy for living inside 7.1's simulacrum (Hyperreality), and it prefigures the held oscillation that 8.8 (the capstone) will ask you to practice deliberately." },
  { file: 8, find: "It also connects to 1.1 (Standpoint) — the quadrant check is standpoint theory as a habit — and to 8.4 (Metamodernism), whose both/and sensibility AQAL systematizes into a grid.", replace: "The quadrant check is standpoint theory (1.1) practiced as a habit, and 8.4 (Metamodernism) supplies the both/and sensibility that AQAL systematizes into a grid." },
  { file: 8, find: "It also connects to 4.2 (Disciplinary Society) — the prison is that lesson's original object — and to 6.2 (Accumulation by Dispossession), since abolition asks what the system encloses and what it substitutes for.", replace: "The prison is 4.2's original object (Disciplinary Society), and the question of enclosure — what the system replaces and what it substitutes for — comes from 6.2 (Accumulation by Dispossession)." },
];

const CONTENT_KEYS = [
  "coreClaim",
  "mechanism",
  "canonicalExample",
  "conceptualTension",
  "connectionNode",
  "microPraxis",
  "zeigarnikHook",
] as const;

async function main() {
  const byModule = new Map<number, Fix[]>();
  for (const f of fixes) {
    if (!byModule.has(f.file)) byModule.set(f.file, []);
    byModule.get(f.file)!.push(f);
  }
  // Ensure modules that only have hook rewrites are also processed.
  for (const code of Object.keys(hookRewrites)) {
    const m = parseInt(code.split(".")[0], 10);
    if (!byModule.has(m)) byModule.set(m, []);
  }

  let applied = 0;
  let failed = 0;

  for (const [mod, modFixes] of byModule) {
    const path = `scripts/out/en/lessons-modules-${mod}.json`;
    const data = (await Bun.file(path).json()) as Record<
      string,
      { lessonCode: string; content: Record<string, string> }
    >;

    // Hook rewrites: full replacement of zeigarnikHook by lesson code.
    for (const [code, hook] of Object.entries(hookRewrites)) {
      const modNum = parseInt(code.split(".")[0], 10);
      if (modNum !== mod) continue;
      if (!data[code]) {
        console.error(`MISS hook ${code} in module ${mod}`);
        failed++;
        continue;
      }
      if (data[code].content.zeigarnikHook === hook) continue; // already applied
      data[code].content.zeigarnikHook = hook;
      applied++;
    }

    // find/replace fixes across all content fields; each must match exactly once
    for (const fix of modFixes) {
      let hits = 0;
      for (const entry of Object.values(data)) {
        for (const k of CONTENT_KEYS) {
          const val = entry.content[k];
          if (val && val.includes(fix.find!)) hits++;
        }
      }
      if (hits !== 1) {
        console.error(`MISS (${hits} hits) module ${mod}: "${fix.find!.slice(0, 60)}..."`);
        failed++;
        continue;
      }
      for (const entry of Object.values(data)) {
        for (const k of CONTENT_KEYS) {
          const val = entry.content[k];
          if (val && val.includes(fix.find!)) {
            entry.content[k] = val.replace(fix.find!, fix.replace!);
          }
        }
      }
      applied++;
    }

    await Bun.write(path, JSON.stringify(data, null, 2) + "\n");
  }

  console.log(`Applied ${applied} fixes, ${failed} failures.`);
  if (failed > 0) process.exit(1);
}

main();
