import { NextResponse, NextRequest } from 'next/server';
import { AgentService } from '../../../../../services/agent.service';

export const maxDuration = 60;

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const body = await req.json().catch(() => ({}));
  const stakeholder = body.stakeholder || "Manager";
  const resolvedParams = await params;

  const task = {
    id: resolvedParams.id,
    title: "Submit Vibe2Ship Project",
    deadline: new Date(Date.now() + 3600000).toISOString(),
    progress: 10,
    delay_count: 3
  };

  const rescuePlan = await AgentService.generateRescueProtocol(task, stakeholder);
  return NextResponse.json(rescuePlan);
}
