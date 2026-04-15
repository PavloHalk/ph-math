// Date		2025-12-20

export default class Range {
    constructor(start, stop, step = 1) {
        if (step === 0) {
            throw new Error("Step should not be zero");
        }

        if (step > 0 && start > stop) {
            throw new Error("For positive step, start value should not be greater than stop value.");
        } else if (step < 0 && start < stop) {
            throw new Error("For negative step, stop value should not be greater than start value.");
        }

        this.start = start;
        this.stop = stop;
        this.step = step;

        return new Proxy(this, {
            has(target, property) {
                const value = Number(property);

                if (!Number.isFinite(value)) return false;

                if (target.step > 0) {
                    if (value < target.start || value > target.stop) {
                        return false;
                    }
                } else {
                    if (value > target.start || value < target.stop) {
                        return false;
                    }
                }

                return (value - target.start) % target.step === 0;
            }
        });
    }

    *[Symbol.iterator]() {
        const step = Math.abs(this.step);

        if (this.step > 0) {
            for (let current = this.start; current <= this.stop; current += step) {
                yield current;
            }
        } else if (this.step < 0) {
            for (let current = this.start; current >= this.stop; current -= step) {
                yield current;
            }
        } else {
            return undefined;
        }
    }

    [Symbol.toStringTag] = 'Range';
}