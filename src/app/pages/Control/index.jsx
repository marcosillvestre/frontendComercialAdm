
import { TableBody } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { memo, useState } from 'react';
import { Container, Filters, InputSearch, NavControl, NothingHere, NumberContainer, Tabled } from './styles';

import { useUser } from '../../../hooks/userContext';

import FilterListIcon from '@mui/icons-material/FilterList';
import LoadingSpin from "react-loading-spin";
import noData from '../../../assets/noData.svg';

import {
    CustomizableButton,
    CustomizedMenus,
    Select
} from '../../../components/source.jsx';

import { FirstRow } from '../../../components/tables/table/index.jsx';

import { useData } from '../../../hooks/dataContext';

import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import businessRules from '../../utils/Rules/options.jsx';
import Pagination from './pagination';

export const ListFiltered = () => {


    const { userData, filtered, setFiltered, resetFilter,
        setPeriodFilter, mutationControlData, setTake,
        take, skip, setSkip, allData,
        //  setTypeSidebar, setOpenSidebar,
        setPeriodRange, setSelectedInitialDate, setSelectedEndDate,

        setQueryParam,
        selectedInitialDate, selectedEndDate
    } = useUser()


    const [searcher, setSearcher] = useState('')


    const { typeFilter, setTypeFilter,
        customizableArray, handleCustomizableData, setCustomizableArray } = useData()



    const handleResetFilter = (filter) => {
        if (filter === undefined) {
            setTypeFilter([])
            resetFilter()
        } else {
            setTypeFilter(typeFilter.filter(res => res !== filter))
            resetFilter(filter)
        }
    }


    const { isPending, data } = mutationControlData

    const sender = (name) => {

        setPeriodFilter(false)
        setTypeFilter([])

        const filteredByName = filtered?.filter(res => {
            return res.name.toLowerCase().includes(name.toLowerCase()) ||
                res.aluno.toLowerCase().includes(name.toLowerCase()) && res

        })
        if (filteredByName.length === 0) {
            return setQueryParam({ param: "name", value: name })
        }

        name !== '' && setFiltered(filteredByName)
    }



    const handleData = (data) => {
        setSkip(0)
        handleResetFilter()
        const handleTake = data !== 'all' ? parseInt(data) : data

        setTake(handleTake)
    }


    const from = take + skip
    const diference = data !== undefined && from % data.total
    const allContracts = filtered.map(res => res.contrato)




    // const openCreateContract = () => {
    //     setTypeSidebar(2)
    //     setOpenSidebar(true)
    // }


    const handleCheck = async (label) => {
        // setSearchParams(state => {
        //     state.delete('contract')
        //     return state
        // })
        setQueryParam({ param: "", value: "" })
        setSelectedInitialDate(null)
        setSelectedEndDate(null)
        setCustomizableArray([])
        setPeriodRange(label)

        setTypeFilter([])

        setTake(10)
        setSkip(0)

        setPeriodFilter(false)

        // setLabel(label)
    }


    return (
        <Container>
            {
                userData.name !== "Marco" ?
                    <NothingHere >
                        DESCONTINUADO

                        <img src={noData} alt="No data image" />
                    </NothingHere>
                    :
                    <>


                        <span className='nav-filter' >
                            <div className='wrapper'>

                                <label htmlFor="select">
                                    <p>Período</p>
                                    <Select
                                        id="select"
                                        label={businessRules.predeterminedPeriods[0].name}
                                        option={businessRules.predeterminedPeriods}
                                        width="100%"
                                        // field="type"
                                        // where="customField"
                                        fn={[handleCheck]}
                                    />
                                    {
                                        selectedInitialDate &&
                                        `${selectedInitialDate !== null ? new Date(selectedInitialDate).toLocaleDateString() : ""} ~ ${selectedEndDate !== null ? new Date(selectedEndDate).toLocaleDateString() : ""}`
                                    }
                                </label>

                                <label className="box-search">
                                    <p>Pesquisar no período</p>
                                    <InputSearch
                                        type="text"
                                        placeholder='Pesquisar..'
                                        className='filter'
                                        list='list'
                                        onChange={(e) => {
                                            setSearcher(e.target.value)
                                            if (e.target.value === "") {
                                                // setTake(10)
                                                // setFiltered(allData)
                                                setQueryParam({ param: "", value: "" })

                                            }
                                        }}
                                    />

                                    <button onClick={() => sender(searcher)}>
                                        <SearchIcon />
                                    </button>

                                    <datalist id='list' >
                                        {
                                            allData?.length > 0 && allData.map(res => (
                                                <option
                                                    key={res.contrato}
                                                    value={res.name}
                                                >
                                                    Aluno: {res.aluno}
                                                </option>
                                            ))
                                        }
                                    </datalist>
                                </label>

                                <CustomizedMenus />
                            </div>


                        </span>
                        <div className='wrapper'>

                            <Filters className='filters'>
                                {typeFilter?.length > 0 &&
                                    <>
                                        <div >
                                            {typeFilter.map(res => (
                                                <span
                                                    key={res.key}
                                                    onClick={() => handleResetFilter(res)}
                                                >
                                                    <p className='header'>{businessRules.fields[res.key]}:</p>
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
                        </div>


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
                                            {
                                                userData.admin &&

                                                <div className='container'>
                                                    <p>{customizableArray.filter(res => res.isChecked === true).length} registro(s) selecionado(s)</p>
                                                    <CustomizableButton
                                                        element={1}
                                                        able={customizableArray.some(res => res?.isChecked !== false)}
                                                        label={"Alterar em lote"}
                                                        flex={true}
                                                        toBeChanged={customizableArray}
                                                    />
                                                </div>
                                            }

                                            <div className='container'>
                                                <p>{filtered.length} registro(s)</p>

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


                                                        {
                                                            userData.admin &&
                                                            <TableCell >
                                                                <input
                                                                    style={{ width: '1rem', height: '1rem' }}
                                                                    type="checkbox"
                                                                    name="allSelect"
                                                                    onClick={(e) => handleCustomizableData(e, allContracts)}
                                                                    checked={customizableArray.filter(res => res.isChecked === true).length === filtered.length ? true : false}
                                                                />
                                                            </TableCell>
                                                        }


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
                                                            <FirstRow key={row.contrato} row={row} index={index} />
                                                        ))
                                                    }
                                                </TableBody>

                                            </Table>

                                        </TableContainer>


                                        <NumberContainer>
                                            <div className='container-select'>
                                                <Select
                                                    label={take}
                                                    option={[
                                                        { name: 10 },
                                                        { name: 25 },
                                                        { name: 50 },
                                                        { name: 100 },
                                                        { name: 'all' },
                                                    ]}
                                                    width="2rem"
                                                    fn={[handleData]}
                                                >

                                                </Select>
                                                <p>Registros por página</p>
                                            </div>

                                            <div className='container-select'>
                                                <p>Monstrando</p>
                                                {
                                                    data !== undefined && take + skip > data.total ?
                                                        take > data.total ?

                                                            <p>{` ${skip + 1} - ${data.total} de
                                            ${isPending === false && data !== undefined && data.total} registros`} </p> :

                                                            <p>{` ${skip + 1} - ${take + skip - diference} de
                                            ${isPending === false && data !== undefined && data.total} registros`} </p> :

                                                        <p>{` ${skip + 1} - ${take === 'all' ? data.total : take + skip} de
                                            ${isPending === false && data !== undefined && data.total} registros`} </p>
                                                }
                                            </div>

                                        </NumberContainer>
                                        {
                                            isPending === false &&
                                            data !== undefined &&
                                            data.total > take &&
                                            <div className='separation'>
                                                <span>
                                                    <hr />
                                                    <FilterListIcon />
                                                    <hr />
                                                </span>

                                                <span>
                                                    <Pagination data={isPending === false && data !== undefined && data.total} />
                                                </span>
                                            </div>
                                        }

                                    </Tabled>

                        }
                    </>
            }

        </Container>
    )
}

export const Control = memo(ListFiltered)

ListFiltered.propTypes = {
    location: PropTypes.object
}