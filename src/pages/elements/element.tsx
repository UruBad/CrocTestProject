import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'

import { ApplicationState, ConnectedReduxProps } from '../../store'
import { selectElement, clearSelected } from '../../store/elements/actions'
import { IElement } from '../../store/elements/types'
import { Dispatch } from 'redux'

interface PropsFromState {
  loading: boolean
  selected?: IElement
  errors?: string
}

interface PropsFromDispatch {
  selectElement: typeof selectElement
  clearSelected: typeof clearSelected
}

interface RouteParams {
  id: string
}

type AllProps = PropsFromState &
PropsFromDispatch &
RouteComponentProps<RouteParams> &
ConnectedReduxProps

class ElementIndexPage extends React.Component<AllProps> {
  public componentDidMount() {
    const { match } = this.props

    this.props.selectElement(match.params.id)
  }

  public componentWillUnmount() {
    this.props.clearSelected()
  }

  public render() {
    const { selected } = this.props

    console.log(selected, 'selected');

    return (
      <div className='result'>
      {selected && (
        <div className="element">
        <div className="name">
        Название: {selected.name}
        </div>
        <div className="author">
        Автор: {selected.Author && selected.Author.username}
        </div>
        <div className="author">
        Автор: {selected.Type && selected.Type.name}
        </div>
        <div className="tags">
        Теги: {selected.Tags && selected.Tags.map(tag => {
          return (
            <span>{tag.name}</span>
            );
        }) }
        </div>
        <div className="previews">
        {selected.Previews && selected.Previews.map(preview => {
          return (
            <img src={preview.url} />
            );
        }) }
        </div>
        </div>
        
        )}</div>
      )
  }
}

const mapStateToProps = ({ elements, authors, types, tags, previews }: ApplicationState) => {
  return {
    loading: elements.loading,
    errors: elements.errors,
    selected: elements.selected
  };
}

const mapDispatchToProps = {
  selectElement,
  clearSelected
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(ElementIndexPage)