import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import { toast } from 'react-toastify';
// import URI from '../../app/utils/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import URI from '../../../app/utils/utils';
import { useUser } from '../../../hooks/userContext';
import { Boxes, ButtonDelete, Filter, Trash } from './styles';

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
    const { fetchData, setFetchData, userData } = useUser()

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function handleFuncs() {
        handleOpen()
    }

    async function DeleteData(id) {
        setOpen(!open)

        const responsible = userData.name

        await toast.promise(
            // axios.delete(`http://localhost:7070${data.url}/${id}?responsible=${responsible}`, { headers }),
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
    }
    const queryCache = useQueryClient();


    const mutationDeleteData = useMutation({
        mutationFn: () => DeleteData(data.data),
        onSuccess: () => {
            queryCache.invalidateQueries(["custom"])

        }
    })

    return (
        <div>
            <Filter onClick={handleFuncs}> <Trash /></Filter>
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
                            <ButtonDelete onClick={() => mutationDeleteData.mutateAsync()}>
                                Apagar
                            </ButtonDelete>
                        </Boxes>
                    </Box>

                </Fade>
            </Modal>
        </div>
    );
}   