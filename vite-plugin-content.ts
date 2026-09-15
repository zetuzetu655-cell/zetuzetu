import fs from 'node:fs';
import path from 'node:path';
import type { Plugin, ViteDevServer } from 'vite';

interface CollectionConfig {
  id: string;
  dir: string;
  sortByTimestamp?: boolean;
}

const COLLECTIONS: CollectionConfig[] = [
  { id: 'posts', dir: 'public/content/posts', sortByTimestamp: true },
  { id: 'programs', dir: 'public/content/programs' },
  { id: 'milestones', dir: 'public/content/milestones' },
  { id: 'merchandise', dir: 'public/content/merchandise' }, { id: 'media', dir: 'public/data/media' },
];

const TIME_UNITS: Record<string, number> = {
  second: 1,
  seconds: 1,
  minute: 60,
  minutes: 60,
  hour: 3600,
  hours: 3600,
  day: 86400,
  days: 86400,
  week: 604800,
  weeks: 604800,
  month: 2592000,
  months: 2592000,
  year: 31536000,
  years: 31536000,
};

function parseRelativeTimestamp(ts: string): number {
  const match = ts.match(/(\d+)\s*(second|seconds|minute|minutes|hour|hours|day|days|week|weeks|month|months|year|years)/i);
  if (!match) return Number.MAX_SAFE_INTEGER;
  const value = parseInt(match[1], 10);
  const unit = match[2].toLowerCase();
  return value * (TIME_UNITS[unit] ?? 0);
}

function loadCollection(dir: string, sortByTimestamp?: boolean): unknown[] {
  if (!fs.existsSync(dir)) return [];
  const items = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .sort()
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')));

  if (sortByTimestamp) {
    items.sort((a, b) => {
      const ta = parseRelativeTimestamp((a as { timestamp?: string }).timestamp ?? '');
      const tb = parseRelativeTimestamp((b as { timestamp?: string }).timestamp ?? '');
      return ta - tb;
    });
  }

  return items;
}

const VIRTUAL_PREFIX = 'virtual:content/';

export function contentPlugin(): Plugin {
  let server: ViteDevServer | null = null;

  function buildVirtualModule(collectionId: string): string {
    const col = COLLECTIONS.find((c) => c.id === collectionId);
    if (!col) return 'export default [];';
    const data = loadCollection(col.dir, col.sortByTimestamp);
    return `export default ${JSON.stringify(data)};`;
  }

  function reloadCollection(filePath: string) {
    if (!filePath.endsWith('.json')) return;
    for (const col of COLLECTIONS) {
      const absDir = path.resolve(col.dir);
      if (filePath.startsWith(absDir)) {
        const modId = `\0${VIRTUAL_PREFIX}${col.id}`;
        const mod = server?.moduleGraph.getModuleById(modId);
        if (mod) {
          server?.moduleGraph.invalidateModule(mod);
          server?.ws.send({ type: 'full-reload' });
        }
        return;
      }
    }
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

           // Ensure media directory exists
      const mediaDir = path.resolve('public/data/media');
      if (!fs.existsSync(mediaDir)) {
        fs.mkdirSync(mediaDir, { recursive: true });
      }
      devServer.watcher.add(mediaDir);

      devServer.watcher.on('change', reloadCollection);
      devServer.watcher.on('add', reloadCollection);
      devServer.watcher.on('unlink', reloadCollection);
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
