import React, { useState, useEffect, createContext, useContext } from "react";

import axios from "axios";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";

const rootUrl = "https://api.github.com";
const rate = "/rate_limit";

const AppContext = createContext();

const AppProvider = ({ children }) => {
	const [user, setUser] = useState(mockUser);
	const [request, setRequest] = useState(0);
	const [loading, setLoading] = useState(false);
	const [repos, setRepos] = useState(mockRepos);
	const [followers, setFollowers] = useState(mockFollowers);
	const [error, setError] = useState({ show: false, msg: "" });

	// const fetchUser = async (user) => {
	// 	toggleError();
	// 	console.log(`${rootUrl}/users/${user}`);
	// 	setLoading(true);
	// 	const res = await axios(`${rootUrl}/users/${user}`).catch((err) => console.log(err));
	// 	if (res) {
	// 		console.log(res.data);

	// 		setUser(res.data);
	// 		const { login, followers_url } = res.data;
	// 		axios(`${rootUrl}/users/${login}/repos?per_page=100`).then((res) => setRepos(res.data));
	// 		axios(`${followers_url}?per_pages=100`).then((res) => setFollowers(res.data));
	// 	} else {
	// 		toggleError(true, "There is no user with this username");
	// 	}
	// 	fetchCheckRequest();
	// 	setLoading(false);
	// };

	const fetchUser = async (user) => {
		toggleError();

		setLoading(true);
		const res = await axios(`${rootUrl}/users/${user}`).catch((err) => console.log(err));
		if (res) {
			setUser(res.data);

			const { login, followers_url } = res.data;

			await Promise.allSettled([axios(`${rootUrl}/users/${login}/repos?per_page=100`), axios(`${followers_url}?per_pages=100`)])
				.then((res) => {
					const [repos, followers] = res;

					const status = "fulfilled";
					if (repos.status === status) {
						setRepos(repos.value.data);
					}
					if (followers.status === status) {
						setFollowers(followers.value.data);
					}
				})
				.catch((err) => console.log(err));
		} else {
			toggleError(true, "There is no user with this username");
		}
		fetchCheckRequest();
		setLoading(false);
	};

	const fetchCheckRequest = () =>
		axios
			.get(`${rootUrl}${rate}`)
			.then((res) => {
				setRequest(res.data.rate.remaining);

				if (res.data.rate.remaining == 0) {
					toggleError(true, "Sorry, you have exeed your hourly rate limit. Please Wait.");
				}
			})
			.catch((err) => console.log(err));

	const toggleError = (show = false, msg = "") => {
		setError({ show, msg });
	};

	useEffect(() => {
		fetchCheckRequest();
	}, []);

	return <AppContext.Provider value={{ repos, user, followers, fetchUser, request, error, loading }}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };
