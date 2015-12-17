window.jQuery || document.write('<script src="https://code.jquery.com/jquery-2.1.4.min.js"><\/script>');
window.onload = function() {
    var settings = {},
        root = 'https://keyreply.com/',
        script = $('#keyreply-script'),
        cipher = script.data('apps');
    settings.color = script.data('color').replace('#', '%23');
    settings.apps = JSON.parse(decodeURI(atob(cipher)));
    $('<style>')
        .text(".keyreply-panel,.keyreply-launcher,.keyreply-chat-icon{bottom:20px;position:fixed;box-shadow:rgba(0,0,0,.2) 0 5px 10px 0;z-index:10000}.keyreply-launcher,.keyreply-chat-icon{height:50px;width:50px;right:16px;border-radius:25px}.keyreply-chat-icon,.keyreply-panel{display:none;opacity:0}.keyreply-panel{max-width:300px;padding:3px;border-radius:3px}")
        .appendTo($('head'))

    var anchor = $('<div>')
        .attr('id', 'keyreply-container')
        .appendTo($('body'));

    var launcher = $('<div>')
        .addClass('keyreply-launcher')
        .css('background-image', 'url("data:image/svg+xml;charset=utf8,%3Csvg width=\'26\' height=\'26\' viewBox=\'0 0 26 26\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cellipse fill=\'' + settings.color + '\' cx=\'13\' cy=\'13\' rx=\'12\' ry=\'12\'/%3E%3Cpath d=\'M6.798 15.503l1.453-.92c.617.215 1.29.334 2 .334 2.898 0 5.247-1.996 5.247-4.46 0-2.46-2.35-4.457-5.248-4.457C7.35 6 5 7.996 5 10.458c0 1.446.81 2.73 2.065 3.545l-.503 1.273c-.038.03-.062.076-.062.127 0 .09.074.162.166.162.054 0 .1-.024.132-.062z\' stroke=\'' + settings.color + '\' stroke-width=\'.2\' fill=\'%23FFF\'/%3E%3Cpath d=\'M20.297 18.97l.04-.065-.578-1.155c1.066-.814 1.737-1.993 1.737-3.305 0-2.455-2.35-4.445-5.248-4.445-2.9 0-5.25 1.99-5.25 4.445s2.35 4.445 5.25 4.445c.838 0 1.63-.167 2.334-.463l1.39.756c.035.05.095.085.163.085.107 0 .194-.085.194-.19 0-.04-.012-.076-.033-.107z\' stroke=\'' + settings.color + '\' stroke-width=\'.2\' fill=\'%23FFF\'/%3E%3C/g%3E%3C/svg%3E")')
        .css('background-size', 'contain')
        .css('z-index', '100000')
        .appendTo(anchor);

    var panel = $('<div>')
        .addClass('keyreply-panel')
        .appendTo(anchor)

    var ua = navigator.userAgent;
    var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
    var Android = !!ua.match(/Android/i)
    var Mobile = !!ua.match(/Mobi/i)
    var Mac = !!ua.match(/Macintosh/i)

    $.each(settings.apps, function(key, value) {
        if (Mobile || key != 'sms') {
            $('<img>')
                .addClass('keyreply-chat-icon')
                .attr('title', key.charAt(0).toUpperCase() + key.slice(1))
                .attr('alt', key)
                .attr('src', root + 'chat/images/apps/' + key + '.svg')
                .attr('data-type', key)
                .appendTo(anchor);
        }
    });

    launcher.click(function() {
        $('.keyreply-chat-icon').each(function(index, img) {
            img = $(img)
            if (img.is(':visible')) {
                img.animate({
                    'bottom': '20px',
                    'opacity': 0
                }, 'fast', function() {
                    img.hide();
                });

                panel.hide().css('right', '-300px');
            } else {
                img.show().animate({
                    'bottom': (70 + index * 52) + 'px',
                    'opacity': 1
                }, 'fast');
            }
        })
    })

    $('.keyreply-chat-icon').each(function(index, icon) {
        var link, qr, app = $(icon);

        switch (app.data('type')) {
            case 'email':
                link = "mailto:" + settings.apps.email + "?subject=Support request";
                break;
            case 'sms':
                link = "sms:" + settings.apps.sms;
                break;
            case 'phone':
                link = "tel:" + settings.apps.phone;
                break;
            case 'facetime':
                link = "facetime-audio:" + settings.apps.facetime;
                break;
            case 'telegram':
                link = "tg://resolve?domain=" + settings.apps.telegram;
                break;
            case 'facebook':
                // http://findmyfbid.com/
                if (iOS) {
                    link = "fb-messenger://user-thread/" + settings.apps.facebook;
                } else if (Android) {
                    link = "fb-messenger://user/" + settings.apps.facebook;
                } else if (!Mobile) {
                    link = "https://www.facebook.com/messages/" + settings.apps.facebook;
                }
                break;
            case 'kakao':
                link = "http://goto.kakao.com/" + settings.apps.kakao;
                break;
            case 'wechat':
                qr = $('<img>')
                    .css('float', 'right')
                    .css('max-width', '100%')
                    .css('vertical-align', 'bottom')
                    .attr('src', settings.apps.wechat)
                break;
            case 'line':
                qr = $('<img>')
                    .css('float', 'right')
                    .css('max-width', '100%')
                    .css('vertical-align', 'bottom')
                    .attr('src', settings.apps.line)
                break;
            case 'snapchat':
                qr = $('<img>')
                    .css('float', 'right')
                    .css('max-width', '100%')
                    .css('vertical-align', 'bottom')
                    .attr('src', settings.apps.snapchat)
                break;
            default:
                link = "mailto:" + settings.apps.email + "?subject=Support request";
                break;
        }

        app.click(function() {
            if (qr) {
                panel.empty().append(qr)
                    .show()
                    .animate({
                        'right': '75px',
                        'opacity': 1,
                    }, 'fast');
            }

            if (link) {
                panel.animate({
                    'right': '-300px',
                    'opacity': 0,
                }, 'fast').hide();

                $('<a>').attr('href', link)[0].click();
            }
        });
    });
};
