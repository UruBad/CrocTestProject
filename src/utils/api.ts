import axios from 'axios'

export async function callApi(method: string, path: string, data?: any) {
	const API_ADDRESS = 'https://my-json-server.typicode.com/tadite/test-task';
	/*return await axios({
		method: 'GET',
		url: API_ADDRESS + path,
		data: JSON.stringify(data)
	}).then(res => { if(path === '/previews') {
		setTimeout(() => {return res.data}, 3000);
	} else return res.data }).catch(err => { return { error: err } });
*/
	
	return await axios({
		method: method,
		url: API_ADDRESS + path,
		data: data
	}).then(res => res.data).catch(err => { return { error: err } });
}
