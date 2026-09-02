import { InterviewSection, InterviewSession } from '../types/interview';

export const interviewScriptSections: InterviewSection[] = [
  {
    id: 'sec_intro',
    number: 1,
    title: '1. Introducción y Encuadre',
    shortTitle: 'Encuadre',
    suggestedMinutes: 2,
    description: 'Generación de atmósfera de confianza, encuadre del rol investigativo y consentimiento explícito.',
    methodologySlides: ['Diapositiva 5', 'Diapositiva 7', 'Diapositiva 8'],
    methodologyRationale:
      'La entrevista cualitativa requiere una atmósfera distendida pero con encuadre explícito, clarificando que el objeto evaluado es el servicio/sistema y nunca las habilidades del usuario. Separa al moderador (atención flotante) del observador (citas y gestos).',
    questions: [
      {
        id: 'q_intro_script',
        code: 'ENCUADRE',
        title: 'Guión verbal de apertura y consentimiento',
        verbalScript:
          '"Hola, muchas gracias por sumarte a esta charla. Me presento, mi nombre es [Nombre del moderador] y me acompaña [Nombre del observador], quien va a estar tomando notas durante la sesión.\n\nEstamos realizando esta entrevista como parte de un proyecto de investigación para la materia Diseño UX de la Universidad de San Andrés. Nuestro objetivo es conocer cómo es tu experiencia real interactuando con los servicios y canales de tu cobertura de salud en OSDE.\n\nQueremos aclararte que no hay respuestas correctas ni incorrectas: nos interesa tu experiencia cotidiana sincera. Si en algún momento preferís pausar o no responder alguna pregunta, no hay ningún problema. ¿Tenés alguna duda o consulta antes de que comencemos?"',
        moderatorRules: [
          'Mantener contacto visual pleno hacia la cámara de Zoom.',
          'Esperar confirmación explícita del participante antes de iniciar el cronómetro y pasar al bloque siguiente.',
          'Aclarar con calidez que se evalúa el producto y la experiencia, jamás al usuario.'
        ],
        observerChecklist: [
          'Confirmar que Tactiq esté activo y transcribiendo.',
          'Verificar actitud inicial del participante (distendido, tímido, ansioso).'
        ],
        methodologySlides: ['Diapositiva 5', 'Diapositiva 7', 'Diapositiva 8'],
        methodologyRationale:
          'Práctica estándar de consentimiento informado (Diapo 8) que mitiga la complacencia del entrevistado, garantizando datos espontáneos y fidedignos.'
      }
    ]
  },
  {
    id: 'sec_warmup',
    number: 2,
    title: '2. Warm up / Rompehielos',
    shortTitle: 'Warm up',
    suggestedMinutes: 3,
    description: 'Transición progresiva: perfil de vida, adopción tecnológica e intensidad de uso del sistema de salud.',
    methodologySlides: ['Diapositiva 8', 'Diapositiva 13', 'Diapositiva 14', 'Diapositivas 70 a 74'],
    methodologyRationale:
      'Establece el orden lógico de menor a mayor implicación personal. Rompe el hielo con temas cotidianos antes de entrar a la fricción de la gestión sanitaria.',
    questions: [
      {
        id: 'q_p1',
        number: 1,
        code: 'P1',
        title: 'Perfil y contexto de vida',
        verbalScript:
          '"Para arrancar, contanos un poco sobre vos: ¿a qué te dedicás habitualmente y cómo suele ser un día típico en tu rutina?"',
        moderatorRules: [
          'Escucha activa. Dejar hablar sin interrumpir.',
          'Identificar ritmos de vida, ocupación y manejo de tiempos.'
        ],
        methodologySlides: ['Diapositiva 13'],
        methodologyRationale:
          'Rompe el hielo con un tema accesible que relaja al entrevistado y sitúa su contexto sociodemográfico.'
      },
      {
        id: 'q_p2',
        number: 2,
        code: 'P2',
        title: 'Afinidad y adopción tecnológica general',
        verbalScript:
          '"En tu día a día, ¿cuáles son las aplicaciones que más utilizás en el teléfono celular y para qué tareas específicas las usás?"',
        moderatorRules: [
          'No inducir apps médicas ni bancarias todavía.',
          'Detectar si usa billeteras digitales, apps de delivery o mensajería.'
        ],
        methodologySlides: ['Diapositiva 14'],
        methodologyRationale:
          'Releva el modelo mental y la madurez digital del usuario sin sesgar hacia el ecosistema de OSDE.'
      },
      {
        id: 'q_p3',
        number: 3,
        code: 'P3',
        title: 'Intensidad de uso del sistema de salud (Calibrador de Arquetipo)',
        verbalScript:
          '"Pensando en tu salud, ¿con qué frecuencia a lo largo del año solés requerir atención médica (consultas de rutina, especialistas, estudios o farmacia)?"',
        moderatorRules: [
          'Atención al dato de frecuencia: clave para tipificar el arquetipo en el resumen.',
          'Clasificar mentalmente: ¿Usuario esporádico/preventivo (1 a 2 veces al año) o intensivo/crónico (gestiones mensuales)?'
        ],
        observerChecklist: [
          'Registrar si tiene personas a cargo (hijos, padres) que aumenten la frecuencia indirecta.'
        ],
        methodologySlides: ['Diapositivas 70 a 74'],
        methodologyRationale:
          'Provee el dato de frecuencia para calibrar el arquetipo (Preventivo vs Crónico), base de las User Personas.'
      }
    ]
  },
  {
    id: 'sec_block_a',
    number: 3,
    title: '3. Bloque A: Gestiones y Canales de Resolución',
    shortTitle: 'Bloque A: Canales',
    suggestedMinutes: 3,
    description: 'Desglose sin doble filo: Tarea fáctica (Qué) -> Medio adoptado (Cómo/Dónde) -> Motivación causal (Por qué).',
    methodologySlides: ['Diapositiva 9', 'Diapositiva 14', 'Diapositiva 17', 'Diapositiva 21'],
    methodologyRationale:
      'Evita la pregunta de doble filo separando necesidad fáctica -> medio adoptado -> motivación. Principio de no inducción: no nombra app, web ni teléfono.',
    questions: [
      {
        id: 'q_p4',
        number: 4,
        code: 'P4',
        title: 'Identificación de tareas habituales (El "Qué")',
        verbalScript:
          '"Pensando en tu atención y cobertura con OSDE, ¿cuáles son los trámites o gestiones de salud que solés realizar con mayor frecuencia?"',
        moderatorRules: [
          'No mencionar "turnos", "autorizaciones" ni "reintegros". Dejar que el usuario las enuncie de manera espontánea.'
        ],
        methodologySlides: ['Diapositiva 21'],
        methodologyRationale:
          'Desglose sin doble filo: Identifica la necesidad primaria antes del canal de resolución.'
      },
      {
        id: 'q_p5',
        number: 5,
        code: 'P5',
        title: 'Canales adoptados (El "Cómo / Dónde")',
        verbalScript:
          '"Para llevar a cabo esas gestiones que mencionás, ¿a través de qué medios o canales las resolvés habitualmente?"',
        moderatorRules: [
          'Principio de no inducción absoluto: No decir "app", "web", "WhatsApp" ni "sede física".'
        ],
        methodologySlides: ['Diapositiva 9'],
        methodologyRationale:
          'Principio de no inducción (Diapo 9): Revela los puntos de contacto elegidos espontáneamente por el afiliado.'
      },
      {
        id: 'q_p6',
        number: 6,
        code: 'P6',
        title: 'Motivación causal (El "Por qué")',
        verbalScript:
          '"¿Qué motivos o factores te llevan a elegir ese canal en particular frente a las otras vías disponibles?"',
        moderatorRules: [
          'Explorar causas raíz: ¿Inmediatez, practicidad, desconfianza técnica o hábito adquirido?'
        ],
        fiveWhys: {
          context: 'Si dice "es más cómodo" o "es más rápido":',
          prompts: [
            '¿Qué hace concretamente que sea más cómodo para vos?',
            '¿Qué sentís que te asegura este canal que otros no te dan?'
          ]
        },
        methodologySlides: ['Diapositiva 14', 'Diapositiva 17'],
        methodologyRationale:
          'Indagación causal directa para mapear las motivaciones psicológicas reales detrás de la omnicanalidad.'
      }
    ]
  },
  {
    id: 'sec_block_b',
    number: 4,
    title: '3. Bloque B: Búsqueda Médica y Cartilla (Incidente Crítico)',
    shortTitle: 'Bloque B: Cartilla',
    suggestedMinutes: 4,
    description: 'Reconstrucción paso a paso del último episodio fáctico con ramificación según el medio utilizado.',
    methodologySlides: ['Diapositiva 5', 'Diapositiva 6', 'Diapositiva 9', 'Diapositiva 10', 'Diapositiva 16', 'Diapositiva 17'],
    methodologyRationale:
      'Anclar en el último episodio fáctico reconstruye el user journey real y minimiza respuestas especulativas o complacientes.',
    questions: [
      {
        id: 'q_p7',
        number: 7,
        code: 'P7',
        title: 'Incidente crítico: Búsqueda de profesional o centro',
        verbalScript:
          '"Pensando en la última vez que necesitaste buscar un médico, especialista o centro de atención en OSDE: contame el paso a paso desde que supiste que tenías que atenderte hasta que coordinaste la consulta."',
        moderatorRules: [
          'Escuchar activamente el camino elegido por el afiliado.',
          'Seleccionar abajo la ramificación correspondiente para ver la repregunta precisa.'
        ],
        branching: {
          conditionTitle: '¿Cómo resolvió la búsqueda según lo que acaba de contar?',
          options: [
            {
              id: 'app_web',
              label: '📱 Opción 1: Resolvió por App o Web de OSDE',
              script:
                '"Al momento de buscarlo en la app, ¿cómo fue tu experiencia navegando y aplicando filtros para encontrar al profesional?"',
              deepDiveTip:
                'Disparador de profundización: Explorar qué tan intuitivo fue el filtrado por cercanía, cartilla o especialidad, sin nombrarle botones específicos de la interfaz (Diapo 9).'
            },
            {
              id: 'externo',
              label: '🌐 Opción 2: Resolvió por fuera (Google, Recomendación, Teléfono)',
              script:
                '"¿Qué motivos te llevaron a buscarlo por esa vía en lugar de consultar la cartilla en la app de OSDE?"',
              deepDiveTip:
                'Disparador de profundización: Detectar barreras de adopción o desconfianza (información desactualizada, hábito analógico, malas experiencias previas) (Diapo 17).'
            }
          ]
        },
        methodologySlides: ['Diapositiva 5', 'Diapositiva 6', 'Diapositiva 10', 'Diapositiva 16'],
        methodologyRationale:
          'Flexibilidad semi-estructurada (Diapo 6): Adapta el flujo sin forzar a un afiliado analógico a opinar sobre pantallas que no vio.'
      },
      {
        id: 'q_p8',
        number: 8,
        code: 'P8',
        title: 'Criterios determinantes de elección (Universal)',
        verbalScript:
          '"Al momento de decidirte finalmente por ese médico o centro, ¿qué información o factores fueron determinantes para tomar tu elección?"',
        moderatorRules: [
          '⚠️ REGLA CRÍTICA: No enumerar opciones (no sugerir distancia geográfica, reputación, turnos inmediatos ni horarios).'
        ],
        methodologySlides: ['Diapositiva 9'],
        methodologyRationale:
          'Eliminación de sesgo por lista (Diapo 9): Permite descubrir qué atributos de decisión pesan verdaderamente en el afiliado.'
      }
    ]
  },
  {
    id: 'sec_block_c',
    number: 5,
    title: '3. Bloque C: Punto de Atención y Credencial Digital',
    shortTitle: 'Bloque C: Credencial',
    suggestedMinutes: 3,
    description: 'Exploración de la interacción bajo presión ambiental en contexto real (recepción, guardia, farmacia).',
    methodologySlides: ['Diapositiva 10', 'Diapositivas 64 a 69'],
    methodologyRationale:
      'Explora la interacción bajo presión ambiental (ansiedad, apuro en mostrador, señal deficiente). Alimentación directa de Pains para el Mapa de Empatía.',
    questions: [
      {
        id: 'q_p9',
        number: 9,
        code: 'P9',
        title: 'Acceso y acreditación en contexto real',
        verbalScript:
          '"Al llegar a la recepción de una consulta médica, laboratorio o farmacia, ¿cómo es tu experiencia habitual para identificarte y acreditarte desde el celular?"',
        moderatorRules: [
          'Dejar que describa los pasos físicos y digitales de memoria.',
          'Notar si abre la app con anticipación en la calle o recién frente al mostrador.'
        ],
        methodologySlides: ['Diapositiva 10'],
        methodologyRationale:
          'Contexto real de uso (Diapo 10): Evalúa la usabilidad situacional fuera del laboratorio o escritorio.'
      },
      {
        id: 'q_p10',
        number: 10,
        code: 'P10',
        title: 'Fricciones, trabas y contingencias con el Token / Credencial',
        verbalScript:
          '"¿Te ocurrió alguna vez tener algún inconveniente o traba en ese momento al intentar presentar tu credencial o código dinámico/token? (Si responde que sí: ¿cómo fue la situación y de qué manera lo resolviste?)"',
        moderatorRules: [
          'Apretar el botón ⚡ Punto de Dolor ante cualquier traba mencionada.'
        ],
        observerChecklist: [
          'Problemas de conectividad en salas de espera o subsuelos de sanatorios.',
          'Vencimiento del token en mostrador ante demoras de atención.',
          'Gestiones del grupo familiar a cargo (hijos, cónyuge) en la misma credencial.',
          'Estrategias de contingencia: captura de pantalla previa, reclamo verbal, uso de datos propios.'
        ],
        methodologySlides: ['Diapositivas 64 a 69'],
        methodologyRationale:
          'Alimentación directa de Pains (Diapos 64 a 69): Fricciones del mostrador que conformarán los dolores del Mapa de Empatía.'
      }
    ]
  },
  {
    id: 'sec_block_d',
    number: 6,
    title: '3. Bloque D: Gestiones Administrativas y Quiebres de Flujo',
    shortTitle: 'Bloque D: Quiebres',
    suggestedMinutes: 4,
    description: 'Indagación de autorizaciones/reintegros y técnica de los 5 Porqués ante puntos de abandono.',
    methodologySlides: ['Diapositiva 9', 'Diapositiva 14', 'Diapositiva 17', 'Diapositivas 22 a 25'],
    methodologyRationale:
      'Neutralidad terminológica (verbos no digitales como presentar vs adjuntar). Mapeo de Drop-offs y causa raíz con los 5 Porqués.',
    questions: [
      {
        id: 'q_p11',
        number: 11,
        code: 'P11',
        title: 'Ocurrencia de trámites administrativos (Autorizaciones / Reintegros)',
        verbalScript:
          '"¿Alguna vez tuviste que gestionar una autorización, solicitar un reintegro o presentar una orden o receta médica con OSDE?"',
        branching: {
          conditionTitle: '¿El participante realizó alguna vez este tipo de trámite?',
          options: [
            {
              id: 'tramite_si',
              label: '✅ Si respondió SÍ: Ha realizado trámites',
              script:
                '• "¿Es un trámite que realizás habitualmente o fue algo esporádico?"\n\n• "¿Cómo fue el paso a paso de ese proceso a través de [el medio / canal que utilizaste]?"',
              deepDiveTip:
                'Disparador de sondeo: "¿Qué parte de ese trámite resultó clara y en qué punto sentiste dudas o demoras?"'
            },
            {
              id: 'tramite_no',
              label: '❌ Si respondió NO: Indagación de causa',
              script:
                '• "¿Qué motivos hicieron que nunca necesitaras realizar este tipo de gestiones?"\n\n• "En caso de que necesitaras hacer una autorización en el futuro, ¿por qué medio asumirías que tenés que resolverlo y por qué?"',
              deepDiveTip:
                'Detectar si los centros resuelven directo, si delega trámites en otra persona o su modelo mental proyectado.'
            }
          ]
        },
        methodologySlides: ['Diapositiva 9', 'Diapositivas 22 a 25'],
        methodologyRationale:
          'Neutralidad terminológica (Diapo 9): verbos como "presentar" evitan inducir interfaces digitales y dejan abierta la puerta al mail o sede.'
      },
      {
        id: 'q_p12',
        number: 12,
        code: 'P12',
        title: 'Punto de quiebre y abandono del canal (Drop-off)',
        verbalScript:
          '"¿Te surgió alguna vez una situación en la que intentaste resolver un trámite o consulta, no pudiste concretarlo por la vía que elegiste y tuviste que recurrir a otro canal o abandonar?"',
        branching: {
          conditionTitle: '¿Tuvo alguna vez una situación de quiebre o abandono?',
          options: [
            {
              id: 'quiebre_si',
              label: '⚠️ Si responde SÍ: Tuvo quiebre o abandono',
              script:
                '"¿Qué falló en ese momento y por qué tomaste ese camino alternativo?"',
              deepDiveTip:
                'Repreguntas de sondeo ante respuestas breves:\n• "¿Qué te indicaba o mostraba la pantalla en ese momento?"\n• "¿Qué te llevó a saltar a [teléfono / sede / mail] y no insistir por esa vía inicial?"'
            },
            {
              id: 'quiebre_no',
              label: '✅ Si responde NO: Nunca tuvo trabas de ese tipo',
              script:
                '➡️ (Pasar directamente a las preguntas finales)',
              deepDiveTip:
                'Avanzar directamente al bloque siguiente: 4. Preguntas Finales (Oportunidad e Innovación).'
            }
          ]
        },
        moderatorRules: [
          '⚠️ Si responde con frases genéricas ("el sistema es malo", "no me anduvo", "no respondió nadie"), aplicar las repreguntas de sondeo.'
        ],
        fiveWhys: {
          context: 'Repreguntas de sondeo ante respuestas breves (Técnica de 5 Porqués):',
          prompts: [
            'Repregunta 1: "¿Qué te indicaba o mostraba la pantalla en ese momento?"',
            'Repregunta 2: "Al ver eso, ¿qué información o certeza necesitabas para poder seguir?"',
            'Repregunta 3: "¿Qué te llevó a saltar a [teléfono / sede / mail] y no insistir por esa vía inicial?"'
          ]
        },
        methodologySlides: ['Diapositivas 14 y 17', 'Diapositivas 22 a 25'],
        methodologyRationale:
          'Meta diagnóstica: Distinguir si el quiebre fue un fallo de sistema (error técnico), de diseño/UI (falta de visibilidad de estado) o de desconfianza humana.'
      }
    ]
  },
  {
    id: 'sec_final',
    number: 7,
    title: '4. Preguntas Finales (Oportunidad e Innovación)',
    shortTitle: 'Oportunidades',
    suggestedMinutes: 2,
    description: 'Pregunta hipotética generativa y apertura no guionada para captar hallazgos emergentes.',
    methodologySlides: ['Diapositiva 14', 'Diapositiva 16', 'Diapositiva 19', 'Diapositivas 48 a 54'],
    methodologyRationale:
      'Cierra el ciclo exploratorio permitiendo al usuario proyectar su experiencia ideal. La P14 captura variables no previstas para el mapa de afinidad.',
    questions: [
      {
        id: 'q_p13',
        number: 13,
        code: 'P13',
        title: 'Pregunta hipotética / Oportunidad generativa (Varita mágica)',
        verbalScript:
          '"Si pudieras modificar o sumar una sola cosa en la app de OSDE para que tu gestión médica sea mucho más ágil y sencilla, ¿qué propondrías y de qué manera te ayudaría?"',
        moderatorRules: [
          'Presionar el botón 💡 Sugerencia para registrar este momento clave.'
        ],
        methodologySlides: ['Diapositiva 19'],
        methodologyRationale:
          'Preguntas de futuro e innovación (Diapo 19): Insumo directo para la posterior etapa de ideación y rediseño interactivo.'
      },
      {
        id: 'q_p14',
        number: 14,
        code: 'P14',
        title: 'Apertura de cierre no guionada (Hallazgos emergentes)',
        verbalScript:
          '"¿Hay algún aspecto de tu experiencia cotidiana con OSDE o sus herramientas digitales que no hayamos tocado en la charla y que quieras comentar?"',
        moderatorRules: [
          'Silencio expectante. Darle 5 a 10 segundos para pensar si tiene algo más en mente.'
        ],
        methodologySlides: ['Diapositiva 16', 'Diapositivas 48 a 54'],
        methodologyRationale:
          'Espacio para hallazgos emergentes (Diapo 16): Captura factores no previstos en las hipótesis del equipo para el mapa de afinidad.'
      }
    ]
  },
  {
    id: 'sec_closing',
    number: 8,
    title: '5. Cierre Formal y Reclutamiento',
    shortTitle: 'Cierre',
    suggestedMinutes: 1,
    description: 'Agradecimiento, reciprocidad y reclutamiento para pruebas de usabilidad de prototipos futuros.',
    methodologySlides: ['Diapositiva 7', 'Diapositiva 74', 'Diapositiva 83'],
    methodologyRationale:
      'Cierra el pacto de confianza establecido en la introducción y conecta el Research cualitativo con los futuros tests de usabilidad.',
    questions: [
      {
        id: 'q_closing_script',
        code: 'CIERRE',
        title: 'Guión verbal de despedida y reclutamiento',
        verbalScript:
          '"Te agradecemos muchísimo por tu tiempo y por compartir tu experiencia con nosotros.\n\nToda esta información nos resulta sumamente valiosa para analizar patrones, detectar oportunidades y comprender las necesidades reales de los afiliados en el diseño de estos servicios.\n\nComo parte del proceso de la materia, más adelante estaremos desarrollando propuestas de mejora y testeando prototipos interactivos. Si te interesa, ¿te gustaría que te contactemos para participar de esas pruebas de usabilidad?\n\n¡Muchas gracias nuevamente y que tengas un muy buen día!"',
        moderatorRules: [
          'Anotar si el usuario acepta o no participar en los futuros testeos.',
          'Detener el cronómetro y hacer clic en "Finalizar Entrevista" para ver el resumen de marcas.'
        ],
        methodologySlides: ['Diapositiva 7', 'Diapositiva 74', 'Diapositiva 83'],
        methodologyRationale:
          'Reclutamiento para la fase de testeo (Diapos 74 y 83): Asegura candidatos afines para validar los prototipos de la materia.'
      }
    ]
  }
];

