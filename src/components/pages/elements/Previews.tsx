import * as React from 'react'
import { ArrowRight, ArrowLeft } from '@material-ui/icons';
import { Link } from 'react-router-dom'

import { IPreview } from '../../../store/elements/types'

interface PreviewsProps {
  items: IPreview[],
  id: number
}

interface State {
  selectedPreviewId?: number
}

class Previews extends React.Component<PreviewsProps, State> {
  constructor(props: PreviewsProps){
    super(props);

    this.handleNextPreviewClick = this.handleNextPreviewClick.bind(this);
    this.handlePrevPreviewClick = this.handlePrevPreviewClick.bind(this);

    this.state = {
      selectedPreviewId: this.props.items.length ? this.props.items[0].id : undefined
    }
  }

  handlePrevPreviewClick() {
    let items = this.props.items,
      index = 0;
    for (var i = items.length - 1; i >= 0; i--) {
      if(this.state.selectedPreviewId === items[i].id)
        index = i;
    }
    index--;

    if(index < 0)
      index = items.length - 1;

    this.setState({ selectedPreviewId: items[index].id });
  }

  handleNextPreviewClick() {
    let items = this.props.items,
      index = 0;
    for (var i = items.length - 1; i >= 0; i--) {
      if(this.state.selectedPreviewId === items[i].id)
        index = i;
    }
    index++;

    if(index >= items.length)
      index = 0;

    this.setState({ selectedPreviewId: items[index].id });
  }

  public render() {
    const { items, id } = this.props

    return ( 
      <div className="previews">
      <Link to={`/elements/${id}`}>
      <ul className="images">
      {items &&
        items.map(preview => {
          return (
            <li className={ this.state.selectedPreviewId === preview.id ? 'visible' : '' } key={'preview_' + id + '_' +  preview.id}><img src={preview.url} /></li>
            );
        })}
        </ul>
        </Link>
        <div className="nav">
        <button onClick={this.handlePrevPreviewClick}>
        <ArrowLeft />
        </button>
        <ul>
        {items &&
          items.map(preview => {
            return (
              <li className={ this.state.selectedPreviewId === preview.id ? 'active' : '' } key={'preview_nav_' + id + '_' +  preview.id}></li>
              );
          })}
          </ul>
          <button onClick={this.handleNextPreviewClick}>
          <ArrowRight />
          </button>
          </div>

        }
        </div>
        )
  }
}

export default Previews