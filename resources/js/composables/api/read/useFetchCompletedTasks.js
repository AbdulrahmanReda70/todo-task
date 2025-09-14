import { ref } from "vue";
import TodoService from "../../../services/TodoService";

export function useFetchCompletedTasks() {
    const todoService = new TodoService();
    const completedTasks = ref([]);
    const fetchCompletedTasksLoading = ref(false);
    const fetchCompletedTasksError = ref(null);

    const fetchCompletedTasks = async () => {
        fetchCompletedTasksLoading.value = true;
        fetchCompletedTasksError.value = null;
        try {
            completedTasks.value = await todoService.getCompleted();
            return completedTasks.value;
        } catch (err) {
            fetchCompletedTasksError.value = err;
            throw err;
        } finally {
            fetchCompletedTasksLoading.value = false;
        }
    };

    return {
        completedTasks,
        fetchCompletedTasksLoading,
        fetchCompletedTasksError,
        fetchCompletedTasks,
    };
}
