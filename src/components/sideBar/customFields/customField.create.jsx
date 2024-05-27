import SendIcon from '@mui/icons-material/Send';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useCustomFields } from '../../../hooks/customFields/customFIelds.hook';
import { Select } from '../../select';
import { ButtonIcon, Input, Label } from '../styles';

export const CustomFields = () => {
    const { options, setOptions, setCustomFields, customFields } = useCustomFields()

    const [required, setRequired] = useState(false)
    const opt = useRef()


    // const {sender} = fn

    const sender = async (field, value) => {
        if (field !== undefined && value !== undefined) {

            setCustomFields({ ...customFields, [field]: value })
        }
    }

    return (
        <>
            <Label htmlFor="">
                <p>Nome do campo</p>
                <Input
                    type="text"
                    onBlur={(e) => {
                        sender("label", e.target.value)
                        toast.success("Gravado")
                    }} /// trocar
                />
            </Label>

            <Label htmlFor="">
                <p>Tipo</p>
                <Select
                    label={""}
                    option={
                        [
                            { name: "Texto" },
                            { name: "Número" },
                            { name: "Data" },
                            { name: "Seleção única" },
                            { name: "Multi-Select" }
                        ]
                    }
                    width="100%"
                    field="type"
                    where="create"
                    fn={[sender]} /// trocar 
                />
            </Label>
            <Label htmlFor="">
                <p>Obrigatório</p>

                <FormGroup>
                    <FormControlLabel
                        control={<Switch />}
                        label=""
                        onClick={() => {
                            setRequired(!required)
                            sender("required", !required)  /// trocar
                            toast.success("Gravado")

                        }}
                    />
                </FormGroup>
            </Label>

            {
                customFields !== undefined &&
                customFields.type.includes('Select') &&
                <Label htmlFor="">
                    <p>Opções</p>
                    <div
                        className='container'
                    >

                        <Input
                            type="text"
                            name="options"
                            style={{ width: "9rem" }}
                            ref={opt}
                        />
                        <ButtonIcon
                            onClick={() => {
                                opt.current.value !== '' &&
                                    setOptions([...options, opt.current.value])
                            }}
                        >
                            <SendIcon />

                        </ButtonIcon>
                    </div>
                    <div
                        className='container-options-group'>

                        {
                            options &&
                            options.map((res, index) => (
                                <span
                                    className='options-group'
                                    key={index}
                                    onClick={() => {
                                        setOptions(options.filter(r => r !== res))
                                    }}
                                >

                                    <p >{res}</p>
                                </span>
                            ))
                        }
                    </div>
                </Label>
            }</>
    )
}
