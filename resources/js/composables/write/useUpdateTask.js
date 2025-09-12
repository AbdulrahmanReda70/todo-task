import { ref } from "vue";
import TodoService from "../../services/TodoService";

export function useUpdateTask() {
    const todoService = new TodoService();
    const updatedTask = ref(null);
    const updateTaskLoading = ref(false);
    const updateTaskError = ref(null);

    const updateTask = async (id, taskData) => {
        updateTaskLoading.value = true;
        updateTaskError.value = null;
        try {
            updatedTask.value = await todoService.update(id, taskData);
            return updatedTask.value;
        } catch (err) {
            updateTaskError.value = err;
            throw err;
        } finally {
            updateTaskLoading.value = false;
        }
    };

    return {
        updatedTask,
        updateTaskLoading,
        updateTaskError,
        updateTask,
    };
}
