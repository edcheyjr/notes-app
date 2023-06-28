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
