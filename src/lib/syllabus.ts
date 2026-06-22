// Single source of truth for the 76-lesson syllabus.
// Encoded from the Definitive Edition v3.0 specification, revised per the
// scholarly critical review (June 2026): the "originator(s)" column is renamed
// "Key Figures" (heuristic, not citation-grade), and each lesson carries a
// contestation status with an optional critical-reading note.

export type Vector =
  | "critical"
  | "materialist"
  | "phenomenological"
  | "ecological";

// Contestation status, per the critical review's central recommendation.
// settled          — broadly stable in the relevant scholarly community
// contested        — subject to significant ongoing critique; read with sources
// actively-debated — the framing itself is live-disputed (e.g. LeCun vs. parrots)
export type LessonStatus = "settled" | "contested" | "actively-debated";

export interface SeedLesson {
  number: number; // local within module
  lessonCode: string;
  globalOrder: number;
  concept: string;
  // "Key Figures" (renamed from originators per critical review). Heuristic
  // orientation only — primary originators, popularizers, and critics may all
  // appear. NOT citation-grade; verify against primary sources before citing.
  keyFigures: string;
  coreClaim: string;
  vector: Vector;
  status: LessonStatus;
  // For contested/actively-debated lessons: a pointer to the live debate.
  criticalNote?: string;
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
        keyFigures: "Harding / Haraway",
        coreClaim:
          "There is no view from nowhere. Every knowledge claim is situated. Marginalized standpoints often access what dominant ones cannot see.",
        vector: "critical",
        status: "settled",
      },
      {
        number: 2,
        lessonCode: "1.2",
        globalOrder: 2,
        concept: "Paradigm & Scientific Revolution",
        keyFigures: "Kuhn",
        coreClaim:
          "Science progresses via gestalt ruptures, not linear accumulation. Normal science defends the paradigm; anomalies accumulate until crisis.",
        vector: "materialist",
        status: "contested",
        criticalNote:
          "Kuhn's account is itself contested: Lakatos and Laudan offered rival models of scientific change, and social-constructivist readings of Kuhn are debated by philosophers of science.",
      },
      {
        number: 3,
        lessonCode: "1.3",
        globalOrder: 3,
        concept: "Episteme",
        keyFigures: "Foucault",
        coreClaim:
          "Each era has an invisible historical a priori — a framework that defines what counts as a legitimate object of knowledge at all.",
        vector: "critical",
        status: "settled",
      },
      {
        number: 4,
        lessonCode: "1.4",
        globalOrder: 4,
        concept: "Map ≠ Territory",
        keyFigures: "Korzybski",
        coreClaim:
          "All models are abstractions. The danger is not using maps — it is forgetting they are maps.",
        vector: "materialist",
        status: "settled",
      },
      {
        number: 5,
        lessonCode: "1.5",
        globalOrder: 5,
        concept: "Bayesian Epistemology",
        // FIX (critical review): Bayes/Laplace is defensible for the theorem
        // but elides the 20th-century architects of Bayesian epistemology as a
        // philosophical program. Ramsey, de Finetti, Savage, Jeffrey.
        keyFigures: "Bayes / Laplace / Ramsey / Savage",
        coreClaim:
          "Knowledge is probabilistic, not binary. Beliefs are priors updated by evidence. Certainty is a red flag, not a destination.",
        vector: "materialist",
        status: "settled",
      },
      {
        number: 6,
        lessonCode: "1.6",
        globalOrder: 6,
        concept: "Falsifiability & Its Limits",
        keyFigures: "Popper / Lakatos",
        coreClaim:
          "A claim is scientific only if it can be proven wrong. But research programs protect their core with auxiliary hypotheses — Lakatos shows Popper is too simple.",
        vector: "materialist",
        status: "settled",
      },
      {
        number: 7,
        lessonCode: "1.7",
        globalOrder: 7,
        concept: "Underdetermination",
        keyFigures: "Quine / Duhem",
        coreClaim:
          "Multiple incompatible theories can fit the same data. Evidence underdetermines theory selection; values and power fill the gap.",
        vector: "critical",
        status: "settled",
      },
      {
        number: 8,
        lessonCode: "1.8",
        globalOrder: 8,
        concept: "Hermeneutic Circle",
        keyFigures: "Heidegger / Gadamer",
        coreClaim:
          "Understanding requires pre-understanding. Interpretation is never from zero — always from a historically inherited horizon.",
        vector: "phenomenological",
        status: "settled",
      },
      {
        number: 9,
        lessonCode: "1.9",
        globalOrder: 9,
        concept: "Indigenous & Relational Epistemologies",
        // FIX (critical review): Two-Eyed Seeing (Etuaptmumk) was developed by
        // Mi'kmaw Elders Albert and Murdena Marshall. Battiste and Wilson are
        // later scholarly elaborators, not co-equal originators. The Marshall
        // elders are credited first.
        keyFigures: "Marshall & Marshall / Battiste / Wilson",
        coreClaim:
          "Knowledge is relational, placed, and responsibility-bearing. Land and community are not contexts for knowledge — they are its substrate.",
        vector: "ecological",
        status: "settled",
        criticalNote:
          "Two-Eyed Seeing (Etuaptmumk) was developed by Mi'kmaw Elders Albert and Murdena Marshall; Battiste and Wilson are later scholarly elaborators, not co-equal originators. See Bartlett, Marshall & Marshall (2012).",
      },
      {
        number: 10,
        lessonCode: "1.10",
        globalOrder: 10,
        concept: "Critical Realism & Ontological Depth",
        keyFigures: "Bhaskar / Archer",
        coreClaim:
          "Reality has stratified depth: the Real (mechanisms), the Actual (events), the Empirical (observations). Science explains by uncovering generative mechanisms, not regularities.",
        vector: "materialist",
        status: "contested",
        criticalNote:
          "The three-domain ontology (Real/Actual/Empirical) is debated even within critical realism; see Fryer & Navarrete (2022) arguing the domains generate more confusion than clarity. Also note a sequencing tension: Bhaskar's ontology arguably licenses the move from M1 to M2, so placing it last inverts his own argumentative strategy.",
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
        keyFigures: "Friston / Clark",
        coreClaim:
          "The brain is not a passive receiver of data. It is a prediction machine that generates hypotheses about the world and updates them by minimizing prediction error.",
        vector: "materialist",
        status: "contested",
        criticalNote:
          "Predictive processing and the free-energy principle are presented as the dominant model of cognition, but the framework's empirical adequacy is actively debated within cognitive science; see critiques by Colombo, Klein, and others, and the exchange in Synthese.",
      },
      {
        number: 2,
        lessonCode: "2.2",
        globalOrder: 12,
        concept: "Embodied / 4E Cognition",
        keyFigures: "Merleau-Ponty / Varela / Clark",
        coreClaim:
          "Cognition is Embodied, Embedded, Enacted, and Extended. The body and environment are constitutive of thought, not vehicles for it.",
        vector: "phenomenological",
        status: "settled",
      },
      {
        number: 3,
        lessonCode: "2.3",
        globalOrder: 13,
        concept: "Polyvagal Theory",
        keyFigures: "Porges",
        coreClaim:
          "The autonomic nervous system operates hierarchically (ventral vagal → sympathetic → dorsal vagal). Safety is the prerequisite for higher cognition. The nervous system is a political apparatus.",
        vector: "phenomenological",
        status: "contested",
        criticalNote:
          "Porges's theory is correctly attributed but presented here as more settled than it is. It is subject to sustained critique — see Grossman & Taylor, and the ongoing 2025–2026 exchange in Clinical Neuropsychiatry and Frontiers in Integrative Neuroscience. The claim that 'the nervous system is a political apparatus' is a further extrapolation on an already contested foundation.",
      },
      {
        number: 4,
        lessonCode: "2.4",
        globalOrder: 14,
        concept: "Affect Theory",
        keyFigures: "Massumi / Ahmed",
        coreClaim:
          "Affect — pre-personal intensity — precedes and shapes emotion and cognition. It is also the mechanism through which power circulates below consciousness.",
        vector: "critical",
        status: "contested",
        criticalNote:
          "Affect theory's distinction between 'affect' (pre-personal intensity) and 'emotion' (qualified feeling) is contested; some argue the strict separation is empirically unstable. The Massumi/ Ahmed line differs in emphasis.",
      },
      {
        number: 5,
        lessonCode: "2.5",
        globalOrder: 15,
        concept: "Dual Process Theory",
        keyFigures: "Kahneman",
        coreClaim:
          "System 1 (fast, automatic, affective) dominates. System 2 (slow, deliberate) is metabolically expensive and deployed far less than we believe.",
        vector: "materialist",
        status: "contested",
        criticalNote:
          "The clean System 1 / System 2 framing has been criticized as overstated; see Evans & Stanovich's refinements and the replication concerns surrounding some priming studies that motivated the original framing.",
      },
      {
        number: 6,
        lessonCode: "2.6",
        globalOrder: 16,
        concept: "Bounded Rationality & Satisficing",
        keyFigures: "Simon",
        coreClaim:
          "Humans do not optimize. They satisfice — finding solutions good enough under real-world cognitive and temporal constraints.",
        vector: "materialist",
        status: "settled",
      },
      {
        number: 7,
        lessonCode: "2.7",
        globalOrder: 17,
        concept: "Motivated Reasoning & Dissonance",
        keyFigures: "Festinger / Haidt",
        coreClaim:
          "We reason to justify conclusions reached emotionally. Rationalization is the default; rationality is the exception.",
        vector: "phenomenological",
        status: "contested",
        criticalNote:
          "Haidt's social-intuitionist model and Moral Foundations Theory (M3.7) are contested on methodological and political grounds; treat his specific empirical claims as debatable rather than settled.",
      },
      {
        number: 8,
        lessonCode: "2.8",
        globalOrder: 18,
        concept: "The Narrative Self",
        keyFigures: "Ricoeur / McAdams",
        coreClaim:
          "The self is not discovered — it is constructed through narrative. Identity is a story told in time, revised under pressure.",
        vector: "phenomenological",
        status: "settled",
      },
      {
        number: 9,
        lessonCode: "2.9",
        globalOrder: 19,
        concept: "Anatta & The Skandhas",
        keyFigures: "Early Buddhism / Madhyamaka",
        coreClaim:
          "The self is not a fixed entity but a dynamic, interdependent aggregate of form, sensation, perception, mental formations, and consciousness — none of which constitute a permanent 'I.'",
        vector: "phenomenological",
        status: "contested",
        criticalNote:
          "Anattā and śūnyatā are routinely misread as nihilism even in graduate seminars; a 500-word lesson invites precisely the misreading it warns against. Read Nāgārjuna's Mūlamadhyamakakārikā directly. Note also a sequencing tension: the critique of inherent existence (svabhāva) is arguably logically prior to — not derived from — the systems-theoretic claims of M5.",
      },
      {
        number: 10,
        lessonCode: "2.10",
        globalOrder: 20,
        concept: "Availability Cascades & Manufactured Salience",
        keyFigures: "Tversky / Sunstein / Kuran",
        coreClaim:
          "We judge probability by cognitive ease of recall. This heuristic is systematically exploited by media, algorithms, and political actors to distort collective risk perception.",
        vector: "critical",
        status: "settled",
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
        keyFigures: "Berger / Luckmann",
        coreClaim:
          "Institutions are human products that objectify and then constrain their creators. The dialectic of externalization, objectivation, and internalization.",
        vector: "critical",
        status: "settled",
      },
      {
        number: 2,
        lessonCode: "3.2",
        globalOrder: 22,
        concept: "Performativity",
        keyFigures: "Butler / Austin",
        coreClaim:
          "Identity is not an internal essence but a stylized repetition of acts. Gender (and other categories) is not expressed — it is produced through performance.",
        vector: "critical",
        status: "settled",
      },
      {
        number: 3,
        lessonCode: "3.3",
        globalOrder: 23,
        concept: "Social Reproduction Theory",
        keyFigures: "Federici / Fraser",
        coreClaim:
          "Capitalism depends on unpaid domestic and care labor — predominantly women's — for the daily and generational reproduction of the workforce. This is not marginal; it is foundational.",
        vector: "critical",
        status: "settled",
      },
      {
        number: 4,
        lessonCode: "3.4",
        globalOrder: 24,
        concept: "Habitus & Field",
        keyFigures: "Bourdieu",
        coreClaim:
          "Internalized dispositions (habitus) navigate structured competitive arenas (fields). Class, race, and gender reproduce themselves through taste, gesture, and embodied capital.",
        vector: "critical",
        status: "settled",
      },
      {
        number: 5,
        lessonCode: "3.5",
        globalOrder: 25,
        concept: "Mimetic Desire & Scapegoating",
        keyFigures: "Girard",
        coreClaim:
          "We desire what others desire, not what we independently choose. This produces contagion, rivalry, and eventual collective violence discharged onto a scapegoat who restores temporary cohesion.",
        vector: "phenomenological",
        status: "contested",
        criticalNote:
          "Girard's mimetic-desire framework is influential but empirically and theoretically contested; the scapegoat mechanism is disputed by anthropologists and classicists.",
      },
      {
        number: 6,
        lessonCode: "3.6",
        globalOrder: 26,
        concept: "Cultural Hegemony",
        keyFigures: "Gramsci",
        coreClaim:
          "Dominant classes rule primarily through consent, not coercion. 'Common sense' is a political achievement — the naturalization of a specific class's worldview.",
        vector: "critical",
        status: "settled",
      },
      {
        number: 7,
        lessonCode: "3.7",
        globalOrder: 27,
        concept: "Moral Foundations Theory",
        keyFigures: "Haidt / Graham",
        coreClaim:
          "Political and moral divisions map onto distinct evolutionary psychological modules (care, fairness, loyalty, authority, sanctity, liberty). Disagreement is often cross-paradigmatic, not irrational.",
        vector: "materialist",
        status: "contested",
        criticalNote:
          "Moral Foundations Theory is contested on methodological and political grounds; the evolutionary-psychological modularity claim and the political 'both-sides' framing have both drawn sustained critique.",
      },
      {
        number: 8,
        lessonCode: "3.8",
        globalOrder: 28,
        concept: "Collective Effervescence & The Sacred",
        keyFigures: "Durkheim / Collins",
        coreClaim:
          "Rituals generate solidarity and the experience of the sacred through synchronized action and emotional energy. Social cohesion is affectively, not only cognitively, produced.",
        vector: "phenomenological",
        status: "settled",
      },
      {
        number: 9,
        lessonCode: "3.9",
        globalOrder: 29,
        concept: "Actor-Network Theory",
        keyFigures: "Latour / Callon",
        coreClaim:
          "The social is not exclusively human. Non-human actors — microbes, algorithms, infrastructure, laws — co-produce the network. Agency is distributed.",
        vector: "materialist",
        status: "contested",
        criticalNote:
          "ANT's symmetric treatment of human and non-human 'actors' is theoretically contested; critics argue it dissolves power asymmetries that critical theory insists on retaining.",
      },
      {
        number: 10,
        lessonCode: "3.10",
        globalOrder: 30,
        concept: "Overton Window & Discourse Mechanics",
        keyFigures: "Overton / Mackinac",
        coreClaim:
          "The range of politically sayable positions is not fixed. It is shifted deliberately through coordinated institutional pressure, media amplification, and mimetic contagion.",
        vector: "critical",
        status: "settled",
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
        keyFigures: "Foucault",
        coreClaim:
          "Power and knowledge are co-constitutive. Discourse produces its objects. What can be said, by whom, in what context, is itself a site of power.",
        vector: "critical",
        status: "settled",
      },
      {
        number: 2,
        lessonCode: "4.2",
        globalOrder: 32,
        concept: "Disciplinary Society & Normalization",
        keyFigures: "Foucault",
        coreClaim:
          "The Panopticon: surveillance, normalization, and the production of docile bodies. Power operates through the statistical norm, pathologizing deviation.",
        vector: "critical",
        status: "settled",
      },
      {
        number: 3,
        lessonCode: "4.3",
        globalOrder: 33,
        concept: "Biopower & Biopolitics",
        keyFigures: "Foucault / Agamben",
        coreClaim:
          "Power operates on life itself — the statistical management of populations, reproduction, and health. The state of exception is where bare life is exposed to sovereign power.",
        vector: "critical",
        status: "contested",
        criticalNote:
          "Foucault's biopower and Agamben's 'state of exception' are distinct frameworks often conflated; the relationship between them is itself debated. A 500-word lesson cannot responsibly develop the sovereign/disciplinary/biopolitical distinction Foucault requires.",
      },
      {
        number: 4,
        lessonCode: "4.4",
        globalOrder: 34,
        concept: "Necropolitics",
        keyFigures: "Mbembe",
        coreClaim:
          "The ultimate expression of sovereignty is the power to dictate who lives and who is left to die. Necropolitics extends Foucault into the colonial and postcolonial space.",
        vector: "critical",
        status: "settled",
      },
      {
        number: 5,
        lessonCode: "4.5",
        globalOrder: 35,
        concept: "Racial Capitalism",
        keyFigures: "Robinson / Kelley",
        coreClaim:
          "Capitalism did not become racist. It emerged from and continuously requires pre-existing racial hierarchies for its reproduction. Race is not incidental — it is structural.",
        vector: "critical",
        status: "settled",
      },
      {
        number: 6,
        lessonCode: "4.6",
        globalOrder: 36,
        concept: "Coloniality of Power",
        keyFigures: "Quijano / Mignolo",
        coreClaim:
          "Colonialism didn't end — it mutated into a global matrix of power (coloniality) that privileges Eurocentric epistemologies, labor classifications, and ontologies.",
        vector: "critical",
        status: "settled",
      },
      {
        number: 7,
        lessonCode: "4.7",
        globalOrder: 37,
        concept: "Settler Colonialism",
        keyFigures: "Wolfe / Coulthard",
        coreClaim:
          "Settler colonialism is not an event but a structure. Its logic is elimination, not exploitation, and it persists into the present through land and sovereignty.",
        vector: "critical",
        status: "settled",
      },
      {
        number: 8,
        lessonCode: "4.8",
        globalOrder: 38,
        concept: "Intersectionality",
        keyFigures: "Crenshaw / Collins",
        coreClaim:
          "Axes of power (race, class, gender, sexuality) are not additive — they are multiplicative and co-constitutive. Their intersection produces qualitatively distinct positions.",
        vector: "critical",
        status: "settled",
      },
      {
        number: 9,
        lessonCode: "4.9",
        globalOrder: 39,
        concept: "The Spectacle",
        keyFigures: "Debord",
        coreClaim:
          "Late capitalism replaces lived experience with its representation. Authenticity is produced as commodity. The image precedes and generates the event.",
        vector: "critical",
        status: "settled",
      },
      {
        number: 10,
        lessonCode: "4.10",
        globalOrder: 40,
        concept: "Society of Control",
        keyFigures: "Deleuze",
        coreClaim:
          "Post-disciplinary power is continuous, modulated, and algorithmic. Not the prison but the password; not the factory but the corporation-as-spirit.",
        vector: "critical",
        status: "settled",
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
        keyFigures: "Meadows",
        coreClaim:
          "Stocks, flows, and feedback loops. The behavior of a system cannot be predicted from or reduced to its isolated components.",
        vector: "materialist",
        status: "settled",
      },
      {
        number: 2,
        lessonCode: "5.2",
        globalOrder: 42,
        concept: "Feedback Loops & Emergence",
        keyFigures: "Ashby / Holland",
        coreClaim:
          "Reinforcing loops amplify; balancing loops stabilize. Emergence describes system-level properties irreducible to component-level description.",
        vector: "materialist",
        status: "settled",
      },
      {
        number: 3,
        lessonCode: "5.3",
        globalOrder: 43,
        concept: "Complex Adaptive Systems",
        keyFigures: "Holland / Santa Fe",
        coreClaim:
          "Agents adapt to fitness landscapes, generating evolution without designer. Social and biological systems resist top-down control precisely because they adapt.",
        vector: "materialist",
        status: "settled",
      },
      {
        number: 4,
        lessonCode: "5.4",
        globalOrder: 44,
        concept: "Panarchy & Resilience",
        keyFigures: "Holling / Gunderson",
        coreClaim:
          "Systems cycle through growth, conservation, release, and reorganization. Collapse is not failure but creative destruction enabling reorganization. Resilience is the capacity to cycle.",
        vector: "ecological",
        status: "settled",
      },
      {
        number: 5,
        lessonCode: "5.5",
        globalOrder: 45,
        concept: "Planetary Boundaries",
        keyFigures: "Rockström / Steffen",
        coreClaim:
          "Nine biophysical systems define a safe operating space for humanity. We have breached at least six. The Holocene stability that enabled civilization is ending.",
        vector: "ecological",
        status: "contested",
        criticalNote:
          "The specific boundary thresholds and the 'six breached' count are periodically revised as the science updates; treat the numbers as current best estimates, not fixed constants.",
      },
      {
        number: 6,
        lessonCode: "5.6",
        globalOrder: 46,
        concept: "Hyperobjects",
        keyFigures: "Morton",
        coreClaim:
          "Entities — like climate change, microplastics, or the internet — so massively distributed in time and space that they defeat local comprehension. We are inside them; they cannot be pointed at.",
        vector: "ecological",
        status: "contested",
        criticalNote:
          "Morton's 'hyperobjects' is a philosophical-artistic concept, not an empirical category; its uptake is uneven across the sciences.",
      },
      {
        number: 7,
        lessonCode: "5.7",
        globalOrder: 47,
        concept: "Dependent Origination",
        keyFigures: "Madhyamaka / Nāgārjuna",
        coreClaim:
          "Pratītyasamutpāda: nothing possesses inherent, independent existence (svabhāva). All phenomena arise strictly through interdependent relations. Emptiness is not nihilism — it is relational plenitude.",
        vector: "phenomenological",
        status: "contested",
        criticalNote:
          "Emptiness (śūnyatā) is routinely misread as nihilism even in graduate seminars; a 500-word lesson invites precisely the misreading it warns against. Read Nāgārjuna's Mūlamadhyamakakārikā directly. Note a sequencing tension: the critique of inherent existence is arguably logically prior to — not derived from — the systems-theoretic claims of this module.",
      },
      {
        number: 8,
        lessonCode: "5.8",
        globalOrder: 48,
        concept: "Path Dependency, Hysteresis & Lock-in",
        keyFigures: "Arthur / David",
        coreClaim:
          "History constrains futures. Suboptimal solutions persist (QWERTY, fossil infrastructure). Systems remember their past; recovery does not retrace the path of collapse.",
        vector: "materialist",
        status: "settled",
      },
      {
        number: 9,
        lessonCode: "5.9",
        globalOrder: 49,
        concept: "Reflexivity",
        // FIX (critical review): Soros and Bourdieu developed DISTINCT concepts
        // that share a name. Listing them as co-originators conflates them.
        keyFigures: "Soros / Bourdieu",
        coreClaim:
          "Observers constitute what they observe. Markets, social science, and political discourse are self-referential — they produce the realities they describe.",
        vector: "critical",
        status: "contested",
        criticalNote:
          "Soros's reflexivity (financial markets: fallibility + cognitive/participative functions) and Bourdieu's reflexivity (sociological epistemic reflexivity against the epistemic privilege of the knowing subject) are distinct concepts that share a name. Listing them together is orientation, not conflation — read each on their own terms.",
      },
      {
        number: 10,
        lessonCode: "5.10",
        globalOrder: 50,
        concept: "Black Swans & Antifragility",
        keyFigures: "Taleb",
        coreClaim:
          "High-impact, low-probability events are systematically underestimated. Beyond resilience: antifragile systems gain from disorder. The goal is not to withstand volatility but to benefit from it.",
        vector: "materialist",
        status: "contested",
        criticalNote:
          "Taleb's 'Black Swan' and 'antifragility' are influential but rhetorically charged frameworks; some of his specific empirical and statistical claims are disputed within risk science.",
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
        keyFigures: "Harvey / Dardot & Laval",
        coreClaim:
          "Not merely policy but an ontological norm: competition as universal human metric, the enterprise as the ideal form of all social relations.",
        vector: "critical",
        status: "settled",
      },
      {
        number: 2,
        lessonCode: "6.2",
        globalOrder: 52,
        concept: "Accumulation by Dispossession",
        keyFigures: "Harvey",
        coreClaim:
          "Primitive accumulation is not historical — it is ongoing. The commons are continuously enclosed: land, water, knowledge, genetic material, attention.",
        vector: "critical",
        status: "settled",
      },
      {
        number: 3,
        lessonCode: "6.3",
        globalOrder: 53,
        concept: "Social Reproduction & The Care Economy",
        keyFigures: "Federici / Folbre",
        coreClaim:
          "Capitalism externalizes reproductive labor (childcare, eldercare, emotional work) onto women and the Global South while treating it as economically invisible. This subsidy is the hidden foundation of market economies.",
        vector: "critical",
        status: "settled",
      },
      {
        number: 4,
        lessonCode: "6.4",
        globalOrder: 54,
        concept: "Metabolic Rift",
        keyFigures: "Marx / Foster",
        coreClaim:
          "Capitalism creates an irreparable break in the nutrient and energy cycles between social humanity and the natural world. Thermodynamic exhaustion is not a bug — it is a structural feature.",
        vector: "ecological",
        status: "settled",
      },
      {
        number: 5,
        lessonCode: "6.5",
        globalOrder: 55,
        concept: "Performative Economics",
        keyFigures: "MacKenzie / Callon",
        coreClaim:
          "Economic models do not describe markets — they produce them. Black-Scholes created the derivatives market it modeled. Theory is an intervention, not a mirror.",
        vector: "materialist",
        status: "contested",
        criticalNote:
          "The Callon/MacKenzie performativity thesis is debated within economics methodology; critics argue 'performativity' ranges from loose influence to strong construction, and the stronger claims are contested.",
      },
      {
        number: 6,
        lessonCode: "6.6",
        globalOrder: 56,
        concept: "Platform Capitalism",
        keyFigures: "Srnicek",
        coreClaim:
          "Platforms are digital infrastructure for extracting and monopolizing data as the new raw material. Their business model is enclosure, not exchange.",
        vector: "critical",
        status: "settled",
      },
      {
        number: 7,
        lessonCode: "6.7",
        globalOrder: 57,
        concept: "Techno-Feudalism",
        keyFigures: "Varoufakis",
        coreClaim:
          "Markets are being displaced by digital fiefdoms. Extraction is no longer primarily via market profit but via cloud rent — the toll on transactions occurring within proprietary infrastructure.",
        vector: "critical",
        status: "actively-debated",
        criticalNote:
          "Varoufakis's techno-feudalism thesis is actively contested; whether 'cloud rent' genuinely displaces capitalist profit is disputed. See critiques in Jacobin (2023) and the Network Cultures review (2024), and compare with Srnicek's platform-capitalism framing (6.6).",
      },
      {
        number: 8,
        lessonCode: "6.8",
        globalOrder: 58,
        concept: "Surveillance Capitalism",
        keyFigures: "Zuboff",
        coreClaim:
          "Human behavioral experience is extracted as raw material, processed into prediction products, and sold to modify future behavior. The self becomes a resource.",
        vector: "critical",
        status: "contested",
        criticalNote:
          "Zuboff's 'surveillance capitalism' framing is influential but contested; some political economists argue it overstates novelty relative to earlier capitalist accumulation logics.",
      },
      {
        number: 9,
        lessonCode: "6.9",
        globalOrder: 59,
        concept: "The Precariat & Time Poverty",
        keyFigures: "Standing / Fraser",
        coreClaim:
          "A new class defined by what it lacks: labor security, identity, predictable time, and political voice. Precarity is not an aberration — it is the contemporary labor regime.",
        vector: "critical",
        status: "contested",
        criticalNote:
          "Standing's 'precariat' as a distinct class is contested in labor sociology; critics argue it fragments rather than consolidates class analysis.",
      },
      {
        number: 10,
        lessonCode: "6.10",
        globalOrder: 60,
        concept: "Doughnut Economics",
        keyFigures: "Raworth",
        coreClaim:
          "The economy must operate between a social foundation (human needs) and an ecological ceiling (planetary boundaries). Growth as the terminal goal is both empirically false and ecologically fatal.",
        vector: "ecological",
        status: "contested",
        criticalNote:
          "Raworth's doughnut is a normative framework, not a settled economic model; the relationship between its social foundation and ecological ceiling is actively debated by ecological economists.",
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
        keyFigures: "Baudrillard",
        coreClaim:
          "Simulation precedes and generates the real. In the age of social media, the image of the event is the event. Post-truth is not a deviation — it is an ontological condition.",
        vector: "critical",
        status: "settled",
      },
      {
        number: 2,
        lessonCode: "7.2",
        globalOrder: 62,
        concept: "Epistemic Bubbles vs. Echo Chambers",
        keyFigures: "Nguyen",
        coreClaim:
          "Crucially distinct: bubbles are information deficits (easily corrected by exposure); echo chambers actively inoculate against outside epistemic sources (resistant to correction).",
        vector: "critical",
        status: "settled",
      },
      {
        number: 3,
        lessonCode: "7.3",
        globalOrder: 63,
        concept: "Memetics & Cultural Selection",
        keyFigures: "Dawkins / Blackmore",
        coreClaim:
          "Ideas replicate using human nervous systems as hosts, competing for cognitive real estate. Cultural evolution proceeds via differential memetic fitness, not rational selection.",
        vector: "materialist",
        status: "contested",
        criticalNote:
          "Memetics as a rigorous theory is largely marginalized within contemporary cultural evolution research; the 'meme as replicator' framing is contested by dual-inheritance and cultural-epidemiology approaches.",
      },
      {
        number: 4,
        lessonCode: "7.4",
        globalOrder: 64,
        concept: "Algorithmic Governance",
        keyFigures: "Lessig / Eubanks / O'Neil",
        coreClaim:
          "Code is law. When algorithms allocate bail, credit, welfare, and employment, structural bias is automated, obscured in technical complexity, and rendered unaccountable.",
        vector: "critical",
        status: "settled",
      },
      {
        number: 5,
        lessonCode: "7.5",
        globalOrder: 65,
        concept: "Network Effects, Power Laws & Monopolization",
        keyFigures: "Barabási / Metcalfe",
        coreClaim:
          "Preferential attachment drives digital networks toward extreme concentration. Winner-take-all is not market failure — it is the inherent topology of scale-free networks.",
        vector: "materialist",
        status: "settled",
      },
      {
        number: 6,
        lessonCode: "7.6",
        globalOrder: 66,
        concept: "Digital Colonialism & Ghost Work",
        keyFigures: "Couldry / Mejias / Gray & Suri",
        coreClaim:
          "AI systems are built on the extracted data of the Global South and maintained by invisible click-workers performing the cognitive labor that makes automation appear seamless.",
        vector: "critical",
        status: "settled",
      },
      {
        number: 7,
        lessonCode: "7.7",
        globalOrder: 67,
        concept: "Liquid Modernity & Institutional Dissolution",
        keyFigures: "Bauman",
        coreClaim:
          "Solid structures — stable careers, institutions, identities, communities — have dissolved into fluid, transient, individually-managed risk. The state outsources anxiety to the subject.",
        vector: "critical",
        status: "settled",
      },
      {
        number: 8,
        lessonCode: "7.8",
        globalOrder: 68,
        concept: "Stochastic Parrots & Generative Synthesis",
        // FIX (critical review): LeCun publicly and repeatedly DISAGREES with
        // the stochastic-parrots framing of LLMs. Listing him as a co-originator
        // of the concept teaches a falsehood. Removed; he is named in the
        // critical note as a prominent dissenter.
        keyFigures: "Bender / Gebru",
        coreClaim:
          "LLMs are high-dimensional statistical pattern-matchers over human text. They generate probabilistically plausible output, not understanding. The shift from retrieval to generation fundamentally alters epistemic infrastructure.",
        vector: "materialist",
        status: "actively-debated",
        criticalNote:
          "The 'stochastic parrots' framing (Bender, Gebru et al., 2021) is actively contested. Yann LeCun and others dissent from it — LeCun is a prominent critic, NOT a co-originator of the concept (he was incorrectly listed as such in earlier versions). Read Bender & Gebru's actual position alongside LeCun's dissent before forming a judgment.",
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
        keyFigures: "Tooze / Morin",
        coreClaim:
          "Simultaneous, causally-entangled crises whose combined effect exceeds their sum. The key insight: the crises are not separate problems with separate solutions — they share generative roots.",
        vector: "materialist",
        status: "settled",
      },
      {
        number: 2,
        lessonCode: "8.2",
        globalOrder: 70,
        concept: "BANI & The Successor to VUCA",
        keyFigures: "Cascio",
        coreClaim:
          "The modern operating environment is Brittle (not just uncertain), Anxious (not just volatile), Non-linear (not just complex), Incomprehensible (not just ambiguous). The upgrade matters diagnostically.",
        vector: "materialist",
        status: "contested",
        criticalNote:
          "BANI is a consultative framework, not a peer-reviewed model; treat it as a sensemaking heuristic rather than a validated taxonomy.",
      },
      {
        number: 3,
        lessonCode: "8.3",
        globalOrder: 71,
        concept: "Cynefin: Situational Ontology",
        keyFigures: "Snowden",
        coreClaim:
          "Different domains (clear, complicated, complex, chaotic) require radically different epistemic approaches. Applying the wrong one is more dangerous than applying none.",
        vector: "materialist",
        status: "contested",
        criticalNote:
          "Cynefin is a practitioner framework; its boundary conditions between domains are less crisp in practice than the model suggests.",
      },
      {
        number: 4,
        lessonCode: "8.4",
        globalOrder: 72,
        concept: "Metamodernism",
        // FIX (critical review): "Freinacht / Vermeulen & van den Akker"
        // conflates two DISTINCT projects — the academic cultural-theory project
        // (Vermeulen & van den Akker, 2010) and the separate Nordic
        // political-philosophical project (Hanzi Freinacht). Distinguished in
        // the critical note.
        keyFigures: "Vermeulen & van den Akker / Freinacht",
        coreClaim:
          "Cultural oscillation between modernist sincerity and postmodern irony — not synthesis but dialectical movement between them. The both/and that remains self-aware of its own contingency.",
        vector: "phenomenological",
        status: "contested",
        criticalNote:
          "Academic metamodernism (Vermeulen & van den Akker, 'Notes on Metamodernism', 2010) and Nordic political-philosophical metamodernism (Hanzi Freinacht) are distinct projects that share a label. They are not co-originators of a single framework; read them separately.",
      },
      {
        number: 5,
        lessonCode: "8.5",
        globalOrder: 73,
        concept: "Integral Theory (AQAL) & Its Discontents",
        keyFigures: "Wilber / Critics",
        coreClaim:
          "Maps four irreducible dimensions of any phenomenon: Interior/Exterior × Individual/Collective. The framework is powerful for preventing flatland reductionism. Its developmental hierarchy, Eurocentric metaphysics, and political positions remain seriously contested. Use the map; interrogate the mapmaker.",
        vector: "phenomenological",
        status: "contested",
        criticalNote:
          "Wilber's AQAL is correctly marked contested here — a positive example of the right approach. The developmental hierarchy, Eurocentric metaphysics, and political positions are disputed by Integral critics. Note also the syllabus-level reflexivity question: the four-vector architecture of this very curriculum functions as an implicit synthesis framework and deserves the same scrutiny applied to AQAL.",
      },
      {
        number: 6,
        lessonCode: "8.6",
        globalOrder: 74,
        concept: "Abolition & Transformative Justice",
        keyFigures: "Davis / Kaba / Gilmore",
        coreClaim:
          "The task is not to fix broken systems but to ask what makes them necessary and to build alternatives. Abolition is not destruction — it is infrastructure construction for a different social order.",
        vector: "critical",
        status: "settled",
      },
      {
        number: 7,
        lessonCode: "8.7",
        globalOrder: 75,
        concept: "Contemplative Epistemics: Neurophenomenology & Non-Dual Praxis",
        keyFigures: "Varela / Thompson / Nisargadatta",
        coreClaim:
          "First-person inquiry is a rigorous method, not a supplement. Sustained attention practice reveals the constructed, impermanent, and empty nature of the observing self — which is itself the most consequential epistemic discovery in the curriculum.",
        vector: "phenomenological",
        status: "contested",
        criticalNote:
          "The claim that first-person contemplative inquiry is 'rigorous method' is contested within mainstream cognitive science. The micro-praxis for this lesson gestures at a method that in fact requires sustained training to instantiate; a 90-second exercise cannot do so. Treat the practice as a pointer, not a sufficient introduction.",
      },
      {
        number: 8,
        lessonCode: "8.8",
        globalOrder: 76,
        concept: "Sensemaking as Practice: Applied Synthesis",
        keyFigures: "—",
        coreClaim:
          "Capstone. No new concept. Apply the full stack to one live case: a current headline, a personal decision, or a systemic problem. The exercise is to hold epistemics, power, systems, and embodied praxis simultaneously — and notice what the curriculum still cannot see.",
        vector: "phenomenological",
        status: "settled",
      },
    ],
  },
];

export const TOTAL_LESSONS = 76;
