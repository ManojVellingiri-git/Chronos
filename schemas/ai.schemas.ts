import { z } from 'zod';

export const SubtaskSchema = z.object({
  title: z.string().describe("An actionable step starting with a verb"),
  estimated_minutes: z.number().describe("Time in minutes, must be <= 15"),
  psychological_barrier: z.string().describe("Why this step usually causes paralysis")
});
export const TaskDecompositionResponseSchema = z.object({
  subtasks: z.array(SubtaskSchema).max(5)
});
export type TaskDecompositionResponse = z.infer<typeof TaskDecompositionResponseSchema>;

export const ConsequenceResponseSchema = z.object({
  day_1: z.string().describe("Immediate emotional impact tomorrow"),
  day_3: z.string().describe("Compounding stress and workload in 3 days"),
  day_7: z.string().describe("Long-term reputation/health damage in 7 days")
});
export type ConsequenceResponse = z.infer<typeof ConsequenceResponseSchema>;

export const RescueResponseSchema = z.object({
  subject: z.string().describe("Professional email subject line"),
  body: z.string().describe("Professional, polite email body requesting an extension"),
  recovery_action: z.string().describe("What the user should do immediately after sending")
});
export type RescueResponse = z.infer<typeof RescueResponseSchema>;

export const RiskResponseSchema = z.object({
  adjusted_score: z.number().min(0).max(100).describe("Final risk score after AI analysis"),
  explanation: z.string().describe("Why the score was adjusted"),
  intervention_required: z.boolean()
});
export type RiskResponse = z.infer<typeof RiskResponseSchema>;
