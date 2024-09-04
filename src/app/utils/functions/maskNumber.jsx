export const maskPhone = (phone) => {
    if (phone === undefined) return
    const noMask = phone.replace(/\D/g, "")
    const { length } = noMask

    if (length <= 11) return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    if (length > 11) return phone.replace(/(\d{2})(\d{2})(\d{4,5})(\d{4})/, '+$1 ($2) $3-$4');


}