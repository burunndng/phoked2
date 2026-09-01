// ES hook de-templating pass.
// 68/76 Spanish hooks started with "Si ..." (the conditional template was
// reintroduced during translation). This mirrors the English polish: rewrite
// the same 64 hooks to varied statement-based constructions, keeping "Si"
// only for 1.2, 1.4, 2.1 and 2.3 (matching the English).
// Run: bun run scripts/polish-es-hooks.ts   (edits scripts/out/es/*.json,
// then re-merge each module with --lang=es)

const hookRewrites: Record<string, string> = {
  "2.2": "Suponga que sus herramientas y sus habitaciones forman parte genuina de su pensamiento. ¿Qué queda del que piensa cuando se las retiran, y quién queda para formular la pregunta?",
  "2.4": "Lo político, en esta lectura, se organiza en buena medida al nivel de la intensidad circulante. ¿Qué ocurre con el supuesto de que los mejores argumentos cambian las mentes? ¿Y cómo sería una política construida para el afecto, y no contra él?",
  "2.5": "La mente deliberada, en esta lectura, emplea buena parte de su tiempo en blanquear los veredictos de la mente intuitiva. ¿En qué sentido es usted el autor de sus juicios considerados, y qué es eso en usted que a veces se niega a firmar?",
  "2.6": "Quien satisface, y no quien optimiza, resulta ser el agente racional. ¿Qué le ocurre a un mundo institucional —rankings, mercados, precios algorítmicos— construido sobre la premisa de que optimizar es lo que hacen los agentes?",
  "2.7": "La razón, casi todos los días, es la abogada de deseos que no eligió. ¿Qué haría falta —y qué le costaría a usted en concreto— para dejarla defender una vez el caso contrario, por entero?",
  "2.8": "Usted es, en esta lectura, un relato siendo contado. Entonces, ¿quién es el narrador? ¿Hay alguien detrás de la narración escuchándola, o el oyente es también un personaje, y en ese caso quién lo escribió?",
  "2.9": "La indagación sostenida no encuentra al yo que está indagando. ¿Qué se liberaría al verlo, y por qué la mera pregunta produce tanta resistencia?",
  "2.10": "Las amenazas que se sienten más reales suelen ser solo las que más se repiten. Entonces, ¿qué está siguiendo en realidad su miedo, y a qué no teme porque nadie se lo sigue mostrando?",
  "3.1": "Las instituciones que se sienten más inevitables son precisamente aquellas cuya historia no recordamos. ¿Cuál de sus certezas está esperando ahora mismo a que se redescubra su fecha de construcción?",
  "3.2": "El yo, en esta lectura, es lo que la representación postula retrospectivamente. ¿Qué ocurre con la parte de usted que observa la representación? ¿Es también un intérprete y, en ese caso, para quién interpreta?",
  "3.3": "La economía de mercado solo parece productiva porque el cuidado que la sostiene no se contabiliza. ¿Qué aspecto tendría la economía si la contabilidad fuera honesta, y quién perdería con la corrección?",
  "3.4": "Sus gustos y su soltura se sienten como carácter personal; funcionan como marcadores de clase. ¿Cuánto del yo que experimenta como más suyo es un depósito de una posición que no eligió?",
  "3.5": "El deseo se toma prestado. ¿Cuál de sus deseos es realmente suyo y, si pudiera restar todos los prestados, qué quedaría de usted?",
  "3.6": "Lo obvio, resulta, es siempre el interés de alguien disfrazado. ¿Cuál de sus creencias «obvias» querría menos ver desenmascarada? ¿Y qué le dice esa resistencia de usted mismo?",
  "3.7": "La moral de su adversario quizá sea una gramática distinta y no un fallo de inteligencia. ¿Qué obligación le impone eso a usted, y cómo describiría su propia gramática alguien que no la comparte?",
  "3.8": "La solidaridad, resulta, es un producto de la reunión ritual. ¿Qué es una sociedad que ha sustituido la reunión por los canales de contenidos, y dónde se está fabricando ahora su efervescencia?",
  "3.9": "Su día se sostiene gracias a la cooperación de miles de no humanos. ¿Qué ocurre con la idea de responsabilidad individual, y dónde reside de hecho?",
  "3.10": "La frontera de lo decible la sostienen las instituciones y la mueve la paciencia. ¿Cuál de sus propias convicciones se le está manteniendo hoy como decible, y quién la está sosteniendo?",
  "4.1": "La autoridad para nombrar es el primer instrumento del poder. ¿Quién nombró las categorías en que usted vive, y qué significaría renegociar los nombres?",
  "4.2": "Usted mismo se ha convertido en el vigilante de su propio cumplimiento. ¿Qué tendría que dejar de medir para darse cuenta de a quién sirve la medición?",
  "4.3": "El mismo Estado que fomenta la vida de una población puede exponer la vida desnuda de otra. ¿Dónde corre exactamente la línea, y quién la traza y con qué instrumentos?",
  "4.4": "La línea entre política y homicidio la traza una rutina administrativa. ¿Qué significa ser moralmente responsable de una muerte que su gobierno administra? ¿Y qué aspecto tendría la responsabilidad desde dentro de la rutina?",
  "4.5": "El sistema que fija el precio de su café de la mañana también pone precio a la diferencia humana. ¿Qué significaría de verdad consumir éticamente, y no es la categoría misma una manera de no hacerse la pregunta?",
  "4.6": "Su educación le entregó un canon ensamblado por una estructura colonial. ¿Qué partes de lo que sabe tendría que renunciar para saber de otro modo? ¿Y es renunciar la única opción?",
  "4.7": "La estructura de eliminación sigue en marcha, y sus propias instituciones están asentadas en su tierra. ¿Qué significa decir «nosotros» sobre el lugar donde vive, y quién tiene derecho a decidirlo?",
  "4.8": "Toda historia de un solo eje deja algo invisible en el cruce. ¿Qué está ahora mismo invisible en la historia que se cuenta sobre su propia vida, y qué eje está usando para mantenerlo así?",
  "4.9": "La autenticidad se ha convertido en un producto manufacturado. ¿Cómo sería la experiencia genuina, y cómo distinguiría la diferencia desde dentro?",
  "4.10": "El poder ya no lo encierra; lo ajusta de forma continua. ¿Dónde está el afuera? ¿Y no será el último lugar sin vigilancia el interior de su propia atención?",
  "5.1": "Los sistemas que usted habita siguen produciendo resultados que nadie pretende. ¿Qué resultado de su vida actual es obra de la estructura y no de la elección de nadie, y qué bucle tendría que recablear para cambiarlo?",
  "5.2": "El Flash Crash no tuvo causa, solo condiciones. ¿Cuántos de los sucesos que usted atribuye a causas tienen en realidad solo condiciones? ¿Y qué significa la culpa en un mundo así?",
  "5.3": "Toda población de agentes se adapta a las reglas que usted fija. ¿Cuál es la diferencia entre gobernar y negociar, y cómo sería el poder si esperara recibir respuesta?",
  "5.4": "Los sistemas que más admiramos por su eficiencia son los que la liberación golpeará más fuerte. ¿Cuál es la diferencia entre gestionar para la resiliencia y simplemente posponer la quema? ¿Y quién elige qué incendios se permiten?",
  "5.5": "El espacio operativo seguro se mantuvo 11.700 años y se traspasó en dos siglos. ¿Qué significa «seguro» para una especie que solo aprendió a medir el espacio después de empezar a salir de él?",
  "5.6": "Los hechos más grandes de su mundo son demasiado grandes y demasiado lentos para experimentarse como objetos. ¿Qué significa ser responsable de algo que no se puede percibir, y cómo se sentiría desde dentro una mente construida para los hiperobjetos?",
  "5.7": "Nada existe independientemente. Entonces, ¿qué separa «nada existe inherentemente» de «nada importa», y por qué las dos afirmaciones se sienten tan parecidas cuando una es liberación y la otra desesperación?",
  "5.8": "Su vida diaria está organizada por decisiones tomadas antes de que usted naciera. ¿Cuál de esas decisiones querría más litigar de nuevo, y qué exigiría de hecho volver a litigarla?",
  "5.9": "Su descripción de una situación cambia la situación. Cuando la describa por fin con exactitud, ¿qué es exacto: la descripción, o la situación que acaba de producir?",
  "5.10": "Los sucesos que más importan no se pueden predecir. ¿Cuál es, entonces, el valor de toda la predicción que hacemos? ¿Y cómo sería una institución construida sobre esa admisión?",
  "6.1": "Le han entrenado para experimentarse a sí mismo como capital humano. ¿Qué quedaría de usted si dejara de rendir cuentas de sí por completo? ¿Y qué le dice el miedo a esa pregunta sobre quién la instaló?",
  "6.2": "La reserva de cosas sin cercar es lo que mantiene vivo al capital a través de las crisis. ¿Cuál será el último común en irse, y cómo será vivir al otro lado de su valla?",
  "6.3": "La productividad de la economía está subvencionada por el cuidado no pagado. ¿Qué pasaría con cada precio que usted conoce si se retirara el subsidio? ¿Y qué revela su renuencia a imaginarlo sobre a quién sirve el subsidio?",
  "6.4": "La supervivencia del sistema siempre ha dependido de encontrar fracturas nuevas para parchear las viejas. ¿Qué pasa cuando se abren las últimas reservas, y «sostenibilidad» es una reparación del ciclo o el nombre de su agotamiento lo más lento posible?",
  "6.5": "Suficientes personas creyeron un modelo económico, y este se volvió verdad. ¿Qué modelos están haciendo verdadera su economía ahora mismo, quién los eligió, y qué pasa cuando la creencia en uno de ellos falla?",
  "6.6": "Los puntos de estrangulamiento de la economía son de propiedad privada, y el resto de nosotros somos inquilinos. ¿Qué haría falta para construir infraestructura que nadie alquile? ¿Y qué le dice la historia de los comunes anteriores sobre lo que le pasará?",
  "6.7": "El mercado que usted habita es en parte feudo y en parte mercado. ¿Cómo sabría en cuál está en cada momento, y quién se beneficia de que usted no lo sepa?",
  "6.8": "Su conducta se mina para predecir y moldear lo que querrá después. ¿Cuál es la diferencia entre su deseo y su predicción? ¿Y en qué punto la predicción se convierte en el deseo?",
  "6.9": "El sistema que lo vuelve pobre de tiempo también lo culpa por no usar bien su tiempo. ¿Qué haría falta para oír «no gestionas bien tu tiempo» como una afirmación sobre la economía y no sobre usted?",
  "6.10": "La economía que le prometieron sigue creciendo hacia un techo que no puede ver. ¿Cómo se sentiría «suficiente», y no será el problema más duro el techo, sino el hecho de que nadie en su vida sepa describir qué significaría suficiente?",
  "7.1": "La imagen del suceso es el suceso. ¿Qué le pasa al concepto de verdad para una especie que vive cada vez más en la imagen, y «posverdad» es una crisis de honestidad o un cambio en lo que la realidad misma se ha vuelto?",
  "7.2": "Las prisiones epistémicas más fuertes son las que se comen sus propias contradicciones. ¿Qué haría falta para que usted reconociera los muros de las suyas? ¿Y confiaría en el mensajero que se lo dijera?",
  "7.3": "Su mente es también un entorno de selección. ¿Qué está recompensando su función de aptitud actual, y qué ideas está propagando ahora mismo que no eligió de verdad?",
  "7.4": "El algoritmo es ley, y nadie puede leerlo. ¿En qué sentido la sociedad gobernada sigue siendo autogobernada, y qué significa «consentimiento de los gobernados» cuando gobernar es ininteligible?",
  "7.5": "El que-gana-se-lo-lleva-casi-todo es la topología inherente. ¿Qué significa «competencia» en los mercados digitales, y es un marco construido para monopolios industriales siquiera capaz de ver el monopolio de red al que se enfrenta?",
  "7.6": "La inteligencia que celebramos como nuestra descansa sobre trabajo que nos negamos a ver. ¿En qué sentido es nuestra? ¿Y qué cambiaría reconocer el trabajo sobre cómo construimos, compramos y nos inclinamos ante ella?",
  "7.7": "Las estructuras que absorbían la ansiedad colectiva se han disuelto y la han descargado sobre usted como libertad. ¿Cuánto costaría construir estructuras nuevas, y la vida líquida es tan libre como se siente, o el sentimiento mismo es la descarga?",
  "7.8": "El escritor más fluido con el que ahora trabaja no entiende lo que escribe. ¿Qué le hace eso a su propia lectura? ¿Y en qué punto apoyarse en la fluidez del loro se convierte en delegar su juicio en un eco estadístico del de todos los demás?",
  "8.1": "Las crisis comparten raíces, de modo que resolverlas de una en una es sembrarlas de nuevo de una en una. ¿Cómo sería una institución construida para ver el enredo mientras actúa dentro de él?",
  "8.2": "El entorno se ha vuelto incomprensible en el propio sentido del marco. ¿Cuál es el valor del marco que se lo dice? ¿Y qué hace usted con la distancia entre entender el diagnóstico y saber qué hacer?",
  "8.3": "Los fracasos institucionales más caros vienen de aplicar la experticia al dominio equivocado. ¿Cuál es la señal, y por qué las instituciones prefieren de forma tan fiable el marco que halaga a sus expertos?",
  "8.4": "La ironía y la sinceridad están ambas disponibles, y ninguna basta. ¿Cómo es la honestidad aquí? ¿Es la oscilación misma una nueva manera de ser honesto, o una nueva manera de esquivar la elección?",
  "8.5": "Todo marco de síntesis, incluido el de este currículo, es parcial. ¿Cómo usa un mapa en el que no confía del todo? ¿Y no será la habilidad de usar mapas parciales sin confundirlos con el territorio la destreza real que todo el currículo ha estado construyendo?",
  "8.6": "Toda institución que quiere reformar está gestionando una condición que usted tolera. ¿Cuál es la diferencia entre su reformismo y su complicidad, y a qué tendría que renunciar para responder con honestidad?",
  "8.7": "La inspección sostenida no encuentra al yo que la hace. ¿Qué se libra exactamente? ¿Y no será el impulso de dejar de mirar, de archivar esto como metáfora, la última maniobra de la misma cosa que la práctica disolvería?",
  "8.8": "Todo marco es parcial, y el caso excede cualquier síntesis. ¿Para qué es este currículo en definitiva? ¿Y «una práctica de ver que incluye ver su propia ceguera» es una respuesta, o una manera más elegante de no terminar nunca?",
};

async function main() {
  const byModule = new Map<number, [string, string][]>();
  for (const [code, hook] of Object.entries(hookRewrites)) {
    const m = parseInt(code.split(".")[0], 10);
    if (!byModule.has(m)) byModule.set(m, []);
    byModule.get(m)!.push([code, hook]);
  }

  let applied = 0;
  for (const [mod, entries] of byModule) {
    const path = `scripts/out/es/lessons-modules-${mod}.json`;
    const data = (await Bun.file(path).json()) as Record<
      string,
      { lessonCode: string; content: Record<string, string> }
    >;
    for (const [code, hook] of entries) {
      if (!data[code]) {
        console.error(`MISS ${code} in module ${mod}`);
        continue;
      }
      if (data[code].content.zeigarnikHook === hook) continue; // already applied
      data[code].content.zeigarnikHook = hook;
      applied++;
    }
    await Bun.write(path, JSON.stringify(data, null, 2) + "\n");
  }
  console.log(`ES hooks rewritten: ${applied}`);
}

main();
