<template>
  <div class="todo-list">
    <TodoListItem v-for="todo in todos" :key="todo.id" @change-state="todo.completed = $event.target.checked"
      :todo-item="todo" />
  </div>
</template>

<script setup lang="ts">

import { ToDoItem } from "../composables/useTodos";
import TodoListItem from "./TodoListItem.vue";

defineProps({
  todos: {
    type: Array<ToDoItem>,
    default: () => [],
  },
});
</script>

<style>
.todo-list {
  display: grid;
  row-gap: 14px;
}
</style>
