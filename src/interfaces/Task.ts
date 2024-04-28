export interface Task {
    id: string
    title: string
    state: string
}

export enum TaskState {
    TASK_INBOX = 'TASK_INBOX',
    TASK_PINNED = 'TASK_PINNED',
    TASK_ARCHIVED = 'TASK_ARCHIVED',
}
