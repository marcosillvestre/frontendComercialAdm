
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Link } from 'react-router-dom';
import CustomFieldsTable from '../../../../components/tables/customFieldsTables/index.jsx';
import { useCustomFields } from '../../../../hooks/customFields/customFIelds.hook.jsx';
import { useUser } from '../../../../hooks/userContext.jsx';
import { Container, Header } from './styles.jsx';



export const CustomFields = () => {
    const { openSidebar, setOpenSidebar, setTypeSidebar } = useUser()

    const { setEditCustomField } = useCustomFields()

    return (
        <Container>
            <nav>
                <span>

                    <Link
                        to="/config"
                    >
                        <ArrowUpwardIcon />
                    </Link>
                    <div>
                        <h3>Configurações - Campos personalizados</h3>
                    </div>
                </span>

                <button
                    className='defaultButton'
                    onClick={() => {
                        setTypeSidebar(1)
                        setOpenSidebar(!openSidebar);
                        setEditCustomField(null)
                    }
                    }>
                    Criar campo
                </button>
            </nav>
            <Header />

            <CustomFieldsTable />

        </Container>
    )

}
