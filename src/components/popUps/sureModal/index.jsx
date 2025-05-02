import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';

// import URI from '../../app/utils/utils';
import { Boxes, ButtonDelete } from './styles';
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
    textAlign: 'center'
};


export function SureModal(data) {

    const [open, setOpen] = React.useState(false);
    const [disable, setDisable] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function handleFuncs() {
        handleOpen()
    }


    const handleDeleteData = async () => {
        await data.fn()

    }

    return (
        <div>
            <p onClick={handleFuncs}> Deletar</p>
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
                <Fade in={open} style={{ border: "none", borderRadius: ".9rem", width: "40%" }}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Quer mesmo apagar <q>{data.name}</q> ?
                        </Typography>

                        <Boxes>
                            <span>
                                Este item será excluido
                                de maneira permanente do sistema!

                                Tem certeza que deseja deleta-lo ?
                                <div className='flex'>

                                    <input
                                        type="radio"
                                        id='able'
                                        name='able'
                                        value={true}
                                        onClick={() => setDisable(true)}
                                        defaultChecked={true}
                                    />
                                    <label htmlFor="able">Não</label>
                                </div>
                                <div className='flex'>
                                    <input
                                        type="radio"
                                        id='able'
                                        name='able'
                                        value={false}
                                        onClick={() => setDisable(false)}

                                    />
                                    <label htmlFor="able"> Sim</label>
                                </div>

                            </span>

                            <ButtonDelete
                                disabled={disable}
                                onClick={() => handleDeleteData()}
                            >
                                DELETAR
                            </ButtonDelete>
                        </Boxes>
                    </Box>

                </Fade>
            </Modal>
        </div>
    );
}   