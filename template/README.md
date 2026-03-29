# Kilo Toolkit Template Reference

> ปัจจุบัน payload หลัก (agents/skills/subagents/workflows/modes) ถูกเก็บไว้ที่ root ของ repo แล้ว โฟลเดอร์ `template/` เหลือไว้สำหรับบันทึกขั้นตอน bundle เท่านั้น เพื่อกันสับสนว่าควร copy อะไรบ้างเมื่อรัน `npx kilo-toolkit`

## ขั้นตอน bundle (เมื่อสร้าง release ใหม่)

1. เตรียมไดเรกทอรีปลายทาง (เช่น `./dist` หรือ path ที่ผู้ใช้ระบุ)
2. Copy โฟลเดอร์/ไฟล์ต่อไปนี้ไปยังปลายทาง
   - `agents/`
   - `skills/`
   - `subagents/`
   - `workflows/`
   - `modes/`
   - `github/` (เฉพาะ action/script ที่ต้องการแชร์)
   - `references/` (ถ้าต้องการให้ผู้ใช้มีคู่มือ)
   - `README.md`, `AGENTS.md`
3. ไม่ copy โฟลเดอร์ sandbox เช่น `.kilocode/`, `.vscode/`, `.zed/`, `node_modules/`
4. แสดงข้อความ `Kilo toolkit template copied to <path>`

## ข้อควรจำ

- Payload ทั้งหมดย้ายออกจาก `template/.kilocode/**` แล้ว อย่าเพิ่มไฟล์ใหม่กลับเข้าไป
- หากมี asset ใหม่ (เช่น rules, hooks, scripts) ให้สร้างโฟลเดอร์ระดับ root เฉพาะก่อน แล้วอัปเดต README/AGENTS.md ให้ชี้เส้นทางนั้น
- `template/` ใช้เก็บเอกสารสนับสนุนเท่านั้น ถ้าต้องการ checklist เพิ่มเติมสามารถสร้างไฟล์ .md เพิ่มในโฟลเดอร์นี้ได้
