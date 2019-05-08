import * as React from 'react'

interface RootProps {
}

const Root: React.SFC<RootProps> = ({ children }) => <div className='page'>{children}</div>

export default Root