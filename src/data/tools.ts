import {
  TOOLS,
  CATS,
  TOOL_SLUGS,
  TRENDING_IDS,
  ICONS,
  onToolCleanup,
  runToolCleanup,
} from './toolsEngine.js';
import type { Tool, Category } from '../types';

export const allTools: Tool[] = TOOLS;
export const categories: Record<string, Category> = CATS;
export const toolSlugs: Record<string, string> = TOOL_SLUGS;
export const trendingIds: string[] = TRENDING_IDS;
export const icons: Record<string, string> = ICONS;
export { onToolCleanup, runToolCleanup };

export function getToolById(id: string): Tool | undefined {
  return allTools.find((t) => t.id === id);
}

export function getToolBySlugOrId(query: string): Tool | undefined {
  if (!query) return undefined;
  const clean = query.trim().toLowerCase();

  // 1. Direct ID match (e.g. "t01", "c05")
  const byId = allTools.find((t) => t.id.toLowerCase() === clean);
  if (byId) return byId;

  // 2. Direct slug match (e.g. "word-counter")
  for (const [id, slug] of Object.entries(toolSlugs)) {
    if (slug.toLowerCase() === clean) {
      return getToolById(id);
    }
  }

  // 3. Clean up input: remove leading path, "tool-", and trailing ".html"
  const normalized = clean
    .replace(/^.*[\\/]/, '')
    .replace(/^tool-/, '')
    .replace(/\.html$/, '');

  for (const [id, slug] of Object.entries(toolSlugs)) {
    if (slug.toLowerCase() === normalized) {
      return getToolById(id);
    }
  }

  // 4. Fuzzy match slugified tool name
  return allTools.find((t) => {
    const s = t.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return s === normalized || s === clean;
  });
}

export function getRelatedTools(tool: Tool, count: number = 4): Tool[] {
  const pool = allTools.filter((t) => t.cat === tool.cat && t.id !== tool.id);
  // deterministic or pseudo-random slice
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

