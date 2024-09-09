import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import * as React from 'react';
import { useUser } from '../../../hooks/userContext.jsx';
import { CloserClick } from '../../closeClick';
import { SureModal } from '../../sureModal';
import { Button, Container, Divider } from './styles.jsx';

export function PopOverControl(data) {
    const [anchorEl, setAnchorEl] = React.useState(null);

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
                fn={handleClick} opacity={0}
            />
            <Container>
                {userData?.admin === true &&
                    <>
                        <Button aria-describedby={id} type="button" onClick={handleClick}>
                            <MoreVertIcon />
                        </Button>
                        <Popper id={id} open={open} anchorEl={anchorEl} sx={{ zIndex: 1 }}>
                            <Box sx={{ border: 0, p: 1, bgcolor: '#ddddddf4', borderRadius: 2 }}>

                                <Divider>
                                    <SureModal data={row?.contrato} name={row?.aluno} url="/controle" />
                                </Divider>

                                {/* <Divider>
                                <SureModal data={row?.contrato} name={row?.aluno} url="/controle" />
                            </Divider> */}
                            </Box>
                        </Popper>
                    </>
                }
            </Container>
        </>

    );
}
