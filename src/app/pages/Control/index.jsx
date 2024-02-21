
import { TableBody } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { memo } from 'react';
import { Container, Filters, InputTake, NavControl, NothingHere, NumberContainer, PageUpdate, Tabled, Tax } from './styles';

import { Row } from '../../../components/table';

import { useUser } from '../../../hooks/userContext';

import { yupResolver } from '@hookform/resolvers/yup';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import { useForm } from 'react-hook-form';
import LoadingSpin from "react-loading-spin";
import * as Yup from 'yup';
import noData from '../../../assets/noData.svg';
import CustomizableButton from '../../../components/customizableSenderButton';
import ControlledAccordions from '../../../components/filtering';
import { default as SelectFilterBy } from '../../../components/selectFilterby';
import SelectPeriodCustom from '../../../components/selectPeriodCustom';
import MiniDrawer from '../../../components/sideBar';
import { useData } from '../../../hooks/dataContext';

import { toast } from 'react-toastify';
import URI from '../../utils/utils';
import Pagination from './pagination';

export const ListFiltered = () => {
    const { headers, userData, filtered, setFiltered, resetFilter, setPeriodFilter, mutationControlData, setTake, take, skip, setSkip } = useUser()
    const { typeFilter, setTypeFilter, customizableArray, handleCustomizableData } = useData()

    const handleResetFilter = (filter) => {
        if (filter === undefined) {
            setTypeFilter([])
            resetFilter()
        } else {
            setTypeFilter(typeFilter.filter(res => res !== filter))
            resetFilter(filter)
        }
    }




    const schema = Yup.object({ name: Yup.string() })
    const { register, handleSubmit, } = useForm({ resolver: yupResolver(schema) });

    const { isPending, data } = mutationControlData


    const sender = (data) => {
        setTypeFilter([])
        const filteredByName = filtered?.filter(res => res.name.toLowerCase().includes(data.name.toLowerCase()))
        data.name !== '' && setFiltered(filteredByName)
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

    const handleData = (data) => {
        setSkip(0)
        handleResetFilter()
        const handleTake = data !== 'all' ? parseInt(data) : data

        setTake(handleTake)
    }


    const from = take + skip
    const diference = data !== undefined && from % data.data.total

    const allContracts = filtered.map(res => res.contrato)

    async function pageUpdate() {
        let obj = { data: 0 }
        await toast.promise(
            URI.post('/page-update', obj, { headers }),
            {
                pending: 'Conferindo os dados',
                success: 'Atualizado com sucesso',
                error: 'Alguma coisa deu errado'
            }
        )
            // .catch(() => alert("Alguma coisa deu errado, tente novamente mais tarde"))
            .then((res) => {
                alert(res.data.total)

                setTimeout(() => {
                    window.location.reload()
                }, 700);
            }

            )
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
                            <input
                                type="text"
                                placeholder='Pesquisar..'
                                className='filter'
                                list='list'
                                {...register('name')} />

                            <datalist id='list'>
                                {
                                    filtered?.length > 0 && filtered.map(res => (
                                        <option
                                            key={res.contrato}
                                            value={res.name}
                                        />
                                    ))
                                }
                            </datalist>
                            <button
                                type='submit'
                                className='button'
                                onClick={() => handleSearch()}
                            >
                                <SearchIcon />
                            </button>
                        </div>
                    </form>

                    <span
                        className='flex-group'
                    >
                        <ControlledAccordions />

                        <PageUpdate
                            onClick={() => pageUpdate()}>
                            Atualizar página
                        </PageUpdate>

                        <Tax>
                            {
                                isPending === false &&
                                data !== undefined &&
                                data.data.total
                            }
                        </Tax>
                    </span>



                    <Filters className='filters'>
                        {typeFilter?.length > 0 &&
                            <>
                                <div >
                                    <p>filtros aplicados: </p>
                                    {typeFilter.map(res => (
                                        <span
                                            key={res.key}
                                            onClick={() => handleResetFilter(res)}
                                        >
                                            <p className='header'>{res.key}:</p>
                                            <p className='body'>{res.value}</p>
                                        </span>
                                    ))}
                                </div>
                                <div>
                                    <button
                                        onClick={() => handleResetFilter()}
                                    >Limpar filtros
                                    </button>
                                </div>
                            </>
                        }
                    </Filters>

                </span>

                {
                    isPending ?
                        <NothingHere >
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
                        </NothingHere>
                        :

                        filtered?.length < 1 || filtered === undefined ?
                            <NothingHere >
                                <img src={noData} alt="No data image" />
                            </NothingHere>
                            :
                            <Tabled>
                                <NavControl>

                                    <CustomizableButton
                                        element={1}
                                        able={customizableArray.some(res => res?.isChecked !== false)}
                                        label={"Alterar em lote"}
                                        flex={true}
                                        toBeChanged={customizableArray}
                                    />



                                    <div className='container'>
                                        <p>{filtered.length} registro(s) ao todo</p>
                                        {
                                            userData.role !== 'comercial' &&
                                            <p>{customizableArray.filter(res => res.isChecked === true).length} registro(s) selecionado(s)</p>
                                        }
                                    </div>

                                </NavControl>
                                <TableContainer component={Paper} >

                                    <Table aria-label="collapsible table" >
                                        <TableHead >
                                            <TableRow >
                                                <TableCell
                                                    style={{ fontWeight: 'bold', fontSize: "small", }}
                                                    align="center"
                                                ></TableCell>


                                                <TableCell >
                                                    <input
                                                        style={{ width: '1rem', height: '1rem' }}
                                                        type="checkbox"
                                                        name="allSelect"
                                                        onClick={(e) => handleCustomizableData(e, allContracts)}
                                                        checked={customizableArray.filter(res => res.isChecked === true).length === filtered.length ? true : false}
                                                    />
                                                </TableCell>


                                                <TableCell
                                                    style={{ fontWeight: 'bold', fontSize: "small", }}
                                                    align="center">Data</TableCell>
                                                <TableCell
                                                    style={{ fontWeight: 'bold', fontSize: "small", }}
                                                    align="center">Aluno</TableCell>
                                                <TableCell
                                                    style={{ fontWeight: 'bold', fontSize: "small", }}
                                                    align="center">Responsável</TableCell>
                                                <TableCell
                                                    style={{ fontWeight: 'bold', fontSize: "small", }}
                                                    align="center">Curso</TableCell>
                                                <TableCell
                                                    style={{ fontWeight: 'bold', fontSize: "small", }}
                                                    align="center">Unidade</TableCell>
                                                <TableCell
                                                    style={{ fontWeight: 'bold', fontSize: "small", }}
                                                    align="center">Background</TableCell>
                                                <TableCell
                                                    style={{ fontWeight: 'bold', fontSize: "small", }}
                                                    align="center">Status do Comissionamento</TableCell>
                                                <TableCell
                                                    align="right"></TableCell>
                                            </TableRow>
                                        </TableHead>


                                        <TableBody >
                                            {

                                                filtered && filtered.map((row, index) => (
                                                    <Row key={row.contrato} row={row} index={index} />
                                                ))
                                            }
                                        </TableBody>

                                    </Table>

                                </TableContainer>

                                <NumberContainer>
                                    <div>
                                        <InputTake
                                            defaultValue={take}
                                            onChange={(e) => handleData(e.target.value)}
                                        >
                                            <option value={10}>10</option>
                                            <option value={25}>25</option>
                                            <option value={50}>50</option>
                                            <option value={100}>100</option>
                                            <option value='all'>Tudo</option>

                                        </InputTake>
                                        <p>Registros por página</p>
                                    </div>

                                    {
                                        data !== undefined && take + skip > data.data.total ?
                                            take > data.data.total ?

                                                <p className='mid'>{`Mostrando ${skip + 1} - ${data.data.total} de
                                            ${isPending === false && data !== undefined && data.data.total} registross`} </p> :

                                                <p className='mid'>{`Mostrando ${skip + 1} - ${take + skip - diference} de
                                            ${isPending === false && data !== undefined && data.data.total} registross`} </p> :

                                            <p className='mid'>{`Mostrando ${skip + 1} - ${take === 'all' ? data.data.total : take + skip} de
                                            ${isPending === false && data !== undefined && data.data.total} registros`} </p>
                                    }

                                </NumberContainer>
                                {
                                    isPending === false && data !== undefined && data.data.total / take > 0 &&
                                    <>
                                        <div className='separation'>
                                            <hr />
                                            <FilterListIcon />
                                            <hr />
                                        </div>
                                        <Pagination data={isPending === false && data !== undefined && data.data.total} />
                                    </>
                                }

                            </Tabled>

                }
            </Container>
        </>
    )
}

export const Control = memo(ListFiltered)
