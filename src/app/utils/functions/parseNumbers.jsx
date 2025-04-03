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
    const parsedValue = parseNumber(value);

    return parsedValue.toLocaleString('pt-BR', { style: 'currency', currency: 'brl' })
}