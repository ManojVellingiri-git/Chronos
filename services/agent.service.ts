import { ai, MODELS } from '../lib/gemini/client';
import { Prompts, buildContext } from '../lib/gemini/prompts';
import { 
  TaskDecompositionResponseSchema, 
  ConsequenceResponseSchema, 
  RescueResponseSchema,
  RiskResponseSchema
} from '../schemas/ai.schemas';

const FALLBACKS = {
  decomposition: { subtasks: [{ title: "Start task", estimated_minutes: 15, psychological_barrier: "Getting started" }] },
  consequence: { day_1: "Anxiety builds.", day_3: "Workload doubles.", day_7: "Deadline missed. Trust damaged." },
  rescue: { subject: "Extension Request", body: "I am writing to request a brief 48-hour extension due to unexpected technical scope.", recovery_action: "Send email and rest." }
};

export class AgentService {
  static async decomposeTask(task: any, userProfile: string = "Professional") {
    try {
      const response = await ai.models.generateContent({
        model: MODELS.FAST,
        contents: `${buildContext(task, userProfile)}\n${Prompts.DECOMPOSITION}`,
        config: { responseMimeType: "application/json" }
      });
      
      const parsed = JSON.parse(response.text || "{}");
      return TaskDecompositionResponseSchema.parse(parsed);
    } catch (error) {
      console.error("Agent Error [Decompose]:", error);
      return FALLBACKS.decomposition;
    }
  }

  static async simulateConsequence(task: any) {
    try {
      const response = await ai.models.generateContent({
        model: MODELS.FAST,
        contents: `${buildContext(task, "Avoidant")}\n${Prompts.CONSEQUENCE}`,
        config: { responseMimeType: "application/json" }
      });
      
      const parsed = JSON.parse(response.text || "{}");
      return ConsequenceResponseSchema.parse(parsed);
    } catch (error) {
      console.error("Agent Error [Consequence]:", error);
      return FALLBACKS.consequence;
    }
  }

  static async generateRescueProtocol(task: any, stakeholder: string) {
    try {
      const response = await ai.models.generateContent({
        model: MODELS.REASONING,
        contents: `${buildContext(task, "Overwhelmed")}\nStakeholder: ${stakeholder}\n${Prompts.RESCUE}`,
        config: { responseMimeType: "application/json" }
      });
      
      const parsed = JSON.parse(response.text || "{}");
      return RescueResponseSchema.parse(parsed);
    } catch (error) {
      console.error("Agent Error [Rescue]:", error);
      return FALLBACKS.rescue;
    }
  }

  static analyzeDeterministicRisk(task: any): number {
    const baseRisk = (100 - task.progress);
    const delayPenalty = task.delay_count * 15;
    let finalRisk = baseRisk + delayPenalty;
    return Math.min(Math.max(finalRisk, 0), 100);
  }
}
