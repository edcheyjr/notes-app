<script setup lang="ts">
import Note from './Note.vue'
import { useQuery } from '@tanstack/vue-query'
import { getAllNotes } from '../api/notes'
import { isProxy, reactive, toRaw, shallowReadonly, ref, computed } from 'vue'
import { Note as NoteType, SuccessData, MessageType } from '../type'
import { randomColorsGenerator } from '../utils/randomColorsGenerator'
import messageHandler from '../utils/messageHandlers'
import Illustration from './NoNotes.vue'
import useRevertDebounceRef from '../hooks/revertDebounce'

interface Props {
  query: string
}

const props = defineProps<Props>()
const color = ref(randomColorsGenerator())
const successData = reactive(
  ref<SuccessData>({
    success: false,
    message: '',
  })
)
const errorData = reactive(ref(''))
const isShowMessage = reactive(useRevertDebounceRef<boolean>(false, 8000))

const { isError, isFetched, isLoading, data, error } = useQuery(['notes'], {
  queryFn: getAllNotes,
  networkMode: 'offlineFirst',
})

const dataReactive = reactive(data)
const filtered = computed(() =>
  dataReactive?.value?.filter((note: NoteType) =>
    note.title.includes(props.query)
  )
)
const copy = shallowReadonly(filtered)
</script>

<template>
  <div class="my-2 px-2" v-if="successData.success">
    <div
      v-html="
        messageHandler(successData.message, MessageType.SUCCESS, isShowMessage)
      "
    ></div>
  </div>

  <div class="mt-2 px-2" v-if="errorData">
    <div
      v-html="messageHandler(errorData, MessageType.ERROR, isShowMessage)"
    ></div>
  </div>
  <section
    :class="`w-full h-[80%] lg:h-[85%] xl:h-[89%] backdrop-blur rounded-xl overflow-x-hidden flex items-center justify-center ${
      data && data?.length > 0 ? 'bg-gray-50/5' : 'bg-transparent'
    }`"
  >
    <div
      class="w-full h-[98%] scrollbar-thin scrollbar-track-violet-500/20 scrollbar-corner-thumb-purple-500/20 scrollbar-thumb-rounded-md lg:scrollbar-thumb-violet-500/90 lg:scroll-smooth overflow-y-auto overflow-x-hidden"
    >
      <div v-if="isFetched" class="h-full w-full pb-4">
        <div
          v-if="data && data?.length < 1"
          class="h-4/5 w-full items-center justify-center flex flex-col space-y-6"
        >
          <p class="text-3xl font-semibold" :style="`color:${color}`">
            No notes found
          </p>
          <div class="w-96 h-96">
            <Illustration :color="color" />
          </div>
        </div>
        <div v-else class="">
          <ul v-for="note in copy?.reverse()" class="flex flex-col">
            <li class="px-2 my-1">
              <Note
                :note="isProxy(note) ? toRaw(note) : note"
                v-bind="note"
                :key="note.id"
                @success="successData = $event"
                @error="errorData = $event"
                @showMessage="isShowMessage = $event"
              />
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
    </div>
  </section>
</template>
