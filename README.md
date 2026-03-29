<<<<<<< HEAD
# Kilo Code Toolkit

## ภาพรวม

Repo นี้เป็น **Kilo Code Toolkit** สำหรับแชร์ skills, custom modes, rules, subagents, workflows แบบกลาง สามารถดึงใช้ด้วย `npx kilo-toolkit`

## โครงสร้าง

```
kilo-toolkit/
├── package.json          # npx entry point
├── bin/create-kilo-setup.mjs  # สคริปต์ติดตั้ง template
├── template/             # ไฟล์ที่จะ copy ไปโปรเจ็กต์ปลายทาง
│   ├── .kilocode/        # Skills, rules, subagents, workflows
│   ├── .kilocodemodes    # Custom modes (JSON format)
│   └── README.md
└── .github/workflows/release.yml
```

## ไฟล์สำคัญ

- **`.kilocodemodes`** - Custom modes สำหรับ Kilo Code (JSON format)
- **`.kilocode/skills/`** - Skills แต่ละตัวมี SKILL.md เป็นไฟล์หลัก
- **`.kilocode/rules-*/`** - Custom rules สำหรับแต่ละ mode
- **`.kilocode/subagents/`** - Subagent configs (YAML/JSON)
- **`.kilocode/workflows/`** - Workflow definitions

## Custom Modes ปัจจุบัน (8 โหมด)

| Slug | Name | Description |
|------|------|-------------|
| `code-reviewer` | 🔍 Code Reviewer | Senior engineer mode for thorough code reviews |
| `docs-specialist` | 📝 Documentation Specialist | Technical writing mode for clear docs |
| `frontend-specialist` | 🎨 Frontend Specialist | Frontend expert (React, TypeScript, Tailwind) |
| `test-engineer` | 🧪 Test Engineer | QA-focused mode for automated tests |
| `education` | 📚 Education | Educational commenting for learning |
| `kilo-settings-assistant` | ⚙️ Kilo Settings Assistant | Kilo Code configuration helper |
| `orchestrator` | 🎯 Orchestrator | ประสานงาน task + Prompt Architect subagent |
| `session-learner` | 🧠 Session Learner | Session history analysis |

## Subagents

| Name | Description |
|------|-------------|
| `prompt-architect` | AI Agent สำหรับ Prompt Engineering (สร้าง/ปรับปรุง/วิเคราะห์ Prompt) |

## Workflows

| Name | Description |
|------|-------------|
| `frontend-workflow.md` | Frontend development workflow (init project, add shadcn, create component, responsive) |

## Skills

| Name | Description |
|------|-------------|
| `frontend-specialist` | Frontend development skill |
| `notebooklm-prompt-gen` | NotebookLM prompt generator |
| `skill-share` | Share skills to Slack |

---

# 📝 โน๊ตข้อผิดพลาดและ待处理事项

## ข้อผิดพลาดที่พบ

### 1. YAML Error ใน `.kilocode/agents/topic-tagger.yaml`
```
- YAML Error: 18 | 1. อ่านไฟล์ Markdown + keywords จากผู้ใช้ : Implicit keys need to be on a single line
- YAML Error: 18 | 1. อ่านไฟล์ Markdown + keywords จากผู้ใช้ : Implicit map keys need to be followed by map values
- YAML Error: 25 | Custom Hooks : Implicit keys need to be on a single line
- YAML Error: 27 | หลัง (keywords: hooks, react): : Nested mappings are not allowed in compact mappings
- YAML Error: 28 | Custom Hooks #{hooks} #{react} : Implicit map keys need to be followed by map values
- YAML Error: 29 | const useUser = () => { ... } : Implicit keys need to be on a single line
```
**สถานะ**: ยังไม่ได้แก้ไข

### 2. README.md ว่างเปล่า
- ไม่มีเอกสารอธิบายโปรเจค
- ต้องสร้างใหม่

---

## 待处理事项 (TODO)

### 🔴 High Priority

1. **แก้ไข YAML Error ใน `topic-tagger.yaml`**
   - ปัญหา: Thai characters ใน YAML keys ทำให้เกิด parse error
   - วิธีแก้: ใช้ English keys หรือ quote Thai characters

