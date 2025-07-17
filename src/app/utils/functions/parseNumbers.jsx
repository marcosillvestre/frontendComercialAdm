export const parseNumber = (number) => {
    if (number === '' || number === undefined) return 0

    if (typeof number === 'string') {

        const parsed = number.includes(",") ?
            parseFloat(number.replace(",", ".")) :
            parseInt(number)

        return parsed
    }


}


export const changeCurrency = (value) => {
    if (!value) return 0;

    const parsedValue = parseFloat(value);

    return parsedValue.toLocaleString('pt-BR', { style: 'currency', currency: 'brl' })
}