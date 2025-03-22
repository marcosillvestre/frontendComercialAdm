import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Menu } from '@mui/material';
import * as React from 'react';
import { Container, Label, RangeDate, Select } from './styles.jsx';

import { useOrders } from '../../../hooks/orders/ordersContext.hook.jsx';
import { DatePickerOrders } from '../../datePickers/datePicker.Orders/index.jsx';

import PropTypes from 'prop-types';


export function CustomDateMenuOrders({ props, fn, where }) {

    const { label, date, options, name, } = props

    const [anchorEl, setAnchorEl] = React.useState(null);

    const { typeFilter, setTypeFilter } = useOrders()


    const handleFilter = (value, type, label, options) => {

        setTypeFilter([...typeFilter, {
            id: new Date().setUTCHours(0),
            "key": type,
            value,
            label,
            options
        }])
    }

    const open = Boolean(anchorEl);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const close = () => {
        setAnchorEl(null);
    };


    const handleFunctions = () => {
        fn(name, label)
        close()
    }

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
                {label}
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
                    date ?
                        <RangeDate>
                            <span className='label'>

                                <button onClick={() => setAnchorEl(null)}><ArrowBackIcon /></button>
                                <h3>Período {label} </h3>
                                <div></div>

                            </span>
                            <span className='span-container'>
                                <DatePickerOrders text="Data inicial" where={where} />
                                <p>até</p>
                                <DatePickerOrders text="Data final" where={where} />
                            </span>
                            <hr />
                            <button
                                className='button-filter'
                                onClick={() =>
                                    handleFunctions()}>
                                Aplicar filtro
                            </button>
                        </RangeDate>
                        :
                        <Label >
                            <Select onChange={(e) => handleFilter(e.target.value, name, label, options)} >
                                <option value="selec">Selecione</option>
                                {
                                    options && options.map((res, idx) => (
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

CustomDateMenuOrders.propTypes = {
    props: PropTypes.shape({
    }).isRequired,
    label: PropTypes.string,
    date: PropTypes.bool,
    option: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string
    })),
    name: PropTypes.string,
    where: PropTypes.string,
    fn: PropTypes.node
};