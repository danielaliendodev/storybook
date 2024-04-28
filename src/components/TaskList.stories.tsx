import { FC, ReactNode } from 'react'
import { TaskList } from './TaskList'
import * as TaskStories from './Task.stories'

import { Provider } from 'react-redux'
import { configureStore, createSlice } from '@reduxjs/toolkit'
import { Task } from '../interfaces/Task'

// A super-simple mock of the state of the store
export const MockedState = {
    tasks: [
        { ...TaskStories.Default.args.task, id: '1', title: 'Task 1' },
        { ...TaskStories.Default.args.task, id: '2', title: 'Task 2' },
        { ...TaskStories.Default.args.task, id: '3', title: 'Task 3' },
        { ...TaskStories.Default.args.task, id: '4', title: 'Task 4' },
        { ...TaskStories.Default.args.task, id: '5', title: 'Task 5' },
        { ...TaskStories.Default.args.task, id: '6', title: 'Task 6' },
    ],
    status: 'idle',
    error: null,
}

// A super-simple mock of a redux store

interface Props {
    taskboxState: any
    children: ReactNode
}

const Mockstore: FC<Props> = ({ taskboxState, children }) => (
    <Provider
        store={configureStore({
            reducer: {
                taskbox: createSlice({
                    name: 'taskbox',
                    initialState: taskboxState,
                    reducers: {
                        updateTaskState: (state, action) => {
                            const { id, newTaskState } = action.payload
                            const task = state.tasks.findIndex(
                                (task: Task) => task.id === id,
                            )
                            if (task >= 0) {
                                state.tasks[task].state = newTaskState
                            }
                        },
                    },
                }).reducer,
            },
        })}
    >
        {children}
    </Provider>
)

export default {
    component: TaskList,
    title: 'TaskList',
    decorators: [
        (story: any) => <div style={{ padding: '3rem' }}>{story()}</div>,
    ],
    tags: ['autodocs'],
    excludeStories: /.*MockedState$/,
}

export const Default = {
    decorators: [
        (story: any) => (
            <Mockstore taskboxState={MockedState}>{story()}</Mockstore>
        ),
    ],
}

export const WithPinnedTasks = {
    decorators: [
        (story: any) => {
            const pinnedtasks = [
                ...MockedState.tasks.slice(0, 5),
                { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' },
            ]

            return (
                <Mockstore
                    taskboxState={{
                        ...MockedState,
                        tasks: pinnedtasks,
                    }}
                >
                    {story()}
                </Mockstore>
            )
        },
    ],
}

export const Loading = {
    decorators: [
        (story: any) => (
            <Mockstore
                taskboxState={{
                    ...MockedState,
                    status: 'loading',
                }}
            >
                {story()}
            </Mockstore>
        ),
    ],
}

export const Empty = {
    decorators: [
        (story: any) => (
            <Mockstore
                taskboxState={{
                    ...MockedState,
                    tasks: [],
                }}
            >
                {story()}
            </Mockstore>
        ),
    ],
}
