import PropTypes from 'prop-types'

import { BillingsProvider } from './billingRules/billingRulesContext.hook'
import { CampaignProvider } from './campaign/campaignContext.hook'
import { ComissionProvider } from './comissions/comissionContext.hook'
import { Contracts } from './contracts/contracts.hook'
import { CustomFields } from './customFields/customFIelds.hook'
import { DataProvider } from './dataContext'
import { OrdersProvider } from './orders/ordersContext.hook'
import { ProductsProvider } from './products/productsContext.hook'
import { RegistersProvider } from './registers/registersContext.hook'
import { RequestsProvider } from './requests/requestsContext.hook'
import { ServicesProvider } from './services/servicesContext.hook'
import { SigningContracts } from './signContracts/sign.hook'
import { SupliersProvider } from './supliers/supliersContext.hook'
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
                                        <CampaignProvider>
                                            <ServicesProvider>
                                                <ProductsProvider>
                                                    <SupliersProvider>
                                                        <RequestsProvider>
                                                            <BillingsProvider>
                                                                <RegistersProvider>

                                                                    {children}

                                                                </RegistersProvider>
                                                            </BillingsProvider>
                                                        </RequestsProvider>
                                                    </SupliersProvider>
                                                </ProductsProvider>
                                            </ServicesProvider>
                                        </CampaignProvider>
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