import useSWR from "swr"

const fetcher = url => fetch(url).then(res => res.json())
const baseUrl = "http://localhost:3000/api"

export const useGet = path => {
    if (!path) {
        throw new Error("Path is required")
    }

    const url = `${baseUrl}${path}`

    const { data: quotes, error } = useSWR(url, fetcher)

    return { quotes, error }
}