import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import Pagination from "react-js-pagination";

import { ApplicationState, ConnectedReduxProps } from '../../store'
import { IElement, ElementsPayload, IPreview } from '../../store/elements/types'
import { fetchRequest } from '../../store/elements/actions'
import { Dispatch } from 'redux'

import Loading from '../../components/common/Loading'

import { CloudDownload } from '@material-ui/icons';

import Previews from '../../components/pages/elements/Previews';

interface PropsFromState {
  loading: boolean
  data?: ElementsPayload
  errors?: string
}

interface PropsFromDispatch {
  fetchRequest: typeof fetchRequest,
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
    const { loading, data} = this.props

    return (
      <div className='result'>
      {loading && (
        <Loading />
        )}
      <div className="filters">
      <div className='custom-select'>
      <select onChange={this.handleAuthorChange}>
      <option value="">Все авторы</option>
      {data && data.authors &&
        data.authors.map(item => {
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
        {data && data.types &&
          data.types.map(item => {
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
          {data && data.elements &&
            data.elements.map(item => {
              let previews = data.previews.filter(findItem => { return item.previews && item.previews.includes(findItem.id) });
              let type = data.types.find(findItem => { return item.type === findItem.id });
              return (
                <div className="item" key={'item_' + item.id}>
                  <Previews id={item.id} items={previews} />
                  <div className="info">
                  <span className="name">{item.name}</span>
                  <span className="types">{type && type.name}</span>
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


const mapStateToProps = ({ elements }: ApplicationState) => {
  return {
    loading: elements.loading,
    errors: elements.errors,
    data: elements.data
  }
}

const mapDispatchToProps = {
  fetchRequest
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(ElementsIndexPage)
