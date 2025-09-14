import { ref } from "vue";
import TodoService from "../../../services/TodoService";

export function useFetchPendingTasks() {
    const todoService = new TodoService();
    const pendingTasks = ref([]);
    const fetchPendingTasksLoading = ref(false);
    const fetchPendingTasksError = ref(null);

    const fetchPendingTasks = async () => {
        fetchPendingTasksLoading.value = true;
        fetchPendingTasksError.value = null;
        try {
            pendingTasks.value = await todoService.getPending();
            return pendingTasks.value;
        } catch (err) {
            fetchPendingTasksError.value = err;
            throw err;
        } finally {
            fetchPendingTasksLoading.value = false;
        }
    };

    return {
        pendingTasks,
        fetchPendingTasksLoading,
        fetchPendingTasksError,
        fetchPendingTasks,
    };
}
