# Romance Agent Lab

Romance Agent Lab is an experimental web application that explores how **agentic AI systems** can support long-form creative writing. The project focuses on planning, drafting, and continuity management for romance fiction using a structured, multi-step workflow.

This project is intentionally designed as a **systems-first learning project**, emphasizing architecture, constraints, and reliability over raw text generation.

---

## Problem Statement

Most AI writing tools generate text in isolation. They struggle with:

- maintaining continuity across chapters
- respecting narrative constraints
- tracking character growth over time
- enforcing stylistic and ethical rules

As a result, outputs often feel inconsistent or require heavy manual cleanup.

---

## Solution Approach

Romance Agent Lab treats story creation as a **workflow**, not a single prompt.

Instead of asking an AI to “write a novel,” the system breaks the process into stages:

1. Define constraints and canon (Story Bible)
2. Plan narrative structure (Outline)
3. Convert plans into executable units (Scene Cards)
4. Draft chapters from structured inputs
5. Review outputs against continuity and constraint rules

This mirrors how human writers actually work, while allowing AI to assist at each step.

---

## Application Workflow

The application UI directly reflects the agent pipeline:

1. **Story Bible**  
   Stores characters, narrative constraints, and canonical facts.

2. **Outline**  
   Defines book-level beats and high-level structure.

3. **Scene Cards**  
   Breaks outline beats into actionable scenes with POV, goals, and emotional shifts.

4. **Chapter Draft**  
   Generates chapter text from selected scene cards and supports review and editing.

This staged approach is foundational to the project’s agentic design.

---

## Technical Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Version Control:** Git + GitHub

The project is structured to support future expansion into:
- persistent databases
- validation layers
- multi-agent orchestration
- continuity checking and rule enforcement

---

## Project Status

This project is under active development as a guided learning exercise.

### Completed
- Application shell and routing
- Workflow-based page structure
- Global navigation
- Formal constraint specification
- Version-controlled milestones

### Planned
- Story Bible persistence
- Outline generation via LLM
- Scene card generation
- Chapter drafting
- Continuity checking agent
- Constraint validation logic

---

## Running Locally

```bash
npm install
npm run dev
