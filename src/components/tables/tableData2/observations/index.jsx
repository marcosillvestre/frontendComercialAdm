/* eslint-disable react/no-unknown-property */
import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Collapse, IconButton, Table, TableCell, TableRow } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import LoadingSpin from 'react-loading-spin';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import URI from '../../../../app/utils/utils';
import { useCustomFields } from '../../../../hooks/customFields/customFIelds.hook';
import { useUser } from '../../../../hooks/userContext';
import { UniqueSelect } from '../../../selects/UniqueSelect';
import { BodyTable, ChooseArchive, FileContainer, HeadTable, InputsBox, ObservationField, RowTableCustomFields, Text, Trash } from '../styles';



export const Observations = (props) => {

    const { row } = props

    const { cfSrted } = useCustomFields()

    const customFieldsFiltered = cfSrted && cfSrted.filter(res => res.category === "Observacoes")



    const { userData, Sender, UpdateCustomFields } = useUser()
    const queryCache = useQueryClient();

    const [Open, setOpen] = useState(false)

    const [value, setValue] = useState('')
    const [fileName, setFileName] = useState()
    const [file, setFile] = useState()
    const [observation, setObservation] = useState(row.observacao)


    const { data: files, isPending: filePending, refetch: fileRefetch } = useQuery({
        queryFn: () => {
            return URI.get(`/files?contract=${row.id}`).then(res => res.data)
        },
        queryKey: ["file" + row.id],
        onError: (err) => console.log(err)
    })

    const ChangerCustomFields = async (key, value) => {

        UpdateCustomFields("customFields", row.id, key, value, row.customFields)
    }

    const handler = (field, id, values) => {

        let data = observation.filter(res => res.obs !== "")
        setObservation(data.concat(values))

        Sender(field, id, values, field)

    }

    const deleteObservation = async (value, id) => {


        let data = observation.filter(data => data.obs !== value && data.obs !== "")
        setObservation(data)

        Sender("observacao", id, data, "observação")
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
            {
                name, contentType: type, id: row.id,
                size, responsible: userData.name
            })


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
        queryCache.invalidateQueries(["file" + row.id])
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
            URI.delete(`/file?key=${key}&idRegister=${row.id}&responsible=${userData.name}`),
            {
                pending: 'Deletando o arquivo',
                success: 'Arquivo deletado com sucesso',
                error: 'Erro ao deletar arquivo'
            }
        )

        queryCache.invalidateQueries(["file" + row.id])

    }


    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => {
                            setOpen(!Open)
                            fileRefetch()
                        }}
                    >
                        {Open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>


                </TableCell>

                <TableCell sx={{ width: "100%" }}>
                    2 - Observações e anexos
                </TableCell>
            </TableRow>
            <Collapse in={Open} timeout="auto" unmountOnExit sx={{ width: "100%" }}>
                {filePending
                    ?
                    <LoadingSpin
                        duration="20s"
                        width="15px"
                        timingFunction="ease-in-out"
                        direction="alternate"
                        size="60px"
                        primaryColor="#1976d2"
                        secondaryColor="#333"
                        numberOfRotationsInAnimation={10}
                        margin='0 auto'
                    /> :
                    <>
                        <TableRow>

                            <HeadTable>
                                <TableRow>

                                    <TableCell
                                        align="center"
                                        style={{ fontWeight: "bold" }}
                                    >
                                        OBS. Matrícula
                                    </TableCell>

                                    <TableCell
                                        align="center"
                                        style={{ fontWeight: "bold" }}
                                    >
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
                                                    observation[0] === undefined ||
                                                        observation[0].obs === ''
                                                        ?
                                                        <h5 >
                                                            Nenhuma observação ainda
                                                        </h5> :
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
                                                                            res.obs, row.id
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
                                                <h5>
                                                    Nenhum documento anexado ainda
                                                </h5>
                                        }
                                    </TableCell>

                                </TableRow>

                            </HeadTable>
                            <BodyTable>
                                <TableRow>
                                    <TableCell align="center"
                                    >
                                        <InputsBox >
                                            <Text cols='3'
                                                placeholder={"Escreva um comentário"}
                                                onChange={(e) =>
                                                    setValue(e.target.value)
                                                }
                                            />
                                            <button
                                                onClick={
                                                    () => {
                                                        const day = new Date()
                                                        const currentDay = day.toLocaleDateString()
                                                        let obsFiltered = observation.filter(res => res.obs !== "")

                                                        handler("observacao", row.id,
                                                            [...obsFiltered, { obs: value, name: userData.name, when: currentDay }])

                                                    }
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


                        </TableRow>

                        <RowTableCustomFields>

                            <TableCell sx={{
                                width: "100%", fontWeight: "", fontSize: ".9rem"

                            }}>
                                Campos personalizados
                            </TableCell>
                        </RowTableCustomFields>
                        <Box sx={{ margin: 1, width: "100%" }} >
                            <Table size="small" aria-label="purchases" >
                                <div
                                    style={{
                                        display: "flex",
                                    }}
                                >
                                    {
                                        customFieldsFiltered.map(res => (
                                            <span
                                                key={res.id}

                                                style={{
                                                    display: "grid",
                                                    margin: "0 1rem",
                                                    textAlign: "center"

                                                }}
                                            >

                                                <div >
                                                    {
                                                        res.type === "option" ?
                                                            <div >
                                                                <h4>{res.name}</h4>
                                                                <UniqueSelect
                                                                    label={row["customFields"][res.name]}
                                                                    option={res.options.map(r => {
                                                                        return {
                                                                            name: r
                                                                        }
                                                                    })}
                                                                    width="7rem"
                                                                    field={res.name}
                                                                    where="customField"
                                                                    fn={[ChangerCustomFields]}
                                                                />

                                                            </div>

                                                            :
                                                            <div >
                                                                <h4>{res.name}</h4>
                                                                <div >
                                                                    {
                                                                        row["customFields"][res.name] === undefined ?
                                                                            "Sem dado" :
                                                                            row["customFields"][res.name]
                                                                    }
                                                                </div>
                                                            </div>

                                                    }
                                                </div>

                                            </span>


                                        ))
                                    }
                                </div>
                            </Table>
                        </Box>
                    </>
                }
            </Collapse>



        </React.Fragment>

    )
}

Observations.propTypes = {
    row: PropTypes.shape({
        id: PropTypes.string.isRequired,
        observacao: PropTypes.array,
        customFields: PropTypes.shape({
            "Data de emissão da venda": PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
}