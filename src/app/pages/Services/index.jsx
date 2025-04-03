import SearchIcon from '@mui/icons-material/Search'
import { useRef } from 'react'
import { ServicesTable } from '../../../components/tables/servicesTable'
import { useService } from '../../../hooks/services/servicesContext.hook'
import { useUser } from '../../../hooks/userContext'
import { Container, Header } from './styles'

export function Services() {
    const forQuery = useRef()
    const { setTypeSidebar, setOpenSidebar, } = useUser()
    const { serviceQuery, setEditService, setQuery } = useService()

    const { data, isPeding } = serviceQuery


    return (
        <Container>
            <nav>
                <h3>Configurações - Serviços</h3>

                <button
                    className='defaultButton create-button'

                    onClick={() => {
                        setTypeSidebar(7)
                        setOpenSidebar(true);
                        setEditService(null)
                    }
                    }>
                    Criar novo serviço
                </button>
            </nav>
            <Header>
                <nav>
                    <div>
                        <form action=""
                            className='flex'
                        >
                            <label htmlFor="">

                                <p>Pesquisar</p>
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
                    </div>

                </nav>
            </Header>
            {
                data &&
                <ServicesTable
                    data={data?.services}
                    total={data?.total}
                    loading={isPeding}
                />
            }

        </Container>
    )
}
