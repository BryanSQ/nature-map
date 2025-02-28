import { useState } from "react";

export const useLocalStorage = <T>(key: string, defaultValue: object) => {
	const [localStorageValue, setLocalStorageValue] = useState(() => {
		try {
			const value = localStorage.getItem(key);
			if (value) {
				return JSON.parse(value);
			}

			localStorage.setItem(key, JSON.stringify(defaultValue));
			return defaultValue;
		} catch (error) {
			localStorage.setItem(key, JSON.stringify(defaultValue));
			return defaultValue;
		}
	});

	const saveLocalStorageValue = (valueOrFn: T | ((val: T) => T)) => {
		const newValue =
			typeof valueOrFn === "function"
				? (valueOrFn as (val: T) => T)(localStorageValue)
				: valueOrFn;

		localStorage.setItem(key, JSON.stringify(newValue));
		setLocalStorageValue(newValue);
	};

	const forgetLocalStorageValue = () => {
		localStorage.removeItem(key);
	};

	return {
		localStorageValue,
		saveLocalStorageValue,
		forgetLocalStorageValue,
	};
};
