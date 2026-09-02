// Authored gist-comprehension quizzes, one per lesson (76 total).
// English is the source of truth; Castellano mirror lives in quiz-content-es.ts.

export interface ComprehensionMCQ {
  question: string;
  options: [string, string, string, string];
  answerIndex: 0 | 1 | 2 | 3;
  explanation: string;
}

export const LESSON_QUIZ: Record<string, ComprehensionMCQ> = {

  // ═══════════════════════════════════════════════════════════════════
  // MODULE — 1 — Positionality, Epistemics & The Real
  // ═══════════════════════════════════════════════════════════════════

  "1.1": {
    question: "What is the lesson's core claim about knowledge?",
    options: [
      "All knowledge is situated; marginalized standpoints reveal what dominant ones miss.",
      "Objectivity means adopting a neutral perspective detached from social position.",
      "All perspectives are equally valid, so no knowledge claim can be criticized.",
      "Knowledge improves as researchers eliminate every trace of social location.",
    ],
    answerIndex: 0,
    explanation: "Harding and Haraway reject the 'view from nowhere': every claim emerges from a standpoint, and marginalized positions often see what dominant ones are organized to miss.",
  },

  "1.2": {
    question: "How does Kuhn describe scientific progress?",
    options: [
      "Science advances by steadily accumulating confirmed facts within one framework.",
      "Science advances through ruptures: anomalies pile up until a paradigm crashes and is replaced.",
      "Science advances by falsifying single hypotheses one experiment at a time.",
      "Science advances by merging rival theories into ever-larger syntheses.",
    ],
    answerIndex: 1,
    explanation: "Normal science defends the paradigm; accumulating anomalies force crisis and a gestalt-style shift to a new paradigm — not linear accumulation of facts.",
  },

  "1.3": {
    question: "What does Foucault mean by an era's 'episteme'?",
    options: [
      "The officially taught science curriculum of a historical period.",
      "The list of discoveries a century is most famous for.",
      "An invisible historical a priori defining what can count as knowledge at all.",
      "The moral values that govern how scientists treat one another.",
    ],
    answerIndex: 2,
    explanation: "The episteme is the deep, unspoken framework of an age that determines which objects, methods, and statements are legitimate before any theory begins.",
  },

  "1.4": {
    question: "According to the lesson, when do maps become dangerous?",
    options: [
      "When they are drawn at too small a scale to be useful.",
      "When they are owned by institutions with vested interests.",
      "When they contain factual errors about the terrain they depict.",
      "When we forget they are abstractions and treat them as the territory.",
    ],
    answerIndex: 3,
    explanation: "Korzybski's point is not that models are bad but that abstraction always omits; the failure mode is mistaking the map for the territory itself.",
  },

  "1.5": {
    question: "What is the Bayesian view of knowledge and belief?",
    options: [
      "Beliefs should be held firmly until evidence is beyond all doubt.",
      "Certainty is the goal that good reasoning progressively achieves.",
      "Beliefs are probabilities — priors revised by evidence; certainty is a red flag.",
      "Beliefs are binary: a claim is either known or unknown.",
    ],
    answerIndex: 2,
    explanation: "The lesson frames knowledge as probabilistic updating: evidence shifts credences, and treating any belief as certain signals epistemic failure, not success.",
  },

  "1.6": {
    question: "What limit does Lakatos identify in Popper's falsificationism?",
    options: [
      "Falsified theories should never be abandoned, only refined.",
      "Most scientific claims are unfalsifiable and therefore worthless.",
      "Experiments can never decide between two rival theories.",
      "Research programs shield their core with auxiliary hypotheses, so simple falsification fails.",
    ],
    answerIndex: 3,
    explanation: "Scientists patch a threatened core with auxiliary assumptions, so theories rarely die from a single anomaly — Popper's criterion is too simple on its own.",
  },

  "1.7": {
    question: "What does the underdetermination thesis claim?",
    options: [
      "The same evidence can fit multiple incompatible theories; values fill the gap.",
      "Better evidence always eventually determines which theory is true.",
      "Theories are determined entirely by the data they must explain.",
      "Incompatible theories can never account for the same observations.",
    ],
    answerIndex: 0,
    explanation: "Duhem and Quine showed evidence alone cannot pick between rival theories; extra-evidential factors — values, power — do the remaining selecting.",
  },

  "1.8": {
    question: "What is required for interpretation, per the hermeneutic circle?",
    options: [
      "A mind emptied of prior commitments so the text can speak for itself.",
      "Prior understanding — we always interpret from an inherited historical horizon.",
      "A strictly literal reading that avoids any larger context of meaning.",
      "Authorial intent recovered through careful historical detective work.",
    ],
    answerIndex: 1,
    explanation: "Heidegger and Gadamer argue understanding is circular: we grasp parts through a pre-given whole, and interpretation never starts from zero.",
  },

  "1.9": {
    question: "How do Indigenous relational epistemologies view knowledge?",
    options: [
      "As universal principles detached from any particular place or people.",
      "As relational and placed — land and community are knowledge's substrate.",
      "As private intuition that resists communal verification.",
      "As inferior to formal methods and useful mainly as cultural heritage.",
    ],
    answerIndex: 1,
    explanation: "For Marshall & Marshall, Battiste, and Wilson, knowing entails responsibilities to land and relations; place is not context for knowledge but its ground.",
  },

  "1.10": {
    question: "What does critical realism say science explains?",
    options: [
      "Underlying generative mechanisms, not just observed regularities.",
      "Patterns among observations, because that is all reality contains.",
      "Events exactly as they appear to everyday experience.",
      "Only what can be measured; talk of mechanisms is metaphysics.",
    ],
    answerIndex: 0,
    explanation: "Bhaskar stratifies reality into Real (mechanisms), Actual (events), and Empirical (experience); science succeeds by uncovering hidden generative mechanisms.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // MODULE — 2 — The Knowing Body
  // ═══════════════════════════════════════════════════════════════════

  "2.1": {
    question: "In predictive processing, what is the brain's core operation?",
    options: [
      "Passively recording sensory input as it arrives.",
      "Waiting for stimuli before building any model of the world.",
      "Amplifying incoming signals to maximize sensory detail.",
      "Generating predictions and updating them to minimize prediction error.",
    ],
    answerIndex: 3,
    explanation: "Friston and Clark cast perception as hypothesis-testing: the brain proposes predictions about the causes of input and revises them when errors accumulate.",
  },

  "2.2": {
    question: "What does the 4E approach claim about body and environment?",
    options: [
      "They transmit information to a brain that does its thinking alone.",
      "They are irrelevant once cognition is modeled computationally.",
      "They are constitutive of thought — the mind extends beyond the skull.",
      "They matter only for motor skills, not for reasoning or concepts.",
    ],
    answerIndex: 2,
    explanation: "Embodied, Embedded, Enacted, Extended: cognition is made of body-world loops, so the environment partly is the mind, not a mere vehicle for it.",
  },

  "2.3": {
    question: "According to polyvagal theory, what enables higher cognition?",
    options: [
      "Strong sympathetic arousal that sharpens attention.",
      "Suppressing autonomic signals so the cortex can work undisturbed.",
      "Dorsal vagal shutdown that quiets competing distractions.",
      "A regulated state of safety, anchored by the ventral vagal system.",
    ],
    answerIndex: 3,
    explanation: "Porges's hierarchy runs ventral vagal → sympathetic → dorsal vagal; only from a perception of safety can social engagement and complex thought proceed.",
  },

  "2.4": {
    question: "What role does affect play in the lesson's account of power?",
    options: [
      "Affect is a private feeling that power leaves entirely untouched.",
      "Affect is the conscious emotion through which power openly argues.",
      "Pre-personal affect shapes thought and lets power circulate below awareness.",
      "Affect matters only after political beliefs are consciously formed.",
    ],
    answerIndex: 2,
    explanation: "Massumi and Ahmed treat affect as intensity preceding emotion; because it operates pre-reflectively, power captures bodies before conscious judgment begins.",
  },

  "2.5": {
    question: "What is the lesson's central claim about the two systems of thinking?",
    options: [
      "Deliberate System 2 runs most decisions; fast System 1 handles emergencies.",
      "Fast, automatic System 1 dominates; effortful System 2 is used far less than we believe.",
      "Both systems fire equally often, so reasoning quality is a coin flip.",
      "System 1 can be trained into a reliable logician with enough practice.",
    ],
    answerIndex: 1,
    explanation: "Kahneman's key point: deliberate reasoning is metabolically costly, so automatic intuition does most cognitive work while we mistake its outputs for reflection.",
  },

  "2.6": {
    question: "How do humans actually decide, according to bounded rationality?",
    options: [
      "They satisfice — picking good-enough options under real constraints.",
      "They optimize by weighing every alternative to its maximum value.",
      "They decide randomly whenever options exceed a small handful.",
      "They delegate all hard choices to social norms and habit.",
    ],
    answerIndex: 0,
    explanation: "Simon argued cognitive and temporal limits make exhaustive optimization impossible; people search until an option clears an acceptability threshold.",
  },

  "2.7": {
    question: "What does research on motivated reasoning conclude?",
    options: [
      "Reasoning usually defends conclusions we have already reached emotionally.",
      "Reasoning reliably corrects the emotional intuitions that started it.",
      "Emotion and reason occupy separate, non-interfering mental channels.",
      "Only politically biased people rationalize; experts reason neutrally.",
    ],
    answerIndex: 0,
    explanation: "Festinger and Haidt flip the folk model: dissonance is resolved by rationalization, so rationality is the rare exception, not the default.",
  },

  "2.8": {
    question: "Where does the self come from, on the narrative account?",
    options: [
      "From a fixed inner essence waiting to be discovered.",
      "From stories we tell and revise — identity is constructed in time.",
      "From biological drives that narratives merely decorate.",
      "From social roles we play without any authorship.",
    ],
    answerIndex: 1,
    explanation: "Ricoeur and McAdams hold the self is not found but made: identity is an ongoing story, revised under pressure, that organizes memory and action.",
  },

  "2.9": {
    question: "What does the doctrine of anatta assert about the self?",
    options: [
      "A permanent soul survives change by observing it from within.",
      "The self is an illusion with no explanatory basis whatsoever.",
      "The self is a changing aggregate of five processes, none a permanent 'I.'",
      "The self is real but hidden beneath the five aggregates.",
    ],
    answerIndex: 2,
    explanation: "Early Buddhism analyzes persons into form, sensation, perception, formations, and consciousness — dynamic, interdependent, and none constituting a lasting self.",
  },

  "2.10": {
    question: "What makes availability cascades exploitable?",
    options: [
      "People accurately track how often events actually occur.",
      "Ease of recall only affects trivial judgments, not risk perception.",
      "Institutions require memorable examples before acting on data.",
      "We judge probability by ease of recall, which media can manufacture.",
    ],
    answerIndex: 3,
    explanation: "Tversky, Kuran, and Sunstein: cognitive ease of recall stands in for frequency, so amplified examples cascade into distorted collective perceptions of risk.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // MODULE — 3 — The Social Fabric
  // ═══════════════════════════════════════════════════════════════════

  "3.1": {
    question: "What is the dialectic by which institutions shape their makers?",
    options: [
      "Institutions reflect pre-existing human nature without changing it.",
      "Institutions serve individuals, who can exit them at any will.",
      "Humans create institutions, which objectify and then constrain them.",
      "Institutions arise spontaneously, requiring no human activity at all.",
    ],
    answerIndex: 2,
    explanation: "Berger and Luckmann's triad — externalization, objectivation, internalization — explains how human products congeal into an apparently objective social world.",
  },

  "3.2": {
    question: "How does performativity understand gender?",
    options: [
      "As an inner essence that outward behavior reliably expresses.",
      "As a biological given that culture at most accents.",
      "As a purely personal choice renewed each morning without constraint.",
      "As produced through stylized repetition of acts, not expressed from within.",
    ],
    answerIndex: 3,
    explanation: "Following Austin, Butler argues identity is constituted by citational performance — the acts bring the category into being rather than reveal a pre-existing core.",
  },

  "3.3": {
    question: "What does social reproduction theory say about unpaid care labor?",
    options: [
      "It is foundational — capitalism depends on it to reproduce the workforce.",
      "It is marginal to capitalism and shrinking as markets expand.",
      "It is fully priced into wages once households are counted.",
      "It will be eliminated by automation within a generation.",
    ],
    answerIndex: 0,
    explanation: "Federici and Fraser show the daily and generational renewal of labor power rests on unpaid, gendered domestic work — a condition of capitalism, not a leftover.",
  },

  "3.4": {
    question: "How does class transmit across generations, for Bourdieu?",
    options: [
      "Mainly through explicit rules taught in schools.",
      "Through habitus — embodied dispositions navigating structured fields.",
      "Through genetic inheritance of ability and temperament.",
      "Through conscious conspiracies among economic elites.",
    ],
    answerIndex: 1,
    explanation: "Internalized dispositions — taste, gesture, bearing — act as embodied capital within competitive fields, reproducing class, race, and gender without explicit instruction.",
  },

  "3.5": {
    question: "According to Girard, where does desire originate?",
    options: [
      "In spontaneous individual preferences discovered by introspection.",
      "In imitation — we desire what others desire, leading to scapegoating.",
      "In rational calculation of expected future satisfaction.",
      "In innate needs fixed by our species' biology.",
    ],
    answerIndex: 1,
    explanation: "Desire is triangular and contagious; converging rivalries build violence that resolves when a scapegoat absorbs it, restoring temporary cohesion.",
  },

  "3.6": {
    question: "What is Gramsci's point about 'common sense'?",
    options: [
      "It is a political achievement — a ruling worldview made to feel natural.",
      "It is the shared wisdom all classes spontaneously agree upon.",
      "It is the residue of scientific consensus among credentialed experts.",
      "It is irrelevant to how dominant groups maintain their power.",
    ],
    answerIndex: 0,
    explanation: "Hegemony rules through consent: the dominant class's worldview is naturalized as 'common sense,' making coercion largely unnecessary.",
  },

  "3.7": {
    question: "How does moral foundations theory explain political disagreement?",
    options: [
      "As a failure of education that better schooling would fix.",
      "As irrationality rooted in low cognitive ability.",
      "As noise that vanishes once everyone agrees on the facts.",
      "As cross-paradigmatic conflict between different moral modules.",
    ],
    answerIndex: 3,
    explanation: "Care, fairness, loyalty, authority, sanctity, and liberty are weighted differently across cultures and parties, so opponents reason from different foundations rather than badly.",
  },

  "3.8": {
    question: "How are solidarity and the sacred produced, per Durkheim?",
    options: [
      "Through doctrinal agreement on shared theological propositions.",
      "Through rational deliberation that arrives at common conclusions.",
      "Through ritual: synchronized bodies and shared emotional energy.",
      "Through fear of punishment enforced by a central authority.",
    ],
    answerIndex: 2,
    explanation: "Ritual assembly generates collective effervescence — synchrony and emotional contagion that charge certain things with sacredness and bind groups affectively.",
  },

  "3.9": {
    question: "What does actor-network theory claim about agency?",
    options: [
      "Only humans with intentions can properly be said to act.",
      "Society shapes technology, but technology never shapes society.",
      "Agency belongs to individuals; structures merely constrain it.",
      "Agency is distributed across networks of humans and non-humans.",
    ],
    answerIndex: 3,
    explanation: "Latour and Callon trace action through heterogeneous networks — microbes, laws, algorithms co-produce outcomes, so 'the social' is never exclusively human.",
  },

  "3.10": {
    question: "What does the Overton window concept emphasize?",
    options: [
      "Public opinion moves only through gradual generational turnover.",
      "The sayable is fixed by constitutional law and legal precedent.",
      "The range of sayable positions is deliberately shifted by coordinated actors.",
      "Politicians personally dictate what the public is allowed to think.",
    ],
    answerIndex: 2,
    explanation: "The boundaries of acceptable discourse are movable artifacts of institutional pressure, media amplification, and mimetic contagion — not natural limits.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // MODULE — 4 — Power & Its Architectures
  // ═══════════════════════════════════════════════════════════════════

  "4.1": {
    question: "What is the relation between power and knowledge in Foucault?",
    options: [
      "Knowledge accumulates first; power merely applies it later.",
      "They are co-constitutive — discourse produces its objects of knowledge.",
      "Power corrupts knowledge, which is pure before politics touches it.",
      "Knowledge is independent of power wherever science is practiced.",
    ],
    answerIndex: 1,
    explanation: "Discourse determines what can be said, by whom, and in what context — producing the very objects it studies, so power/knowledge is one apparatus.",
  },

  "4.2": {
    question: "How does disciplinary power produce docile bodies?",
    options: [
      "Via surveillance and normalization — the internalized Panopticon.",
      "Via spectacular public punishments that deter the watching crowd.",
      "Via explicit laws that people knowingly obey or violate.",
      "Via economic incentives offered by employers and markets.",
    ],
    answerIndex: 0,
    explanation: "The possibility of being watched makes discipline self-enforcing; the statistical norm defines deviation as pathology, training bodies without overt force.",
  },

  "4.3": {
    question: "What is distinctive about biopower as a mode of rule?",
    options: [
      "It manages life itself — populations, health, reproduction, statistically.",
      "It commands territory through military occupation alone.",
      "It disciplines individual bodies only inside prisons.",
      "It operates solely in moments of declared emergency.",
    ],
    answerIndex: 0,
    explanation: "Foucault's biopower works on the species-body through statistics and regulation, while Agamben's state of exception exposes bare life to sovereign decision.",
  },

  "4.4": {
    question: "What does Mbembe identify as sovereignty's ultimate expression?",
    options: [
      "The capacity to tax and redistribute national wealth.",
      "The power to decide who may live and who is left to die.",
      "The authority to define citizenship and its obligations.",
      "The monopoly on legitimate violence within state borders.",
    ],
    answerIndex: 1,
    explanation: "Necropolitics extends Foucault into colonial and postcolonial space: sovereignty is exercised as the dictating of whose lives are expendable.",
  },

  "4.5": {
    question: "What is the relation between capitalism and race, per Robinson?",
    options: [
      "Capitalism gradually eroded pre-modern racial prejudices.",
      "Race entered capitalism only through later immigration politics.",
      "Capitalism emerged from racial hierarchy and still requires it.",
      "Race and capitalism are separate systems that occasionally intersect.",
    ],
    answerIndex: 2,
    explanation: "Robinson argues capitalism did not become racist — it was born of racial hierarchies and continually reproduces them; race is structural, not incidental.",
  },

  "4.6": {
    question: "What does 'coloniality of power' name?",
    options: [
      "The official colonial administrations that survived decolonization.",
      "Economic aid flows from former colonies to imperial centers.",
      "The period of direct political rule ending in the twentieth century.",
      "A surviving global matrix privileging Eurocentric knowledge and labor classifications.",
    ],
    answerIndex: 3,
    explanation: "Quijano and Mignolo: colonialism ended as administration but persists as coloniality — hierarchies of epistemology, race, and labor that outlive formal empire.",
  },

  "4.7": {
    question: "What is the lesson's core claim about settler colonialism?",
    options: [
      "It ended with treaty-making and should be studied as history.",
      "It exploits labor like other colonialisms, only more intensely.",
      "It is a structure, not an event — its logic is elimination of the native.",
      "It is primarily a cultural attitude rather than a land-based system.",
    ],
    answerIndex: 2,
    explanation: "Wolfe's formula — invasion is a structure — marks a logic of elimination operating through land and sovereignty, persisting into the present.",
  },

  "4.8": {
    question: "How do axes of power combine, in Crenshaw's intersectionality?",
    options: [
      "Additively — each axis contributes a fixed amount of disadvantage.",
      "Sequentially — one axis dominates during each life stage.",
      "Independently — the axes never interact within a single life.",
      "Multiplicatively — intersections create qualitatively distinct positions.",
    ],
    answerIndex: 3,
    explanation: "Race, class, gender, and sexuality are co-constitutive: their intersection produces experiences that cannot be read off any single axis, so no simple addition.",
  },

  "4.9": {
    question: "What does Debord mean by the society of the spectacle?",
    options: [
      "Lived experience is replaced by its representation; the image generates the event.",
      "Mass entertainment distracts from politics that continues unchanged.",
      "Visual culture has made societies more honest about themselves.",
      "Advertising merely reflects desires that existed prior to it.",
    ],
    answerIndex: 0,
    explanation: "In late capitalism the spectacle mediates social life: authenticity itself becomes a commodity, and the image precedes and produces the event it depicts.",
  },

  "4.10": {
    question: "How does Deleuze's society of control differ from discipline?",
    options: [
      "It centralizes power in prisons, schools, and factories.",
      "It modulates continuously and algorithmically — the password replaces the wall.",
      "It relies on visible sovereign violence to maintain order.",
      "It has abandoned surveillance in favor of pure self-employment.",
    ],
    answerIndex: 1,
    explanation: "Post-disciplinary power is continuous and modulated: codes, credentials, and scores govern flows in real time rather than enclosing bodies in institutions.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // MODULE — 5 — Systems & Complexity
  // ═══════════════════════════════════════════════════════════════════

  "5.1": {
    question: "Why can't a system's behavior be predicted from its parts alone?",
    options: [
      "Because measurement error accumulates across the components.",
      "Because stocks, flows, and feedback loops generate irreducible behavior.",
      "Because systems are too random for any pattern to exist.",
      "Because components refuse to interact without central control.",
    ],
    answerIndex: 1,
    explanation: "Meadows: system behavior arises from structure — stocks, flows, and feedback — so the whole exhibits dynamics no isolated component contains.",
  },

  "5.2": {
    question: "What does emergence mean in systems theory?",
    options: [
      "System-level properties that cannot be reduced to component descriptions.",
      "New parts appearing when a system grows past a size threshold.",
      "The gradual improvement of systems through engineering effort.",
      "Designers adding features that components lacked individually.",
    ],
    answerIndex: 0,
    explanation: "Reinforcing loops amplify and balancing loops stabilize; their interplay yields emergent properties — real at the system level, absent at the component level.",
  },

  "5.3": {
    question: "Why do complex adaptive systems resist top-down control?",
    options: [
      "Because their components lack any capacity to respond.",
      "Because central planners lack sufficient computing power.",
      "Because they obey natural laws no one has yet formalized.",
      "Because adaptive agents keep changing the landscape the rules apply to.",
    ],
    answerIndex: 3,
    explanation: "Holland: agents adapt to each other and the fitness landscape, generating order without a designer and outmaneuvering interventions that assume fixed behavior.",
  },

  "5.4": {
    question: "How does panarchy interpret collapse?",
    options: [
      "As the terminal failure that adaptive management must prevent.",
      "As proof that the system was never resilient to begin with.",
      "As a creative-destructive phase enabling reorganization and renewal.",
      "As an anomaly confined to natural, not social, systems.",
    ],
    answerIndex: 2,
    explanation: "Holling's adaptive cycle — growth, conservation, release, reorganization — makes collapse a generative phase; resilience is the capacity to keep cycling.",
  },

  "5.5": {
    question: "What is the lesson's claim about planetary boundaries?",
    options: [
      "They are strict limits nature imposes with exactly known thresholds.",
      "They have been defined scientifically but none has yet been crossed.",
      "Six or more of nine have been breached; Holocene stability is ending.",
      "They apply to local ecosystems but not to the Earth system.",
    ],
    answerIndex: 2,
    explanation: "Rockström and Steffen define nine biophysical processes framing a safe operating space; multiple breaches mean the stable Holocene that enabled civilization is over.",
  },

  "5.6": {
    question: "What makes something a hyperobject, in Morton's sense?",
    options: [
      "It is a single enormous object, like a supercluster of galaxies.",
      "It is an object too small for any instrument to detect.",
      "It is a mathematical abstraction with no physical reality.",
      "It is so vast in time and space that it defeats local comprehension.",
    ],
    answerIndex: 3,
    explanation: "Climate change, microplastics: massively distributed entities we are inside of, which can never be fully seen, pointed at, or delimited from any local view.",
  },

  "5.7": {
    question: "What does dependent origination claim about phenomena?",
    options: [
      "Nothing exists independently; all arises through interdependent relations.",
      "Phenomena possess essences that relations merely modify.",
      "Only causally first events truly exist; the rest are derivative.",
      "Existence and non-existence are equally meaningless claims.",
    ],
    answerIndex: 0,
    explanation: "Nāgārjuna: no entity has svabhāva — inherent existence; emptiness means everything exists relationally, which is plenitude, not nihilism.",
  },

  "5.8": {
    question: "What does path dependency assert about systems?",
    options: [
      "Initial conditions wash out as systems approach efficiency.",
      "Systems remember: past choices constrain and persist into futures.",
      "History repeats exactly because systems have no memory.",
      "Recovery retraces the same path by which the collapse occurred.",
    ],
    answerIndex: 1,
    explanation: "QWERTY and fossil infrastructure show suboptimal solutions locking in; hysteresis means the way back is not the way in — history shapes possibility.",
  },

  "5.9": {
    question: "What does reflexivity mean in markets and social science?",
    options: [
      "Observers adjust their methods until measurement error disappears.",
      "Observation feeds back: descriptions help produce what they describe.",
      "Subjects behave identically whether or not they are being studied.",
      "Researchers must remain unaware of their own theoretical priors.",
    ],
    answerIndex: 1,
    explanation: "Soros and Bourdieu: observers participate in what they observe, so market narratives and social classifications are self-fulfilling rather than neutral mirrors.",
  },

  "5.10": {
    question: "What is the lesson's claim about rare, high-impact events?",
    options: [
      "They are systematically underestimated — and antifragility gains from them.",
      "They can be forecast accurately with enough historical data.",
      "They average out over time and can be safely ignored in planning.",
      "They matter only in finance, not in social or natural systems.",
    ],
    answerIndex: 0,
    explanation: "Taleb: black swans defy bell-curve confidence, so the goal shifts from withstanding volatility to building systems that benefit from disorder.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // MODULE — 6 — The Political Economy
  // ═══════════════════════════════════════════════════════════════════

  "6.1": {
    question: "What does the lesson say neoliberalism ultimately is?",
    options: [
      "A fiscal policy package of tax cuts and deregulation.",
      "A temporary political era that began in the 1980s.",
      "A moral doctrine confined to economic institutions.",
      "An ontology: competition as the universal metric of human worth.",
    ],
    answerIndex: 3,
    explanation: "Beyond policy, neoliberal rationality remodels all social relations as enterprise and competition — a norm of personhood, not just a market program.",
  },

  "6.2": {
    question: "What does Harvey mean by accumulation by dispossession?",
    options: [
      "Workers lose wages when firms relocate to cheaper regions.",
      "Colonial-era land seizures that ended with decolonization.",
      "Continuous enclosure of commons — land, knowledge, attention — for capital.",
      "Individuals dispossessing themselves voluntarily through debt.",
    ],
    answerIndex: 2,
    explanation: "Primitive accumulation never ended: assets held in common are continuously enclosed and capitalized, from water and genomes to the attention economy.",
  },

  "6.3": {
    question: "How does capitalism treat reproductive and care labor?",
    options: [
      "It prices it accurately through demand for care services.",
      "It has fully socialized it through public childcare systems.",
      "It rewards it increasingly well as populations age.",
      "It externalizes it onto women and the Global South as invisible subsidy.",
    ],
    answerIndex: 3,
    explanation: "Federici and Folbre: childcare, eldercare, and emotional work sustain the workforce while staying economically uncounted — the hidden foundation of market economies.",
  },

  "6.4": {
    question: "What is the 'metabolic rift,' in Marx and Foster's sense?",
    options: [
      "A temporary imbalance that market prices eventually correct.",
      "A psychological split between humanity and outdoor life.",
      "A structural break in nutrient and energy cycles between society and nature.",
      "The gap between scientific ecology and public understanding.",
    ],
    answerIndex: 2,
    explanation: "Capital organizes a rupture in Earth's material cycles — soil nutrients flow to cities as waste — making thermodynamic exhaustion a feature, not a bug.",
  },

  "6.5": {
    question: "What does performative economics claim about economic models?",
    options: [
      "Good models converge on the markets that already exist.",
      "Models produce the markets they describe — theory is intervention.",
      "Models fail wherever human behavior departs from rationality.",
      "Models describe economies exactly as telescopes describe planets.",
    ],
    answerIndex: 1,
    explanation: "MacKenzie and Callon: Black-Scholes did not mirror the derivatives market — it created it, economics making its object rather than finding it.",
  },

  "6.6": {
    question: "What is the core business model of platforms, per Srnicek?",
    options: [
      "Enclosure — extracting and monopolizing data as raw material.",
      "Exchange — matching buyers and sellers for transparent commissions.",
      "Service — selling software licenses to enterprise customers.",
      "Advertising — renting attention without touching user data itself.",
    ],
    answerIndex: 0,
    explanation: "Platforms are digital infrastructure whose asset is data: their logic is to enclose interactions and monopolize the extracted raw material, not to enable exchange.",
  },

  "6.7": {
    question: "What distinguishes techno-feudal extraction, for Varoufakis?",
    options: [
      "Cloud rent charged on transactions inside proprietary digital fiefdoms.",
      "Profits from producing goods more cheaply than rivals can.",
      "Interest charged on loans to small digital businesses.",
      "Wages paid to gig workers contracted through mobile apps.",
    ],
    answerIndex: 0,
    explanation: "Markets give way to fiefdoms: big platforms do not mainly sell in markets — they collect rent from all commerce that traverses their cloud territory.",
  },

  "6.8": {
    question: "What does surveillance capitalism do with human experience?",
    options: [
      "Archives it respectfully to improve personalized services.",
      "Extracts it as raw material for prediction products sold to shape behavior.",
      "Monetizes it only with the informed consent of its originators.",
      "Uses it to build public goods returned to the community.",
    ],
    answerIndex: 1,
    explanation: "Zuboff: behavioral data is rendered into predictions sold in behavioral-futures markets — the self becomes a free resource for others' profit.",
  },

  "6.9": {
    question: "How does the lesson characterize precarity?",
    options: [
      "A transitional stage on the way to stable employment.",
      "A lifestyle choice made by digitally mobile workers.",
      "The contemporary labor regime itself, not an aberration.",
      "A problem confined to informal economies of the Global South.",
    ],
    answerIndex: 2,
    explanation: "Standing and Fraser define the precariat by what it lacks — security, identity, predictable time, voice — and locate precarity at the center of the labor regime.",
  },

  "6.10": {
    question: "What does the doughnut framework define as the economic goal?",
    options: [
      "Maximizing growth until all social needs are fully funded.",
      "Substituting well-being metrics for all ecological accounting.",
      "Balancing GDP growth against unemployment year by year.",
      "Meeting social needs within the ecological ceiling — beyond growth.",
    ],
    answerIndex: 3,
    explanation: "Raworth places the economy between a social foundation and planetary boundaries; treating growth as the terminal goal is empirically false and ecologically fatal.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // MODULE — 7 — The Digital Condition
  // ═══════════════════════════════════════════════════════════════════

  "7.1": {
    question: "What is the lesson's claim about simulation and the real?",
    options: [
      "Simulation imitates reality with increasing but imperfect fidelity.",
      "Reality eventually reasserts itself against media fabrications.",
      "Simulation precedes and generates the real — the image is the event.",
      "The real and the simulated remain clearly distinguishable in principle.",
    ],
    answerIndex: 2,
    explanation: "Baudrillard: signs no longer refer to a prior reality but produce it, so post-truth is not a breakdown but the normal ontological condition.",
  },

  "7.2": {
    question: "What is the crucial difference between epistemic bubbles and echo chambers?",
    options: [
      "Bubbles exist online; echo chambers exist only offline.",
      "Echo chambers are harmless; bubbles cause serious polarization.",
      "There is none — the two terms describe the same phenomenon.",
      "Bubbles lack information; echo chambers actively discredit outside sources.",
    ],
    answerIndex: 3,
    explanation: "Nguyen: exposure fixes a bubble, because it is mere omission; echo chambers inoculate members against outside epistemic trust, so exposure alone fails.",
  },

  "7.3": {
    question: "How does cultural evolution proceed, on the memetic view?",
    options: [
      "By differential fitness of ideas competing for cognitive hosts.",
      "By rational selection of the most accurate beliefs.",
      "By deliberate design decisions of cultural institutions.",
      "By genetic inheritance of learned social tendencies.",
    ],
    answerIndex: 0,
    explanation: "Dawkins and Blackmore treat ideas as replicators whose spread depends on catchiness, not truth — human attention is the contested resource.",
  },

  "7.4": {
    question: "What happens when algorithms allocate bail, credit, and welfare?",
    options: [
      "Human oversight usually removes the biases present in the data.",
      "Structural bias is automated, hidden in complexity, and unaccountable.",
      "They consistently outperform human officials on fairness metrics.",
      "They remain neutral as long as the underlying code is open source.",
    ],
    answerIndex: 1,
    explanation: "'Code is law': automated decisions launder historical bias through technical opacity, making discrimination harder to see, contest, or remedy.",
  },

  "7.5": {
    question: "Why do digital markets concentrate into winner-take-all?",
    options: [
      "Because consumers irrationally prefer the most famous brands.",
      "Because preferential attachment is the topology of scale-free networks.",
      "Because regulators fail to enforce antitrust law strictly enough.",
      "Because software costs rise faster than revenue at any scale.",
    ],
    answerIndex: 1,
    explanation: "Barabási: value grows with connections, so the connected gain more connections — concentration is inherent network topology, not a market accident.",
  },

  "7.6": {
    question: "What does the lesson identify beneath seamless automation?",
    options: [
      "Extracted Global South data and invisible click-worker labor.",
      "Fully autonomous systems that require no human inputs.",
      "Open-source communities volunteering time equally worldwide.",
      "Local workers paid premium wages for oversight roles.",
    ],
    answerIndex: 0,
    explanation: "Couldry, Mejias, Gray, and Suri: AI is built on appropriated data from the majority world and maintained by hidden ghost workers whom automation conceals.",
  },

  "7.7": {
    question: "What has happened to stable structures in liquid modernity?",
    options: [
      "They have been reinforced in response to global uncertainty.",
      "They persist but have become more affordable and accessible.",
      "They transferred intact from institutions to extended families.",
      "They dissolved into transient, individually managed risk and anxiety.",
    ],
    answerIndex: 3,
    explanation: "Bauman: careers, institutions, and identities liquefy; structural problems are privatized as personal anxiety that individuals must manage alone.",
  },

  "7.8": {
    question: "What is the lesson's core claim about large language models?",
    options: [
      "They understand text the way humans do, only much faster.",
      "They retrieve stored documents that humans wrote earlier.",
      "They generate statistically plausible output without understanding.",
      "They reason formally and thus avoid their training data's biases.",
    ],
    answerIndex: 2,
    explanation: "Bender and Gebru: LLMs are high-dimensional pattern matchers over human text; the shift from retrieval to generation reshapes epistemic infrastructure itself.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // MODULE — 8 — Synthesis & Praxis
  // ═══════════════════════════════════════════════════════════════════

  "8.1": {
    question: "What defines a polycrisis, as opposed to separate crises?",
    options: [
      "A single crisis so severe it crowds out all other concerns.",
      "Several crises that merely coincide in time by chance.",
      "A crisis that repeats in cycles across the generations.",
      "Causally entangled crises sharing roots, exceeding their sum.",
    ],
    answerIndex: 3,
    explanation: "Tooze and Morin: the crises interpenetrate and amplify one another, so treating them as separate problems with separate solutions misses their generative common roots.",
  },

  "8.2": {
    question: "What does BANI add over VUCA, diagnostically?",
    options: [
      "It replaces analysis with four standard steps of crisis response.",
      "It predicts which crisis will arrive first and hit hardest.",
      "It renames conditions more precisely: brittle, anxious, non-linear, incomprehensible.",
      "It applies only to organizations, not to whole societies.",
    ],
    answerIndex: 2,
    explanation: "Cascio's upgrade: the environment is not just uncertain but brittle, not just volatile but anxious — and each renamed condition changes which responses make sense.",
  },

  "8.3": {
    question: "What is the central warning of the Cynefin framework?",
    options: [
      "All situations become clear once sufficient data is gathered.",
      "Applying the wrong domain's approach is worse than applying none.",
      "Leaders should default to chaotic-domain improvisation everywhere.",
      "Complexity is a myth used to excuse poor planning.",
    ],
    answerIndex: 1,
    explanation: "Snowden: clear, complicated, complex, and chaotic domains demand different epistemics; misreading the domain — treating complex as complicated — breeds catastrophe.",
  },

  "8.4": {
    question: "What cultural stance does metamodernism describe?",
    options: [
      "Oscillation between modernist sincerity and postmodern irony, aware of both.",
      "A return to premodern certainties after postmodern skepticism.",
      "A settled synthesis transcending both modernism and postmodernism.",
      "A total rejection of sincerity as naive and unfashionable.",
    ],
    answerIndex: 0,
    explanation: "Vermeulen and van den Akker: metamodernism is not synthesis but movement — a self-aware both/and that swings between commitment and irony.",
  },

  "8.5": {
    question: "What is the lesson's balanced verdict on Integral Theory?",
    options: [
      "Useful against reductionism, but interrogate its hierarchy and metaphysics.",
      "Scientifically validated and ready for universal application.",
      "Discredited entirely by its spiritual commitments.",
      "Valuable only as a historical curiosity of the 2000s.",
    ],
    answerIndex: 0,
    explanation: "AQAL's four quadrants guard against flatland reductionism, yet its developmental hierarchy and Eurocentric metaphysics remain contested — use the map; interrogate the mapmaker.",
  },

  "8.6": {
    question: "What does the abolitionist framework ask, per Davis and Gilmore?",
    options: [
      "How can existing institutions be reformed to operate more fairly?",
      "What makes these systems necessary — and what alternatives can we build?",
      "Which punishments best deter the crimes they are meant to answer?",
      "How can incarceration be made more humane and smaller in scale?",
    ],
    answerIndex: 1,
    explanation: "Abolition is not destruction but building: the task is to question what makes cages necessary and to construct the infrastructure of a different social order.",
  },

  "8.7": {
    question: "What does sustained first-person inquiry reveal, per the lesson?",
    options: [
      "A stable inner witness untouched by conditioning.",
      "That introspection is unreliable and should be abandoned.",
      "The observing self is constructed, impermanent, and empty.",
      "That mystical states confirm perennial metaphysical doctrines.",
    ],
    answerIndex: 2,
    explanation: "Varela and Thompson establish first-person methods as rigorous praxis; sustained attention discloses the constructed, empty nature of the observer — the curriculum's most consequential finding.",
  },

  "8.8": {
    question: "What is the capstone exercise of the curriculum?",
    options: [
      "Memorizing the key figures and claims from all eight modules.",
      "Choosing the single framework that best explains current events.",
      "Writing a critique identifying the errors in earlier lessons.",
      "Applying the whole stack to a live case while noting blind spots.",
    ],
    answerIndex: 3,
    explanation: "No new concept: the task is to hold epistemics, power, systems, and embodied praxis together on one live case — and to notice what the curriculum itself still cannot see.",
  },
};
