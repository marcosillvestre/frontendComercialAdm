import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SearchIcon from '@mui/icons-material/Search';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ProductsTable } from '../../../../components/tables/productsTable';
import { useCategorieProducts } from '../../../../hooks/categorieProduct/categorieProd.hook';
import { useKits } from '../../../../hooks/kits/kitsContext.hook';
import { useProduct } from '../../../../hooks/products/productsContext.hook';
import { useUser } from '../../../../hooks/userContext';
import { Container, Header } from './styles';

export function Products() {
    const forQuery = useRef()
    const { setTypeSidebar, setOpenSidebar, } = useUser();
    const { resetDataProduct, setQuery, view } = useProduct();
    const { resetDataKits } = useKits();
    const { resetDataCategorieProduct } = useCategorieProducts();
    

    const resetData = () => {
        resetDataProduct();
        resetDataKits();
        resetDataCategorieProduct();
    }

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
                    className='defaultButton blueButton create-button'
                    onClick={() => {
                        setTypeSidebar(6)
                        setOpenSidebar(true);

                        resetData()

                    }
                    }>
                    Criar novos {view}
                </button>

            </nav>
            <Header>
                <form action=""
                    className='flex'
                >
                    <label htmlFor="">

                        <p>Pesquisar por produtos</p>
                        <input
                            disabled={view !== "produtos"}
                            type="text"
                            className='inputSearch'
                            placeholder="Nome ou Sku"
                            ref={forQuery}
                            onChange={(e) => e.target.value === "" && setQuery('')}
                        />
                    </label>

                    <button type="submit"
                        disabled={view !== "produtos"}
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
