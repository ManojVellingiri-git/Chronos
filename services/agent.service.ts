import { Prompts, buildContext } from '../lib/gemini/prompts';
import { 
  TaskDecompositionResponseSchema, 
  ConsequenceResponseSchema, 
  RescueResponseSchema
} from '../schemas/ai.schemas';

const FALLBACKS = {
  decomposition: { subtasks: [{ title: "Start task", estimated_minutes: 15, psychological_barrier: "Getting started" }] },
  consequence: { day_1: "Anxiety builds.", day_3: "Workload doubles.", day_7: "Deadline missed. Trust damaged." },
  rescue: { subject: "Extension Request", body: "I am writing to request a brief 48-hour extension due to unexpected technical scope.", recovery_action: "Send email and rest." }
};

async function callOpenRouter(prompt: string) {
  const models = [
    "google/gemma-4-26b-a4b-it:free",
    "google/gemma-2-9b-it:free",
    "meta-llama/llama-3.3-70b-instruct:free",
    "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
    "deepseek/deepseek-r1:free",
    "qwen/qwen-2.5-coder-32b-instruct"
  ];
  
  for (const model of models) {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: "system", content: "You are an AI failure prevention assistant. Always return ONLY raw JSON matching this exact schema: { \"subtasks\": [ { \"title\": \"string\", \"estimated_minutes\": 15, \"psychological_barrier\": \"string\" } ] }. No markdown wrapping. Do not include any other text. " },
            { role: "user", content: prompt }
          ]
        })
      });

      if (response.ok) {
        const data = await response.json();
        let content = data.choices[0].message.content;
        
        // Extract JSON using regex if it's wrapped in text
        const jsonMatch = content.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
        if (jsonMatch) {
          content = jsonMatch[0];
        } else {
          content = content.replace(/```json/g, '').replace(/```/g, '').trim();
        }
        
        let parsed = JSON.parse(content || "{}");
        if (Array.isArray(parsed)) {
          parsed = { subtasks: parsed };
        } else if (parsed && !parsed.subtasks && parsed.tasks) {
          parsed.subtasks = parsed.tasks;
        } else if (parsed && !parsed.subtasks) {
          parsed = { subtasks: [{ title: "Extracted subtask", estimated_minutes: 10, psychological_barrier: "None" }] };
        }
        if (parsed.subtasks && Array.isArray(parsed.subtasks)) {
          parsed.subtasks = parsed.subtasks.map((st: any) => ({
            title: st.title || st.name || "Task Step",
            estimated_minutes: typeof st.estimated_minutes === 'number' ? st.estimated_minutes : (parseInt(st.estimated_minutes) || 15),
            psychological_barrier: st.psychological_barrier || st.barrier || "None"
          }));
        }
        return parsed;
      }
    } catch (e) {
      continue;
    }
  }
  throw new Error("All OpenRouter free models failed.");
}

export class AgentService {
  static async decomposeTask(task: any, userProfile: string = "Professional") {
    try {
      const parsed = await callOpenRouter(`${buildContext(task, userProfile)}\n${Prompts.DECOMPOSITION}`);
      return TaskDecompositionResponseSchema.parse(parsed);
    } catch (error) {
      console.error("Agent Error [Decompose]:", error);
      return FALLBACKS.decomposition;
    }
  }

  static async simulateConsequence(task: any) {
    try {
      const parsed = await callOpenRouter(`${buildContext(task, "Avoidant")}\n${Prompts.CONSEQUENCE}`);
      return ConsequenceResponseSchema.parse(parsed);
    } catch (error) {
      console.error("Agent Error [Consequence]:", error);
      return FALLBACKS.consequence;
    }
  }

  static async generateRescueProtocol(task: any, stakeholder: string = "Stakeholder") {
    try {
      const parsed = await callOpenRouter(`${buildContext(task, "Overwhelmed")}\nStakeholder: ${stakeholder}\n${Prompts.RESCUE}`);
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
