import useSWR from "swr"

const getLastSyncTime = () => {
    let currentDate = new Date();
    return `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`
}

const fetcher = async (url) => {
    const res = await fetch(url)
    const data = await res.json();

    return [data, getLastSyncTime()]
}

const baseUrl = "http://localhost:3000/api";

export const useGet = path => {
    if (!path) {
        throw new Error("Path is required")
    }

    const url = `${baseUrl}${path}`
    const { data, error } = useSWR(url, fetcher, { refreshInterval: 15000 });
    return { data, error }
}