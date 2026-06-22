INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token)
VALUES ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'demo@chronos.ai', '', NOW(), NULL, NOW(), '{"provider": "email", "providers": ["email"]}', '{}', NOW(), NOW(), '', '', '', '') ON CONFLICT DO NOTHING;

INSERT INTO public.tasks (id, user_id, title, deadline, status, progress, delay_count) VALUES
('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'File Quarterly Taxes', NOW() - INTERVAL '1 day', 'completed', 100, 1),
('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'Draft YC Interview Script', NOW() + INTERVAL '1 day', 'in_progress', 10, 2),
('33333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000000', 'Submit Final Vibe2Ship Codebase', NOW() + INTERVAL '2 hours', 'pending', 0, 5),
('44444444-4444-4444-4444-444444444444', '00000000-0000-0000-0000-000000000000', 'Grocery run', NOW() + INTERVAL '5 days', 'pending', 0, 0);

INSERT INTO public.subtasks (task_id, title, estimated_minutes, is_completed) VALUES
('22222222-2222-2222-2222-222222222222', 'Write opening hook', 15, TRUE),
('22222222-2222-2222-2222-222222222222', 'Outline traction numbers', 10, FALSE);

INSERT INTO public.risk_scores (task_id, score, calculated_at) VALUES
('22222222-2222-2222-2222-222222222222', 40, NOW() - INTERVAL '2 days'),
('22222222-2222-2222-2222-222222222222', 72, NOW()),
('33333333-3333-3333-3333-333333333333', 98, NOW());

INSERT INTO public.interventions (task_id, type, generated_content, accepted_by_user) VALUES
('33333333-3333-3333-3333-333333333333', 'consequence', '{"day_1": "Severe panic.", "day_3": "Missed deadline.", "day_7": "Reputation damaged."}', TRUE);

INSERT INTO public.agent_actions (user_id, action_type, metadata) VALUES
('00000000-0000-0000-0000-000000000000', 'RISK_UPDATE', '{"message": "Calculated critical risk of 98 on Vibe2Ship submission."}');
