import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import businessRules from '../../app/utils/Rules/options.jsx';
import URI from '../../app/utils/utils.jsx';
import { useData } from '../../hooks/dataContext.jsx';
import { useUser } from '../../hooks/userContext.jsx';
import { Box, ButtonContainer, ButtonSender, Container, Edit, Options, OptionsContainer, Value } from './styles.jsx';

export function CustomizableButton(data) {
    const { userData } = useUser()
    const { valueToBeChanged, setValueToBeChanged } = useData()

    const { arrayQuantityChanges } = businessRules

    const [manyAlteration, setManyAlteration] = useState(false)
    const [optionGroup, setOptionGroup] = useState([])

    useEffect(() => {
        if (data.element === 1 && data.able === false) {
            setManyAlteration(data.able)
            setValueToBeChanged('')
        }
    }, [data.able, data.element])



    const handleManyAlteration = () => {
        setOptionGroup(arrayQuantityChanges)
        setManyAlteration(!manyAlteration)
        setValueToBeChanged('')
    }

    useEffect(() => {
        setOptionGroup(arrayQuantityChanges)
    }, [arrayQuantityChanges])


    const handleOptionGroup = (label, index) => {
        setValueToBeChanged('')
        if (optionGroup[index].open === undefined || optionGroup[index].open === false) {
            let arr = []
            const newObj = {
                label: optionGroup[index].label,
                type: optionGroup[index].type,
                options: optionGroup[index].options,
                permission: optionGroup[index].permission,
                open: true
            }
            arr.splice(index, 1, newObj)
            let kk = optionGroup.filter(res => res.label !== label)

            const jj = kk[index] = arr

            setOptionGroup(jj)
        }
        if (!optionGroup[index].open == undefined || optionGroup[index].open === true) {
            let arr = []
            const newObj = {
                label: optionGroup[index].label,
                type: optionGroup[index].type,
                options: optionGroup[index].options,
                permission: optionGroup[index].permission,
                open: false
            }
            arr.splice(index, 1, newObj)
            let kk = optionGroup.filter(res => res.label !== label)

            const jj = kk[index] = arr
            setOptionGroup(jj)
        }
    }

    const handleDropChange = (opt) => {
        if (valueToBeChanged === opt) {
            setValueToBeChanged('')
        }
        if (valueToBeChanged !== opt) {
            setValueToBeChanged(opt)
            optionGroup[0].open = false
        }
    }


    async function handleSenderDataToBeChanged() {
        setManyAlteration(!manyAlteration)
        setValueToBeChanged('')

        const filtered = data.toBeChanged.filter(res => res.isChecked === true)
        const arr = []
        for (let i = 0; i < filtered.length; i++) {
            arr.push(filtered[i].contract)
        }

        const obj = {
            contracts: arr,
            where: optionGroup[0].type,
            value: valueToBeChanged,
            responsible: userData
        }

        await toast.promise(
            // axios.put(`https://stagetests-684hi.ondigitalocean.app/multi-update`, obj, { headers }),
            URI.put(`/multi-update`, obj),
            {
                pending: 'Conferindo os dados',
                success: 'Atualizado com sucesso',
                error: 'Alguma coisa deu errado'
            }
        )
    }

    return (
        <ButtonContainer>

            <Container
                $open={manyAlteration}
                able={data.able}
                onClick={() => data.able ? handleManyAlteration() : ""}
            >
                <p>{data.label}</p>

            </Container>

            <Box $emmit={manyAlteration}>
                {
                    optionGroup &&
                    optionGroup.map((res, index) => (
                        res.permission.some(info => info === userData.role) &&
                        <OptionsContainer
                            key={index}
                            $open={manyAlteration}
                        >

                            <Edit
                                able={data.able}
                                $open={manyAlteration}
                                onClick={() => handleOptionGroup(res.label, index)}
                            >
                                {res.label}
                            </Edit>

                            {
                                res.options.map((opt, idx) => (
                                    <Options
                                        $open={res.open}
                                        key={idx}
                                        onClick={() => handleDropChange(opt.name ? opt.name : opt)}
                                    >
                                        {opt.name ? opt.name : opt}
                                    </Options>

                                ))
                            }

                        </OptionsContainer>
                    ))
                }

                {
                    valueToBeChanged !== '' &&
                    <Value onClick={() => setValueToBeChanged('')}>
                        <p>{valueToBeChanged}</p>
                    </Value>
                }

                {
                    valueToBeChanged !== '' &&
                    <ButtonSender
                        onClick={() => handleSenderDataToBeChanged()}
                    >
                        Enviar
                    </ButtonSender>
                }

            </Box>
        </ButtonContainer>


    );
}