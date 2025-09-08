import { Typography } from '@mui/material';
// import { treatingDates } from '../../../../app/utils/functions/getDates';
import { useRegister } from '../../../../../hooks/registers/registersContext.hook';
import { EmptyData } from '../../../../emptyData';
import { ContainerHistoric, ContainerPopUpData } from '../styles';

export const Historic = () => {

    const { register, } = useRegister()
    const { historic } = register

    return (
        <ContainerPopUpData>

            {historic &&
                historic.length === 0 ?
                <EmptyData width='25rem' />
                :
                historic.map((key, index) => (
                    <label htmlFor="" key={index}>
                        <Typography variant="h7" component="h3">
                            {key.responsible}:
                        </Typography>

                        <ContainerHistoric>
                            <p>{key.information.text}</p>
                            <hr />
                            <p>{new Date(key.created_at).toLocaleString("pt-BR")}</p>
                        </ContainerHistoric>


                    </label>
                ))
            }

        </ContainerPopUpData>
    )
}
