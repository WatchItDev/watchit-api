import { z } from 'zod';
import { TagSchema } from '../../agents/harvester/types';

export const Query = TagSchema.extend({
  k: z.number().default(5).describe('The number of results expected to have as result from query'),
  must: z.array(z.string()).describe(`
    Qdrant tag KEYS (field identifiers) that are REQUIRED to match in any result.
    - Contains only field names (e.g., "genre", "themes", "sentiment"), never literal values.
    - Example: if the user says "horror movie", genres = ["horror"], but must = ["genre"].
    - Example: if the user says "feel good", sentiment = ["uplifting"], and must = ["sentiment"].
    - Use must for fields that are essential to fulfill the user's intent.
    - Do not duplicate keys between must and should.
  `),
  should: z.array(z.string()).describe(`
    Qdrant tag KEYS (field identifiers) that are DESIRABLE but not strictly required.
    - Contains only field names (e.g., "themes", "narrative_style"), never literal values.
    - Example: if the user mentions "retro vibe" but it's not essential, themes = ["retro"], and should = ["themes"].
    - Use should for fields that enrich the search without being critical.
    - Do not duplicate keys between must and should.
  `),
  query_terms: z.string().describe(`
    A short, natural-language description of the user's intent or main search topic,
    focusing on the core concept or subject of the video being requested.
    This field should capture the essential semantic meaning of the query
    for use in vector similarity search, without explicitly including metadata filters
    like genre, sentiment, or year unless they are crucial to the main theme.
  `),
});
