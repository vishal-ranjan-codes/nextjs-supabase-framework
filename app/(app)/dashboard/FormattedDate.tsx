'use client'

export function FormattedDate({ date }: { date: string }) {
  return <>{new Date(date).toLocaleString()}</>
}
