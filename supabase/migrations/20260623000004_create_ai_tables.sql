CREATE TABLE public.risk_scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  calculated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_risk_scores_task_id ON public.risk_scores(task_id);

CREATE TABLE public.interventions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('consequence', 'rescue', 'defibrillator')),
  generated_content JSONB NOT NULL,
  accepted_by_user BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_interventions_task_id ON public.interventions(task_id);

CREATE TABLE public.agent_actions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_agent_actions_user_id ON public.agent_actions(user_id);
