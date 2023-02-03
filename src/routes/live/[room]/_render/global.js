export function setGlobalStyleVariables( styles = {} ){
    if (typeof document === "undefined" ){
        return;
    }
    Object.keys( styles ).forEach((key) => {
        document.body.style.setProperty( key, styles[key] );
    });
}