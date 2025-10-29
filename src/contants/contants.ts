type Tasks = {
    id: number
    task: string,
    description: string,
    list: string,
    dueDate: string
    completed: boolean
}

export const tasksList: Tasks[] = [
    {
        id: 1,
        task:        "Create landing page design",
        description: "Wireframe the landing page and hand off to the UI team",
        list:        "Personal",
        dueDate:     "2025-10-01",
        completed: false,
    },
    {
        id: 2,
        task:        "Write unit tests for auth module",
        description: "Add coverage for sign‑in/out flow and token refresh",
        list:        "Work",
        dueDate:     "2025-09-20",
        completed: true,
    },
    {
        id: 3,
        task:        "Deploy staging build",
        description: "Push latest commit to GH Actions pipeline and verify CI",
        list:        "Work",
        dueDate:     "2025-09-25",
        completed: false
    },
    {
        id: 4,
        task:        "Review PR #42",
        description: "Check the feature flag implementation and suggest improvements",
        list:        "Work",
        dueDate:     "2025-09-23",
        completed: true
    },
    {
        id: 5,
        task:        "Review Unmerged PR ",
        description: "Check the feature flag implementation and suggest improvements",
        list:        "Work",
        dueDate:     "2025-09-23",
        completed: false
    }
];  