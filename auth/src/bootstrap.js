import React from 'react'
import ReactDOM from 'react-dom'
import { createMemoryHistory, createBrowserHistory } from 'history'
import App from './App'

// Mount function to startup the app
const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    })

    if (onNavigate) {
        history.listen(onNavigate);
    }

    ReactDOM.render(<App history={history} />, el)

    return {
        onParentNavigate({ pathname: nextPathname }) {
            const { pathname } = history.location

            if (pathname !== nextPathname) {
                history.push(nextPathname)
            }
        },
    }
}

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_auth-dev-root')
    if (devRoot) {
        var history = createBrowserHistory();
        const { pathname: initialPath } = history.location
        mount(devRoot, { initialPath, defaultHistory: history })
    }
}

// If we are running through container
// and we should export the mount function
export { mount }