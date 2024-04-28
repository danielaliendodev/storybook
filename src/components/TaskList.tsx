import { FC } from 'react'
import { Task as TaskInterface } from '../interfaces/Task'
import { Task } from './Task'

interface Props {
    loading: boolean
    tasks: TaskInterface[]
    onArchiveTask: (id: TaskInterface['id']) => void
    onPinTask: (id: TaskInterface['id']) => void
}

export const TaskList: FC<Props> = ({
    loading,
    tasks,
    onPinTask,
    onArchiveTask,
}: any) => {
    const events = {
        onPinTask,
        onArchiveTask,
    }
    const LoadingRow = (
        <div className="loading-item">
            <span className="glow-checkbox" />
            <span className="glow-text">
                <span>Loading</span> <span>cool</span> <span>state</span>
            </span>
        </div>
    )
    if (loading) {
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

    const tasksInOrder = [
        ...tasks.filter((t: any) => t.state === 'TASK_PINNED'),
        ...tasks.filter((t: any) => t.state !== 'TASK_PINNED'),
    ]
    return (
        <div className="list-items">
            {tasksInOrder.map((task) => (
                <Task key={task.id} task={task} {...events} />
            ))}
        </div>
    )
}