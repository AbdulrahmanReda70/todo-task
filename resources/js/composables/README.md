# Composables Structure

## Why Each Hook Has Its Own File instead of a Single File for all?

-   **Avoid Naming Conflicts:**
    When using multiple hooks in the same Vue component, generic names like `loading`, `error`, or `execute` can easily clash. By giving each hook its own file and self-contained variable names, you can safely use many hooks together without conflicts.

-   **Single Responsibility Principle:**
    Each composable file does one thing (fetch all tasks, fetch by ID, create, update, delete, search, etc.), making the code easier to understand, maintain, and test.

-   **Scalability:**
    As your app grows, you can add more hooks for new API endpoints or features without refactoring existing code or worrying about naming collisions.

-   **Reusability:**
    Each hook is independent and can be imported wherever needed, making your codebase more modular and flexible.

-   **Consistency:**
    All hooks follow the same pattern: one file per API call, with clear, descriptive variable and function names.
