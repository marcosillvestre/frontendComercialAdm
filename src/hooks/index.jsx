import PropTypes from 'prop-types'

import { DataProvider } from './dataContext'
import { UserProvider } from './userContext'


const AppProvider = ({ children }) => (
    <DataProvider>
        <UserProvider>
            {children}
        </UserProvider>
    </DataProvider>
)

AppProvider.propTypes = {
    children: PropTypes.node
}

export default AppProvider