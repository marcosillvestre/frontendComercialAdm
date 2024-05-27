import SendIcon from '@mui/icons-material/Send'
import { toast } from 'react-toastify'
import { useContractsHook } from '../../../hooks/contracts/contracts.hook'
import { useCustomFields } from '../../../hooks/customFields/customFIelds.hook'
import { useUser } from '../../../hooks/userContext'
import { useUsers } from '../../../hooks/users/usersContext.hook'
import { Select } from '../../select'
import { ButtonIcon, Input, Label } from '../styles'

export const Contracts = () => {
    const { UsersQuery } = useUsers()
    const { cfSrted } = useCustomFields()

    const { setContractData, contractData,
        multiSelectOptions, setMultiSelectOptions,
    } = useContractsHook()

    const { typeSidebar, } = useUser()

    const sender = async (field, value, order) => {
        if (field !== undefined && value !== undefined) {


            const filtered = contractData.filter(res => res.label !== field)
            typeSidebar === 2 && setContractData([...filtered, { label: field, value, order }])

        }
    }


    const multiSelectSender = async (field, data) => {
        const index = multiSelectOptions.findIndex(r => r.label === field)

        setMultiSelectOptions(index > 0 ?
            [{ label: field, value: [...multiSelectOptions[index].value, data] }] :
            [...multiSelectOptions, { label: field, value: [data] }]
        )

    }

    const possibilities = {
        "String": 'text',
        "Number": 'number',
        "Date": 'date',
    }
    return (
        <>
            <Label >
                <p>Nome</p>
                < Input
                    type="text"
                    onBlur={(e) => {
                        e.target.value !== '' &&
                            sender("name", e.target.value) &&
                            toast.success("Gravado")

                    }}
                />
            </Label>
            <Label >
                <p>Vendedor</p>
                <Select
                    label={""}
                    option={UsersQuery.data}
                    width="100%"
                    field={"user"}
                    where="create"
                    fn={[sender]}
                />
            </Label>
            {
                cfSrted &&
                cfSrted.map((res, index) => (
                    <Label key={res.id}>
                        <p>{res.label}</p>
                        {
                            possibilities[res.type] ?
                                < Input
                                    type={res.type}
                                    onBlur={(e) => {
                                        e.target.value !== '' &&
                                            sender(res.label, e.target.value, index) &&
                                            toast.success("Gravado")

                                    }}
                                />
                                :
                                <div
                                    className='multi-container'>
                                    <div
                                        className='container'
                                    >
                                        <Select
                                            label={res.options[0]}
                                            option={res.options.map(opt => {
                                                return { "name": opt }
                                            })}
                                            order={res.order}
                                            width="100%"
                                            field={res.label}
                                            where="create"
                                            fn={[res.type === "MultiSelect" ? multiSelectSender : sender]}
                                        />
                                        {
                                            res.type === "MultiSelect" &&
                                            <ButtonIcon
                                                onClick={() => {
                                                    sender(res.label, multiSelectOptions.filter(ms => ms.label === res.label)[0].value, res.order)
                                                    toast.success("Gravado")

                                                }}
                                            >
                                                <SendIcon />
                                            </ButtonIcon>
                                        }
                                    </div>

                                    {
                                        res.type === "MultiSelect" &&
                                        multiSelectOptions.some(r => r.label === res.label) &&
                                        < div
                                            className='container-options-group'>
                                            {
                                                multiSelectOptions
                                                    .map((r, index) => (
                                                        r.label === res.label &&
                                                        r.value.map(v => (
                                                            <span
                                                                className='options-group'
                                                                key={index}
                                                                onClick={() => {
                                                                    let data = multiSelectOptions.filter(m => m.label === r.label)[0]
                                                                    data.value = data.value.filter(dv => dv !== v)
                                                                    setMultiSelectOptions([data])

                                                                    data.value.length !== 0 ?
                                                                        setContractData([...contractData.filter(fd => fd.label !== res.label), data]) :
                                                                        setContractData(contractData.filter(fd => fd.label !== res.label))
                                                                }}
                                                            >
                                                                <p key={v}>{v}</p>


                                                            </span>
                                                        ))
                                                    ))
                                            }
                                        </div>

                                    }
                                </div>


                        }
                    </Label>
                ))
            }


        </>
    )
}
