import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import { toast } from 'react-toastify';
// import URI from '../../app/utils/utils';
import { useMutation } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import URI from '../../../app/utils/utils';
import { useUser } from '../../../hooks/userContext';
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
    const { fetchData, setFetchData, userData, invalidateYourQuery } = useUser()

    const [open, setOpen] = React.useState(false);
    const [disable, setDisable] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function handleFuncs() {
        handleOpen()
    }


    async function DeleteData(id) {
        setOpen(!open)

        const responsible = userData.name

        await toast.promise(
            URI.delete(`${data.url}/${id}?responsible=${responsible}`),
            {
                pending: 'Conferindo os dados',
                success: 'Deletado com sucesso',
                error: 'Alguma coisa deu errado'
            }
        ).then(() => {
            const filtered = fetchData?.filter(res => res.id !== id)
            setFetchData(filtered)
        })
            .catch(err => console.log(err))
    }
    const url = useLocation()


    const mutationDeleteData = useMutation({
        mutationFn: () => DeleteData(data.data),
        onSuccess: () => {
            url.pathname === '/controle-comercial' && invalidateYourQuery("register");
            url.pathname === '/campos-personalizados' && invalidateYourQuery("custom");


        }
    })


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
                                onClick={() => {
                                    mutationDeleteData.mutateAsync()
                                    setTimeout(() => {
                                        data.fn()
                                    }, 3000);

                                }}
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