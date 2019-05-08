import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import Pagination from "react-js-pagination";

import { IAuthor } from '../../store/elements/authors/types'
import { IType } from '../../store/elements/types/types'

import { ApplicationState, ConnectedReduxProps } from '../../store'
import { IElement } from '../../store/elements/types'
import { fetchRequest } from '../../store/elements/actions'
import { fetchRequest as fetchRequestAuthors } from '../../store/elements/authors/actions'
import { fetchRequest as fetchRequestTypes } from '../../store/elements/types/actions'
import { fetchRequest as fetchRequestTags } from '../../store/elements/tags/actions'
import { fetchRequest as fetchRequestPreviews } from '../../store/elements/previews/actions'
import { Dispatch } from 'redux'

import { CloudDownload } from '@material-ui/icons';

interface PropsFromState {
  loading: boolean
  data: IElement[]
  errors?: string,
  authors: IAuthor[],
  types: IType[]
}

interface PropsFromDispatch {
  fetchRequest: typeof fetchRequest,
  fetchRequestAuthors: typeof fetchRequestAuthors,
  fetchRequestTypes: typeof fetchRequestTypes,
  fetchRequestTags: typeof fetchRequestTags,
  fetchRequestPreviews: typeof fetchRequestPreviews
}

interface RouteParams {
  name: string
}

interface State {
  page: number,
  type?: number,
  popular: boolean,
  author? : number
}

type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps & RouteComponentProps<RouteParams>

class ElementsIndexPage extends React.Component<AllProps, State> {
  constructor(props: AllProps){
    super(props);

    this.handleSortChange = this.handleSortChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);

    this.state = {
      page: 1,
      popular: false
    }
  }

  handleSortChange() {
    let that = this;
    that.setState({popular: !that.state.popular}, () => {
      that.fetchData();
    });
  }

  handlePageChange(pageNumber: number) {
    let that = this;
    that.setState({page: pageNumber}, () => {
      that.fetchData();
    });
  }

  handleTypeChange = (event: any) => {
    let that = this;
    that.setState({type: event.target.value}, () => {
      that.fetchData();
    });
  }

  handleAuthorChange(event: any) {
    let that = this;
    that.setState({author: event.target.value}, () => {
      that.fetchData();
    });
  }

  componentWillMount(){
    this.props.fetchRequestPreviews();
    this.props.fetchRequestAuthors();
    this.props.fetchRequestTypes();
    this.props.fetchRequestTags();
  }

  componentDidMount(){
    this.fetchData();
  }

  private fetchData(){
    let data = {
      _page: this.state.page,
      author: this.state.author,
      type: this.state.type,
      _sort: 'download',
      _order: this.state.popular ? 'desc' : 'asc'
    };
    this.props.fetchRequest(data);
  }

  public render() {
    const { loading, data, authors, types } = this.props

    return (
      <div className='result'>
      <div className="filters">
      <div className='custom-select'>
      <select onChange={this.handleAuthorChange}>
      <option value="">Все авторы</option>
      {authors &&
        authors.map(item => {
          return (
            <option key={'authors_option_' + item.id} value={item.id}>
            {item.username}
            </option>
            );
        })}
        </select>
        </div>

        <div className='custom-select'>
        <select onChange={this.handleTypeChange}>
        <option value="">Все типы</option>
        {types &&
          types.map(item => {
            return (
              <option key={'types_option_' +item.id} value={item.id}>
              {item.name}
              </option>
              );
          })}
          </select>
          </div>
          <button onClick={this.handleSortChange} 
            className={(this.state.popular ? 'active' : '')}>Сначала популярные
          </button>
          </div>
          <div className="items">
          {data &&
            data.map(item => {
              return (
                <div className="item" key={'item_' +item.id}>
                <div className="previews">
                <ul>
                {item.Previews &&
                  item.Previews.map(preview => {
                    return (
                      <li key={'preview_' + item.id + '_' +  preview.id}><img src={preview.url} /></li>
                      );
                  })}
                  </ul>
                  </div>
                  <div className="info">
                  <span className="name">{item.name}</span>
                  <span className="types">{item.Type && item.Type.name}</span>
                  <span className="downloads">
                  <CloudDownload />
                  {item.downloads}
                  </span>
                  </div>
                  </div>
                  );
            })}
            </div>
            <Pagination
            activePage={this.state.page}
            itemsCountPerPage={10}
            totalItemsCount={23} // данные не возвращаются, прописал 23
            pageRangeDisplayed={3}
            onChange={this.handlePageChange} />
            </div>
            )
  }
}


const mapStateToProps = ({ elements, authors, types, tags, previews }: ApplicationState) => {
  for (let i = elements.data.length - 1; i >= 0; i--) {
    let author = authors.data.filter(item => { return item.id === elements.data[i].author });
    elements.data[i].Author = author[0];

    let type = types.data.filter(item => { return item.id === elements.data[i].type });
    elements.data[i].Type = type[0];

    elements.data[i].Tags = tags.data.filter(item => { return elements.data[i].tags.includes(item.id) });

    elements.data[i].Previews = previews.data.filter(item => { return elements.data[i].previews.includes(item.id) });
  }

  return {
    loading: elements.loading,
    errors: elements.errors,
    data: elements.data,
    authors: authors.data,
    types: types.data
  }
}

const mapDispatchToProps = {
  fetchRequest,
  fetchRequestAuthors,
  fetchRequestTypes,
  fetchRequestTags,
  fetchRequestPreviews
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(ElementsIndexPage)
