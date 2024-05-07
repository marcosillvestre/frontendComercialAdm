import PropTypes from 'prop-types'

import { Contracts } from './contracts/contracts.hook'
import { CustomFields } from './customFields/customFIelds.hook'
import { DataProvider } from './dataContext'
import { UserProvider } from './userContext'


const AppProvider = ({ children }) => (
    <DataProvider>
        <UserProvider>
            <CustomFields>
                <Contracts>

                    {children}

                </Contracts>
            </CustomFields>
        </UserProvider>
    </DataProvider>
)

AppProvider.propTypes = {
    children: PropTypes.node
}

export default AppProvider