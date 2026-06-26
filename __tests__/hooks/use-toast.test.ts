import { describe, it, expect } from 'vitest'
import { reducer } from '@/hooks/use-toast'

type ToasterToast = {
  id: string
  title?: string
  description?: string
  open?: boolean
}

interface State {
  toasts: ToasterToast[]
}

describe('use-toast reducer', () => {
  const emptyState: State = { toasts: [] }

  describe('ADD_TOAST', () => {
    it('adds a toast to the beginning of the list', () => {
      const toast = { id: '1', title: 'Hello', open: true }
      const result = reducer(emptyState, {
        type: 'ADD_TOAST',
        toast: toast as never,
      })
      expect(result.toasts).toHaveLength(1)
      expect(result.toasts[0]).toEqual(toast)
    })

    it('limits toasts to TOAST_LIMIT (1)', () => {
      const state: State = {
        toasts: [{ id: '1', title: 'First', open: true }],
      }
      const result = reducer(state, {
        type: 'ADD_TOAST',
        toast: { id: '2', title: 'Second', open: true } as never,
      })
      expect(result.toasts).toHaveLength(1)
      expect(result.toasts[0].id).toBe('2')
    })
  })

  describe('UPDATE_TOAST', () => {
    it('updates an existing toast by id', () => {
      const state: State = {
        toasts: [{ id: '1', title: 'Original', open: true }],
      }
      const result = reducer(state, {
        type: 'UPDATE_TOAST',
        toast: { id: '1', title: 'Updated' } as never,
      })
      expect(result.toasts[0].title).toBe('Updated')
      expect(result.toasts[0].open).toBe(true)
    })

    it('does not modify other toasts', () => {
      const state: State = {
        toasts: [{ id: '1', title: 'Keep' }],
      }
      const result = reducer(state, {
        type: 'UPDATE_TOAST',
        toast: { id: '999', title: 'Nope' } as never,
      })
      expect(result.toasts[0].title).toBe('Keep')
    })
  })

  describe('DISMISS_TOAST', () => {
    it('sets open to false for a specific toast', () => {
      const state: State = {
        toasts: [{ id: '1', title: 'Test', open: true }],
      }
      const result = reducer(state, {
        type: 'DISMISS_TOAST',
        toastId: '1',
      })
      expect(result.toasts[0].open).toBe(false)
    })

    it('sets open to false for all toasts when no toastId', () => {
      const state: State = {
        toasts: [{ id: '1', open: true }],
      }
      const result = reducer(state, {
        type: 'DISMISS_TOAST',
        toastId: undefined,
      })
      expect(result.toasts[0].open).toBe(false)
    })
  })

  describe('REMOVE_TOAST', () => {
    it('removes a specific toast by id', () => {
      const state: State = {
        toasts: [{ id: '1', title: 'Remove me' }],
      }
      const result = reducer(state, {
        type: 'REMOVE_TOAST',
        toastId: '1',
      })
      expect(result.toasts).toHaveLength(0)
    })

    it('removes all toasts when toastId is undefined', () => {
      const state: State = {
        toasts: [{ id: '1' }, { id: '2' }],
      }
      const result = reducer(state, {
        type: 'REMOVE_TOAST',
        toastId: undefined,
      })
      expect(result.toasts).toHaveLength(0)
    })

    it('keeps other toasts when removing a specific one', () => {
      const state: State = {
        toasts: [{ id: '1' }, { id: '2' }],
      }
      const result = reducer(state, {
        type: 'REMOVE_TOAST',
        toastId: '1',
      })
      expect(result.toasts).toHaveLength(1)
      expect(result.toasts[0].id).toBe('2')
    })
  })
})
