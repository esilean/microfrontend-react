import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'

import Header from './components/Header'
import Progress from './components/Progress'

const AuthAppLazy = lazy(() => import('./components/AuthApp'))
const MarketingAppLazy = lazy(() => import('./components/MarketingApp'))

const generateClassName = createGenerateClassName({
    productionPrefix: 'ctn'
})

export default () => {
    return (
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header />
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path='/auth' component={AuthAppLazy}></Route>
                            <Route path='/' component={MarketingAppLazy}></Route>
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </BrowserRouter>
    )
}