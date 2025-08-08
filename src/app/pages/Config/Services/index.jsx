import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import SearchIcon from '@mui/icons-material/Search'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ServicesMoreFilters } from '../../../../components/multiFilters/moreFilters.services'
import { ServicesTable } from '../../../../components/tables/servicesTable'
import { useService } from '../../../../hooks/services/servicesContext.hook'
import { useUser } from '../../../../hooks/userContext'
import { Container, Header } from './styles'

export function Services() {
    const forQuery = useRef();
    const { setTypeSidebar, setOpenSidebar, } = useUser();
    const { setQuery, resetDataService, typeFilter, setTypeFilter } = useService();

    const resetData = () => {
        resetDataService();

    }

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
                    <h3>Configurações - Serviços</h3>
                </span>

                <button
                    className='defaultButton blueButton create-button'

                    onClick={() => {
                        setTypeSidebar(7)
                        setOpenSidebar(true);

                        resetData()
                    }
                    }>
                    Criar novo serviço
                </button>
            </nav>
            <Header>
                <nav className='inside-header'>

                    <form action=""
                        className='flex'
                    >
                        <label htmlFor="">

                            <p>Pesquisar por serviços</p>
                            <input
                                type="text"
                                className='inputSearch'
                                placeholder="Nome ou Sku"
                                ref={forQuery}
                                onChange={(e) => e.target.value === "" && setQuery('')}
                            />

                        </label>

                        <button
                            type="submit"
                            onClick={(e) => {
                                setQuery(forQuery.current.value)
                                e.preventDefault()

                            }}
                        >
                            <SearchIcon />
                        </button>
                    </form>

                    <ServicesMoreFilters />

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

            <ServicesTable />


        </Container>
    )
}
