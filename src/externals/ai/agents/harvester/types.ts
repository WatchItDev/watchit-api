import { z } from 'zod';
import {
  EmotionalToneSchema,
  GenresSchema,
  NarrativeStyleSchema,
  SentimentSchema,
  ThemesSchema,
} from './taxonomy';

export const VideoSchema = z.object({
  title: z.string().describe('The Title of the video'),
  runtime: z.number().int().nonnegative().describe('The Runtime of the video in seconds.'),
  year: z.number().int().nonnegative().default(0).describe('The Year the video was released'),
  credits: z.array(z.string()).describe('The Credits of the video'),
  synopsis: z.string().describe('The Synopsis of the video'),
  language: z.string().default('en').describe("Primary Language ISO 639-1, default 'en'"),
});

export const TagSchema = z.object({
  genres: z
    .array(GenresSchema)
    .min(3)
    .max(5)
    .describe(
      "Primary genres that best categorize the video (e.g., 'drama', 'science-fiction', 'documentary', 'romance', 'comedy').",
    ),
  themes: z
    .array(ThemesSchema)
    .min(2)
    .max(5)
    .describe(
      "Core philosophical/emotional/social ideas (e.g., 'identity', 'betrayal', 'freedom', 'technology').",
    ),
  emotional_tone: z
    .array(EmotionalToneSchema)
    .min(5)
    .max(10)
    .describe(
      "Specific moods throughout the video (e.g., 'melancholic', 'tense', 'joyful', 'unsettling').",
    ),
  narrative_style: z
    .array(NarrativeStyleSchema)
    .min(3)
    .max(5)
    .describe(
      "Storytelling techniques or structures (e.g., 'nonlinear', 'anthology', 'experimental', 'voiceover', 'documentary').",
    ),
  sentiment: z
    .array(SentimentSchema)
    .min(1)
    .max(5)
    .describe(
      "Overall emotional impact for mood-based retrieval (e.g., 'tragic', 'cathartic', 'hopeful').",
    ),
  rate: z
    .enum(['g', 'pg', 'pg-13', 'r', 'nc-17', 'tv-y', 'tv-y7', 'tv-g', 'tv-pg', 'tv-14', 'tv-ma'])
    .describe("MPA/TV content rating (e.g., 'pg-13', 'r', 'tv-ma', 'unrated')."),
  viewing_time: z
    .enum(['short', 'medium', 'long'])
    .describe("Duration category: 'short' (<600s), 'medium' (600-2400s), 'long' (>2400s)."),
});

export const Schema = VideoSchema.extend(TagSchema.shape);
