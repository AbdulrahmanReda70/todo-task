<template>
    <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-white">
    <body class="h-full">
    ```
  -->
    <div
        class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
    >
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2
                class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
            >
                Create your account
            </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form @submit.prevent="handleRegister" class="space-y-6">
                <div v-if="registerError" class="rounded-md bg-red-50 p-4">
                    <div class="text-sm text-red-700">
                        {{ registerError }}
                    </div>
                </div>

                <div>
                    <label
                        for="email"
                        class="block text-sm/6 font-medium text-gray-900"
                    >
                        Email address
                    </label>
                    <div class="mt-2">
                        <input
                            v-model="form.email"
                            type="email"
                            name="email"
                            id="email"
                            autocomplete="email"
                            required
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                </div>

                <div>
                    <label
                        for="password"
                        class="block text-sm/6 font-medium text-gray-900"
                    >
                        Password
                    </label>
                    <div class="mt-2">
                        <input
                            v-model="form.password"
                            type="password"
                            name="password"
                            id="password"
                            autocomplete="new-password"
                            required
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                </div>

                <div>
                    <label
                        for="password_confirmation"
                        class="block text-sm/6 font-medium text-gray-900"
                    >
                        Confirm Password
                    </label>
                    <div class="mt-2">
                        <input
                            v-model="form.password_confirmation"
                            type="password"
                            name="password_confirmation"
                            id="password_confirmation"
                            autocomplete="new-password"
                            required
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        :disabled="isRegistering"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span v-if="isRegistering">Creating account...</span>
                        <span v-else>Create account</span>
                    </button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm/6 text-gray-500">
                Already have an account?
                {{ " " }}
                <router-link
                    to="/login"
                    class="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                    Sign in
                </router-link>
            </p>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRegister } from "../../composables/api/auth/useRegister";

const { register, isRegistering, registerError } = useRegister();

const form = reactive({
    email: "",
    password: "",
    password_confirmation: "",
});

const handleRegister = async () => {
    try {
        await register(form);
    } catch (error) {
        // Error is handled by the composable
        console.error("Registration failed:", error);
    }
};
</script>
