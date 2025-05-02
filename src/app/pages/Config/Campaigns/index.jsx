import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { Link } from 'react-router-dom'
import { CampaignTable } from '../../../../components/tables/campaignsTable'
import { useCampaign } from '../../../../hooks/campaign/campaignContext.hook'
import { useUser } from '../../../../hooks/userContext'
import { Container, Header } from './styles'

export function Campaigns() {
    const { setTypeSidebar, setOpenSidebar, } = useUser()

    const { setEditCampaign } = useCampaign()

    return (
        <Container>

            <nav>
                <span>
                    <Link
                        to="/config"
                    >
                        <ArrowUpwardIcon />
                    </Link>
                    <h3>Configurações - Campanhas</h3>
                </span>

                <button
                    className='defaultButton'
                    onClick={() => {
                        setTypeSidebar(5)
                        setOpenSidebar(true);
                        setEditCampaign(null)
                    }
                    }>
                    Criar nova campanha
                </button>
            </nav>
            <Header>
            </Header>

            <CampaignTable />

        </Container>
    )
}
