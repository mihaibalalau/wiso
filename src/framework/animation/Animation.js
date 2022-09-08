

const WisoAnimation = (callback, config = {}) => {
    let fps = config.fps ?? 60;
    let pause = false;
    let currentFrame = 1;
    let maxFrame = 0;
    let totalTime = 0;
    let time = 0;
    let lastTimestamp = 0;
    let reverse = false;

    let interval;


    return {
        play() {
            this.pause();
            
            lastTimestamp = Date.now();
            time = 0;
            currentFrame = 0;

            interval = setInterval(() => {

                callback.call(this, this);

                currentFrame += 1;
                time += lastTimestamp - Date.now();
                lastTimestamp = Date.now();

            }, Math.round(1000 / fps));
        },
        currentFrame() {
            return currentFrame
        },
        reverse() {
            reverse = !reverse;
        },
        pause() {
            clearInterval(interval);
        },
        resume() {
            pause = false
        },
        reset() {
            lastTimestamp = Date.now();
            time = 0;
            this.setCurrentFrame(1);
        },
        time() {
            return time
        },
        totalTime() {
            return totalTime
        },
        setTotalTime(value) {
            totalTime = value;
        },
        stop() {
            clearInterval(interval);
            currentFrame = 1;
        },
        setFps(value) {
            fps = value;
        },
        setCurrentFrame(frame) {
            currentFrame = frame;
        }
    };
}

export default WisoAnimation;
