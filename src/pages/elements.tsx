import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, Route, Switch } from 'react-router-dom'

import ElementsIndexPage from './elements/index'

import { ApplicationState, ConnectedReduxProps } from '../store'
import { IElement } from '../store/elements/types'

interface PropsFromState {
  elements: IElement[]
}

type AllProps = PropsFromState & RouteComponentProps<{}> & ConnectedReduxProps

class ElementsPage extends React.Component<AllProps> {
  public render() {
    const { match } = this.props

    return (
      <Switch>
        <Route exact path={match.path + '/'} component={ElementsIndexPage} />
      </Switch>
    )
  }
}

const mapStateToProps = (store: ApplicationState) => ({
  data: store.elements
})

export default connect(mapStateToProps)(ElementsPage)
