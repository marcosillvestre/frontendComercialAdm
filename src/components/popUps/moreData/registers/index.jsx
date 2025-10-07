import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useRegister } from '../../../../hooks/registers/registersContext.hook';
import { EmptyData } from '../../../emptyData';
import { Loading } from '../../../loadingSpin';
import { SureCloseSave } from '../../sureCloseAndSave';
import { Anexes } from './anexos';
import { CustomFields } from './customFields';
import { Financial } from './financeiro';
import { Historic } from './historico';
import { Matricula } from './matricula';
import { Pedagogic } from './pedagogico';
import { Boxes, ButtonDelete, Filter, Footer, Header, NavButton, RollingButtons } from './styles';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    fontSize: 10,
};

export function MoreDataRegisters(info) {
    const { data } = info
    const { name, id } = data

    const buttons = [
        "Matrícula",
        // "Observações",
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
        // "Observações": <Observations />,
        "Anexos": <Anexes />,
        "Histórico": <Historic />,
        "Pedagógico": <Pedagogic />,

        "Financeiro": <Financial />,
        "Campos personalizados": <CustomFields />,

        "Contrato": <EmptyData width='25rem' />,
        "Aluno": <EmptyData width='25rem' />,
        "Responsável": <EmptyData width='25rem' />,
    }
    const { queryOnlyRegister, updateCustomFields,
        setRegisterId, editRegister, setEditRegister, setUpdateRegister,
        updateRegister
    } = useRegister()

    React.useLayoutEffect(() => setRegisterId(id), [id])


    const [choosen, setChoosen] = React.useState(buttons[0])

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setUpdateRegister(null)
    }
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
                                        disabled={isPending}
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
                                    <Loading /> :
                                    elements[choosen]
                            }

                        </Boxes>

                        <Footer
                            active={
                                choosen !== 'Observações' &&
                                choosen !== 'Anexos'
                            }
                        >
                            {
                                updateRegister === null ?
                                    <ButtonDelete
                                        cancel={false}
                                        onClick={() => handleClose()}
                                    >
                                        CANCELAR
                                    </ButtonDelete>
                                    :
                                    <ButtonDelete
                                        cancel={false}
                                    >
                                        <SureCloseSave
                                            fn={handleClose}
                                        />
                                    </ButtonDelete>

                            }

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