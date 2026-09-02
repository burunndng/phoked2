// Castellano mirror of quiz-content.ts — one comprehension quiz per lesson.
// Imports the shared interface; answer order matches the English file exactly.

import type { ComprehensionMCQ } from "./quiz-content";

export const LESSON_QUIZ_ES: Record<string, ComprehensionMCQ> = {

  // ═══════════════════════════════════════════════════════════════════
  // MÓDULO — 1 — Posicionalidad, epistemología y lo real
  // ═══════════════════════════════════════════════════════════════════

  "1.1": {
    question: "¿Cuál es la tesis central de la lección sobre el conocimiento?",
    options: [
      "Todo conocimiento es situado; las perspectivas marginadas revelan lo que las dominantes pasan por alto.",
      "La objetividad consiste en adoptar una perspectiva neutral ajena a la posición social.",
      "Todas las perspectivas son igualmente válidas, así que ninguna pretensión de conocimiento puede criticarse.",
      "El conocimiento mejora a medida que los investigadores eliminan todo rastro de posición social.",
    ],
    answerIndex: 0,
    explanation: "Harding y Haraway rechazan la «visión desde ninguna parte»: toda pretensión surge de un punto de vista, y las posiciones marginadas suelen ver lo que las dominantes están organizadas para pasar por alto.",
  },

  "1.2": {
    question: "¿Cómo describe Kuhn el progreso científico?",
    options: [
      "La ciencia avanza acumulando progresivamente hechos confirmados dentro de un mismo marco.",
      "La ciencia avanza mediante rupturas: las anomalías se acumulan hasta que un paradigma se derrumba y es sustituido.",
      "La ciencia avanza falsando hipótesis aisladas, un experimento cada vez.",
      "La ciencia avanza fusionando teorías rivales en síntesis cada vez mayores.",
    ],
    answerIndex: 1,
    explanation: "La ciencia normal defiende el paradigma; las anomalías acumuladas fuerzan la crisis y un cambio gestáltico hacia un nuevo paradigma — no una acumulación lineal de hechos.",
  },

  "1.3": {
    question: "¿Qué entiende Foucault por «episteme» de una época?",
    options: [
      "El currículo científico oficialmente enseñado en un periodo histórico.",
      "La lista de descubrimientos por los que un siglo es más célebre.",
      "Un a priori histórico e invisible que define qué puede contar siquiera como conocimiento.",
      "Los valores morales que gobiernan el trato entre científicos.",
    ],
    answerIndex: 2,
    explanation: "La episteme es el marco profundo y no formulado de una época, que determina qué objetos, métodos y enunciados son legítimos antes de que comience cualquier teoría.",
  },

  "1.4": {
    question: "Según la lección, ¿cuándo se vuelven peligrosos los mapas?",
    options: [
      "Cuando se trazan a una escala demasiado pequeña para resultar útiles.",
      "Cuando los poseen instituciones con intereses creados.",
      "Cuando contienen errores fácticos sobre el terreno que representan.",
      "Cuando olvidamos que son abstracciones y los tratamos como el territorio.",
    ],
    answerIndex: 3,
    explanation: "La tesis de Korzybski no es que los modelos sean malos, sino que la abstracción siempre omite; el fallo consiste en confundir el mapa con el propio territorio.",
  },

  "1.5": {
    question: "¿Cuál es la visión bayesiana del conocimiento y la creencia?",
    options: [
      "Las creencias deben sostenerse con firmeza hasta que la evidencia esté fuera de toda duda.",
      "La certeza es la meta que el buen razonamiento alcanza progresivamente.",
      "Las creencias son probabilidades — previas revisadas por la evidencia; la certeza es una señal de alarma.",
      "Las creencias son binarias: una afirmación se conoce o no se conoce.",
    ],
    answerIndex: 2,
    explanation: "La lección plantea el conocimiento como actualización probabilística: la evidencia ajusta grados de creencia, y tratar cualquier creencia como cierta delata fracaso epistémico, no éxito.",
  },

  "1.6": {
    question: "¿Qué límite identifica Lakatos en el falsacionismo de Popper?",
    options: [
      "Las teorías falsadas nunca deben abandonarse, solo refinarse.",
      "La mayoría de las afirmaciones científicas son infalsables y por tanto carentes de valor.",
      "Los experimentos nunca pueden decidir entre dos teorías rivales.",
      "Los programas de investigación blindan su núcleo con hipótesis auxiliares, de modo que la falsación simple fracasa.",
    ],
    answerIndex: 3,
    explanation: "Los científicos remiendan el núcleo amenazado con supuestos auxiliares, de modo que las teorías rara vez mueren por una sola anomalía — el criterio de Popper es, por sí solo, demasiado simple.",
  },

  "1.7": {
    question: "¿Qué sostiene la tesis de la subdeterminación?",
    options: [
      "Una misma evidencia puede encajar con varias teorías incompatibles; los valores llenan el hueco.",
      "Mejores evidencias acaban determinando siempre qué teoría es verdadera.",
      "Las teorías están determinadas por completo por los datos que deben explicar.",
      "Las teorías incompatibles nunca pueden dar cuenta de las mismas observaciones.",
    ],
    answerIndex: 0,
    explanation: "Duhem y Quine mostraron que la evidencia por sí sola no puede elegir entre teorías rivales; factores extrateóricos — valores, poder — hacen la selección restante.",
  },

  "1.8": {
    question: "¿Qué requiere la interpretación, según el círculo hermenéutico?",
    options: [
      "Una mente vaciada de compromisos previos para que el texto hable por sí mismo.",
      "Comprensión previa — siempre interpretamos desde un horizonte histórico heredado.",
      "Una lectura estrictamente literal que evite cualquier contexto amplio de significado.",
      "La intención del autor, recuperada mediante un minucioso trabajo detectivesco histórico.",
    ],
    answerIndex: 1,
    explanation: "Heidegger y Gadamer sostienen que la comprensión es circular: aprehendemos las partes a través de un todo pre-dado, y la interpretación nunca parte de cero.",
  },

  "1.9": {
    question: "¿Cómo conciben el conocimiento las epistemologías relacionales indígenas?",
    options: [
      "Como principios universales desligados de cualquier lugar o pueblo concreto.",
      "Como relacional y situado — el territorio y la comunidad son el sustrato del conocimiento.",
      "Como intuición privada que resiste la verificación comunitaria.",
      "Como inferior a los métodos formales y útil sobre todo como patrimonio cultural.",
    ],
    answerIndex: 1,
    explanation: "Para Marshall & Marshall, Battiste y Wilson, conocer implica responsabilidades hacia el territorio y las relaciones; el lugar no es contexto del conocimiento sino su fundamento.",
  },

  "1.10": {
    question: "¿Qué explica la ciencia según el realismo crítico?",
    options: [
      "Mecanismos generativos subyacentes, no solo regularidades observadas.",
      "Patrones entre observaciones, porque eso es todo lo que contiene la realidad.",
      "Los sucesos exactamente como aparecen a la experiencia cotidiana.",
      "Solo lo medible; hablar de mecanismos es metafísica.",
    ],
    answerIndex: 0,
    explanation: "Bhaskar estratifica la realidad en Real (mecanismos), Actual (sucesos) y Empírico (experiencia); la ciencia triunfa al descubrir mecanismos generativos ocultos.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // MÓDULO — 2 — El cuerpo cognoscente
  // ═══════════════════════════════════════════════════════════════════

  "2.1": {
    question: "En el procesamiento predictivo, ¿cuál es la operación central del cerebro?",
    options: [
      "Registrar pasivamente la entrada sensorial a medida que llega.",
      "Esperar los estímulos antes de construir cualquier modelo del mundo.",
      "Amplificar las señales entrantes para maximizar el detalle sensorial.",
      "Generar predicciones y actualizarlas para minimizar el error de predicción.",
    ],
    answerIndex: 3,
    explanation: "Friston y Clark conciben la percepción como contraste de hipótesis: el cerebro propone predicciones sobre las causas de la entrada y las revisa cuando los errores se acumulan.",
  },

  "2.2": {
    question: "¿Qué sostiene el enfoque 4E sobre el cuerpo y el entorno?",
    options: [
      "Transmiten información a un cerebro que piensa por su cuenta.",
      "Son irrelevantes una vez que la cognición se modela computacionalmente.",
      "Son constitutivos del pensamiento — la mente se extiende más allá del cráneo.",
      "Importan solo para las destrezas motoras, no para el razonamiento o los conceptos.",
    ],
    answerIndex: 2,
    explanation: "Encarnada, encajada, enactuada, extendida: la cognición se compone de bucles cuerpo-mundo, de modo que el entorno es en parte la mente, no un mero vehículo de ella.",
  },

  "2.3": {
    question: "Según la teoría polivagal, ¿qué posibilita la cognición superior?",
    options: [
      "Una fuerte activación simpática que agudiza la atención.",
      "Suprimir las señales autonómicas para que la corteza trabaje sin estorbos.",
      "Un apagón vagal dorsal que silencia las distracciones competidoras.",
      "Un estado regulado de seguridad, anclado en el sistema vagal ventral.",
    ],
    answerIndex: 3,
    explanation: "La jerarquía de Porges va de vagal ventral → simpático → vagal dorsal; solo desde la percepción de seguridad pueden desplegarse el compromiso social y el pensamiento complejo.",
  },

  "2.4": {
    question: "¿Qué papel desempeña el afecto en la explicación del poder según la lección?",
    options: [
      "El afecto es un sentimiento privado que el poder deja intacto por completo.",
      "El afecto es la emoción consciente mediante la cual el poder argumenta abiertamente.",
      "El afecto pre-personal moldea el pensamiento y permite que el poder circule bajo el umbral de la conciencia.",
      "El afecto importa solo después de que las creencias políticas se forman conscientemente.",
    ],
    answerIndex: 2,
    explanation: "Massumi y Ahmed tratan el afecto como intensidad previa a la emoción; como opera pre-reflexivamente, el poder captura los cuerpos antes de que comience el juicio consciente.",
  },

  "2.5": {
    question: "¿Cuál es la tesis central de la lección sobre los dos sistemas de pensamiento?",
    options: [
      "El deliberado Sistema 2 gestiona la mayoría de las decisiones; el veloz Sistema 1, las emergencias.",
      "El Sistema 1, rápido y automático, domina; el Sistema 2, laborioso, se usa mucho menos de lo que creemos.",
      "Ambos sistemas se activan con igual frecuencia, así que la calidad del razonamiento es una moneda al aire.",
      "El Sistema 1 puede entrenarse hasta convertirse en un lógico fiable con suficiente práctica.",
    ],
    answerIndex: 1,
    explanation: "La clave de Kahneman: el razonamiento deliberado es metabólicamente costoso, así que la intuición automática hace la mayor parte del trabajo cognitivo mientras confundimos sus productos con reflexión.",
  },

  "2.6": {
    question: "¿Cómo deciden realmente los humanos, según la racionalidad limitada?",
    options: [
      "Practican el satisficing — eligen opciones lo bastante buenas bajo restricciones reales.",
      "Optimizan sopesando cada alternativa hasta su valor máximo.",
      "Deciden al azar en cuanto las opciones superan un puñado pequeño.",
      "Delegan todas las decisiones difíciles en las normas sociales y el hábito.",
    ],
    answerIndex: 0,
    explanation: "Simon sostuvo que los límites cognitivos y temporales hacen imposible la optimización exhaustiva; la gente busca hasta que una opción supera un umbral de aceptabilidad.",
  },

  "2.7": {
    question: "¿Qué concluye la investigación sobre el razonamiento motivado?",
    options: [
      "El razonamiento suele defender conclusiones que ya hemos alcanzado emocionalmente.",
      "El razonamiento corrige con fiabilidad las intuiciones emocionales que lo iniciaron.",
      "Emoción y razón ocupan canales mentales separados y sin interferencias.",
      "Solo las personas con sesgo político racionalizan; los expertos razonan con neutralidad.",
    ],
    answerIndex: 0,
    explanation: "Festinger y Haidt invierten el modelo popular: la disonancia se resuelve mediante racionalización, de modo que la racionalidad es la rara excepción, no la norma por defecto.",
  },

  "2.8": {
    question: "¿De dónde surge el yo, según la explicación narrativa?",
    options: [
      "De una esencia interna fija que espera ser descubierta.",
      "De historias que contamos y revisamos — la identidad se construye en el tiempo.",
      "De pulsiones biológicas que las narrativas meramente decoran.",
      "De papeles sociales que representamos sin autoría alguna.",
    ],
    answerIndex: 1,
    explanation: "Ricoeur y McAdams sostienen que el yo no se encuentra, sino que se hace: la identidad es una historia en curso, revisada bajo presión, que organiza la memoria y la acción.",
  },

  "2.9": {
    question: "¿Qué afirma la doctrina del anatta sobre el yo?",
    options: [
      "Un alma permanente sobrevive al cambio observándolo desde dentro.",
      "El yo es una ilusión sin base explicativa alguna.",
      "El yo es un agregado cambiante de cinco procesos, ninguno de los cuales es un «yo» permanente.",
      "El yo es real pero está oculto bajo los cinco agregados.",
    ],
    answerIndex: 2,
    explanation: "El budismo temprano analiza la persona en forma, sensación, percepción, formaciones y conciencia — dinámicos, interdependientes y ninguno constitutivo de un yo duradero.",
  },

  "2.10": {
    question: "¿Qué vuelve explotables las cascadas de disponibilidad?",
    options: [
      "La gente registra con precisión la frecuencia real de los sucesos.",
      "La facilidad de recuerdo solo afecta a juicios triviales, no a la percepción del riesgo.",
      "Las instituciones exigen ejemplos memorables antes de actuar según los datos.",
      "Juzgamos la probabilidad por la facilidad de recuerdo, que los medios pueden fabricar.",
    ],
    answerIndex: 3,
    explanation: "Tversky, Kuran y Sunstein: la facilidad cognitiva de recuerdo sustituye a la frecuencia, de modo que los ejemplos amplificados se propagan en cascada hasta distorsionar la percepción colectiva del riesgo.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // MÓDULO — 3 — El tejido social
  // ═══════════════════════════════════════════════════════════════════

  "3.1": {
    question: "¿Cuál es la dialéctica por la que las instituciones moldean a sus creadores?",
    options: [
      "Las instituciones reflejan una naturaleza humana preexistente sin alterarla.",
      "Las instituciones sirven a los individuos, que pueden abandonarlas a su antojo.",
      "Los humanos crean instituciones que se objetivan y luego los constriñen.",
      "Las instituciones surgen espontáneamente, sin requerir actividad humana alguna.",
    ],
    answerIndex: 2,
    explanation: "La tríada de Berger y Luckmann — externalización, objetivación, internalización — explica cómo los productos humanos se coagulan en un mundo social aparentemente objetivo.",
  },

  "3.2": {
    question: "¿Cómo entiende el género la performatividad?",
    options: [
      "Como una esencia interna que la conducta externa expresa con fiabilidad.",
      "Como un dato biológico que la cultura, a lo sumo, acentúa.",
      "Como una elección puramente personal, renovada cada mañana sin restricción.",
      "Como producido mediante la repetición estilizada de actos, no expresado desde dentro.",
    ],
    answerIndex: 3,
    explanation: "Siguiendo a Austin, Butler sostiene que la identidad se constituye mediante una performance citacional — los actos hacen existir la categoría en vez de revelar un núcleo preexistente.",
  },

  "3.3": {
    question: "¿Qué dice la teoría de la reproducción social sobre el trabajo de cuidados no remunerado?",
    options: [
      "Es fundacional — el capitalismo depende de él para reproducir la fuerza de trabajo.",
      "Es marginal para el capitalismo y mengua a medida que los mercados se expanden.",
      "Está plenamente incluido en los salarios una vez contados los hogares.",
      "Será eliminado por la automatización en el plazo de una generación.",
    ],
    answerIndex: 0,
    explanation: "Federici y Fraser muestran que la renovación diaria y generacional de la fuerza de trabajo descansa en trabajo doméstico no remunerado y feminizado — una condición del capitalismo, no un residuo.",
  },

  "3.4": {
    question: "¿Cómo se transmite la clase entre generaciones, según Bourdieu?",
    options: [
      "Principalmente mediante reglas explícitas enseñadas en la escuela.",
      "Mediante el habitus — disposiciones encarnadas que navegan campos estructurados.",
      "Mediante la herencia genética de la capacidad y el temperamento.",
      "Mediante conspiraciones conscientes entre élites económicas.",
    ],
    answerIndex: 1,
    explanation: "Las disposiciones internalizadas — gusto, gesto, porte — operan como capital encarnado dentro de campos competitivos, reproduciendo clase, raza y género sin instrucción explícita.",
  },

  "3.5": {
    question: "Según Girard, ¿de dónde se origina el deseo?",
    options: [
      "En preferencias individuales espontáneas descubiertas por introspección.",
      "En la imitación — deseamos lo que otros desean, lo que desemboca en el chivo expiatorio.",
      "En el cálculo racional de la satisfacción futura esperada.",
      "En necesidades innatas fijadas por la biología de nuestra especie.",
    ],
    answerIndex: 1,
    explanation: "El deseo es triangular y contagioso; las rivalidades convergentes acumulan violencia que se resuelve cuando un chivo expiatorio la absorbe, restaurando una cohesión temporal.",
  },

  "3.6": {
    question: "¿Cuál es la tesis de Gramsci sobre el «sentido común»?",
    options: [
      "Es un logro político — una cosmovisión dominante hecha para sentirse natural.",
      "Es la sabiduría compartida en la que todas las clases coinciden espontáneamente.",
      "Es el residuo del consenso científico entre expertos acreditados.",
      "Es irrelevante para cómo los grupos dominantes mantienen su poder.",
    ],
    answerIndex: 0,
    explanation: "La hegemonía gobierna mediante el consentimiento: la cosmovisión de la clase dominante se naturaliza como «sentido común», volviendo la coerción en gran medida innecesaria.",
  },

  "3.7": {
    question: "¿Cómo explica el desacuerdo político la teoría de los fundamentos morales?",
    options: [
      "Como un fracaso educativo que una mejor escolarización corregiría.",
      "Como irracionalidad enraizada en una baja capacidad cognitiva.",
      "Como ruido que desaparece en cuanto todos coinciden en los hechos.",
      "Como conflicto trans-paradigmático entre módulos morales distintos.",
    ],
    answerIndex: 3,
    explanation: "Cuidado, justicia, lealtad, autoridad, santidad y libertad se ponderan de forma distinta según culturas y partidos, de modo que los adversarios razonan desde fundamentos diferentes, no peor.",
  },

  "3.8": {
    question: "¿Cómo se producen la solidaridad y lo sagrado, según Durkheim?",
    options: [
      "Mediante acuerdo doctrinal sobre proposiciones teológicas compartidas.",
      "Mediante deliberación racional que arriba a conclusiones comunes.",
      "Mediante el ritual: cuerpos sincronizados y energía emocional compartida.",
      "Mediante el miedo al castigo impuesto por una autoridad central.",
    ],
    answerIndex: 2,
    explanation: "La asamblea ritual genera efervescencia colectiva — sincronía y contagio emocional que cargan de sacralidad ciertas cosas y vinculan a los grupos afectivamente.",
  },

  "3.9": {
    question: "¿Qué afirma la teoría del actor-red sobre la agencia?",
    options: [
      "Solo los humanos con intenciones pueden decirse propiamente que actúan.",
      "La sociedad moldea la tecnología, pero la tecnología nunca moldea la sociedad.",
      "La agencia pertenece a los individuos; las estructuras meramente la constriñen.",
      "La agencia se distribuye entre redes de humanos y no humanos.",
    ],
    answerIndex: 3,
    explanation: "Latour y Callon rastrean la acción a través de redes heterogéneas — microbios, leyes y algoritmos coproducen resultados, de modo que «lo social» nunca es exclusivamente humano.",
  },

  "3.10": {
    question: "¿Qué subraya el concepto de ventana de Overton?",
    options: [
      "La opinión pública solo se mueve mediante un recambio generacional gradual.",
      "Lo decible está fijado por la ley constitucional y la jurisprudencia.",
      "El rango de posiciones decibles es desplazado deliberadamente por actores coordinados.",
      "Los políticos dictan personalmente lo que el público puede pensar.",
    ],
    answerIndex: 2,
    explanation: "Los límites del discurso aceptable son artefactos móviles de la presión institucional, la amplificación mediática y el contagio mimético — no límites naturales.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // MÓDULO — 4 — El poder y sus arquitecturas
  // ═══════════════════════════════════════════════════════════════════

  "4.1": {
    question: "¿Cuál es la relación entre poder y saber en Foucault?",
    options: [
      "El saber se acumula primero; el poder meramente lo aplica después.",
      "Son co-constitutivos — el discurso produce sus objetos de saber.",
      "El poder corrompe al saber, que es puro antes de que la política lo toque.",
      "El saber es independiente del poder allí donde se practica la ciencia.",
    ],
    answerIndex: 1,
    explanation: "El discurso determina qué puede decirse, por quién y en qué contexto — produciendo los mismos objetos que estudia, de modo que poder/saber es un solo aparato.",
  },

  "4.2": {
    question: "¿Cómo produce cuerpos dóciles el poder disciplinario?",
    options: [
      "Mediante vigilancia y normalización — el Panóptico internalizado.",
      "Mediante castigos públicos espectaculares que disuaden a la multitud que mira.",
      "Mediante leyes explícitas que la gente obedece o viola a sabiendas.",
      "Mediante incentivos económicos ofrecidos por empleadores y mercados.",
    ],
    answerIndex: 0,
    explanation: "La posibilidad de ser observado hace que la disciplina se autoaplique; la norma estadística define la desviación como patología, adiestrando cuerpos sin fuerza abierta.",
  },

  "4.3": {
    question: "¿Qué distingue al biopoder como modo de gobierno?",
    options: [
      "Gestiona la vida misma — poblaciones, salud, reproducción, estadísticamente.",
      "Domina el territorio únicamente mediante ocupación militar.",
      "Disciplina los cuerpos individuales solo dentro de las cárceles.",
      "Opera únicamente en momentos de emergencia declarada.",
    ],
    answerIndex: 0,
    explanation: "El biopoder de Foucault opera sobre el cuerpo-especie mediante estadística y regulación, mientras que el estado de excepción de Agamben expone la vida nuda a la decisión soberana.",
  },

  "4.4": {
    question: "¿Qué identifica Mbembe como expresión última de la soberanía?",
    options: [
      "La capacidad de gravar y redistribuir la riqueza nacional.",
      "El poder de decidir quién puede vivir y a quién se deja morir.",
      "La autoridad para definir la ciudadanía y sus obligaciones.",
      "El monopolio de la violencia legítima dentro de las fronteras del Estado.",
    ],
    answerIndex: 1,
    explanation: "La necropolítica extiende a Foucault hacia el espacio colonial y poscolonial: la soberanía se ejerce dictando qué vidas son prescindibles.",
  },

  "4.5": {
    question: "¿Cuál es la relación entre capitalismo y raza, según Robinson?",
    options: [
      "El capitalismo erosionó gradualmente los prejuicios raciales premodernos.",
      "La raza entró en el capitalismo solo a través de políticas migratorias posteriores.",
      "El capitalismo surgió de la jerarquía racial y aún la necesita.",
      "Raza y capitalismo son sistemas separados que ocasionalmente se cruzan.",
    ],
    answerIndex: 2,
    explanation: "Robinson sostiene que el capitalismo no se volvió racista — nació de jerarquías raciales y las reproduce continuamente; la raza es estructural, no incidental.",
  },

  "4.6": {
    question: "¿Qué nombra la «colonialidad del poder»?",
    options: [
      "Las administraciones coloniales oficiales que sobrevivieron a la descolonización.",
      "Los flujos de ayuda económica de las antiguas colonias hacia los centros imperiales.",
      "El periodo de dominación política directa que terminó en el siglo XX.",
      "Una matriz global superviviente que privilegia el saber eurocéntrico y las clasificaciones laborales.",
    ],
    answerIndex: 3,
    explanation: "Quijano y Mignolo: el colonialismo terminó como administración pero persiste como colonialidad — jerarquías de epistemología, raza y trabajo que sobreviven al imperio formal.",
  },

  "4.7": {
    question: "¿Cuál es la tesis central de la lección sobre el colonialismo de asentamiento?",
    options: [
      "Terminó con la firma de tratados y debe estudiarse como historia.",
      "Explota el trabajo como otros colonialismos, solo que más intensamente.",
      "Es una estructura, no un suceso — su lógica es la eliminación del nativo.",
      "Es ante todo una actitud cultural más que un sistema basado en la tierra.",
    ],
    answerIndex: 2,
    explanation: "La fórmula de Wolfe — la invasión es una estructura — señala una lógica de eliminación que opera mediante la tierra y la soberanía, y persiste en el presente.",
  },

  "4.8": {
    question: "¿Cómo se combinan los ejes de poder en la interseccionalidad de Crenshaw?",
    options: [
      "Aditivamente — cada eje aporta una cantidad fija de desventaja.",
      "Secuencialmente — un eje domina en cada etapa de la vida.",
      "Independientemente — los ejes nunca interactúan en una misma vida.",
      "Multiplicativamente — las intersecciones crean posiciones cualitativamente distintas.",
    ],
    answerIndex: 3,
    explanation: "Raza, clase, género y sexualidad son co-constitutivos: su intersección produce experiencias que no pueden leerse en un solo eje, así que no hay suma simple.",
  },

  "4.9": {
    question: "¿Qué entiende Debord por sociedad del espectáculo?",
    options: [
      "La experiencia vivida es sustituida por su representación; la imagen genera el suceso.",
      "El entretenimiento de masas distrae de una política que sigue igual.",
      "La cultura visual ha vuelto a las sociedades más honestas consigo mismas.",
      "La publicidad meramente refleja deseos previos a ella.",
    ],
    answerIndex: 0,
    explanation: "En el capitalismo tardío el espectáculo media la vida social: la autenticidad misma se vuelve mercancía, y la imagen precede y produce el suceso que representa.",
  },

  "4.10": {
    question: "¿En qué se diferencia la sociedad de control de Deleuze de la disciplina?",
    options: [
      "Centraliza el poder en cárceles, escuelas y fábricas.",
      "Modula de forma continua y algorítmica — la contraseña sustituye al muro.",
      "Se apoya en la violencia soberana visible para mantener el orden.",
      "Ha abandonado la vigilancia en favor del puro autoempleo.",
    ],
    answerIndex: 1,
    explanation: "El poder posdisciplinario es continuo y modulado: códigos, credenciales y puntuaciones gobiernan los flujos en tiempo real en lugar de encerrar cuerpos en instituciones.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // MÓDULO — 5 — Sistemas y complejidad
  // ═══════════════════════════════════════════════════════════════════

  "5.1": {
    question: "¿Por qué no puede predecirse el comportamiento de un sistema solo a partir de sus partes?",
    options: [
      "Porque el error de medición se acumula entre los componentes.",
      "Porque los almacenes, flujos y bucles de retroalimentación generan comportamiento irreducible.",
      "Porque los sistemas son demasiado aleatorios para que exista patrón alguno.",
      "Porque los componentes se niegan a interactuar sin control central.",
    ],
    answerIndex: 1,
    explanation: "Meadows: el comportamiento del sistema surge de la estructura — almacenes, flujos y retroalimentación —, de modo que el todo exhibe dinámicas que ningún componente aislado contiene.",
  },

  "5.2": {
    question: "¿Qué significa emergencia en teoría de sistemas?",
    options: [
      "Propiedades del nivel del sistema que no pueden reducirse a descripciones de componentes.",
      "Partes nuevas que aparecen cuando un sistema supera un umbral de tamaño.",
      "La mejora gradual de los sistemas mediante esfuerzo de ingeniería.",
      "Diseñadores que añaden funciones ausentes en cada componente por separado.",
    ],
    answerIndex: 0,
    explanation: "Los bucles reforzadores amplifican y los equilibradores estabilizan; su interacción produce propiedades emergentes — reales a nivel del sistema, ausentes a nivel del componente.",
  },

  "5.3": {
    question: "¿Por qué resisten los sistemas adaptativos complejos el control de arriba abajo?",
    options: [
      "Porque sus componentes carecen de capacidad de respuesta alguna.",
      "Porque los planificadores centrales carecen de potencia de cálculo suficiente.",
      "Porque obedecen leyes naturales que nadie ha formalizado aún.",
      "Porque los agentes adaptativos cambian sin cesar el paisaje al que se aplican las reglas.",
    ],
    answerIndex: 3,
    explanation: "Holland: los agentes se adaptan entre sí y al paisaje de aptitud, generando orden sin diseñador y desbordando las intervenciones que presuponen comportamiento fijo.",
  },

  "5.4": {
    question: "¿Cómo interpreta la panarquía el colapso?",
    options: [
      "Como el fallo terminal que la gestión adaptativa debe prevenir.",
      "Como prueba de que el sistema nunca fue resiliente en realidad.",
      "Como una fase creativo-destructiva que permite reorganización y renovación.",
      "Como una anomalía confinada a los sistemas naturales, no sociales.",
    ],
    answerIndex: 2,
    explanation: "El ciclo adaptativo de Holling — crecimiento, conservación, liberación, reorganización — hace del colapso una fase generativa; la resiliencia es la capacidad de seguir ciclando.",
  },

  "5.5": {
    question: "¿Cuál es la tesis de la lección sobre los límites planetarios?",
    options: [
      "Son límites estrictos que la naturaleza impone con umbrales exactamente conocidos.",
      "Se han definido científicamente, pero ninguno se ha cruzado todavía.",
      "Seis o más de nueve se han traspasado; la estabilidad del Holoceno termina.",
      "Se aplican a ecosistemas locales, pero no al sistema Tierra.",
    ],
    answerIndex: 2,
    explanation: "Rockström y Steffen definen nueve procesos biofísicos que enmarcan un espacio operativo seguro; múltiples traspasos significan que el Holoceno estable que posibilitó la civilización se acabó.",
  },

  "5.6": {
    question: "¿Qué convierte algo en un hiperobjeto, en el sentido de Morton?",
    options: [
      "Es un único objeto enorme, como un supercúmulo de galaxias.",
      "Es un objeto demasiado pequeño para que cualquier instrumento lo detecte.",
      "Es una abstracción matemática sin realidad física.",
      "Es tan vasto en tiempo y espacio que vence a la comprensión local.",
    ],
    answerIndex: 3,
    explanation: "El cambio climático, los microplásticos: entidades masivamente distribuidas dentro de las cuales estamos, y que jamás pueden verse, señalarse ni delimitarse por completo desde una vista local.",
  },

  "5.7": {
    question: "¿Qué afirma la originación dependiente sobre los fenómenos?",
    options: [
      "Nada existe de forma independiente; todo surge de relaciones interdependientes.",
      "Los fenómenos poseen esencias que las relaciones meramente modifican.",
      "Solo los sucesos causalmente primeros existen realmente; el resto es derivado.",
      "Existencia y no existencia son afirmaciones igualmente carentes de sentido.",
    ],
    answerIndex: 0,
    explanation: "Nāgārjuna: ninguna entidad tiene svabhāva — existencia inherente; la vacuidad significa que todo existe relacionalmente, lo cual es plenitud, no nihilismo.",
  },

  "5.8": {
    question: "¿Qué afirma la dependencia de la trayectoria sobre los sistemas?",
    options: [
      "Las condiciones iniciales se diluyen a medida que los sistemas se acercan a la eficiencia.",
      "Los sistemas recuerdan: las elecciones pasadas constriñen y persisten en futuros.",
      "La historia se repite exactamente porque los sistemas carecen de memoria.",
      "La recuperación reanda el mismo camino por el que ocurrió el colapso.",
    ],
    answerIndex: 1,
    explanation: "QWERTY y la infraestructura fósil muestran soluciones subóptimas que se fosilizan; la histéresis significa que el camino de vuelta no es el de ida — la historia moldea la posibilidad.",
  },

  "5.9": {
    question: "¿Qué significa reflexividad en los mercados y las ciencias sociales?",
    options: [
      "Los observadores ajustan sus métodos hasta que el error de medición desaparece.",
      "La observación retroalimenta: las descripciones ayudan a producir lo que describen.",
      "Los sujetos se comportan igual se les estudie o no.",
      "Los investigadores deben ignorar sus propios supuestos teóricos previos.",
    ],
    answerIndex: 1,
    explanation: "Soros y Bourdieu: los observadores participan en lo que observan, de modo que las narrativas de mercado y las clasificaciones sociales se autocumplen en vez de reflejar con neutralidad.",
  },

  "5.10": {
    question: "¿Cuál es la tesis de la lección sobre los sucesos raros de alto impacto?",
    options: [
      "Se subestiman sistemáticamente — y la antifragilidad gana con ellos.",
      "Pueden pronosticarse con precisión con suficientes datos históricos.",
      "Se promedian con el tiempo y pueden ignorarse sin riesgo al planificar.",
      "Solo importan en las finanzas, no en los sistemas sociales o naturales.",
    ],
    answerIndex: 0,
    explanation: "Taleb: los cisnes negros desafían la confianza de la campana de Gauss, de modo que el objetivo pasa de resistir la volatilidad a construir sistemas que se beneficien del desorden.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // MÓDULO — 6 — La economía política
  // ═══════════════════════════════════════════════════════════════════

  "6.1": {
    question: "¿Qué dice la lección que es, en último término, el neoliberalismo?",
    options: [
      "Un paquete de política fiscal de recortes de impuestos y desregulación.",
      "Una era política temporal que comenzó en los años ochenta.",
      "Una doctrina moral confinada a las instituciones económicas.",
      "Una ontología: la competencia como métrica universal del valor humano.",
    ],
    answerIndex: 3,
    explanation: "Más allá de la política, la racionalidad neoliberal remodela todas las relaciones sociales como empresa y competencia — una norma de subjetividad, no solo un programa de mercado.",
  },

  "6.2": {
    question: "¿Qué entiende Harvey por acumulación por desposesión?",
    options: [
      "Los trabajadores pierden salarios cuando las empresas se trasladan a regiones más baratas.",
      "Confiscaciones de tierra de la era colonial que terminaron con la descolonización.",
      "Cercamiento continuo de los comunes — tierra, conocimiento, atención — para el capital.",
      "Individuos que se desposeen voluntariamente mediante la deuda.",
    ],
    answerIndex: 2,
    explanation: "La acumulación primitiva nunca terminó: los bienes comunes se cercan y capitalizan continuamente, desde el agua y los genomas hasta la economía de la atención.",
  },

  "6.3": {
    question: "¿Cómo trata el capitalismo el trabajo reproductivo y de cuidados?",
    options: [
      "Lo preciosifica con precisión mediante la demanda de servicios de cuidado.",
      "Lo ha socializado por completo mediante sistemas públicos de cuidado infantil.",
      "Lo recompensa cada vez mejor a medida que las poblaciones envejecen.",
      "Lo externaliza sobre las mujeres y el Sur Global como subsidio invisible.",
    ],
    answerIndex: 3,
    explanation: "Federici y Folbre: el cuidado infantil, el de personas mayores y el trabajo emocional sostienen la fuerza de trabajo sin contar económicamente — la base oculta de las economías de mercado.",
  },

  "6.4": {
    question: "¿Qué es la «fractura metabólica», en el sentido de Marx y Foster?",
    options: [
      "Un desequilibrio temporal que los precios de mercado acaban corrigiendo.",
      "Una escisión psicológica entre la humanidad y la vida al aire libre.",
      "Una ruptura estructural en los ciclos de nutrientes y energía entre sociedad y naturaleza.",
      "La brecha entre la ecología científica y la comprensión pública.",
    ],
    answerIndex: 2,
    explanation: "El capital organiza una ruptura en los ciclos materiales de la Tierra — los nutrientes del suelo fluyen a las ciudades como residuo —, volviendo el agotamiento termodinámico un rasgo, no un fallo.",
  },

  "6.5": {
    question: "¿Qué afirma la economía performativa sobre los modelos económicos?",
    options: [
      "Los buenos modelos convergen en los mercados que ya existen.",
      "Los modelos producen los mercados que describen — la teoría es intervención.",
      "Los modelos fracasan allí donde la conducta humana se aparta de la racionalidad.",
      "Los modelos describen las economías exactamente como los telescopios describen planetas.",
    ],
    answerIndex: 1,
    explanation: "MacKenzie y Callon: Black-Scholes no reflejó el mercado de derivados — lo creó; la economía hace su objeto en vez de encontrarlo.",
  },

  "6.6": {
    question: "¿Cuál es el modelo de negocio central de las plataformas, según Srnicek?",
    options: [
      "El cercamiento — extraer y monopolizar datos como materia prima.",
      "El intercambio — emparejar compradores y vendedores a cambio de comisiones transparentes.",
      "El servicio — vender licencias de software a clientes corporativos.",
      "La publicidad — alquilar atención sin tocar los datos de los usuarios.",
    ],
    answerIndex: 0,
    explanation: "Las plataformas son infraestructura digital cuyo activo son los datos: su lógica es cercar interacciones y monopolizar la materia prima extraída, no facilitar el intercambio.",
  },

  "6.7": {
    question: "¿Qué distingue la extracción tecnofeudal, para Varoufakis?",
    options: [
      "La renta de la nube cobrada sobre transacciones dentro de feudos digitales propietarios.",
      "Los beneficios de producir bienes más baratos de lo que pueden los rivales.",
      "Los intereses cobrados por préstamos a pequeños negocios digitales.",
      "Los salarios pagados a trabajadores de plataformas contratados por apps móviles.",
    ],
    answerIndex: 0,
    explanation: "Los mercados ceden ante los feudos: las grandes plataformas no venden principalmente en mercados — cobran renta de todo comercio que atraviese su territorio de nube.",
  },

  "6.8": {
    question: "¿Qué hace el capitalismo de vigilancia con la experiencia humana?",
    options: [
      "La archiva respetuosamente para mejorar servicios personalizados.",
      "La extrae como materia prima de productos de predicción vendidos para moldear la conducta.",
      "La monetiza solo con el consentimiento informado de quienes la originan.",
      "La usa para construir bienes públicos devueltos a la comunidad.",
    ],
    answerIndex: 1,
    explanation: "Zuboff: los datos de conducta se convierten en predicciones vendidas en mercados de futuros conductuales — el yo deviene recurso gratuito para el beneficio ajeno.",
  },

  "6.9": {
    question: "¿Cómo caracteriza la lección la precariedad?",
    options: [
      "Una etapa transitoria camino del empleo estable.",
      "Una elección de estilo de vida de trabajadores digitalmente móviles.",
      "El propio régimen laboral contemporáneo, no una aberración.",
      "Un problema confinado a las economías informales del Sur Global.",
    ],
    answerIndex: 2,
    explanation: "Standing y Fraser definen el precariado por lo que le falta — seguridad, identidad, tiempo previsible, voz — y sitúan la precariedad en el centro del régimen laboral.",
  },

  "6.10": {
    question: "¿Qué define como meta económica el marco del donut?",
    options: [
      "Maximizar el crecimiento hasta financiar todas las necesidades sociales.",
      "Sustituir todo cómputo ecológico por métricas de bienestar.",
      "Equilibrar año a año el crecimiento del PIB con el desempleo.",
      "Satisfacer las necesidades sociales dentro del techo ecológico — más allá del crecimiento.",
    ],
    answerIndex: 3,
    explanation: "Raworth sitúa la economía entre una base social y los límites planetarios; tratar el crecimiento como meta terminal es empíricamente falso y ecológicamente fatal.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // MÓDULO — 7 — La condición digital
  // ═══════════════════════════════════════════════════════════════════

  "7.1": {
    question: "¿Cuál es la tesis de la lección sobre la simulación y lo real?",
    options: [
      "La simulación imita la realidad con una fidelidad creciente pero imperfecta.",
      "La realidad acaba reafirmándose frente a las fabricaciones mediáticas.",
      "La simulación precede y genera lo real — la imagen es el suceso.",
      "Lo real y lo simulado siguen siendo claramente distinguibles en principio.",
    ],
    answerIndex: 2,
    explanation: "Baudrillard: los signos ya no remiten a una realidad previa, sino que la producen, de modo que la posverdad no es una avería sino la condición ontológica normal.",
  },

  "7.2": {
    question: "¿Cuál es la diferencia crucial entre burbujas epistémicas y cámaras de eco?",
    options: [
      "Las burbujas existen en línea; las cámaras de eco, solo fuera de línea.",
      "Las cámaras de eco son inofensivas; las burbujas causan polarización grave.",
      "No la hay — ambos términos describen el mismo fenómeno.",
      "Las burbujas carecen de información; las cámaras de eco desacreditan activamente las fuentes externas.",
    ],
    answerIndex: 3,
    explanation: "Nguyen: la exposición corrige una burbuja, pues es mera omisión; las cámaras de eco inoculan contra la confianza epistémica externa, así que la exposición por sí sola fracasa.",
  },

  "7.3": {
    question: "¿Cómo procede la evolución cultural, según la visión memética?",
    options: [
      "Por la aptitud diferencial de las ideas que compiten por huéspedes cognitivos.",
      "Por la selección racional de las creencias más exactas.",
      "Por decisiones de diseño deliberadas de las instituciones culturales.",
      "Por herencia genética de tendencias sociales aprendidas.",
    ],
    answerIndex: 0,
    explanation: "Dawkins y Blackmore tratan las ideas como replicadores cuya difusión depende del gancho, no de la verdad — la atención humana es el recurso en disputa.",
  },

  "7.4": {
    question: "¿Qué ocurre cuando los algoritmos asignan fianzas, crédito y prestaciones?",
    options: [
      "La supervisión humana suele eliminar los sesgos presentes en los datos.",
      "El sesgo estructural se automatiza, se oculta en la complejidad y escapa a toda rendición de cuentas.",
      "Superan consistentemente a los funcionarios humanos en métricas de equidad.",
      "Permanecen neutrales mientras el código subyacente sea de fuente abierta.",
    ],
    answerIndex: 1,
    explanation: "«El código es ley»: las decisiones automatizadas lavan el sesgo histórico mediante opacidad técnica, volviendo la discriminación más difícil de ver, impugnar o remediar.",
  },

  "7.5": {
    question: "¿Por qué los mercados digitales acaban en el «el ganador se lo lleva todo»?",
    options: [
      "Porque los consumidores prefieren irracionalmente las marcas más famosas.",
      "Porque la vinculación preferente es la topología de las redes libres de escala.",
      "Porque los reguladores no aplican la ley antimonopolio con suficiente rigor.",
      "Porque los costes del software crecen más rápido que los ingresos a cualquier escala.",
    ],
    answerIndex: 1,
    explanation: "Barabási: el valor crece con las conexiones, así que los conectados ganan más conexiones — la concentración es topología de red inherente, no accidente de mercado.",
  },

  "7.6": {
    question: "¿Qué identifica la lección bajo la automatización sin fisuras?",
    options: [
      "Datos extraídos del Sur Global y trabajo invisible de trabajadores del clic.",
      "Sistemas plenamente autónomos que no requieren aportes humanos.",
      "Comunidades de fuente abierta que ofrecen su tiempo por igual en todo el mundo.",
      "Trabajadores locales con salarios premium por roles de supervisión.",
    ],
    answerIndex: 0,
    explanation: "Couldry, Mejias, Gray y Suri: la IA se construye sobre datos apropiados del mundo mayoritario y la mantienen trabajadores fantasma ocultos que la automatización disimula.",
  },

  "7.7": {
    question: "¿Qué ha sido de las estructuras estables en la modernidad líquida?",
    options: [
      "Se han reforzado en respuesta a la incertidumbre global.",
      "Persisten, pero se han vuelto más asequibles y accesibles.",
      "Se transfirieron intactas de las instituciones a las familias extensas.",
      "Se disolvieron en riesgo y ansiedad transitorios, gestionados individualmente.",
    ],
    answerIndex: 3,
    explanation: "Bauman: carreras, instituciones e identidades se licúan; los problemas estructurales se privatizan como ansiedad personal que los individuos deben gestionar solos.",
  },

  "7.8": {
    question: "¿Cuál es la tesis central de la lección sobre los grandes modelos de lenguaje?",
    options: [
      "Entienden el texto como los humanos, solo que mucho más rápido.",
      "Recuperan documentos almacenados que humanos escribieron antes.",
      "Generan resultados estadísticamente plausibles sin comprender.",
      "Razonan formalmente y así evitan los sesgos de sus datos de entrenamiento.",
    ],
    answerIndex: 2,
    explanation: "Bender y Gebru: los LLM son reconocedores de patrones de alta dimensión sobre texto humano; el paso de la recuperación a la generación reconfigura la propia infraestructura epistémica.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // MÓDULO — 8 — Síntesis y praxis
  // ═══════════════════════════════════════════════════════════════════

  "8.1": {
    question: "¿Qué define una policrisis, frente a crisis separadas?",
    options: [
      "Una crisis única tan grave que desplaza todas las demás preocupaciones.",
      "Varias crisis que meramente coinciden en el tiempo por azar.",
      "Una crisis que se repite en ciclos a lo largo de las generaciones.",
      "Crisis causalmente entrelazadas que comparten raíces y superan su suma.",
    ],
    answerIndex: 3,
    explanation: "Tooze y Morin: las crisis se interpenetran y amplifican mutuamente, de modo que tratarlas como problemas separados con soluciones separadas pasa por alto sus raíces comunes generativas.",
  },

  "8.2": {
    question: "¿Qué añade BANI sobre VUCA, en términos diagnósticos?",
    options: [
      "Sustituye el análisis por cuatro pasos estándar de respuesta a crisis.",
      "Predice qué crisis llegará primero y golpeará más fuerte.",
      "Renombra las condiciones con más precisión: frágil, ansiosa, no lineal, incomprensible.",
      "Se aplica solo a organizaciones, no a sociedades enteras.",
    ],
    answerIndex: 2,
    explanation: "La actualización de Cascio: el entorno no es solo incierto sino frágil, no solo volátil sino ansioso — y cada condición renombrada cambia qué respuestas tienen sentido.",
  },

  "8.3": {
    question: "¿Cuál es la advertencia central del marco Cynefin?",
    options: [
      "Todas las situaciones se aclaran una vez reunidos datos suficientes.",
      "Aplicar el enfoque del dominio equivocado es peor que no aplicar ninguno.",
      "Los líderes deberían improvisar por defecto en el dominio caótico en todas partes.",
      "La complejidad es un mito que excusa la mala planificación.",
    ],
    answerIndex: 1,
    explanation: "Snowden: los dominios claro, complicado, complejo y caótico exigen epistemes distintas; mal leer el dominio — tomar lo complejo por complicado — engendra catástrofe.",
  },

  "8.4": {
    question: "¿Qué postura cultural describe el metamodernismo?",
    options: [
      "Oscilación entre la sinceridad modernista y la ironía posmoderna, consciente de ambas.",
      "Un regreso a las certezas premodernas tras el escepticismo posmoderno.",
      "Una síntesis asentada que trasciende modernismo y posmodernismo.",
      "Un rechazo total de la sinceridad por ingenua y pasada de moda.",
    ],
    answerIndex: 0,
    explanation: "Vermeulen y van den Akker: el metamodernismo no es síntesis sino movimiento — un «ambas cosas a la vez» consciente de sí que oscila entre compromiso e ironía.",
  },

  "8.5": {
    question: "¿Cuál es el veredicto equilibrado de la lección sobre la Teoría Integral?",
    options: [
      "Útil contra el reduccionismo, pero interrogar su jerarquía y su metafísica.",
      "Validada científicamente y lista para aplicación universal.",
      "Totalmente desacreditada por sus compromisos espirituales.",
      "Valiosa solo como curiosidad histórica de los años 2000.",
    ],
    answerIndex: 0,
    explanation: "Los cuatro cuadrantes de AQAL protegen del reduccionismo de tierra plana, pero su jerarquía evolutiva y su metafísica eurocéntrica siguen en disputa — use el mapa; interrogue al cartógrafo.",
  },

  "8.6": {
    question: "¿Qué pregunta el marco abolicionista, según Davis y Gilmore?",
    options: [
      "¿Cómo pueden reformarse las instituciones existentes para operar con más justicia?",
      "¿Qué hace necesarios estos sistemas — y qué alternativas podemos construir?",
      "¿Qué castigos disuaden mejor de los delitos que deben responder?",
      "¿Cómo hacer la reclusión más humana y de menor escala?",
    ],
    answerIndex: 1,
    explanation: "La abolición no es destrucción sino construcción: la tarea es cuestionar qué hace necesarias las jaulas y construir la infraestructura de un orden social diferente.",
  },

  "8.7": {
    question: "¿Qué revela la indagación de primera persona sostenida, según la lección?",
    options: [
      "Un testigo interno estable al que no alcanza el condicionamiento.",
      "Que la introspección es poco fiable y debe abandonarse.",
      "El yo observante es construido, impermanente y vacío.",
      "Que los estados místicos confirman doctrinas metafísicas perennes.",
    ],
    answerIndex: 2,
    explanation: "Varela y Thompson establecen los métodos de primera persona como praxis rigurosa; la atención sostenida desvela la naturaleza construida y vacía del observador — el hallazgo más consecuente del currículo.",
  },

  "8.8": {
    question: "¿Cuál es el ejercicio integrador final del currículo?",
    options: [
      "Memorizar las figuras y tesis clave de los ocho módulos.",
      "Elegir el marco único que mejor explica los acontecimientos actuales.",
      "Escribir una crítica que identifique los errores de lecciones anteriores.",
      "Aplicar todo el entramado a un caso vivo anotando los puntos ciegos.",
    ],
    answerIndex: 3,
    explanation: "Ningún concepto nuevo: la tarea es sostener juntas epistemología, poder, sistemas y praxis encarnada sobre un caso vivo — y advertir lo que el propio currículo todavía no puede ver.",
  },
};
