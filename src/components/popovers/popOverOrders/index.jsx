import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import * as React from 'react';
import { toast } from 'react-toastify';
import { useOrders } from '../../../hooks/orders/ordersContext.hook.jsx';
import { useUser } from '../../../hooks/userContext.jsx';
import { CloserClick } from '../../closeClick';
import { Button, Container, Divider } from './styles.jsx';

export function PopOverOrder(data) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { updateOrders, updateLink } = useOrders()

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };



    const { userData } = useUser()
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;



    const { row } = data

    return (
        <>
            <CloserClick
                open={anchorEl}
                fn={handleClick} opacity={.2}
            />

            <Container style={{ zIndex: "11" }}>
                {userData?.admin === true &&
                    <>
                        <Button aria-describedby={id} type="button" onClick={handleClick}>
                            <MoreVertIcon />
                        </Button>
                        <Popper id={id} open={open} anchorEl={anchorEl} sx={{ zIndex: 12 }}>
                            <Box sx={{ border: 0, p: 1, bgcolor: '#ddddddf4', borderRadius: 2 }}>

                                <Divider onClick={() => {
                                    updateOrders.mutateAsync({
                                        id: row.id, value: row.order.id,
                                        where: "sku", responsible: userData.name
                                    })

                                }}>
                                    Deletar
                                </Divider>

                                <Divider onClick={() => {

                                    let copy = row.order.link
                                    navigator.clipboard.writeText(copy)
                                    copy !== "" ? toast.success("Copiado para área de transferência") : toast.error("O recibo ainda não foi emitido")

                                }}>
                                    Copiar link
                                </Divider>
                                {
                                    row.order.dataRetirada === "" ?
                                        <Divider onClick={async () => {
                                            await updateLink.mutateAsync({
                                                value: new Date().toLocaleString(),
                                                where: 'dataRetirada',
                                                id: row.id,
                                                order: [row.order.id]
                                            })
                                        }}>
                                            Marcar como entregue
                                        </Divider>
                                        :
                                        <Divider onClick={async () => {
                                            await updateLink.mutateAsync({
                                                value: "",
                                                where: 'dataRetirada',
                                                id: row.id,
                                                order: [row.order.id]
                                            })
                                        }}>
                                            Marcar como não entregue
                                        </Divider>
                                }


                            </Box>
                        </Popper>
                    </>
                }
            </Container>
        </>

    );
}
