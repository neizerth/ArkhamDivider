import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react"

export const useAxiosProgress = <T>(config: AxiosRequestConfig) => {
    const [data, setData] = useState<T>();
    const [progress, setProgress] = useState(0);
    const loading = progress !== 100;

    const { onDownloadProgress } = config;

    useEffect(() => {
        const axiosConfig: AxiosRequestConfig = {
            ...config,
            onDownloadProgress: event => {
                const { total = 0, loaded } = event;
                const progress = loaded * 100 / total;
                // console.log(progress);
                console.log(event)
    
                setProgress(total && progress);
    
                if (onDownloadProgress) {
                    onDownloadProgress(event);
                }
            }
        }
        axios<T>(axiosConfig)
            .then((response) => {
                console.log(response);
                const { data } = response;
                setProgress(100);
                setData(data);
            });
    }, []);

    return {
        data,
        loading,
        progress
    };
}