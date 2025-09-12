import { ref } from "vue";
import TodoService from "../../services/TodoService";

export function useFetchAllTasks() {
    const todoService = new TodoService();
    const allTasks = ref([]);
    const fetchAllTasksLoading = ref(false);
    const fetchAllTasksError = ref(null);

    const fetchAllTasks = async () => {
        fetchAllTasksLoading.value = true;
        fetchAllTasksError.value = null;
        try {
            allTasks.value = await todoService.getAll();
            return allTasks.value;
        } catch (err) {
            fetchAllTasksError.value = err;
            throw err;
        } finally {
            fetchAllTasksLoading.value = false;
        }
    };

    return {
        allTasks,
        fetchAllTasksLoading,
        fetchAllTasksError,
        fetchAllTasks,
    };
}
