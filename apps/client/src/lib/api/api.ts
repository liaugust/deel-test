import axios from 'axios'

export const api = axios.create({
	baseURL: "http://localhost:3001",
})

api.interceptors.request.use((config) => {
	const profileId = localStorage.getItem("profile_id");
	
	if (profileId) {
		config.headers.profile_id = Number(profileId);
	}
	
	return config;
});