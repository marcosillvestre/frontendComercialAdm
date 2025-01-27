import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Menu } from '@mui/material';
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { useData } from '../../hooks/dataContext';
import { useUser } from '../../hooks/userContext';
import { DatePickers } from '../source.jsx';
import { Container, Label, RangeDate, Select } from './styles';

import { paths } from '../../app/constants/paths.js';
import { useComission } from '../../hooks/comissions/comissionContext.hook.jsx';

export function PositionedMenu(data) {



    const [anchorEl, setAnchorEl] = React.useState(null);

    const {
        filtered, setFiltered, mutationControlData,
        setOpenPeriodRange, setPeriodRange,
        setQueryParam
        // allData
    } = useUser()

    const { typeFilter, setTypeFilter } = useData()
    const { setLabel } = useComission()

    const url = useLocation()

    const handleFilter = (value, type) => {

        if (filtered.length < 1) {
            return alert("Este período de tempo não há matrículas")
        }

        setTypeFilter([...typeFilter, { "key": type, "value": value }])
        data.name === data.where ?
            setQueryParam({ param: type, value }) :
            setQueryParam({ param: "id", value, path: type })

    }



    const handleFilterRangeDate = async () => {
        setPeriodRange(data.name)

        setTypeFilter([])

        url.pathname === paths.control.path && await mutationControlData.refetch()
        url.pathname === paths.comissionalControl.path && setLabel(data.name)

        close()
        setOpenPeriodRange(false)

    }

    const open = Boolean(anchorEl);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const close = () => {
        setAnchorEl(null);
        // handleClose()
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
                {data.label}
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
                    data.label === "Personalizado" ?
                        <RangeDate>
                            <span className='label'>

                                <button onClick={() => setAnchorEl(null)}><ArrowBackIcon /></button>
                                <h3>Período {data.name}</h3>
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
                        :
                        <Label >
                            <Select onChange={(e) => handleFilter(e.target.value, data.name, data.where)} >
                                <option value="selec">Selecione</option>
                                {
                                    data.options && data.options.map((res, idx) => (
                                        <option
                                            key={idx}
                                            value={res.name}
                                        >

                                            {res.name}

                                        </option>
                                    ))
                                }

                            </Select>
                        </Label>

                }

            </Menu>
        </Container>
    );
}