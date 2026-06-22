import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { AgentService } from '../services/agent.service';

async function runTests() {
  const mockTask = {
    title: "Finish Vibe2Ship Hackathon",
    deadline: new Date(Date.now() + 3600000).toISOString(),
    progress: 10,
    delay_count: 2
  };

  console.log("1. Testing Decomposition...");
  const steps = await AgentService.decomposeTask(mockTask);
  console.log(steps);

  console.log("\n2. Testing Consequence...");
  const sim = await AgentService.simulateConsequence(mockTask);
  console.log(sim);

  console.log("\n3. Testing Rescue Protocol...");
  const rescue = await AgentService.generateRescueProtocol(mockTask, "Hackathon Judge");
  console.log(rescue);
}

runTests();
