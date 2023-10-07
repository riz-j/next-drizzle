export const wild = (text: string) => {
    return `%${text}%`
}

export const wildLeft = (text: string) => {
    return `%${text}`
}

export const wildRight = (text: string) => {
    return `${text}%`
}