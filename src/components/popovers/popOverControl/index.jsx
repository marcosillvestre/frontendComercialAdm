import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useRegister } from '../../../hooks/registers/registersContext.hook.jsx';
import { useUser } from '../../../hooks/userContext.jsx';
import { CloserClick } from '../../closeClick';
import { MoreDataRegisters } from '../../popUps/moreData/registers/index.jsx';
import { ObservationsRegisters } from '../../popUps/observations.registers/index.jsx';
import { SureModal } from '../../popUps/sureModal';
import { Button, Container, Divider } from './styles.jsx';

export function PopOverControl(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const { setRegisterId, deleteRegisterData } = useRegister()

    const { userData } = useUser()
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const { row } = props;

    const reset = async () => {
        deleteRegisterData.mutateAsync(row.id)
    }
    return (
        <>
            <CloserClick
                open={anchorEl}
                fn={handleClick} opacity={0.01}
            />
            <Container style={{ zIndex: "11" }}>
                {userData?.admin === true &&
                    <>
                        <Button
                            aria-describedby={id}
                            type="button"
                            onClick={handleClick}
                        >
                            <MoreVertIcon />
                        </Button>
                        <Popper id={id} open={open}
                            anchorEl={anchorEl} sx={{ zIndex: 12 }}>
                            <Box
                                sx={{
                                    border: 0, p: 1,
                                    bgcolor: '#ddddddf4', borderRadius: 2
                                }}

                            >
                                <Divider
                                    onClick={() => setRegisterId(row.id)}

                                >
                                    <MoreDataRegisters
                                        data={row}
                                    />
                                </Divider>

                                <Divider>
                                    <ObservationsRegisters
                                        data={row}
                                    />

                                </Divider>

                                <Divider>
                                    <SureModal
                                        data={row?.id}
                                        name={row?.name}
                                        url="/controle"
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


PopOverControl.propTypes = {
    row: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    })
}