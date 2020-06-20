import Cookie from 'universal-cookie'

const cookie = new Cookie();

/**
 * An interface to use the cookie class.
 * 
 * See https://www.npmjs.com/package/universal-cookie for more details on
 * how the cookie class work.
 */
class CookieService {

    /**
     * Get a value from the base.
     * 
     * @param {String} key 
     */
    get(key){
        return cookie.get(key);
    }

    /**
     * Set a value to the base.
     * 
     * @param {String} key 
     * @param {String} value 
     * @param {String} options 
     */
    set(key, value, options) {
        cookie.set(key, value, options);
    }

    /**
     * Remove a value from the base.
     * 
     * @param {String} key 
     */
    remove(key) {
        cookie.remove(key);
    }

    /**
    * Check if a cookie is declared
    * 
    * @param {String} key 
    */
    isDeclared(key) {
        if (cookie.get(key) === undefined) {
            return false;
        }
        return true;
    }

}


export default CookieService