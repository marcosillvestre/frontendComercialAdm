import DoneIcon from '@mui/icons-material/Done';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React from 'react';
import MiniDrawer from '../../components/sideBar';
import { Checked, Container, Icon, ListOpt, Options, SelectButton } from './styles';

function ComissionControll() {
    const [open, setOpen] = React.useState(false)
    const [checked, setChecked] = React.useState(false)
    const [label, setLabel] = React.useState('Período')
    console.log(open)

    const periods = [
        { name: "Esta semana", },
        { name: "Este mês", },
        { name: "Mês passado", },
        { name: "Últimos 3 meses", },
        { name: "Este ano", },

    ]

    const handleCheck = (label) => {
        setChecked(!checked)
        setLabel(label)
        setOpen(!open)
    }
    return (
        <>
            <MiniDrawer />
            <Container>

                <div className="select">
                    <div id="category-select">
                        <label htmlFor="options-view-button">Mês</label>

                        <SelectButton id="select-button" onClick={() => setOpen(!open)}>
                            <div id="selected-value">{label}</div>

                            <Icon id="chevrons" open={open}>
                                <i className='icon-up' > <KeyboardArrowDownIcon /></i>
                                <i className='icon-down'> <KeyboardArrowDownIcon /></i>
                            </Icon>
                        </SelectButton>
                    </div>

                    <ListOpt open={open}>
                        {
                            periods?.map((period) => (
                                <Options className="option" key={period.name} checked={checked} >
                                    <input
                                        type="radio"
                                        name="category"
                                        id="radio"
                                        value='Week'
                                        onClick={() => handleCheck(period.name)}
                                    />
                                    <span className="label">{period.name}</span>
                                    <Checked className='icon-right'><DoneIcon /></Checked>
                                </Options>
                            ))
                        }

                    </ListOpt>
                </div>



            </Container>
        </>
    )
}


export default ComissionControll