# Romance Agent Lab — Data Model (Day 3)

## Purpose
Define the core entities and data structures needed to support the Romance Agent Lab workflow:

Story Bible → Outline → Scene Cards → Chapter Draft → Review

This document is the **single source of truth** for what the system must remember and how that memory is structured.

All canon and artifacts are scoped per Project to allow multiple, unrelated stories.

---

## Data Categories

### Category A: Constraints (Policy Layer)
Definition: Global rules that define correctness for a single Project across all stages of generation and review.

Constraints are long-lived, enforced consistently, and do not change implicitly.

---

### Category B: Canon (Story Bible Facts)
Definition: Facts that are true in the story world for a single Project and must remain consistent unless explicitly updated.

Canon evolves deliberately and is never overwritten automatically by drafts.

---

### Category C: Artifacts (Workflow Outputs)
Definition: Outputs produced by each step of the pipeline. Artifacts are editable, versionable, and auditable, but are not automatically canon.

---

## Entity 1: Project
Represents a single story (one book).

Fields:
- id
- title
- genres (list of strings)
- created_at
- updated_at

Notes:
- Every other entity references project_id.
- Each Project has its own constraints, canon, and artifacts.

---

## Constraints Object (Project-level)
Structured representation of PROJECT_RULES.md.

---

### narrative
- central_pair_locked_from_ch1: true
- endings_allowed: ["happy", "bittersweet"]
- arc_must_resolve: true

---

### pov
- pov_must_be_truthful: true
- pov_must_be_clear_per_scene: true

---

### continuity
- timeline_math_exact: true
- travel_logistics_realistic: true
- promises_must_payoff: true

---

### chapter_targets
- chapter_word_min: 2000
- chapter_word_max: 3000

---

### age_policy
- lead_min_age: 18
- pov_min_age: 18
- romantic_participant_min_age: 18
- minors_allowed_as_non_romantic_side_characters: true
- minors_cannot_be_pov: true
- minors_cannot_participate_in_romance_or_sex: true

---

### allowed_tone_labels
- romance
- romantic drama
- erotic
- YA tone

---

### style_policy
- no_em_dashes: true
- prefer_immersive_narration: true
- allow_risky_voice_phrasing: true
- avoid_polite_tone_when_inappropriate: true

- filter_words_list:
  - felt
  - noticed
  - realized
  - wondered
  - thought
  - seemed
  - heard
  - saw

- banned_or_discouraged_phrases:
  - "her heart raced"
  - "the silence was deafening"
  - "trembled with anticipation"
  - "She recovered fast, too fast"

- discouraged_cliches:
  - "diamond in the rough"
  - "cold as ice"

- minimize_patterns:
  - nominalization
  - filter_words

---

## Entity 2: Character (Canon)
Represents a character in the Story Bible.

Fields:
- id
- project_id
- name
- age
- role (lead, side)
- pov_allowed (boolean)
- romantic_participant_allowed (boolean)
- desire
- fear
- boundary (optional)
- backstory_notes (optional)

Rules:
- If role == lead → age >= 18
- If pov_allowed == true → age >= 18
- If romantic_participant_allowed == true → age >= 18

---

## Entity 3: Location (Canon)
Represents a key location and travel assumptions.

Fields:
- id
- project_id
- name
- description (optional)
- travel_notes (optional)

---

## Entity 4: OutlineBeat (Artifact)
Represents one high-level beat in the book outline.

Fields:
- id
- project_id
- order_index
- beat_name
- summary

---

## Entity 5: SceneCard (Artifact)
Represents one planned scene.

Fields:
- id
- project_id
- order_index
- pov_character_id (FK → Character)
- setting_location_id (optional FK → Location)
- goal
- conflict
- emotional_shift_start
- emotional_shift_end
- hook_type (optional)
- scene_constraints (optional)

---

## Entity 6: Chapter (Artifact)
Represents a drafted chapter.

Fields:
- id
- project_id
- chapter_number
- draft_text
- status (planned, drafted, revised, final)
- word_count
- created_at

Rules:
- word_count should fall within chapter_targets unless explicitly overridden.

---

## Entity 7: Promise (Artifact)
Tracks planted story promises that must pay off.

Fields:
- id
- project_id
- type (secret, object, threat, mystery, obstacle)
- description
- introduced_in_chapter_number
- payoff_in_chapter_number (optional)
- status (open, paid)

Rule:
- All promises must be paid by story end.

---

## Entity 8: ContinuityFlag (Artifact)
Represents a continuity issue found during review.

Fields:
- id
- project_id
- chapter_number
- severity (low, medium, high)
- category (timeline, knowledge, pov, character_logic, consent, style)
- issue
- suggested_fix
- status (open, resolved)

---

## Entity 9: StyleFlag (Artifact)
Represents a writing-style issue found during review.

Fields:
- id
- project_id
- chapter_number (optional)
- scene_id (optional)
- severity (low, medium, high)
- category (cliche, repetitive_phrase, filter_words, nominalization, tone_mismatch, exposition)
- excerpt
- issue
- suggested_fix
- status (open, resolved)

---

## Design Decisions (Day 3)

1) Canon is scoped per Project to support multiple unrelated stories.
2) Constraints are stored as a structured object per Project.
3) Draft versioning will start simple (single draft per chapter) and expand later if needed.
