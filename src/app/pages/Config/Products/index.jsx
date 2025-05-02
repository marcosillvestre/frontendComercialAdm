import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SearchIcon from '@mui/icons-material/Search';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ProductsTable } from '../../../../components/tables/productsTable';
import { useProduct } from '../../../../hooks/products/productsContext.hook';
import { useUser } from '../../../../hooks/userContext';
import { Container, Header } from './styles';

export function Products() {
    const forQuery = useRef()
    const { setTypeSidebar, setOpenSidebar, } = useUser()
    const { setEditProduct, setQuery } = useProduct()



    return (
        <Container>

            <nav>
                <span>
                    <Link
                        to="/config"
                    >
                        <ArrowUpwardIcon />
                    </Link>
                    <h3>Configurações - Produtos</h3>
                </span>


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

            </nav>
            <Header>
                <form action=""
                    className='flex'
                >
                    <label htmlFor="">

                        <p>Pesquisar por produtos</p>
                        <input
                            type="text"
                            className='inputSearch'
                            placeholder="Nome ou Sku"
                            ref={forQuery}
                            onChange={(e) => e.target.value === "" && setQuery('')}
                        />
                    </label>

                    <button type="submit"
                        onClick={(e) => {
                            setQuery(forQuery.current.value)
                            e.preventDefault()

                        }}
                    >
                        <SearchIcon />,
                    </button>
                </form>
            </Header>

            <ProductsTable />

        </Container>
    )
}