2. **ทดสอบ Custom Modes 3 ตัว (ใหม่)**
   - `orchestrator` mode - ต้องทดสอบว่าทำงานได้จริงใน Kilo Code
   - `prompt-architect` subagent - ต้องทดสอบ delegation
   - `frontend-workflow.md` - ต้องทดสอบการเรียกใช้

### 🟡 Medium Priority

3. **สร้างเอกสาร README.md เพิ่มเติม**
   - อธิบายวิธีใช้แต่ละ mode
   - อธิบายวิธีเพิ่ม skill/workflow/subagent ใหม่

4. **ตรวจสอบ prompt-architect.yaml subagent**
   - ต้องใช้ได้จริงเมื่อ orchestrator delegate

### 🟢 Low Priority

5. **อัปเดต AGENTS.md**
   - เพิ่มข้อมูลเกี่ยวกับ orchestrator mode และ prompt-architect

---

## สิ่งที่ทำเสร็จแล้ว (2026-03-25)

- ✅ เพิ่ม orchestrator mode ใน `.kilocodemodes`
- ✅ สร้าง prompt-architect subagent
- ✅ เพิ่ม Prompt Architect v2.5.0 logic ครบ 11 โมดูลใน customInstructions
- ✅ สร้าง frontend-workflow.md
- ✅ สร้าง frontend-specialist skill
- ✅ ลบ ## ### ออกจาก customInstructions (ใช้ plain text)
- ✅ เอาภาษาจีนออกจาก customInstructions

---

## วิธีทดสอบ Custom Modes ใหม่

```bash
# 1. เปิด Kilo Code ใน VSCode
# 2. Switch ไปใช้ orchestrator mode
/mode orchestrator

# 3. ทดสอบ /创建 (สร้าง Prompt ใหม่)
/创建

# 4. ทดสอบ /优化 (ปรับปรุง Prompt)
/优化

# 5. ทดสอบ /分析 (วิเคราะห์ Prompt)
/分析
```

---

## การติดต่อ

=======
# Kilo Code Toolkit

## ภาพรวม

Repo นี้เป็น **Kilo Code Toolkit** สำหรับแชร์ skills, custom modes, rules, subagents, workflows แบบกลาง สามารถดึงใช้ด้วย `npx kilo-toolkit`

## โครงสร้าง

```
kilo-toolkit/
├── package.json          # npx entry point
├── bin/create-kilo-setup.mjs  # สคริปต์ติดตั้ง template
├── template/             # ไฟล์ที่จะ copy ไปโปรเจ็กต์ปลายทาง
│   ├── .kilocode/        # Skills, rules, subagents, workflows
│   ├── .kilocodemodes    # Custom modes (JSON format)
│   └── README.md
└── .github/workflows/release.yml
```

## ไฟล์สำคัญ

- **`.kilocodemodes`** - Custom modes สำหรับ Kilo Code (JSON format)
- **`.kilocode/skills/`** - Skills แต่ละตัวมี SKILL.md เป็นไฟล์หลัก
- **`.kilocode/rules-*/`** - Custom rules สำหรับแต่ละ mode
- **`.kilocode/subagents/`** - Subagent configs (YAML/JSON)
- **`.kilocode/workflows/`** - Workflow definitions

## Custom Modes ปัจจุบัน (8 โหมด)

| Slug | Name | Description |
|------|------|-------------|
| `code-reviewer` | 🔍 Code Reviewer | Senior engineer mode for thorough code reviews |
| `docs-specialist` | 📝 Documentation Specialist | Technical writing mode for clear docs |
| `frontend-specialist` | 🎨 Frontend Specialist | Frontend expert (React, TypeScript, Tailwind) |
| `test-engineer` | 🧪 Test Engineer | QA-focused mode for automated tests |
| `education` | 📚 Education | Educational commenting for learning |
| `kilo-settings-assistant` | ⚙️ Kilo Settings Assistant | Kilo Code configuration helper |
| `orchestrator` | 🎯 Orchestrator | ประสานงาน task + Prompt Architect subagent |
| `session-learner` | 🧠 Session Learner | Session history analysis |

## Subagents

