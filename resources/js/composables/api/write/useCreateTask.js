import { ref } from "vue";
import TodoService from "../../../services/TodoService";

export function useCreateTask() {
    const todoService = new TodoService();
    const createdTask = ref(null);
    const createTaskLoading = ref(false);
    const createTaskError = ref(null);

    const createTask = async (newTask) => {
        createTaskLoading.value = true;
        createTaskError.value = null;
        try {
            createdTask.value = await todoService.create(newTask);
            return createdTask.value;
        } catch (err) {
            createTaskError.value = err;
            throw err;
        } finally {
            createTaskLoading.value = false;
        }
    };

    return {
        createdTask,
        createTaskLoading,
        createTaskError,
        createTask,
    };
}
