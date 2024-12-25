import SendIcon from '@mui/icons-material/Send';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import { useRef, useState } from 'react';
import { useCustomFields } from '../../../hooks/customFields/customFIelds.hook';
import { Select } from '../../selects/select';
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
                        sender("name", e.target.value)
                        // toast.success("Gravado")
                    }} /// trocar
                />
            </Label>

            <Label htmlFor="">
                <p>Tipo</p>
                <Select
                    label={""}
                    option={
                        [
                            { name: "text" },
                            { name: "date" },
                            { name: "option" },
                            { name: "multiple_choice" }
                        ]
                    }
                    width="100%"
                    field="type"
                    where="create"
                    fn={[sender]} /// trocar 
                />
            </Label>
            <Label htmlFor="">
                <p>Categoria</p>
                <Select
                    label={""}
                    option={
                        [
                            { name: "StatusMatricula" },
                            { name: "Observacoes" },
                            { name: "Contrato" },
                            { name: "Financeiro" },
                            { name: "InformacoesAlunoEResponsavel" },
                            { name: "Pedagogico" },
                            { name: "Outros" },
                        ]
                    }
                    width="100%"
                    field="category"
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
                            // toast.success("Gravado")

                        }}
                    />
                </FormGroup>
            </Label>

            {
                customFields !== undefined &&
                customFields?.type?.includes('Select') &&
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
