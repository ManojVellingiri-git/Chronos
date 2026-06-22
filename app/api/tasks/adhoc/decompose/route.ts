import { NextResponse, NextRequest } from 'next/server';
import { AgentService } from '../../../../../services/agent.service';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  let body: any = {};
  try { body = await req.json(); } catch(e) {}
  
  const task = {
    id: 'adhoc-task',
    title: body.title || "Unknown Task",
    deadline: new Date(Date.now() + 3600000).toISOString(),
    progress: 0,
    delay_count: 0
  };

  const decomposition = await AgentService.decomposeTask(task);
  return NextResponse.json(decomposition);
}
