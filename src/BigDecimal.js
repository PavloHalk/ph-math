class BigDecimal {
    #integer = '0';
    #decimal = '0';
    #decimalPrecision = 1000;
    
    constructor(integer, decimal, decimalPrecision = 1000) {
        if (typeof decimalPrecision !== 'number') throw new TypeError("Precision must be an integer number.");
        if (Math.floor(decimalPrecision) !== decimalPrecision) throw new RangeError("Precision must be an integer number.");
        
        this.#integer = validateAndNormalize(integer);
        this.#decimal = validateAndNormalize(decimal);
        this.#decimalPrecision = decimalPrecision;
        this.#precise();
        
        function validateAndNormalize(n) {
            if (typeof n === 'bigint') return n.toString();
            
            if (typeof n === 'number' && Math.floor(n) === n) {
                return n.toString();
            } else if (typeof n === 'number' && Math.floor(n) !== n) {
                throw new RangeError("Constructor arguments should not be decimal.");
            }
            
            if (typeof n === 'string' && /^\d+$/.test(n)) {
                return n;
            } else if (typeof n === 'string' && !/^\d+$/.test(n)) {
                throw new RangeError("Constructor arguments should contain only digits.");
            }
            
            throw new TypeError('Invalid argument type.');
        }
    }
    
    add(n) {
        n = this.#validateAndNormalize(n);
        
        return this;
    }
    
    subtract(n) {
        n = this.#validateAndNormalize(n);
        
        return this;
    }
    
    multiply(n) {
        n = this.#validateAndNormalize(n);
        
        return this;
    }
    
    divide(n) {
        n = this.#validateAndNormalize(n);
        
        return this;
    }

    toString() {
        return this.#integer.toString() + '.' + this.#decimal.toString();
    }
    
    #precise() {
        this.#decimal = this.#decimal.substring(0, this.#decimalPrecision);
    }
    
    #validateAndNormalize(n) {
        if (n instanceof BigDecimal) return n;
        
        if (typeof n === 'number') n = n.toString();

        if (typeof n === 'string' && !/^\d+$/.test(n) && !/^\d+\.\d+$/.test(n)) {
            throw new RangeError("Value could not be interpreted as number.");
        }
        
        if (typeof n !== 'string') throw new TypeError("Invalid argument type.");
        
        n = n.split('.');
        if (n.length === 1) n.push('0');
        
        return new BigDecimal(n[0], n[1], this.#decimalPrecision);
    }
    
    [Symbol.toPrimitive]() {
        return this.toString();
    }
    
    [Symbol.toStringTag] = 'BigDecimal';
}

const a = new BigDecimal('9', '000123456789', 10);
const b = new BigDecimal('9', '9999', 10);
a.add(b).add(88).add(17.005).add('8785').add('0.00095');
console.log(a.toString());