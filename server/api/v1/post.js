const apiKey = '887d370cffa6422eab8f47c586ba9a39'
const searchIn = 'title'
export default defineEventHandler(async (event) => {
    const { q = 'apple', page = 1, pageSize = 5 } = getQuery(event)

    // Gọi API với params
    const data = await $fetch(`https://newsapi.org/v2/everything`, {
        params: {
            q,
            page,
            pageSize,
            searchIn,
            apiKey
        }
    })
    return data
})

// defineCachedEventHandler(async () => {

// }, { 60 * 60 * 12 })