import * as React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Store } from 'redux'
import { History } from 'history'

import Routes from './routes'
import { ApplicationState } from './store'
import LayoutContainer from './containers/layout'

interface MainProps {
  store: Store<ApplicationState>
  history: History
}

const Main: React.FC<MainProps> = ({ store, history }) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <LayoutContainer>
          {() => (
              <Routes />
          )}
        </LayoutContainer>
      </ConnectedRouter>
    </Provider>
  )
}

export default Main
