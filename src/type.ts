interface AnyObject {
  [key: string]: any
}

export interface Note {
  id: number
  content: string
  title: string
  created_at: string
  updated_at: string
}

export interface SuccessData {
  success: boolean
  message: string
}

export interface Note {
  id: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
}
export interface PostANote {
  title: string
  content: string
}

export interface Triggers extends AnyObject {
  buttonTrigger: boolean
  timedTrigger: boolean
}

export interface DataError extends Error {
  title: string[]
  content: string[]
}
// {
//     "error": {
//         "title": [
//             "The title field is required."
//         ],
//         "content": [
//             "The content field is required."
//         ]
//     }
// }

export interface FetchTimoutOptions extends RequestInit {
  timeout: number
}
