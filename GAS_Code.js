// ==================================================
// 設定エリア
// ==================================================
var spreadsheetId = '1ulngUkF1HaUb_OnAPC11BhYj2WWkMcD_Jj0CZL5jpIg';
var calendarId = 'f67c332598f23cf3240d6c57fed1846620ad05481f069c81fed6e29b2df8a5f4@group.calendar.google.com';
// ==================================================

function doGet(e) {
    try {
        if (e && e.parameter && e.parameter.action == 'reserve') {
            return handleReservation(e);
        } else {
            return getSchedule(e);
        }
    } catch (err) {
        return createErrorResponse("System Error in doGet: " + err.toString());
    }
}

function doPost(e) {
    try {
        return handleReservation(e);
    } catch (err) {
        return createErrorResponse("System Error in doPost: " + err.toString());
    }
}

// --------------------------------------------------
// スケジュール取得機能
// --------------------------------------------------
function getSchedule(e) {
    var cal;
    try {
        cal = CalendarApp.getCalendarById(calendarId);
    } catch (err) {
        console.log("Calendar ID Error: " + err);
    }

    if (!cal) {
        console.log("Calendar not found. ID: " + calendarId);
        var dummy = [{
            date: "1/1 (Err)", weekDay: "-", startTime: "00:00", endTime: "00:00",
            title: "カレンダー設定エラー", type: "Basic", status: "×"
        }];
        return createJSONOutput(dummy);
    }

    var now = new Date();
    var endTime = new Date();
    endTime.setDate(now.getDate() + 14);

    var events = [];
    try {
        events = cal.getEvents(now, endTime);
    } catch (err) {
        console.log("getEvents Error: " + err);
        return createJSONOutput([{
            date: "Error", weekDay: "-", startTime: "--:--", endTime: "--:--",
            title: "カレンダーアクセス権限エラー", type: "Basic", status: "×"
        }]);
    }

    var result = [];
    var weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (var i = 0; i < events.length; i++) {
        var evt = events[i];
        var title = evt.getTitle();
        var startTime = evt.getStartTime();
        var endTime = evt.getEndTime();

        var status = '◎';
        var simpleTitle = title;

        if (title.match(/[【\[]満[】\]]/)) {
            status = '×';
            simpleTitle = title.replace(/[【\[]満[】\]]/g, '').trim();
        } else if (title.match(/[【\[]残\d+[】\]]/)) {
            status = '△';
            simpleTitle = title.replace(/[【\[]残\d+[】\]]/g, '').trim();
        }

        var startStr = Utilities.formatDate(startTime, Session.getScriptTimeZone(), 'H:mm');
        var endStr = Utilities.formatDate(endTime, Session.getScriptTimeZone(), 'H:mm');
        var dateStr = Utilities.formatDate(startTime, Session.getScriptTimeZone(), 'M/d');
        var weekStr = weekDays[startTime.getDay()];

        result.push({
            date: dateStr,
            weekDay: weekStr,
            startTime: startStr,
            endTime: endStr,
            title: simpleTitle,
            type: simpleTitle,
            status: status
        });
    }

    return createJSONOutput(result);
}

// --------------------------------------------------
// 予約受付機能
// --------------------------------------------------
function handleReservation(e) {
    var data = {};

    try {
        if (e.postData && e.postData.contents) {
            data = JSON.parse(e.postData.contents);
        } else if (e.parameter) {
            data = e.parameter;
        }
    } catch (err) {
        if (e && e.parameter) data = e.parameter;
    }

    if (!data || Object.keys(data).length === 0) {
        return createJSONOutput({ result: 'error', message: 'No data' });
    }

    var ss = SpreadsheetApp.openById(spreadsheetId);
    var sheet = ss.getSheets()[0];

    var name = (data.last_name || '') + ' ' + (data.first_name || '');
    var email = data.email || '';
    var phone = data.phone || '';
    var course = data.course || '';
    var dateTimeStr = data.date_time || "";
    var message = data.message || "";

    var datePart = "";
    var timePart = "";
    var match = dateTimeStr.match(/(\d{4}\/\d{1,2}\/\d{1,2})\s+(\d{1,2}:\d{2})/);
    if (match) {
        datePart = match[1];
        timePart = match[2];
    } else {
        datePart = dateTimeStr;
    }

    sheet.appendRow([new Date(), name, email, phone, dateTimeStr, course, message]);

    if (email) {
        var subject = "【CORE SHAPE PILATES】体験レッスンのご予約ありがとうございます";
        var body = name + " 様\n\n"
            + "CORE SHAPE PILATES へご予約いただき、誠にありがとうございます。\n"
            + "以下の内容で体験レッスンのご予約を承りました。\n\n"
            + "━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
            + "■ご予約内容\n"
            + "━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
            + "・日時: " + dateTimeStr + "\n"
            + "・コース: " + course + "\n"
            + "・料金: 2,000円（当日お支払い）\n\n"
            + "━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
            + "■当日のご案内\n"
            + "━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
            + "・開始時間の5分前までにお越しください。\n"
            + "・動きやすい服装、水分補給用のお飲み物、タオルをご持参ください。\n"
            + "・更衣室をご利用いただけます。\n\n"
            + "ご不明な点がございましたら、お気軽にお問い合わせください。\n"
            + "当日お会いできるのを楽しみにしております。\n\n"
            + "--------------------------------------------------\n"
            + "CORE SHAPE PILATES\n"
            + "〒150-0043 東京都渋谷区道玄坂1-2-3\n"
            + "Email: example@email.com\n"
            + "--------------------------------------------------";
        try {
            MailApp.sendEmail(email, subject, body);
        } catch (e) {
            console.log("Mail Error: " + e);
        }
    }

    if (datePart && timePart) {
        var simpleDate = datePart.split('/').slice(1).join('/');
        try {
            updateCalendarCapacity(simpleDate, timePart, course);
        } catch (err) {
            console.log("Calendar Update Error: " + err);
        }
    }

    return createJSONOutput({ result: 'success' });
}

function updateCalendarCapacity(dateStr, timeStr, menuName) {
    var cal = CalendarApp.getCalendarById(calendarId);
    if (!cal) return;

    var now = new Date();
    var year = now.getFullYear();
    var month = parseInt(dateStr.split('/')[0]) - 1;
    var day = parseInt(dateStr.split('/')[1]);
    var hour = parseInt(timeStr.split(':')[0]);
    var minute = parseInt(timeStr.split(':')[1]);

    var startTime = new Date(year, month, day, hour, minute);
    var endTime = new Date(startTime.getTime() + (60 * 60 * 1000));

    var events = cal.getEvents(startTime, endTime);

    for (var i = 0; i < events.length; i++) {
        var evt = events[i];
        var title = evt.getTitle();
        var newTitle = title;
        var match = title.match(/[【\[]残(\d+)[】\]]/);
        if (match) {
            var currentCount = parseInt(match[1]);
            var nextCount = currentCount - 1;
            if (nextCount <= 0) {
                newTitle = title.replace(match[0], '【満】');
            } else {
                newTitle = title.replace(match[0], '【残' + nextCount + '】');
            }
            evt.setTitle(newTitle);
            break;
        }
    }
}

function createJSONOutput(obj) {
    var output = ContentService.createTextOutput(JSON.stringify(obj));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
}

function createErrorResponse(msg) {
    return createJSONOutput({ result: 'error', message: msg });
}
