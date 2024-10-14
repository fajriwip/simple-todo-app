import { type AppState } from "./state/AppStateReducer";
import { load } from "./api";
import React, { useEffect, useState } from "react";

type injectedProps = {
    initialState: AppState
}

type PropsWithoutInjected<TBaseProps> = Omit<
    TBaseProps, keyof injectedProps
>

export function withInitialState<TProps>(
    WrappedComponent: React.ComponentType<PropsWithoutInjected<TProps> & injectedProps>
) {
    return (props: PropsWithoutInjected<TProps>) => {
        const [initialState, setInitialState] = useState<AppState>({
            lists: [],
            draggedItem: null
        })

        const [isLoading, setIsLoading] = useState(true)
        const [error, setError] = useState<Error | undefined>()

        useEffect(() => {
            const fetchInitialState = async () => {
                try {
                    const data = await load()
                    setInitialState(data)
                } catch (error) {
                    if (error instanceof Error) {
                        setError(error)
                    }
                }
                setIsLoading(false)
            }

            fetchInitialState()
        }, [])

        if (isLoading) {
            return <div>Loading...</div>
        }

        if (error) {
            return <div>{error.message}</div>
        }

        return <WrappedComponent
            initialState={initialState}
            {...props} />
    }
}