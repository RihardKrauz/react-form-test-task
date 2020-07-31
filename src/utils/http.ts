import axios, {CancelTokenSource} from "axios";
import {useEffect} from "react";

const requestTimeout = 15000;

export function useHttpGetRequest<T>(): [(url: string) => Promise<T | undefined>, CancelTokenSource] {
    const cancellationToken = axios.CancelToken.source();
    const fetchData = async (url: string) => {
        try {
            const result = await axios.get(url, {
                cancelToken: cancellationToken.token,
                timeout: requestTimeout
            })
            return result.data;
        } catch (error) {
            if (axios.isCancel(error)) {
            } else {
                throw error;
            }
        }
    }
    return [fetchData, cancellationToken];
}

export function useHttpPostRequest<T, P>(): [(url: string, body: P) => Promise<T | undefined>, CancelTokenSource] {
    const cancellationToken = axios.CancelToken.source();
    const fetchData = async (url: string, body: P) => {
        try {
            const result = await axios.post(url, body,{
                cancelToken: cancellationToken.token,
                timeout: requestTimeout
            })
            return result.data;
        } catch (error) {
            if (axios.isCancel(error)) {
            } else {
                throw error;
            }
        }
    }
    return [fetchData, cancellationToken];
}

export function useRequestOnInit<T>(
    action: () => [(...p: any) => Promise<T | undefined>, CancelTokenSource],
    onSuccess: (value: T | undefined) => Promise<void> | void,
    onError: (ex: any) => void,
    ...props: any
) {
   useEffect(() => {
       const [httpAction, cancellationToken] = action();

       httpAction(...props).then(onSuccess).catch(onError);

       return () => {
           cancellationToken.cancel('Cancelling in cleanup');
       };

       // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
}
