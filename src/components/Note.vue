<script lang="ts" setup>
import { ref, computed } from 'vue'
import { formatDate } from '../utils/formatDate'
import { randomColorsGenerator } from '../utils/randomColorsGenerator'
import Trash from '../assets/trash.svg'
import { Mutation, useMutation, useQueryClient } from '@tanstack/vue-query'
import { deleteANote } from '../api/notes'
import { Note, SuccessData } from '../type'
import {
  renderSuccessMessageUI,
  renderErrorMessageUI,
} from '../utils/messageHandlers.ts'

const currentColor = ref(randomColorsGenerator())
const queryClient = useQueryClient()

interface Props {
  note: Note
}
const { note } = defineProps<Props>()

const successData = ref<SuccessData>({
  success: false,
  message: '',
})
const isShowMessage = ref<boolean>(true)

computed({
  get: () => !isShowMessage.value,
  set: (val) => {
    console.log('val', val)
    setTimeout(() => val, 2000)
  },
})

const mutation = useMutation({
  mutationFn: deleteANote,
  onMutate: () => {
    // can do optimistic update here
  },
  onSuccess: (data: SuccessData, variable, context) => {
    successData.value.success = data.success
    successData.value.message = data.message
    // Invalidate and refetch
    console.log('data', data, variable, context)
    queryClient.invalidateQueries({ queryKey: ['notes'] })
  },
  onError: (error, variable, context) => {
    //if optimistic update is done you can roll back here
    console.log('error', error, 'variable:', variable, 'context', context)
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ['notes'] })
  },
  onSettled: () => {
    //on settled do something
  },
  networkMode: 'offlineFirst',
  staleTime: 8000,
})

// delete this user
function handleDeleteUser() {
  mutation.mutate(note.id)
}
</script>

<template>
  <div class="">
    <div
      v-if="mutation.isError.value && !mutation.isSuccess.value"
      v-html="renderErrorMessageUI(mutation.error, 2000)"
    ></div>
    <div
      v-else-if="
        mutation.isSuccess.value &&
        !mutation.isLoading.value &&
        mutation.data.value?.success
      "
      v-html="
        renderSuccessMessageUI(mutation.data.value?.message, isShowMessage)
      "
    ></div>
  </div>
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
