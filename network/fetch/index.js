import http from "../http/index.js"
import store from '@/store/index.js'
 
export async function fetchTags() {
	return  http({
		url:'',
		data:{
			file1:store.state.upFileName[0],
			file2:store.state.upFileName[1]
		}
	})
}
