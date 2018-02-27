export function formatDate(date,fm){
	if(/(y+)/.test(fm)){

		fm=fm.replace(RegExp.$1,String(date.getFullYear()).substring(4-RegExp.$1.length))
	}
	let o={
		'M+':date.getMonth()+1,
		'd+':date.getDate(),
		'h+':date.getHours(),
		'm+':date.getMinutes(),
		's+':date.getSeconds()
	};
	for(let key in o){
		if(RegExp(`(${key})`).test(fm)){
			let str=o[key]+'';
			fm=fm.replace(RegExp.$1,RegExp.$1.length===1?str:padLeftZero(str));
		}
	}
	return fm;
}

function padLeftZero(str){
	 return ('00'+str).substring(str.length);
	
}