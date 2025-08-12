import { useEffect, useMemo, useState } from 'react';
import { useOrders } from '../../hooks/orders/ordersContext.hook.jsx';
import { useUser } from '../../hooks/userContext.jsx';
import { WarnAvailableOrders } from '../popUps/sendAvailableProduct.orders/index.jsx';
import { MakeOrders } from '../popUps/sendProductOrders.orders/index.jsx';
import { CloserClick } from '../source.jsx';
import { Box, ButtonContainer, Container, Edit, OptionsContainer } from './styles.jsx';

export function MultiAlterationOrders(data) {
    const { checkData, mutationMultiUpdate } = useOrders()
    const { userData } = useUser()


    const [body, setBody] = useState()




    const arrayQuantityChanges = useMemo(() => [
        {
            able: checkData.length > 0 ? checkData?.every(res => res.status === "DISPONIVEL" || res.status === "ENTREGUE") : false,
            label: 'MARCAR COMO ASSINADO',
            type: 'signed',
            value: true
        },
        {
            able: checkData.length > 0 ? checkData.every(res => res.status === "REVISAR") : false,
            label: 'DEFINIR COMO REVISADO',
            type: 'status',
            value: 'REVISADO'
        },
        {
            able: checkData.length > 0 ? checkData.every(res => res.status === "REVISADO" || res.status === "CHEGOU") : false,
            label: 'DEFINIR COMO DISPONÍVEIS',
            popup: true

            // type: 'status',
            // value: 'DISPONIVEL',
        },
        {
            able: checkData.length > 0 ? checkData.every(res => res.status === "REVISADO" || res.status === "ENTREGUE") : false,
            label: 'FAZER PEDIDO',
            popup: true
        },
        {
            able: checkData.length > 0 ? checkData.every(res => res.status === "ENVIADO") : false,
            label: 'CONFIRMAR CHEGADA',
            type: 'arrived',
            value: true
        },
        {
            able: checkData.length > 0 ? checkData.every(res => res.status === "DISPONIVEL") : false,
            label: 'DEFINIR COMO ENTREGUE',
            type: 'delivery',
            value: true

        },
        {
            able: checkData.length > 0 ? checkData.every(res => res.status === "REVISADO") : false,
            label: 'CANCELAR PEDIDO',
            type: 'available',
            value: false
        },


    ], [JSON.stringify(checkData)])


    const [manyAlteration, setManyAlteration] = useState(false)
    const [optionGroup, setOptionGroup] = useState([])


    const handleManyAlteration = () => {
        setOptionGroup(arrayQuantityChanges)
        setManyAlteration(!manyAlteration)
    }

    useEffect(() => {
        setOptionGroup(arrayQuantityChanges)
    }, [arrayQuantityChanges])


    const handleOptionGroup = ({ label, type, value, email }) => {

        if (email) return <MakeOrders />


        if (label === "DEFINIR COMO ENTREGUE" && checkData.some(res => !res.signed)) {
            let filtered = checkData.filter(r => !r.signed)
            alert(`${filtered.map(r => r.name)} não teve/tiveram seus documentos assinados, deseja marca-lo(s) como ENTREGUE mesmo assim ?`)
        }

        setBody({
            responsible: userData.name,
            ids: checkData?.map(res => res.id),
            where: type,
            what: value,
            label,
            logistic: [
                {
                    stage: value,
                    active: true,
                    date: new Date(),
                    user: userData.name
                }
            ]
        })

        optionGroup.length > 1 ?
            setOptionGroup(optionGroup.filter(res => res.label === label)) :
            setOptionGroup(arrayQuantityChanges)
    }


    const close = () => {
        setManyAlteration(!manyAlteration)

    }

    async function handleSenderDataToBeChanged() {

        await mutationMultiUpdate.mutateAsync(body)

        close()
    }

    return (
        <>
            <CloserClick
                open={manyAlteration}
                fn={close}
                opacity={.01}
            />
            <ButtonContainer>

                <Container
                    $open={manyAlteration}
                    able={data.able}
                    onClick={() => data.able ? handleManyAlteration() : ""}
                    className='defaultButton '
                >
                    <p>{data.label}</p>

                </Container>

                <Box $emmit={manyAlteration}
                    $open={manyAlteration}

                >
                    {
                        optionGroup &&
                        optionGroup.map((res, index) => (
                            <OptionsContainer
                                key={index}
                                $open={manyAlteration}

                            >
                                {
                                    !res.popup ?
                                        <Edit
                                            able={res.able}
                                            $open={manyAlteration}
                                            onClick={() => handleOptionGroup(res)}
                                        >
                                            {res.label}
                                        </Edit> :
                                        <Edit
                                            able={res.able}
                                        >
                                            {
                                                res.label === 'FAZER PEDIDO' &&
                                                <MakeOrders data={res} />
                                            }
                                            {
                                                res.label === 'DEFINIR COMO DISPONÍVEIS' &&
                                                <WarnAvailableOrders data={res} />
                                            }
                                        </Edit>

                                }

                            </OptionsContainer>
                        ))
                    }


                    {
                        optionGroup.length === 1 &&
                        <Edit
                            className='flex'
                            able={data.able}
                            onClick={() => handleSenderDataToBeChanged()}
                        >
                            confirmar
                        </Edit>
                    }

                </Box>
            </ButtonContainer>
        </>


    );
}