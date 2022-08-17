import {useCallback, useEffect, useMemo, useRef, useState} from "react";

export interface TimeStorage {
    remove(key: string): void

    get(key: string): number | null

    set(key: string, time: number): void
}

const timeLocalStorage: TimeStorage = {
    remove(key: string) {
        localStorage.removeItem(key)
    },
    set(key: string, time: number) {
        localStorage.setItem(key, time.toString())
    },
    get(key: string): number | null {
        const time = localStorage.getItem(key)
        return time ? parseInt(time) : null
    }
}

export interface UseCountdownResult {
    daysLeft: number
    hoursLeft: number
    minutesLeft: number
    secondsLeft: number
    isCompleted: boolean
    clearTimer: () => void
    resetTimer: () => boolean
}

const useCountdown = (key: string, durationOrDate: number | Date, options?: {
    storage: TimeStorage
}): UseCountdownResult => {
    const storage = options?.storage || timeLocalStorage
    const [timeLeft, setTimeLeft] = useState(0);
    const timerRef = useRef<NodeJS.Timer>();
    const [endTime, setEndTime] = useState<number | null>(
        storage.get(key) || (typeof durationOrDate === "object" ? durationOrDate.getTime() : null));
    const resetTimer = useMemo<(() => boolean)>(() => {
        return (typeof durationOrDate === "number") ? () => {
            const endTime = durationOrDate + Date.now()
            storage.set(key, endTime)
            setEndTime(endTime)
            return true
        } : () => false
    }, [durationOrDate, key, storage])
    const clearTimer = useCallback(() => {
        timerRef.current && clearInterval(timerRef.current)
        storage.remove(key)
    }, [key, storage])
    const updateTimeLeft = useMemo<() => boolean>(() => {
        return () => {
            if (!endTime) {
                return true
            }
            const timeLeft = Math.max(endTime - Date.now(), 0)
            const isCompleted = timeLeft === 0
            if (isCompleted) {
                storage.remove(key)
            }
            setTimeLeft(timeLeft)
            return isCompleted
        }
    }, [endTime, key, storage])
    useEffect(() => {
        if (!updateTimeLeft()) {
            const ref = setInterval(() => {
                updateTimeLeft() && clearInterval(ref)
            }, 1000)
            timerRef.current = ref
            return () => clearInterval(ref)
        }
    }, [updateTimeLeft])
    return {
        secondsLeft: Math.floor((timeLeft / 1000) % 60),
        minutesLeft: Math.floor((timeLeft / (1000 * 60)) % 60),
        hoursLeft: Math.floor((timeLeft / (1000 * 60 * 60)) % 24),
        daysLeft: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
        isCompleted: timeLeft === 0,
        resetTimer, clearTimer
    }
}

export default useCountdown