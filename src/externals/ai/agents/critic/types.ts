import { z } from "zod";

export const Feedback = z.object({
  aligned_score: z.number().min(0).max(1), // 0–1 cobertura global
  issues: z
    .array(
      z.enum([
        "missing_genre_style",
        "missing_tone",
        "insufficient_constraints",
        "overfiltering",
        "invalid_must_should",
        "must_without_values",
        "noncanonical_terms",
        "contradiction",
        "missing_rate",
        "missing_viewing_time",
        "weak_query_terms",
        "safety_flag",
      ]),
    )
    .default([]),
  suggestions: z.array(z.string()).default([]),
  promote_must: z
    .array(
      z.enum([
        "genres",
        "themes",
        "emotional_tone",
        "narrative_style",
        "sentiment",
        "viewing_time",
        "rate",
      ]),
    )
    .default([]),
  demote_should: z
    .array(
      z.enum([
        "genres",
        "themes",
        "emotional_tone",
        "narrative_style",
        "sentiment",
        "viewing_time",
        "rate",
      ]),
    )
    .default([]),
  trim: z
    .object({
      genres: z.number().optional(),
      emotional_tone: z.number().optional(),
      narrative_style: z.number().optional(),
      themes: z.number().optional(),
    })
    .default({}),
  canonical_rewrites: z.record(z.string(), z.string()).default({}),
  patch: z
    .array(
      z.object({
        op: z.enum(["add", "remove", "replace"]),
        path: z.string(),
        value: z.any().optional(),
      }),
    )
    .default([]), // JSON Patch
});
