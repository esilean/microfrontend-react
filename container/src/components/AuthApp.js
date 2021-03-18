import React, { useRef, useEffect } from 'react'
import { mount } from 'auth/AuthApp'
import { useHistory } from 'react-router-dom'

export default ({ onSignIn }) => {
    const ref = useRef(null)
    const history = useHistory();
    const { pathname: initialPath } = history.location

    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            initialPath: initialPath,
            onNavigate: ({ pathname: nextPathname }) => {
                const { pathname } = history.location

                if (pathname !== nextPathname) {
                    history.push(nextPathname)
                }
            },
            onSignIn: () => {
                onSignIn()
            }
        })

        history.listen(onParentNavigate)
    }, [])

    return <div ref={ref} />
}