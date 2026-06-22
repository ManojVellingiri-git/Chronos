# Chronos: AI Failure Prevention System

**Existing apps remind you. Chronos predicts failure.**

![Chronos Banner](https://via.placeholder.com/1200x400/050505/ffffff?text=Execution,+Not+Organization.)

## The Problem
Students, professionals, and entrepreneurs don't miss deadlines because they forgot about them. They miss deadlines because they realize too late that they're falling behind. Existing productivity tools are merely passive spreadsheets—they remind you of what you *should* be doing, but offer no help when you're paralyzed by the task.

## The Solution
**Chronos is an AI Failure Prevention System.** It moves beyond passive task management by predicting when a deadline is likely to be missed and actively intervening with recovery plans.

It acts as an active execution partner, planner, and rescue assistant.

> *"Chronos has prevented an estimated 54 hours of deadline-related stress."*

---

## Key Features

1. **Risk Prediction**  
   Dynamically calculates the probability of missing a deadline based on task progress and delay patterns, triggering a "Mission Critical Alert" when risk exceeds 80%.

2. **Consequence Simulator**  
   Cures task paralysis by generating a visceral, timeline-based simulation of what happens if you delay the task by 1 day, 3 days, and 7 days. 

3. **Rescue Protocol**  
   When a deadline is imminent and progress is zero, Chronos automatically drafts a professional extension request to buy you 48 hours and provides an immediate recovery action.

4. **Task Decomposition**  
   Takes ambiguous, overwhelming tasks (e.g. "Prepare for YC Interview") and instantly breaks them into 3-5 highly specific, actionable micro-steps that take less than 15 minutes each.

---

## Tech Stack
* **Frontend:** Next.js 15 (App Router), React, TailwindCSS, Framer Motion
* **AI Layer:** Google Gemini (1.5 Flash for speed, 1.5 Pro for drafting)
* **Backend:** Supabase, PostgreSQL, Next.js Server Actions
* **Validation:** Zod schemas enforcing strict AI structured outputs

---

## System Architecture

```text
User
 ↓
Chronos Dashboard (Next.js)
 ↓
AI Orchestrator (Server Actions)
 ↓
Gemini 1.5 Flash/Pro 
 ↓
Risk Engine (Supabase + Math Algorithms)
 ↓
Intervention System (Consequence & Rescue UI)
```

---

## FAQ (Judge Q&A)

**Q: Why is this different from Todoist or Notion?**  
**A:** Todoist reminds users about deadlines. Chronos predicts when a deadline is likely to be missed and actively intervenes with psychological simulation and recovery plans. It does the work *with* you.

**Q: Why use AI?**  
**A:** The AI is not used for a generic chatbot. It is heavily constrained using Zod schemas to output structured JSON for task decomposition, consequence simulation, risk analysis, and intervention generation.

**Q: What is the unique value proposition?**  
**A:** The Consequence Simulator and Rescue Protocol transform productivity from passive reminders into active failure prevention.

---

## Future Scope
* Longitudinal behavioral profiling to customize AI aggression based on user energy levels.
* Morning AI audio briefings.
* Hard-locking distracting websites while Rescue Protocols are engaged.
