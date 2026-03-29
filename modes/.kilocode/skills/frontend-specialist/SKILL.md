# Frontend Specialist Skill

## Overview

ช่วยผู้ใช้ในการพัฒนา Frontend ด้วย React, TypeScript, Tailwind CSS และ shadcn/ui

## Capabilities

### 1. Project Initialization
สร้าง Next.js project ใหม่ด้วย shadcn/ui preset

```bash
bunx --bun shadcn@latest init --preset b3SAg5MJM --template next --monorepo --rtl
```

### 2. Add shadcn Components
เพิ่ม shadcn UI components

```bash
# Single component
bunx --bun shadcn@latest add button

# Multiple components
bunx --bun shadcn@latest add button card dialog input -y
```

### 3. Create Custom Components
สร้าง custom React component พร้อม Storybook

```tsx
import { cn } from "@/lib/utils"

interface ComponentNameProps {
  className?: string
  children?: React.ReactNode
}

export function ComponentName({ className, children }: ComponentNameProps) {
  return (
    <div className={cn("...", className)}>
      {children}
    </div>
  )
}
```

### 4. Responsive Design
ปรับ Tailwind CSS responsive classes

- ใช้ mobile-first approach
- ใช้ breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`

### 5. Component Patterns

| Component Type | Pattern |
|---------------|---------|
| Button | shadcn Button + custom variants |
| Card | shadcn Card + custom styling |
| Dialog | shadcn Dialog + custom content |
| Form | shadcn Form + react-hook-form |
| Table | shadcn Table + TanStack Table |

## fileRegex

```regex
\.(tsx?|jsx?|css|scss|less|json)$|next\.config\.|tailwind\.config\.
```

## Groups

- frontend
- react
- typescript
- tailwind
- shadcn
- nextjs

## Tools

- search_files: ค้นหาไฟล์
- read_file: อ่านไฟล์
- write_to_file: เขียนไฟล์
- execute_command: รัน CLI commands

## Examples

**Input:** "init project"
**Output:** รัน shadcn init command พร้อม setup components พื้นฐาน

**Input:** "add shadcn dialog"
**Output:** เพิ่ม Dialog component

**Input:** "สร้าง component MyButton"
**Output:** สร้าง MyButton.tsx + MyButton.stories.tsx

## Related

- ดู workflow: `/frontend-workflow.md`
- เพิ่มเติม: shadcn components ที่ https://ui.shadcn.com