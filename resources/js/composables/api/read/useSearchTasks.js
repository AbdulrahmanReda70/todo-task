import { ref } from "vue";
import TodoService from "../../../services/TodoService";

export function useSearchTasks() {
    const todoService = new TodoService();
    const searchedTasks = ref([]);
    const searchTasksLoading = ref(false);
    const searchTasksError = ref(null);

    const searchTasks = async (query) => {
        searchTasksLoading.value = true;
        searchTasksError.value = null;
        try {
            searchedTasks.value = await todoService.search(query);
            return searchedTasks.value;
        } catch (err) {
            searchTasksError.value = err;
            throw err;
        } finally {
            searchTasksLoading.value = false;
        }
    };

    return {
        searchedTasks,
        searchTasksLoading,
        searchTasksError,
        searchTasks,
    };
}
