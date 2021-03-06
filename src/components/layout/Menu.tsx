import * as React from 'react'
import { NavLink } from 'react-router-dom'
import LayoutContainer from '../../containers/layout'
import avatar from '../../styles/img/user.png';
import { TableChart, Settings, Notifications } from '@material-ui/icons';


interface MenuProps {

}

const Menu: React.SFC<MenuProps> = () => (
<div className='menu'>
  <div>
    <div className='user'>
      <div className='avatar'>
        <img src={avatar} />
      </div>
      <span className='name'>admin</span>
    </div>
      <nav>
        <NavLink to="/elements" activeClassName={MenuLinkActive}>
          <TableChart />
          Предметы
        </NavLink>
        <NavLink exact to="/settings" activeClassName={MenuLinkActive}>
          <Settings />
          Настройки
        </NavLink>
        <NavLink exact to="/notifications" activeClassName={MenuLinkActive}>
          <Notifications />
          Уведомления
        </NavLink>
      </nav>
    </div>
  </div>
)

export default Menu

const MenuLinkActive: string = 'active'