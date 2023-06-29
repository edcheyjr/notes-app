<script lang="ts" setup>
import { ref } from 'vue'
import { formatDate } from '../utils/formatDate'
import { randomColorsGenerator } from '../utils/randomColorsGenerator'
import Trash from '../assets/trash.svg'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { deleteANote } from '../api/notes'
import { Note, SuccessData } from '../type'

// defines what events our component emits
const emit = defineEmits<{
  (event: 'success', success: SuccessData): SuccessData | undefined
  (event: 'error', error: unknown): string | undefined
  (event: 'showMessage', isShowMessage: boolean): boolean
}>()

interface Props {
  note: Note
}
const { note } = defineProps<Props>()
const currentColor = ref(randomColorsGenerator())
const queryClient = useQueryClient()

const mutation = useMutation({
  mutationFn: deleteANote,
  cacheTime: 200,
  networkMode: 'offlineFirst',
  mutationKey: ['notes', note.id],
  onMutate: () => {
    // can do optimistic update here
    emit('success', {
      success: true,
      message: 'Note deleted successfully',
    })
    emit('showMessage', true)
  },
  onSuccess: (data: SuccessData, variable, context) => {
    emit('success', {
      success: data.success,
      message: data.message,
    })
    // Invalidate and refetch
    console.log('data', data, variable, context)
    queryClient.invalidateQueries({ queryKey: ['notes'] })
  },
  onError: (error, variable, context) => {
    emit('error', error)
    //if optimistic update is done you can roll back here
    console.log('error', error, 'variable:', variable, 'context', context)
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ['notes'] })
  },
  onSettled: () => {
    //on settled do something
  },
})

// delete this user
function handleDeleteUser(e: Event) {
  e.stopPropagation()
  mutation.mutate({ id: note.id })
  console.log('id', note.id)
}
</script>

<template>
  <article
    class="w-full border-t-[5px] py-6 px-2 relative rounded flex flex-col gap-3 bg-amber-100/10"
    :style="`border-color:${currentColor}`"
  >
    <h3 class="text-lg 2xl:text-xl italic font-light">{{ note.title }}</h3>
    <p class="text-sm 2xl:text-base text-ellipsis w-[90%]">
      {{ note.content }}
    </p>
    <div
      class="absolute top-3 right-3 text-sm 2xl:text-base font-normal"
      :style="`color:${currentColor}`"
    >
      {{ formatDate(note.created_at) }}
    </div>

    <img
      :src="Trash"
      @click="handleDeleteUser"
      class="h-5 w-5 absolute bottom-3 right-3 cursor-pointer"
    />
  </article>
</template>
