import { useContext } from "react";
import { LoadingContext } from "../../contexts/loadingContext";
import { LoadingDiv } from "../../styleLoading";

export function Loading() {
    const { loading } = useContext(LoadingContext);

    console.log(loading);
    return loading ? <LoadingDiv /> : <div></div>;
}
