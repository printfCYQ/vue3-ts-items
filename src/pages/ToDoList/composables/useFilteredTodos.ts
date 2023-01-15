import { computed, Ref, ref } from "vue";
import { ToDoItem } from "./useTodos";

export default function useFilteredTodos(todos: Ref) {
  const filter = ref("all");

  // 过滤 todo
  const filteredTodos = computed(() => {
    switch (filter.value) {
      case "done":
        return todos.value.filter((todo: ToDoItem) => todo.completed);
      case "todo":
        return todos.value.filter((todo: ToDoItem) => !todo.completed);
      default:
        return todos.value;
    }
  });

  return { filter, filteredTodos };
}
