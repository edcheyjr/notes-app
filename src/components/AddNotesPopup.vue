<script lang="ts" setup>
import { ref } from 'vue'
import { randomColorsGenerator } from '../utils/randomColorsGenerator'
import { useQueryClient, useMutation } from '@tanstack/vue-query'
import { DataError, MessageType, PostANote } from '../type'
import { postANote } from '../api/notes'
import messageHandler from '../utils/messageHandlers'
// import useDebouncedRef from '../hooks/debounce'

// errror messge type

interface Props {
  toggle: (trigger: 'buttonTrigger' | 'timedTrigger', state?: boolean) => void
}

const queryClient = useQueryClient()

const color = ref(randomColorsGenerator())
const props = defineProps<Props>()
// const isShowMessage = reactive(useDebouncedRef<boolean>(true, 2000))

const noteInfo = ref<PostANote>({
  title: '',
  content: '',
})

const mutation = useMutation({
  mutationFn: postANote,
  cacheTime: 200,
  networkMode: 'offlineFirst',
  onMutate: () => {
    // can do optimistic update here
  },
  onSuccess: (data, variable, context) => {
    if (data)
      // Invalidate and refetch
      console.log('data', data, variable, context)
    queryClient.invalidateQueries({ queryKey: ['notes'] })
  },
  onError: (error: DataError, variable, context) => {
    //if optimistic update is done you can roll back here
    console.log('error', error, 'variable:', variable, 'context', context)
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ['notes'] })
  },
  onSettled: () => {
    //on settled do something
  },
})

//handle submission of notes

const handleSumbitNote = (e: Event) => {
  e.preventDefault()
  mutation.mutate(noteInfo.value)
  // clear inputs from  addNoteForm
  noteInfo.value = {
    title: '',
    content: '',
  }
  // isShowMessage.value = false

  //FIXME: the after few 2 sec go back
  // setTimeout(() => {
  //   setInterval(() => {
  //     queryClient.invalidateQueries({ queryKey: ['notes'] })
  //     console.log('revalidated the date')
  //   }, 2000)
  //   props.toggle('timedTrigger', false)
  // }, 10000)
}
</script>

<template>
  <div
    class="fixed top-0 left-0 right-0 bottom-0 z-[99] bg-black/60 flex items-center justify-center"
  >
    <div class="bg-zinc-800 p-8 relative rounded-md shadow-lg space-y-4 w-2/5">
      <h2 class="text-2xl xl:text3xl 2xl:text-4xl font-bold my-2">New Note</h2>
      <form
        ref="addNotesForm"
        @submit.prevent="handleSumbitNote"
        @keypress.enter="handleSumbitNote"
        class="space-y-4"
      >
        <div
          class="my-2"
          v-if="mutation.isSuccess && mutation.data.value?.success"
        >
          <div
            v-html="
              messageHandler(
                mutation.data.value?.message,
                MessageType.SUCCESS,
                true
              )
            "
          ></div>
        </div>
        <div class="space-y-2">
          <label for="title" class="font-bold italic" :style="`color:${color}`"
            >title</label
          >
          <input
            type="text"
            class="bg-white/10 font-normal text-base rounded-sm px-2 placeholder-gray-400 w-full py-2 mt-2"
            id="title"
            v-model="noteInfo.title"
            name="title"
            placeholder="Title"
          />
          <!-- error part -->
          <div
            v-if="mutation.data.value?.error"
            v-for="message in mutation.data.value?.error.title"
            class="space-y-2"
          >
            <div
              v-html="messageHandler(message, MessageType.ERROR, true)"
            ></div>
          </div>
        </div>
        <div class="space-y-2">
          <label
            for="content"
            class="font-bold italic"
            :style="`color:${color}`"
            >note</label
          >
          <textarea
            cols="12"
            rows="6"
            id="content"
            v-model="noteInfo.content"
            placeholder="your notes"
            name="content"
            class="w-full font-normal text-base placeholder-gray-400 px-2 h-fit bg-white/10 rounded-sm py-2"
          >
          </textarea>
          <!-- error part -->
          <div
            v-if="mutation.data.value?.error"
            v-for="message in mutation.data.value?.error.content"
            class="space-y-2"
          >
            <div
              v-html="messageHandler(message, MessageType.ERROR, true)"
            ></div>
          </div>
        </div>
        <div class="flex flex-row space-x-2">
          <button
            @click="
              () => {
                props.toggle('buttonTrigger')
              }
            "
            class="bg-white/20 shadow-md hover:bg-red-300/30 px-4 py-3 text-sm capitalize font-bold rounded-sm transition duration-200 ease-in-out hover:shadow-none"
          >
            close
          </button>
          <button
            type="submit"
            class="px-4 py-3 text-sm shadow-md capitalize font-bold rounded-sm transition duration-200 ease-in-out hover:shadow-none hover:opacity-90"
            :style="`background-color: ${color}`"
          >
            add +
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
