import React, { useEffect } from 'react'

import { fetchTasks, useAppDispatch, useAppSelector } from '../lib/store'

import { TaskList } from './TaskList'

export default function InboxScreen() {
    const dispatch = useAppDispatch()

    const { error } = useAppSelector((state) => state.taskbox)

    useEffect(() => {
        dispatch(fetchTasks())
    }, [dispatch])

    if (error) {
        return (
            <div className="page lists-show">
                <div className="wrapper-message">
                    <span className="icon-face-sad" />
                    <p className="title-message">Oh no!</p>
                    <p className="subtitle-message">Something went wrong</p>
                </div>
            </div>
        )
    }
    return (
        <div className="page lists-show">
            <nav>
                <h1 className="title-page">Taskbox</h1>
            </nav>
            <TaskList />
        </div>
    )
}
