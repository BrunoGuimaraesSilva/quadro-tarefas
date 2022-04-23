import axios from "axios";
import { createContext, ReactNode, useState } from "react";

interface PropsLoadingProvider {
    children: ReactNode;
}

interface interfaceLoadingContext {
    loading: boolean;
    funLoading: (data: boolean) => void;
}

export const LoadingContext = createContext({} as interfaceLoadingContext);
export function LoadingProvider(props: PropsLoadingProvider) {
    const [loading, setLoading] = useState(false);

    function funLoading(data: boolean) {
        setLoading(data);
    }

    axios.interceptors.request.use(
        function (config) {
            setLoading(true)
            return config;
        },
        function (error) {
            setLoading(true)
            return Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
        function (response) {
            // Do something with response data
            setLoading(false)
            return response;
        },
        function (error) {
            setLoading(false)
            return Promise.reject(error);
        }
    );

    return (
        <LoadingContext.Provider
            value={{
                loading,
                funLoading,
            }}
        >
            {props.children}
        </LoadingContext.Provider>
    );
}
