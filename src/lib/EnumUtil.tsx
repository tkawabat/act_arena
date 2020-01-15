
export const getKeys = (myEnum) => {
    const ret = Object.keys(myEnum)
    .map(key => myEnum[key])
    .filter(value => typeof value === 'string')
    
    return ret as string[];
}