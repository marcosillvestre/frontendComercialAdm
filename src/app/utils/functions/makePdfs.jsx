import generatePDF, { Margin, Resolution } from 'react-to-pdf';
import { toast } from 'react-toastify';


export const senderImpressContract = async (fileName, file) => {

    const options = {
        filename: fileName,
        method: 'save',
        resolution: Resolution.NORMAL,

        page: {
            margin: Margin.SMALL,
            format: 'A4',
            orientation: 'portrait'
        },
        canvas: {
            // default is 'image/jpeg' for better size performance
            mimeType: 'image/png',
            qualityRatio: 1
        },
        // Customize any value passed to the jsPDF instance and html2canvas
        // function. You probably will not need this and things can break, 
        // so use with caution.
        overrides: {
            // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
            pdf: {
                compress: true
            },
            // see https://html2canvas.hertzen.com/configuration for more options
            canvas: {
                useCORS: true
            }
        },
    };


    console.log(file)

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