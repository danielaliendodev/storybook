import { FC } from 'react'
import { Task as TaskInterface, TaskState } from '../interfaces/Task'
import { Task } from './Task'
import { useSelector } from 'react-redux'
import { updateTaskState, useAppDispatch, useAppSelector } from '../lib/store'

export const TaskList: FC = () => {
    const dispatch = useAppDispatch()

    // We're retrieving our state from the store
    const tasks = useAppSelector((state) => {
        const tasksInOrder = [
            ...state.taskbox.tasks.filter(
                (t: TaskInterface) => t.state === TaskState.TASK_PINNED,
            ),
            ...state.taskbox.tasks.filter(
                (t: TaskInterface) => t.state !== TaskState.TASK_PINNED,
            ),
        ]
        const filteredTasks = tasksInOrder.filter(
            (t) =>
                t.state === TaskState.TASK_INBOX ||
                t.state === TaskState.TASK_PINNED,
        )
        return filteredTasks
    })

    const { status } = useSelector((state: any) => state?.taskbox)

    const pinTask = (value: TaskInterface['id']) => {
        // We're dispatching the Pinned event back to our store

        const currentState = tasks.find(task => task.id === value)?.state
        
        dispatch(updateTaskState({
             id: value, 
            newTaskState: currentState !== TaskState.TASK_PINNED 
                ? TaskState.TASK_PINNED
                : TaskState.TASK_INBOX
         }))
    }

    const archiveTask = (value: TaskInterface['id']) => {
        // We're dispatching the Archive event back to our store
        dispatch(updateTaskState({ id: value, newTaskState: TaskState.TASK_ARCHIVED }))
    }

    const LoadingRow = (
        <div className="loading-item">
            <span className="glow-checkbox" />
            <span className="glow-text">
                <span>Loading</span> <span>cool</span> <span>state</span>
            </span>
        </div>
    )

    if (status === 'loading') {
        return (
            <div className="list-items" data-testid="loading" key={'loading'}>
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
            </div>
        )
    }

    if (tasks.length === 0) {
        return (
            <div className="list-items" key={'empty'} data-testid="empty">
                <div className="wrapper-message">
                    <span className="icon-check" />
                    <p className="title-message">You have no tasks</p>
                    <p className="subtitle-message">Sit back and relax</p>
                </div>
            </div>
        )
    }

    return (
        <div className="list-items" data-testid="success" key={'success'}>
            {tasks.map((task) => (
                <Task
                    key={task.id}
                    task={task}
                    onPinTask={(task) => pinTask(task)}
                    onArchiveTask={(task) => archiveTask(task)}
                />
            ))}
        </div>
    )
}
