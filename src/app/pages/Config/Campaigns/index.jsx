import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { Link } from 'react-router-dom'

import { CampaignsMoreFilters } from '../../../../components/multiFilters/moreFilters.campaigns'
import { CampaignTable } from '../../../../components/tables/campaignsTable'
import { useCampaign } from '../../../../hooks/campaign/campaignContext.hook'
import { useUser } from '../../../../hooks/userContext'
import { Container, Header } from './styles'

export function Campaigns() {
    const { setTypeSidebar, setOpenSidebar, } = useUser()

    const { setEditCampaign, typeFilter, setTypeFilter } = useCampaign();

    const handleResetFilter = () => {
        setTypeFilter([])
    }

    return (
        <Container>

            <nav className='nav'>
                <span>
                    <Link
                        to="/config"
                    >
                        <ArrowUpwardIcon />
                    </Link>
                    <h3>Configurações - Campanhas</h3>
                </span>

                <button
                    className='defaultButton blueButton'
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
                <nav>

                    <CampaignsMoreFilters />

                    {
                        typeFilter?.length > 0 &&
                        <div>
                            <button

                                className='defaultButton redButton'
                                onClick={() => handleResetFilter()}
                            >
                                Limpar filtros
                            </button>
                        </div>
                    }
                </nav>
            </Header>

            <CampaignTable />

        </Container>
    )
}
