interface JalaliDate {
    g_days_in_month: number[];
    j_days_in_month: number[];
    jalaliToGregorian(j_y: number, j_m: number, j_d: number): [number, number, number];
}

const JalaliDate: JalaliDate = {
    g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29],
    jalaliToGregorian: function (j_y: number, j_m: number, j_d: number): [number, number, number] {
        j_y = parseInt(String(j_y));
        j_m = parseInt(String(j_m));
        j_d = parseInt(String(j_d));
        var jy = j_y - 979;
        var jm = j_m - 1;
        var jd = j_d - 1;

        var j_day_no = 365 * jy + parseInt(String(jy / 33)) * 8 + parseInt(String((jy % 33 + 3) / 4));
        for (var i = 0; i < jm; ++i) j_day_no += JalaliDate.j_days_in_month[i];

        j_day_no += jd;

        var g_day_no = j_day_no + 79;

        var gy = 1600 + 400 * parseInt(String(g_day_no / 146097)); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
        g_day_no = g_day_no % 146097;

        var leap = true;
        if (g_day_no >= 36525) /* 36525 = 365*100 + 100/4 */ {
            g_day_no--;
            gy += 100 * parseInt(String(g_day_no / 36524)); /* 36524 = 365*100 + 100/4 - 100/100 */
            g_day_no = g_day_no % 36524;

            if (g_day_no >= 365) g_day_no++;
            else leap = false;
        }

        gy += 4 * parseInt(String(g_day_no / 1461)); /* 1461 = 365*4 + 4/4 */
        g_day_no %= 1461;

        if (g_day_no >= 366) {
            leap = false;

            g_day_no--;
            gy += parseInt(String(g_day_no / 365));
            g_day_no = g_day_no % 365;
        }

        for (var i = 0; g_day_no >= JalaliDate.g_days_in_month[i] + (i == 1 && leap ? 1 : 0); i++)
            g_day_no -= JalaliDate.g_days_in_month[i] + (i == 1 && leap ? 1 : 0);
        var gm = i + 1;
        var gd = g_day_no + 1;       

        return [gy, gm, gd];
    },
};

export default JalaliDate;