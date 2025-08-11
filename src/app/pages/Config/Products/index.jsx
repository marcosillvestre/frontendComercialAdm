import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SearchIcon from '@mui/icons-material/Search';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ProductsMoreFilters } from '../../../../components/multiFilters/moreFilters.products';
import { ProductsTable } from '../../../../components/tables/productsTable';
import { useCategorieProducts } from '../../../../hooks/categorieProduct/categorieProd.hook';
import { useKits } from '../../../../hooks/kits/kitsContext.hook';
import { useProduct } from '../../../../hooks/products/productsContext.hook';
import { useUser } from '../../../../hooks/userContext';
import { Container, Header } from './styles';

export function Products() {
    const forQuery = useRef();
    const { setTypeSidebar, setOpenSidebar, } = useUser();
    const { resetDataProduct, setQuery, view, setTypeFilter, typeFilter } = useProduct();
    const { resetDataKits } = useKits();
    const { resetDataCategorieProduct } = useCategorieProducts();


    const resetData = () => {
        resetDataProduct();
        resetDataKits();
        resetDataCategorieProduct();
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
                <nav className='inside-header'>

                    <form action=""
                        className='flex'
                    >
                        <label htmlFor="">

                            <p>Pesquisar por produtos</p>
                            <input
                                disabled={view !== "produtos"}
                                type="text"
                                className='inputSearch'
                                placeholder="Pesquisar"
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
                            <SearchIcon />
                        </button>
                    </form>

                    <ProductsMoreFilters
                        disabled={view !== "produtos"}

                    />

                    {
                        typeFilter?.length > 0 &&
                        <div>
                            <button
                                disabled={view !== "produtos"}

                                className='defaultButton redButton'
                                onClick={() => handleResetFilter()}
                            >
                                Limpar filtros
                            </button>
                        </div>
                    }
                </nav>

            </Header>

            <ProductsTable />

        </Container>
    )
}
