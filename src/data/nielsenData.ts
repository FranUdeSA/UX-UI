import { NielsenHeuristicItem } from '../types';

export const nielsenHeuristicsData: NielsenHeuristicItem[] = [
  {
    id: 'H1',
    number: 1,
    name: 'Visibilidad del estado del sistema',
    principleDescription: 'El sistema siempre debe mantener informados a los usuarios sobre lo que está sucediendo, mediante retroalimentación adecuada y oportuna.',
    severity: null,
    screenName: '',
    evidenceImage: '',
    explanation: '',
    userImpact: ''
  },
  {
    id: 'H2',
    number: 2,
    name: 'Correspondencia entre el sistema y el mundo real',
    principleDescription: 'El sistema debe hablar el lenguaje de los usuarios, con palabras, frases y conceptos familiares en lugar de términos técnicos internos.',
    severity: null,
    screenName: '',
    evidenceImage: '',
    explanation: '',
    userImpact: ''
  },
  {
    id: 'H3',
    number: 3,
    name: 'Control y libertad del usuario',
    principleDescription: 'Los usuarios suelen realizar acciones por error. Necesitan una "salida de emergencia" claramente señalada para abandonar el estado no deseado (deshacer/rehacer/cancelar).',
    severity: null,
    screenName: '',
    evidenceImage: '',
    explanation: '',
    userImpact: ''
  },
  {
    id: 'H4',
    number: 4,
    name: 'Consistencia y estándares',
    principleDescription: 'Los usuarios no deberían tener que preguntarse si diferentes palabras, situaciones o acciones significan lo mismo. Seguir las convenciones de la plataforma.',
    severity: null,
    screenName: '',
    evidenceImage: '',
    explanation: '',
    userImpact: ''
  },
  {
    id: 'H5',
    number: 5,
    name: 'Prevención de errores',
    principleDescription: 'Mejor que un buen mensaje de error es un diseño cuidadoso que evite que ocurra el problema en primer lugar (confirmaciones, restricciones inteligentes).',
    severity: null,
    screenName: '',
    evidenceImage: '',
    explanation: '',
    userImpact: ''
  },
  {
    id: 'H6',
    number: 6,
    name: 'Reconocimiento antes que recuerdo',
    principleDescription: 'Minimizar la carga de memoria del usuario haciendo visibles los elementos, acciones y opciones. La información debe ser accesible sin requerir memorización.',
    severity: null,
    screenName: '',
    evidenceImage: '',
    explanation: '',
    userImpact: ''
  },
  {
    id: 'H7',
    number: 7,
    name: 'Flexibilidad y eficiencia de uso',
    principleDescription: 'Los atajos y aceleradores pueden acelerar la interacción para el usuario experto de manera que el sistema atienda tanto a usuarios principiantes como avanzados.',
    severity: null,
    screenName: '',
    evidenceImage: '',
    explanation: '',
    userImpact: ''
  },
  {
    id: 'H8',
    number: 8,
    name: 'Diseño estético y minimalista',
    principleDescription: 'Las interfaces no deben contener información que sea irrelevante o que rara vez se necesite. Cada unidad adicional compite con las unidades relevantes.',
    severity: null,
    screenName: '',
    evidenceImage: '',
    explanation: '',
    userImpact: ''
  },
  {
    id: 'H9',
    number: 9,
    name: 'Ayudar a reconocer, diagnosticar y recuperarse de errores',
    principleDescription: 'Los mensajes de error deben expresarse en un lenguaje sencillo (sin códigos), indicar con precisión el problema y sugerir constructivamente una solución.',
    severity: null,
    screenName: '',
    evidenceImage: '',
    explanation: '',
    userImpact: ''
  },
  {
    id: 'H10',
    number: 10,
    name: 'Ayuda y documentación',
    principleDescription: 'Aunque es mejor que el sistema pueda usarse sin documentación, puede ser necesario brindar ayuda que sea fácil de buscar, enfocada en la tarea y concisa.',
    severity: null,
    screenName: '',
    evidenceImage: '',
    explanation: '',
    userImpact: ''
  }
];

export const severityLevelsMeta = {
  0: {
    label: '0 - No es un problema / Cumple',
    shortLabel: '0 - Cumple bien',
    description: 'No se detecta un problema de usabilidad o la interfaz cumple satisfactoriamente el principio.',
    bgColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    badgeColor: 'bg-emerald-600 text-white',
    dotColor: 'bg-emerald-500'
  },
  1: {
    label: '1 - Problema cosmético',
    shortLabel: '1 - Cosmético',
    description: 'No necesita ser arreglado a menos que haya tiempo extra en el ciclo de desarrollo.',
    bgColor: 'bg-blue-50 text-blue-700 border-blue-200',
    badgeColor: 'bg-blue-600 text-white',
    dotColor: 'bg-blue-500'
  },
  2: {
    label: '2 - Problema menor de usabilidad',
    shortLabel: '2 - Menor',
    description: 'Arreglarlo debe tener baja prioridad.',
    bgColor: 'bg-amber-50 text-amber-800 border-amber-200',
    badgeColor: 'bg-amber-600 text-white',
    dotColor: 'bg-amber-500'
  },
  3: {
    label: '3 - Problema mayor de usabilidad',
    shortLabel: '3 - Mayor',
    description: 'Importante de arreglar, debe tener alta prioridad.',
    bgColor: 'bg-orange-50 text-orange-800 border-orange-200',
    badgeColor: 'bg-orange-600 text-white',
    dotColor: 'bg-orange-500'
  },
  4: {
    label: '4 - Catástrofe de usabilidad',
    shortLabel: '4 - Catástrofe',
    description: 'Imperativo de solucionar antes de que el producto pueda ser lanzado o utilizado con normalidad.',
    bgColor: 'bg-red-50 text-red-800 border-red-200',
    badgeColor: 'bg-red-600 text-white',
    dotColor: 'bg-red-600'
  }
};
