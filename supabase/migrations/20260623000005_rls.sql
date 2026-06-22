ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subtasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.risk_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interventions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_actions ENABLE ROW LEVEL SECURITY;

-- Users
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Tasks
CREATE POLICY "Users can view own active tasks" ON public.tasks FOR SELECT USING (auth.uid() = user_id AND deleted_at IS NULL);
CREATE POLICY "Users can create own tasks" ON public.tasks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own tasks" ON public.tasks FOR UPDATE USING (auth.uid() = user_id);

-- Subtasks
CREATE POLICY "Users can view subtasks of own tasks" ON public.subtasks FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.tasks WHERE tasks.id = task_id AND tasks.user_id = auth.uid())
);
CREATE POLICY "Users can create subtasks of own tasks" ON public.subtasks FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.tasks WHERE tasks.id = task_id AND tasks.user_id = auth.uid())
);
CREATE POLICY "Users can update subtasks of own tasks" ON public.subtasks FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.tasks WHERE tasks.id = task_id AND tasks.user_id = auth.uid())
);

-- AI Tables
CREATE POLICY "Users view risk scores of own tasks" ON public.risk_scores FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.tasks WHERE tasks.id = task_id AND tasks.user_id = auth.uid())
);
CREATE POLICY "Users view interventions of own tasks" ON public.interventions FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.tasks WHERE tasks.id = task_id AND tasks.user_id = auth.uid())
);
CREATE POLICY "Users update interventions" ON public.interventions FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.tasks WHERE tasks.id = task_id AND tasks.user_id = auth.uid())
);
CREATE POLICY "Users view agent actions" ON public.agent_actions FOR SELECT USING (auth.uid() = user_id);
