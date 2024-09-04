import generatePDF, { Margin, Resolution } from 'react-to-pdf';
import { toast } from 'react-toastify';


export const senderImpressContract = async (fileName, file) => {

    const options = {
        filename: fileName,
        method: 'save',
        resolution: Resolution.NORMAL,

        page: {
            margin: Margin.MEDIUM,
            format: 'A4',
            orientation: 'portrait'
        }
    };



    try {

        await toast.promise(
            generatePDF(file, options)
            , {
                pending: 'Criando o documento',
                success: 'Baixado com sucesso',
                error: 'Alguma coisa deu errado'
            }
        )

        return "success"
    } catch (error) {
        return error
    }
}