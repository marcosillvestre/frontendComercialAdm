import { Typography } from '@mui/material';
// import { treatingDates } from '../../../../app/utils/functions/getDates';
import { gatheringArrays } from '../../../../../app/utils/functions/treatingArrays';
import { useCustomFields } from '../../../../../hooks/customFields/customFIelds.hook';
import { useRegister } from '../../../../../hooks/registers/registersContext.hook';
import { InputRegister } from '../../../../inputs/input.update.register';
import { DateSelect } from '../../../../selects/DateSelect';
import { MultiSelect } from '../../../../selects/MultiSelect';
import { UniqueSelect } from '../../../../selects/UniqueSelect';
import { ContainerPopUpData } from '../styles';

export const CustomFields = () => {

    const { register, setEditRegister, editRegister, updateRegister, setUpdateRegister } = useRegister()

    const { customFieldsTotals } = useCustomFields()

    const { customFields } = customFieldsTotals

    const customFieldsFiltered = customFields.filter(res => res.category === "Outros")


    const keys = gatheringArrays(Object.keys(register.customFields), customFieldsFiltered);

    const customFieldsChanger = (key, value) => {

        const rest = editRegister ?
            editRegister.customFields : register.customFields

        const newRegister = {
            "customFields": {
                ...rest,
                [key]: value
            }
        }

        setUpdateRegister({
            ...updateRegister,
            [key]: value
        })

        setEditRegister(newRegister)

    }

    return (
        <ContainerPopUpData>

            {
                register &&
                keys.map((key, index) => (

                    <label htmlFor="" key={index}>
                        <Typography variant="h7" component="h3">
                            {key.name}:
                        </Typography>


                        {
                            key.type === "multiple_choice" &&
                            <div
                                className='input'
                            >
                                <MultiSelect
                                    field={key.name}
                                    related={
                                        !register.customFields[key.name] ?
                                            [] :
                                            register.customFields[key.name]
                                                .map(res => {
                                                    return {
                                                        name: res
                                                    }
                                                })}
                                    fn={customFieldsChanger}
                                    width="100%"
                                    option={key.options.map(res => {
                                        return {
                                            name: res
                                        }
                                    })}
                                />
                            </div>
                        }
                        {
                            key.type === 'date' &&
                            <div
                                className='input'
                            >
                                <DateSelect
                                    label={register.customFields[key.name]}
                                    width="100%"
                                    field={key.name}
                                    fn={[customFieldsChanger]}
                                />
                            </div>
                        }
                        {
                            key.type === 'option' &&
                            <div
                                className='input'
                            >
                                <UniqueSelect
                                    width="100%"
                                    field={key.name}
                                    placeHolder={register.customFields[key.name]}
                                    option={
                                        key.options.map(res => {
                                            return {
                                                name: res
                                            }
                                        })}
                                    fn={[customFieldsChanger]}
                                />
                            </div>
                        }

                        {
                            key.type === 'text' &&
                            <div
                                className='input'
                            >
                                <InputRegister
                                    disabled={false}
                                    width="100%"
                                    field={key.name}
                                    label={register.customFields[key.name]}
                                    fn={[customFieldsChanger]}
                                />
                            </div>
                        }




                    </label>
                ))
            }

        </ContainerPopUpData>
    )
}
