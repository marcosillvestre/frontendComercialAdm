import { useState } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import LoadingSpin from 'react-loading-spin'
import { ContractData, Select } from '../../../components/source.jsx'
import TableContracts from '../../../components/tables/tableContracts/index.jsx'
import { useSignContracts } from '../../../hooks/signContracts/sign.hook.jsx'
import { useUser } from '../../../hooks/userContext'
import { Container, Header, } from './styles'


export const Contracts = () => {
    const [search, setSearch] = useState("")

    const { filteredContracts, setFilteredContracts } = useUser()
    const { setSign, contractOptions, setContractOptions, allContracts, contractsForSign } = useSignContracts()

    const { isFetching } = contractsForSign

    async function data(e) {
        if (e.value !== '') {

            setSign(e)
        }
        setFilteredContracts(undefined)
        setSearch("")
    }




    function filterData(e) {
        if (e !== "Não há ninguém na etapa de matrícula nesse funil!" || e !== "") {
            const data = contractOptions.filter(res =>
                res.contrato.includes(search) || res.name.toLowerCase().includes(search.toLowerCase()))

            setContractOptions(data)
        }
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
                            width="100%"
                            field="type"
                            fn={[data]}
                        />
                    </label>
                    {
                        filteredContracts === undefined &&
                        <label >
                            <p>Cliente: </p>
                            <div className='searcher'>
                                <input
                                    onChange={(e) => {
                                        if (e.target.value === "") return setContractOptions(allContracts)
                                        setSearch(e.target.value)
                                    }}
                                    list='person'
                                />

                                <button onClick={() => filterData()}>
                                    <SearchIcon />
                                </button>
                            </div>
                            <datalist id='person' >
                                {
                                    contractOptions && contractOptions.map((res, i) => (
                                        <option
                                            key={i}
                                            value={res.contrato}
                                        >
                                            {res.name}
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
                        className='comeback'
                        onClick={() => {
                            setFilteredContracts(undefined)
                            setContractOptions(allContracts)
                            setSearch("")
                        }}>
                        voltar
                    </span>
                }
            </Header>
            {
                filteredContracts === undefined ?

                    isFetching ?
                        <LoadingSpin
                            duration="4s"
                            width="15px"
                            timingFunction="ease-in-out"
                            direction="alternate"
                            size="60px"
                            primaryColor="#1976d2"
                            secondaryColor="#333"
                            numberOfRotationsInAnimation={3}
                        />
                        :
                        <TableContracts />
                    :
                    <ContractData />
            }


        </Container>
    )

}




