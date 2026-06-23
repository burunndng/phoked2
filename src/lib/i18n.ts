// Internationalization layer.
// Two languages: English (en) and Castellano / European Spanish (es).
// The translation dictionary covers all UI strings. Lesson/module metadata
// is translated via an LLM seed and stored in the database (*Es columns).

export type Lang = "en" | "es";

export const LANGS: { code: Lang; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "es", label: "Castellano", short: "ES" },
];

type Dict = Record<string, string>;

const en: Dict = {
  // ── Site / shell ──────────────────────────────────────────
  "site.name": "Reality's Architecture",
  "site.subtitle": "A micro-learning curriculum",
  "nav.atlas": "Atlas",
  "nav.about": "About",
  "nav.dashboard": "Dashboard",
  "footer.text":
    "Seventy-six lessons. Four integrated vectors. No single framework privileged. Composed on demand — each session generated for you, then held in memory.",
  "footer.edition": "Definitive Edition v3.0",

  // ── Boot states ───────────────────────────────────────────
  "boot.loading": "Loading the curriculum…",
  "boot.retry": "Retry",

  // ── Dashboard ─────────────────────────────────────────────
  "dash.eyebrow": "Definitive Edition v3.0",
  "dash.title": "Understanding Reality's Architecture",
  "dash.titleAccent": "Reality's",
  "dash.subtitle":
    "Seventy-six lessons across ten weeks. A daily micro-session through epistemics, cognition, social construction, power, complexity, political economy, the digital paradigm — and the praxis of holding them all at once.",
  "dash.begin": "Begin the journey",
  "dash.continue": "Continue",
  "dash.next": "Next:",
  "dash.complete": "complete",
  "dash.lessons": "lessons",
  "dash.of": "of",

  // ── Vectors ───────────────────────────────────────────────
  "vector.critical.short": "Critical",
  "vector.critical.label": "Critical / Structural",
  "vector.critical.desc":
    "Race, gender, coloniality, class as constitutive, not additive.",
  "vector.materialist.short": "Materialist",
  "vector.materialist.label": "Materialist / Formal",
  "vector.materialist.desc":
    "Thermodynamics, complexity science, cognitive architecture.",
  "vector.phenomenological.short": "Phenomenological",
  "vector.phenomenological.label": "Phenomenological / Contemplative",
  "vector.phenomenological.desc":
    "First-person inquiry as rigorous method, not supplement.",
  "vector.ecological.short": "Ecological",
  "vector.ecological.label": "Ecological / More-than-human",
  "vector.ecological.desc":
    "The living world as analytical actor, not backdrop.",

  // ── Dashboard sections ────────────────────────────────────
  "dash.vectors.eyebrow": "Four integrated vectors",
  "dash.vectors.title": "Running throughout, not bolted on",
  "dash.vectors.desc":
    "Each lesson leads with one vector and lets the others breathe at the margins. Together they prevent the curriculum from collapsing into a single register.",
  "dash.journey.eyebrow": "The journey",
  "dash.journey.title": "Eight modules, one architecture",
  "dash.journey.desc":
    "The sequence moves from who is knowing, through how collectives construct reality and how power operates, to the praxis of navigating it all.",
  "dash.done": "done",
  "dash.completeShort": "done",

  // ── Read this first callout ───────────────────────────────
  "readFirst.label": "Read this first",
  "readFirst.body":
    "This curriculum is a navigational map, not a primary source. Each lesson is a 500-word pointer — enough to orient you, not enough to exhaust a concept that took its originators entire books. Treat the “Key Figures” as heuristic orientation, not citation-grade; verify attribution before relying on it. Lessons marked Contested or Actively Debated carry a critical-reading note — read it, and read the primary sources alongside.",
  "readFirst.footer":
    "And: read what this curriculum cannot see (below) before you read what it can.",
  "readFirst.dismiss": "Dismiss",

  // ── How to read ───────────────────────────────────────────
  "howto.eyebrow": "How to read this",
  "howto.title": "A navigational map, not a destination",
  "howto.desc":
    "The format is a pointer, not a primary source. Each lesson is 500 words — enough to orient, not to exhaust. The four practices below keep the format honest.",
  "howto.1.title": "Treat each lesson as a pointer",
  "howto.1.body":
    "For every lesson, locate and at least skim the primary source by the named key figure before forming a judgment. The Mechanism section names the operative logic; the source gives you the depth.",
  "howto.2.title": "Verify attribution before citing",
  "howto.2.body":
    "The Key Figures column is heuristic — originators, popularizers, and critics may all appear. Cross-check against the Stanford Encyclopedia of Philosophy or the relevant disciplinary handbook.",
  "howto.3.title": "Read contested lessons with their critiques",
  "howto.3.body":
    "Lessons marked Contested or Actively Debated carry a critical-reading note. Read it, then read the named critics. A syllabus that denounces the view from nowhere must not present its own favored frameworks as settled.",
  "howto.4.title": "Treat the four-vector frame as a hypothesis",
  "howto.4.body":
    "The Critical, Materialist, Phenomenological, and Ecological lenses are not the four irreducible dimensions of reality — they are a design choice. Ask, for each module, whether each vector is genuinely present or merely gestured at.",

  // ── Acknowledgment ───────────────────────────────────────
  "ack.eyebrow": "What this version still cannot see",
  "ack.body":
    "Aesthetic and artistic knowledge is absent. Queer theory beyond Butler is thin. Non-Western systems thought appears at the margins. The body at scale — trauma, somatic politics, disability — is underrepresented.",
  "ack.footer":
    "These are not defects to be embarrassed by. They are the next iteration's brief.",

  // ── Module view ───────────────────────────────────────────
  "mod.allModules": "All modules",
  "mod.lessons": "lessons",
  "mod.complete": "complete",

  // ── Lesson reader ─────────────────────────────────────────
  "lesson.lesson": "Lesson",
  "lesson.keyFigures": "Key Figures",
  "lesson.coreClaim": "Core Claim",
  "lesson.mechanism": "Mechanism",
  "lesson.mechanism.hint":
    "a pointer — consult primary sources for depth",
  "lesson.canonicalExample": "Canonical Example",
  "lesson.canonicalExample.hint": "post-2020",
  "lesson.conceptualTension": "Conceptual Tension",
  "lesson.conceptualTension.hint": "the live debate",
  "lesson.connectionNode": "Connection Node",
  "lesson.microPraxis": "Micro-Praxis",
  "lesson.90seconds": "90 seconds",
  "lesson.zeigarnikHook": "Zeigarnik Hook",
  "lesson.criticalReading": "Critical reading",
  "lesson.privateReflection": "Private reflection",
  "lesson.saving": "saving",
  "lesson.reflectionPlaceholder":
    "What landed? What resists? What does this make visible that was invisible a moment ago?",
  "lesson.markComplete": "Mark complete",
  "lesson.completed": "Completed",
  "lesson.markedComplete": "Lesson complete",
  "lesson.markedIncomplete": "Marked incomplete",
  "lesson.markedCompleteDesc": "marked as complete.",
  "lesson.prev": "Prev",
  "lesson.next": "Next",
  "lesson.composing": "Composing lesson",
  "lesson.composingBody":
    "Each session is composed on demand — a pointer to the mechanism, a canonical example, the tension that keeps it alive, and a practice you can do in ninety seconds.",
  "lesson.retry": "Retry",
  "lesson.failed": "Failed to compose lesson. Please retry.",

  // ── Atlas ─────────────────────────────────────────────────
  "atlas.eyebrow": "The Atlas",
  "atlas.title": "All seventy-six lessons",
  "atlas.desc":
    "The full architecture at a glance. Each cell is a lesson; each column is a module. Tap any cell to compose and read it.",
  "atlas.legend.completed": "completed",
  "atlas.legend.notYet": "not yet",
  "atlas.legend.contested": "contested",
  "atlas.legend.debated": "actively debated",

  // ── About ─────────────────────────────────────────────────
  "about.eyebrow": "About this curriculum",
  "about.title": "A daily practice of seeing",
  "about.body1":
    "This is not a course to be completed. It is an instrument to be kept. Seventy-six lessons, five to ten minutes each, composed on demand and held in memory — a daily practice of seeing how reality is built, by whom, and at whose expense.",
  "about.body2":
    "The sequence has a logic. It moves from who is knowing, through how we know and what the mind does, to how collectives construct reality, how power operates on that construction, how systems behave, the specific material form of the present, the information envelope we live inside — and finally to navigation. Each lesson cross-references at least one prior lesson. The cross-references are load-bearing: they are how the architecture holds.",
  "about.structure.title": "The lesson structure",
  "about.structure.desc":
    "Every session, the same eight movements — never skipped.",
  "about.structure.1.k": "Concept & Key Figures",
  "about.structure.1.v":
    "What, and the names orienting you. Key Figures are heuristic — primary originators, popularizers, and critics may all appear. Not citation-grade; verify against primary sources.",
  "about.structure.2.k": "Core Claim",
  "about.structure.2.v":
    "Two sentences. Maximum precision. No hedging.",
  "about.structure.3.k": "Contestation Status",
  "about.structure.3.v":
    "Each lesson is marked Settled, Contested, or Actively Debated. Contested lessons carry a critical-reading note pointing to the live dispute.",
  "about.structure.4.k": "Mechanism",
  "about.structure.4.v":
    "A precise pointer to how it operates — not full depth. 500 words cannot deliver what took originators entire books. Consult the primary source for the full account.",
  "about.structure.5.k": "Canonical Example",
  "about.structure.5.v": "Post-2020, specific, non-obvious.",
  "about.structure.6.k": "Conceptual Tension",
  "about.structure.6.v":
    "The paradox or critique that keeps it alive. For contested lessons, this is where the live debate is foregrounded.",
  "about.structure.7.k": "Connection Node",
  "about.structure.7.v":
    "At least one explicit cross-link to a prior lesson.",
  "about.structure.8.k": "Micro-Praxis",
  "about.structure.8.v":
    "A ninety-second exercise you can do immediately.",
  "about.structure.9.k": "Zeigarnik Hook",
  "about.structure.9.v": "One unresolved question. No answer.",
  "about.vectors.title": "Four integrated vectors",
  "about.vectors.desc": "Running throughout, not bolted on.",
  "about.blind.title": "What this version still cannot see",
  "about.blind.body":
    "Aesthetic and artistic knowledge is entirely absent. Queer theory beyond Butler is thin. Non-Western systems thought — African ubuntu cosmology, Andean sumak kawsay, Daoist process philosophy — appears at the margins. The body at scale — trauma studies, somatic politics, disability studies — is underrepresented relative to its explanatory power.",
  "about.blind.footer":
    "These are not defects to be embarrassed by. They are the next iteration's brief.",

  // ── Contestation status ───────────────────────────────────
  "status.settled.label": "Settled",
  "status.settled.desc":
    "Broadly stable in the relevant scholarly community. Read critically anyway.",
  "status.contested.label": "Contested",
  "status.contested.desc":
    "Subject to significant ongoing critique. Read with the primary sources and the named critics.",
  "status.actively-debated.label": "Actively Debated",
  "status.actively-debated.desc":
    "The framing itself is live-disputed. Do not treat the core claim as consensus.",

  // ── Knowledge graph ───────────────────────────────────────
  "nav.graph": "Graph",
  "graph.eyebrow": "The Knowledge Graph",
  "graph.title": "Seventy-six nodes, one architecture",
  "graph.desc":
    "Every lesson is a node. Every cross-reference is an edge. The structure that emerges is the curriculum's actual architecture — not a list, but a network. Solid lines are the reading sequence; glowing lines are cross-references between lessons. Hover to trace a connection. Click to read.",
  "graph.legend.sequence": "reading sequence",
  "graph.legend.reference": "cross-reference",
  "graph.legend.completed": "completed",
  "graph.legend.contested": "contested",
  "graph.legend.debated": "actively debated",
  "graph.hint": "Drag nodes · Scroll to zoom · Click to read",
  "graph.empty": "No lessons generated yet. Open a lesson to populate the graph with cross-references.",
  "graph.stats.nodes": "nodes",
  "graph.stats.refs": "cross-references",
  "graph.loading": "Building the graph…",
};