| Name | Description |
|------|-------------|
| `prompt-architect` | AI Agent สำหรับ Prompt Engineering (สร้าง/ปรับปรุง/วิเคราะห์ Prompt) |

## Workflows

| Name | Description |
|------|-------------|
| `frontend-workflow.md` | Frontend development workflow (init project, add shadcn, create component, responsive) |

## Skills

| Name | Description |
|------|-------------|
| `frontend-specialist` | Frontend development skill |
| `notebooklm-prompt-gen` | NotebookLM prompt generator |
| `skill-share` | Share skills to Slack |

---

# 📝 โน๊ตข้อผิดพลาดและ待处理事项

## ข้อผิดพลาดที่พบ

### 1. YAML Error ใน `.kilocode/agents/topic-tagger.yaml`
```
- YAML Error: 18 | 1. อ่านไฟล์ Markdown + keywords จากผู้ใช้ : Implicit keys need to be on a single line
- YAML Error: 18 | 1. อ่านไฟล์ Markdown + keywords จากผู้ใช้ : Implicit map keys need to be followed by map values
- YAML Error: 25 | Custom Hooks : Implicit keys need to be on a single line
- YAML Error: 27 | หลัง (keywords: hooks, react): : Nested mappings are not allowed in compact mappings
- YAML Error: 28 | Custom Hooks #{hooks} #{react} : Implicit map keys need to be followed by map values
- YAML Error: 29 | const useUser = () => { ... } : Implicit keys need to be on a single line
```
**สถานะ**: ยังไม่ได้แก้ไข

### 2. README.md ว่างเปล่า
- ไม่มีเอกสารอธิบายโปรเจค
- ต้องสร้างใหม่

---

## 待处理事项 (TODO)

### 🔴 High Priority

1. **แก้ไข YAML Error ใน `topic-tagger.yaml`**
   - ปัญหา: Thai characters ใน YAML keys ทำให้เกิด parse error
   - วิธีแก้: ใช้ English keys หรือ quote Thai characters

2. **ทดสอบ Custom Modes 3 ตัว (ใหม่)**
   - `orchestrator` mode - ต้องทดสอบว่าทำงานได้จริงใน Kilo Code
   - `prompt-architect` subagent - ต้องทดสอบ delegation
   - `frontend-workflow.md` - ต้องทดสอบการเรียกใช้

### 🟡 Medium Priority

3. **สร้างเอกสาร README.md เพิ่มเติม**
   - อธิบายวิธีใช้แต่ละ mode
   - อธิบายวิธีเพิ่ม skill/workflow/subagent ใหม่

4. **ตรวจสอบ prompt-architect.yaml subagent**
   - ต้องใช้ได้จริงเมื่อ orchestrator delegate

### 🟢 Low Priority

5. **อัปเดต AGENTS.md**
   - เพิ่มข้อมูลเกี่ยวกับ orchestrator mode และ prompt-architect

---

## สิ่งที่ทำเสร็จแล้ว (2026-03-25)

- ✅ เพิ่ม orchestrator mode ใน `.kilocodemodes`
- ✅ สร้าง prompt-architect subagent
- ✅ เพิ่ม Prompt Architect v2.5.0 logic ครบ 11 โมดูลใน customInstructions
- ✅ สร้าง frontend-workflow.md
- ✅ สร้าง frontend-specialist skill
- ✅ ลบ ## ### ออกจาก customInstructions (ใช้ plain text)
- ✅ เอาภาษาจีนออกจาก customInstructions

---

## วิธีทดสอบ Custom Modes ใหม่

```bash
# 1. เปิด Kilo Code ใน VSCode
# 2. Switch ไปใช้ orchestrator mode
/mode orchestrator

# 3. ทดสอบ /创建 (สร้าง Prompt ใหม่)
/创建

# 4. ทดสอบ /优化 (ปรับปรุง Prompt)
/优化

# 5. ทดสอบ /分析 (วิเคราะห์ Prompt)
/分析
```

---

## การติดต่อ

>>>>>>> 944660aa3058ddbdd9a499f44d8a781ee08ed663
หากพบปัญหาหรือมีคำถาม กรุณาสร้าง Issue ใน repo นี้