(function() {
    (window.jQuery && init()) || loadScript("https://code.jquery.com/jquery-2.1.4.min.js", init);

    function loadScript(url, callback) {

        var script = document.createElement("script")
        script.type = "text/javascript";

        if (script.readyState) { //IE
            script.onreadystatechange = function() {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else { //Others
            script.onload = function() {
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    function init() {
        var $ = window.jQuery;

        var settings = {},
            root = 'https://keyreply.com/',
            script = $('#keyreply-script'),
            salt = '\x26\x63\x69\x64\x3D' + Math.round(2147483647 * Math.random()),
            kga = "aHR0cHM6Ly9zc2wuZ29vZ2xlLWFuYWx5dGljcy5jb20vY29sbGVjdD92PTEmdGlkPVVBLTU1OTEzMzY2LTEzJnQ9cGFnZXZpZXcmZGw9";
            site = window.location.host,
            cipher = script.data('apps'),
            colors = {
                skype: '#00AFF0',
                whatsapp: '#30BE2D',
                email: '#2D70E7',
                sms: '#0AD02C',
                phone: '#0AD02C',
                facetime: '#0DD12F',
                telegram: '#2DA5E1',
                facebook: '#0084FF',
                kakao: '#FBDE24',
                line: '#3ACE01',
                snapchat: '#FFFC00',
                wechat: '#1ECE29'
            };

        settings.color = script.data('color');
        settings.tags = [atob(kga), site, salt].join('');
        settings.apps = JSON.parse(decodeURI(atob(cipher)));

        $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', root + '/chat/widget.css') );

        var anchor = $('<div>')
            .attr('id', 'keyreply-container')
            .appendTo($('body'));

        var launcher = $('<div>')
            .addClass('keyreply-launcher')
            .css('background-image', 'url("data:image/svg+xml;charset=utf8,%3Csvg width=\'26\' height=\'26\' viewBox=\'0 0 26 26\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cellipse fill=\'' + escape(settings.color) + '\' cx=\'13\' cy=\'13\' rx=\'12\' ry=\'12\'/%3E%3Cpath d=\'M6.798 15.503l1.453-.92c.617.215 1.29.334 2 .334 2.898 0 5.247-1.996 5.247-4.46 0-2.46-2.35-4.457-5.248-4.457C7.35 6 5 7.996 5 10.458c0 1.446.81 2.73 2.065 3.545l-.503 1.273c-.038.03-.062.076-.062.127 0 .09.074.162.166.162.054 0 .1-.024.132-.062z\' stroke=\'' + escape(settings.color) + '\' stroke-width=\'.2\' fill=\'%23FFF\'/%3E%3Cpath d=\'M20.297 18.97l.04-.065-.578-1.155c1.066-.814 1.737-1.993 1.737-3.305 0-2.455-2.35-4.445-5.248-4.445-2.9 0-5.25 1.99-5.25 4.445s2.35 4.445 5.25 4.445c.838 0 1.63-.167 2.334-.463l1.39.756c.035.05.095.085.163.085.107 0 .194-.085.194-.19 0-.04-.012-.076-.033-.107z\' stroke=\'' + escape(settings.color) + '\' stroke-width=\'.2\' fill=\'%23FFF\'/%3E%3C/g%3E%3C/svg%3E")')
            .css('background-size', 'contain')
            .css('z-index', '100000')
            .appendTo(anchor);

        // .append($('<img>').attr('src', settings.tags))

        var ua = navigator.userAgent;
        var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
        var Android = !!ua.match(/Android/i)
        var Mobile = !!ua.match(/Mobi/i)
        var Mac = !!ua.match(/Macintosh/i)

        $.each(settings.apps, function(key, value) {
            if (Mobile || (key != 'sms' && key != 'kakao' && key != 'skype')) {
                $('<div>')
                    .addClass('keyreply-chat-icon')
                    .attr('data-type', key)
                    .css('background-color', colors[key])
                    .append(
                        $('<img>')
                        .attr('src', root + 'chat/images/apps/' + key + '.svg')
                        .attr('alt', key)
                    )
                    .append($('<div class="keyreply-label">').text(key.charAt(0).toUpperCase() + key.slice(1)).css('color', 'white'))
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
            var container = $('<div>').addClass('keyreply-qr');

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
                    link = "tg://resolve?domain=" + settings.apps.telegram.replace('@', '');
                    break;

                case 'skype':
                    if (Mobile) {
                        link = "skype://" + settings.apps.skype + "?chat";
                    } else {
                        container.text("Skype username: " + settings.apps.skype).css('color', 'white')
                        $('<br/><a href="skype://">Launch Skype</a>').appendTo(container);
                        qr = true;
                    }
                    break;

                case 'facebook':
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

                case 'whatsapp':
                    container.text("Whatsapp number: " + settings.apps.whatsapp).css('color', 'white');
                    $('<a href="whatsapp://send">Open Whatsapp</a>').appendTo(container);
                    qr = true;
                    break;

                case 'wechat':
                    container.css('background-image', 'url("' + settings.apps.wechat + '")');
                    qr = true;
                    break;
                case 'line':
                    container.css('background-image', 'url("' + settings.apps.line + '")');
                    qr = true;
                    break;
                case 'snapchat':
                    container.css('background-image', 'url("' + settings.apps.snapchat + '")');
                    qr = true;
                    break;
                default:
                    break;
            }

            if (qr) {
                app.append(container);
            }

            app.click(function() {
                if (qr) {
                    if (app.is('.keyreply-panel')) {
                        app.removeClass('keyreply-panel');
                    } else {
                        app.siblings().removeClass('keyreply-panel');
                        app.addClass('keyreply-panel');
                    }
                }

                if (link) {
                    app.siblings().removeClass('keyreply-panel');

                    if (Mobile) {
                        $('<a>').attr('href', link).appendTo(anchor)[0].click();
                    } else {
                        $('<a>').attr('target', '_blank').attr('href', link).appendTo(anchor)[0].click();
                    }
                }
            });
        });
        
        window.initializeKeyreply = init;
        return true;
    };
})();