import { ref } from "vue";
import TodoService from "../../services/TodoService";

export function useFetchTaskById() {
    const todoService = new TodoService();
    const taskById = ref(null);
    const fetchTaskByIdLoading = ref(false);
    const fetchTaskByIdError = ref(null);

    const fetchTaskById = async (id) => {
        fetchTaskByIdLoading.value = true;
        fetchTaskByIdError.value = null;
        try {
            taskById.value = await todoService.getById(id);
            return taskById.value;
        } catch (err) {
            fetchTaskByIdError.value = err;
            throw err;
        } finally {
            fetchTaskByIdLoading.value = false;
        }
    };

    return {
        taskById,
        fetchTaskByIdLoading,
        fetchTaskByIdError,
        fetchTaskById,
    };
}
