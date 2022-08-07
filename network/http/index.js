export default async function http({url,data,method="POST"}){
	let baseUrl= 'https://www.falvzhushou.cn:8001/api/diff_fuc_more'
	return new Promise((resolve,reject)=>{
		uni.request({
			url:baseUrl+url,
			method,
			data,
			success(res) {
				resolve(res.data)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}