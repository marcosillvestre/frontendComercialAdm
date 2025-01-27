import React from 'react'
import { CampaignTable } from '../../../components/tables/campaignsTable'
import { useCampaign } from '../../../hooks/campaign/campaignContext.hook'
import { useUser } from '../../../hooks/userContext'
import { Container, Header } from './styles'

export function Campaigns() {
    const { setTypeSidebar, setOpenSidebar, } = useUser()

    const { setEditCampaign } = useCampaign()

    return (
        <Container>

            <Header>
                <nav>
                    <div>
                        <h1>Campanhas</h1>
                        <h3></h3>
                    </div>

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
            </Header>
            <CampaignTable />

        </Container>
    )
}
