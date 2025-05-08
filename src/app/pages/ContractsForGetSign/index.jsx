import { useRef } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import { ContractData, Select } from '../../../components/source.jsx'
import TableContracts from '../../../components/tables/tableContracts/index.jsx'
import { useSignContracts } from '../../../hooks/signContracts/sign.hook.jsx'
import { useUser } from '../../../hooks/userContext'
import { Container, Header } from './styles'


export const Contracts = () => {
    const forQuery = useRef()

    const { filteredContracts, setFilteredContracts } = useUser()
    const { setSign, contractOptions, funnelsQuery, setQuery } = useSignContracts();

    const { data, isPending } = funnelsQuery


    async function dataFilter(e) {
        setSign(e)
        setFilteredContracts(undefined)
    }

    function filterData(search) {
        setQuery(search);
    }


    return (

        <Container>
            <nav
                className='over-nav'
            >
                <h3>Criação de contratos</h3>

            </nav>
            <Header className='search'
            >
                <div className='inputs'>
                    <label htmlFor="">

                        <p>Funil:</p>

                        {
                            isPending ?
                                "carregando"
                                :
                                <Select
                                    label={data && data[0].name}
                                    option={data && data}
                                    width="5rem"
                                    field="type"
                                    fn={[dataFilter]}
                                />
                        }
                    </label>
                    {
                        filteredContracts === undefined &&
                        <label >
                            <p>Cliente: </p>
                            <form action=""
                                className='searcher'
                            >

                                <input
                                    ref={forQuery}
                                    className='inputSearch'

                                    onChange={(e) => e.target.value === "" &&
                                        setQuery(null)
                                    }
                                    list='person'
                                />

                                <button
                                    type='submit'
                                    onClick={(e) => {
                                        e.preventDefault()
                                        filterData(forQuery.current.value)
                                    }}>
                                    <SearchIcon />
                                </button>
                            </form>
                            <datalist id='person' >
                                {
                                    contractOptions !== undefined &&
                                    contractOptions?.contracts.map((res, i) => (
                                        <option
                                            key={i}
                                            value={res["name"]}
                                        >
                                            Aluno: {res["student"]}
                                        </option>

                                    ))
                                }
                            </datalist>

                        </label>
                    }
                </div>

            </Header>
            {
                filteredContracts === undefined ?
                    <TableContracts /> :
                    <ContractData />
            }


        </Container>
    )

}




