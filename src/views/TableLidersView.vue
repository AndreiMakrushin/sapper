<script setup>
import { ref } from 'vue'
  const liders = JSON.parse(localStorage.getItem('player'))
  const sortLiders = ref([])

  if (liders) {
    sortLiders.value = liders.sort((a, b) => {
      const timeA = new Date(`2000-01-01T${a.time}`);
      const timeB = new Date(`2000-01-01T${b.time}`);
      return timeA - timeB;
    });
  }
</script>

<template>
  <div>
    <div v-if="sortLiders.length > 0">
      <div class="liders" v-for="lider in sortLiders.slice(0, 10)" :key="lider.id">
        {{ lider }}
      </div>
    </div>
    <div v-else>
     Эта таблица пустая
    </div>
  </div>
</template>
