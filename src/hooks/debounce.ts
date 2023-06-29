import { Ref, customRef } from 'vue'

/**
 * Debounce Ref
 * ----------------------------------------------------------------
 * @description Creating a debounced ref that only updates the value after a certain timeout after the latest set call
 * @default 200 ms timeout
 * @param value value to be updated
 * @param delay time to wait before updating in milliseconds defaults to 200 ms
 * @returns
 */
export default function useDebouncedRef<T>(value: any, delay = 200): Ref<T> {
  let timeout: number | undefined = undefined
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      },
    }
  })
}
