import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useCampaign } from '../../../hooks/campaign/campaignContext.hook.jsx';
import { useUser } from '../../../hooks/userContext.jsx';
import { CloserClick } from '../../closeClick';
import { SureModal } from '../../popUps/sureModal';
import { Button, Container, Divider } from './styles.jsx';

export function PopOverCampaign(data) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };


    const { setTypeSidebar, userData, setOpenSidebar, } = useUser()
    const { setEditCampaign } = useCampaign()
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const { row } = data

    const handleEdit = () => {
        setTypeSidebar(5)
        setOpenSidebar(true);
        setEditCampaign(row)
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
                                        url="/campanha"
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

PopOverCampaign.propTypes = {
    row: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    })
}