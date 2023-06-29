<script lang="ts" setup>
import { ref } from 'vue'

import Notes from './components/Notes.vue'
import AddNoteBtn from './components/AddNoteBtn.vue'
import Popup from './components/AddNotesPopup.vue'
import Search from './components/Search.vue'
import { Triggers } from './type'

const query = ref<string>('')

const popupTriggers = ref<Triggers>({
  buttonTrigger: false,
  timedTrigger: false,
})

const togglePopup = (trigger: string, state?: boolean) => {
  if (state) {
    popupTriggers.value[trigger] = state
  }
  if (trigger == 'buttonTrigger') {
    popupTriggers.value[trigger] = !popupTriggers.value[trigger]
  }
}
</script>

<template>
  <div class="container mx-auto h-screen max-w-3xl relative py-6">
    <header class="w-full mx-3">
      <h1 class="text-2xl xl:text3xl 2xl:text-4xl font-bold my-2">My Notes</h1>
      <div class="w-full flex flex-row justify-between relative px-3">
        <Search v-model="query" />
        <AddNoteBtn :toggle="togglePopup" />
      </div>
    </header>
    <section
      class="w-full h-[80%] lg:h-[85%] xl:h-[89%] mt-6 scrollbar-thin scrollbar-track-violet-500/20 scrollbar-corner-thumb-purple-500/20 scrollbar-thumb-rounded-md lg:scrollbar-thumb-violet-500/90 scrollbar-track-rounded-full lg:scroll-smooth overflow-y-auto"
    >
      <Notes :query="query" />
    </section>
    <footer class="w-full absolute bottom-1">&copy; mynotes.2023</footer>
  </div>
  <!-- modal -->
  <Popup v-if="popupTriggers.buttonTrigger" :toggle="togglePopup" />
</template>
