import PropTypes from 'prop-types'

import { ComissionProvider } from './comissions/comissionContext.hook'
import { Contracts } from './contracts/contracts.hook'
import { CustomFields } from './customFields/customFIelds.hook'
import { DataProvider } from './dataContext'
import { OrdersProvider } from './orders/ordersContext.hook'
import { SigningContracts } from './signContracts/sign.hook'
import { UnitiesProvider } from './unities/unitiesContext.hook'
import { UserProvider } from './userContext'
import { UsersProvider } from './users/usersContext.hook'

const AppProvider = ({ children }) => (
    <DataProvider>
        <UserProvider>
            <CustomFields>
                <Contracts>
                    <UsersProvider>
                        <UnitiesProvider>
                            <ComissionProvider>
                                <OrdersProvider>
                                    <SigningContracts>

                                        {children}

                                    </SigningContracts>
                                </OrdersProvider>
                            </ComissionProvider>
                        </UnitiesProvider>
                    </UsersProvider>
                </Contracts>
            </CustomFields>
        </UserProvider>
    </DataProvider>
)

AppProvider.propTypes = {
    children: PropTypes.node
}

export default AppProvider