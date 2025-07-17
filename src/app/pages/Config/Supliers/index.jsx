import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SearchIcon from '@mui/icons-material/Search';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import SupliersTable from '../../../../components/tables/tableSuplier';
import { useSupliers } from '../../../../hooks/supliers/supliersContext.hook';
import { useUser } from '../../../../hooks/userContext';
import { Container, Header } from './styles';

export function Supliers() {
    const forQuery = useRef()
    const { setTypeSidebar, setOpenSidebar, } = useUser()
    const { setEditSuplier, setQuery } = useSupliers()



    return (
        <Container>
            <nav>
                <span>
                    <Link
                        to="/config"
                    >
                        <ArrowUpwardIcon />
                    </Link>
                    <h3>Configurações - Fornecedores</h3>
                </span>

                <button
                    className='defaultButton blueButton create-button'
                    onClick={() => {
                        setTypeSidebar(8)
                        setOpenSidebar(true);
                        setEditSuplier(null)
                    }
                    }>
                    Criar novo fornecedor
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
                                    placeholder="Nome"
                                    ref={forQuery}
                                    onChange={(e) => {
                                        e.target.value === "" && setQuery('')
                                    }
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
                    </div>


                </nav>
            </Header>


            <SupliersTable
            />


        </Container>
    )
}
