window.jQuery || document.write('<script src="https://code.jquery.com/jquery-2.1.4.min.js"><\/script>');
window.onload = function() {
    var settings = {},
        root = 'https://keyreply.com/',
        script = $('#keyreply-script'),
        cipher = script.data('apps');
    settings.color = script.data('color');
    settings.apps = JSON.parse(decodeURI(atob(cipher)));
    $('<style>')
        .text(".keyreply-panel,.keyreply-launcher,.keyreply-chat-icon{bottom:20px;position:fixed;box-shadow:rgba(0,0,0,.2) 0 5px 10px 0;z-index:10000}.keyreply-launcher,.keyreply-chat-icon{height:50px;width:50px;right:16px;border-radius:25px}.keyreply-chat-icon,.keyreply-panel{display:none;opacity:0}.keyreply-panel{width:300px;padding:3px;border-radius:3px}")
        .appendTo($('head'))

    var anchor = $('<div>')
        .attr('id', 'keyreply-container')
        .appendTo($('body'));

    var launcher = $('<div>')
        .addClass('keyreply-launcher')
        .css('background-image', 'url("' + root + 'chat/images/apps/launcher.svg")')
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
                    .css('max-width', '100%')
                    .css('vertical-align', 'bottom')
                    .attr('src', settings.apps.wechat)
                break;
            case 'snapchat':
                qr = $('<img>')
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
                panel.append(qr)
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
