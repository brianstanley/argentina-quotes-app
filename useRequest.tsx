import useSWR from "swr"

const getLastSyncTime = () => {
    const currentDate = new Date();
    const minutes = `0${currentDate.getMinutes()}`;
    const seconds = `0${currentDate.getSeconds()}`;
    return `${currentDate.getHours()}:${minutes.slice(-2)}:${seconds.slice(-2)}`
}

const fetcher = async (url) => {
    const res = await fetch(url)
    const data = await res.json();

    return [data, getLastSyncTime()]
}

const baseUrl = "/api";

export const useGet = path => {
    if (!path) {
        throw new Error("Path is required")
    }

    const url = `${baseUrl}${path}`
    const { data, error } = useSWR(url, fetcher, { refreshInterval: 15000 });
    return { data, error }
}