// Castellano (European Spanish) translations of syllabus metadata.
// Additive: anything missing here falls back to the English original, so
// modules can be translated incrementally without breaking the app.
// Scholar names, acronyms (LLM, AQAL, BANI, Cynefin) and lesson codes
// are deliberately left untranslated.

import type { Lang } from "./i18n";

export interface ModuleEs {
  title: string;
  theme: string;
  description: string;
}

export interface LessonEs {
  concept: string;
  coreClaim: string;
  criticalNote?: string;
}

// keyed by module number
export const ES_MODULES: Record<number, ModuleEs> = {
  1: {
    title: "Posicionalidad, epistemología y lo real",
    theme:
      "Antes de preguntar cómo sabemos, pregunte quién conoce, desde dónde y con qué aparato heredado. Después examine los límites estructurales del propio conocimiento.",
    description:
      "Diez lecciones sobre conocimiento situado, paradigma, la distancia entre mapa y territorio, la duda bayesiana, la falsabilidad, la subdeterminación, el círculo hermenéutico, las epistemologías indígenas y el realismo crítico.",
  },
  2: {
    title: "El sujeto cognoscente y la arquitectura de la experiencia",
    theme:
      "La mente no es un procesador racional de verdades. Es un suceso predictivo, encarnado, evolutivamente improvisado y, en último término, procesual — con un sistema nervioso tan político como biológico.",
    description:
      "Diez lecciones sobre procesamiento predictivo, cognición 4E, teoría polivagal, afecto, teoría de proceso dual, racionalidad limitada, razonamiento motivado, el yo narrativo, anatta y cascadas de disponibilidad.",
  },
  3: {
    title: "Construcción social, reproducción y performance",
    theme:
      "La realidad tal como la vivimos es una fabricación colectiva, sostenida por el contagio mimético, representada hasta existir y reproducida mediante un trabajo que el capitalismo vuelve invisible.",
    description:
      "Diez lecciones sobre construcción social de la realidad, performatividad, reproducción social, habitus, deseo mimético, hegemonía cultural, fundamentos morales, efervescencia colectiva, teoría del actor-red y la ventana de Overton.",
  },
  4: {
    title: "Poder, matrices coloniales y necropolítica",
    theme:
      "El poder no es solo represivo: es productivo, territorial y necropolítico. Se construyó sobre jerarquías raciales, coloniales y patriarcales, y sigue necesitándolas.",
    description:
      "Diez lecciones sobre discurso y poder/saber, sociedad disciplinaria, biopoder, necropolítica, capitalismo racial, colonialidad del poder, colonialismo de asentamiento, interseccionalidad, el espectáculo y la sociedad de control.",
  },
  5: {
    title: "Sistemas, complejidad, ecología y originación dependiente",
    theme:
      "La mayoría de los fenómenos son no lineales, emergentes y carecen de esencia independiente — incluidos los sistemas planetarios hoy desestabilizados por la lógica extractiva de los módulos 4 y 6.",
    description:
      "Diez lecciones sobre pensamiento sistémico, retroalimentación y emergencia, sistemas adaptativos complejos, panarquía, límites planetarios, hiperobjetos, originación dependiente, dependencia de la trayectoria, reflexividad y cisnes negros.",
  },
  6: {
    title: "Economía política, metabolismo y la coyuntura presente",
    theme:
      "La forma histórica concreta de capitalismo extractivo que habitamos: su metabolismo energético, su mutación en tecnofeudalismo y sus alternativas.",
    description:
      "Diez lecciones sobre racionalidad neoliberal, acumulación por desposesión, economía del cuidado, fractura metabólica, economía performativa, capitalismo de plataforma, tecnofeudalismo, capitalismo de vigilancia, precariado y economía del donut.",
  },
  7: {
    title: "El paradigma digital, la IA y la infraestructura epistémica",
    theme:
      "Las consecuencias epistémicas, sociales, ontológicas y materiales de vivir dentro de entornos de información probabilísticos y gobernados algorítmicamente, construidos sobre trabajo explotado.",
    description:
      "Ocho lecciones sobre hiperrealidad, burbujas epistémicas frente a cámaras de eco, memética, gobernanza algorítmica, efectos de red, colonialismo digital, modernidad líquida y loros estocásticos.",
  },
  8: {
    title: "Navegación, síntesis y praxis en la policrisis",
    theme:
      "Ningún marco integra todo. Sintetizar significa aquí poder sostener simultáneamente varias lentes parcialmente incompatibles y actuar desde esa complejidad sin parálisis ni falsa resolución.",
    description:
      "Ocho lecciones sobre policrisis, BANI, Cynefin, metamodernismo, teoría integral, abolición, epistemología contemplativa y la síntesis aplicada.",
  },
};

