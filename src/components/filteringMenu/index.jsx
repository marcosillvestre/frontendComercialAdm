import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import * as React from 'react';
import { useUser } from '../../hooks/userContext';
// import { handleClose } from '../filtering';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DatePickers from '../datePicker';
import { Label, RangeDate, Select } from './styles';

export default function PositionedMenu(data) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const { filtered, setFiltered, handleClose, selectedEndDate,
        selectedInitialDate, fetchData, setSelectedInitialDate,
        setSelectedEndDate, userData, sellers } = useUser()




    const handleFilter = (value, type) => {
        if (type === 'owner') {
            setFiltered(filtered.filter(res => res[type].toLowerCase().includes(value)))
            close()
        } else {
            if (filtered) {
                setFiltered(filtered.filter(res => res[type] === value))
            }
            close()

        }
    }

    const setRange = (type) => {
        if (selectedInitialDate === null) {
            setSelectedInitialDate(new Date('2022-01-01'))
        }
        if (selectedEndDate === null) {
            setSelectedEndDate(new Date())
        }

        let comercialFetchedData;

        const filteredByComercial = fetchData?.filter(res => res.owner.toLowerCase().includes(userData.name.toLowerCase()))
        userData.role !== 'comercial' ? comercialFetchedData = fetchData : comercialFetchedData = filteredByComercial


        const generalFilter = comercialFetchedData?.filter(res => {
            const date = res[type].split("/")
            if (type === 'dataValidacao') {
                let year = date[2]?.split(",")
                if (year) {
                    return new Date(`${year[0]}-${date[1]}-${date[0]}`) >= selectedInitialDate && new Date(`${date[2]}-${date[1]}-${date[0]}`) <= selectedEndDate
                }
            } else {
                return new Date(`${date[2]}-${date[1]}-${date[0]}`) >= selectedInitialDate && new Date(`${date[2]}-${date[1]}-${date[0]}`) <= selectedEndDate

            }
        })

        setFiltered(generalFilter)

    }


    const handleFilterRangeDate = (name) => {
        name === "Data de validação" && setRange('dataValidacao')
        name === "Data de comissionamento" && setRange('dataComissionamento')
        name === "Data de matrícula" && setRange('dataMatricula')

        close()
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
        <div>
            <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
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
                            <option value="PTB">PTB</option>
                            <option value="Centro">Centro</option>
                            <option value="Aliança Eterna">Aliança Eterna</option>
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
                                sellers.map(res => (
                                    <>
                                        <option value={res.name}>{res.name}</option>
                                    </>
                                ))

                            }
                        </Select>
                    </Label>
                }
                {
                    data.name === "Data de matrícula" &&
                    <RangeDate >
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
                        <button className='button-filter' onClick={() => handleFilterRangeDate(data.name)}>Aplicar filtro</button>
                    </RangeDate>
                }
                {
                    data.name === "Data de comissionamento" &&
                    <RangeDate >
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
                        <button className='button-filter' onClick={() => handleFilterRangeDate(data.name)}>Aplicar filtro</button>
                    </RangeDate>
                }
                {
                    data.name === "Data de validação" &&
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
                        <button className='button-filter' onClick={() => handleFilterRangeDate(data.name)}>Aplicar filtro</button>
                    </RangeDate>
                }

            </Menu>
        </div>
    );
}