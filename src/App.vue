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
  <div class="container mx-auto h-screen max-w-3xl relative py-6 space-y-3">
    <header class="w-full mx-3">
      <h1 class="text-2xl xl:text3xl 2xl:text-4xl font-bold my-2">My Notes</h1>
      <div class="w-full flex flex-row justify-between relative">
        <Search v-model="query" />
        <AddNoteBtn :toggle="togglePopup" />
      </div>
    </header>
    <Notes :query="query" />
    <footer class="w-full fixed bottom-3 left-[3%]">&copy; mynotes.2023</footer>
  </div>
  <!-- modal -->
  <Popup v-if="popupTriggers.buttonTrigger" :toggle="togglePopup" />
</template>
