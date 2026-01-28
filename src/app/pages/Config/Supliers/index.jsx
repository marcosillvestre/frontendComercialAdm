import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { InputSearcher } from '../../../../components/inputs/input.search';
import SupliersTable from '../../../../components/tables/tableSuplier';
import { useSupliers } from '../../../../hooks/supliers/supliersContext.hook';
import { useUser } from '../../../../hooks/userContext';
import { Container, Header } from './styles';

export function Supliers() {
    const [searcher, setSearcher] = useState('');
    const { setTypeSidebar, setOpenSidebar, } = useUser()
    const { setEditSuplier, setQuery, query } = useSupliers()

    const handleInput = (_, data) => {
        if (!data) setQuery('')
        setSearcher(data)
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

                                <p className='label-outside'>Pesquisar por nome</p>
                                <InputSearcher
                                    label={query}
                                    field=''
                                    fn={[handleInput]}
                                    width='15rem'
                                    border='transparent'
                                    color='#dfe6f1'
                                />
                            </label>

                            <button type="submit"
                                onClick={(e) => {
                                    setQuery(searcher)
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
