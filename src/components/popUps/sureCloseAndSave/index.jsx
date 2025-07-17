import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useState } from 'react';


import { Boxes, ButtonDelete, Container, Fades, Filter, Footer, Header } from './styles';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    fontSize: 12,
};



export function SureCloseSave(info) {

    const { fn, edition } = info

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        if (edition) return setOpen(true)

        fn()
    };

    const handleClose = () => {
        setOpen(false)
    };


    return (
        <Container>
            <Filter
                className='defaultButton redButton'

                onClick={() => handleOpen()}
                edited={edition}
                style={{ width: "100%" }}>
                CANCELAR
            </Filter>


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
                <Fades in={open}>
                    <Box sx={style}>

                        <Header >

                            <Typography
                                id="transition-modal-title"
                                variant="h6"
                                component="h2"
                            >
                                Descartar edições?

                            </Typography>

                            <button onClick={() => handleClose()}>
                                <CloseIcon />
                            </button>

                        </Header>

                        <Boxes>
                            <div className='container'>
                                <small>
                                    Você perderá todas as edições feitas
                                </small>

                            </div>
                        </Boxes>

                        <Footer

                        >
                            <ButtonDelete
                                cancel={true}
                                onClick={() => handleClose()}
                            >
                                VOLTAR
                            </ButtonDelete>

                            <ButtonDelete
                                onClick={() => {
                                    handleClose();
                                    fn();
                                }}

                            >
                                DESCARTAR
                            </ButtonDelete>
                        </Footer>


                    </Box>

                </Fades>

            </Modal>
        </Container>
    );
}