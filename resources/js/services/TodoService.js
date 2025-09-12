import api from "./api";

class TodoService {
    async getAll() {
        return (await api.get("/tasks")).data;
    }

    async getById(id) {
        return (await api.get(`/tasks/${id}`)).data;
    }

    async create(task) {
        return (await api.post("/tasks", task)).data;
    }

    async update(id, task) {
        return (await api.put(`/tasks/${id}`, task)).data;
    }

    async delete(id) {
        return (await api.delete(`/tasks/${id}`)).data;
    }

    async search(query) {
        return (await api.get("/tasks/search", query)).data;

        /*
        Example query object
        {
            keyword: 'some keyword',
            status: 'completed' | 'pending' | 'in-progress',
            due_date: ...
        }
        */
    }
}

export default TodoService;
