import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { Link } from 'react-router-dom'
import BillingTable from '../../../../components/tables/tableBillings'
import { useBilling } from '../../../../hooks/billingRules/billingRulesContext.hook'
import { useUser } from '../../../../hooks/userContext'
import { Container, Header } from './styles'

export function BillingRules() {
    const { setTypeSidebar, setOpenSidebar, } = useUser()

    const { setEditBilling } = useBilling()

    return (
        <Container>

            <nav>
                <span>
                    <Link
                        to="/config"
                    >
                        <ArrowUpwardIcon />
                    </Link>
                    <h3>Configurações - Régua de cobranças</h3>
                </span>

                <button
                    className='defaultButton'
                    onClick={() => {
                        setTypeSidebar(9)
                        setOpenSidebar(true);
                        setEditBilling(null)
                    }
                    }>
                    Criar nova régua
                </button>
            </nav>
            <Header>
            </Header>


            <BillingTable />

        </Container>
    )
}
