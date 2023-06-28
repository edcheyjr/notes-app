/**
 * message handler for success message
 */

export function renderSuccessMessageUI(message: string) {
  console.log('message', message)
  return `<div class="py-1.5 text-sm font-bold text-green-400 bg-green-300/10 rounded-md px-2" role="alert">${message}</div>`
}

/*
 * message handler for error message
 */
export function renderErrorMessageUI(message: string): string {
  return `<div class="py-1.5 text-sm font-bold text-red-400 bg-red-300/10 rounded-md px-2" role="alert">${message}</div>`
}
