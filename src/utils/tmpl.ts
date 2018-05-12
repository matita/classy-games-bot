export const tmpl = (text: string, obj: any) => text.replace(/\{([^\}]+)\}/g, (match: string, keyword: any) => {
    const parts = keyword.split('.')
    let res = obj, word
    for (let i = 0; i < parts.length; i++) {
        word = parts[i]
        res = res[word]
        if (res == null)
            return match
    }

    return res
})