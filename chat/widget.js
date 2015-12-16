window.jQuery || document.write('<script src="https://code.jquery.com/jquery-2.1.4.min.js"><\/script>');
window.onload = function() {
    var settings = {},
        root = 'https://keyreply.com/',
        script = $('#keyreply-script'),
        cipher = script.data('apps');
    settings.color = script.data('color');
    settings.apps = JSON.parse(decodeURI(atob(cipher)));
    $('<style>')
        .text("#keyreply-launcher-button,.keyreply-chat-icon{position:fixed;height:50px;width:50px;right:16px;opacity:0;box-shadow:rgba(0,0,0,.2) 0 5px 10px 0;border-radius:25px;display:none}#keyreply-launcher-button{display:block!important;opacity:1!important}")
        .appendTo($('head'))

    var anchor = $('<div>').appendTo($('body'));
    var launcher = $('<img>')
        .attr('id', 'keyreply-launcher-button')
        .attr('src', root + 'chat/images/launcher/' + settings.color + '.png')
        .css('bottom', '20px')
        .css('z-index', '1')
        .appendTo(anchor);

    var ua = navigator.userAgent;
    var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
    var Android = !!ua.match(/Android/i)
    var Mobile = !!ua.match(/Mobi/i)
    var Mac = !!ua.match(/Macintosh/i)

    $.each(settings.apps, function(key, value) {
        if (Mobile || key == 'email' || key == 'phone' || key == 'telegram' || key == 'facebook') {
            $('<img>')
                .addClass('keyreply-chat-icon')
                .attr('src', root + 'chat/images/apps/' + key + '.png')
                .attr('data-type', key)
                .css('bottom', '20px')
                .appendTo(anchor);
        }
    });

    launcher.click(function() {
        $('.keyreply-chat-icon').each(function(index, img) {
            img = $(img)
            if (img.is(':visible')) {
                img.animate({
                    'bottom': '16px',
                    'opacity': 0
                }, 'fast', function() {
                    img.hide();
                });
            } else {
                img.show().animate({
                    'bottom': (70 + index * 52) + 'px',
                    'opacity': 1
                }, 'fast');
            }
        })
    })


    $('.keyreply-chat-icon').each(function(index, icon) {
        var link, app = $(icon);

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
            case 'wechat':
                // link = settings.apps.wechat;
                // if (Android) {
                // link = "weixin://contacts/profile/" + settings.apps.wechat;
                // }
                break;
            case 'kakao': //official
                link = "http://goto.kakao.com/" + settings.apps.kakao;
                break;
            default:
                link = "mailto:" + settings.apps.email + "?subject=Support request";
                break;
        }

        app.click(function() {
            window.open(link);
        });
    });
};
