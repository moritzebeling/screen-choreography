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
 * @param {number} interval speed in ms
 * @param {number} factor 
 * @returns {Promise}
 */
export function syncAnim( interval = 2000, factor = 1 ) {
    factor = interval * factor;
    let now = Date.now();
    let startAt = Math.ceil( now / factor ) * factor;
    let timeout = startAt - now;
    return new Promise((resolve) => {
        setTimeout(() => resolve(true), timeout);
    });
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
export function uniqueId(chunks = 2, length = 4, separator = '-') {
	const budget = [
        'aeiou',
        'bcdfghjklmnpqrstvwxyz'
    ];
    return Date.now() + '-' + [...Array(chunks).keys()].map(()=>{
        let chunk = '';
        let a = Math.round( Math.random() );
        for ( var i = 0; i < length; i++ ) {
            let b = budget[(a+i) % 2];
            chunk += b.charAt( Math.floor(Math.random() * b.length) );
        }
        return chunk;
    }).join(separator);
}

export function randomColor() {
    const budget = '0123456789abcdef';
    let color = '';
    while( color.length < 3 ){
        color += budget.charAt(Math.floor(Math.random() * budget.length));
    }
    return '#' + color;
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

/**
 * @param {Object} styles
 */
export function setGlobalStyleVariables( styles = {} ){
    if (typeof document === "undefined" ){
        return;
    }
    Object.keys( styles ).forEach((key) => {
        document.body.style.setProperty( key, styles[key] );
    });
}