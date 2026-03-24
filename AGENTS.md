# AGENTS.md - คู่มือการทำงานกับ Kilo Toolkit Repo

## 🎯 หน้าที่หลักของเอเจนต์ใน Repo นี้

Repo นี้เป็น **Kilo Code Toolkit** สำหรับแชร์ skills, custom modes, rules, subagents, workflows แบบกลาง สามารถดึงใช้ด้วย `npx kilo-toolkit`

## 📋 สิ่งที่เอเจนต์ต้องทำ

### 1. **เข้าใจโครงสร้าง repo**

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

### 2. **เมื่อผู้ใช้รัน `npx kilo-toolkit`**

```
1. อ่าน process.argv เพื่อหา target directory [youtube](https://www.youtube.com/watch?v=1n6PtOWTVDg)
2. Copy โฟลเดอร์ template/ ทั้งหมดไปยัง target directory
3. สร้าง .kilocode/, .kilocodemodes, README.md ในโปรเจ็กต์ปลายทาง
4. แสดงข้อความ "Kilo toolkit template copied to [path]"
```

### 3. **จัดการไฟล์สำคัญ**

- **`.kilocodemodes`** - Custom modes สำหรับ Kilo Code (JSON format เท่านั้น)
- **`.kilocode/skills/`** - Skills แต่ละตัวมี SKILL.md เป็นไฟล์หลัก
- **`.kilocode/rules-*/`** - Custom rules สำหรับแต่ละ mode
- **`.kilocode/subagents/`** - Subagent configs (YAML/JSON)
- **`.kilocode/workflows/`** - Workflow definitions

### 4. **กฎการแก้ไขไฟล์**

```
✅ สามารถแก้ไขได้
- template/.kilocode/**       (skills, rules, subagents, workflows)
- template/.kilocodemodes     (custom modes)
- template/README.md

❌ ห้ามแตะ
- package.json               (ต้องคง bin และ scripts)
- bin/create-kilo-setup.mjs  (logic การ copy)
- .github/workflows/**       (CI/CD)
```

### 5. **เมื่อช่วยผู้ใช้สร้าง/แก้ไข Kilo configs**

```
ต้องรู้ไฟล์และตำแหน่ง:
├── .kilocodemodes           # Global custom modes
├── .kilocode/skills/**/     # Skills (มี SKILL.md)
├── .kilocode/rules-*/       # Mode-specific rules  
├── .kilocode/subagents/     # Subagent YAML/JSON
└── .kilocode/workflows/     # Workflow definitions
```

### 6. **เมื่อ contributor เพิ่ม content ใหม่**

```
1. เพิ่ม skills ใหม่ → template/.kilocode/skills/{skill-name}/SKILL.md
2. เพิ่ม custom mode → template/.kilocodemodes (แก้ JSON)
3. เพิ่ม rules → template/.kilocode/rules-{mode}/{rule-name}.md
4. Test ด้วย `npm run test` (ถ้ามี)
5. Commit + PR → main
6. Tag release → vX.Y.Z → GitHub Actions จะ npm publish อัตโนมัติ
```

### 7. **เมื่อแก้ GitHub Actions**

```
.github/workflows/release.yml
- Trigger: push tags v*.*.*
- Jobs: test → build → npm publish
- Secrets: NPM_TOKEN (ต้องตั้งใน repo settings)
```

## 🚫 สิ่งที่ห้ามทำ

- แก้ package.json bin หรือ scripts
- ลบ/เปลี่ยนโครงสร้าง template/
- สร้างไฟล์นอก template/ หรือ bin/
- ใช้ emoji ใน SKILL.md (ตาม rules ของ education mode)
- Publish โดยไม่ test ก่อน

## 💡 เคล็ดลับการใช้งาน

```
ผู้ใช้เรียก:
$ npx kilo-toolkit          # copy ลง current dir
$ npx kilo-toolkit my-app   # copy ลงโฟลเดอร์ my-app

หลัง copy เสร็จ → Kilo Code จะอ่าน:
- .kilocodemodes (custom modes)
- .kilocode/** (skills, rules, subagents)
```

## 📞 ตัวอย่างการสื่อสารกับผู้ใช้

```
👤 "เพิ่ม skill ใหม่สำหรับ React"
🤖 "จะเพิ่มใน template/.kilocode/skills/react-pro/SKILL.md
   ต้องการ fileRegex อะไร และ groups ไหนครับ?"

👤 "แก้ custom mode frontend-specialist"
🤖 "แก้ใน template/.kilocodemodes 
   slug: frontend-specialist 
   ต้องการเพิ่ม groups หรือปรับ roleDefinition ไหมครับ?"
```
