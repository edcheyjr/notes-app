import { PostANote, Note, DataError } from '../type'
const headers = new Headers({ 'Content-Type': 'application/json' })
const Url = import.meta.env.API_URL || 'http://127.0.0.1:8000/api'
console.log('Url', Url)

// get the all notes
export async function getAllNotes(): Promise<Note[]> {
  try {
    const response = await fetch(`${Url}/notes`, {
      headers,
    })
    const data = await response.json()
    if (response.status !== 200) {
      throw data.error
    }
    return data
  } catch (error) {
    console.error(error)
  }
  return []
}

// post a note
export async function postANote(note: PostANote) {
  console.log('note', note)
  try {
    const response = await fetch(`${Url}/notes`, {
      method: 'POST',
      headers,
      body: JSON.stringify(note),
    })
    const data = await response.json()
    if (response.status !== 200) {
      throw data.error as DataError
    }
    return data
  } catch (error) {
    console.error('data error', error)
  }
}

//delete a note
export async function deleteANote(id: number) {
  try {
    const response = await fetch(`${Url}/notes/${id}`, {
      method: 'DELETE',
      headers,
    })
    const data = await response.json()
    if (response.status !== 200) {
      throw data.error
    }
    return data
  } catch (error) {
    console.error(error)
  }
}
