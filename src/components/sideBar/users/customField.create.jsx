import { FormControlLabel, FormGroup, Switch } from '@mui/material'
import { useState } from 'react'
import { toast } from 'react-toastify'
import business from '../../../app/utils/Rules/options.jsx'
import { useUnities } from '../../../hooks/unities/unitiesContext.hook'
import { useUsers } from '../../../hooks/users/usersContext.hook.jsx'
import { Select } from '../../select'
import { Input, Label } from '../styles'


export const CreateUsersForm = () => {
    const { unityQuery } = useUnities()
    const { setPerson, person, multiUnities, setMultiUnities } = useUsers()

    const { roles } = business

    const [adm, setAdm] = useState(false)

    const sender = (field, value) => {
        setPerson({ ...person, [field]: value })
    }

    const multiSelectSender = async (_, data) => {
        const index = multiUnities.unity.findIndex(r => r === data)

        index >= 0 ?
            setMultiUnities({ unity: multiUnities.unity.filter(res => res !== data) }) :
            setMultiUnities({ unity: [...multiUnities.unity, data] })

    }

    console.log(multiUnities)

    return (
        <div>

            <Label >
                <p>Primeiro nome</p>
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
                <p>Email</p>
                < Input
                    type="text"
                    onBlur={(e) => {
                        e.target.value !== '' &&
                            sender("email", e.target.value) &&
                            toast.success("Gravado")

                    }}
                />
            </Label>
            <Label >
                <p>Senha</p>
                < Input
                    type="text"
                    onBlur={(e) => {
                        e.target.value !== '' &&
                            sender("password", e.target.value)

                    }}
                />
            </Label>
            <Label >
                <p>Confirme a senha</p>
                < Input
                    type="text"
                    onBlur={(e) => {
                        e.target.value !== '' &&
                            sender("confirmPassword", e.target.value)

                    }}
                />
            </Label>


            <Label >
                <p>Unidade</p>
                <Select
                    label={""}
                    option={unityQuery.data}
                    width="10.8rem"
                    field={"unity"}
                    where="create"
                    fn={[multiSelectSender]}
                />
                < div
                    className='container-options-group'>
                    {
                        multiUnities && multiUnities.unity.map((v, index) => (
                            <span
                                className='options-group'
                                key={index}
                                onClick={() => {
                                    setMultiUnities({ unity: multiUnities.unity.filter(res => res !== v) })
                                }}
                            >
                                <p key={index}>{v}</p>


                            </span>
                        ))
                    }
                </div>
            </Label>

            <Label >
                <p>Cargo</p>
                <Select
                    label={""}
                    option={roles}
                    width="10.8rem"
                    field={"role"}
                    where="create"
                    fn={[sender]}
                />
            </Label>
            <Label htmlFor="">
                <p>Acesso administrador</p>

                <FormGroup>
                    <FormControlLabel
                        control={<Switch />}
                        label=""
                        onClick={() => {
                            setAdm(!adm)
                            sender("admin", !adm)  /// trocar
                            // toast.success("Gravado")

                        }}
                    />
                </FormGroup>
            </Label>




        </div>
    )
}

CreateUsersForm.propTypes = {}

// export default CreateUsersForm
