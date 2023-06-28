<script lang="ts" setup>
import { ref } from 'vue'
import { randomColorsGenerator } from '../utils/randomColorsGenerator'
import { useQueryClient, useMutation } from '@tanstack/vue-query'
import { PostANote } from '../type'
import { postANote } from '../api/notes'
import { SuccessData } from '../type'
import {
  renderErrorMessageUI,
  renderSuccessMessageUI,
} from '../utils/messageHandlers'

// errror messge type
// {
//     "error": {
//         "title": [
//             "The title field is required."
//         ],
//         "content": [
//             "The content field is required."
//         ]
//     }
// }
interface ErrorData {
  error: {
    title: string[]
    content: string[]
  }
}

interface Props {
  toggle: (trigger: string) => void
}

const queryClient = useQueryClient()

const color = ref(randomColorsGenerator())
const props = defineProps<Props>()

const noteInfo = ref<PostANote>({
  title: '',
  content: '',
})

const successData = ref<SuccessData>()
const errorData = ref<ErrorData>()

const handleInputTitle = (e: Event) => {
  noteInfo.value.title = e.target.value
}
const handleNotes = (e: Event) => {
  noteInfo.value.content = e.target.value
}

const mutation = useMutation(postANote, {
  onMutate: () => {
    // can do optimistic update here
  },
  onSuccess: (data, variable, context) => {
    if (data)
      // Invalidate and refetch
      console.log('data', data, variable, context)
    queryClient.invalidateQueries({ queryKey: ['notes'] })
  },
  onError: (error: ErrorData, variable, context) => {
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
const handleSumbitNote = () => {
  mutation.mutate(noteInfo.value)
}

// if (mutation.data.value?.error) {
//   errorData.value = mutation.data.value.error
// }

// if (mutation.data.value?.success) {
//   successData.value = mutation.data.value.success
// }
</script>

<template>
  <!-- popup -->
  <!--     
    @click="
      (e:MouseEvent) => {
        props.toggle('buttonTrigger')
      e.stopPropagation()
      }
    "
    -- -->
  <div
    class="fixed top-0 left-0 right-0 bottom-0 z-[99] bg-black/60 flex items-center justify-center"
  >
    <div class="bg-zinc-800 p-8 relative rounded-md shadow-lg space-y-4 w-2/5">
      <h2 class="text-2xl xl:text3xl 2xl:text-4xl font-bold my-2">New Note</h2>
      <div class="my-2">
        <!-- success messages -->
        <div
          v-if="
            mutation.isSuccess.value &&
            !mutation.isLoading.value &&
            mutation.data.value?.success
          "
          v-html="renderSuccessMessageUI(mutation.data.value?.message)"
        ></div>
        <!-- success error messages-->
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
          @input="handleInputTitle"
          name="title"
          placeholder="Title"
        />
        <!-- error part -->
        <div
          v-for="message in mutation.data.value?.error.title"
          class="space-y-2"
        >
          <div
            v-if="mutation.data.value?.error"
            v-html="renderErrorMessageUI(message)"
          ></div>
        </div>
      </div>
      <div class="space-y-2">
        <label for="content" class="font-bold italic" :style="`color:${color}`"
          >note</label
        >
        <textarea
          cols="12"
          rows="6"
          id="content"
          v-model="noteInfo.content"
          @input="handleNotes"
          placeholder="your notes"
          name="content"
          class="w-full font-normal text-base placeholder-gray-400 px-2 h-fit bg-white/10 rounded-sm py-2"
        >
        </textarea>
        <!-- error part -->
        <div
          v-for="message in mutation.data.value?.error.content"
          class="space-y-2"
        >
          <div
            v-if="mutation.data.value?.error"
            v-html="renderErrorMessageUI(message)"
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
          @click="handleSumbitNote"
          class="px-4 py-3 text-sm shadow-md capitalize font-bold rounded-sm transition duration-200 ease-in-out hover:shadow-none hover:opacity-90"
          :style="`background-color: ${color}`"
        >
          add +
        </button>
      </div>
    </div>
  </div>
</template>
