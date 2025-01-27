import React from 'react'
import { InsumeTable } from '../../../components/tables/insumesTable'
import { useInsume } from '../../../hooks/insumes/insumesContext.hook'
import { useUser } from '../../../hooks/userContext'
import { Container, Header } from './styles'

export function Services() {
    const { setTypeSidebar, setOpenSidebar, } = useUser()

    const { setEditInsume, serviceQuery } = useInsume()
    const { isFetching, data } = serviceQuery

    return (
        <Container>

            <Header>
                <nav>
                    <div>
                        <h1>Serviços</h1>
                        <h3></h3>
                    </div>
                    <span>

                        <button
                            className='defaultButton'
                            onClick={() => {
                                setTypeSidebar(6)
                                setOpenSidebar(true);
                                setEditInsume(null)
                            }
                            }>
                            Criar novo produto
                        </button>

                    </span>
                </nav>
            </Header>
            {
                data &&
                <InsumeTable
                    data={data.insumes}
                    total={data.total}
                    loading={isFetching} />
            }

        </Container>
    )
}
