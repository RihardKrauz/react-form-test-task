import {useCallback, useState} from "react";

export function useFormControl<T>(defaultValue: T, validationRules?: ((val: T) => string | null)[]): [T, (e: any) => void, string | null] {
    const [value, setValue] = useState(defaultValue);
    const [error, setError] = useState<string | null>(null);

    const changeControlHandler = useCallback((e: any) => {
        setError(null);
        const newValue = e && e.target ? e.target.value : e;
        setValue(newValue);

        if (Array.isArray(validationRules) && validationRules.length > 0) {
            for (const validationRule of validationRules) {
                const errorMessage: string | null = validationRule(newValue);
                if (errorMessage) {
                    setError(errorMessage);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [value, changeControlHandler, error];
}
