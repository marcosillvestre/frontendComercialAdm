
import { memo, useState } from 'react';
import { Container, Filters, InputSearch, NothingHere, Tabled } from './styles';

import { useUser } from '../../../hooks/userContext';

import noData from '../../../assets/noData.svg';

import {
    CustomizedMenus,
    Select
} from '../../../components/source.jsx';


import { useData } from '../../../hooks/dataContext';

import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import TableMainData from '../../../components/tables/tableData2/index.jsx';
import businessRules from '../../utils/Rules/options.jsx';

export const ListFiltered = () => {


    const { filtered, setFiltered, resetFilter,
        setPeriodFilter, mutationControlData, setTake,
        setSkip, allData,
        setPeriodRange, setSelectedInitialDate, setSelectedEndDate,
        setQueryParam,
        selectedInitialDate, selectedEndDate
    } = useUser()


    const [searcher, setSearcher] = useState('')


    const { typeFilter, setTypeFilter,
        // customizableArray, handleCustomizableData,
        setCustomizableArray } = useData()



    const handleResetFilter = (filter) => {
        setQueryParam({ param: "", value: "" })

        if (filter === undefined) {
            setTypeFilter([])
            resetFilter()
        } else {
            setTypeFilter(typeFilter.filter(res => res !== filter))
            resetFilter(filter)
        }
    }


    const { data } = mutationControlData

    const sender = (name) => {
        setPeriodFilter(false)
        setTypeFilter([])

        const filteredByName = filtered?.filter(res => {
            return res.name.toLowerCase().includes(name.toLowerCase()) ||
                res['customFields']["Nome do aluno"]
                    .toLowerCase().includes(name.toLowerCase())
                && res

        })

        if (filteredByName.length === 0) {
            return setQueryParam({ param: "name", value: name, path: "Nome do aluno" })
        }

        name !== '' && setFiltered(filteredByName)
    }







    const handleCheck = async (label) => {

        setQueryParam({ param: "", value: "" })
        setSelectedInitialDate(null)
        setSelectedEndDate(null)
        setCustomizableArray([])
        setPeriodRange(label)

        setTypeFilter([])

        setTake(10)
        setSkip(0)

        setPeriodFilter(false)
    }


    return (
        <Container>
            <span className='nav-filter' >
                <div className='wrapper'>

                    <label htmlFor="select">
                        <p>Período</p>
                        <Select
                            id="select"
                            label={businessRules.predeterminedPeriods[0].name}
                            option={businessRules.predeterminedPeriods}
                            width="100%"
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
                                    setQueryParam({ param: "", value: "" })

                                }
                            }}
                        />

                        <button onClick={() => sender(searcher)}>
                            <SearchIcon />
                        </button>

                        <datalist id='list' >
                            {
                                allData?.length > 0 && allData.map((res, idx) => (
                                    <option
                                        key={idx}
                                        value={res.name}
                                    >
                                        Aluno: {res["customFields"]["Nome do aluno"]}
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
                                        onClick={() =>
                                            handleResetFilter(res)}
                                    >
                                        <p className='header'>{res.key}:</p>
                                        <p className='body'>{res.value}</p>
                                    </span>
                                ))}
                            </div>
                            <div>
                                <button
                                    className='defaultButton'
                                    onClick={() => handleResetFilter()}
                                >
                                    Limpar filtros
                                </button>
                            </div>
                        </>
                    }
                </Filters>
            </div>


            {
                filtered === undefined ?
                    "carregando..."
                    :
                    filtered?.length < 1 ?
                        <NothingHere >
                            <img src={noData} alt="No data image" />
                        </NothingHere> :
                        <Tabled>
                            <TableMainData data={
                                data !== undefined &&
                                { total: data.total, deals: filtered }}
                            />
                        </Tabled>

            }
        </Container>
    )
}

export const Control = memo(ListFiltered)

ListFiltered.propTypes = {
    location: PropTypes.object
}