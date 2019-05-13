import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'

import Loading from '../../components/common/Loading'

import { ApplicationState, ConnectedReduxProps } from '../../store'
import { selectElement, clearSelected } from '../../store/elements/actions'
import { IElement, ElementPayload } from '../../store/elements/types'
import { Dispatch } from 'redux'

interface PropsFromState {
  loading: boolean
  selected?: ElementPayload
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
    const { loading, selected } = this.props;
    let author, type, tags, previews;

    if(selected && selected.element){
      author = selected.authors && selected.authors.find(findItem => {return findItem.id === selected.element.author});
      type = selected.types && selected.types.find(findItem => {return findItem.id === selected.element.type});
      tags = selected.tags && selected.tags.filter(findItem => {return selected.element.tags.includes(findItem.id)});
      previews = selected.previews && selected.previews.filter(findItem => {return selected.element.previews.includes(findItem.id)});
    }

    return (
      <div className='result'>
      {loading && (
        <Loading />
        )}
      {selected && selected.element && (
        <div className="element">
        <div className="name">
        Название: {selected.element.name}
        </div>
        <div className="author">
        Автор: {author && author.username}
        </div>
        <div className="author">
        Тип: {type && type.name}
        </div>
        <div className="tags">
        Теги: {tags && tags.map(tag => {
          return (
            <span>{tag.name}</span>
            );
        }) }
        </div>
        <div className="previews">
        {previews && previews.map(preview => {
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

const mapStateToProps = ({ elements }: ApplicationState) => {
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