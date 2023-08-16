
import { memo, useEffect, useState } from 'react';
import { Container, Filter, SearchButton, Tax } from './styles';

import { TableBody } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Row } from '../../components/table';

import Header from '../../components/header';

import { useUser } from '../../hooks/userContext';

import TransitionsModal from '../../components/modal';
import URI from '../utils/utils.jsx';
const ListFiltered = () => {
    const { fetchData, userData, headers, filtered, setFiltered } = useUser()

    const [month, setMonth] = useState('todos')
    const [name, setName] = useState('todos')
    // const [tm, setTm] = useState('')
    const [sellers, setSeller] = useState()
    // const [comission, setComission] = useState()
    const [unity, setUnity] = useState('todos')


    const filteredForDate = fetchData?.filter(res => res.dataMatricula.split("/")[1] === month)
    const filteredForName = fetchData?.filter(res => res.owner.toLowerCase().includes(name.toLowerCase()))
    const filteredForBoth = fetchData?.filter(res => res.dataMatricula.split("/")[1] === month && res.owner.toLowerCase().includes(name.toLowerCase()))

    const filteredDateForComercial = fetchData?.filter(res => res.owner.toLowerCase().includes(userData.name) && res.dataMatricula.split("/")[1] === month)
    const fetchDataForComercial = fetchData?.filter(res => res.owner.toLowerCase().includes(userData.name))

    const filteredForUnity = fetchData?.filter(res => res.unidade.toLowerCase().includes(unity))
    const unityByMonth = fetchData?.filter(res => res.unidade.toLowerCase().includes(unity) && res.dataMatricula.split("/")[1] === month)
    const filteredByAll = fetchData?.filter(res => res.unidade.toLowerCase().includes(unity) && res.dataMatricula.split("/")[1] === month && res.owner.toLowerCase().includes(name))


    const fetchForAdm = fetchData?.filter(res => res.unidade.includes(userData.unity))
    const fetchForAdmByMonth = fetchData?.filter(res => res.unidade.includes(userData.unity) && res.dataMatricula.split("/")[1] === month)
    const fetchForAdmByMonthAndName = fetchData?.filter(res => res.unidade.includes(userData.unity) && res.dataMatricula.split("/")[1] === month && res.owner.toLowerCase().includes(name))
    const fetchForAdmAllMonthButSomeName = fetchData?.filter(res => res.unidade.includes(userData.unity) && res.owner.toLowerCase().includes(name))



    function searchButton() {
        if (userData.role !== 'comercial') {
            if (month !== 'todos' && name === 'todos') {
                setFiltered(filteredForDate)
            }
            if (month === 'todos' && name !== 'todos') {
                setFiltered(filteredForName)
            }
            if (month === 'todos' && name === 'todos') {
                setFiltered(fetchData)
            }
            if (month !== 'todos' && name !== 'todos') {
                setFiltered(filteredForBoth)
            }
            if (month === 'todos' && name === 'todos' && unity !== 'todos') {
                setFiltered(filteredForUnity)
            }
            if (month !== 'todos' && name === 'todos' && unity !== 'todos') {
                setFiltered(unityByMonth)
            }
            if (month !== 'todos' && name !== 'todos' && unity !== 'todos') {
                setFiltered(filteredByAll)
            }
        }
        else {
            if (month === 'todos') {
                setFiltered(fetchDataForComercial)
            }
            if (month !== 'todos' && name === 'todos') {
                setFiltered(filteredDateForComercial)
            }
        }
        if (userData.role === 'administrativo' && userData.unity.length === 1) {
            if (month === 'todos' && name === 'todos') {
                setFiltered(fetchForAdm)
            }
            if (month !== 'todos' && name === 'todos') {
                setFiltered(fetchForAdmByMonth)
            }
            if (month !== 'todos' && name !== 'todos') {
                setFiltered(fetchForAdmByMonthAndName)
            }
            if (month === 'todos' && name !== 'todos') {
                setFiltered(fetchForAdmAllMonthButSomeName)
            }
        }

    }





    useEffect(() => {
        const getSellers = async () => {
            await URI.get('/users', { headers })
                .then(res => {
                    setSeller(res.data?.filter(role =>
                        role.role === 'comercial' || role.role === 'gerencia'))
                }
                )
        }

        getSellers()
    }, [headers, userData.token])


    return (
        <>
            <Container>
                <Header data={userData} />
                <span className='nav-filter' >
                    <label>
                        <p style={{ fontSize: "small" }}>Mês:</p>
                        <Filter onChange={(e) => setMonth(e.target.value)} >
                            <option value="todos">Todos</option>
                            <option value="01">Janeiro</option>
                            <option value="02">Fevereiro</option>
                            <option value="03">Março</option>
                            <option value="04">Abril</option>
                            <option value="05">Maio</option>
                            <option value="06">Junho</option>
                            <option value="07">Julho</option>
                            <option value="08">Agosto</option>
                            <option value="09">Setembro</option>
                            <option value="10">Outubro</option>
                            <option value="11">Novembro</option>
                            <option value="12">Dezembro</option>
                        </Filter>
                    </label>
                    {userData.role === 'comercial' ? "" : <label>
                        <p style={{ fontSize: "small" }}>Nome:</p>
                        <Filter onChange={(e) => setName(e.target.value)}>
                            <option value="todos">Todos</option>
                            {sellers && sellers.map(res => (
                                <option key={res.id} value={res.name}><p>{res.name}</p></option>
                            ))}

                        </Filter>
                    </label>}
                    {userData.role === 'direcao' || userData.role === 'gerencia' ?
                        <label>
                            <p style={{ fontSize: "small" }}>Unidade:</p>
                            <Filter onChange={(e) => setUnity(e.target.value)}>
                                <option value="todos">Todos</option>
                                <option value="ptb">PTB</option>
                                <option value="centro">Centro</option>
                            </Filter>
                        </label> : ""}
                    <SearchButton onClick={() => searchButton()}> Pesquisar</SearchButton>
                    {userData.role !== 'comercial' && <TransitionsModal />}

                </span>
                <span className='table'>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell style={{ fontWeight: 'bold' }}>Aluno</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }} align="right">Responsável</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }} align="right">Unidade</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }} align="right">Background</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }} align="right">Tipo Matrícula</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {
                                    filtered && filtered.map((row) => (
                                        <Row key={row.contrato} row={row} />
                                    ))
                                }

                            </TableBody>
                        </Table>
                    </TableContainer>
                </span>
                <div className='div-tax'>
                    <span>
                        <Tax>{filtered?.length}</Tax>
                    </span>
                </div>
            </Container>
        </>
    )
}

export const Control = memo(ListFiltered)
