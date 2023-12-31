import { PostANote, Note, DataError } from '../type'
const headers = new Headers({ 'Content-Type': 'application/json' })
const Url = import.meta.env.API_URL || 'http://127.0.0.1:8000/api'
console.log('Url', Url)

type DeleteOptions = {
  id: number
}

// get the all notes
export async function getAllNotes(): Promise<Note[]> {
  const response = await fetch(`${Url}/notes`, {
    headers,
  })
  const data = await response.json()
  return data
}

// post a note
export async function postANote(note: PostANote) {
  const response = await fetch(`${Url}/notes`, {
    method: 'POST',
    headers,
    body: JSON.stringify(note),
  })
  const data = await response.json()
  return data
}

//delete a note
export async function deleteANote({ id }: DeleteOptions) {
  const response = await fetch(`${Url}/notes/${id}`, {
    method: 'DELETE',
    headers,
  })
  const data = await response.json()
  if (response.status !== 200) {
    throw data.error
  }
  return data
}
