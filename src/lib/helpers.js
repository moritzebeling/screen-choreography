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