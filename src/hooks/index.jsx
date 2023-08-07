import PropTypes from 'prop-types'

import { IdProvider } from './idContext'
import { UserProvider } from './userContext'


const AppProvider = ({ children }) => (
    <IdProvider>
        <UserProvider>
            {children}
        </UserProvider>
    </IdProvider>
)

AppProvider.propTypes = {
    children: PropTypes.node
}

export default AppProvider