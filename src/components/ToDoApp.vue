<script setup lang="ts">
import { ref } from 'vue';

interface ToDo {
  id: number,
  text: string,
  completed: boolean
}

const defToDo: ToDo = {
  id: 1,
  text: 'Learn Vue.js 3',
  completed: false
}

const todos = ref<ToDo[]>([defToDo])
</script>

<template>
  <div>
    <div v-for="todo in todos" :key="todo.id" data-test="todo">
      {{ todo.text }}
    </div>

    <form data-test="new-todo"
  </div>
</template>