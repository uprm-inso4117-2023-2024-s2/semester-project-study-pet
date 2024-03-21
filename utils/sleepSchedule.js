const isPetAsleep = (time) => {
    const [hours, minutes] = time.trim().split(':');

    if (!hours || !minutes || hours.length !== 2 || minutes.length !== 2) {
        throw new Error('Invalid time format. Please enter in hh:mm format.');
    }

    const sleepTime = new Date();
    sleepTime.setHours(parseInt(hours));
    sleepTime.setMinutes(parseInt(minutes));
    sleepTime.setSeconds(0);
    
    const currentTime = new Date();

    const wakeUpTime = new Date(sleepTime.getTime() + 8 * 60 * 60 * 1000); // 8 hours in milliseconds
    
    return currentTime >= sleepTime && currentTime < wakeUpTime;
};

export { isPetAsleep };