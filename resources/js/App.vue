<script setup>
import { ref, onMounted } from "vue";
import { useFetchAllTasks } from "./composables/read/useFetchAllTasks";
import { useFetchTaskById } from "./composables/read/useFetchTaskById";

const { fetchAllTasks, allTasks, fetchAllTasksLoading } = useFetchAllTasks();
const { fetchTaskById, fetchTaskByIdError, fetchTaskByIdLoading, taskById } =
    useFetchTaskById();
onMounted(async () => {
    fetchAllTasks();
});
</script>

<template>
    <div>
        <h2>Tasks</h2>
        <p v-if="fetchAllTasksLoading">Loading...</p>
        <ul v-else>
            <li v-for="t in allTasks" :key="t.id">
                {{ t.title }}
            </li>
        </ul>
    </div>

    <div>
        <p v-if="fetchTaskByIdLoading">Loading.VVVV..</p>
        <p v-else-if="taskById">{{ taskById?.title }}</p>
    </div>
    <button @click="fetchTaskById(3)">fetch Post id = 3</button>
</template>
