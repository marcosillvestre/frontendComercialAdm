import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Menu } from '@mui/material';
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { useData } from '../../hooks/dataContext';
import { useUser } from '../../hooks/userContext';
import { DatePickers } from '../source.jsx';
import { Container, Label, RangeDate, Select } from './styles';

import { paths } from '../../app/constants/paths.js';
import rules from '../../app/utils/Rules/options.jsx';

export function PositionedMenu(data) {

    const { comissionStatusOpt, coursesOpt, backgroundOpt } = rules


    const [anchorEl, setAnchorEl] = React.useState(null);

    const {
        filtered, setFiltered, handleClose, mutationControlData,
        sellers, setOpenPeriodRange, unity, comissionQuery, setPeriodRange,
        // allData
        setLabel
    } = useUser()

    const { typeFilter, setTypeFilter } = useData()

    const handleFilter = (value, type) => {
        if (filtered.length < 1) {
            return alert("Este período de tempo não há matrículas")
        }


        let data = typeFilter.filter(res => res.key === type)
        let bool = data.length < 1 && typeFilter.length <= 2

        const filter = filtered.filter(data => data[type].toLowerCase().includes(value.toLowerCase()))


        if (bool) {
            setTypeFilter([...typeFilter, { "key": type, "value": value }])
            setFiltered(filter)
        }

        if (!bool) {
            return alert("Erro ao aplicar o filtro dinâmico")
        }
        close()

    }



    const url = useLocation()

    const handleFilterRangeDate = async () => {
        const fn = {
            "periodRange": setPeriodRange(data.name),
            "label": setLabel(data.name),
        }
        data.fn[fn]

        setTypeFilter([])
        url.pathname === paths.control && await mutationControlData.refetch()
        url.pathname === paths.comissionalControl && await comissionQuery.refetch()

        close()
        setOpenPeriodRange(false)

    }

    const open = Boolean(anchorEl);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const close = () => {
        setAnchorEl(null);
        handleClose()
    };

    return (
        <Container >
            <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                style={{ width: "100%", height: "100%" }}
            >
                {data.name}
            </Button>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={close}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'right',
                    horizontal: 'left',
                }}
            >
                {
                    data.name === "Background" &&
                    <Label >
                        <Select onChange={(e) => handleFilter(e.target.value, "background")} >
                            <option value="selec">Selecione</option>
                            {
                                backgroundOpt.map(res => (
                                    <option value={res} key={res}>{res}</option>
                                ))
                            }

                        </Select>
                    </Label>
                }
                {
                    data.name === "Unidade" &&
                    <Label >
                        <Select onChange={(e) => handleFilter(e.target.value, "unidade")} >
                            <option value="selec">Selecione</option>
                            {
                                unity && unity.map(res => (
                                    <option key={res.id} value={res.name}>{res.name}</option>
                                ))
                            }
                        </Select>
                    </Label>
                }
                {
                    data.name === "Status do comissionamento" &&
                    <Label >
                        <Select onChange={(e) => handleFilter(e.target.value, "tipoMatricula")} >

                            <option value="selec">Selecione</option>
                            {
                                comissionStatusOpt.map(res => (
                                    <option value={res} key={res}>{res}</option>
                                ))

                            }
                        </Select>
                    </Label>
                }
                {
                    data.name === "Curso" &&
                    <Label >
                        <Select onChange={(e) => handleFilter(e.target.value, "curso")} >
                            <option value="selec">Selecione</option>
                            {
                                coursesOpt.map(res => (
                                    <option value={res} key={res}>{res}</option>
                                ))

                            }
                        </Select>
                    </Label>
                }
                {
                    data.name === "Consultor" &&
                    <Label >
                        <Select onChange={(e) => handleFilter(e.target.value.toLowerCase(), "owner")} >
                            <option value="selec">Selecione</option>
                            {
                                sellers?.map(res => (
                                    <option key={res.name} value={res.name}>{res.name}</option>
                                ))

                            }
                        </Select>
                    </Label>
                }
                {
                    data.name === "Período personalizado" &&
                    <RangeDate>
                        <span className='label'>

                            <button onClick={() => setAnchorEl(null)}><ArrowBackIcon /></button>
                            <h3>{data.name}</h3>
                            <div></div>

                        </span>
                        <span className='span-container'>
                            <DatePickers text="Data inicial" />
                            <p>até</p>
                            <DatePickers text="Data final" />
                        </span>
                        <hr />
                        <button
                            className='button-filter'
                            onClick={() =>
                                handleFilterRangeDate()}>Aplicar filtro</button>
                    </RangeDate>
                }

            </Menu>
        </Container>
    );
}