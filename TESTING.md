# คู่มือทดสอบเอเจนต์ Kilo Toolkit

> อ้างอิงจาก `references/overview.md` และ `references/custom-mode.md`
> เน้นการทดสอบโหมด Orchestrator + subagent prompt-architect รวมถึง agent/topic-tagger และ workflow หลัก

## 1. เตรียมสภาพแวดล้อม
1. ติดตั้ง dependencies (`npm install` หรือ `bun install` ตาม lockfile)
2. เปิด Kilo Code พร้อมโฟลเดอร์ repo นี้ เพื่อให้ `README.md`/`AGENTS.md` โหลดเป็น context
3. ตรวจว่าไม่มีไฟล์ payload ตกค้างใน `.kilocode/` (ควรใช้เพื่อ sandbox เท่านั้น)
4. สร้างโฟลเดอร์ปลายทางชั่วคราว เช่น `tmp/kilo-run` ไว้ตรวจผล copy หากจำเป็น

## 2. ทดสอบ Orchestrator Mode (`modes/orchestrator.json`)
ใช้ Kilo chat แล้วสลับเป็น orchestrator mode (`/mode orchestrator`)

| Test | Input ตัวอย่าง | สิ่งที่ต้องตรวจ |
|------|----------------|------------------|
| Passive Generation | `/create` แล้วให้ requirement สั้น ๆ | ต้องถามเป้าหมาย → ถามรายละเอียด ≤2 ข้อ → เก็บ meta-data → สรุป → ถาม “ให้สร้าง Prompt ไหม?” ก่อน output |
| Guide Mode (/create) | กำหนด Use case + ข้อมูลครบ | Output ต้องมี meta_data ครบ, Prompt อยู่ใน code fence, อธิบายเหตุผล ≥2 ข้อ |
| Architect Mode (/optimize) | ให้ Prompt เดิม + ปัญหาที่ต้องปรับ | ต้องสร้างตารางปัญหา (Problem/Severity/Impact/Location) แล้วค่อย output เวอร์ชันใหม่ |
| Expand Mode (/expand) | ขอเพิ่ม capability เช่น “เพิ่ม chain-of-thought” | ต้องประเมินผลกระทบ, ขอ confirm, แล้วอธิบายการรวม module เก่า/ใหม่ |
| Diagnose Mode (/diagnose) | ส่ง Prompt ให้รีวิว | ต้องให้คะแนนแบบ 🟢/🟡/🔴 + ข้อเสนอแก้ไข + อธิบายมิติที่คะแนน ≤70 |
| Help Mode (/help) | คำสั่ง `/help` | ต้องแสดงรายการคำสั่งและ workflow ย่อ |

## 3. ทดสอบ Subagent `prompt-architect`
เกิดขึ้นโดยอัตโนมัติเมื่อ orchestrator จัดการงาน Prompt Engineering

เช็กลิสต์:
- มี 5 โหมด (/create, /optimize, /expand, /diagnose, /help) และทำงานตามคำบรรยายในไฟล์ `subagents/prompt-architect.yaml`
- ข้อความทั้งหมดเป็นภาษาไทย/อังกฤษ ไม่มีอักขระจีนหลงเหลือ
- ทุกครั้งที่ output Prompt ต้องอธิบายเหตุผล ≥2 ประเด็น (ดู section “กฎเกณฑ์สำคัญ”)
- Passive Generation: ถ้าไม่ขอ “generate” จะไม่ส่ง Prompt เต็ม

## 4. ทดสอบ Agent `agents/topic-tagger.yaml`
1. รัน validator เช่น `yq eval agents/topic-tagger.yaml >/dev/null` เพื่อตรวจ syntax
2. ทดสอบผ่าน Kilo: ให้ Markdown + keywords และดูว่าทำงานครบทุกขั้น (อ่านไฟล์, วิเคราะห์, แนะนำ topic)
3. ตรวจว่ากฎ (เช่น ห้ามใช้ไทยใน key ถ้า parser มีปัญหา) ถูกแก้แล้ว

## 5. ทดสอบ Skills/Workflows
| รายการ | วิธี |
|--------|------|
| `skills/frontend-specialist` | เรียกใช้ skill ผ่าน `@frontend-specialist` แล้วให้โจทย์ UI → ตรวจว่ามีขั้นตอน/คำแนะนำครบ |
| `skills/notebooklm-prompt-gen` | ขอให้สร้าง prompt notebooklm → ควรได้ template พร้อมช่องกรอก |
| `skills/skill-share` | สั่ง “แชร์สรุปไป Slack” → ตรวจว่า skill ตอบด้วย checklist |
| `workflows/frontend-workflow.md` | ทำตามทีละขั้น (init project → add shadcn → build component) แล้วติ๊กสถานะ |

## 6. ทดสอบ Flow การ bundle (จำลอง `npx kilo-toolkit`)
1. ใช้สคริปต์ copy (หรือ manual) เพื่อคัดลอกโฟลเดอร์ต่อไปนี้ไปยัง temp dir: `agents/`, `skills/`, `subagents/`, `workflows/`, `modes/`, `github/`, `references/`, `README.md`, `AGENTS.md`
2. ตรวจว่าไม่มี `.kilocode/`, `.vscode/`, `node_modules/` หรือไฟล์ sandbox อื่นติดไป
3. เปิด temp dir ใน Kilo Code เพื่อตรวจว่าบริบทถูกต้อง

## 7. การบันทึกผล
- สำหรับแต่ละ test case ให้เก็บหลักฐาน (สกรีนช็อต output หรือ log)
- หากพบปัญหาให้สร้าง Issue/PR ระบุไฟล์, ขั้นตอน reproduce และแนบผลคาดหวัง
- อัปเดต `README.md` หรือ `AGENTS.md` ถ้ามีการเปลี่ยนแปลงขั้นตอนหลังการทดสอบ
