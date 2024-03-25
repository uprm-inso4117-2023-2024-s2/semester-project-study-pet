import AsyncStorage from "@react-native-async-storage/async-storage";
import {saveSleep, saveSleepTime, loadSleep, loadSleepTime, loadIsAsleepFromStorage} from '../../components/sleepScheduleStorage';

describe("Pet Sleep Schedule Storage", () => {

    describe("Sleep Flag", () => {
        beforeEach(() => {
            AsyncStorage.getItem.mockClear();
            AsyncStorage.setItem.mockClear();
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it("loads the sleep flag from storage successfully returns default", async () => {
            const value = await loadSleep();
            expect(AsyncStorage.getItem).toBeCalledWith('sleep');
            expect(value).toBe('false');
        });

        it("loads the sleep flag from storage successfully returns real value", async () => {
            AsyncStorage.getItem.mockResolvedValueOnce('true');
            const value = await loadSleep();
            expect(AsyncStorage.getItem).toBeCalledWith('sleep');
            expect(value).toBe('true');
        });

        it("loads the sleep flag from storage throws error returns default", async () => {
            AsyncStorage.getItem.mockImplementation(() => {
                throw new Error();
            });
            const value = await loadSleep();
            expect(AsyncStorage.getItem).toBeCalledWith('sleep');
            expect(value).toBe('false');
        });

        it('Saves the sleep flag to storage successfully true value', async () => {
            await saveSleep(true);
            expect(AsyncStorage.setItem).toBeCalledWith('sleep', 'true');
        });

        it('Saves the sleep flag to storage successfully false value', async () => {
            await saveSleep(false);
            expect(AsyncStorage.setItem).toBeCalledWith('sleep', 'false');
        });

        it('Saves the sleep flag to storage throws invalid value', async () => {
            await saveSleep("dummy");
            expect(AsyncStorage.setItem).not.toBeCalled();
        });

        it('Saves the sleep flag to storage throws error', async () => {
            AsyncStorage.setItem.mockImplementation(() => {
                throw new Error();
            });
            await saveSleep(false);
            expect(AsyncStorage.setItem).toBeCalledWith('sleep', 'false');
        });
    });

    describe("Sleep Time", () => {
        beforeEach(() => {
            AsyncStorage.getItem.mockClear();
            AsyncStorage.setItem.mockClear();
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('Loads the sleep time from storage successfully returns default', async () => {
            const value = await loadSleepTime();
            expect(AsyncStorage.getItem).toBeCalledWith('sleepTime');
            expect(value).toBe('23:00');
        });

        it("loads the sleep time from storage successfully returns real value", async () => {
            AsyncStorage.getItem.mockResolvedValueOnce('20:30');
            const value = await loadSleepTime();
            expect(AsyncStorage.getItem).toBeCalledWith('sleepTime');
            expect(value).toBe('20:30');
        });

        it("loads the sleep time from storage throws error returns default", async () => {
            AsyncStorage.getItem.mockImplementation(() => {
                throw new Error();
            });
            const value = await loadSleepTime();
            expect(AsyncStorage.getItem).toBeCalledWith('sleepTime');
            expect(value).toBe('23:00');
        });

        it('Saves the sleep time to storage successfully value', async () => {
            await saveSleepTime('22:30');
            expect(AsyncStorage.setItem).toBeCalledWith('sleepTime', '22:30');
        });

        it('Saves the sleep time to storage throws invalid value', async () => {
            await saveSleepTime(1440);
            expect(AsyncStorage.setItem).not.toBeCalled();
        });

        it('Saves the sleep time to storage throws error', async () => {
            AsyncStorage.setItem.mockImplementation(() => {
                throw new Error();
            });
            await saveSleepTime('20:10');
            expect(AsyncStorage.setItem).toBeCalledWith('sleepTime', '20:10');
        });
    });

    describe("loadIsAsleepFromStorage", () => {
        beforeEach(() => {
            AsyncStorage.getItem.mockClear();
            AsyncStorage.setItem.mockClear();
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('Loads the sleep flag from storage successfully true value', async () => {
            AsyncStorage.getItem.mockResolvedValueOnce('true');
            const setter = jest.fn();
            await loadIsAsleepFromStorage(setter);
            expect(AsyncStorage.getItem).toBeCalledWith('sleep');
            expect(setter).toBeCalledWith(true);
        });

        it('Loads the sleep flag from storage successfully false value', async () => {
            AsyncStorage.getItem.mockResolvedValueOnce('false');
            const setter = jest.fn();
            await loadIsAsleepFromStorage(setter);
            expect(AsyncStorage.getItem).toBeCalledWith('sleep');
            expect(setter).toBeCalledWith(false);
        });

        it('Loads the sleep flag from storage throws error', async () => {
            AsyncStorage.getItem.mockImplementation(() => {
                throw new Error();
            });
            const setter = jest.fn();
            await loadIsAsleepFromStorage(setter);
            expect(AsyncStorage.getItem).toBeCalledWith('sleep');
            expect(setter).toBeCalled();
        });
    });


});