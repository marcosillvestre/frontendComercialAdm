import SearchIcon from '@mui/icons-material/Search';
import { useRef } from 'react';
import SupliersTable from '../../../components/tables/tableSuplier';
import { useSupliers } from '../../../hooks/supliers/supliersContext.hook';
import { useUser } from '../../../hooks/userContext';
import { Container, Header } from './styles';

export function Supliers() {
    const forQuery = useRef()
    const { setTypeSidebar, setOpenSidebar, } = useUser()
    const { SupliersQuery, setEditSuplier } = useSupliers()


    const { data } = SupliersQuery

    return (
        <Container>

            <Header>
                <nav>
                    <div>
                        <h1>Fornecedores</h1>

                        <form action=""
                            className='flex'
                        >

                            <input
                                type="text"
                                className='inputSearch'
                                placeholder="Nome"
                                ref={forQuery}
                                onChange={(e) => { }
                                    // e.target.value === "" && setQuery('')
                                }
                            />

                            <button type="submit"
                                onClick={(e) => {
                                    // setQuery(forQuery.current.value)
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
                                setTypeSidebar(8)
                                setOpenSidebar(true);
                                setEditSuplier(null)
                            }
                            }>
                            Criar novo fornecedor
                        </button>

                    </span>
                </nav>
            </Header>

            {
                data &&
                <SupliersTable
                />
            }

        </Container>
    )
}
