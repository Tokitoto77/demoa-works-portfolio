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

    // Googleカレンダーの定員数を更新（残数を減らす）
    updateCalendarCapacity(date, time, menu);

    // 完了メッセージを返す
    var result = { result: 'success' };
    var output = ContentService.createTextOutput(JSON.stringify(result));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
}

// --------------------------------------------------
// カレンダー更新機能（残席管理）
// --------------------------------------------------
function updateCalendarCapacity(dateStr, timeStr, menuName) {
    var cal = CalendarApp.getCalendarById(calendarId);

    // 日時をDateオブジェクトに変換（開始時間を特定）
    // dateStr: "2024-01-15", timeStr: "10:00" 想定
    // ※予約フォームから来るフォーマットに合わせる必要があります
    // ここでは "1/15" 形式で来ると仮定して処理（年は現在年）

    var now = new Date();
    var year = now.getFullYear();
    var month = parseInt(dateStr.split('/')[0]) - 1;
    var day = parseInt(dateStr.split('/')[1]);

    var hour = parseInt(timeStr.split(':')[0]);
    var minute = parseInt(timeStr.split(':')[1]);

    var startTime = new Date(year, month, day, hour, minute);
    var endTime = new Date(startTime.getTime() + (60 * 60 * 1000)); // 1時間後まで検索

    // イベント検索
    var events = cal.getEvents(startTime, endTime);

    for (var i = 0; i < events.length; i++) {
        var evt = events[i];
        var title = evt.getTitle();

        // メニュー名が含まれているか確認
        // （完全一致でなくても、同じ時間帯のイベントなら対象とする簡易ロジック）

        var newTitle = title;

        // 【残x】を探す
        var match = title.match(/[【\[]残(\d+)[】\]]/);
        if (match) {
            var currentCount = parseInt(match[1]);
            var nextCount = currentCount - 1;

            if (nextCount <= 0) {
                // 0になったら満席にする
                newTitle = title.replace(match[0], '【満】');
            } else {
                // 数を減らす
                newTitle = title.replace(match[0], '【残' + nextCount + '】');
            }

            evt.setTitle(newTitle); // カレンダー更新
            break; // 1つ更新したら終了
        }
    }
}

function testAuth() {
    console.log("認証テスト完了");
}
