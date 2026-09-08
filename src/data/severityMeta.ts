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
