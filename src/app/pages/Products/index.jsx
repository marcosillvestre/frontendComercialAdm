import SearchIcon from '@mui/icons-material/Search';
import { useRef } from 'react';
import { InsumeTable } from '../../../components/tables/productsTable';
import { useProduct } from '../../../hooks/products/productsContext.hook';
import { useUser } from '../../../hooks/userContext';
import { Container, Header } from './styles';

export function Products() {
    const forQuery = useRef()
    const { setTypeSidebar, setOpenSidebar, } = useUser()
    const { productQuery, setEditProduct, setQuery } = useProduct()


    const { data, isPending } = productQuery

    return (
        <Container>

            <Header>
                <nav>
                    <div>
                        <h1>Produtos</h1>

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
                                setTypeSidebar(6)
                                setOpenSidebar(true);
                                setEditProduct(null)
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
                    data={data?.products}
                    total={data?.total}
                    loading={isPending}
                />
            }

        </Container>
    )
}
