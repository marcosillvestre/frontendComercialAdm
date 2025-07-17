import { FormControlLabel, FormGroup, Switch } from '@mui/material'
import { useState } from 'react'
import business from '../../../app/utils/Rules/options.jsx'
import { useUnities } from '../../../hooks/unities/unitiesContext.hook.jsx'
import { useUser } from '../../../hooks/userContext.jsx'
import { useUsers } from '../../../hooks/users/usersContext.hook.jsx'
import { Select } from '../../selects/select/index.jsx'
import { Input, Label, Submit } from '../styles.jsx'


export const CreateUsersForm = () => {
    const { unityQuery } = useUnities()
    const { editUser, setEditUser, Users, setUsers, createUsers, updateUser } = useUsers()
    const { userData } = useUser()
    const { roles } = business

    const [multiUnities, setMultiUnities] = useState(editUser ? editUser.unity : [])

    const [adm, setAdm] = useState(editUser ? editUser.admin : false)

    const sender = (field, value) => {
        editUser !== null ?
            setEditUser({ ...editUser, [field]: value }) :
            setUsers({ ...Users, [field]: value })
    }

    const multiSelectSender = async (_, data) => {

        const index = multiUnities.findIndex(r => r === data)

        if (data === "TODAS") return setMultiUnities(["TODAS"])

        index >= 0 ?
            setMultiUnities(multiUnities.filter(res => res !== data && res !== "TODAS")) :
            setMultiUnities([...multiUnities.filter(res => res !== "TODAS"), data])

    }

    const create = () => {

        return editUser ?
            updateUser.mutateAsync({
                ...editUser,
                unity: multiUnities,
                responsible: userData.name
            }) :
            createUsers.mutateAsync({
                ...Users,
                admin: adm,
                unity: multiUnities,
                responsible: userData.name
            })

    }


    return (
        <div>

            <Label >
                <p>Primeiro nome</p>
                < Input
                    type="text"
                    defaultValue={editUser && editUser.name}
                    onBlur={(e) => {
                        e.target.value !== '' &&
                            sender("name", e.target.value)
                        // && toast.success("Gravado")

                    }}
                />
            </Label>

            <Label >
                <p>Unidade</p>
                <Select
                    label={""}
                    option={[
                        { name: "TODAS" },
                        ...unityQuery.data,
                    ]}
                    width="10.8rem"
                    field={"unity"}
                    where="create"
                    fn={[multiSelectSender]}
                />
                < div
                    className='container-options-group'>
                    {
                        multiUnities &&
                        multiUnities.map((v, index) => (
                            <span
                                className='options-group'
                                key={index}
                                onClick={() => {
                                    setMultiUnities(multiUnities.unity.filter(res => res !== v))
                                }}
                            >
                                <p key={index}>{v}</p>


                            </span>
                        ))
                    }
                </div>
            </Label>
            <Label >
                <p>Email</p>
                < Input
                    type="text"
                    defaultValue={editUser && editUser.email}

                    onBlur={(e) => {
                        e.target.value !== '' &&
                            sender("email", e.target.value)
                        // && toast.success("Gravado")

                    }}
                />
            </Label>

            {
                editUser === null &&
                <>
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
                </>
            }


            <Label >
                <p>Cargo</p>
                <Select
                    label={editUser && editUser.role}
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
                        control={<Switch defaultChecked={adm} />}
                        onClick={() => {
                            setAdm(!adm)
                            sender("admin", !adm)

                        }}
                    />
                </FormGroup>
            </Label>


            <hr />
            <Submit
                className='defaultButton blueButton'

                // onClick={() => submit()}
                onClick={() => create()}
            >
                Enviar
            </Submit>

        </div>
    )
}

CreateUsersForm.propTypes = {}

// export default CreateUsersForm
