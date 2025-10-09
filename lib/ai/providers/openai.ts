/* eslint-disable @typescript-eslint/no-explicit-any */

import { openai } from "@ai-sdk/openai";
import {
  BaseModelConfig,
  mergeCapabilities,
  DEFAULT_PROVIDER_SETTINGS,
  ToolType,
} from "../config/base";

// OpenAI-specific settings interface
export interface OpenAISettings {
  temperature?: number;
  maxOutputTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  maxRetries?: number;
  timeout?: number;
  // OpenAI-specific options
  parallelToolCalls?: boolean;
  store?: boolean;
  user?: string;
  reasoningEffort?: "minimal" | "low" | "medium" | "high";
  reasoningSummary?: "auto" | "detailed";
  strictJsonSchema?: boolean;
  serviceTier?: "auto" | "flex" | "priority";
  textVerbosity?: "low" | "medium" | "high";
  maxToolCalls?: number;
  metadata?: Record<string, string>;
  previousResponseId?: string;
  instructions?: string;
  include?: string[];
  promptCacheKey?: string;
  safetyIdentifier?: string;
  structuredOutputs?: boolean;
  maxCompletionTokens?: number;
  prediction?: Record<string, any>;
  logitBias?: Record<number, number>;
  logprobs?: boolean | number;
}

// Default OpenAI settings
export const DEFAULT_OPENAI_SETTINGS: OpenAISettings = {
  ...DEFAULT_PROVIDER_SETTINGS,
  parallelToolCalls: true,
  store: true,
  reasoningEffort: "medium",
  strictJsonSchema: false,
  serviceTier: "auto",
  textVerbosity: "medium",
  structuredOutputs: true,
  maxRetries: 3,
};

// OpenAI model configurations
export const OPENAI_MODELS: BaseModelConfig[] = [
  {
    id: "openai/gpt-5",
    name: "GPT-5",
    provider: "openai",
    description:
      "Next-generation OpenAI model with advanced reasoning and capabilities",
    contextWindow: 200000,
    isPremium: true,
    capabilities: mergeCapabilities({
      supportsTools: true,
      supportsStreaming: true,
      supportsReasoning: true,
      supportsImageInput: true,
      supportsImageOutput: true,
      supportsPDFInput: true,
      supportsObjectGeneration: true,
      maxTokens: 16384,
    }),
  },
  {
    id: "openai/gpt-5-mini",
    name: "GPT-5 Mini",
    provider: "openai",
    description: "Faster and more cost-effective version of GPT-5",
    contextWindow: 128000,
    isPremium: false,
    capabilities: mergeCapabilities({
      supportsTools: true,
      supportsStreaming: true,
      supportsReasoning: true,
      supportsImageInput: true,
      supportsObjectGeneration: true,
      maxTokens: 16384,
    }),
  },
  {
    id: "openai/gpt-5-nano",
    name: "GPT-5 Nano",
    provider: "openai",
    description: "Ultra-fast and efficient version of GPT-5",
    contextWindow: 128000,
    isPremium: false,
    capabilities: mergeCapabilities({
      supportsTools: true,
      supportsReasoning: true,
      supportsImageInput: true,
      supportsStreaming: true,
      supportsObjectGeneration: true,
      maxTokens: 16384,
    }),
  },
  {
    id: "openai/o3",
    name: "o3",
    provider: "openai",
    description:
      "Advanced reasoning model with enhanced problem-solving capabilities",
    contextWindow: 200000,
    isPremium: true,
    capabilities: mergeCapabilities({
      supportsTools: true,
      supportsReasoning: true,
      supportsStreaming: true,
      supportsImageInput: true,
      supportsObjectGeneration: true,
      maxTokens: 16384,
    }),
  },
  {
    id: "openai/o4-mini",
    name: "o4 Mini",
    provider: "openai",
    description:
      "Efficient reasoning model with strong analytical capabilities",
    contextWindow: 128000,
    isPremium: false,
    capabilities: mergeCapabilities({
      supportsTools: true,
      supportsReasoning: true,
      supportsStreaming: true,
      supportsImageInput: true,
      supportsObjectGeneration: true,
      maxTokens: 16384,
    }),
  },
  {
    id: "openai/gpt-4.1",
    name: "GPT-4.1",
    provider: "openai",
    description: "Enhanced version of GPT-4 with improved capabilities",
    contextWindow: 128000,
    isPremium: true,
    capabilities: mergeCapabilities({
      supportsTools: true,
      supportsImageInput: true,
      supportsStreaming: true,
      supportsObjectGeneration: true,
      maxTokens: 8192,
    }),
  },
  {
    id: "openai/gpt-4.1-mini",
    name: "GPT-4.1 Mini",
    provider: "openai",
    description: "Cost-effective version of GPT-4.1",
    contextWindow: 128000,
    isPremium: false,
    capabilities: mergeCapabilities({
      supportsTools: true,
      supportsImageInput: true,
      supportsStreaming: true,
      supportsObjectGeneration: true,
      maxTokens: 8192,
    }),
  },
  {
    id: "openai/gpt-4.1-nano",
    name: "GPT-4.1 Nano",
    provider: "openai",
    description: "Ultra-efficient version of GPT-4.1",
    contextWindow: 128000,
    isPremium: false,
    capabilities: mergeCapabilities({
      supportsTools: true,
      supportsImageInput: true,
      supportsStreaming: true,
      supportsObjectGeneration: true,
      maxTokens: 8192,
    }),
  },
  {
    id: "openai/gpt-4o",
    name: "GPT-4o",
    provider: "openai",
    description: "Multimodal flagship model with vision and advanced reasoning",
    contextWindow: 128000,
    isPremium: true,
    capabilities: mergeCapabilities({
      supportsTools: true,
      supportsImageInput: true,
      supportsStreaming: true,
      supportsObjectGeneration: true,
      maxTokens: 16384,
    }),
  },
  {
    id: "openai/gpt-4o-mini",
    name: "GPT-4o Mini",
    provider: "openai",
    description: "Affordable multimodal model with strong performance",
    contextWindow: 128000,
    isPremium: false,
    capabilities: mergeCapabilities({
      supportsTools: true,
      supportsImageInput: true,
      supportsStreaming: true,
      supportsObjectGeneration: true,
      maxTokens: 16384,
    }),
  },
  {
    id: "openai/gpt-4-turbo",
    name: "GPT-4 Turbo",
    provider: "openai",
    description:
      "High-performance version of GPT-4 with expanded context window",
    contextWindow: 128000,
    isPremium: true,
    capabilities: mergeCapabilities({
      supportsTools: true,
      supportsImageInput: true,
      supportsStreaming: true,
      supportsObjectGeneration: true,
      maxTokens: 4096,
    }),
  },
  {
    id: "openai/gpt-4",
    name: "GPT-4",
    provider: "openai",
    description: "Large multimodal model with broad general knowledge",
    contextWindow: 8192,
    isPremium: true,
    capabilities: mergeCapabilities({
      supportsTools: true,
      supportsStreaming: true,
      supportsObjectGeneration: true,
      maxTokens: 8192,
    }),
  },
  {
    id: "openai/gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    provider: "openai",
    description: "Fast and efficient model for most conversational tasks",
    contextWindow: 16385,
    isPremium: false,
    capabilities: mergeCapabilities({
      supportsTools: true,
      supportsStreaming: true,
      supportsObjectGeneration: true,
      maxTokens: 4096,
    }),
  },
];

// Helper functions
export function getOpenAIModel(modelId: string): BaseModelConfig | undefined {
  return OPENAI_MODELS.find((model) => model.id === modelId);
}
