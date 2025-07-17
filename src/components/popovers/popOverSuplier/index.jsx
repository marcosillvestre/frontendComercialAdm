import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import * as React from 'react';
import { useSupliers } from '../../../hooks/supliers/supliersContext.hook.jsx';
import { useUser } from '../../../hooks/userContext.jsx';
import { CloserClick } from '../../closeClick/index.jsx';
import { SureModal } from '../../source.jsx';
import { Button, Container, Divider } from './styles.jsx';

export function PopOverSuplier(data) {
    let { row } = data
    const { setTypeSidebar, setOpenSidebar, } = useUser()

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };


    const { setEditSuplier, deleteSuplier } = useSupliers()
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;


    const reset = async () => {
        deleteSuplier.mutateAsync(row.id)
    }

    const handleEdit = () => {
        setTypeSidebar(8)
        setOpenSidebar(true);
        setEditSuplier(row);

        handleClick();

    }

    return (
        <>
            <CloserClick
                open={anchorEl}
                fn={handleClick} opacity={0.01}
            />

            <Container style={{ zIndex: "11" }}>
                <Button aria-describedby={id} type="button" onClick={handleClick}>
                    <MoreVertIcon />
                </Button>
                <Popper id={id} open={open} anchorEl={anchorEl} sx={{ zIndex: 12 }}>
                    <Box sx={{ border: 0, p: 1, bgcolor: '#ddddddf4', borderRadius: 2 }}>

                        <Divider style={{ display: 'none' }}>
                            {/* <MoreData data={row} /> */}
                        </Divider>


                        <Divider
                            onClick={() => handleEdit()}
                        >
                            Editar
                        </Divider>




                        <Divider onClick={() => {
                        }}>
                            <SureModal
                                data={row?.id}
                                name={row?.name}
                                url="/fornecedor"
                                fn={reset}

                            />
                        </Divider>
                        {/* <Divider onClick={() => {
                            updateOrders.mutateAsync({
                                id: row.id,
                                responsible: userData.name
                            })


                        }}>
                            Deletar
                        </Divider> */}


                    </Box>
                </Popper>
            </Container>
        </>

    );
}
