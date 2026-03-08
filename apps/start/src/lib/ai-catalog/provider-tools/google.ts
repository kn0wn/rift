import type { ProviderToolDefinition } from './types'

export const GOOGLE_PROVIDER_TOOLS = [
  {
    id: 'google_search',
    name: 'Google Search',
    description: 'Performs grounded Google web search.',
    advanced: false,
  },
  {
    id: 'code_execution',
    name: 'Code Execution',
    description: 'Runs sandboxed code for numeric and data tasks.',
    advanced: true,
  },
  {
    id: 'url_context',
    name: 'URL Context',
    description: 'Lets the model fetch and reason about URLs in the prompt.',
    advanced: false,
  },
  {
    id: 'google_maps',
    name: 'Google Maps',
    description: 'Adds Google Maps grounding for places and local context.',
    advanced: true,
  },
] as const satisfies readonly ProviderToolDefinition[]

export type GoogleProviderToolId = (typeof GOOGLE_PROVIDER_TOOLS)[number]['id']
