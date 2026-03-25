# Frontend Specialist Workflow

คุณกำลังใช้ Frontend Specialist Workflow สำหรับงาน Frontend Development ด้วย React, TypeScript, Tailwind CSS และ shadcn/ui

## 🎯 Available Actions

### 1. Init New Project
สร้าง project ใหม่ด้วย shadcn UI + Next.js

**Steps:**
1. รันคำสั่ง `bunx --bun shadcn@latest init --preset b3SAg5MJM --template next --monorepo --rtl`
2. รอให้ติดตั้งเสร็จ
3. รัน `bunx --bun shadcn@latest add button card dialog input` เพื่อเพิ่ม basic components

**Parameters needed:**
- Project name (ถ้าไม่มีจะใช้ชื่อ default)

---

### 2. Add shadcn Component
เพิ่ม shadcn UI component จาก library

**Steps:**
1. ถามผู้ใช้ว่าต้องการเพิ่ม component อะไร
2. รัน `bunx --bun shadcn@latest add [component_name]`

**Parameters needed:**
- Component name (button, card, dialog, input, select, sheet, table, tabs, etc.)

---

### 3. Create Custom Component

สร้าง custom React component ด้วย Tailwind CSS

**Steps:**
1. ถามชื่อ component ที่ต้องการสร้าง
2. สร้างไฟล์ `src/components/{ComponentName}.tsx`
3. สร้าง Storybook file `src/components/{ComponentName}.stories.tsx`
4. ใช้ `cn()` utility จาก `@/lib/utils`

**Parameters needed:**
- Component name
- Props ที่ต้องการ (ถ้ามี)

---

### 4. Responsive Design Adjustment
ปรับ responsive design ให้รองรับทุกขนาดหน้าจอ

**Steps:**
1. ใช้ `search_files` หาไฟล์ที่ต้องการปรับ
2. ตรวจสอบว่าใช้ Tailwind responsive classes หรือยัง (md:, lg:, xl:)
3. เพิ่ม responsive classes ถ้ายังไม่มี
4. แนะนำให้ใช้ mobile-first approach

**Parameters needed:**
- File path ที่ต้องการปรับ

---

### 5. Add Multiple shadcn Components
เพิ่มหลาย shadcn components พร้อมกัน

**Steps:**
1. รันคำสั่ง `bunx --bun shadcn@latest add button card dialog input select sheet table tabs`

**Common components:**
- button, card, dialog, input, select, sheet, table, tabs, form, toast, navigation-menu, dropdown-menu, avatar, badge, skeleton

---

## 📋 ตัวอย่างการใช้งาน

| Input | Action |
|-------|--------|
| "init project" | สร้าง Next.js project พร้อม shadcn/ui |
| "add shadcn dialog" | เพิ่ม Dialog component |
| "สร้าง component Header" | สร้าง Header.tsx + Header.stories.tsx |
| "ปรับ responsive" | วิเคราะห์และปรับ Tailwind classes |
| "เพิ่ม button card form" | เพิ่มหลาย components พร้อมกัน |

---

## 🔧 CLI Commands ที่ใช้บ่อย

```bash
# Init project
bunx --bun shadcn@latest init --preset b3SAg5MJM --template next --monorepo --rtl

# Add single component
bunx --bun shadcn@latest add button

# Add multiple components
bunx --bun shadcn@latest add button card dialog input -y

# List available components
bunx --bun shadcn@latest list
```

---

## 💡 Tips

- ใช้ shadcn/ui components เป็นหลัก ถ้าต้องการ customize ใช้ `cn()` utility
- ทุก component ควรมี Storybook story สำหรับ document
- ปรับ responsive ด้วย Tailwind classes: `sm:` `md:` `lg:` `xl:` `2xl:`
- ถ้าไม่รู้ว่าต้องทำอะไร ให้ถามผู้ใช้ก่อน