const es: Dict = {
  // ── Sitio / shell ─────────────────────────────────────────
  "site.name": "La arquitectura de la realidad",
  "site.subtitle": "Un plan de microaprendizaje",
  "nav.atlas": "Atlas",
  "nav.about": "Acerca de",
  "nav.dashboard": "Panel",
  "footer.text":
    "Setenta y seis lecciones. Cuatro vectores integrados. Ningún marco de síntesis privilegiado. Compuestas bajo demanda — cada sesión generada para ti, luego conservada en memoria.",
  "footer.edition": "Edición definitiva v3.0",

  // ── Estados de carga ──────────────────────────────────────
  "boot.loading": "Cargando el plan…",
  "boot.retry": "Reintentar",

  // ── Panel ─────────────────────────────────────────────────
  "dash.eyebrow": "Edición definitiva v3.0",
  "dash.title": "Comprendiendo la arquitectura de la realidad",
  "dash.titleAccent": "de la realidad",
  "dash.subtitle":
    "Setenta y seis lecciones a lo largo de diez semanas. Una micro-sesión diaria sobre epistemología, cognición, construcción social, poder, complejidad, economía política, el paradigma digital — y la praxis de sostenerlo todo a la vez.",
  "dash.begin": "Comenzar el recorrido",
  "dash.continue": "Continuar",
  "dash.next": "Siguiente:",
  "dash.complete": "completado",
  "dash.lessons": "lecciones",
  "dash.of": "de",

  // ── Vectores ──────────────────────────────────────────────
  "vector.critical.short": "Crítico",
  "vector.critical.label": "Crítico / Estructural",
  "vector.critical.desc":
    "Raza, género, colonialidad, clase como constitutivos, no aditivos.",
  "vector.materialist.short": "Materialista",
  "vector.materialist.label": "Materialista / Formal",
  "vector.materialist.desc":
    "Termodinámica, ciencia de la complejidad, arquitectura cognitiva.",
  "vector.phenomenological.short": "Fenomenológico",
  "vector.phenomenological.label": "Fenomenológico / Contemplativo",
  "vector.phenomenological.desc":
    "La indagación en primera persona como método riguroso, no como suplemento.",
  "vector.ecological.short": "Ecológico",
  "vector.ecological.label": "Ecológico / Más-que-humano",
  "vector.ecological.desc":
    "El mundo vivo como actor analítico, no como telón de fondo.",

  // ── Secciones del panel ───────────────────────────────────
  "dash.vectors.eyebrow": "Cuatro vectores integrados",
  "dash.vectors.title": "Presentes en todo, no superpuestos",
  "dash.vectors.desc":
    "Cada lección se conduce por un vector y deja que los otros respiren en los márgenes. Juntos evitan que el plan colapse en un único registro.",
  "dash.journey.eyebrow": "El recorrido",
  "dash.journey.title": "Ocho módulos, una arquitectura",
  "dash.journey.desc":
    "La secuencia va de quién conoce, pasando por cómo las colectividades construyen la realidad y cómo opera el poder, hasta la praxis de navegarlo todo.",
  "dash.done": "hecho",
  "dash.completeShort": "hecho",

  // ── Aviso «Leer esto primero» ──────────────────────────────
  "readFirst.label": "Leer esto primero",
  "readFirst.body":
    "Este plan es un mapa de navegación, no una fuente primaria. Cada lección es un indicador de 500 palabras — suficiente para orientarte, no para agotar un concepto que costó a sus autores libros enteros. Trata las «Figuras clave» como orientación heurística, no como citación fiable; verifica la atribución antes de depender de ella. Las lecciones marcadas como Controvertidas o Activamente debatidas llevan una nota de lectura crítica — léela, y lee también las fuentes primarias.",
  "readFirst.footer":
    "Y: lee lo que este plan no puede ver (abajo) antes de leer lo que sí puede.",
  "readFirst.dismiss": "Cerrar",

  // ── Cómo leer esto ────────────────────────────────────────
  "howto.eyebrow": "Cómo leer esto",
  "howto.title": "Un mapa de navegación, no un destino",
  "howto.desc":
    "El formato es un indicador, no una fuente primaria. Cada lección son 500 palabras — suficientes para orientar, no para agotar. Las cuatro prácticas de abajo mantienen el formato honesto.",
  "howto.1.title": "Trata cada lección como un indicador",
  "howto.1.body":
    "Para cada lección, localiza y al menos hojea la fuente primaria de la figura clave nombrada antes de formar un juicio. La sección Mecanismo nombra la lógica operativa; la fuente te da la profundidad.",
  "howto.2.title": "Verifica la atribución antes de citar",
  "howto.2.body":
    "La columna de Figuras clave es heurística — originadores, divulgadores y críticos pueden aparecer todos. Verifica con la Enciclopedia Stanford de Filosofía o el manual disciplinario correspondiente.",
  "howto.3.title": "Lee las lecciones controvertidas con sus críticas",
  "howto.3.body":
    "Las lecciones marcadas como Controvertidas o Activamente debatidas llevan una nota de lectura crítica. Léela, luego lee a los críticos nombrados. Un plan que denuncia el «punto de vista desde ninguna parte» no debe presentar sus propios marcos favoritos como consolidados.",
  "howto.4.title": "Trata el marco de cuatro vectores como una hipótesis",
  "howto.4.body":
    "Las lentes Crítica, Materialista, Fenomenológica y Ecológica no son las cuatro dimensiones irreductibles de la realidad — son una decisión de diseño. Pregunta, para cada módulo, si cada vector está genuinamente presente o solo sugerido.",

  // ── Reconocimiento ────────────────────────────────────────
  "ack.eyebrow": "Lo que esta versión aún no puede ver",
  "ack.body":
    "El conocimiento estético y artístico está ausente. La teoría queer más allá de Butler es escasa. El pensamiento sistémico no occidental aparece en los márgenes. El cuerpo a escala — estudios del trauma, política somática, estudios de la discapacidad — está infrarrepresentado.",
  "ack.footer":
    "Estos no son defectos de los que avergonzarse. Son el encargo de la próxima iteración.",

  // ── Vista de módulo ───────────────────────────────────────
  "mod.allModules": "Todos los módulos",
  "mod.lessons": "lecciones",
  "mod.complete": "completado",

  // ── Lector de lecciones ───────────────────────────────────
  "lesson.lesson": "Lección",
  "lesson.keyFigures": "Figuras clave",
  "lesson.coreClaim": "Afirmación central",
  "lesson.mechanism": "Mecanismo",
  "lesson.mechanism.hint":
    "un indicador — consulta las fuentes primarias para profundidad",
  "lesson.canonicalExample": "Ejemplo canónico",
  "lesson.canonicalExample.hint": "post-2020",
  "lesson.conceptualTension": "Tensión conceptual",
  "lesson.conceptualTension.hint": "el debate vigente",
  "lesson.connectionNode": "Nodo de conexión",
  "lesson.microPraxis": "Micropráctica",
  "lesson.90seconds": "90 segundos",
  "lesson.zeigarnikHook": "Gancho de Zeigarnik",
  "lesson.criticalReading": "Lectura crítica",
  "lesson.privateReflection": "Reflexión privada",
  "lesson.saving": "guardando",
  "lesson.reflectionPlaceholder":
    "¿Qué te llegó? ¿Qué resiste? ¿Qué hace visible esto que era invisible hace un momento?",
  "lesson.markComplete": "Marcar como completo",
  "lesson.completed": "Completado",
  "lesson.markedComplete": "Lección completada",
  "lesson.markedIncomplete": "Marcada como incompleta",
  "lesson.markedCompleteDesc": "marcada como completada.",
  "lesson.prev": "Anterior",
  "lesson.next": "Siguiente",
  "lesson.composing": "Componiendo la lección",
  "lesson.composingBody":
    "Cada sesión se compone bajo demanda — un indicador del mecanismo, un ejemplo canónico, la tensión que la mantiene viva, y una práctica que puedes hacer en noventa segundos.",
  "lesson.retry": "Reintentar",
  "lesson.failed": "No se pudo componer la lección. Reinténtalo.",

  // ── Atlas ─────────────────────────────────────────────────
  "atlas.eyebrow": "El atlas",
  "atlas.title": "Las setenta y seis lecciones",
  "atlas.desc":
    "La arquitectura completa de un vistazo. Cada celda es una lección; cada columna es un módulo. Toca cualquier celda para componerla y leerla.",
  "atlas.legend.completed": "completado",
  "atlas.legend.notYet": "aún no",
  "atlas.legend.contested": "controvertido",
  "atlas.legend.debated": "activamente debatido",

  // ── Acerca de ─────────────────────────────────────────────
  "about.eyebrow": "Acerca de este plan",
  "about.title": "Una práctica diaria de mirar",
  "about.body1":
    "Esto no es un curso para completar. Es un instrumento para conservar. Setenta y seis lecciones, de cinco a diez minutos cada una, compuestas bajo demanda y conservadas en memoria — una práctica diaria de ver cómo se construye la realidad, por quién, y a expensas de quién.",
  "about.body2":
    "La secuencia tiene una lógica. Va de quién conoce, pasando por cómo conocemos y qué hace la mente, a cómo las colectividades construyen la realidad, cómo opera el poder sobre esa construcción, cómo se comportan los sistemas, la forma material específica del presente, la envoltura informativa en la que vivimos — y finalmente a la navegación. Cada lección remite a al menos una lección anterior. Las referencias cruzadas son estructurales: son cómo se sostiene la arquitectura.",
  "about.structure.title": "La estructura de la lección",
  "about.structure.desc":
    "Cada sesión, los mismos ocho movimientos — nunca se omiten.",
  "about.structure.1.k": "Concepto y Figuras clave",
  "about.structure.1.v":
    "Qué, y los nombres que te orientan. Las Figuras clave son heurísticas — originadores, divulgadores y críticos pueden aparecer todos. No son de nivel citable; verifica con las fuentes primarias.",
  "about.structure.2.k": "Afirmación central",
  "about.structure.2.v":
    "Dos oraciones. Máxima precisión. Sin titubeos.",
  "about.structure.3.k": "Estado de controversia",
  "about.structure.3.v":
    "Cada lección se marca como Consolidado, Controvertido o Activamente debatido. Las lecciones controvertidas llevan una nota de lectura crítica que señala la disputa vigente.",
  "about.structure.4.k": "Mecanismo",
  "about.structure.4.v":
    "Un indicador preciso de cómo opera — no profundidad completa. 500 palabras no pueden dar lo que costó a los originadores libros enteros. Consulta la fuente primaria para el relato completo.",
  "about.structure.5.k": "Ejemplo canónico",
  "about.structure.5.v": "Post-2020, específico, no obvio.",
  "about.structure.6.k": "Tensión conceptual",
  "about.structure.6.v":
    "La paradoja o crítica que la mantiene viva. Para las lecciones controvertidas, aquí es donde se foregrounda el debate vigente.",
  "about.structure.7.k": "Nodo de conexión",
  "about.structure.7.v":
    "Al menos una referencia cruzada explícita a una lección anterior.",
  "about.structure.8.k": "Micropráctica",
  "about.structure.8.v":
    "Un ejercicio de noventa segundos que puedes hacer inmediatamente.",
  "about.structure.9.k": "Gancho de Zeigarnik",
  "about.structure.9.v": "Una pregunta no resuelta. Sin respuesta.",
  "about.vectors.title": "Cuatro vectores integrados",
  "about.vectors.desc": "Presentes en todo, no superpuestos.",
  "about.blind.title": "Lo que esta versión aún no puede ver",
  "about.blind.body":
    "El conocimiento estético y artístico está totalmente ausente. La teoría queer más allá de Butler es escasa. El pensamiento sistémico no occidental — la cosmología ubuntu africana, el sumak kawsay andino, la filosofía del proceso daoísta — aparece en los márgenes. El cuerpo a escala — estudios del trauma, política somática, estudios de la discapacidad — está infrarrepresentado en relación con su poder explicativo.",
  "about.blind.footer":
    "Estos no son defectos de los que avergonzarse. Son el encargo de la próxima iteración.",

  // ── Estado de controversia ────────────────────────────────
  "status.settled.label": "Consolidado",
  "status.settled.desc":
    "Ampliamente establecido en la comunidad académica correspondiente. Léelo críticamente de todos modos.",
  "status.contested.label": "Controvertido",
  "status.contested.desc":
    "Sujeto a crítica significativa y continua. Léelo con las fuentes primarias y los críticos nombrados.",
  "status.actively-debated.label": "Activamente debatido",
  "status.actively-debated.desc":
    "El propio encuadre está en disputa vigente. No trates la afirmación central como consenso.",

  // ── Grafo de conocimiento ─────────────────────────────────
  "nav.graph": "Grafo",
  "graph.eyebrow": "El grafo de conocimiento",
  "graph.title": "Setenta y seis nodos, una arquitectura",
  "graph.desc":
    "Cada lección es un nodo. Cada referencia cruzada es un enlace. La estructura que emerge es la arquitectura real del plan — no una lista, sino una red. Las líneas sólidas son la secuencia de lectura; las líneas brillantes son referencias cruzadas entre lecciones. Pasa el cursor para trazar una conexión. Haz clic para leer.",
  "graph.legend.sequence": "secuencia de lectura",
  "graph.legend.reference": "referencia cruzada",
  "graph.legend.completed": "completado",
  "graph.legend.contested": "controvertido",
  "graph.legend.debated": "activamente debatido",
  "graph.hint": "Arrastra los nodos · Rueda para zoom · Clic para leer",
  "graph.empty": "Aún no hay lecciones generadas. Abre una lección para poblar el grafo con referencias cruzadas.",
  "graph.stats.nodes": "nodos",
  "graph.stats.refs": "referencias cruzadas",
  "graph.loading": "Construyendo el grafo…",
};

const DICTS: Record<Lang, Dict> = { en, es };

export function translate(lang: Lang, key: string): string {
  return DICTS[lang]?.[key] ?? DICTS.en[key] ?? key;
}

// Re-export the translate function under a short name for use with the store's
// `lang` value. Components typically use the useT() hook below instead.
export const t = translate;
