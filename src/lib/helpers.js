/**
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
export function random(min = 0, max = 1) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function morph( value, target, threshold = 100, step = 0.1 ){
    const diff = target - value;
    if( Math.abs(diff) < threshold ){
        return target;
    }
    if( value < target ){
        value = Math.min( value * (1+step), target );
    } else {
        value = Math.max( value * (1-step), target );
    }
    return Math.floor( value );
}

/**
 * @returns {boolean}
 */
export function isTouchDevice() {
    if (typeof window === "undefined" || typeof navigator === "undefined") {
        return null;
    }
    return ( 'ontouchstart' in window ) ||
           ( navigator.maxTouchPoints > 0 ) ||
           ( navigator.msMaxTouchPoints > 0 );
}

/**
 * @param {number} chunks
 * @param {number} length
 * @param {string} separator
 * @returns {string}
 */
export function uniqueId(chunks = 6, length = 4, separator = '-') {
	const budget = [
        'aeiou',
        'bcdfghjklmnpqrstvwxyz0123456789'
    ];
    return [...Array(chunks).keys()].map(()=>{
        let chunk = '';
        let a = Math.round( Math.random() );
        for ( var i = 0; i < length; i++ ) {
            let b = budget[(a+i) % 2];
            chunk += b.charAt( Math.floor(Math.random() * b.length) );
        }
        return chunk;
    }).join(separator);
}

/**
 * @param {string} string 
 * @returns {string}
 */
export function slug( string = '' ){
	return string
        .toLowerCase()
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .replace(/[^a-z0-9]+/g,'-')
        .replace(/-+/g,'-');
}