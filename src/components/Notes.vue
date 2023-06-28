<script setup lang="ts">
import Note from './Note.vue'
import { useQuery } from '@tanstack/vue-query'
import { getAllNotes } from '../api/notes'
import { isProxy, toRaw } from 'vue'

interface Note {
  id: number
  title: string
  content: string
  created_at: string
  updated_at: string
}
const { isError, isFetched, isLoading, data, status, error } = useQuery(
  ['notes'],
  getAllNotes
)
</script>

<template>
  <div v-if="isFetched">
    <ul v-for="note in data">
      <li class="px-2 mt-2">
        <Note :note="isProxy(note) ? toRaw(note) : note" />
      </li>
    </ul>
  </div>
  <div v-if="isLoading" class="text-3xl text-blue-400">loading ...</div>
  <div v-if="isError" class="text-lg text-red-500">{{ error }}</div>
</template>
