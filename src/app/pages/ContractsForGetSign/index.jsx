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
    const { setSign, contractOptions, setContractOptions, allContracts, funnelsQuery } = useSignContracts()

    const { data, isPending } = funnelsQuery

    async function dataFilter(e) {
        setSign(e)
        setFilteredContracts(undefined)
    }

    function filterData(search) {
        const data = contractOptions.filter(res =>
            res["Nome do aluno"].includes(search) || res["Nome do responsável"].toLowerCase()
                .includes(search.toLowerCase()))

        setContractOptions(data)

    }

    return (

        <Container>

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
                                    onChange={(e) => e.target.value === "" && setContractOptions(allContracts)}
                                    list='person'
                                />

                                <button
                                    type='submit'
                                    onClick={(e) => {
                                        filterData(forQuery.current.value)
                                        e.preventDefault()
                                    }}>
                                    <SearchIcon />
                                </button>
                            </form>
                            <datalist id='person' >
                                {
                                    contractOptions && contractOptions.map((res, i) => (
                                        <option
                                            key={i}
                                            value={res["Nome do responsável"]}
                                        >
                                            Aluno: {res["Nome do aluno"]}
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




