'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Schema = exports.TagSchema = exports.VideoSchema = void 0;
const zod_1 = require('zod');
const taxonomy_1 = require('./taxonomy');
exports.VideoSchema = zod_1.z.object({
  title: zod_1.z.string().describe('The Title of the video'),
  runtime: zod_1.z
    .number()
    .int()
    .nonnegative()
    .describe('The Runtime of the video in seconds.'),
  year: zod_1.z
    .number()
    .int()
    .nonnegative()
    .default(0)
    .describe('The Year the video was released'),
  credits: zod_1.z.array(zod_1.z.string()).describe('The Credits of the video'),
  synopsis: zod_1.z.string().describe('The Synopsis of the video'),
  language: zod_1.z
    .string()
    .default('en')
    .describe("Primary Language ISO 639-1, default 'en'"),
});
exports.TagSchema = zod_1.z.object({
  genres: zod_1.z
    .array(taxonomy_1.GenresSchema)
    .min(3)
    .max(5)
    .describe(
      "Primary genres that best categorize the video (e.g., 'drama', 'science-fiction', 'documentary', 'romance', 'comedy').",
    ),
  themes: zod_1.z
    .array(taxonomy_1.ThemesSchema)
    .min(2)
    .max(5)
    .describe(
      "Core philosophical/emotional/social ideas (e.g., 'identity', 'betrayal', 'freedom', 'technology').",
    ),
  emotional_tone: zod_1.z
    .array(taxonomy_1.EmotionalToneSchema)
    .min(5)
    .max(10)
    .describe(
      "Specific moods throughout the video (e.g., 'melancholic', 'tense', 'joyful', 'unsettling').",
    ),
  narrative_style: zod_1.z
    .array(taxonomy_1.NarrativeStyleSchema)
    .min(3)
    .max(5)
    .describe(
      "Storytelling techniques or structures (e.g., 'nonlinear', 'anthology', 'experimental', 'voiceover', 'documentary').",
    ),
  sentiment: zod_1.z
    .array(taxonomy_1.SentimentSchema)
    .min(1)
    .max(5)
    .describe(
      "Overall emotional impact for mood-based retrieval (e.g., 'tragic', 'cathartic', 'hopeful').",
    ),
  rate: zod_1.z
    .enum([
      'g',
      'pg',
      'pg-13',
      'r',
      'nc-17',
      'tv-y',
      'tv-y7',
      'tv-g',
      'tv-pg',
      'tv-14',
      'tv-ma',
    ])
    .describe(
      "MPA/TV content rating (e.g., 'pg-13', 'r', 'tv-ma', 'unrated').",
    ),
  viewing_time: zod_1.z
    .enum(['short', 'medium', 'long'])
    .describe(
      "Duration category: 'short' (<600s), 'medium' (600-2400s), 'long' (>2400s).",
    ),
});
exports.Schema = exports.VideoSchema.extend(exports.TagSchema.shape);
//# sourceMappingURL=types.js.map
