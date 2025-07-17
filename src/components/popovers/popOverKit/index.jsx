import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useKits } from '../../../hooks/kits/kitsContext.hook.jsx';
import { useUser } from '../../../hooks/userContext.jsx';
import { CloserClick } from '../../closeClick/index.jsx';
import { SureModal } from '../../popUps/sureModal/index.jsx';
import { Button, Container, Divider } from './styles.jsx';

export function PopOverKit(data) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const { setTypeSidebar, userData, setOpenSidebar, } = useUser()

    const { setEditKits, deleteKits, setKits } = useKits()
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const { row } = data

    const handleEdit = (action) => {
        const { id, name, code, ...rest } = row

        setTypeSidebar(6);
        setOpenSidebar(true);

        action ? setEditKits({ id, name, code, ...rest }) :
            setKits({ ...rest })

        handleClick();

    }

    const reset = () => {
        deleteKits.mutateAsync(row.id)
    }

    return (
        <>
            <CloserClick
                open={anchorEl}
                fn={handleClick} opacity={0.01}
            />
            <Container>
                {userData?.admin === true &&
                    <>
                        <Button aria-describedby={id} type="button" onClick={handleClick}>
                            <MoreVertIcon />
                        </Button>
                        <Popper id={id} open={open} anchorEl={anchorEl} sx={{ zIndex: 12 }}>
                            <Box sx={{ border: 0, p: 1, bgcolor: '#ddddddf4', borderRadius: 2 }}>
                                <Divider onClick={() => handleEdit(true)} >
                                    Editar
                                </Divider>

                                <Divider onClick={() => handleEdit()} >
                                    Duplicar
                                </Divider>

                                <Divider>
                                    <SureModal
                                        data={row?.id}
                                        name={row?.name}
                                        fn={reset}
                                    />
                                </Divider>


                            </Box>
                        </Popper>
                    </>
                }
            </Container>
        </>

    );
}

PopOverKit.propTypes = {
    row: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    })
}