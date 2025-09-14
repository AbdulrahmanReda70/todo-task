import { ref } from "vue";
import TodoService from "../../../services/TodoService";

export function useFetchInProgressTasks() {
    const todoService = new TodoService();
    const inProgressTasks = ref([]);
    const fetchInProgressTasksLoading = ref(false);
    const fetchInProgressTasksError = ref(null);

    const fetchInProgressTasks = async () => {
        fetchInProgressTasksLoading.value = true;
        fetchInProgressTasksError.value = null;
        try {
            inProgressTasks.value = await todoService.getInProgress();
            return inProgressTasks.value;
        } catch (err) {
            fetchInProgressTasksError.value = err;
            throw err;
        } finally {
            fetchInProgressTasksLoading.value = false;
        }
    };

    return {
        inProgressTasks,
        fetchInProgressTasksLoading,
        fetchInProgressTasksError,
        fetchInProgressTasks,
    };
}
