export const parseNumber = (number) => {
    if (number === '' || number === undefined) return 0;
    if (typeof number === 'number') return number.toFixed(2);

    if (typeof number === 'string') {

        const parsed = number.includes(",") ?
            parseFloat(number.replace(",", ".")) :
            parseFloat(number)

        return parsed
    }


}


export const changeCurrency = (value) => {
    if (!value) return 0;

    const parsedValue = parseFloat(value);

    return parsedValue.toLocaleString('pt-BR', { style: 'currency', currency: 'brl' })
}