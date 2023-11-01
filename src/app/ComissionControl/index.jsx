import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import MiniDrawer from '../../components/sideBar';
import UnhandleInput from '../../components/unhandleSelect';
import { useUser } from '../../hooks/userContext';
import URI from '../utils/utils';
import { Container, Tax } from './styles';


function ComissionControll() {
    const { sellers, fetchData, unity, body, headers, userData } = useUser()
    const [cell, setCell] = React.useState()
    // const [id, setId] = React.useState()
    const queryCache = useQueryClient();
    // console.log(body)
    // // const [cell, setCell] = React.useState()


    // const { data, isError, isPending } = useQuery('cell', () => {
    // })
    const mutation = useMutation({
        mutationFn: () => {
            return URI.post('/periodo', body, { headers }).then(res => res.data.data)
        },
        onSuccess: (data) => {
            console.log(data)
            queryCache.invalidateQueries({ queryKey: ['todos'] })
        },
        onError: (err) => console.log(err)
    })


    // async function pushData() {
    //     const request = await URI.post('/periodo', body, { headers })

    //     return request.data
    // }


    const { data, isError, isPending } = mutation

    const [comissionFilters, setComissionFilters] = React.useState([])

    const filterCell = () => {
        mutation.mutate()
        comissionFilters.length === 1 && setCell(fetchData.filter(res => res[comissionFilters[0].key].includes(comissionFilters[0].value)))
        comissionFilters.length === 2 && setCell(fetchData.filter(res => res[comissionFilters[0].key].includes(comissionFilters[0].value) && res[comissionFilters[1].key].includes(comissionFilters[1].value)))
        comissionFilters.length === 3 && setCell(fetchData.filter(res => res[comissionFilters[0].key].includes(comissionFilters[0].value) && res[comissionFilters[1].key].includes(comissionFilters[1].value) && res[comissionFilters[2].key].includes(comissionFilters[2].value)))
        comissionFilters.length === 4 && setCell(fetchData.filter(res => res[comissionFilters[0].key].includes(comissionFilters[0].value) && res[comissionFilters[1].key].includes(comissionFilters[1].value) && res[comissionFilters[2].key].includes(comissionFilters[2].value) && res[comissionFilters[3].key].includes(comissionFilters[3].value)))
    }

    const months = [
        { "value": 1, "label": "Janeiro" },
        { "value": 2, "label": "Fevereiro" },
        { "value": 3, "label": "Março" },
        { "value": 4, "label": "Abril" },
        { "value": 5, "label": "Maio" },
        { "value": 6, "label": "Junho" },
        { "value": 7, "label": "Julho" },
        { "value": 8, "label": "Agosto" },
        { "value": 9, "label": "Setembro" },
        { "value": 10, "label": "Outubro" },
        { "value": 11, "label": "Novembro" },
        { "value": 12, "label": "Dezembro" },
    ]

    const resetFilter = async (filter) => {
        comissionFilters.length <= 1 && setCell(fetchData)
        comissionFilters.length === 2 && setCell(fetchData.filter(res => res[comissionFilters[0].key] === comissionFilters[0].value))
        comissionFilters.length === 3 && setCell(fetchData.filter(res => res[comissionFilters[0].key] === comissionFilters[0].value && res[comissionFilters[1].key] === comissionFilters[1].value))

        setComissionFilters(comissionFilters.filter(res => res !== filter))
    }

    const predeterminedPeriods = [
        { name: "Esta semana", },
        { name: "Este mês", },
        { name: "Mês passado", },
        { name: "Mês retrasado", },
        { name: "Este ano", },
        { name: "Período personalizado", customizable: true, },
    ]
    // if (isPending) return <div>Carregando...</div>;

    return (
        <>
            <MiniDrawer />
            {
                userData && userData.name.includes("Marcos") &&
                <Container>

                    <header>
                        <nav>
                            < UnhandleInput opt={predeterminedPeriods} />

                            <label htmlFor="">
                                <h3>Mês</h3>
                                <select name="" id="" onChange={(e) => setComissionFilters([...comissionFilters, { "key": "dataMatricula", "value": e.target.value }])}>
                                    <option value="selec">Selecione</option>
                                    {
                                        months && months.map(res => (
                                            <option key={res.value} value={res.value}>{res.label}</option>
                                        ))
                                    }

                                </select>
                            </label>

                            <label htmlFor="">
                                <h3>Unidade</h3>
                                <select name="" id="" onChange={(e) => setComissionFilters([...comissionFilters, { "key": "unidade", "value": e.target.value }])}>
                                    <option value="selec">Selecione</option>
                                    {
                                        unity && unity.map(res => (
                                            <option key={res.id} value={res.name}>{res.name}</option>
                                        ))
                                    }
                                </select>
                            </label>

                            <label htmlFor="">
                                <h3>consultor</h3>
                                <select name="" id="" onChange={(e) => setComissionFilters([...comissionFilters, { "key": "owner", "value": e.target.value }])}>
                                    <option value="selec">Selecione</option>
                                    {
                                        sellers && sellers.map(res => (
                                            <option key={res.id} value={res.name}>{res.name}</option>
                                        ))
                                    }
                                </select>
                            </label>

                            <label htmlFor="">
                                <h3>Status do comissionamento</h3>
                                <select name="" id="" onChange={(e) => setComissionFilters([...comissionFilters, { "key": "tipoMatricula", "value": e.target.value }])}>
                                    <option value="selec">Selecione</option>
                                    <option value="Pendente">Pendente</option>
                                    <option value="Não aprovado">Não aprovado</option>
                                    <option value="Pré-aprovado">Pré-aprovado</option>
                                    <option value="Comissionado">Comissionado</option>
                                    <option value="Aprovado">Aprovado</option>

                                </select>
                            </label>

                            <button onClick={() => filterCell()}>Filtrar</button>
                        </nav>

                        <div className='filters'>
                            <p>filtros aplicados: </p>
                            <div>
                                {comissionFilters.map(res => (
                                    <span key={res.key} onClick={() => resetFilter(res)}>
                                        <p className='header'>{res.key}:</p>
                                        <p className='body'>{res.value}</p>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <Tax>
                            {/* {
                                isPending ? <p>Carregando...</p> :
                                    data?.total
                            } */}
                        </Tax>

                    </header>

                    {
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome do Aluno:</th>
                                    <th>Nome do Responsável:</th>
                                    <th>Curso:</th>
                                    <th>Status do comissionamento:</th>
                                    <th>Unidade:</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {
                                    isError ? <p>Erro</p> :
                                        isPending ? <p>Carregando...</p> :
                                            data.deals !== undefined &&
                                            data?.deals?.map(res => (
                                                <tr key={res?.contrato}>
                                                    <td>
                                                        {res?.aluno}
                                                    </td>
                                                    <td>
                                                        {res?.name}
                                                    </td>
                                                    <td>
                                                        {res?.curso}
                                                    </td>
                                                    <td>
                                                        {res?.tipoMatricula}
                                                    </td>
                                                    <td>
                                                        {res?.unidade}
                                                    </td>
                                                </tr>

                                            ))
                                } */}
                            </tbody>
                        </table>
                    }



                </Container>
            }
        </>
    )
}
export default ComissionControll