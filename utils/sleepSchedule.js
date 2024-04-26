const isPetAsleep = (time) => {
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours);
    minutes = parseInt(minutes);

    if (Number.isNaN(hours) || hours < 0 || hours > 23 || Number.isNaN(minutes) || minutes < 0 || minutes > 59) {
        throw new Error('Invalid time');
    }

    const sleepTime = new Date();
    sleepTime.setHours(hours);
    sleepTime.setMinutes(minutes);
    sleepTime.setSeconds(0);
    
    const wakeUpTime = new Date(sleepTime.getTime() + 8 * 60 * 60 * 1000); // 8 hours in milliseconds
    
    const currentTime = new Date();
    
    if (currentTime >= sleepTime && currentTime < wakeUpTime) {
        return true;
    }

    sleepTime.setDate(sleepTime.getDate() - 1);
    wakeUpTime.setDate(wakeUpTime.getDate() - 1);

    return currentTime >= sleepTime && currentTime < wakeUpTime;
};

export { isPetAsleep };