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
    const { setSign, contractOptions, setContractOptions, allContracts, } = useSignContracts()


    async function data(e) {
        if (e.value !== '') {

            setSign(e)
        }
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
                        <Select
                            label={"Funil de Vendas PTB"}
                            option={
                                [
                                    { name: "Funil de Vendas PTB", value: "Funil-de-Vendas-PTB" },
                                    { name: "Funil de Rematrícula PTB", value: "Funil-de-Rematrícula-PTB" },
                                    { name: "Funil de Vendas Centro", value: "Funil-de-Vendas-Centro" },
                                    { name: "Funil de Rematrículas Centro", value: "Funil-de-Rematrículas-Centro" },
                                ]
                            }
                            width="5rem"
                            field="type"
                            fn={[data]}
                        />
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
                {
                    filteredContracts !== undefined &&
                    <span
                        className='comeback defaultButton'
                        onClick={() => {
                            setFilteredContracts(undefined)
                            setContractOptions(allContracts)

                        }}>
                        voltar
                    </span>
                }
            </Header>
            {
                filteredContracts === undefined ?
                    <TableContracts /> :
                    <ContractData />
            }


        </Container>
    )

}




