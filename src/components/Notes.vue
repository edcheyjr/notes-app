<script setup lang="ts">
import Note from './Note.vue'
import { useQuery } from '@tanstack/vue-query'
import { getAllNotes } from '../api/notes'
import { isProxy, reactive, toRaw, shallowReadonly, ref, computed } from 'vue'
import { Note as NoteType } from '../type'
import { randomColorsGenerator } from '../utils/randomColorsGenerator'
import useDebounceRef from '../hooks/debounce'

interface Props {
  query: string
}

const props = defineProps<Props>()
const color = ref(randomColorsGenerator())

const { isError, isFetched, isLoading, data, error } = useQuery({
  queryKey: ['notes'],
  queryFn: getAllNotes,
  networkMode: 'offlineFirst',
  staleTime: 8000,
})

const dataArr = useDebounceRef<NoteType[]>(toRaw(data.value ? data.value : []))

const dataReactive = reactive(dataArr)
const filtered = computed(() =>
  dataReactive.value
    .reverse()
    .filter((note: NoteType) => note.title.includes(props.query))
)
const copy = shallowReadonly(filtered)
console.log('copy', copy)
</script>

<template>
  <span>{{ props.query }}</span>
  <div v-if="isFetched" class="h-full w-full">
    <div
      v-if="copy.length < 1"
      class="h-4/5 w-full items-center justify-center flex"
    >
      <p class="text-3xl font-semibold" :style="`color:${color}`">
        No notes found
      </p>
    </div>
    <div v-else>
      <ul v-for="note in copy">
        <li class="px-2 mt-2">
          <Note :note="isProxy(note) ? toRaw(note) : note" />
        </li>
      </ul>
    </div>
  </div>
  <div
    v-if="isLoading"
    class="text-3xl text-blue-400 h-4/5 items-center justify-center flex"
  >
    loading ...
  </div>
  <div
    v-if="isError"
    class="text-lg text-red-500 h-4/5 items-center justify-center flex"
  >
    {{ error }}
  </div>
</template>
