import { useState, useCallback } from "react";

const useHttp = function () {
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const sendRequest = useCallback(async request => {
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(request.url, request.params);
			if (!response.ok)
				throw new Error("An error occurred while fetching data");

			const data = await response.json();
			return data;
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	}, []);

	return [isLoading, error, sendRequest];
};

export default useHttp;
