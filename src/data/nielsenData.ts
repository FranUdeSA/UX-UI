import { NielsenHeuristicItem } from '../types';

export const nielsenHeuristicsData: NielsenHeuristicItem[] = [
  {
    "id": "H1",
    "number": 1,
    "name": "Visibilidad del estado del sistema",
    "principleDescription": "El sistema siempre debe mantener informados a los usuarios sobre lo que está sucediendo, mediante retroalimentación adecuada y oportuna.",
    "severity": null,
    "screenName": "Reserva de turno por fecha (Paso 1 de 3)",
    "evidenceImage": "",
    "explanation": "La interfaz indica explícitamente la etapa del proceso en la que se encuentra el usuario mediante el indicador \"Paso 1 de 3\", lo cual satisface la heurística al comunicar de forma constante el estado del sistema.",
    "userImpact": "Permite al usuario dimensionar la extensión del proceso y reduce la incertidumbre asociada a flujos de múltiples pasos."
  },
  {
    "id": "H2",
    "number": 2,
    "name": "Correspondencia entre el sistema y el mundo real",
    "principleDescription": "El sistema debe hablar el lenguaje de los usuarios, con palabras, frases y conceptos familiares en lugar de términos técnicos internos.",
    "severity": null,
    "screenName": "Solicitud de receta electrónica",
    "evidenceImage": "",
    "explanation": "Usa lenguaje cotidiano (\"Elegí tu receta\", \"¿Dónde te contactamos?\") en vez de términos técnicos, e íconos reconocibles (pastilla, jeringa) que representan conceptos del mundo real.",
    "userImpact": "El usuario entiende rápido qué hace cada opción sin necesitar explicación adicional."
  },
  {
    "id": "H3",
    "number": 3,
    "name": "Control y libertad del usuario",
    "principleDescription": "Los usuarios suelen realizar acciones por error. Necesitan una \"salida de emergencia\" claramente señalada para abandonar el estado no deseado (deshacer/rehacer/cancelar).",
    "severity": null,
    "screenName": "\"Mi cartilla\" o \"Datos personales\" (con la X arriba a la derecha)",
    "evidenceImage": "",
    "explanation": "Todas las pantallas modales tienen una X visible para salir, y hay enlaces \"Cambiar\" (paciente, ubicación) para revertir una selección sin reiniciar el flujo.",
    "userImpact": "El usuario puede abandonar o corregir una acción sin sentirse \"atrapado\" en la pantalla."
  },
  {
    "id": "H4",
    "number": 4,
    "name": "Consistencia y estándares",
    "principleDescription": "Los usuarios no deberían tener que preguntarse si diferentes palabras, situaciones o acciones significan lo mismo. Seguir las convenciones de la plataforma.",
    "severity": null,
    "screenName": "Comparar 3-4 pantallas cualquiera (header azul, flecha atrás, bottom nav)",
    "evidenceImage": "",
    "explanation": "El header azul, la flecha \"<\" para volver y la barra de navegación inferior (Inicio, Cartilla, Credencial, Trámites, Más) se repiten idénticos en toda la app.",
    "userImpact": "El usuario aprende el patrón una sola vez y lo puede aplicar en cualquier sección, reduciendo la curva de aprendizaje."
  },
  {
    "id": "H5",
    "number": 5,
    "name": "Prevención de errores",
    "principleDescription": "Mejor que un buen mensaje de error es un diseño cuidadoso que evite que ocurra el problema en primer lugar (confirmaciones, restricciones inteligentes).",
    "severity": null,
    "screenName": "\"Reservar turno por fecha\" (botón \"Continuar\" gris/deshabilitado)",
    "evidenceImage": "",
    "explanation": "El botón \"Continuar\" permanece deshabilitado hasta que se completa el campo obligatorio de ubicación.",
    "userImpact": "Se evita que el usuario avance con datos incompletos y reciba un error después."
  },
  {
    "id": "H6",
    "number": 6,
    "name": "Reconocimiento antes que recuerdo",
    "principleDescription": "Minimizar la carga de memoria del usuario haciendo visibles los elementos, acciones y opciones. La información debe ser accesible sin requerir memorización.",
    "severity": null,
    "screenName": "\"Mis turnos\" (con \"¿De qué paciente? Todo el grupo familiar — Cambiar\")",
    "evidenceImage": "",
    "explanation": "La app muestra la selección actual (paciente, ubicación) en vez de obligar al usuario a recordarla, y la barra inferior con íconos siempre visible reduce la necesidad de memorizar el camino de navegación.",
    "userImpact": "Menor carga cognitiva; el usuario reconoce sus opciones en vez de tener que recordarlas."
  },
  {
    "id": "H7",
    "number": 7,
    "name": "Flexibilidad y eficiencia de uso",
    "principleDescription": "Los atajos y aceleradores pueden acelerar la interacción para el usuario experto de manera que el sistema atienda tanto a usuarios principiantes como avanzados.",
    "severity": null,
    "screenName": "\"Mis turnos\" (\"Pedí turno ahora\" vs. \"Reservar turno por fecha\")",
    "evidenceImage": "",
    "explanation": "Ofrece dos caminos para el mismo objetivo: uno rápido (\"Pedí turno ahora\") y uno guiado paso a paso, además de accesos directos en el home (Credenciales, Riesgo de vida, Contactanos).",
    "userImpact": "Usuarios nuevos usan el flujo guiado y usuarios frecuentes ahorran tiempo con el acceso directo."
  },
  {
    "id": "H8",
    "number": 8,
    "name": "Diseño estético y minimalista",
    "principleDescription": "Las interfaces no deben contener información que sea irrelevante o que rara vez se necesite. Cada unidad adicional compite con las unidades relevantes.",
    "severity": null,
    "screenName": "\"Facturación y pagos\" (pantalla casi vacía, solo un cartel informativo)",
    "evidenceImage": "",
    "explanation": "Acá el minimalismo juega en contra: la pantalla tiene mucho espacio vacío sin contenido útil, dando sensación de pantalla \"rota\" o incompleta en vez de diseño intencional.",
    "userImpact": "El usuario puede pensar que hay un error de carga en vez de entender que simplemente no tiene información para mostrar."
  },
  {
    "id": "H9",
    "number": 9,
    "name": "Ayudar a reconocer, diagnosticar y recuperarse de errores",
    "principleDescription": "Los mensajes de error deben expresarse en un lenguaje sencillo (sin códigos), indicar con precisión el problema y sugerir constructivamente una solución.",
    "severity": null,
    "screenName": "\"Mis trámites\" (\"No tenés trámites activos... Podés realizar uno nuevo desde la sección Trámites o ingresando a Gestiones online\")",
    "evidenceImage": "",
    "explanation": "El estado vacío no es un error, pero la app aprovecha para explicar claramente qué hacer a continuación, en lenguaje simple y sin códigos técnicos.",
    "userImpact": "El usuario no queda confundido ante una pantalla sin contenido, sabe cuál es el próximo paso."
  },
  {
    "id": "H10",
    "number": 10,
    "name": "Ayuda y documentación",
    "principleDescription": "Aunque es mejor que el sistema pueda usarse sin documentación, puede ser necesario brindar ayuda que sea fácil de buscar, enfocada en la tarea y concisa.",
    "severity": null,
    "screenName": "\"Buscá en la cartilla\" (enlaces \"Ver normas generales\", \"Cobertura en el exterior\") o \"Asistencia Médica de Urgencias\" (\"Ver Términos y condiciones\")",
    "evidenceImage": "",
    "explanation": "Hay enlaces de ayuda contextual disponibles en las pantallas relevantes, sin que el usuario tenga que buscarlos en un menú de ayuda genérico aparte.",
    "userImpact": "El usuario accede a información adicional justo cuando la necesita, sin salir del flujo."
  }
];
export { severityLevelsMeta } from './severityMeta';
