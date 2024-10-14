/* eslint-disable react/no-unknown-property */
import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Collapse, TableCell, TableRow } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import URI from '../../../../app/utils/utils';
import { useUser } from '../../../../hooks/userContext';
import { BodyTable, ChooseArchive, FileContainer, HeadTable, InputsBox, ObservationField, Text, Trash } from '../styles';


export const SeccDrop = (row) => {

    const { data, files } = row
    const { userData, SenderDirector, Sender } = useUser()
    const queryCache = useQueryClient();

    const [value, setValue] = useState('')
    const [fileName, setFileName] = useState()
    const [file, setFile] = useState()
    const [observation, setObservation] = useState(data.observacao)

    const Changer = async (area, e, id) => {
        area !== 'observacao' ? setValue(e) : setValue({ "name": userData.name, "obs": e, "when": new Date().toLocaleString() })

        if (userData.role !== 'direcao') {
            area !== 'observacao' && Sender(area, e, id, value)
        }
        if (userData.role === 'direcao') {
            area !== 'observacao' && SenderDirector(area, e, id, value)
        }
    }


    const handler = (field, values, contrato, valueSetted) => {
        let data = observation.filter(res => res.obs !== "")
        setObservation(data.concat(value))

        userData.role !== 'direcao' ?
            Sender(field, values, contrato, valueSetted) :
            SenderDirector(field, values, contrato, valueSetted)
    }

    const deleteObservation = async (res, contrato) => {
        let data = observation.filter(data => data.obs !== res && data.obs !== "")
        setObservation(data)

        userData.role !== 'direcao' ?
            Sender("observacao", res, contrato, { "delete": true, "deleted": res }) :
            SenderDirector("observacao", res, contrato, { "delete": true, "deleted": res })
    }



    const schema = Yup.object({
        file:
            Yup.mixed()
                .test('required', 'Você precisa enviar um arquivo', value => {
                    return value && value?.length > 0
                })
    })
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });



    async function GetUrl() {
        if (!file) return
        const { name, type, size } = file[0]

        const { data: url } = await URI.post("/files",
            { name, contentType: type, contrato: data.contrato, size, responsible: userData.name })


        if (!url) return toast.error('Erro ao gerar URL')

        await toast.promise(
            axios.put(url, file[0]
                , {
                    Headers: {
                        'Content-Type': type
                    }
                }
            )
            ,
            {
                pending: 'Enviando arquivo',
                success: 'Arquivo enviado com sucesso',
                error: 'Erro ao enviar arquivo'
            }
        )

        setFile("");
        setFileName("")
        queryCache.invalidateQueries(["file" + data.contrato])
    }

    async function GetDownloadUrl(key) {
        await URI.get(`/file?key=${key}`)
            .then(async res => {
                const { data } = res

                window.location = data
                setFile("")
                setFileName("")
            })
    }



    async function DeleteFile(key) {
        await toast.promise(
            URI.delete(`/file?key=${key}&contract=${data.contrato}&responsible=${userData.name}`),
            {
                pending: 'Deletando o arquivo',
                success: 'Arquivo deletado com sucesso',
                error: 'Erro ao deletar arquivo'
            }
        )

        queryCache.invalidateQueries(["file" + data.contrato])

    }


    return (


        <TableCell style={{
            paddingBottom: 0,
            paddingTop: 0,
        }} colSpan={7}>


            <Collapse
                style={{
                    width: "150%",
                    background: row.open ?
                        "#f5f5f5" :
                        ""
                }}
                in={row.open}
                timeout="auto"
                unmountOnExit  >

                <HeadTable>
                    <TableRow>

                        <TableCell
                            align="center"
                            style={{ fontWeight: "bold" }}>
                            OBS. Matrícula
                        </TableCell>

                        <TableCell
                            align="center"
                            style={{ fontWeight: "bold" }}>
                            Documentos anexados
                        </TableCell>

                    </TableRow>

                    <TableRow>

                        <TableCell
                            align="center"
                            style={{ fontWeight: "bold" }}>
                            {
                                <ObservationField >
                                    {
                                        observation[0].obs === '' ||
                                            observation[0].obs === undefined ?
                                            <div className='none'>
                                                Nenhuma observação ainda
                                            </div> :
                                            observation?.map(res => (
                                                <span key={res.obs}>
                                                    <div className="item">
                                                        <h5>{res.obs}</h5>
                                                        <p>por : {res.name} </p>
                                                    </div>
                                                    {
                                                        res.name === userData.name &&
                                                        <Trash onClick={() =>
                                                            deleteObservation(
                                                                res.obs, data.contrato
                                                            )} />
                                                    }
                                                    {res.when && <small>{res.when}</small>}
                                                </span>
                                            ))

                                    }

                                </ObservationField>
                            }

                        </TableCell>

                        <TableCell>
                            {
                                files.length > 0 ? files.map(res => (

                                    <FileContainer
                                        className="flexCenterContainer"
                                        key={res.id}
                                    >
                                        <p className='tooltip'
                                            onClick={() => GetDownloadUrl(res.key)}
                                            tool="baixar arquivo">
                                            {res.name}
                                        </p>

                                        <CloseIcon onClick={() => DeleteFile(res.key)} />
                                    </FileContainer>


                                )) :
                                    "Nenhum documento anexado ainda"
                            }
                        </TableCell>

                    </TableRow>

                </HeadTable>
                <BodyTable>
                    <TableRow key={data.contrato}>
                        <TableCell align="center"
                        >
                            <InputsBox >
                                <Text cols='3'
                                    placeholder={"Escreva um comentário"}
                                    onChange={(e) =>
                                        Changer("observacao", e.target.value,
                                            data.contrato)
                                    }
                                />
                                <button
                                    onClick={
                                        () => handler("observacao", value,
                                            data.contrato, value)
                                    }
                                >
                                    Enviar
                                </button>
                            </InputsBox>

                        </TableCell>

                        <TableCell align="center"
                        >
                            <InputsBox>

                                <form
                                    onSubmit={handleSubmit(GetUrl)}
                                >
                                    <input
                                        type="file"
                                        id="fileUpload"
                                        accept=".pdf, .jpg, .jpeg, .png"
                                        {...register("file")}
                                        onChange={(e) => {
                                            setFile(e.target.files);
                                            setFileName(e.target.files[0].name)
                                        }}
                                    />
                                    <ChooseArchive >
                                        <label
                                            htmlFor="fileUpload"

                                        >
                                            <CloudUploadIcon />
                                        </label>

                                        {fileName !== '' &&
                                            fileName
                                        }
                                        <input type="submit" />
                                    </ChooseArchive>


                                    <p style={{ color: 'red' }}>
                                        {errors.file?.message &&
                                            errors.file?.message}
                                    </p>


                                </form>

                            </InputsBox>

                        </TableCell>


                    </TableRow>




                </BodyTable>
            </Collapse>

        </TableCell>

    )
}
