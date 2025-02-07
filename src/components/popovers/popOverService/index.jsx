import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useService } from '../../../hooks/services/servicesContext.hook.jsx';
import { useUser } from '../../../hooks/userContext.jsx';
import { CloserClick } from '../../closeClick/index.jsx';
import { SureModal } from '../../popUps/sureModal/index.jsx';
import { Button, Container, Divider } from './styles.jsx';

export function PopOverService(data) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };


    const { setTypeSidebar, userData, setOpenSidebar, } = useUser()

    const { setEditService } = useService()
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const { row } = data

    const handleEdit = () => {
        setTypeSidebar(7)
        setOpenSidebar(true);
        setEditService(row)
    }

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
                        <Popper id={id} open={open} anchorEl={anchorEl} sx={{ zIndex: 12 }}>
                            <Box sx={{ border: 0, p: 1, bgcolor: '#ddddddf4', borderRadius: 2 }}>

                                <Divider>
                                    <SureModal
                                        data={row?.id}
                                        name={row?.name}
                                        url="/servicos"
                                    />
                                </Divider>

                                <Divider onClick={() => handleEdit()} >
                                    Editar
                                </Divider>
                            </Box>
                        </Popper>
                    </>
                }
            </Container>
        </>

    );
}

PopOverService.propTypes = {
    row: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    })
}