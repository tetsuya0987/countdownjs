$(document).ready(function () {
    var obj;
    obj = new _CountDown();
    obj.init();
});
// クラス定義（コンストラクタ）
var _CountDown = function (op) {
    this.timerTargetDay = 1485961200; //unixTimeで表記
    this.date = "";
    this.unixTimestamp = "";
    this.timerId = "";
    this.lastDate = "";
    this.dhms = [];
    this.dayTime = 86400;
    this.path = "";
};
// メソッド定義
_CountDown.prototype = {
    init: function () {
        var self;
        self = this;
        self.timerInit();

        //動かすときは消す
        $('.target').text(self.timerTargetDay);
    },
    timerInit: function () {
        var self, unixTimestamp;
        self = this;
        self.date = new Date();
        self.startTimerWork();
        self.upDateTimer();
    },
    startTimerWork: function () {
        var self;
        self = this;
        self.timerId = setInterval(function () {
            self.upDateTimer();
        }, 1000);
    },
    upDateTimer: function () {
        var self;
        self = this;
        // 現在のUNIX時間を取得する (秒単位)
        self.date = new Date();
        self.unixTimestamp = Math.floor(self.date.getTime() / 1000);
        self.lastDate = self.timerTargetDay - self.unixTimestamp;
        self.sepalateTime(self.lastDate);
    },
    sepalateTime: function (t) {
        var self;
        self = this;
        if (t < 0) {
            //カウントダウンが0を過ぎたら画像に差し替え
            self.zeroCount();
            return false;
        }
        self.dhms[0] = self.dateCal(t);
        self.dhms[1] = self.hoursCal(t);
        self.dhms[2] = self.minCal(t);
        self.dhms[3] = self.secCal(t);
        //console.log(self.dhms[0]+"日"+self.dhms[1]+"時間"+self.dhms[2]+"分"+self.dhms[3]+"秒");
        $('.day').text(self.dhms[0]);
        $('.hours').text(self.dhms[1]);
        $('.minute').text(self.dhms[2]);
        $('.seconds').text(self.dhms[3]);
    },
    dateCal: function (t) {
        var self, d;
        self = this;
        d = t / self.dayTime;
        d = Math.floor(d);
        if (d < 10) {
            d = "0" + d;
        }
        return d;
    },
    hoursCal: function (t) {
        var self, h;
        self = this;
        h = t % self.dayTime;
        h = h / 3600;
        h = Math.floor(h);
        if (h < 10) {
            h = "0" + h;
        }
        return h;
    },
    minCal: function (t) {
        var self, m;
        self = this;
        m = t % self.dayTime;
        m = m % 3600;
        m = m / 60;
        m = Math.floor(m);
        if (m < 10) {
            m = "0" + m;
        }
        return m;
    },
    secCal: function (t) {
        var self, s;
        self = this;
        s = t % self.dayTime;
        s = s % 3600;
        s = s % 60;
        if (s < 10) {
            s = "0" + s;
        }
        return s;
    },
    zeroCount: function () {
        var self, s, path;
        self = this;
        path = self.pathSet();
        clearInterval(self.timerId);
        $('countdown').remove();
        $('.text').append('ENDED')
    }
};