export const defaultInterviewSessions: InterviewSession[] = [
  {
    id: 'entrevista-1',
    number: 1,
    title: 'Entrevista #1',
    participantCode: 'Participante 1 (P1)',
    interviewers: ['Franco Dragani Malavolta', 'Simón Glücksmann'],
    date: '2026-09-03',
    status: 'pendiente',
    elapsedSeconds: 0,
    currentSectionId: 'sec_intro',
    currentQuestionId: 'q_intro_script',
    archetype: 'sin_definir',
    branchSelections: {},
    markers: [],
    generalNotes: ''
  },
  {
    id: 'entrevista-2',
    number: 2,
    title: 'Entrevista #2',
    participantCode: 'Participante 2 (P2)',
    interviewers: ['Franco Dragani Malavolta', 'Simón Glücksmann'],
    date: '2026-09-03',
    status: 'pendiente',
    elapsedSeconds: 0,
    currentSectionId: 'sec_intro',
    currentQuestionId: 'q_intro_script',
    archetype: 'sin_definir',
    branchSelections: {},
    markers: [],
    generalNotes: ''
  },
  {
    id: 'entrevista-3',
    number: 3,
    title: 'Entrevista #3',
    participantCode: 'Participante 3 (P3)',
    interviewers: ['Franco Dragani Malavolta', 'Simón Glücksmann'],
    date: '2026-09-04',
    status: 'pendiente',
    elapsedSeconds: 0,
    currentSectionId: 'sec_intro',
    currentQuestionId: 'q_intro_script',
    archetype: 'sin_definir',
    branchSelections: {},
    markers: [],
    generalNotes: ''
  },
  {
    id: 'entrevista-4',
    number: 4,
    title: 'Entrevista #4',
    participantCode: 'Participante 4 (P4)',
    interviewers: ['Franco Dragani Malavolta', 'Simón Glücksmann'],
    date: '2026-09-04',
    status: 'pendiente',
    elapsedSeconds: 0,
    currentSectionId: 'sec_intro',
    currentQuestionId: 'q_intro_script',
    archetype: 'sin_definir',
    branchSelections: {},
    markers: [],
    generalNotes: ''
  },
  {
    id: 'entrevista-5',
    number: 5,
    title: 'Entrevista #5',
    participantCode: 'Participante 5 (P5)',
    interviewers: ['Bautista Luque', 'Santiago Straminsky'],
    date: '2026-09-05',
    status: 'pendiente',
    elapsedSeconds: 0,
    currentSectionId: 'sec_intro',
    currentQuestionId: 'q_intro_script',
    archetype: 'sin_definir',
    branchSelections: {},
    markers: [],
    generalNotes: ''
  },
  {
    id: 'entrevista-6',
    number: 6,
    title: 'Entrevista #6',
    participantCode: 'Participante 6 (P6)',
    interviewers: ['Bautista Luque', 'Santiago Straminsky'],
    date: '2026-09-05',
    status: 'pendiente',
    elapsedSeconds: 0,
    currentSectionId: 'sec_intro',
    currentQuestionId: 'q_intro_script',
    archetype: 'sin_definir',
    branchSelections: {},
    markers: [],
    generalNotes: ''
  },
  {
    id: 'entrevista-7',
    number: 7,
    title: 'Entrevista #7',
    participantCode: 'Participante 7 (P7)',
    interviewers: ['Bautista Luque', 'Santiago Straminsky'],
    date: '2026-09-06',
    status: 'pendiente',
    elapsedSeconds: 0,
    currentSectionId: 'sec_intro',
    currentQuestionId: 'q_intro_script',
    archetype: 'sin_definir',
    branchSelections: {},
    markers: [],
    generalNotes: ''
  },
  {
    id: 'entrevista-8',
    number: 8,
    title: 'Entrevista #8',
    participantCode: 'Participante 8 (P8)',
    interviewers: ['Bautista Luque', 'Santiago Straminsky'],
    date: '2026-09-06',
    status: 'pendiente',
    elapsedSeconds: 0,
    currentSectionId: 'sec_intro',
    currentQuestionId: 'q_intro_script',
    archetype: 'sin_definir',
    branchSelections: {},
    markers: [],
    generalNotes: ''
  }
];
