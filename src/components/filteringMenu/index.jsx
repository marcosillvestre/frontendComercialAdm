import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Menu } from '@mui/material';
import * as React from 'react';
import { useData } from '../../hooks/dataContext';
import { useUser } from '../../hooks/userContext';
import DatePickers from '../datePicker';
import { Label, RangeDate, Select } from './styles';

export default function PositionedMenu(data) {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const {
        filtered, setFiltered, handleClose, pushData,
        sellers, setOpenPeriodRange, unity
    } = useUser()

    const { typeFilter, setTypeFilter } = useData()



    const handleFilter = (value, type) => {
        let data = typeFilter.filter(res => res.key === type)

        data.length < 1 && typeFilter.length <= 2 ?
            setTypeFilter([...typeFilter, { "key": type, "value": value }]) :
            alert("Erro ao aplicar o filtro dinâmico")

        filtered.length < 1 && alert("Este período de tempo não há matrículas")

        if (type === 'owner') {
            setFiltered(filtered.filter(res => res[type].toLowerCase().includes(value)))
            close()
        } else {
            setFiltered(filtered.filter(res => res[type] === value))
            close()
        }
    }


    const handleFilterRangeDate = () => {
        setTypeFilter([])
        pushData(true)

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
                            <option value="Novo aluno">Novo Aluno</option>
                            <option value="Ex-aluno">Ex-Aluno</option>
                            <option value="Aluno Vigente">Aluno Vigente</option>
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
                        <Select defaultValue="Selecione" onChange={(e) => handleFilter(e.target.value, "tipoMatricula")} >
                            <option value="selec">Selecione</option>
                            <option value="Pendente">Pendente</option>
                            <option value="Não aprovado">Não aprovado</option>
                            <option value="Pré-aprovado">Pré-aprovado</option>
                            <option value="Comissionado">Comissionado</option>
                            <option value="Aprovado">Aprovado</option>
                        </Select>
                    </Label>
                }
                {
                    data.name === "Curso" &&
                    <Label >
                        <Select onChange={(e) => handleFilter(e.target.value, "curso")} >
                            <option value="selec">Selecione</option>
                            <option value="Tecnologia"> Tecnologia</option>
                            <option value="Inglês">Inglês</option>
                            <option value="Espanhol"> Espanhol</option>
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
                        <button className='button-filter' onClick={() => handleFilterRangeDate()}>Aplicar filtro</button>
                    </RangeDate>
                }

            </Menu>
        </div>
    );
}