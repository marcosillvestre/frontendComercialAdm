import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

import { useRef } from 'react';
import { CampaignsMoreFilters } from '../../../../components/multiFilters/moreFilters.campaigns';
import { CampaignTable } from '../../../../components/tables/campaignsTable';
import { useCampaign } from '../../../../hooks/campaign/campaignContext.hook';
import { useUser } from '../../../../hooks/userContext';
import { Container, Header } from './styles';

export function Campaigns() {
    const { setTypeSidebar, setOpenSidebar, } = useUser()
    const forQuery = useRef();

    const { setEditCampaign, typeFilter, setTypeFilter, setQuery, query } = useCampaign();

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
                    <form action=""
                        className='flex'
                    >
                        <label htmlFor="">

                            <p>Pesquisar por campanha</p>
                            <input
                                type="text"
                                className='inputSearch'
                                placeholder="Pesquisar"
                                defaultValue={query}
                                ref={forQuery}
                                onChange={(e) => e.target.value === "" &&
                                    setQuery('')
                                }
                            />
                        </label>

                        <button type="submit"
                            onClick={(e) => {
                                setQuery(forQuery.current.value)
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
