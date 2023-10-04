import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import * as React from 'react';
import { useUser } from '../../hooks/userContext';
// import { handleClose } from '../filtering';
import { Input, Label, LabelDate, Select } from './styles';

export default function PositionedMenu(data) {
    const { handleClose } = useUser()

    const [anchorEl, setAnchorEl] = React.useState(null);
    const { filtered, setFiltered } = useUser()


    // const RegisterDate = () => new Date(body.startContract)
    // const filteredUp = fetchData?.filter(res => {
    //     const date = res.dataMatricula.split("/")
    //     return new Date(`${date[2]}-${date[1]}-${date[0]}`) >= RegisterDate()
    // })

    // const EndRegister = () => new Date(body.endContract)
    // const filteredDown = fetchData?.filter(res => {
    //     const date = res.dataMatricula.split("/")
    //     return new Date(`${date[2]}-${date[1]}-${date[0]}`) <= EndRegister()
    // })

    // const filteredUpDown = fetchData?.filter(res => {
    //     const date = res.dataMatricula.split("/")
    //     return new Date(`${date[2]}-${date[1]}-${date[0]}`) >= RegisterDate() && new Date(`${date[2]}-${date[1]}-${date[0]}`) <= EndRegister()
    // })

    // if (body.startContract !== '' && body.endContract === '') {
    //     setFiltered(filteredUp)
    // }
    // if (body.startContract !== '' && body.endContract !== '') {
    //     setFiltered(filteredUpDown)
    // }

    // if (body.endContract !== '' && body.startContract === '') {
    //     setFiltered(filteredDown)
    // }



    const handleFilter = (value, type) => {
        if (filtered) {
            setFiltered(filtered.filter(res => res[type] === value))
        }
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
                    data.name === "Data de matrícula" &&
                    <LabelDate >
                        <span>
                            <Input type="date" />
                            <h5>até</h5>
                            <Input type="date" />
                        </span>
                    </LabelDate>
                }
                {
                    data.name === "Data de comissionamento" &&
                    <LabelDate >
                        <span>
                            <Input type="date" />
                            <h5>até</h5>
                            <Input type="date" />
                        </span>
                    </LabelDate>
                }
                {
                    data.name === "Data de validação" &&
                    <LabelDate >
                        <span>
                            <Input type="date" />
                            <h5>até</h5>
                            <Input type="date" />
                        </span>
                    </LabelDate>
                }

            </Menu>
        </div>
    );
}