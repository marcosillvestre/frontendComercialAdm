import SendIcon from '@mui/icons-material/Send';
import { useLayoutEffect, useRef, useState } from 'react';
import { useCustomFields } from '../../../hooks/customFields/customFIelds.hook';
import { Select } from '../../selects/select';
import { ButtonIcon, Input, Label, Submit } from '../styles';

export const CustomFields = () => {

    const { editCustomField, setEditCustomField, createCustomField, mutateCustomField, setCustomFields, customFields } = useCustomFields()

    const [type, setType] = useState();
    const [options, setOptions] = useState()

    const opt = useRef()

    useLayoutEffect(() => {
        setOptions(editCustomField?.options ?? []);
        setType(editCustomField?.type);
    }, [editCustomField]);



    const subtitle = {
        text: "Texto",
        date: "Data",
        multiple_choice: "Multipla escolha",
        option: "Seleção única",

        StatusMatricula: "Status da matrícula",
        Contrato: "Contrato",
        Financeiro: "Financeiro",
        InformacoesAlunoEResponsavel: "Dados do aluno e do responsável",
        Pedagogico: "Pedagógico",
        Outros: "Outros",
    }

    const handleType = (_, value) => setType(value);

    const sender = (key, value) => {

        editCustomField !== null ?
            setEditCustomField({ ...editCustomField, [key]: value }) :
            setCustomFields({ ...customFields, [key]: value })
    }



    const submit = () => {

        editCustomField === null ?
            createCustomField.mutateAsync({ ...customFields, type, options }) :
            mutateCustomField.mutateAsync({ ...editCustomField, type, options })
    }

    return (
        <>
            <Label htmlFor="">
                <p>Nome do campo</p>
                <Input
                    type="text"
                    defaultValue={editCustomField && editCustomField.name}

                    onChange={(e) => {
                        e.target.value !== '' &&
                            sender("name", e.target.value)
                    }}
                />
            </Label>

            <Label htmlFor="">
                <p>Tipo</p>
                <Select
                    label={editCustomField && subtitle[editCustomField.type]}
                    option={
                        [
                            { value: "text", name: "Texto" },
                            { value: "date", name: "Data" },
                            { value: "option", name: "Seleção Única" },
                            { value: "multiple_choice", name: "Multipla escolha" },
                        ]
                    }
                    width="100%"
                    field="type"
                    where="create"
                    fn={[handleType]}
                />
            </Label>
            <Label htmlFor="">
                <p>Categoria</p>
                <Select
                    label={editCustomField && subtitle[editCustomField.category]}
                    option={
                        [
                            { value: "StatusMatricula", name: "Status da matrícula" },
                            { value: "Contrato", name: "Contrato" },
                            { value: "Financeiro", name: "Financeiro" },
                            { value: "InformacoesAlunoEResponsavel", name: "Dados do aluno e do responsável" },
                            { value: "Pedagogico", name: "Pedagógico" },
                            { value: "Outros", name: "Outros" },

                        ]
                    }
                    width="100%"
                    field="category"
                    where="create"
                    fn={[sender]} /// trocar 
                />
            </Label>
            {/* <Label htmlFor="">
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
            </Label> */}

            {
                type === 'multiple_choice' || type === 'option' &&
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
            }

            <hr />
            <Submit
                placeholder="Enviar"
                className='defaultButton blueButton'
                onClick={() => submit()}
            >
                Enviar
            </Submit>
        </>
    )
}
