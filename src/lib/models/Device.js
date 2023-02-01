export class Device {

    constructor( userAgent, language ){
        
        if( !userAgent && typeof navigator !== "undefined" ){
            userAgent = navigator.userAgent;
        }
        
        if( !language && typeof navigator !== "undefined" ){
            language = navigator.language;
        }
        
        this.agent = userAgent;

        this.system = Device.detectSystem( userAgent );
        this.browser = Device.detectBrowser( userAgent );
        this.language = Device.detectLanguage( language );
        this.touch = Device.detectTouch();
        
    }

    static detectSystem( userAgent ){
        userAgent = String(userAgent).toLowerCase();
        
        const options = {
            windows: 'windows',
            macintosh: 'mac',
            linux: 'linux',
            iphone: 'ios',
            ipad: 'ios',
            android: 'android',
        };

        let match = Object.keys(options).find( option => {
            return userAgent.includes( option );
        });

        return match ? options[match] : 'other';

    }
    
    static detectBrowser( userAgent ){
        userAgent = String(userAgent).toLowerCase();

        const options = [ 'chrome', 'firefox', 'safari', 'edge', 'opera' ];
        
        return options.find( option => {
            return userAgent.includes( option )
        }) || 'other';

    }

    static detectLanguage( language ){
        language = String(language).toLowerCase().substring(0,2);

        const options = [ 'en', 'de' ];

        return options.find( option => {
            return language.includes( option )
        }) || options[0];

    }

    static detectTouch(){
        if (typeof window === "undefined" || typeof navigator === "undefined") {
            return null;
        }
        return ( 'ontouchstart' in window )
            || ( navigator.maxTouchPoints > 0 )
            || ( navigator.msMaxTouchPoints > 0 )
            || false;
    }

}