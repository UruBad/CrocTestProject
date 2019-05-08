import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import Container from './components/layout/Container'

import Root from './components/layout/Root'
import Header from './components/layout/Header'
import Menu from './components/layout/Menu'
import ElementsPage from './pages/elements'
import NotificationsPage from './pages/notifications'
import SettingsPage from './pages/settings'

const Routes: React.SFC = () => (
  <Root>
    <Header/>
    <Container>
    <Menu/>
    <Switch>
      <Route exact path="/" component={ElementsPage} />
      <Route exact path="/notifications" component={NotificationsPage} />
      <Route exact path="/settings" component={SettingsPage} />
      <Route component={() => <div>Not Found</div>} />
    </Switch>
    </Container>
  </Root>
)

export default Routes
