import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import URI from '../../../../../app/utils/utils';
import { useRegister } from '../../../../../hooks/registers/registersContext.hook';
import { useUser } from '../../../../../hooks/userContext';
import { EmptyData } from '../../../../emptyData';
import { ButtonAction, ContainerComment, ContainerPopUpData, FilesContainer } from '../styles';
export const Anexes = () => {

    const { userData } = useUser();
    const { register } = useRegister();
    const { id, files } = register;


    const [filesData, setfilesData] = React.useState(files || []);
    const [fileName, setFileName] = React.useState("")
    const [file, setFile] = React.useState(null)
    const [loading, setLoading] = React.useState(false)


    const addFile = (newFile) => {

        const value = [
            ...filesData,
            newFile
        ]

        setfilesData(value)

    }


    const {
        register: registering, handleSubmit,
        formState: { errors }
    } = useForm();


    async function GetUrl() {

        if (!file) return
        const { name, type, size } = file[0]

        const body = {
            name,
            contentType: type,
            id: id,
            size,
            responsible: userData.name
        }

        const { data: { url, key } } = await URI.post(
            "/files",
            body
        )


        if (!url) return toast.error('Erro ao gerar URL')

        addFile({ ...body, key, created_at: new Date() })

        await toast.promise(
            axios.put(url, file[0], { Headers: { 'Content-Type': type } }),
            {
                pending: 'Enviando arquivo',
                success: 'Arquivo enviado com sucesso',
                error: 'Erro ao enviar arquivo'
            }
        )

        setFile("");
        setFileName("")
    }

    async function GetDownloadUrl(key) {
        setLoading(true)
        await URI.get(`/file?key=${key}`)
            .then(async res => {
                const { data } = res

                window.location = data
                setFile("")
                setFileName("")
            })
            .finally(() => setLoading(false))
    }

    return (
        <ContainerPopUpData>

            <div
                className='observation-box'
            >

                <FilesContainer
                    onSubmit={handleSubmit(GetUrl)}
                >
                    <p>Arquivos:</p>
                    <label htmlFor="fileUpload">
                        <input
                            type="file"
                            id="fileUpload"
                            accept=".pdf, .jpg, .jpeg, .png"
                            {...registering("file")}
                            onChange={(e) => {
                                setFile(e.target.files);
                                setFileName(e.target.files[0].name)
                            }}
                        />

                        <CloudUploadIcon />

                        <p>{fileName}</p>
                        <button
                            type='submit'
                            className='defaultButton blueButton'>

                            enviar
                        </button>
                    </label>

                    <p style={{ color: 'red' }}>
                        {errors.file?.message &&
                            errors.file?.message}
                    </p>
                </FilesContainer>



                <div className='container'>
                    {
                        filesData?.length === 0 ?
                            <EmptyData width='10rem' /> :
                            filesData.map((tag) => (

                                <ContainerComment key={tag.id}>
                                    {
                                        loading ?

                                            "carregando..."
                                            :
                                            <>
                                                <header>
                                                    {tag.contentType}
                                                </header>
                                                <main>
                                                    {
                                                        tag.contentType === 'link' ?
                                                            <ButtonAction
                                                                title={`Direcionar ao contrato`}
                                                            >
                                                                <a href={tag.key} target='_blank' rel='noreferrer'>{tag.name}</a>
                                                            </ButtonAction>
                                                            :
                                                            <ButtonAction
                                                                onClick={() => GetDownloadUrl(tag.key)}
                                                                title={`Fazer o download do arquivo ${tag.contentType}`}
                                                            >
                                                                {tag.name}
                                                            </ButtonAction>
                                                    }
                                                </main>
                                                <footer>
                                                    <p>{new Date(tag.created_at).toLocaleString("pt-BR")}</p>
                                                </footer>
                                            </>
                                    }
                                </ContainerComment>
                            )
                            )
                    }
                </div>

            </div>

        </ContainerPopUpData>
    )
}
