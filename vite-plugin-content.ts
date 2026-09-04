import fs from 'node:fs';
import path from 'node:path';
import type { Plugin, ViteDevServer } from 'vite';

interface CollectionConfig {
  id: string;
  dir: string;
}

const COLLECTIONS: CollectionConfig[] = [
  { id: 'posts', dir: 'public/content/posts' },
  { id: 'programs', dir: 'public/content/programs' },
  { id: 'milestones', dir: 'public/content/milestones' },
  { id: 'merchandise', dir: 'public/content/merchandise' },
];

function loadCollection(dir: string): unknown[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .sort()
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')));
}

const VIRTUAL_PREFIX = 'virtual:content/';

export function contentPlugin(): Plugin {
  let server: ViteDevServer | null = null;

  function buildVirtualModule(collectionId: string): string {
    const col = COLLECTIONS.find((c) => c.id === collectionId);
    if (!col) return 'export default [];';
    const data = loadCollection(col.dir);
    return `export default ${JSON.stringify(data)};`;
  }

  return {
    name: 'content-collections',
    configureServer(devServer) {
      server = devServer;

      for (const col of COLLECTIONS) {
        const absDir = path.resolve(col.dir);
        if (fs.existsSync(absDir)) {
          devServer.watcher.add(absDir);
        }
      }

      devServer.watcher.on('change', (filePath) => {
        if (!filePath.endsWith('.json')) return;
        for (const col of COLLECTIONS) {
          const absDir = path.resolve(col.dir);
          if (filePath.startsWith(absDir)) {
            const modId = `${VIRTUAL_PREFIX}${col.id}`;
            const mod = devServer.moduleGraph.getModuleById(modId);
            if (mod) {
              devServer.moduleGraph.invalidateModule(mod);
              devServer.ws.send({ type: 'full-reload' });
            }
            return;
          }
        }
      });
    },

    resolveId(id) {
      if (id.startsWith(VIRTUAL_PREFIX)) {
        return '\0' + id;
      }
    },

    load(id) {
      if (id.startsWith('\0' + VIRTUAL_PREFIX)) {
        const collectionId = id.slice(('\0' + VIRTUAL_PREFIX).length);
        return buildVirtualModule(collectionId);
      }
    },
  };
}
