import { NextResponse, NextRequest } from 'next/server';
import { AgentService } from '../../../../../services/agent.service';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const task = {
    id: resolvedParams.id,
    title: "Submit Vibe2Ship Project",
    deadline: new Date(Date.now() + 3600000).toISOString(),
    progress: 10,
    delay_count: 3
  };

  const decomposition = await AgentService.decomposeTask(task);
  return NextResponse.json(decomposition);
}
