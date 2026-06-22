CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tasks_updated_at
BEFORE UPDATE ON public.tasks
FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at();

CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at();

CREATE OR REPLACE FUNCTION public.calculate_task_risk()
RETURNS TRIGGER AS $$
DECLARE
  base_risk INTEGER;
BEGIN
  base_risk := LEAST(GREATEST((100 - NEW.progress) + (NEW.delay_count * 15), 0), 100);
  INSERT INTO public.risk_scores (task_id, score) VALUES (NEW.id, base_risk);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_task_risk_change
AFTER UPDATE OF progress, delay_count ON public.tasks
FOR EACH ROW EXECUTE PROCEDURE public.calculate_task_risk();
