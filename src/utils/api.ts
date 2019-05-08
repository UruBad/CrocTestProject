import axios from 'axios'

export async function callApi(method: string, path: string, data?: any) {
	const API_ADDRESS = 'https://my-json-server.typicode.com/tadite/test-task';

	// почему-то не работает передача параметров, пока вручную делаю пейджинг
	let urlParams = '';
	if(method.toUpperCase() === 'GET' && data){
		urlParams += '?';
		for (let key in data) {
			if(data[key])
				urlParams += '&' + key + '=' + data[key];
		}
	}

	return await axios({
		method: method,
		url: API_ADDRESS + path + urlParams,
		data: data
	}).then(res => res.data).catch(err => { return { error: err } });
}
