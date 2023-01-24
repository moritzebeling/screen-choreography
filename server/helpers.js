/**
 * @param {number} length 
 * @returns {string}
 */
export function uniqueId(length = 16) {
	let result = '';
	let budget = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var max = budget.length;
	for ( var i = 0; i < length; i++ ) {
		result += budget.charAt( Math.floor(Math.random() * max) );
	}
	return result;
}

/**
 * @param {string} string 
 * @returns {string}
 */
export function slug( string ){
	return string.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
}