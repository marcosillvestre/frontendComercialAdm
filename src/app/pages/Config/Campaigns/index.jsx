import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

import { useState } from 'react';
import { InputSearcher } from '../../../../components/inputs/input.search';
import { CampaignsMoreFilters } from '../../../../components/multiFilters/moreFilters.campaigns';
import { CampaignTable } from '../../../../components/tables/campaignsTable';
import { useCampaign } from '../../../../hooks/campaign/campaignContext.hook';
import { useUser } from '../../../../hooks/userContext';
import { Container, Header } from './styles';

export function Campaigns() {
    const { setTypeSidebar, setOpenSidebar, } = useUser()
    const [searcher, setSearcher] = useState('')

    const { setEditCampaign, typeFilter, setTypeFilter, setQuery, query } = useCampaign();

    const handleResetFilter = () => {
        setTypeFilter([])
    }

    const handleInput = (_, data) => {
        if (!data) setQuery('')
        setSearcher(data)
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
                    <form action=""
                        className='flex'
                    >
                        <label htmlFor="">


                            <p>Pesquisar por campanha</p>

                            <InputSearcher
                                label={query}
                                field=''
                                fn={[handleInput]}
                                width='15rem'
                                border='transparent'
                                color='#dfe6f1'
                            />
                        </label>

                        <button type="submit"
                            onClick={(e) => {
                                setQuery(searcher)
                                e.preventDefault()
                            }}
                        >
                            <SearchIcon />
                        </button>
                    </form>
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