// keyed by lessonCode
export const ES_LESSONS: Record<string, LessonEs> = {
  // ── Módulo 2 ─────────────────────────────────────────────────────
  "2.1": {
    concept: "Procesamiento predictivo",
    coreClaim:
      "El cerebro no es un receptor pasivo de datos sensoriales. Es una máquina de predicción que genera hipótesis sobre el mundo y las actualiza minimizando el error de predicción.",
    criticalNote:
      "El procesamiento predictivo y el principio de energía libre se presentan como el modelo dominante de la cognición, pero su adecuación empírica se discute activamente dentro de la ciencia cognitiva; véanse las críticas de Colombo, Klein y otros, y el intercambio en Synthese.",
  },
  "2.2": {
    concept: "Cognición encarnada / 4E",
    coreClaim:
      "La cognición es encarnada, situada, enactiva y extendida. El cuerpo y el entorno son constitutivos del pensamiento, no vehículos de este.",
  },
  "2.3": {
    concept: "Teoría polivagal",
    coreClaim:
      "El sistema nervioso autónomo funciona de forma jerárquica (vagal ventral → simpático → vagal dorsal). La seguridad es el requisito previo de la cognición superior. El sistema nervioso es un aparato político.",
    criticalNote:
      "La teoría de Porges se atribuye correctamente, pero aquí se presenta como más asentada de lo que está. Es objeto de crítica sostenida: véanse Grossman y Taylor, y el intercambio en curso (2025-2026) en Clinical Neuropsychiatry y Frontiers in Integrative Neuroscience. La afirmación de que «el sistema nervioso es un aparato político» es una extrapolación ulterior sobre una base ya discutida.",
  },
  "2.4": {
    concept: "Teoría del afecto",
    coreClaim:
      "El afecto —la intensidad prepersonal— precede y moldea la emoción y la cognición. Es además el mecanismo mediante el cual el poder circula por debajo de la conciencia.",
    criticalNote:
      "La distinción de la teoría del afecto entre «afecto» (intensidad prepersonal) y «emoción» (sentimiento cualificado) está discutida; algunos sostienen que la separación estricta es empíricamente inestable. La línea Massumi/Ahmed difiere en énfasis.",
  },
  "2.5": {
    concept: "Teoría del proceso dual",
    coreClaim:
      "El Sistema 1 (rápido, automático, afectivo) domina. El Sistema 2 (lento, deliberado) es metabólicamente caro y se despliega mucho menos de lo que creemos.",
    criticalNote:
      "El marco limpio Sistema 1 / Sistema 2 ha sido criticado por exagerado; véanse las matizaciones de Evans y Stanovich y los problemas de replicación en torno a algunos estudios de priming que motivaron el planteamiento original.",
  },
  "2.6": {
    concept: "Racionalidad limitada y satisfacción",
    coreClaim:
      "Los humanos no optimizan: se conforman con lo suficiente, hallando soluciones bastante buenas bajo restricciones cognitivas y temporales reales.",
  },
  "2.7": {
    concept: "Razonamiento motivado y disonancia",
    coreClaim:
      "Razonamos para justificar conclusiones alcanzadas emocionalmente. La racionalización es lo habitual; la racionalidad, la excepción.",
    criticalNote:
      "El modelo intuicionista social de Haidt y su teoría de los fundamentos morales (3.7) están discutidos en términos metodológicos y políticos; conviene tratar sus afirmaciones empíricas concretas como debatibles y no como asentadas.",
  },
  "2.8": {
    concept: "El yo narrativo",
    coreClaim:
      "El yo no se descubre, sino que se construye mediante el relato. La identidad es una historia contada en el tiempo y revisada bajo presión.",
  },
  "2.9": {
    concept: "Anatta y los skandhas",
    coreClaim:
      "El yo no es una entidad fija, sino un agregado dinámico e interdependiente de forma, sensación, percepción, formaciones mentales y consciencia, ninguno de los cuales constituye un «yo» permanente.",
    criticalNote:
      "Anattā y śūnyatā se leen habitualmente de forma errónea como nihilismo incluso en seminarios de posgrado; una lección de 500 palabras invita precisamente a la mala lectura que advierte. Lea directamente las Mūlamadhyamakakārikā de Nāgārjuna. Nótese también una tensión de secuenciación: la crítica de la existencia inherente (svabhāva) es lógicamente anterior, no derivada, de las afirmaciones sistémicas de M5.",
  },
  "2.10": {
    concept: "Cascadas de disponibilidad y relevancia fabricada",
    coreClaim:
      "Juzgamos la probabilidad por la facilidad de recuerdo. Los medios, los algoritmos y los actores políticos explotan sistemáticamente ese heurístico para distorsionar la percepción colectiva del riesgo.",
  },

  // ── Módulo 3 ─────────────────────────────────────────────────────
  "3.1": {
    concept: "Construcción social de la realidad",
    coreClaim:
      "Las instituciones son productos humanos que se objetivan y después constriñen a sus creadores. La dialéctica de exteriorización, objetivación e interiorización.",
  },
  "3.2": {
    concept: "Performatividad",
    coreClaim:
      "La identidad no es una esencia interna, sino la repetición estilizada de actos. El género —y otras categorías— no se expresa: se produce mediante la representación.",
  },
  "3.3": {
    concept: "Teoría de la reproducción social",
    coreClaim:
      "El capitalismo depende del trabajo doméstico y de cuidados no remunerado —realizado mayoritariamente por mujeres— para la reproducción cotidiana y generacional de la fuerza de trabajo. Esto no es marginal, sino fundacional.",
  },
  "3.4": {
    concept: "Habitus y campo",
    coreClaim:
      "Las disposiciones interiorizadas (habitus) se mueven en arenas competitivas estructuradas (campos). La clase, la raza y el género se reproducen mediante el gusto, el gesto y el capital incorporado.",
  },
  "3.5": {
    concept: "Deseo mimético y chivo expiatorio",
    coreClaim:
      "Deseamos lo que otros desean, no lo que elegimos de forma independiente. Ello produce contagio, rivalidad y, finalmente, violencia colectiva descargada sobre un chivo expiatorio que restaura una cohesión temporal.",
    criticalNote:
      "El marco del deseo mimético de Girard es influyente, pero está discutido empírica y teóricamente; el mecanismo del chivo expiatorio es cuestionado por antropólogos y especialistas en la Antigüedad clásica.",
  },
  "3.6": {
    concept: "Hegemonía cultural",
    coreClaim:
      "Las clases dominantes gobiernan principalmente mediante el consentimiento, no la coacción. El «sentido común» es un logro político: la naturalización de la cosmovisión de una clase concreta.",
  },
  "3.7": {
    concept: "Teoría de los fundamentos morales",
    coreClaim:
      "Las divisiones políticas y morales se corresponden con módulos psicológicos evolutivos distintos (cuidado, equidad, lealtad, autoridad, santidad, libertad). El desacuerdo suele ser interparadigmático, no irracional.",
    criticalNote:
      "La teoría de los fundamentos morales está discutida en términos metodológicos y políticos; tanto la afirmación de modularidad evolutiva como el encuadre político «por igual» han recibido críticas sostenidas.",
  },
  "3.8": {
    concept: "Efervescencia colectiva y lo sagrado",
    coreClaim:
      "Los rituales generan solidaridad y la experiencia de lo sagrado mediante la acción sincronizada y la energía emocional. La cohesión social se produce afectivamente, no solo cognitivamente.",
  },
  "3.9": {
    concept: "Teoría del actor-red",
    coreClaim:
      "Lo social no es exclusivamente humano. Los actores no humanos —microbios, algoritmos, infraestructuras, leyes— coproducen la red. La agencia está distribuida.",
    criticalNote:
      "El tratamiento simétrico que la TAR hace de los «actores» humanos y no humanos está discutido teóricamente; sus críticos sostienen que disuelve las asimetrías de poder que la teoría crítica insiste en conservar.",
  },
  "3.10": {
    concept: "Ventana de Overton y mecánica del discurso",
    coreClaim:
      "El abanico de posiciones políticamente enunciables no es fijo. Se desplaza de forma deliberada mediante presión institucional coordinada, amplificación mediática y contagio mimético.",
  },

  // ── Módulo 4 ─────────────────────────────────────────────────────
  "4.1": {
    concept: "Discurso y poder/saber",
    coreClaim:
      "Poder y saber se constituyen mutuamente. El discurso produce sus objetos. Qué puede decirse, quién y en qué contexto es en sí mismo un lugar de poder.",
  },
  "4.2": {
    concept: "Sociedad disciplinaria y normalización",
    coreClaim:
      "El panóptico: vigilancia, normalización y producción de cuerpos dóciles. El poder opera mediante la norma estadística, patologizando la desviación.",
  },
  "4.3": {
    concept: "Biopoder y biopolítica",
    coreClaim:
      "El poder opera sobre la vida misma: la gestión estadística de poblaciones, la reproducción y la salud. El estado de excepción es donde la vida desnuda queda expuesta al poder soberano.",
    criticalNote:
      "El biopoder de Foucault y el «estado de excepción» de Agamben son marcos distintos que a menudo se confunden; la relación entre ellos está a su vez debatida. Una lección de 500 palabras no puede desarrollar responsablemente la distinción soberano/disciplinario/biopolítico que requiere Foucault.",
  },
  "4.4": {
    concept: "Necropolítica",
    coreClaim:
      "La expresión última de la soberanía es el poder de dictar quién vive y quién muere. La necropolítica extiende a Foucault al espacio colonial y poscolonial.",
  },
  "4.5": {
    concept: "Capitalismo racial",
    coreClaim:
      "El capitalismo no se volvió racista: surgió de jerarquías raciales preexistentes y las sigue necesitando para reproducirse. La raza no es incidental, sino estructural.",
  },
  "4.6": {
    concept: "Colonialidad del poder",
    coreClaim:
      "El colonialismo no terminó: se transformó en una matriz global de poder (colonialidad) que privilegia las epistemologías, las clasificaciones del trabajo y las ontologías eurocéntricas.",
  },
  "4.7": {
    concept: "Colonialismo de asentamiento",
    coreClaim:
      "El colonialismo de asentamiento no es un suceso, sino una estructura. Su lógica es la eliminación, no la explotación, y persiste en el presente a través de la tierra y la soberanía.",
  },
  "4.8": {
    concept: "Interseccionalidad",
    coreClaim:
      "Los ejes de poder (raza, clase, género, sexualidad) no se suman, sino que se multiplican y se constituyen mutuamente. Su intersección produce posiciones cualitativamente distintas.",
  },
  "4.9": {
    concept: "El espectáculo",
    coreClaim:
      "El capitalismo tardío sustituye la experiencia vivida por su representación. La autenticidad se produce como mercancía. La imagen precede y genera el acontecimiento.",
  },
  "4.10": {
    concept: "Sociedad de control",
    coreClaim:
      "El poder posdisciplinario es continuo, modulado y algorítmico. No la prisión, sino la contraseña; no la fábrica, sino la empresa como espíritu.",
  },

  // ── Módulo 5 ─────────────────────────────────────────────────────
  "5.1": {
    concept: "Pensamiento sistémico",
    coreClaim:
      "Existencias, flujos y bucles de retroalimentación. El comportamiento de un sistema no puede predecirse ni reducirse a sus componentes aislados.",
  },
  "5.2": {
    concept: "Bucles de retroalimentación y emergencia",
    coreClaim:
      "Los bucles de refuerzo amplifican; los de equilibrio estabilizan. La emergencia describe propiedades de nivel sistémico irreducibles a la descripción de los componentes.",
  },
  "5.3": {
    concept: "Sistemas adaptativos complejos",
    coreClaim:
      "Los agentes se adaptan a paisajes de aptitud, generando evolución sin diseñador. Los sistemas sociales y biológicos resisten el control descendente precisamente porque se adaptan.",
  },
  "5.4": {
    concept: "Panarquía y resiliencia",
    coreClaim:
      "Los sistemas recorren ciclos de crecimiento, conservación, liberación y reorganización. El colapso no es un fracaso, sino destrucción creativa que permite la reorganización. La resiliencia es la capacidad de recorrer el ciclo.",
  },
  "5.5": {
    concept: "Límites planetarios",
    coreClaim:
      "Nueve sistemas biofísicos definen un espacio operativo seguro para la humanidad. Hemos traspasado al menos seis. La estabilidad del Holoceno que hizo posible la civilización está terminando.",
    criticalNote:
      "Los umbrales concretos y la cifra de «seis traspasados» se revisan periódicamente según avanza la ciencia; conviene tratar los números como las mejores estimaciones actuales y no como constantes fijas.",
  },
  "5.6": {
    concept: "Hiperobjetos",
    coreClaim:
      "Entidades —como el cambio climático, los microplásticos o internet— tan masivamente distribuidas en el tiempo y el espacio que derrotan la comprensión local. Estamos dentro de ellas; no se pueden señalar.",
    criticalNote:
      "Los «hiperobjetos» de Morton son un concepto filosófico-artístico, no una categoría empírica; su acogida es desigual entre las ciencias.",
  },
  "5.7": {
    concept: "Originación dependiente",
    coreClaim:
      "Pratītyasamutpāda: nada posee existencia inherente e independiente (svabhāva). Todos los fenómenos surgen estrictamente mediante relaciones de interdependencia. El vacío no es nihilismo, sino plenitud relacional.",
    criticalNote:
      "La vacuidad (śūnyatā) se lee de forma rutinaria como nihilismo incluso en seminarios de posgrado; una lección de 500 palabras invita precisamente a la mala lectura que advierte. Lea directamente las Mūlamadhyamakakārikā de Nāgārjuna. Nótese una tensión de secuenciación: la crítica de la existencia inherente es lógicamente anterior, no derivada, de las afirmaciones sistémicas de este módulo.",
  },
  "5.8": {
    concept: "Dependencia de la trayectoria, histéresis y bloqueo",
    coreClaim:
      "La historia constriñe los futuros. Las soluciones subóptimas persisten (QWERTY, infraestructura fósil). Los sistemas recuerdan su pasado; la recuperación no rehace el camino del colapso.",
  },
  "5.9": {
    concept: "Reflexividad",
    coreClaim:
      "Los observadores constituyen lo que observan. Los mercados, las ciencias sociales y el discurso político son autorreferenciales: producen las realidades que describen.",
    criticalNote:
      "La reflexividad de Soros (mercados financieros: falibilidad más funciones cognitiva y participativa) y la de Bourdieu (reflexividad epistémica sociológica contra el privilegio epistémico del sujeto que conoce) son conceptos distintos que comparten nombre. Enumerarlos juntos es orientación, no confusión: léalos cada uno en sus propios términos.",
  },
  "5.10": {
    concept: "Cisnes negros y antifragilidad",
    coreClaim:
      "Los sucesos de gran impacto y baja probabilidad se subestiman sistemáticamente. Más allá de la resiliencia: los sistemas antifragiles se benefician del desorden. El objetivo no es resistir la volatilidad, sino ganar con ella.",
    criticalNote:
      "«El cisne negro» y la «antifragilidad» de Taleb son marcos influyentes pero retóricamente cargados; algunas de sus afirmaciones empíricas y estadísticas concretas se discuten dentro de la ciencia del riesgo.",
  },

  // ── Módulo 6 ─────────────────────────────────────────────────────
  "6.1": {
    concept: "Racionalidad neoliberal",
    coreClaim:
      "No es solo una política, sino una norma ontológica: la competencia como métrica humana universal y la empresa como forma ideal de todas las relaciones sociales.",
  },
  "6.2": {
    concept: "Acumulación por desposesión",
    coreClaim:
      "La acumulación originaria no es histórica, sino permanente. Los comunes se cercan de continuo: tierra, agua, conocimiento, material genético, atención.",
  },
  "6.3": {
    concept: "Reproducción social y economía del cuidado",
    coreClaim:
      "El capitalismo externaliza el trabajo reproductivo (crianza, cuidados de mayores, trabajo emocional) sobre las mujeres y el Sur global, mientras lo trata como económicamente invisible. Ese subsidio es el fundamento oculto de las economías de mercado.",
  },
  "6.4": {
    concept: "Fractura metabólica",
    coreClaim:
      "El capitalismo produce una ruptura irreparable en los ciclos de nutrientes y energía entre la humanidad social y la naturaleza. El agotamiento termodinámico no es un fallo, sino un rasgo estructural.",
  },
  "6.5": {
    concept: "Economía performativa",
    coreClaim:
      "Los modelos económicos no describen los mercados: los producen. Black-Scholes creó el mercado de derivados que modelaba. La teoría es una intervención, no un espejo.",
    criticalNote:
      "La tesis de la performatividad de Callon y MacKenzie se discute dentro de la metodología económica; sus críticos sostienen que la «performatividad» va de la influencia laxa a la construcción fuerte, y que las afirmaciones más fuertes están en disputa.",
  },
  "6.6": {
    concept: "Capitalismo de plataforma",
    coreClaim:
      "Las plataformas son infraestructura digital para extraer y monopolizar los datos como nueva materia prima. Su modelo de negocio es el cercamiento, no el intercambio.",
  },
  "6.7": {
    concept: "Tecnofeudalismo",
    coreClaim:
      "Los mercados están siendo desplazados por feudos digitales. La extracción ya no se produce principalmente mediante el beneficio de mercado, sino mediante la renta en la nube: el peaje sobre las transacciones que ocurren dentro de una infraestructura propietaria.",
    criticalNote:
      "La tesis del tecnofeudalismo de Varoufakis está activamente discutida; que la «renta en la nube» desplace realmente el beneficio capitalista es objeto de disputa. Véanse las críticas en Jacobin (2023) y en Network Cultures (2024), y compárese con el encuadre de capitalismo de plataforma de Srnicek (6.6).",
  },
  "6.8": {
    concept: "Capitalismo de vigilancia",
    coreClaim:
      "La experiencia conductual humana se extrae como materia prima, se procesa en productos de predicción y se vende para modificar la conducta futura. El yo se convierte en recurso.",
    criticalNote:
      "El encuadre del «capitalismo de vigilancia» de Zuboff es influyente pero discutido; algunos economistas políticos sostienen que exagera la novedad respecto a lógicas anteriores de acumulación capitalista.",
  },
  "6.9": {
    concept: "El precariado y la pobreza de tiempo",
    coreClaim:
      "Una nueva clase definida por lo que le falta: seguridad laboral, identidad, tiempo previsible y voz política. La precariedad no es una anomalía, sino el régimen laboral contemporáneo.",
    criticalNote:
      "El «precariado» de Standing como clase diferenciada se discute en la sociología del trabajo; sus críticos sostienen que fragmenta el análisis de clase en lugar de consolidarlo.",
  },
  "6.10": {
    concept: "Economía del donut",
    coreClaim:
      "La economía debe operar entre un suelo social (necesidades humanas) y un techo ecológico (límites planetarios). El crecimiento como meta terminal es a la vez empíricamente falso y ecológicamente fatal.",
    criticalNote:
      "El donut de Raworth es un marco normativo, no un modelo económico asentado; la relación entre su suelo social y su techo ecológico está en discusión activa entre los economistas ecológicos.",
  },

  // ── Módulo 7 ─────────────────────────────────────────────────────
  "7.1": {
    concept: "Hiperrealidad",
    coreClaim:
      "La simulación precede y genera lo real. En la era de las redes sociales, la imagen del acontecimiento es el acontecimiento. La posverdad no es una desviación, sino una condición ontológica.",
  },
  "7.2": {
    concept: "Burbujas epistémicas frente a cámaras de eco",
    coreClaim:
      "Distinción crucial: las burbujas son déficits de información (que la exposición corrige con facilidad); las cámaras de eco inoculan activamente contra las fuentes epistémicas externas (y resisten la corrección).",
  },
  "7.3": {
    concept: "Memética y selección cultural",
    coreClaim:
      "Las ideas se replican usando los sistemas nerviosos humanos como huéspedes y compiten por espacio cognitivo. La evolución cultural procede mediante aptitud memética diferencial, no selección racional.",
    criticalNote:
      "La memética como teoría rigurosa está en gran medida marginada dentro de la investigación contemporánea sobre evolución cultural; el encuadre del «meme como replicador» es cuestionado por los enfoques de doble herencia y de epidemiología cultural.",
  },
  "7.4": {
    concept: "Gobernanza algorítmica",
    coreClaim:
      "El código es ley. Cuando los algoritmos asignan fianzas, crédito, prestaciones y empleo, el sesgo estructural se automatiza, se oculta en la complejidad técnica y se vuelve incontrolable.",
  },
  "7.5": {
    concept: "Efectos de red, leyes de potencia y monopolización",
    coreClaim:
      "La adhesión preferencial empuja las redes digitales hacia una concentración extrema. El «el ganador se lleva casi todo» no es un fallo de mercado, sino la topología inherente de las redes libres de escala.",
  },
  "7.6": {
    concept: "Colonialismo digital y trabajo fantasma",
    coreClaim:
      "Los sistemas de IA se construyen sobre los datos extraídos del Sur global y se sostienen mediante trabajadores invisibles de clic que realizan el trabajo cognitivo que hace que la automatización parezca fluida.",
  },
  "7.7": {
    concept: "Modernidad líquida y disolución institucional",
    coreClaim:
      "Las estructuras sólidas —carreras estables, instituciones, identidades, comunidades— se han disuelto en riesgo fluido, transitorio y gestionado individualmente. El Estado externaliza la ansiedad en el sujeto.",
  },
  "7.8": {
    concept: "Loros estocásticos y síntesis generativa",
    coreClaim:
      "Los LLM son emparejadores estadísticos de alta dimensionalidad sobre texto humano. Generan resultados probabilísticamente plausibles, no comprensión. El paso de la recuperación a la generación altera fundamentalmente la infraestructura epistémica.",
    criticalNote:
      "El encuadre de los «loros estocásticos» (Bender, Gebru y otros, 2021) está activamente discutido. Yann LeCun y otros disienten de él: LeCun es un crítico prominente, NO un cooriginador del concepto (en versiones anteriores figuraba erróneamente como tal). Lea la posición real de Bender y Gebru junto con la disidencia de LeCun antes de formarse un juicio.",
  },

  // ── Módulo 8 ─────────────────────────────────────────────────────
  "8.1": {
    concept: "Policrisis",
    coreClaim:
      "Crisis simultáneas y causalmente entrelazadas cuyo efecto combinado excede su suma. La idea clave: no son problemas separados con soluciones separadas, sino que comparten raíces generativas.",
  },
  "8.2": {
    concept: "BANI y el sucesor de VUCA",
    coreClaim:
      "El entorno operativo moderno es frágil (no solo incierto), ansioso (no solo volátil), no lineal (no solo complejo) e incomprensible (no solo ambiguo). La actualización importa diagnósticamente.",
    criticalNote:
      "BANI es un marco de consultoría, no un modelo revisado por pares; trátelo como heurística de construcción de sentido y no como taxonomía validada.",
  },
  "8.3": {
    concept: "Cynefin: ontología situacional",
    coreClaim:
      "Dominios distintos (claro, complicado, complejo, caótico) requieren enfoques epistémicos radicalmente distintos. Aplicar el equivocado es más peligroso que no aplicar ninguno.",
    criticalNote:
      "Cynefin es un marco de práctica; sus condiciones de frontera entre dominios son menos nítidas en la práctica de lo que sugiere el modelo.",
  },
  "8.4": {
    concept: "Metamodernismo",
    coreClaim:
      "Oscilación cultural entre la sinceridad modernista y la ironía posmoderna: no síntesis, sino movimiento dialéctico entre ambas. El «ambos/y» que se mantiene consciente de su propia contingencia.",
    criticalNote:
      "El metamodernismo académico (Vermeulen y van den Akker, «Notes on Metamodernism», 2010) y el metamodernismo político-filosófico nórdico (Hanzi Freinacht) son proyectos distintos que comparten etiqueta. No son cooriginadores de un único marco; léalos por separado.",
  },
  "8.5": {
    concept: "Teoría integral (AQAL) y sus descontentos",
    coreClaim:
      "Mapea cuatro dimensiones irreductibles de cualquier fenómeno: Interior/Exterior × Individual/Colectivo. El marco es potente para evitar el reduccionismo plano. Su jerarquía evolutiva, su metafísica eurocéntrica y sus posiciones políticas siguen seriamente discutidas. Use el mapa; interrogue al cartógrafo.",
    criticalNote:
      "El AQAL de Wilber está correctamente marcado como discutido aquí, y es un ejemplo positivo del enfoque adecuado. La jerarquía evolutiva, la metafísica eurocéntrica y las posiciones políticas son cuestionadas por los críticos de lo integral. Nótese además la pregunta de reflexividad a nivel de currículo: la arquitectura de cuatro vectores de este mismo programa funciona como marco de síntesis implícito y merece el mismo escrutinio que se aplica al AQAL.",
  },
  "8.6": {
    concept: "Abolición y justicia transformativa",
    coreClaim:
      "La tarea no es arreglar sistemas averiados, sino preguntar qué los hace necesarios y construir alternativas. La abolición no es destrucción, sino construcción de infraestructura para un orden social distinto.",
  },
  "8.7": {
    concept: "Epistemología contemplativa: neurofenomenología y praxis no dual",
    coreClaim:
      "La indagación en primera persona es un método riguroso, no un suplemento. La práctica sostenida de la atención revela el carácter construido, impermanente y vacío del yo que observa, que es en sí mismo el descubrimiento epistémico más consecuente del currículo.",
    criticalNote:
      "La afirmación de que la indagación contemplativa en primera persona es un «método riguroso» se discute dentro de la ciencia cognitiva convencional. La micropraxis de esta lección apunta a un método que en realidad requiere entrenamiento sostenido para instanciarse; un ejercicio de 90 segundos no basta. Trate la práctica como un indicio, no como una introducción suficiente.",
  },
  "8.8": {
    concept: "La construcción de sentido como práctica: síntesis aplicada",
    coreClaim:
      "Trabajo final. Ningún concepto nuevo. Aplique la pila completa a un caso vivo: un titular actual, una decisión personal, un problema sistémico. El ejercicio consiste en sostener a la vez la epistemología, el poder, los sistemas y la praxis encarnada, y en advertir lo que el currículo todavía no puede ver.",
  },

  // ── Módulo 1 ─────────────────────────────────────────────────────
  "1.1": {
    concept: "Punto de vista y la mirada desde algún lugar",
    coreClaim:
      "Todo conocimiento es producido por alguien situado en algún lugar. No existe una mirada desde ninguna parte; la cuestión no es si el conocimiento está situado, sino si quien conoce sabe desde dónde y qué le oculta esa posición.",
  },
  "1.2": {
    concept: "Paradigma y revolución científica",
    coreClaim:
      "La ciencia avanza por acumulación, pero en momentos decisivos se reorganiza. Un paradigma organiza el trabajo cotidiano de un campo; las revoluciones llegan cuando el paradigma ya no puede absorber lo que el campo está encontrando.",
    criticalNote:
      "El propio relato de Kuhn está en disputa: Lakatos y Laudan propusieron modelos rivales del cambio científico, y las lecturas constructivistas de Kuhn son debatidas por los filósofos de la ciencia.",
  },
  "1.3": {
    concept: "Episteme",
    coreClaim:
      "Cada época funciona con reglas invisibles sobre qué cuenta como conocimiento. Foucault llamó a esto episteme, y no es una teoría que nadie sostenga: es la condición que hace posible sostener teorías.",
  },
  "1.4": {
    concept: "El mapa no es el territorio",
    coreClaim:
      "Todo mapa omite la mayor parte del territorio. El error nunca es la abstracción, sino olvidar que se ha abstraído y confundir una omisión útil con un rasgo del mundo.",
  },
  "1.5": {
    concept: "Epistemología bayesiana",
    coreClaim:
      "El conocimiento es probabilístico, no binario. Sostenemos creencias en grados, las actualizamos según llega la evidencia y la certeza es una señal de alarma, no una meta.",
  },
  "1.6": {
    concept: "Falsabilidad y sus límites",
    coreClaim:
      "Una afirmación se gana el derecho a llamarse científica si puede demostrarse falsa. Pero los programas de investigación reales protegen su núcleo con hipótesis auxiliares: la asimetría limpia entre confirmación y refutación es solo parte de la historia.",
  },
  "1.7": {
    concept: "Subdeterminación",
    coreClaim:
      "La misma evidencia puede sostener teorías incompatibles. Cuando los datos no deciden entre ellas, la elección la hacen los valores, los intereses y el poder — y conviene ver que eso no es un escándalo, sino un rasgo permanente de la ciencia.",
  },
  "1.8": {
    concept: "Círculo hermenéutico",
    coreClaim:
      "Comprender siempre llega acompañado de una precomprensión. La interpretación nunca parte de cero: procede de un horizonte heredado que el acto de leer usa y revisa a la vez.",
  },
  "1.9": {
    concept: "Epistemologías indígenas y relacionales",
    coreClaim:
      "El conocimiento es relacional, situado y portador de responsabilidad. La tierra y la comunidad no son el escenario donde ocurre el conocimiento: forman parte de lo que el conocimiento es.",
    criticalNote:
      "El «ver con dos ojos» (Etuaptmumk) fue desarrollado por los ancianos mi'kmaw Albert y Murdena Marshall; Battiste y Wilson son elaboradores académicos posteriores, no cooriginadores en pie de igualdad. Véase Bartlett, Marshall y Marshall (2012).",
  },
  "1.10": {
    concept: "Realismo crítico y profundidad ontológica",
    coreClaim:
      "La realidad está estratificada: los mecanismos generativos producen sucesos y solo algunos sucesos se observan. La ciencia explica descubriendo mecanismos, no recogiendo regularidades.",
    criticalNote:
      "La ontología de tres dominios (Real/Actual/Empírico) se discute incluso dentro del realismo crítico; véase Fryer y Navarrete (2022), que sostienen que los dominios generan más confusión que claridad. Nótese también una tensión de secuenciación: la ontología de Bhaskar fundamenta el paso de M1 a M2, de modo que situarla al final invierte su propia estrategia argumentativa.",
  },
};

export function getModuleEs(number: number): ModuleEs | undefined {
  return ES_MODULES[number];
}

export function getLessonEs(lessonCode: string): LessonEs | undefined {
  return ES_LESSONS[lessonCode];
}
