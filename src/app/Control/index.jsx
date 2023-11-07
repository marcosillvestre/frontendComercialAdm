
import { TableBody } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { memo } from 'react';
import { Container, NothingHere, Tax } from './styles';

import { Row } from '../../components/table';

import { useUser } from '../../hooks/userContext';

import { yupResolver } from '@hookform/resolvers/yup';
import SearchIcon from '@mui/icons-material/Search';
import { useForm } from 'react-hook-form';
import LoadingSpin from "react-loading-spin";
import * as Yup from 'yup';
import ControlledAccordions from '../../components/filtering';
import { default as SelectFilterBy } from '../../components/selectFilterby';
import SelectPeriodCustom from '../../components/selectPeriodCustom';
import MiniDrawer from '../../components/sideBar';
import { useData } from '../../hooks/dataContext';

const ListFiltered = () => {
    const { filtered, pushData, setFiltered, resetFilter, setPeriodFilter } = useUser()
    const { typeFilter, setTypeFilter } = useData()


    const schema = Yup.object({ name: Yup.string() })
    const { register, handleSubmit, } = useForm({ resolver: yupResolver(schema) });


    const sender = (data) => {
        if (data.name === '') {
            pushData(false)
        }
        const filteredByName = filtered?.filter(res => res.name.toLowerCase().includes(data.name.toLowerCase()))
        setFiltered(filteredByName)

    }

    const customizablePeriods = [
        { name: "Data de matrícula", undleLabel: true },
        { name: "Data de validação", undleLabel: true }
    ]

    const predeterminedPeriods = [
        { name: "Últimos 7 dias" },
        { name: "Este mês" },
        { name: "Mês passado" },
        { name: "Mês retrasado" },
        { name: "Este ano" },
        { name: "Período personalizado", customizable: true },
    ]

    const handleSearch = () => {
        setPeriodFilter(false)
        setTypeFilter([])
    }
    return (
        <>
            <Container>
                <MiniDrawer />
                <span className='nav-filter' >

                    <SelectFilterBy opt={customizablePeriods} />
                    <SelectPeriodCustom opt={predeterminedPeriods} />

                    <form onSubmit={handleSubmit((data) => sender(data))}>
                        <p>Pesquisar no período:</p>
                        <div className='name-filter'>
                            <input type="text" placeholder='Pesquisar..' className='filter' list='list' {...register('name')} />
                            <datalist id='list'>
                                {
                                    filtered?.length > 0 && filtered.map(res => (
                                        <option key={res.contrato} value={res.name} />

                                    ))

                                }
                            </datalist>
                            <button type='submit' className='button' onClick={() => handleSearch()}><SearchIcon /></button>
                        </div>
                    </form>

                    <ControlledAccordions />

                    <div className='div-tax'>
                        <Tax>{filtered?.length}</Tax>
                    </div>


                    <div className='filters'>
                        {typeFilter?.length > 0 &&
                            <>
                                <p>filtros aplicados: </p>
                                <div>
                                    {typeFilter.map(res => (
                                        <span key={res.key} onClick={() => resetFilter(res)}>
                                            <p className='header'>{res.key}:</p>
                                            <p className='body'>{res.value}</p>
                                        </span>
                                    ))}
                                </div>
                            </>
                        }
                    </div>



                </span>

                <span className='table'>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell style={{ fontWeight: 'bold' }} align="center">Aluno</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }} align="center">Responsável</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }} align="center">Curso</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }} align="center">Unidade</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }} align="center">Background</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }} align="center">Status do Comissionamento</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {
                                    filtered?.length < 1 || filtered === undefined ? <NothingHere style={{ textAlign: "center" }}>
                                        Nada aqui ainda
                                        <LoadingSpin
                                            duration="4s"
                                            width="15px"
                                            timingFunction="ease-in-out"
                                            direction="alternate"
                                            size="60px"
                                            primaryColor="#1976d2"
                                            secondaryColor="#333"
                                            numberOfRotationsInAnimation={2}
                                        />
                                    </NothingHere> : filtered.map((row) => (
                                        <Row key={row.contrato} row={row} />
                                    ))
                                }

                            </TableBody>
                        </Table>
                    </TableContainer>
                </span>

            </Container>
        </>
    )
}

export const Control = memo(ListFiltered)
