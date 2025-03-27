import { useEffect, useMemo, useState } from 'react';
import { useOrders } from '../../hooks/orders/ordersContext.hook.jsx';
import { useUser } from '../../hooks/userContext.jsx';
import { MakeOrders } from '../popUps/sendProductOrders.orders/index.jsx';
import { CloserClick } from '../source.jsx';
import { Box, ButtonContainer, Container, Edit, OptionsContainer } from './styles.jsx';

export function MultiAlterationOrders(data) {
    const { checkData, queryOrder, setQueryOrder, mutationMultiUpdate } = useOrders()
    const { userData } = useUser()

    const [pop, setPop] = useState()

    const [body, setBody] = useState()

    useEffect(() => {

        checkData.every(res => res.status === "REVISADO" ||
            res.status === "ENTREGUE") ?
            setPop(true) :
            setPop(false)



    }, [JSON.stringify(checkData)])




    const arrayQuantityChanges = useMemo(() => [
        {
            label: 'MARCAR COMO ASSINADO',
            type: 'signed',
            value: true
        },
        {
            label: 'DEFINIR COMO REVISADO',
            type: 'status',
            value: 'REVISADO'
        },
        {
            label: 'DEFINIR COMO DISPONÍVEIS',
            type: 'status',
            value: 'DISPONIVEL',
        },
        {
            label: 'FAZER PEDIDO',
            // type: 'status',
            email: true
        },
        {
            label: 'CONFIRMAR CHEGADA',
            type: 'arrived',
            value: true
        },
        {
            label: 'DEFINIR COMO ENTREGUE',
            type: 'delivery',
            value: true

        },
        {
            label: 'CANCELAR PEDIDO',
            type: 'available',
            value: false
        },
        // {
        //     label: 'FAZER REPOSIÇÃO DE MERCADORIAS',
        //     type: 'type',
        //     value: 'REPOSICAO',
        //     email: true
        // },
        // {
        //     label: 'CONFIRMAR CHEGADA DE REPOSIÇÃO',
        //     type: 'type',
        //     value: "REPOSICAO"
        // },



    ], [])


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

        // REVISAR = CANCELAR, EXCLUIR, MARCAR REVISADO

        if (label === 'DEFINIR COMO ENTREGUE' && checkData.every(res => res.status !== "DISPONIVEL"))
            return alert("Só pode ser ENTREGUE caso o produto esteja DISPONIVEL")

        if (label === 'MARCAR COMO ASSINADO' && checkData.every(res => res.status !== "DISPONIVEL" || res.status !== "ENTREGUE"))
            return alert("Só pode ser marcado como assinado caso o produto esteja DISPONIVEL ou ENTREGUE")

        if (label === "CONFIRMAR CHEGADA" && checkData.every(res => res.status !== "ENVIADO"))
            return alert("Somente produtos que estão na fase ENVIADOS podem ser confirmados sua chegada.")

        if (value === "DISPONIVEL" && checkData.some(res => res.status !== "REVISADO" && res.status !== "CHEGOU"))
            return alert("Somente produtos na fase REVISADOS e CHEGOU podem ser marcados como DISPONIVEL")

        setBody({
            responsible: userData.name,
            ids: checkData.map(res => res.id),
            where: type,
            what: value,
            label,
            logistic: [
                {
                    stage: value,
                    active: true
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

        mutationMultiUpdate.mutateAsync(body)

        close()

        const { order, count } = queryOrder
        const data = []
        const { ids, where, what } = body
        for (let index = 0; index < order.length; index++) {
            const object = order[index];

            const idSearched = ids.find(res => res === object.id)

            idSearched ? data.push({ ...object, [where]: what }) :
                data.push(object)

        }

        setQueryOrder({ order: data, count })

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
                                    !res.email ?
                                        <Edit
                                            able={data.able}
                                            $open={manyAlteration}
                                            onClick={() => handleOptionGroup(res)}
                                        >
                                            {res.label}
                                        </Edit> :
                                        <Edit
                                            able={pop}
                                        >
                                            <MakeOrders data={res} />
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