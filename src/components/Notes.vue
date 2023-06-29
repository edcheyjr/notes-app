<script setup lang="ts">
import Note from './Note.vue'
import { useQuery } from '@tanstack/vue-query'
import { getAllNotes } from '../api/notes'
import { isProxy, toRaw, ref } from 'vue'
import { Note as NoteType } from '../type'

interface Props {
  query: string
}

const { query } = defineProps<Props>()
const { isError, isFetched, isLoading, data, error } = useQuery({
  queryKey: ['notes'],
  queryFn: getAllNotes,
  networkMode: 'offlineFirst',
  staleTime: 8000,
})

console.log('query', query)

let dataShow: NoteType[] = []

// if (data.value) {
//   const dataSorted = reactive(data).value.reverse() //rearrange latest first
//   if (query == '') {
//     dataShow.push(
//       ...dataSorted.filter((note: NoteType) => note.title.startsWith(query))
//     )
//   } else {
//     dataShow.push(...dataSorted)
//   }
// }
</script>

<template>
  <div v-if="isFetched">
    <div
      v-if="data?.length && data?.length < 1"
      class="h-full w-full items-center justify-center"
    >
      <p class="text-3xl font-semibold text-gray-100">No notes found</p>
    </div>
    <div v-else>
      <ul v-for="note in data">
        <li class="px-2 mt-2">
          <Note :note="isProxy(note) ? toRaw(note) : note" />
        </li>
      </ul>
    </div>
  </div>
  <div v-if="isLoading" class="text-3xl text-blue-400">loading ...</div>
  <div v-if="isError" class="text-lg text-red-500">{{ error }}</div>
</template>
