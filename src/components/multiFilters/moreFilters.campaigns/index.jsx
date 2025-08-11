import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import { Divider } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha, styled } from '@mui/material/styles';
import { useUser } from '../../../hooks/userContext.jsx';
import { Buttonn, Container } from './styles.jsx';

const StyledMenu = styled((props) => (
    <Menu

        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ?
                'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

import PropTypes from 'prop-types';
import { useCampaign } from '../../../hooks/campaign/campaignContext.hook.jsx';
import { CustomDateMenuCampaign } from '../../customDateMenu/filteringMenu.Campaign/index.jsx';

export function CampaignsMoreFilters({ disabled }) {

    const { anchorEl, handleClose, setAnchorEl } = useUser();
    const { filterInitialDate, filterEndDate, setTypeFilter, typeFilter } = useCampaign();


    const filters = [
        {
            label: "Objetivo",
            name: "for",
            options: [
                { name: "Parcela", value: 'Parcel' },
                { name: "Material", value: 'Material' },
                { name: "Taxa de matrícula", value: 'Tax' },
            ],
        },
        {
            label: "Tipo",
            name: "descountType",
            options: [
                { name: "Porcentagem", value: 'Percentage' },
                { name: "Valor cheio", value: 'Value' },
                { name: "Alteração", value: 'Exchange' },
            ],
        },
        {
            label: "Ativo",
            name: "status",
            options: [
                { name: "Sim" },
                { name: "Não" },
            ],
        },

    ]



    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const apllyDateFilters = (key, label) => {

        setTypeFilter([...typeFilter, {
            id: new Date().setUTCHours(0),
            key,
            value: `${filterInitialDate}~${filterEndDate}`,
            label,
        }])
    }

    return (
        <Container>
            <Buttonn
                disabled={disabled}
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
                style={{
                    fontSize: '0.675rem',
                    padding: '10px 16px',
                }}
            >
                Filtros personalizados
            </Buttonn>

            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}

            >

                {
                    filters.map((res, index) => (
                        <MenuItem disableRipple key={index}>
                            <CustomDateMenuCampaign
                                props={res}
                                fn={apllyDateFilters}
                                where="moreFilters"
                            />
                        </MenuItem>

                    ))
                }



            </StyledMenu>
        </Container>
    );
}

CampaignsMoreFilters.propTypes = {
    disabled: PropTypes.bool,

};