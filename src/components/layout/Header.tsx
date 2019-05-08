import * as React from 'react'
import LayoutContainer from '../../containers/layout'
import avatar from '../../styles/img/user.png';
import { CloudUpload, Search } from '@material-ui/icons'; 

interface HeaderProps {

}

const Header: React.SFC<HeaderProps> = () => (
  <LayoutContainer>
  {({}) => (
    <header>
    <div>
    <span className='logo'>Логотип</span>
    <Search />
    <input type="text" placeholder="Поиск..." />
    <button className='add' type="button">
      <CloudUpload />
      Добавить предмет
    </button>
    <div className='user'>
      <div className='avatar'>
        <img src={avatar} />
      </div>
      <span className='name'>admin</span>
    </div>
    </div>
     </header>
    )}
  </LayoutContainer>
  )

export default Header