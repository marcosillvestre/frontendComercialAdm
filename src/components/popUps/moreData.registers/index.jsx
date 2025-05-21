import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import LoadingSpin from 'react-loading-spin';
import { useRegister } from '../../../hooks/registers/registersContext.hook';
import { EmptyData } from '../../emptyData';
import { Anexes } from './anexos';
import { CustomFields } from './customFields';
import { Financial } from './financeiro';
import { Historic } from './historico';
import { Matricula } from './matricula';
import { Observations } from './observacoes';
import { Pedagogic } from './pedagogico';
import { Boxes, ButtonDelete, Filter, Footer, Header, NavButton, RollingButtons } from './styles';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 3,
    fontSize: 10,
};


export function MoreDataRegisters(info) {
    const { data } = info
    const { name, id } = data

    const buttons = [
        "Matrícula",
        "Observações",
        "Anexos",
        "Pedagógico",
        "Financeiro",
        "Campos personalizados",
        "Histórico",
        "Contrato",
        "Aluno",
        "Responsável",
    ];

    const elements = {
        "Matrícula": <Matricula />,
        "Observações": <Observations />,
        "Anexos": <Anexes />,
        "Histórico": <Historic />,
        "Pedagógico": <Pedagogic />,

        "Financeiro": <Financial />,
        "Campos personalizados": <CustomFields />,

        "Contrato": <EmptyData />,
        "Aluno": <EmptyData />,
        "Responsável": <EmptyData />,
    }
    const { queryOnlyRegister, updateCustomFields,
        setRegisterId, editRegister, register, setEditRegister, setUpdateRegister
    } = useRegister()

    React.useLayoutEffect(() => setRegisterId(id), [id])


    const [choosen, setChoosen] = React.useState(buttons[0])

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function handleFuncs() {
        handleOpen()
    }

    const { isPending } = queryOnlyRegister

    return (
        <>
            <Filter onClick={handleFuncs}> Mais informações</Filter>
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

                <Fade in={open} style={{
                    border: "none",
                    borderRadius: ".9rem",
                    width: "40%"
                }}>
                    <Box sx={style}>
                        <Header >

                            <Typography
                                id="transition-modal-title"
                                variant="h6"
                                component="h2"
                            >
                                {name}
                            </Typography>

                            <button onClick={() => handleClose()}>
                                <CloseIcon />
                            </button>

                        </Header>

                        <RollingButtons>
                            {
                                buttons.map((res, index) => (

                                    <NavButton
                                        active={res === choosen}
                                        onClick={() => {
                                            setChoosen(res)
                                            setEditRegister(null)
                                            setUpdateRegister(null)
                                        }}
                                        key={index}
                                    >
                                        {res}
                                    </NavButton>
                                ))
                            }
                        </RollingButtons>

                        <Boxes>
                            {
                                isPending ?
                                    <LoadingSpin
                                        duration="4s"
                                        width="15px"
                                        timingFunction="ease-in-out"
                                        direction="alternate"
                                        size="60px"
                                        primaryColor="#1976d2"
                                        secondaryColor="#333"
                                        numberOfRotationsInAnimation={2}
                                    /> :
                                    elements[choosen]
                            }

                        </Boxes>

                        <Footer
                            active={
                                choosen !== 'Observações' &&
                                choosen !== 'Anexos'
                            }
                        >
                            <ButtonDelete
                                cancel={false}
                            >
                                CANCELAR
                            </ButtonDelete>

                            <ButtonDelete
                                cancel={true}
                                disabled={editRegister === null}
                                onClick={() => updateCustomFields(id)}
                            >
                                SALVAR
                            </ButtonDelete>
                        </Footer>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}   