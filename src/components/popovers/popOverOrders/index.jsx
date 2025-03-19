import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import * as React from 'react';
import { toast } from 'react-toastify';
import { useOrders } from '../../../hooks/orders/ordersContext.hook.jsx';
import { useUser } from '../../../hooks/userContext.jsx';
import { CloserClick } from '../../closeClick';
import { DeliverySure } from '../../popUps/haveYouSure.deliver.orders/index.jsx';
import { ObservationsOrders } from '../../popUps/observations.orders/index.jsx';
import { MoreData, SureModal } from '../../source.jsx';
import { Button, Container, Divider } from './styles.jsx';

export function PopOverOrder(data) {
    let { row } = data

    const [anchorEl, setAnchorEl] = React.useState(null);
    const { updateLink, } = useOrders()

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };


    const { userData } = useUser()
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;


    const reset = async (where, what) => {
        row[where] = what
    }

    const handleUpdate = async (data) => {

        const newData = { ...row, ...data, responsible: userData.name }

        await updateLink.mutateAsync(newData)

        for (const key in data) {
            reset(key, data[key])
        }

    }

    return (
        <>
            <CloserClick
                open={anchorEl}
                fn={handleClick} opacity={0}
            />

            <Container style={{ zIndex: "11" }}>
                <Button aria-describedby={id} type="button" onClick={handleClick}>
                    <MoreVertIcon />
                </Button>
                <Popper id={id} open={open} anchorEl={anchorEl} sx={{ zIndex: 12 }}>
                    <Box sx={{ border: 0, p: 1, bgcolor: '#ddddddf4', borderRadius: 2 }}>

                        <Divider >
                            <MoreData data={row} />
                        </Divider>

                        <Divider >
                            <ObservationsOrders data={row} />
                        </Divider>

                        {
                            row.link &&
                            <Divider onClick={() => {
                                let copy = row.link
                                navigator.clipboard.writeText(copy)
                                toast.success("Copiado para área de transferências")

                            }}>
                                Copiar link do contrato
                            </Divider>
                        }

                        {
                            !row.withdraw ?
                                row.signed ?
                                    <Divider onClick={async () => {
                                        await handleUpdate({
                                            withdraw: new Date().toLocaleString("pt-Br"),
                                            removedBy: userData.name,
                                            status: "REVISADO"

                                        })
                                    }}
                                    >
                                        Marcar como entregue
                                    </Divider>
                                    :
                                    <Divider >
                                        <DeliverySure data={row} fn={reset} />
                                    </Divider>

                                :
                                <Divider onClick={async () => {

                                    await handleUpdate({
                                        withdraw: null,
                                        removedBy: "",
                                        status: "REVISAR",
                                    })

                                }}>
                                    Marcar como não entregue
                                </Divider>
                        }

                        {
                            !row.signed ?
                                <Divider onClick={async () => {

                                    await handleUpdate({
                                        signed: true,
                                    })

                                }}>
                                    Marcar como assinado
                                </Divider>
                                :
                                <Divider onClick={async () => {
                                    await handleUpdate({
                                        signed: false,
                                    })
                                }}>
                                    Marcar como não assinado
                                </Divider>
                        }



                        {
                            row.available ?
                                <Divider onClick={async () => {
                                    await handleUpdate({
                                        available: false,
                                        status: 'CANCELADO'
                                    })
                                }}>
                                    Cancelar pedido
                                </Divider>
                                :
                                <Divider onClick={async () => {
                                    await handleUpdate({
                                        available: true,
                                        status: 'REVISAR'
                                    })
                                }}>
                                    Reaver pedido
                                </Divider>
                        }

                        <Divider onClick={() => {
                        }}>
                            <SureModal
                                data={row?.id}
                                name={row?.name}
                                url="/pedidos"
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
