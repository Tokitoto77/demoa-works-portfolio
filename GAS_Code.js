// ==================================================
// 設定エリア（ここだけ変更してください）
// ==================================================
var spreadsheetId = 'ここにスプレッドシートIDを貼る';
var calendarId = 'ここにカレンダーIDを貼る';
// ==================================================

function doGet(e) {
    // スケジュール取得APIとして機能
    if (e.parameter.action == 'reserve') {
        return handleReservation(e);
    } else {
        return getSchedule(e);
    }
}

function doPost(e) {
    // フォームからの送信を受け取る
    return handleReservation(e);
}

// --------------------------------------------------
// スケジュール取得機能
// --------------------------------------------------
function getSchedule(e) {
    var cal = CalendarApp.getCalendarById(calendarId);
    var now = new Date();
    // 今日から2週間分取得
    var endTime = new Date();
    endTime.setDate(now.getDate() + 14);

    var events = cal.getEvents(now, endTime);
    var result = [];

    var weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (var i = 0; i < events.length; i++) {
        var evt = events[i];
        var title = evt.getTitle();
        var startTime = evt.getStartTime();
        var endTime = evt.getEndTime();

        // ステータス判定
        var status = '◎';
        var simpleTitle = title;

        // タイトルから【満】【残x】などを抽出
        if (title.match(/[【\[]満[】\]]/)) {
            status = '×';
            simpleTitle = title.replace(/[【\[]満[】\]]/g, '').trim();
        } else if (title.match(/[【\[]残\d+[】\]]/)) {
            status = '△';
            simpleTitle = title.replace(/[【\[]残\d+[】\]]/g, '').trim();
        }

        // 時間フォーマット (HH:mm)
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
            type: simpleTitle, // 色分け用にタイトルをそのままtypeとしても使う
            status: status
        });
    }

    // JSONを返す
    var output = ContentService.createTextOutput(JSON.stringify(result));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
}

// --------------------------------------------------
// 予約受付機能
// --------------------------------------------------
function handleReservation(e) {
    var ss = SpreadsheetApp.openById(spreadsheetId);
    var sheet = ss.getSheets()[0]; // 1枚目のシートを使う

    // パラメータ取得
    var p = e.parameter;
    var name = p.name;
    var email = p.email;
    var date = p.date;
    var time = p.time;
    var menu = p.menu;

    // スプレッドシートに保存
    sheet.appendRow([new Date(), name, email, date, time, menu]);

    // 自動返信メール送信
    var subject = "【CORE SHAPE PILATES】ご予約ありがとうございます";
    var body = name + " 様\n\n"
        + "体験レッスンのご予約ありがとうございます。\n"
        + "以下の内容で承りました。\n\n"
        + "■予約日時: " + date + " " + time + "\n"
        + "■コース: " + menu + "\n\n"
        + "当日は5分前までにお越しください。\n"
        + "お待ちしております。\n\n"
        + "CORE SHAPE PILATES";

    MailApp.sendEmail(email, subject, body);

    // 完了メッセージを返す
    var result = { result: 'success' };
    var output = ContentService.createTextOutput(JSON.stringify(result));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
}

function testAuth() {
    console.log("認証テスト完了");
}
