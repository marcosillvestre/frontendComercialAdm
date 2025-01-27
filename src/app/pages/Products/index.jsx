import React from 'react'
import { InsumeTable } from '../../../components/tables/insumesTable'
import { useInsume } from '../../../hooks/insumes/insumesContext.hook'
import { useUser } from '../../../hooks/userContext'
import { Container, Header } from './styles'

export function Products() {
    const { setTypeSidebar, setOpenSidebar, } = useUser()

    const { setEditInsume, productQuery } = useInsume()

    const { data, isFetching } = productQuery

    return (
        <Container>

            <Header>
                <nav>
                    <div>
                        <h1>Produtos</h1>
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
