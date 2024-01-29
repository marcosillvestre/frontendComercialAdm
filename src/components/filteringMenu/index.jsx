import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Menu } from '@mui/material';
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { useData } from '../../hooks/dataContext';
import { useUser } from '../../hooks/userContext';
import DatePickers from '../datePicker';
import { Label, RangeDate, Select } from './styles';

import rules from '../../app/utils/Rules/options.jsx';

export default function PositionedMenu(data) {

    const { comissionStatusOpt, coursesOpt, backgroundOpt } = rules


    const [anchorEl, setAnchorEl] = React.useState(null);

    const {
        filtered, setFiltered, handleClose, mutationControlData,
        sellers, setOpenPeriodRange, unity, mutation,
        allData
    } = useUser()

    const { typeFilter, setTypeFilter } = useData()

    const handleFilter = (value, type) => {
        if (filtered.length < 1) {
            alert("Este período de tempo não há matrículas")
        }

        if (filtered.length > 0) {

            let data = typeFilter.filter(res => res.key === type)
            let bool = data.length < 1 && typeFilter.length <= 2

            const filter = type === 'owner' ? allData.filter(data => data[type].toLowerCase().includes(value.toLowerCase())) : allData.filter(data => data[type].toLowerCase() === value.toLowerCase())

            if (bool && type === 'owner') {
                setTypeFilter([...typeFilter, { "key": type, "value": value }])
                setFiltered(filter)
            }
            if (bool && type !== 'owner') {
                setTypeFilter([...typeFilter, { "key": type, "value": value }])
                setFiltered(filter)

            }
            if (!bool) {
                return alert("Erro ao aplicar o filtro dinâmico")
            }
            close()



        }
    }



    const url = useLocation()


    const handleFilterRangeDate = async () => {

        setTypeFilter([])
        url.pathname === '/controle-comercial' && await mutationControlData.mutate()
        url.pathname === '/controle-comissional' && await mutation.mutate()

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
        <div style={{ width: "100%" }}>
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
        </div>
    );
}