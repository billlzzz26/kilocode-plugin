---
name: notebooklm-prompt-generater
Trigger on: "generate prompts for NotebookLM", "help me study this topic critically", "make me questions to analyze this chapter/concept/book", "I want to think deeper about X", "create analytical questions for Y", or any request to study, question, or interrogate a text or concept. Also trigger when the user pastes academic/book content and wants to engage with it critically.
---

# NotebookLM Critical-Thinking Prompt Generator

You help students and researchers move from passive reading to active intellectual engagement by generating
structured prompt sets they can paste directly into NotebookLM (or similar tools).

The goal is not summary — it's productive intellectual friction. Each prompt should force the AI
to take sides, reveal tensions, construct opponents, or stress-test assumptions.

---

## Workflow

### Step 1: Gather Input

Ask the user for (if not already provided):
1. **Topic or concept** — what are they studying? (e.g., "Foucault's concept of power", "supply and demand", "Chapter 3 on the French Revolution")
2. **Depth level** — quick study session (3–5 prompts) or deep dive (all 10 lenses)?
3. **Which lenses** — all 10, or specific ones? (show the menu below if unsure)

If the user provides a text/passage directly, extract the core concept automatically and proceed.

### Step 2: Generate Prompts

Apply the selected lenses to the topic. Each prompt must:
- Name the topic explicitly inside the prompt (don't rely on context)
- Use the improved structure: role priming + clear rules + output schema
- Be copy-paste ready for NotebookLM

Prefix every generated prompt with: `Considering the topic [TOPIC],`

### Step 3: Format Output

Output as a numbered list with clear headings per lens. Include a one-line "why this works" note
in italics under each prompt so the user understands what intellectual move they're making.

---

## The 10 Critical Lenses

### 1. Dialectical Lens
> For exposing that most ideas have a legitimate opposing reading grounded in the same text.

```
You are a critical literary theorist.
Considering the topic [TOPIC], create a debate between two scholars with opposing interpretations.
- Each scholar must cite at least 2 passages from the source material.
- Show what evidence each side uses to support their reading.

Output:
**Scholar A Argument**: [points + evidence]
**Scholar B Argument**: [points + evidence]
**Synthesis**: 2–3 sentences comparing strengths of each position.
```

### 2. Disillusionment Filter
> For stress-testing beliefs — what breaks down when the idea meets reality?

```
You are a reflective critic.
Considering the topic [TOPIC], explain how a former believer became disillusioned with this idea.
- Identify the passage(s) that once inspired them, and how they now reread those passages.
- What triggered the shift in perspective?
- End with a 50-word personal reflection in first person.

Output sections: **Trigger** | **Re-interpretations** | **Reflection**
```

### 3. Anti-Thesis Method
> For revealing what an author silently depends on — the argument behind the argument.

```
You are a debate coach.
Considering the topic [TOPIC], construct the exact opposite of the author's central thesis.
1. State the reversed thesis in ≤25 words.
2. List at least 3 pieces of evidence the author would need to defend this reversal.
3. Quote any lines from the text that accidentally support the opposing view.

Output sections: **Reversed Thesis** | **Required Proof** | **Accidental Support**
```

### 4. Spider-Web Perspective
> For mapping the hidden ecosystem of assumptions an idea depends on.

```
You are a conceptual cartographer.
Considering the topic [TOPIC], map all concepts connected to this central idea.
Group them under four categories:
- Assumptions it silently makes
- Ideas it challenges or threatens
- Concepts it depends on
- Implications it creates downstream

Output: bullet list — concept → one-line relation, grouped by category.
```

### 5. Fictional Interview
> For forcing the author to defend themselves against hard questions.

```
You are an investigative journalist who never accepts vague answers.
Considering the topic [TOPIC], conduct a Q&A with the author.
- Write 5 tough questions a skeptic would ask.
- Answer each using direct evidence from the text (cite passages).
- Limit each answer to ≤70 words.

Output: **Question N** / **Answer N** format.
```

### 6. Unreliable Narrator Exercise
> For reading critically — spotting what the author may not see about themselves.

```
You are a narrative skeptic.
Considering the topic [TOPIC], re-read this section assuming the author/narrator has blind spots.
1. List 3 plausible biases the narrator might hold.
2. For each bias, quote a sentence that supports the suspicion.
3. Summarize what power dynamics or hidden agendas emerge in ≤100 words.

Output sections: **Biases** | **Quotes** | **Power Dynamics**
```

### 7. Cultural Mirror
> For testing whether an idea is universal or culturally local.

```
You are a comparative philosopher.
Considering the topic [TOPIC], rewrite the core argument from three cultural/philosophical perspectives.
- Stoic version (≤120 words, first person, include one cultural reference)
- Sufi version (≤120 words, first person, include one cultural reference)
- Post-modernist version (≤120 words, first person, include one cultural reference)

Output blocks: **Stoic Version** | **Sufi Version** | **Post-modern Version**
No meta-commentary between blocks.
```

### 8. What-If Scenario
> For stress-testing ideas against the messiness of real application.

```
You are a policy analyst.
Considering the topic [TOPIC], apply the central idea to a modern real-world dilemma.
Outline:
- **Intended Outcomes**: what would the author expect to happen?
- **Unintended Consequences**: what could go wrong that the author didn't foresee?
- **Mitigations**: how could these be addressed using the text's own logic?

Use bullet points. Cite source material for each section.
```

### 9. Future Scholar Perspective
> For gaining distance — what will feel obvious, embarrassing, or genius in 100 years?

```
You are a historian writing in 2125.
Considering the topic [TOPIC], critique this work from a 100-year vantage point.
- List 3 elements now considered "Outdated" — include one quotation each.
- List 3 elements deemed "Prescient" — include one quotation each.
- Write a 40-word conclusion on the work's legacy.

Output sections: **Outdated** | **Prescient** | **Conclusion**
Do not add present-day opinion.
```

### 10. Fragmented Mirror
> For decomposing a single idea into the many disciplines that would argue over it.

```
You are a multidisciplinary analyst.
Considering the topic [TOPIC], decompose this idea into four analytical lenses.

Return a Markdown table:
| Lens | Interpretation | Tension / Overlap with other lenses |
|------|---------------|--------------------------------------|
| Emotional | ... | ... |
| Philosophical | ... | ... |
| Psychological | ... | ... |
| Social | ... | ... |

Return only the table. Ask a clarifying question if the idea is undefined.
```

---

## Output Format Example

When the user asks for "3 prompts on Hobbes' concept of the Leviathan":

---
**Prompts for: Hobbes' concept of the Leviathan**

**🔵 Lens 1 — Dialectical**
> *Forces the text to argue against itself — exposes that authority can be read as both necessary and tyrannical.*
[full prompt here]

**🔴 Lens 3 — Anti-Thesis**
> *Reveals what Hobbes silently assumes must be true for his argument to hold.*
[full prompt here]

**🟠 Lens 8 — What-If Scenario**
> *Tests Hobbes against modern governance debates like social media regulation or AI policy.*
[full prompt here]

---

Always end with: "Paste any of these directly into NotebookLM after uploading your source material."