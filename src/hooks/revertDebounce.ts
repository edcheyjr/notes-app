import { Ref, customRef } from 'vue'

/**
 * Revert
 * ----------------------------------------------------------------
 * @param {any} value value to be updated
 * @param {number} delay time to wait before updating in milliseconds defaults to 200 ms
 * @param {any} staticValue this will store the old value
 * @returns {Ref<T>}
 */
function _revertdRef<T>(value: any, delay: number, staticValue: T): Ref<T> {
  let timeout: number | undefined = undefined
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        value = newValue
        //take this time before reverting to the staticValue
        timeout = setTimeout(() => {
          value = staticValue
          trigger()
        }, delay)
      },
    }
  })
}

/**
 * RevertDebounce
 * ----------------------------------------------------------------
 * @description only updates a value for certain time
 * @default 200 ms timeout
 * @param {any} value value to be updated
 * @param  {number} delay time to wait before updating in milliseconds defaults to 200 ms
 * @returns {Ref<T>}
 */
export default function useRevertDebouncedRef<T>(
  value: any,
  delay = 200
): Ref<T> {
  return _revertdRef(value, delay, value)
}
