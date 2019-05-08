import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, Route, Switch } from 'react-router-dom'

import ElementsIndexPage from './elements/index'
import ElementIndexPage from './elements/element'

import { ApplicationState, ConnectedReduxProps } from '../store'

interface PropsFromState {
  loading: boolean
  errors?: string
}

type AllProps = PropsFromState & RouteComponentProps<{}> & ConnectedReduxProps

class ElementsPage extends React.Component<AllProps> {
  public render() {
    const { match } = this.props

    return (
      <Switch>
        <Route exact path={match.path + '/'} component={ElementsIndexPage} />
        <Route path={match.path + '/:id'} component={ElementIndexPage} />
      </Switch>
    )
  }
}

const mapStateToProps = ({ elements }: ApplicationState) => ({
  loading: elements.loading,
  errors: elements.errors
})


export default connect(mapStateToProps)(ElementsPage)
