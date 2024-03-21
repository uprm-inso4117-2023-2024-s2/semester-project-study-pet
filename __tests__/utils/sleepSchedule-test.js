import {isPetAsleep} from '../../utils/sleepSchedule'

describe('isPetAsleep function', () => {
    it('Returns true when the pet is asleep', () => {
        const currentTime = new Date();
        const sleepTime = `${currentTime.getHours()}:${currentTime.getMinutes()-1}`;
        expect(isPetAsleep(sleepTime)).toBe(true);
    });

    it('Returns false when the pet is awake', () => {
        const currentTime = new Date();
        const sleepTime = `${currentTime.getHours()}:${currentTime.getMinutes()+1}`;
        expect(isPetAsleep(sleepTime)).toBe(false);
    });

    it('Throws an error when hours is parsed as NaN', () => {
        expect(() => isPetAsleep('hh:00')).toThrow('Invalid time');
    });

    it('Throws an error when hours is less than 0', () => {
        expect(() => isPetAsleep('-1:00')).toThrow('Invalid time');
    });

    it('Throws an error when hours is greater than 23', () => {
        expect(() => isPetAsleep('24:00')).toThrow('Invalid time');
    });

    it('Throws an error when minutes is parsed as NaN', () => {
        expect(() => isPetAsleep('10:mm')).toThrow('Invalid time');
    });

    it('Throws an error when minutes is less than 0', () => {
        expect(() => isPetAsleep('10:-3')).toThrow('Invalid time');
    });

    it('Throws an error when minutes is greater than 59', () => {
        expect(() => isPetAsleep('10:65')).toThrow('Invalid time');
    });
});