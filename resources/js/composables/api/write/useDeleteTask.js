import { ref } from "vue";
import TodoService from "../../services/TodoService";

export function useDeleteTask() {
    const todoService = new TodoService();
    const deleteTaskLoading = ref(false);
    const deleteTaskError = ref(null);
    const deleteTaskSuccess = ref(false);

    const deleteTask = async (id) => {
        deleteTaskLoading.value = true;
        deleteTaskError.value = null;
        deleteTaskSuccess.value = false;
        try {
            await todoService.delete(id);
            deleteTaskSuccess.value = true;
            return true;
        } catch (err) {
            deleteTaskError.value = err;
            throw err;
        } finally {
            deleteTaskLoading.value = false;
        }
    };

    return {
        deleteTaskLoading,
        deleteTaskError,
        deleteTaskSuccess,
        deleteTask,
    };
}
