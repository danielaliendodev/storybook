import { TaskState } from '../interfaces/Task'
import { Task } from './Task'

export default {
    component: Task,
    title: 'Task',
    tags: ['autodocs'],
}

export const Default = {
    args: {
        task: {
            id: '1',
            title: 'Test Task',
            state: TaskState.TASK_INBOX,
        },
    },
}

export const Pinned = {
    args: {
        task: { 
            ...Default.args.task,
            id: '2',
            state: TaskState.TASK_PINNED,
        },
    },
}

export const Archived = {
    args: {
        task: {
            ...Default.args.task,
            id: '3',
            state: TaskState.TASK_ARCHIVED,
        },
    },
}
