// Single source of truth for the 74-lesson syllabus.
// Encoded directly from the Definitive Edition v3.0 specification.

export type Vector =
  | "critical"
  | "materialist"
  | "phenomenological"
  | "ecological";

export interface SeedLesson {
  number: number; // local within module
  lessonCode: string;
  globalOrder: number;
  concept: string;
  originators: string;
  coreClaim: string;
  vector: Vector;
}

export interface SeedModule {
  number: number;
  title: string;
  theme: string;
  description: string;
  accent: string; // tailwind hue
  lessons: SeedLesson[];
}

export const SYLLABUS: SeedModule[] = [
  {
    number: 1,
    title: "Positionality, Epistemics & The Real",
    theme:
      "Before asking how we know, ask who is knowing, from where, and with what inherited apparatus. Then examine the structural limits of knowledge itself.",
    description:
      "Ten lessons on situated knowledge, paradigm, the map/territory gap, Bayesian doubt, falsifiability, underdetermination, the hermeneutic circle, Indigenous epistemologies, and critical realism.",
    accent: "amber",
    lessons: [
      {
        number: 1,
        lessonCode: "1.1",
        globalOrder: 1,
        concept: "Standpoint & The View from Somewhere",
        originators: "Harding / Haraway",
        coreClaim:
          "There is no view from nowhere. Every knowledge claim is situated. Marginalized standpoints often access what dominant ones cannot see.",
        vector: "critical",
      },
      {
        number: 2,
        lessonCode: "1.2",
        globalOrder: 2,
        concept: "Paradigm & Scientific Revolution",
        originators: "Kuhn",
        coreClaim:
          "Science progresses via gestalt ruptures, not linear accumulation. Normal science defends the paradigm; anomalies accumulate until crisis.",
        vector: "materialist",
      },
      {
        number: 3,
        lessonCode: "1.3",
        globalOrder: 3,
        concept: "Episteme",
        originators: "Foucault",
        coreClaim:
          "Each era has an invisible historical a priori — a framework that defines what counts as a legitimate object of knowledge at all.",
        vector: "critical",
      },
      {
        number: 4,
        lessonCode: "1.4",
        globalOrder: 4,
        concept: "Map ≠ Territory",
        originators: "Korzybski",
        coreClaim:
          "All models are abstractions. The danger is not using maps — it is forgetting they are maps.",
        vector: "materialist",
      },
      {
        number: 5,
        lessonCode: "1.5",
        globalOrder: 5,
        concept: "Bayesian Epistemology",
        originators: "Bayes / Laplace",
        coreClaim:
          "Knowledge is probabilistic, not binary. Beliefs are priors updated by evidence. Certainty is a red flag, not a destination.",
        vector: "materialist",
      },
      {
        number: 6,
        lessonCode: "1.6",
        globalOrder: 6,
        concept: "Falsifiability & Its Limits",
        originators: "Popper / Lakatos",
        coreClaim:
          "A claim is scientific only if it can be proven wrong. But research programs protect their core with auxiliary hypotheses — Lakatos shows Popper is too simple.",
        vector: "materialist",
      },
      {
        number: 7,
        lessonCode: "1.7",
        globalOrder: 7,
        concept: "Underdetermination",
        originators: "Quine / Duhem",
        coreClaim:
          "Multiple incompatible theories can fit the same data. Evidence underdetermines theory selection; values and power fill the gap.",
        vector: "critical",
      },
      {
        number: 8,
        lessonCode: "1.8",
        globalOrder: 8,
        concept: "Hermeneutic Circle",
        originators: "Heidegger / Gadamer",
        coreClaim:
          "Understanding requires pre-understanding. Interpretation is never from zero — always from a historically inherited horizon.",
        vector: "phenomenological",
      },
      {
        number: 9,
        lessonCode: "1.9",
        globalOrder: 9,
        concept: "Indigenous & Relational Epistemologies",
        originators: "Battiste / Wilson / Two-Eyed Seeing",
        coreClaim:
          "Knowledge is relational, placed, and responsibility-bearing. Land and community are not contexts for knowledge — they are its substrate.",
        vector: "ecological",
      },
      {
        number: 10,
        lessonCode: "1.10",
        globalOrder: 10,
        concept: "Critical Realism & Ontological Depth",
        originators: "Bhaskar / Archer",
        coreClaim:
          "Reality has stratified depth: the Real (mechanisms), the Actual (events), the Empirical (observations). Science explains by uncovering generative mechanisms, not regularities.",
        vector: "materialist",
      },
    ],
  },
  {
    number: 2,
    title: "The Cognizing Subject & The Architecture of Experience",
    theme:
      "The mind is not a rational truth-processor. It is a predictive, embodied, evolutionarily-kludged, and ultimately processual event — with a nervous system that is as much political as it is biological.",
    description:
      "Ten lessons on predictive processing, 4E cognition, polyvagal theory, affect, dual process theory, bounded rationality, motivated reasoning, the narrative self, anatta, and availability cascades.",
    accent: "rose",
    lessons: [
      {
        number: 1,
        lessonCode: "2.1",
        globalOrder: 11,
        concept: "Predictive Processing",
        originators: "Friston / Clark",
        coreClaim:
          "The brain is not a passive receiver of data. It is a prediction machine that generates hypotheses about the world and updates them by minimizing prediction error.",
        vector: "materialist",
      },
      {
        number: 2,
        lessonCode: "2.2",
        globalOrder: 12,
        concept: "Embodied / 4E Cognition",
        originators: "Merleau-Ponty / Varela / Clark",
        coreClaim:
          "Cognition is Embodied, Embedded, Enacted, and Extended. The body and environment are constitutive of thought, not vehicles for it.",
        vector: "phenomenological",
      },
      {
        number: 3,
        lessonCode: "2.3",
        globalOrder: 13,
        concept: "Polyvagal Theory",
        originators: "Porges",
        coreClaim:
          "The autonomic nervous system operates hierarchically (ventral vagal → sympathetic → dorsal vagal). Safety is the prerequisite for higher cognition. The nervous system is a political apparatus.",
        vector: "phenomenological",
      },
      {
        number: 4,
        lessonCode: "2.4",
        globalOrder: 14,
        concept: "Affect Theory",
        originators: "Massumi / Ahmed",
        coreClaim:
          "Affect — pre-personal intensity — precedes and shapes emotion and cognition. It is also the mechanism through which power circulates below consciousness.",
        vector: "critical",
      },
      {
        number: 5,
        lessonCode: "2.5",
        globalOrder: 15,
        concept: "Dual Process Theory",
        originators: "Kahneman",
        coreClaim:
          "System 1 (fast, automatic, affective) dominates. System 2 (slow, deliberate) is metabolically expensive and deployed far less than we believe.",
        vector: "materialist",
      },
      {
        number: 6,
        lessonCode: "2.6",
        globalOrder: 16,
        concept: "Bounded Rationality & Satisficing",
        originators: "Simon",
        coreClaim:
          "Humans do not optimize. They satisfice — finding solutions good enough under real-world cognitive and temporal constraints.",
        vector: "materialist",
      },
      {
        number: 7,
        lessonCode: "2.7",
        globalOrder: 17,
        concept: "Motivated Reasoning & Dissonance",
        originators: "Festinger / Haidt",
        coreClaim:
          "We reason to justify conclusions reached emotionally. Rationalization is the default; rationality is the exception.",
        vector: "phenomenological",
      },
      {
        number: 8,
        lessonCode: "2.8",
        globalOrder: 18,
        concept: "The Narrative Self",
        originators: "Ricoeur / McAdams",
        coreClaim:
          "The self is not discovered — it is constructed through narrative. Identity is a story told in time, revised under pressure.",
        vector: "phenomenological",
      },
      {
        number: 9,
        lessonCode: "2.9",
        globalOrder: 19,
        concept: "Anatta & The Skandhas",
        originators: "Early Buddhism / Madhyamaka",
        coreClaim:
          "The self is not a fixed entity but a dynamic, interdependent aggregate of form, sensation, perception, mental formations, and consciousness — none of which constitute a permanent 'I.'",
        vector: "phenomenological",
      },
      {
        number: 10,
        lessonCode: "2.10",
        globalOrder: 20,
        concept: "Availability Cascades & Manufactured Salience",
        originators: "Tversky / Sunstein / Kuran",
        coreClaim:
          "We judge probability by cognitive ease of recall. This heuristic is systematically exploited by media, algorithms, and political actors to distort collective risk perception.",
        vector: "critical",
      },
    ],
  },
  {
    number: 3,
    title: "Social Construction, Reproduction & Performance",
    theme:
      "Reality as we live it is a collective fabrication — maintained by mimetic contagion, performed into existence, and reproduced through labor that capitalism renders invisible.",
    description:
      "Ten lessons on social construction, performativity, social reproduction, habitus, mimetic desire, hegemony, moral foundations, collective effervescence, actor-network theory, and the Overton window.",
    accent: "teal",
    lessons: [
      {
        number: 1,
        lessonCode: "3.1",
        globalOrder: 21,
        concept: "Social Construction of Reality",
        originators: "Berger / Luckmann",
        coreClaim:
          "Institutions are human products that objectify and then constrain their creators. The dialectic of externalization, objectivation, and internalization.",
        vector: "critical",
      },
      {
        number: 2,
        lessonCode: "3.2",
        globalOrder: 22,
        concept: "Performativity",
        originators: "Butler / Austin",
        coreClaim:
          "Identity is not an internal essence but a stylized repetition of acts. Gender (and other categories) is not expressed — it is produced through performance.",
        vector: "critical",
      },
      {
        number: 3,
        lessonCode: "3.3",
        globalOrder: 23,
        concept: "Social Reproduction Theory",
        originators: "Federici / Fraser",
        coreClaim:
          "Capitalism depends on unpaid domestic and care labor — predominantly women's — for the daily and generational reproduction of the workforce. This is not marginal; it is foundational.",
        vector: "critical",
      },
      {
        number: 4,
        lessonCode: "3.4",
        globalOrder: 24,
        concept: "Habitus & Field",
        originators: "Bourdieu",
        coreClaim:
          "Internalized dispositions (habitus) navigate structured competitive arenas (fields). Class, race, and gender reproduce themselves through taste, gesture, and embodied capital.",
        vector: "critical",
      },
      {
        number: 5,
        lessonCode: "3.5",
        globalOrder: 25,
        concept: "Mimetic Desire & Scapegoating",
        originators: "Girard",
        coreClaim:
          "We desire what others desire, not what we independently choose. This produces contagion, rivalry, and eventual collective violence discharged onto a scapegoat who restores temporary cohesion.",
        vector: "phenomenological",
      },
      {
        number: 6,
        lessonCode: "3.6",
        globalOrder: 26,
        concept: "Cultural Hegemony",
        originators: "Gramsci",
        coreClaim:
          "Dominant classes rule primarily through consent, not coercion. 'Common sense' is a political achievement — the naturalization of a specific class's worldview.",
        vector: "critical",
      },
      {
        number: 7,
        lessonCode: "3.7",
        globalOrder: 27,
        concept: "Moral Foundations Theory",
        originators: "Haidt / Graham",
        coreClaim:
          "Political and moral divisions map onto distinct evolutionary psychological modules (care, fairness, loyalty, authority, sanctity, liberty). Disagreement is often cross-paradigmatic, not irrational.",
        vector: "materialist",
      },
      {
        number: 8,
        lessonCode: "3.8",
        globalOrder: 28,
        concept: "Collective Effervescence & The Sacred",
        originators: "Durkheim / Collins",
        coreClaim:
          "Rituals generate solidarity and the experience of the sacred through synchronized action and emotional energy. Social cohesion is affectively, not only cognitively, produced.",
        vector: "phenomenological",
      },
      {
        number: 9,
        lessonCode: "3.9",
        globalOrder: 29,
        concept: "Actor-Network Theory",
        originators: "Latour / Callon",
        coreClaim:
          "The social is not exclusively human. Non-human actors — microbes, algorithms, infrastructure, laws — co-produce the network. Agency is distributed.",
        vector: "materialist",
      },
      {
        number: 10,
        lessonCode: "3.10",
        globalOrder: 30,
        concept: "Overton Window & Discourse Mechanics",
        originators: "Overton / Mackinac",
        coreClaim:
          "The range of politically sayable positions is not fixed. It is shifted deliberately through coordinated institutional pressure, media amplification, and mimetic contagion.",
        vector: "critical",
      },
    ],
  },
  {
    number: 4,
    title: "Power, Colonial Matrices & Necropolitics",
    theme:
      "Power is not only repressive — it is productive, territorial, and necropolitical. It was built on and continues to require racial, colonial, and patriarchal hierarchies.",
    description:
      "Ten lessons on discourse/power, disciplinary society, biopower, necropolitics, racial capitalism, coloniality of power, settler colonialism, intersectionality, the spectacle, and the society of control.",
    accent: "red",
    lessons: [
      {
        number: 1,
        lessonCode: "4.1",
        globalOrder: 31,
        concept: "Discourse & Power/Knowledge",
        originators: "Foucault",
        coreClaim:
          "Power and knowledge are co-constitutive. Discourse produces its objects. What can be said, by whom, in what context, is itself a site of power.",
        vector: "critical",
      },
      {
        number: 2,
        lessonCode: "4.2",
        globalOrder: 32,
        concept: "Disciplinary Society & Normalization",
        originators: "Foucault",
        coreClaim:
          "The Panopticon: surveillance, normalization, and the production of docile bodies. Power operates through the statistical norm, pathologizing deviation.",
        vector: "critical",
      },
      {
        number: 3,
        lessonCode: "4.3",
        globalOrder: 33,
        concept: "Biopower & Biopolitics",
        originators: "Foucault / Agamben",
        coreClaim:
          "Power operates on life itself — the statistical management of populations, reproduction, and health. The state of exception is where bare life is exposed to sovereign power.",
        vector: "critical",
      },
      {
        number: 4,
        lessonCode: "4.4",
        globalOrder: 34,
        concept: "Necropolitics",
        originators: "Mbembe",
        coreClaim:
          "The ultimate expression of sovereignty is the power to dictate who lives and who is left to die. Necropolitics extends Foucault into the colonial and postcolonial space.",
        vector: "critical",
      },
      {
        number: 5,
        lessonCode: "4.5",
        globalOrder: 35,
        concept: "Racial Capitalism",
        originators: "Robinson / Kelley",
        coreClaim:
          "Capitalism did not become racist. It emerged from and continuously requires pre-existing racial hierarchies for its reproduction. Race is not incidental — it is structural.",
        vector: "critical",
      },
      {
        number: 6,
        lessonCode: "4.6",
        globalOrder: 36,
        concept: "Coloniality of Power",
        originators: "Quijano / Mignolo",
        coreClaim:
          "Colonialism didn't end — it mutated into a global matrix of power (coloniality) that privileges Eurocentric epistemologies, labor classifications, and ontologies.",
        vector: "critical",
      },
      {
        number: 7,
        lessonCode: "4.7",
        globalOrder: 37,
        concept: "Settler Colonialism",
        originators: "Wolfe / Coulthard",
        coreClaim:
          "Settler colonialism is not an event but a structure. Its logic is elimination, not exploitation, and it persists into the present through land and sovereignty.",
        vector: "critical",
      },
      {
        number: 8,
        lessonCode: "4.8",
        globalOrder: 38,
        concept: "Intersectionality",
        originators: "Crenshaw / Collins",
        coreClaim:
          "Axes of power (race, class, gender, sexuality) are not additive — they are multiplicative and co-constitutive. Their intersection produces qualitatively distinct positions.",
        vector: "critical",
      },
      {
        number: 9,
        lessonCode: "4.9",
        globalOrder: 39,
        concept: "The Spectacle",
        originators: "Debord",
        coreClaim:
          "Late capitalism replaces lived experience with its representation. Authenticity is produced as commodity. The image precedes and generates the event.",
        vector: "critical",
      },
      {
        number: 10,
        lessonCode: "4.10",
        globalOrder: 40,
        concept: "Society of Control",
        originators: "Deleuze",
        coreClaim:
          "Post-disciplinary power is continuous, modulated, and algorithmic. Not the prison but the password; not the factory but the corporation-as-spirit.",
        vector: "critical",
      },
    ],
  },
  {
    number: 5,
    title: "Systems, Complexity, Ecology & Dependent Origination",
    theme:
      "Most phenomena are non-linear, emergent, and devoid of independent essence — including planetary systems now destabilized by the extractive logic of modules 4 and 6.",
    description:
      "Ten lessons on systems thinking, feedback and emergence, complex adaptive systems, panarchy, planetary boundaries, hyperobjects, dependent origination, path dependency, reflexivity, and black swans.",
    accent: "emerald",
    lessons: [
      {
        number: 1,
        lessonCode: "5.1",
        globalOrder: 41,
        concept: "Systems Thinking",
        originators: "Meadows",
        coreClaim:
          "Stocks, flows, and feedback loops. The behavior of a system cannot be predicted from or reduced to its isolated components.",
        vector: "materialist",
      },
      {
        number: 2,
        lessonCode: "5.2",
        globalOrder: 42,
        concept: "Feedback Loops & Emergence",
        originators: "Ashby / Holland",
        coreClaim:
          "Reinforcing loops amplify; balancing loops stabilize. Emergence describes system-level properties irreducible to component-level description.",
        vector: "materialist",
      },
      {
        number: 3,
        lessonCode: "5.3",
        globalOrder: 43,
        concept: "Complex Adaptive Systems",
        originators: "Holland / Santa Fe",
        coreClaim:
          "Agents adapt to fitness landscapes, generating evolution without designer. Social and biological systems resist top-down control precisely because they adapt.",
        vector: "materialist",
      },
      {
        number: 4,
        lessonCode: "5.4",
        globalOrder: 44,
        concept: "Panarchy & Resilience",
        originators: "Holling / Gunderson",
        coreClaim:
          "Systems cycle through growth, conservation, release, and reorganization. Collapse is not failure but creative destruction enabling reorganization. Resilience is the capacity to cycle.",
        vector: "ecological",
      },
      {
        number: 5,
        lessonCode: "5.5",
        globalOrder: 45,
        concept: "Planetary Boundaries",
        originators: "Rockström / Steffen",
        coreClaim:
          "Nine biophysical systems define a safe operating space for humanity. We have breached at least six. The Holocene stability that enabled civilization is ending.",
        vector: "ecological",
      },
      {
        number: 6,
        lessonCode: "5.6",
        globalOrder: 46,
        concept: "Hyperobjects",
        originators: "Morton",
        coreClaim:
          "Entities — like climate change, microplastics, or the internet — so massively distributed in time and space that they defeat local comprehension. We are inside them; they cannot be pointed at.",
        vector: "ecological",
      },
      {
        number: 7,
        lessonCode: "5.7",
        globalOrder: 47,
        concept: "Dependent Origination",
        originators: "Madhyamaka / Nāgārjuna",
        coreClaim:
          "Pratītyasamutpāda: nothing possesses inherent, independent existence (svabhāva). All phenomena arise strictly through interdependent relations. Emptiness is not nihilism — it is relational plenitude.",
        vector: "phenomenological",
      },
      {
        number: 8,
        lessonCode: "5.8",
        globalOrder: 48,
        concept: "Path Dependency, Hysteresis & Lock-in",
        originators: "Arthur / David",
        coreClaim:
          "History constrains futures. Suboptimal solutions persist (QWERTY, fossil infrastructure). Systems remember their past; recovery does not retrace the path of collapse.",
        vector: "materialist",
      },
      {
        number: 9,
        lessonCode: "5.9",
        globalOrder: 49,
        concept: "Reflexivity",
        originators: "Soros / Bourdieu",
        coreClaim:
          "Observers constitute what they observe. Markets, social science, and political discourse are self-referential — they produce the realities they describe.",
        vector: "critical",
      },
      {
        number: 10,
        lessonCode: "5.10",
        globalOrder: 50,
        concept: "Black Swans & Antifragility",
        originators: "Taleb",
        coreClaim:
          "High-impact, low-probability events are systematically underestimated. Beyond resilience: antifragile systems gain from disorder. The goal is not to withstand volatility but to benefit from it.",
        vector: "materialist",
      },
    ],
  },
  {
    number: 6,
    title: "Political Economy, Metabolism & The Present Conjuncture",
    theme:
      "The specific historical form of extractive capitalism we inhabit — its energetic metabolism, its mutation into techno-feudalism, and its alternatives.",
    description:
      "Ten lessons on neoliberal rationality, accumulation by dispossession, the care economy, metabolic rift, performative economics, platform capitalism, techno-feudalism, surveillance capitalism, the precariat, and doughnut economics.",
    accent: "orange",
    lessons: [
      {
        number: 1,
        lessonCode: "6.1",
        globalOrder: 51,
        concept: "Neoliberal Rationality",
        originators: "Harvey / Dardot & Laval",
        coreClaim:
          "Not merely policy but an ontological norm: competition as universal human metric, the enterprise as the ideal form of all social relations.",
        vector: "critical",
      },
      {
        number: 2,
        lessonCode: "6.2",
        globalOrder: 52,
        concept: "Accumulation by Dispossession",
        originators: "Harvey",
        coreClaim:
          "Primitive accumulation is not historical — it is ongoing. The commons are continuously enclosed: land, water, knowledge, genetic material, attention.",
        vector: "critical",
      },
      {
        number: 3,
        lessonCode: "6.3",
        globalOrder: 53,
        concept: "Social Reproduction & The Care Economy",
        originators: "Federici / Folbre",
        coreClaim:
          "Capitalism externalizes reproductive labor (childcare, eldercare, emotional work) onto women and the Global South while treating it as economically invisible. This subsidy is the hidden foundation of market economies.",
        vector: "critical",
      },
      {
        number: 4,
        lessonCode: "6.4",
        globalOrder: 54,
        concept: "Metabolic Rift",
        originators: "Marx / Foster",
        coreClaim:
          "Capitalism creates an irreparable break in the nutrient and energy cycles between social humanity and the natural world. Thermodynamic exhaustion is not a bug — it is a structural feature.",
        vector: "ecological",
      },
      {
        number: 5,
        lessonCode: "6.5",
        globalOrder: 55,
        concept: "Performative Economics",
        originators: "MacKenzie / Callon",
        coreClaim:
          "Economic models do not describe markets — they produce them. Black-Scholes created the derivatives market it modeled. Theory is an intervention, not a mirror.",
        vector: "materialist",
      },
      {
        number: 6,
        lessonCode: "6.6",
        globalOrder: 56,
        concept: "Platform Capitalism",
        originators: "Srnicek",
        coreClaim:
          "Platforms are digital infrastructure for extracting and monopolizing data as the new raw material. Their business model is enclosure, not exchange.",
        vector: "critical",
      },
      {
        number: 7,
        lessonCode: "6.7",
        globalOrder: 57,
        concept: "Techno-Feudalism",
        originators: "Varoufakis",
        coreClaim:
          "Markets are being displaced by digital fiefdoms. Extraction is no longer primarily via market profit but via cloud rent — the toll on transactions occurring within proprietary infrastructure.",
        vector: "critical",
      },
      {
        number: 8,
        lessonCode: "6.8",
        globalOrder: 58,
        concept: "Surveillance Capitalism",
        originators: "Zuboff",
        coreClaim:
          "Human behavioral experience is extracted as raw material, processed into prediction products, and sold to modify future behavior. The self becomes a resource.",
        vector: "critical",
      },
      {
        number: 9,
        lessonCode: "6.9",
        globalOrder: 59,
        concept: "The Precariat & Time Poverty",
        originators: "Standing / Fraser",
        coreClaim:
          "A new class defined by what it lacks: labor security, identity, predictable time, and political voice. Precarity is not an aberration — it is the contemporary labor regime.",
        vector: "critical",
      },
      {
        number: 10,
        lessonCode: "6.10",
        globalOrder: 60,
        concept: "Doughnut Economics",
        originators: "Raworth",
        coreClaim:
          "The economy must operate between a social foundation (human needs) and an ecological ceiling (planetary boundaries). Growth as the terminal goal is both empirically false and ecologically fatal.",
        vector: "ecological",
      },
    ],
  },
  {
    number: 7,
    title: "The Digital Paradigm, AI & Epistemic Infrastructure",
    theme:
      "The epistemic, social, ontological, and material consequences of living inside probabilistic, algorithmically-governed information environments built on exploited labor.",
    description:
      "Eight lessons on hyperreality, epistemic bubbles vs echo chambers, memetics, algorithmic governance, network effects, digital colonialism, liquid modernity, and stochastic parrots.",
    accent: "violet",
    lessons: [
      {
        number: 1,
        lessonCode: "7.1",
        globalOrder: 61,
        concept: "Hyperreality",
        originators: "Baudrillard",
        coreClaim:
          "Simulation precedes and generates the real. In the age of social media, the image of the event is the event. Post-truth is not a deviation — it is an ontological condition.",
        vector: "critical",
      },
      {
        number: 2,
        lessonCode: "7.2",
        globalOrder: 62,
        concept: "Epistemic Bubbles vs. Echo Chambers",
        originators: "Nguyen",
        coreClaim:
          "Crucially distinct: bubbles are information deficits (easily corrected by exposure); echo chambers actively inoculate against outside epistemic sources (resistant to correction).",
        vector: "critical",
      },
      {
        number: 3,
        lessonCode: "7.3",
        globalOrder: 63,
        concept: "Memetics & Cultural Selection",
        originators: "Dawkins / Blackmore",
        coreClaim:
          "Ideas replicate using human nervous systems as hosts, competing for cognitive real estate. Cultural evolution proceeds via differential memetic fitness, not rational selection.",
        vector: "materialist",
      },
      {
        number: 4,
        lessonCode: "7.4",
        globalOrder: 64,
        concept: "Algorithmic Governance",
        originators: "Lessig / Eubanks / O'Neil",
        coreClaim:
          "Code is law. When algorithms allocate bail, credit, welfare, and employment, structural bias is automated, obscured in technical complexity, and rendered unaccountable.",
        vector: "critical",
      },
      {
        number: 5,
        lessonCode: "7.5",
        globalOrder: 65,
        concept: "Network Effects, Power Laws & Monopolization",
        originators: "Barabási / Metcalfe",
        coreClaim:
          "Preferential attachment drives digital networks toward extreme concentration. Winner-take-all is not market failure — it is the inherent topology of scale-free networks.",
        vector: "materialist",
      },
      {
        number: 6,
        lessonCode: "7.6",
        globalOrder: 66,
        concept: "Digital Colonialism & Ghost Work",
        originators: "Couldry / Mejias / Gray & Suri",
        coreClaim:
          "AI systems are built on the extracted data of the Global South and maintained by invisible click-workers performing the cognitive labor that makes automation appear seamless.",
        vector: "critical",
      },
      {
        number: 7,
        lessonCode: "7.7",
        globalOrder: 67,
        concept: "Liquid Modernity & Institutional Dissolution",
        originators: "Bauman",
        coreClaim:
          "Solid structures — stable careers, institutions, identities, communities — have dissolved into fluid, transient, individually-managed risk. The state outsources anxiety to the subject.",
        vector: "critical",
      },
      {
        number: 8,
        lessonCode: "7.8",
        globalOrder: 68,
        concept: "Stochastic Parrots & Generative Synthesis",
        originators: "Bender / Gebru / LeCun",
        coreClaim:
          "LLMs are high-dimensional statistical pattern-matchers over human text. They generate probabilistically plausible output, not understanding. The shift from retrieval to generation fundamentally alters epistemic infrastructure.",
        vector: "materialist",
      },
    ],
  },
  {
    number: 8,
    title: "Navigation, Synthesis & Praxis in the Polycrisis",
    theme:
      "No single framework integrates everything. Synthesis here means the capacity to hold multiple, partially incompatible lenses simultaneously — and to act from that complexity without paralysis or false resolution.",
    description:
      "Eight lessons on polycrisis, BANI, Cynefin, metamodernism, integral theory, abolition, contemplative epistemics, and applied sensemaking.",
    accent: "stone",
    lessons: [
      {
        number: 1,
        lessonCode: "8.1",
        globalOrder: 69,
        concept: "Polycrisis",
        originators: "Tooze / Morin",
        coreClaim:
          "Simultaneous, causally-entangled crises whose combined effect exceeds their sum. The key insight: the crises are not separate problems with separate solutions — they share generative roots.",
        vector: "materialist",
      },
      {
        number: 2,
        lessonCode: "8.2",
        globalOrder: 70,
        concept: "BANI & The Successor to VUCA",
        originators: "Cascio",
        coreClaim:
          "The modern operating environment is Brittle (not just uncertain), Anxious (not just volatile), Non-linear (not just complex), Incomprehensible (not just ambiguous). The upgrade matters diagnostically.",
        vector: "materialist",
      },
      {
        number: 3,
        lessonCode: "8.3",
        globalOrder: 71,
        concept: "Cynefin: Situational Ontology",
        originators: "Snowden",
        coreClaim:
          "Different domains (clear, complicated, complex, chaotic) require radically different epistemic approaches. Applying the wrong one is more dangerous than applying none.",
        vector: "materialist",
      },
      {
        number: 4,
        lessonCode: "8.4",
        globalOrder: 72,
        concept: "Metamodernism",
        originators: "Freinacht / Vermeulen & van den Akker",
        coreClaim:
          "Cultural oscillation between modernist sincerity and postmodern irony — not synthesis but dialectical movement between them. The both/and that remains self-aware of its own contingency.",
        vector: "phenomenological",
      },
      {
        number: 5,
        lessonCode: "8.5",
        globalOrder: 73,
        concept: "Integral Theory (AQAL) & Its Discontents",
        originators: "Wilber / Critics",
        coreClaim:
          "Maps four irreducible dimensions of any phenomenon: Interior/Exterior × Individual/Collective. The framework is powerful for preventing flatland reductionism. Its developmental hierarchy, Eurocentric metaphysics, and political positions remain seriously contested. Use the map; interrogate the mapmaker.",
        vector: "phenomenological",
      },
      {
        number: 6,
        lessonCode: "8.6",
        globalOrder: 74,
        concept: "Abolition & Transformative Justice",
        originators: "Davis / Kaba / Gilmore",
        coreClaim:
          "The task is not to fix broken systems but to ask what makes them necessary and to build alternatives. Abolition is not destruction — it is infrastructure construction for a different social order.",
        vector: "critical",
      },
      {
        number: 7,
        lessonCode: "8.7",
        globalOrder: 75,
        concept: "Contemplative Epistemics: Neurophenomenology & Non-Dual Praxis",
        originators: "Varela / Thompson / Nisargadatta",
        coreClaim:
          "First-person inquiry is a rigorous method, not a supplement. Sustained attention practice reveals the constructed, impermanent, and empty nature of the observing self — which is itself the most consequential epistemic discovery in the curriculum.",
        vector: "phenomenological",
      },
      {
        number: 8,
        lessonCode: "8.8",
        globalOrder: 76,
        concept: "Sensemaking as Practice: Applied Synthesis",
        originators: "—",
        coreClaim:
          "Capstone. No new concept. Apply the full stack to one live case: a current headline, a personal decision, or a systemic problem. The exercise is to hold epistemics, power, systems, and embodied praxis simultaneously — and notice what the curriculum still cannot see.",
        vector: "phenomenological",
      },
    ],
  },
];

export const TOTAL_LESSONS = 76; // 8.8 makes 76 entries; treat globalOrder as the canonical count
