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

            <Header>
                <nav>
                    <div>
                        <h1>Serviços</h1>
                        <form action=""
                            className='flex'
                        >

                            <input
                                type="text"
                                className='inputSearch'
                                placeholder="Nome ou Sku"
                                ref={forQuery}
                                onChange={(e) => e.target.value === "" && setQuery('')}
                            />

                            <button type="submit"
                                onClick={(e) => {
                                    setQuery(forQuery.current.value)
                                    e.preventDefault()

                                }}
                            >
                                <SearchIcon />
                            </button>
                        </form>
                    </div>
                    <span>

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

                    </span>
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
