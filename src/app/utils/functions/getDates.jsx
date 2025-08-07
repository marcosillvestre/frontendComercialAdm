

export const getDate = async (range) => {

    const now = new Date();


    const LastMonth = () => `${new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0, 0)}~${new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999)}`;
    const TwoMonths = () => `${new Date(now.getFullYear(), now.getMonth() - 2, 1, 0, 0, 0, 0)}~${new Date(now.getFullYear(), now.getMonth() - 1, 0, 23, 59, 59, 999)}`;
    const ThisMonth = () => `${new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0)}~${new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)}`;


    // if (custom) {
    //     var { selectedInitialDate, selectedEndDate } = custom
    // }

    // const Custom = () => `${selectedInitialDate}~${selectedEndDate}`;


    const SevenDays = () => {
        const date = new Date()
        date.setDate(date.getDate() - 7)
        return `${date.toDateString()}~${new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999)}`
    }

    const All = () => {
        const date = new Date()
        date.setDate(date.getDate() - 10000)
        return `${date.toDateString()}~${new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999)}`
    }

    const ThisYear = () => {
        const date = new Date();
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        return `${firstDayOfYear.toDateString()}~${new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999)}`
    }

    const settledPeriod = {
        "Mês passado": await LastMonth(),
        "Mês retrasado": await TwoMonths(),
        "Este mês": await ThisMonth(),
        // "Personalizado": await Custom(),
        "Últimos 7 dias": await SevenDays(),
        "Este ano": await ThisYear(),
        "Todo período": await All(),
    }

    return settledPeriod[range]
}



export const dateCalculator = (date, index) => {
    if (!date) return null;

    const dateFormated = new Date(date.split('/').reverse().join('-'));
    dateFormated.setUTCHours(12)

    return index === 0 ? dateFormated.toLocaleDateString() :
        new Date(dateFormated.setMonth(dateFormated.getMonth() + index)).toLocaleDateString("pt-Br")
}

export const ReOrderDate = (string) => {
    let [day, month, year] = string.split('/');

    // Reorganiza para o formato "YYYY-MM-DD"
    let isoDate = `${year}-${month}-${day}`;

    return isoDate
}

export const parseDates = (date) => {

    if (!date) return new Date()

    const utc = date.split("T")[0];
    const isoDate = utc + "T03:00:00.000Z";
    return new Date(isoDate).toLocaleDateString('pt-BR')
}


export const treatingDates = (date) => {
    if (!date) return ''
    return new Date(date).toLocaleString()
}



export const pickingDate = (range) => {

    const now = new Date();


    const LastMonth = () => `${new Date(now.getFullYear(), now.getMonth() - 1, 1)}~${new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999)}`;
    const TwoMonths = () => `${new Date(now.getFullYear(), now.getMonth() - 2, 1)}~${new Date(now.getFullYear(), now.getMonth() - 1, 0, 23, 59, 59, 999)}`;
    const ThisMonth = () => `${new Date(now.getFullYear(), now.getMonth(), 1)}~${new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)}`;


    const SevenDays = () => {
        const date = new Date()
        date.setDate(date.getDate() - 7)
        return `${date.toDateString()}~${now}`
    }

    const All = () => {
        const date = new Date()
        date.setDate(date.getDate() - 10000)
        return `${date.toDateString()}~${new Date(now.setUTCHours(23, 59, 59, 999))}`
    }

    const ThisYear = () => {
        const date = new Date();
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        return `${firstDayOfYear.toDateString()}~${new Date(now.setUTCHours(23, 59, 59, 999))}`
    }


    const settledPeriod = {
        "Mês passado": LastMonth(),
        "Mês retrasado": TwoMonths(),
        "Este mês": ThisMonth(),
        "Últimos 7 dias": SevenDays(),
        "Este ano": ThisYear(),
        "Todo período": All(),
    }

    return settledPeriod[range]
}