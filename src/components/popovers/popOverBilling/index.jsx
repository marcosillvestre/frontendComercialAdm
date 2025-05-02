import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import * as React from 'react';
import { useBilling } from '../../../hooks/billingRules/billingRulesContext.hook.jsx';
import { useUser } from '../../../hooks/userContext.jsx';
import { CloserClick } from '../../closeClick/index.jsx';
import { SureModal } from '../../source.jsx';
import { Button, Container, Divider } from './styles.jsx';

export function PopOverBilling(data) {
    let { row } = data
    const { setTypeSidebar, setOpenSidebar, } = useUser()

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };


    const { setEditBilling, deleteBilling } = useBilling()

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;


    const reset = async () => {
        deleteBilling.mutateAsync(row.id)
    }


    const handleEdit = () => {
        setTypeSidebar(9)
        setOpenSidebar(true);

        const related = row.category === 'Service' ?
            row.servicesRelated :
            row.productsRelated


        setEditBilling({ related, ...row })
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
                                url="/reguas"
                                fn={reset}

                            />
                        </Divider>



                    </Box>
                </Popper>
            </Container>
        </>

    );
}
