import { UxLawItem, NielsenHeuristicItem } from '../types';

export interface GithubPublishOptions {
  owner: string;
  repo: string;
  branch: string;
  token: string;
  laws: UxLawItem[];
  heuristics: NielsenHeuristicItem[];
  commitMessage?: string;
}

// Función auxiliar para codificar en base64 compatible con UTF-8
function utf8ToBase64(str: string): string {
  return window.btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => {
      return String.fromCharCode(parseInt(p1, 16));
    })
  );
}

// Obtener el SHA de un archivo existente en GitHub
async function getFileSha(owner: string, repo: string, path: string, branch: string, token: string): Promise<string | null> {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Error al obtener ${path} (status ${res.status})`);
  }

  const data = await res.json();
  return data.sha;
}

// Actualizar o crear un archivo en el repositorio vía GitHub API
async function updateRepoFile(
  owner: string,
  repo: string,
  path: string,
  contentStr: string,
  message: string,
  branch: string,
  token: string
) {
  const sha = await getFileSha(owner, repo, path, branch, token);
  const base64Content = utf8ToBase64(contentStr);

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      content: base64Content,
      branch,
      sha: sha || undefined,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Error al actualizar ${path} (status ${res.status})`);
  }

  return await res.json();
}

// Publicar ambos archivos de datos al repositorio
export async function publishDataToGithub({
  owner,
  repo,
  branch,
  token,
  laws,
  heuristics,
  commitMessage,
}: GithubPublishOptions) {
  const lawsCode = `import { UxLawItem } from '../types';\n\nexport const uxLawsData: UxLawItem[] = ${JSON.stringify(
    laws,
    null,
    2
  )};\n`;

  const heuristicsCode = `import { NielsenHeuristicItem } from '../types';\n\nexport const nielsenHeuristicsData: NielsenHeuristicItem[] = ${JSON.stringify(
    heuristics,
    null,
    2
  )};\n\nexport { severityLevelsMeta } from './nielsenData';\n`;

  const message = commitMessage || `chore: actualización colaborativa de evaluación UX (${new Date().toLocaleString('es-AR')})`;

  // 1. Guardar leyes
  await updateRepoFile(owner, repo, 'src/data/uxLawsData.ts', lawsCode, message, branch, token);

  // 2. Guardar heurísticas
  await updateRepoFile(owner, repo, 'src/data/nielsenData.ts', heuristicsCode, message, branch, token);

  return true;
}
