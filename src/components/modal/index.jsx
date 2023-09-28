import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useUser } from '../../hooks/userContext';
import { Boxes, Filter, Input, Label, LabelDate, Select, Submit } from './styles';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function TransitionsModal() {
    const { fetchData, setFiltered } = useUser()



    async function Sender(body) {
        const StartComission = () => new Date(body.startComission)
        const filByStartComiss = fetchData.filter(res => new Date(res.dataComissionamento) >= StartComission())

        const EndComission = () => new Date(body.endComission)
        const filByEndComiss = fetchData.filter(res => new Date(res.dataComissionamento) <= EndComission())

        const filByRangeDate = fetchData.filter(res => new Date(res.dataComissionamento) >= StartComission() && new Date(res.dataComissionamento) <= EndComission())

        if (body.startComission !== '' && body.endComission === '') {
            setFiltered(filByStartComiss)
        }

        if (body.startComission === '' && body.endComission !== '') {
            setFiltered(filByEndComiss)
        }

        if (body.startComission !== '' && body.endComission !== '') {
            setFiltered(filByRangeDate)
        }




        const StartValidation = () => new Date(body.startValidation)
        const filByStartValid = fetchData.filter(res => new Date(res.dataValidacao) >= StartValidation())

        const EndValidation = () => new Date(body.endValidation)
        const filByEndValid = fetchData.filter(res => new Date(res.dataValidacao) <= EndValidation())

        const filByBoth = fetchData.filter(res => new Date(res.dataValidacao) >= StartValidation() && new Date(res.dataValidacao) <= EndValidation())


        if (body.startValidation !== '' && body.endValidation === '') {
            setFiltered(filByStartValid)
        }
        if (body.startValidation === '' && body.endValidation !== '') {
            setFiltered(filByEndValid)
        }
        if (body.startValidation !== '' && body.endValidation !== '') {
            setFiltered(filByBoth)
        }



        const RegisterDate = () => new Date(body.startContract)
        const filteredUp = fetchData?.filter(res => {
            const date = res.dataMatricula.split("/")
            return new Date(`${date[2]}-${date[1]}-${date[0]}`) >= RegisterDate()
        })

        const EndRegister = () => new Date(body.endContract)
        const filteredDown = fetchData?.filter(res => {
            const date = res.dataMatricula.split("/")
            return new Date(`${date[2]}-${date[1]}-${date[0]}`) <= EndRegister()
        })

        const filteredUpDown = fetchData?.filter(res => {
            const date = res.dataMatricula.split("/")
            return new Date(`${date[2]}-${date[1]}-${date[0]}`) >= RegisterDate() && new Date(`${date[2]}-${date[1]}-${date[0]}`) <= EndRegister()
        })

        if (body.startContract !== '' && body.endContract === '') {
            setFiltered(filteredUp)
        }
        if (body.startContract !== '' && body.endContract !== '') {
            setFiltered(filteredUpDown)
        }

        if (body.endContract !== '' && body.startContract === '') {
            setFiltered(filteredDown)
        }



        const filteredByName = fetchData?.filter(res => res.aluno.toLowerCase().includes(body.aluno.toLowerCase()))
        const filteredByresponsible = fetchData?.filter(res => res.name.toLowerCase().includes(body.responsavel.toLowerCase()))
        const filteredByBackground = fetchData?.filter(res => res.background.toLowerCase() === body.tipoMatricula.toLowerCase())
        const filteredByBackgroundAndComission = fetchData?.filter(res => res.background.toLowerCase() === body.tipoMatricula.toLowerCase() && res.comissaoStatus === body.comissaoStatus)
        const filteredByBackgroundAndComissionAndCourse = fetchData?.filter(res => res.background.toLowerCase() === body.tipoMatricula.toLowerCase() && res.comissaoStatus === body.comissaoStatus && res.classe === body.curso)
        const filteredByComissionAndCourse = fetchData?.filter(res => res.comissaoStatus === body.comissaoStatus && res.classe === body.curso)
        const filteredByBackgroundAndCourse = fetchData?.filter(res => res.background.toLowerCase() === body.tipoMatricula.toLowerCase() && res.classe === body.curso)
        const filteredByCourse = fetchData?.filter(res => res.classe === body.curso)
        const filteredByComission = fetchData?.filter(res => res.comissaoStatus === body.comissaoStatus)


        if (body.aluno !== '') {
            setFiltered(filteredByName)
        }
        if (body.responsavel !== '') {
            setFiltered(filteredByresponsible)
        }
        if (body.tipoMatricula !== 'selec') {
            setFiltered(filteredByBackground)
        }
        if (body.comissaoStatus !== 'selec') {
            setFiltered(filteredByComission)
        }
        if (body.curso !== 'selec') {
            setFiltered(filteredByCourse)
        }
        if (body.tipoMatricula !== 'selec' && body.comissaoStatus !== 'selec') {
            setFiltered(filteredByBackgroundAndComission)
        }
        if (body.tipoMatricula !== 'selec' && body.curso !== 'selec') {
            setFiltered(filteredByBackgroundAndCourse)
        }
        if (body.tipoMatricula !== 'selec' && body.comissaoStatus !== 'selec' && body.curso !== 'selec') {
            setFiltered(filteredByBackgroundAndComissionAndCourse)
        }
        if (body.comissaoStatus !== 'selec' && body.curso !== 'selec') {
            setFiltered(filteredByComissionAndCourse)
        }

    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function handleFuncs() {
        handleOpen()
    }

    const schema = Yup.object({
        aluno: Yup.string(),
        responsavel: Yup.string(),
        background: Yup.string(),
        tipoMatricula: Yup.string(),
        comissaoStatus: Yup.string(),
        curso: Yup.string(),
    })


    const { register, handleSubmit, } = useForm({ resolver: yupResolver(schema) });

    return (
        <div>
            <Filter onClick={handleFuncs}> Filtros Avançados</Filter>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open} style={{ border: "none", borderRadius: ".9rem", width: "65vw" }}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Filtros Avançados
                        </Typography>

                        <Boxes>
                            <form onSubmit={handleSubmit((data) => Sender(data))}>
                                <div>
                                    <Label >
                                        <Input type="text" placeholder='Aluno' {...register('aluno')} list='people' />
                                        <datalist id='people'>
                                            {fetchData?.map(res => (
                                                <option key={res.contrato} value={res.aluno} />

                                            ))
                                            }
                                        </datalist>
                                    </Label>

                                    <Label >
                                        <Input type="text" placeholder='Responsável'{...register('responsavel')} list='responsible' />
                                        <datalist id='responsible'>
                                            {fetchData?.map(res => (
                                                <option key={res.contrato} value={res.name} />

                                            ))
                                            }
                                        </datalist>
                                    </Label>
                                </div>

                                <Submit type="submit" onClick={() => setOpen(!open)} />
                            </form>
                            <form onSubmit={handleSubmit((data) => Sender(data))}>
                                <div>

                                    <Label >
                                        <h4>Tipo Matricula</h4>
                                        <Select  {...register('tipoMatricula')} >
                                            <option value="selec">Selecione</option>
                                            <option value="Novo aluno">Novo Aluno</option>
                                            <option value="Ex-aluno">Ex-Aluno</option>
                                            <option value="Aluno Vigente">Aluno Vigente</option>
                                        </Select>
                                    </Label>

                                    <Label >
                                        <h4>Comissão Status:</h4>
                                        <Select  {...register('comissaoStatus')} >
                                            <option value="selec">Selecione</option>
                                            <option value="Pendente">Pendente</option>
                                            <option value="ok">Ok</option>
                                            <option value="nao">Não</option>
                                        </Select>
                                    </Label>

                                    <Label >
                                        <h4>Curso desejado:</h4>
                                        <Select type="text" {...register('curso')} >
                                            <option value="selec">Selecione</option>
                                            <option value="Fluency Way – Class"> Fluency Way – Class</option>
                                            <option value="Fluency Way – X">Fluency Way – X</option>
                                            <option value="El Espanol"> El Espanol</option>
                                            <option value="Tecnologia">Tecnologia</option>
                                        </Select>
                                    </Label>
                                </div>
                                <Submit type="submit" onClick={() => setOpen(!open)} />
                            </form>
                            <form onSubmit={handleSubmit((data) => Sender(data))}>
                                <div>
                                    <LabelDate >
                                        <h4>Período da venda</h4>
                                        <span>
                                            <Input {...register('startContract')} type="date" />
                                            <h5>até</h5>
                                            <Input {...register('endContract')} type="date" />
                                        </span>
                                    </LabelDate>

                                    <LabelDate >
                                        <h4>Período de validação</h4>
                                        <span>
                                            <Input {...register('startValidation')} type="date" />
                                            <h5>até</h5>
                                            <Input {...register('endValidation')} type="date" />
                                        </span>
                                    </LabelDate>

                                    <LabelDate >
                                        <h4>Período de comissionamento</h4>
                                        <span>
                                            <Input {...register('startComission')} type="date" />
                                            <h5>até</h5>
                                            <Input {...register('endComission')} type="date" />
                                        </span>
                                    </LabelDate>
                                </div>
                                <Submit type="submit" onClick={() => setOpen(!open)} />
                            </form>
                        </Boxes>
                    </Box>

                </Fade>
            </Modal>
        </div>
    );
}   