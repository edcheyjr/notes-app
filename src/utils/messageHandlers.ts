/**
 * message handler for success message
 */

import { MessageType } from '../type'

function _renderSuccessMessageUI(message: string): string {
  console.log('message', message)
  const messageUI = `<div class="py-1.5 text-sm font-bold text-green-400 bg-green-300/10 rounded-md px-2" role="alert">${message}</div>`
  return messageUI
}

/*
 * message handler for error message
 */
function _renderErrorMessageUI(message: string): string {
  const messageUI = `<div class="py-1.5 text-sm font-bold text-red-400 bg-red-300/10 rounded-md px-2" role="alert">${message}</div>`
  return messageUI
}

export default function messageHandler(
  message: string,
  type: MessageType,
  isShowMessage?: boolean
): string {
  switch (type) {
    case MessageType.SUCCESS:
      return isShowMessage ? _renderSuccessMessageUI(message) : ''
    case MessageType.ERROR:
      return isShowMessage ? _renderErrorMessageUI(message) : ''
    default:
      return ''
  }
}
