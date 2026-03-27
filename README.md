# Kilo Code Toolkit

## ภาพรวม

Repo นี้เป็น **Kilo Code Toolkit** สำหรับแชร์ skills, custom modes, rules, subagents, workflows แบบกลาง สามารถดึงใช้ด้วย `npx kilo-toolkit`

## โครงสร้างปัจจุบัน

```
kilo-toolkit/
├── package.json          # จุด entry ของ npx kilo-toolkit
├── README.md             # เอกสารภาพรวม (ไฟล์นี้)
├── AGENTS.md             # คู่มือปฏิบัติงานของเอเจนต์
├── agents/               # Agent templates (YAML/MD) ที่จะส่งต่อให้ผู้ใช้
├── skills/               # แต่ละ skill มี SKILL.md เป็นแกนหลัก
├── subagents/            # ไฟล์ subagent (YAML/JSON)
├── workflows/            # Workflow (.md/.yaml)
├── modes/                # Custom mode ละไฟล์ JSON
├── github/               # GitHub Action และสคริปต์ release
├── packages/             # โค้ดเสริม (เช่น web-template)
├── plugins/              # โครงปลั๊กอิน/สคริปต์เสริม
├── references/           # เอกสารเชิงอ้างอิง
├── template/README.md    # แนวทาง bundle (ไม่มี payload แล้ว)
├── .kilocode/            # พื้นที่ทำงานของเอเจนต์ (อย่าส่งต่อให้ผู้ใช้)
└── .github/workflows/    # CI/CD release
```

> หมายเหตุ: เดิมเคยมี `template/.kilocode/**` และ `.kilocodemodes` แต่ปัจจุบันไฟล์ที่ต้องส่งให้ผู้ใช้ถูกแยกออกมาเป็นโฟลเดอร์ระดับ root (`agents/`, `skills/`, `workflows/`, `modes/` ฯลฯ) ตามความต้องการล่าสุด ส่วน `.kilocode/` ที่เหลืออยู่ใน repo ใช้เป็น sandbox ของเอเจนต์เท่านั้น ไม่ควรถูก copy ไปยังปลายทาง

## โฟลเดอร์สำคัญ

- **`modes/`** – Custom modes ทีละไฟล์ JSON (slug.json)
- **`skills/{skill-name}/SKILL.md`** – เนื้อหา skill หลัก ๆ
- **`agents/*.yaml`** – แม่แบบ agent ที่เผยแพร่
- **`subagents/*.yaml`** – delegate config ที่ orchestrator เรียกใช้
- **`workflows/*.md`** – Workflow พร้อมขั้นตอน
- **`github/`** – สคริปต์ release / composite action
- **`references/`** – เอกสารอ้างอิงสำหรับ contributor
- **`.kilocode/`** – sandbox/evidence ของเอเจนต์ (เก็บไว้เฉพาะใน repo)

## Custom Modes ปัจจุบัน (8 โหมด – เก็บใน `modes/*.json`)

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

## Subagents (`subagents/`)

| Name | Description |
|------|-------------|
| `prompt-architect` | AI Agent สำหรับ Prompt Engineering (สร้าง/ปรับปรุง/วิเคราะห์ Prompt) |

## Workflows (`workflows/`)

| Name | Description |
|------|-------------|
| `frontend-workflow.md` | Frontend development workflow (init project, add shadcn, create component, responsive) |

## Skills (`skills/`)

| Name | Description |
|------|-------------|
| `frontend-specialist` | Frontend development skill |
| `notebooklm-prompt-gen` | NotebookLM prompt generator |
| `skill-share` | Share skills to Slack |

---

# 📝 โน๊ตข้อผิดพลาดและรายการที่ต้องทำ

## ข้อผิดพลาดที่พบ

### 1. YAML Error ใน `agents/topic-tagger.yaml`
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

## รายการที่ต้องทำ (TODO)

### 🔴 High Priority

1. **แก้ไข YAML Error ใน `agents/topic-tagger.yaml`**
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

4. **ตรวจสอบ `subagents/prompt-architect.yaml`**
   - ต้องใช้ได้จริงเมื่อ orchestrator delegate

### 🟢 Low Priority

5. **อัปเดต AGENTS.md**
   - เพิ่มข้อมูลเกี่ยวกับ orchestrator mode และ prompt-architect

---

## สิ่งที่ทำเสร็จแล้ว (2026-03-25)

- ✅ เพิ่ม orchestrator mode ใน `modes/`
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

# 3. ทดสอบ /create (สร้าง Prompt ใหม่)
/create

# 4. ทดสอบ /optimize (ปรับปรุง Prompt)
/optimize

# 5. ทดสอบ /diagnose (วิเคราะห์ Prompt)
/diagnose
```

---

## การติดต่อ

หากพบปัญหาหรือมีคำถาม กรุณาสร้าง Issue ใน repo นี้




