var second = 1000;
var minute = 6 * second;

var sound = document.createElement("audio");
    sound.src = "sound.mp3";
    console.log(sound);

var stopSound = document.createElement("audio");
    stopSound.src = "stop.mp3";
    stopSound.volume = 0.2;
    console.log(stopSound);

function update() {

    sound.play();
    chrono.clocktime += 1;
    //console.log("///// TICK ///// ----- One second Elapsed . Time Elapsed = " + chrono.timeElapsed_real());
    //console.log("timeInterval current angle : " + thinAngle);
    displayTime();
}

var arrowStep = Math.PI / 60;
var timeInterval;


var chrono = {

    "isPlaying" : false,
    "isPaused" : false,

    "started" : 0,
    // "timeElapsed" : 0,
    
    "timeBeforePause" : 0,

    "clocktime" : 0,

    play : function () {
        // displayTime(this.timeElapsed_real());
        if (this.isPaused == true) {
            // this.started = Date.now();              
            this.started = Date.now() - this.timeBeforePause;
        } else {
            this.started = Date.now();
        }
        this.isPlaying = true;
        this.isPaused = false;

        clearInterval(timeInterval);   
        timeInterval = setInterval("update()", second);
    },

    stop : function () {
        displayTime(this.timeElapsed_real());
        this.isPlaying = false;
        this.isPaused = false;
        this.started = 0;
        this.timeBeforePause = 0;

        stopSound.play();        
        chrono.clocktime = 0;
        clearInterval(timeInterval);  
    },

    pause : function () {
        displayTime(this.timeElapsed_real());
        this.timeBeforePause = this.timeElapsed_real();
        
        this.isPlaying = false;
        this.isPaused = true;

        clearInterval(timeInterval);    
    },

    timeElapsed_real : function () {
        var now = Date.now();
        var timeElapsed;
        
        if (this.isPaused == true) {
            timeElapsed = this.timeBeforePause;
            return this.timeBeforePause;                  
        } else if (this.isPlaying == true) {
            timeElapsed = now - this.started;
            return timeElapsed;
        } else {
            timeElapsed = 0;
            return timeElapsed;
        }
    
        // console.log("timeElapsed : " + timeElapsed);
    }
};

function displayTime() {

    var realtime = chrono.timeElapsed_real();
    document.getElementById("realtime-container").innerHTML = realtime / second;
    document.getElementById("clocktime-container").innerHTML = chrono.clocktime;
} 