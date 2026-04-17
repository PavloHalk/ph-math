class BigDecimal {
    #integer = '0';
    #decimal = '0';
    #decimalPrecision = 1000;
    
    constructor(integer, decimal, decimalPrecision = 1000) {
        const errMsg = "Precision must be an integer number greater than zero.";
        
        if (typeof decimalPrecision !== 'number') throw new TypeError(errMsg);
        if (Math.floor(decimalPrecision) !== decimalPrecision || decimalPrecision < 1) throw new RangeError(errMsg);
        
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
        
        const sizeInt = Math.max(this.#integer.length, n.#integer.length);
        const sizeDec = Math.max(this.#decimal.length, n.#decimal.length);
        
        const ai = this.#integer.padStart(sizeInt, '0');
        const bi = n.#integer.padStart(sizeInt, '0');
        const ad = this.#decimal.padEnd(sizeDec, '0');
        const bd = n.#decimal.padEnd(sizeDec, '0');
        let ri = sum(ai, bi);
        let rd = sum(ad, bd);
        
        if (rd.length > sizeDec) {
            ri = sum(ri, '1'.padStart(ri.length));
            rd = rd.substring(1);
        }
        
        this.#integer = ri;
        this.#decimal = rd;
        this.#precise();
        
        return this;
        
        function sum(a, b) {
            let result = '';
            let iterSum = 0;
            let iterModifier = 0;
            for (let i = a.length -1; i >= 0; i--) {
                iterSum = Number(a[i]) + Number(b[i]) + iterModifier;

                if (iterSum >= 10) {
                    iterSum -= 10;
                    iterModifier = 1;
                } else {
                    iterModifier = 0;
                }

                result += iterSum.toString();
            }

            if (iterModifier) result += 1;

            return result.split('').toReversed().join('');
        }
    }
    
    subtract(n) {
        n = this.#validateAndNormalize(n);

        const sizeInt = Math.max(this.#integer.length, n.#integer.length);
        const sizeDec = Math.max(this.#decimal.length, n.#decimal.length);

        const ai = this.#integer.padStart(sizeInt, '0');
        const bi = n.#integer.padStart(sizeInt, '0');
        const ad = this.#decimal.padEnd(sizeDec, '0');
        const bd = n.#decimal.padEnd(sizeDec, '0');
        let ri = sub(ai, bi);
        let rd = sub(ad, bd);
        
        if (rd.startsWith('r')) {
            ri = sub(ri, '1'.padStart(ri.length, '0'));
            rd = rd.substring(1);
        }
        
        if (ri.startsWith('r')) {
            throw new RangeError("BigDecimal cannot be below zero. For now. Will be fixed soon.");
        }

        this.#integer = ri;
        this.#decimal = rd;
        this.#precise();
        
        return this;
        
        function sub(a, b) {
            let result = '';
            let iterSub = 0;
            let iterModifier = 0;
            for (let i = a.length -1; i >= 0; i--) {
                iterSub = Number(a[i]) - Number(b[i]) - iterModifier;

                if (iterSub < 0) {
                    iterSub = 10 - Math.abs(iterSub);
                    iterModifier = 1;
                } else {
                    iterModifier = 0;
                }

                result += iterSub.toString();
            }

            if (iterModifier) result += 'r';

            return result.split('').toReversed().join('');
        }
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

const a = new BigDecimal('90188815', '705', 10);
const b = new BigDecimal('9', '9999', 10);
a.subtract(b).subtract(88).subtract(17.005).subtract('8785').subtract('0.00095');
console.log(a.toString());