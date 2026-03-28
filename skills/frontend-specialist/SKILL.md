---
name: frontend-specialist
description: >
  A skill for frontend development using React, TypeScript, Tailwind CSS, and shadcn/ui.
  Use this skill when the user wants to create, modify, or debug React components, set up a new 
  frontend project, add UI components, or work with modern frontend tooling. Also triggers when
  user mentions React, TypeScript, Tailwind, shadcn, Next.js, Vite, or asks to "build a UI", 
  "create a component", "add a button/card/dialog", or "fix this React/TS error".
---

# Frontend Specialist

Execute frontend development tasks using React, TypeScript, Tailwind CSS, and shadcn/ui with proper patterns and best practices.

## When to Use This Skill

- Initialize new React/Next.js projects with shadcn/ui preset
- Add shadcn/ui components (button, card, dialog, input, form, table, etc.)
- Create custom React components with TypeScript
- Implement responsive layouts with Tailwind CSS
- Set up frontend tooling (Vite, Tailwind, PostCSS, ESLint)
- Debug React/TypeScript/Next.js issues
- Work with component libraries and design systems
- Build forms with react-hook-form + Zod validation
- Create data tables with TanStack Table

## Project Initialization

### Next.js with shadcn/ui

```bash
bunx --bun shadcn@latest init --preset b3SAg5MJM --template next --monorepo --rtl
```

This creates a Next.js project with:
- TypeScript
- Tailwind CSS
- shadcn/ui components
- App Router
- RTL support

### Standalone Vite project

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
bunx --bun shadcn@latest init
```

## Adding Components

### Single component
```bash
bunx --bun shadcn@latest add button
```

### Multiple components
```bash
bunx --bun shadcn@latest add button card dialog input -y
```

### Available components
Accordion, Alert, Alert Dialog, Avatar, Badge, Button, Calendar, Card, Checkbox, Collapsible, Command, Context Menu, Dialog, Dropdown Menu, Form, Hover Card, Input, Label, Menubar, Navigation Menu, Popover, Progress, Radio Group, Scroll Area, Select, Separator, Sheet, Sidebar, Skeleton, Slider, Switch, Table, Tabs, Textarea, Toast, Toggle, Tooltip

## Component Patterns

### Basic Component Template

```tsx
import { cn } from "@/lib/utils"

interface ComponentNameProps {
  className?: string
  children?: React.ReactNode
  /** Optional prop description */
  variant?: "default" | "secondary" | "outline"
}

export function ComponentName({ 
  className, 
  children,
  variant = "default" 
}: ComponentNameProps) {
  return (
    <div className={cn(
      "base-styles-here",
      variant === "default" && "default-styles",
      variant === "secondary" && "secondary-styles",
      variant === "outline" && "outline-styles",
      className
    )}>
      {children}
    </div>
  )
}
```

### Form with react-hook-form + Zod

```tsx
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "At least 8 characters"),
})

type FormData = z.infer<typeof formSchema>

export function LoginForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

### Data Table with TanStack Table

```tsx
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

const columnHelper = createColumnHelper<RowData>()

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: info => info.getValue(),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: info => <Badge>{info.getValue()}</Badge>,
  }),
]

export function DataTable({ data }: { data: RowData[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <TableHead key={header.id}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map(row => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map(cell => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
```

## Responsive Design

### Mobile-First Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| `sm:` | 640px | Small phones → landscape |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Small laptops |
| `xl:` | 1280px | Desktops |
| `2xl:` | 1536px | Large screens |

### Responsive Patterns

```tsx
// Stack on mobile, side-by-side on desktop
<div className="flex flex-col md:flex-row gap-4">
  <div className="w-full md:w-1/2">Left</div>
  <div className="w-full md:w-1/2">Right</div>
</div>

// Hide on mobile, show on desktop
<div className="hidden md:block">Desktop only</div>

// Show on mobile, hide on desktop  
<div className="block md:hidden">Mobile only</div>
```

## Tooling Commands

### Vite
```bash
npm run dev      # Start dev server
npm run build   # Production build
npm run preview # Preview production build
```

### Tailwind
```bash
npx tailwindcss init -p   # Initialize config
npx tailwindcss -i ./input.css -o ./output.css --watch
```

### ESLint
```bash
npm run lint    # Run ESLint
npx eslint . --fix
```

## Error Debugging

### Common React Issues

| Issue | Solution |
|-------|----------|
| "Cannot read property of undefined" | Check if prop is optional or has default |
| "Too many re-renders" | Remove useEffect with state updates in render |
| "Hydration mismatch" | Use client component or suppress with suppressHydrationWarning |
| "Window is not defined" | Use useEffect for browser-only code |

### Common TypeScript Issues

| Issue | Solution |
|-------|----------|
| "Type 'X' is not assignable to type 'Y'" | Check generic types or union types |
| "Property does not exist on type" | Add to interface or use `as` type assertion |
| "Generic type 'X' requires Y type arguments" | Provide explicit type parameters |

## Related

- Workflow: See `/workflows/frontend-workflow.md`
- Components: https://ui.shadcn.com
- shadcn CLI: https://github.com/shadcn-ui/ui