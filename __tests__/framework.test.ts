import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

const root = path.resolve(__dirname, '..')

function readFile(relativePath: string): string {
  return fs.readFileSync(path.join(root, relativePath), 'utf-8')
}

function fileExists(relativePath: string): boolean {
  return fs.existsSync(path.join(root, relativePath))
}

describe('Framework smoke tests', () => {
  it('proxy.ts exists at root and exports a named proxy function', () => {
    expect(fileExists('proxy.ts')).toBe(true)
    const content = readFile('proxy.ts')
    expect(content).toContain('export async function proxy(')
  })

  it('lib/supabase/middleware.ts does NOT exist', () => {
    expect(fileExists('lib/supabase/middleware.ts')).toBe(false)
  })

  it('types/database.types.ts exists and exports Database', () => {
    expect(fileExists('types/database.types.ts')).toBe(true)
    const content = readFile('types/database.types.ts')
    expect(content).toContain('export interface Database')
  })

  it('next.config.ts contains cacheComponents: true', () => {
    const content = readFile('next.config.ts')
    expect(content).toContain('cacheComponents: true')
  })

  it('next.config.ts contains reactCompiler: true', () => {
    const content = readFile('next.config.ts')
    expect(content).toContain('reactCompiler: true')
  })

  it('app/layout.tsx imports Toaster from sonner component path', () => {
    const content = readFile('app/layout.tsx')
    expect(content).toContain("from '@/components/ui/sonner'")
  })

  it('components/layout/Footer.tsx does NOT contain new Date()', () => {
    const content = readFile('components/layout/Footer.tsx')
    expect(content).not.toContain('new Date()')
  })
})
