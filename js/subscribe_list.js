;
(function() {
    /*
        comment: 滚动加载下一页
        {node:节点}
    */
    function nextPage(obj) {
        obj = obj || {};
        this.node = obj.node || $('.info');
        this.isLoading = false;
        this.lastPage = false;
        this.currPageNum = 2;
        this.datalastTime;
        this.loadHtml = '';
        this.init();
    }
    nextPage.prototype = {
            init: function() {

                var _this = this;
                if (typeof(pageUrlFormat) == 'undefined')
                    return;
                if ($(".no_msg").length > 0 || window.innerHeight > document.body.clientHeight) return;

                if (!_this.node.length) return;
                var _this = this;
                if (!$("#infomore").length) {
                    _this.appendNode();
                }

                //初始化滚动
                $(window).scroll(function() {

                    if (_this.lastPage) return;

                    _this.scrollBottom();
                });

            },
            appendNode: function() {
                this.loadHtml = '<i class="upDragIcon"></i>上拉加载更多宝贝哦...';

                $("body").append('<div id="infomore">' + this.loadHtml + '</div>')
            },
            scrollBottom: function() {
                var _this = this;

                var scrollTop = $('body')[0].scrollTop;
                var scrollHeight = $('.info')[0].scrollHeight; //第一页列表的长度
                var fixDomHeight = $('.condition')[0].scrollHeight + $('.guide')[0].scrollHeight;
                var windowHeight = window.innerHeight;
                if (scrollTop + windowHeight - fixDomHeight >= scrollHeight && !_this.isLoading) {
                    _this.moreInfo();
                    $("#infomore").html(_this.loadHtml);
                    return;
                }
            },
            lastDataTime: function(pageData) {
                var pList = pageData.list;
                var pListlen = pageData.list.length;
                var lastInfo = pList[pListlen - 1];
                var lastInfoCld = lastInfo.infolist;
                var lastInfoCldLen = lastInfoCld.length;
                var datalastTimeObj = lastInfoCld[lastInfoCldLen - 1];

                return datalastTimeObj.createTime;
            },
            moreInfo: function() {

                var _this = this;
                var pageInfo = typeof _data !== 'undefined' ? _data : '',
                    conditionid = typeof conditionId !== 'undefined' ? conditionId : ''; //订阅条件ID
                _this.isLoading = true;

                if (_this.currPageNum == 2) {
                    _this.datalastTime = _this.lastDataTime(pageInfo);
                }
                var limoreurl = pageUrlFormat + '&conId=' + conditionid + '&page=' + _this.currPageNum + '&time=' + _this.datalastTime;

                $("#infomore").show();
                $.ajax({
                    url: limoreurl,
                    dataType: "json",
                    success: function(o) {
                        var jsonStr = JSON.stringify(o);
                        if (jsonStr !== '{}') {
                            _this.isLoading = false;
                            _this.datalastTime = _this.lastDataTime(o);

                            renderPage(o);
                            new lazyLoad($('.info-pic'));
                            _this.currPageNum++;
                            $("#infomore").hide();

                        } else {
                            $("#infomore").html("没有更多信息了");
                            _this.lastPage = true;
                        }
                    },
                    error: function(e) {
                        console.log("error");
                        _this.isLoading = false;
                        $("#infomore").html("请稍后再试");
                    }
                })
            },
            showPage: function(o) {
                    var _this = this;
                    var data = $(o).find("li");
                    if ($(o).find("li").length < 1) {
                        return false;
                    } else {
                        return data;
                    }
                }
                /*    toEnd: function(text) {
                        var endText = text || '已经到最后一页了';
                        $("#infomore").html(endText);
                    }*/
        }
    function lazyLoad(dom) {
        this.dom = dom;
        this.init()
    }
    lazyLoad.prototype = {
        init: function() {
            var _this = this;
            _this.showImg();
            $(window).on("resize", function(event) {
                _this.showImg()
            });
            $(window).on("scroll", function() {
                _this.showImg()
            })
        },
        inView: function(el) {
            var _this = this;
            var rect = $(el)[0].getBoundingClientRect();
            var winHeight = window.innerHeight || document.documentElement.clientHeight;
            return rect.top >= 0 && rect.bottom <= winHeight
        },
        isDeal: function(el) {
            return $(el).attr("src") === $(el).attr("data-src")
        },
        showImg: function() {
            var _this = this;
            var $img = _this.dom;
            for (var i = 0; i < $img.length; i++) {
                if (_this.inView($img[i]) && !_this.isDeal($img[i])) {
                    _this.setSrc($img[i])
                }
            }
        },
        setSrc: function(el) {
            var imgSrc = $(el).attr("data-src");
            if (imgSrc) {
                $(el).attr("src", imgSrc)
            }
        }
    };
        //回到顶部
    function goTop() {
        var btnWrap = $(".bottom-fixed");
        var btnGoTop = $(".gotop");
        var h = $(window).height();
        //底部置顶按钮 窗口滚动检测
        $(window).scroll(function() {
            $(window).scrollTop() > h ? btnWrap.show() : btnWrap.hide();
        });
        // 置顶按钮点击事件 页面滚动到顶部
        btnGoTop.on("click", function(event) {
            var timer = setInterval(function() {
                window.scrollBy(0, -100);
                //安卓4.0以下的手机滚动到顶部 $(window).scrollTop()=1
                if ($(window).scrollTop() <= 1) {
                    window.clearInterval(timer);
                }
            }, 2);
        });
    }
    //underscorejs template
    function underscore() {
        var util = {};

        util.tpl = (function() {
            var templateSettings = {
                evaluate: /<%([\s\S]+?)%>/g,
                interpolate: /<%=([\s\S]+?)%>/g,
                escape: /<%-([\s\S]+?)%>/g
            };
            var noMatch = /(.)^/;
            var escapes = {
                "'": "'",
                '\\': '\\',
                '\r': 'r',
                '\n': 'n',
                '\t': 't',
                '\u2028': 'u2028',
                '\u2029': 'u2029'
            };
            var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
            var template = function(text, data) {
                var render;
                var settings = templateSettings;
                var matcher = new RegExp([
                    (settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source
                ].join('|') + '|$', 'g');
                var index = 0;
                var source = "__p+='";
                text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
                    source += text.slice(index, offset)
                        .replace(escaper, function(match) {
                            return '\\' + escapes[match];
                        });

                    if (escape) {
                        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
                    }
                    if (interpolate) {
                        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
                    }
                    if (evaluate) {
                        source += "';\n" + evaluate + "\n__p+='";
                    }
                    index = offset + match.length;
                    return match;
                });
                source += "';\n";
                if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';
                source = "var __t,__p='',__j=Array.prototype.join," +
                    "print=function(){__p+=__j.call(arguments,'');};\n" +
                    source + "return __p;\n";
                try {
                    render = new Function(settings.variable || 'obj', '_', source);
                } catch (e) {
                    e.source = source;
                    throw e;
                }

                if (data) return render(data);
                var template = function(data) {
                    return render.call(this, data);
                };
                template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';
                return template;
            };

            return template;
        })();

        return util;
    }

    function updateTip(catename) {
        if (isExistence(_conditioncount) && isExistence(_infocount) && isExistence(_data) && isExistence(catename) && isExistence(conditionId) && isExistence(title)) {
            var pageInfo = _data,
                infocount = _infocount,
                conditioncount = _conditioncount,
                guidStr,
                lastTime = pageInfo.hasOwnProperty('lasttime') ? pageInfo.lasttime : '';

            if (lastTime) {
                var distance = diffTime(lastTime).distance;

                if (infocount == 0) {
                    if (conditioncount >= 3) {
                        if (distance >= 24 && distance < 2 * 24) {
                            guidStr = '小主，暂无新信息哦~';

                        } else if(distance>=2*24){
                            guidStr = '连续两天没有信息更新了 <a class="guide-link" data-flag="none">放宽条件试试？</a>';
                        }
                    } else {
                        if (distance >= 24) {
                            guidStr = '小主，暂无新信息哦~';

                        }
                    }
                } else if (infocount <= 3 && conditioncount >= 3 && distance >= 2 * 24) {

                    guidStr = '连续两天信息更新较少 <a class="guide-link" data-flag = "less">放宽条件试试？</a>';
                } else if (infocount >= 99 && distance >= 2 * 24) {
                    guidStr = '信息太多了 <a class="guide-link" data-flag="more">完善订阅条件试试？</a>';

                }
            }
            $('.guide').append(guidStr);
            $('.guide-link').bind('click', function(e) {

                var flag = $(this).attr('data-flag');

                var _catename = typeof catename !== 'undefined' ? catename : '', //catename
                    conditionid = typeof conditionId !== 'undefined' ? conditionId : '', //订阅条件ID
                    _title = typeof title !== 'undefined' ? title : '', //修改页面title
                    updateUrl = 'http://' + location.hostname + '/api/sub/updatesub/' + conditionid + '?catename=' + _catename; //修改页面url

                WBAPP.setWebLog("edit", "subscriptlist", "", [_catename, flag]);

                WBAPP.loadPage("link", updateUrl, _title);


            });
            if (guidStr) {
                //修改引导展示埋点
                WBAPP.setWebLog("editshow", "subscriptlist", "", [catename]);
            }

        }
    }

    function isExistence(param) {
        return typeof param !== 'undefined';
    }

    function renderPage(pageInfo) {
        var infoData, infoJson = {},
            infoJsonTime = {},
            timeDomStr = '',
            liDomStr = '',
            rigTimeWord,
            showTime,
            ulInfoData,
            infoUl = '<ul class="info-list">';
        var timeStr = '<div class="timer"><%= time%>更新</div>';
        var liopen = '<li data-log = "<%= log%>"><a>';
        var imgStr;
        var dlTopStr = '<dl>' +
            '<dt class="info-tit"><%= lTitle%></dt>' +
            '<dd class="info-attr"><span class="attr-type"><%= leftkeyword%></span><span class="attr-date"><%= rigkeyword%></span></dd>' +
            '<dd class="info-attr"><span class="attr-price"><%= bottomkeyword%><em><%= bottomkeywordMeta%></em></span><span class="attr-tag">';
        var tagStr='';
        var liclose = '</span></dd></dl></a></li>';
        var preLiStr;
        var infoData = pageInfo.hasOwnProperty('list') ? pageInfo.list : '';

        if (infoData) {
            infoData.forEach(function(obj) {
                if (obj.flag == '1') {
                    if (obj.time) {
                        var showTime = obj.time;
                        infoJsonTime = {
                            time: showTime
                        };


                        var timeDomFun = underscore().tpl(timeStr);
                        timeDomStr = timeDomFun(infoJsonTime);
                        $('.info').append(timeDomStr);
                    }
                }

                ulInfoData = obj.infolist;


                ulInfoData.forEach(function(obj) {
                    //右关键字分类别做的处理
                    var createTime = obj.createTime;
                    if (obj.cate == 29) {
                        rigTimeWord = obj.rightKeyword;
                    } else if (obj.cate == 12) {
                        rigTimeWord = '';
                    } else {
                        rigTimeWord = diffTime(createTime).showTag;

                    }
                    // console.log(obj);
                    infoJson.log = obj.tradeline + "&" + obj.listName + "&" + obj.localName + "&" + obj.infoid + "&" + obj.fullPath;

                    infoJson.picUrl = obj.picUrl;
                    infoJson.tradeLine = obj.tradeline;

                    // infoJson.picUrl = obj.picUrl;
                    infoJson.lTitle = obj.title;
                    infoJson.leftkeyword = obj.leftKeyword;
                    infoJson.rigkeyword = rigTimeWord;
                    var bottomword = obj.lbottomKeyword;
                    if (bottomword) {
                        var bottomkeywordArr = bottomword.split(',');
                        var bottomkeyword = bottomkeywordArr[0];
                        if (bottomkeywordArr.length > 1) {
                            var bottomkeywordMeta = bottomword.split(',')[1];
                        }

                    }
                    infoJson.bottomkeyword = bottomkeyword;
                    infoJson.bottomkeywordMeta = bottomkeywordMeta;
                    //有图无图
                    if (infoJson.picUrl == '') {
                        if(infoJson.tradeLine == 'job' ){
                            imgStr='';
                        }else{
                            imgStr = '<img src="../../static/subscribe/img/noimg.gif" class="info-pic">';

                        }
                    } else {
                        imgStr = '<img data-src="<%= picUrl%>" src="../../static/subscribe/img/noimg.gif" class="info-pic">';
                    }
                    //亮点标签
                    var tagJsonArr = obj.tagJsonArr,
                        tagLen = tagJsonArr.length;
                    if (tagLen) {
                        tagJsonArr.forEach(function(i) {
                            tagStr += '<em>' + i + '</em>';
                        });
                        preLiStr = liopen + imgStr + dlTopStr + tagStr + liclose;
                        var liDomFun = underscore().tpl(preLiStr);
                        liDomStr = liDomFun(infoJson);

                        $('.info').append(liDomStr);
                        tagStr = '';
                    } else {
                        tagStr = '';
                        preLiStr = liopen + imgStr + dlTopStr + tagStr + liclose;
                        var liDomFun = underscore().tpl(preLiStr);
                        liDomStr = liDomFun(infoJson);

                        $('.info').append(liDomStr);
                    }


                });



            });

        }


    }

    function gotoDetail(catename) {
        var $infoLi = $('.info').find('li');

        if ($infoLi.length) {
            $infoLi.bind('click', function() {
                var logAttr = $(this).attr('data-log');
                var logArr = logAttr.split('&');

                WBAPP.loadNativeDetail(logArr[0], logArr[1], logArr[2], logArr[3], logArr[4]);
                WBAPP.setWebLog("click", "subscriptlist", "", [catename]);
            });
            WBAPP.setWebLog("show", "subscriptlist", "", [catename]);
        }

    }

    function goUpdate() {

        WBAPP.extendRightBtn("top_right", "修改", "goUpdatePage");


    }

    window.goUpdatePage = function() {
        var _catename = typeof catename !== 'undefined' ? catename : '', //catename
            conditionid = typeof conditionId !== 'undefined' ? conditionId : '', //订阅条件ID
            _title = typeof title !== 'undefined' ? title : '', //修改页面title
            updateUrl = 'http://' + location.hostname + '/api/sub/updatesub/' + conditionid + '?catename=' + _catename; //修改页面url
        WBAPP.loadPage("link", updateUrl, _title);
        WBAPP.setWebLog("subscriptedit", "list", "", [_catename]);

    };

    function diffTime(givdate) {
        var nowMilSec = Date.parse(new Date());
        var givMilSec = Date.parse(givdate);
        var diffHourValue = Math.floor((nowMilSec - givMilSec) / 1000 / 3600);
        var diffDayValue = Math.floor((nowMilSec - givMilSec) / 1000 / 3600 / 24);
        var showTag, topTimeTag, ofTime = {};
        if (diffHourValue < 24) {
            showTag = diffHourValue + '小时前';
        } else if (diffDayValue < 7) {
            showTag = diffDayValue + '天前';
        } else {
            showTag = givdate.split(' ')[0].substr(5);
        }
        ofTime = {
            showTag: showTag,
            distance: diffHourValue
        };
        return ofTime;
    }

    $(function() {
        var _catename = typeof catename !== 'undefined' ? catename : ''; //catename

        updateTip(_catename);
        if (typeof _data !== "undefined") {
            renderPage(_data);
        }

        gotoDetail(_catename);
        new nextPage();
        new lazyLoad($('.info-pic'));
        goTop();
        goUpdate();
    });
})();