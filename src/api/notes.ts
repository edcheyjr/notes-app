import { PostANote, Note } from '../type'

const headers = new Headers({ 'Content-Type': 'application/json' })
// get the all notes
const Url = 'http://127.0.0.1:8000/api'
console.log('Url', Url)

export async function getAllNotes(): Promise<Note[]> {
  const response = await fetch(`${Url}/notes`, {
    headers,
  })
  return await response.json()
}

// post a note

export async function postANote(note: PostANote) {
  console.log('note', note)
  const response = await fetch(`${Url}/notes`, {
    method: 'POST',
    headers,
    body: JSON.stringify(note),
  })
  const data = await response.json()
  return data
}

//delete a note

export async function deleteANote(id: number) {
  const response = await fetch(`${Url}/notes/${id}`, {
    method: 'DELETE',
    headers,
  })
  const data = await response.json()
  return data
}
