// Date		2025-12-19

import { gcd, lcm, root } from './math.js';

export default class Fraction {
    #numerator = 1
    #denominator = 1

    constructor(numerator, denominator) {
        if (!Number.isInteger(numerator)) {
            throw new RangeError("Expected numerator to be an integer.");
        }

        if (!Number.isInteger(denominator)) {
            throw new RangeError("Expected denominator to be an integer.");
        }

        if (denominator === 0) {
            throw new RangeError("Denominator should not be zero.");
        }

        if (denominator < 0) {
            numerator = -numerator;
            denominator = -denominator;
        }

        this.#numerator = numerator;
        this.#denominator = denominator;

        this.#reduce();
    }

    get numerator() {
        return this.#numerator;
    }

    get denominator() {
        return this.#denominator;
    }

    add(frac) {
        if (!(frac instanceof Fraction)) {
            throw new TypeError("Argument must be an instance of Fraction.");
        }

        const _lcm = lcm(this.#denominator, frac.#denominator);

        const m1 = _lcm / this.#denominator;
        const m2 = _lcm / frac.#denominator;

        const num = this.#numerator * m1 + frac.#numerator * m2;

        return new Fraction(num, _lcm);
    }

    subtract(frac) {
        if (!(frac instanceof Fraction)) {
            throw new TypeError("Argument must be an instance of Fraction.");
        }

        const _lcm = lcm(this.#denominator, frac.#denominator);

        const m1 = _lcm / this.#denominator;
        const m2 = _lcm / frac.#denominator;

        const num = this.#numerator * m1 - frac.#numerator * m2;

        return new Fraction(num, _lcm);
    }

    multiply(frac) {
        if (!(frac instanceof Fraction)) {
            throw new TypeError("Argument must be an instance of Fraction.");
        }

        return new Fraction(this.#numerator * frac.#numerator, this.#denominator * frac.#denominator);
    }

    divide(frac) {
        if (!(frac instanceof Fraction)) {
            throw new TypeError("Argument must be an instance of Fraction.");
        }

        if (frac.#numerator === 0) {
            throw new RangeError("Cannot divide by fraction with numerator 0.");
        }

        return new Fraction(this.#numerator * frac.#denominator, this.#denominator * frac.#numerator);
    }

    pow(exp = 2) {
        if (!Number.isInteger(exp)) {
            throw new RangeError("Power argument should be an integer.");
        }

        return new Fraction(Math.pow(this.#numerator, exp), Math.pow(this.#denominator, exp));
    }

    /**
     * Takes a root by exponent.
     * WARNING! If the root value is not integer - error will be thrown
     * as numerator and denominator should be only integer.
     *
     * @param exp
     * @return {Fraction}
     */
    root(exp = 2) {
        if (!Number.isInteger(exp)) {
            throw new RangeError("Expected power to be an integer.");
        }

        if (this.#numerator < 0 || this.#denominator < 0) {
            throw new RangeError("Cannot take root from the negative fraction.");
        }

        return new Fraction(root(this.#numerator, exp), root(this.#denominator, exp));
    }

    isEquals(frac) {
        return (this.#numerator === frac.#numerator && this.#denominator === frac.#denominator);
    }

    isGreater(frac) {
        return this.valueOf() > frac.valueOf();
    }

    isLess(frac) {
        return this.valueOf() < frac.valueOf();
    }

    #reduce() {
        const divisor = gcd(this.#numerator, this.#denominator);

        this.#numerator = this.#numerator / divisor;
        this.#denominator = this.#denominator / divisor;
    }

    [Symbol.toStringTag] = "Fraction";

    toString() {
        return this.#numerator + '/' + this.#denominator;
    }

    valueOf() {
        return this.#numerator / this.#denominator;
    }
}