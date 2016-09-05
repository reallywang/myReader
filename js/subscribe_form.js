function selectForm(origin) {
    var rawpList = origin.result.getFilterInfo.pList;
    var rawmList = origin.result.getFilterInfo.moreList;
    var rawLocalList = origin.result.getFilterInfo.localList;
    var output = {},
        pList = {},
        mList = {};
    var liHtml = '';
    if (rawpList) {


        rawpList.forEach(function(obj) {
            //宠物狗类别数据subMap做特殊处理
            if (obj.subMap) {
                //console.log(obj.subMap);
                var pSubMap = obj.subMap,
                    mapArr = [];
                pSubMap.forEach(function(obj) {
                    for (var k in obj) {
                        console.log(obj[k]);
                        obj[k].forEach(function(obj) {
                            mapArr.push(obj);
                        });

                    }
                });

                //console.log(mapArr);

            }
            var key = obj.id;

            var opt = mapArr ? obj.subList.concat(mapArr) : obj.subList;
            pList[key] = {};
            pList[key].option = opt;
            pList[key].paramname = key;
            pList[key].title = obj.text;

        });
       // console.log(pList);
        for (var i in pList) {
            //必选项的默认值
            var pTitle = pList[i].title,
                pParaname = pList[i].paramname,
                pOptVal,
                pOptTxt;
            var pOpt = pList[i].option;
            pOpt.some(function(obj) {
                if (obj.id == '-1') {
                    pOptVal = '-1';
                    pOptTxt = obj.text;
                    return true;
                }


            });
            if (i == 'cmcspid') {


                var cmcspidOpt = pList[i].option;
                cmcspidOpt.forEach(function(obj) {
                    obj.value = obj.cmcspid;
                });

                liHtml += '<li class = \"cate\" select_type = \"2\"><span class = \"item\">' + pTitle + '</span><span class = \"holderValue holderMust\">请选择' + pTitle + '</span><input type=\"hidden\" itemName = \"' + pTitle + '\" id = "' + pParaname + '" flag = \"plist\" msg = \"请选择' + pTitle + '\" /><span class = \"goArrow\"><icon class = \"close\"></icon></span></li>';
            } else {
                liHtml += '<li class = \"cate\" select_type = \"2\"><span class = \"item\">' + pTitle + '</span><strong><span class = \"holderValue\">不限</span></strong><input type=\"hidden\" itemName = \"' + pTitle + '\" id = "' + pParaname + '" flag = \"plist\" value = "' + pOptVal + '" text = "' + pOptTxt + '" /><span class = \"goArrow\"><icon class = \"close\"></icon></span></li>';

            }
        }

    }



    if (rawmList) {

        var submoreList = rawmList.value;
        submoreList.forEach(function(obj) {
            //console.log(obj)
            var key = obj.id;
            mList[key] = {};

            if (obj.type && obj.type == 'checkbox') {
                //alert(key);
                obj.subList = [];
                var anyObj = {
                    "id": key,
                    "isParent": false,
                    "selected": false,
                    "selectedText": "不限",
                    "text": "不限",
                    "value": "-1"
                };
                var yesObj = {
                    "id": key,
                    "isParent": false,
                    "selected": false,
                    "selectedText": "是",
                    "text": "是",
                    "value": "1"
                };
                var noObj = {
                    "id": key,
                    "isParent": false,
                    "selected": false,
                    "selectedText": "是",
                    "text": "否",
                    "value": "0"
                };
                obj.subList = [anyObj, yesObj, noObj];
            }
            mList[key].option = obj.subList;
            mList[key].paramname = key;
            mList[key].title = obj.text;


        });
       // console.log(mList);
        liHtml += '<div class = \"moreLi\"><span class = \"moreTxt\">更多</span><icon class = \"close\"></icon></div><div class = \"moreList\">';
        for (var j in mList) {



           // console.log(mList[j]);
            var mitemTxt = mList[j].title;
            if (mitemTxt == '只看本地工作') {
                mitemTxt = '只看本地';
            }
            //  liHtml += '<li class = \"cate\" select_type = \"2\"><span class = \"item\">' + mitemTxt + '</span><strong><span class = \"holderValue\">不限</span></strong><input type=\"hidden\" id = "' + mList[j].paramname + '" flag = \"more\"  value = "' + mList[j].option[0].value + '" text = "' + mList[j].option[0].text + '"/><span class = \"goArrow\"><icon class = \"close\"></icon></span></li>';
            liHtml += '<li class = \"cate\" select_type = \"2\"><span class = \"item\">' + mitemTxt + '</span><strong><span class = \"holderValue\">不限</span></strong><input type=\"hidden\" itemName = \"' + mitemTxt + '\" id = "' + mList[j].paramname + '" flag = \"more\"  value = "' + mList[j].option[0].value + '" text = "' + mList[j].option[0].text + '"/><span class = \"goArrow\"><icon class = \"close\"></icon></span></li>';

        }

        liHtml += '</div>';



    }
    var btnStr = '<a class = \"submitBtn\">订阅</a>';
    $('.selectForm').append(liHtml);
    $('body').append(btnStr);
    //console.log(liHtml);

    output = $.extend(true, pList, mList);

    //console.log(JSON.stringify(pList) +"****"+JSON.stringify(mList))
    return output;

}
//条件修改页面数据处理（通过给native发送定格式的数据，获取native的筛选项）
function dataHandle(origin) {
    var rawpList = origin.result.getFilterInfo.pList;
    var rawmList = origin.result.getFilterInfo.moreList;
    var rawLocalList = origin.result.getFilterInfo.localList;
    var output = {},
        pList = {},
        mList = {};
    var liHtml = '';

    if (rawpList) {


        rawpList.forEach(function(obj) {
            //宠物狗类别数据subMap做特殊处理
            if (obj.subMap) {
                //console.log(obj.subMap);
                var pSubMap = obj.subMap,
                    mapArr = [];
                pSubMap.forEach(function(obj) {
                    for (var k in obj) {
                       // console.log(obj[k]);
                        obj[k].forEach(function(obj) {
                            mapArr.push(obj);
                        });

                    }
                });

               // console.log(mapArr);

            }
            var key = obj.id;

            var opt = mapArr ? obj.subList.concat(mapArr) : obj.subList;
            pList[key] = {};
            pList[key].option = opt;
            pList[key].paramname = key;
            pList[key].title = obj.text;

        });
        //console.log(pList);
        for (var i in pList) {
            //必选项的默认值

            if (i == 'cmcspid') {
                var cmcspidOpt = pList[i].option;
                cmcspidOpt.forEach(function(obj) {
                    obj.value = obj.cmcspid;
                });

            }



        }


    }



    if (rawmList) {

        var submoreList = rawmList.value;
        submoreList.forEach(function(obj) {
           // console.log(obj)
            var key = obj.id;
            mList[key] = {};

            if (obj.type && obj.type == 'checkbox') {
                // alert(key);
                obj.subList = [];
                var anyObj = {
                    "id": key,
                    "isParent": false,
                    "selected": false,
                    "selectedText": "不限",
                    "text": "不限",
                    "value": "-1"
                };
                var yesObj = {
                    "id": key,
                    "isParent": false,
                    "selected": false,
                    "selectedText": "是",
                    "text": "是",
                    "value": "1"
                };
                var noObj = {
                    "id": key,
                    "isParent": false,
                    "selected": false,
                    "selectedText": "是",
                    "text": "否",
                    "value": "0"
                };
                obj.subList = [anyObj, yesObj, noObj];
            }
            mList[key].option = obj.subList;
            mList[key].paramname = key;
            mList[key].title = obj.text;


        });



    }


    output = $.extend(true, pList, mList);

    //console.log(JSON.stringify(pList) +"****"+JSON.stringify(mList))
    return output;

}
//生成条件修改页面的模板
function updataDom(orgData) {
    var liHtml = '',
        item, paraname, optVal, optTxt, localtext, localHtml, ulHtml;
    var arr = [];
    orgData.forEach(function(obj) {
        if (obj.flag) {
            if (obj.flag == 'local') {


                arr.push(obj);


            } else {
                text = obj.text;
                item = obj.itemname;
                paramname = obj.paramname;
                optVal = obj.value;
                if (obj.flag == 'plist') {
                    liHtml += '<li class = \"cate\" select_type = "2"><span class = \"item\">' + item + '</span><strong><span class = \"holderValue\">' + text + '</span></strong><input type=\"hidden\" itemName = \"' + item + '\" id = "' + paramname + '" flag = \"plist\" value = "' + optVal + '" text = "' + text + '" /><span class = \"goArrow\"><icon class = \"close\"></icon></span></li>';
                } else if (obj.flag == 'more') {
                    liHtml += '<div class = \"moreLi\"><span class = \"moreTxt\">想要更精准？请填写更多</span><icon class = \"close\"></icon></div><div class = \"moreList\">';
                    liHtml += '<li class = \"cate\" select_type = \"2\"><span class = \"item\">' + item + '</span><strong><span class = \"holderValue\">' + text + '</span></strong><input type=\"hidden\" itemName = \"' + item + '\" id = "' + paramname + '" flag = \"more\"  value = "' + optVal + '" text = "' + text + '"/><span class = \"goArrow\"><icon class = \"close\"></icon></span></li>';

                }
            }

        }


    });
   // console.log(arr);
    if (arr.length) {
        var larea = arr[0],
            ldiduan = typeof arr[1] !== 'undefined' ? arr[1] : '',
            lareaName = larea.text,
            lareaId = larea.value,
            ldiduanName = ldiduan ? ldiduan.text : '',
            ldiduanId = ldiduan ? ldiduan.value : '',
            localtext = lareaName + ldiduanName;
        localHtml = '<li class = \"cate\" select_type = \"1\"><span class = \"item\">区域</span><strong><span class = \"holderValue\">' + localtext + '</span></strong><input type=\"hidden\" itemName = \"区域\" id = \"localArea\" value = \"'+lareaId+'\" text=\"'+lareaName+'\" flag = \"local\"/><input type=\"hidden\" id = \"localDiduan\" value = \"'+ldiduanId+'\" text=\"'+ldiduanName+'\" flag = \"local\"/><span class = \"goArrow\"><icon class = \"close\"></icon></span></li>';
    }
    ulHtml = localHtml + liHtml;
    var btnStr = '<a class = \"updateBtn\">修改</a>';
    //console.log(liHtml)
    $('.selectForm').append(ulHtml);
    $('body').append(btnStr);
}
//WBAPP.toggleLoadingBar("show");
if (typeof rawData !== "undefined") {


    if (typeof isUpdatePg !== "undefined" && isUpdatePg) {
        //alert(1)
        var datasrc = dataHandle(rawData);
       // alert(JSON.stringify(datasrc))
    } else {
        var datasrc = selectForm(rawData);
    }



}

if (typeof orgData !== "undefined") {
    updataDom(orgData);
}

//获取native的筛选项
$.publish = function() {};
$.subscription = function() {};
$.publish.getSelectdata = function(c, d, f) {
    var b = "";
    if (typeof f !== "undefined") {
        b = f
    }
    var params = {
        "action": "selectdata",
        "type": c,
        "data": d,
        "callback": "$.publish.downloadNextSelectItem",
        "msg": b
    };
    console.log(params);
    WBAPP._nativeBridge(params);
};
//埋点
var urlObj = urlPara();

var cateName = urlObj.catename,
    cateTag = urlObj.catetag;
if (cateTag) {
    WBAPP.setWebLog('conditionshow', 'subscript', '', [cateTag]);
    $(".selectForm").find(".cate").on('click', function() {
        WBAPP.setWebLog('conditionclick', 'subscript', '', [cateTag]);
    });
}

//设置input数据
$.publish.setSelectdata = function(d) {
    if (d != undefined) {
        var c = d;
        var b = $(".selectForm").find(".cate");

        b.each(function() {
            var e = $(this).find("input");
            var h = "";
            //  alert(JSON.stringify(c))
            if (c.length && e.attr("id") == c[0].paramname) {
                $(this).find("input").remove();
                var j = "";
                //  alert(JSON.stringify(c))
                for (var g = 0; g < c.length; g++) {
                    j += '<input type="hidden" itemname = "' + e.attr('itemName') + '"value="' + c[g].value + '" id="' + c[g].paramname + '" name="' + c[g].paramname + '" text="' + c[g].text + '" flag = "' + e.attr('flag') + '"/>';
                    h += c[g].text;
                }
                $(this).append(j);
                e = $("#" + c[0].paramname);

                var f = e.parent('.cate').find('.holderValue');
                if (f.hasClass('holderMust')) {
                    f.html('');
                    var strongTxt = '<strong class=\"strongTxt\">' + h + '</strong>';
                    f.append(strongTxt);
                } else {
                    f.html(h);
                }

            }
        });

    }
};

//获取native的筛选数据
var selectItem = $(".selectForm .cate");
if (selectItem.length) {
    selectItem.bind('click', function() {

        var selectType = $(this).attr("select_type"),
            itemId = $(this).find("input").attr("id"),
            data;

        if (selectType == '1') {
            data = '';
        }
        if (typeof datasrc == "object") {
            data = JSON.stringify(datasrc[itemId]);

        }
        $.publish.getSelectdata(selectType, data);

    });
}
//提交时，给后端发送的数据
$.subscription.createData = function(c) {
    var b = [];
    c.each(function() {
        var d = $(this);
        if (d && d.val() != "") {
            if (d.parent().hasClass("cate")) {
                b.push({
                    "itemname": d.attr("itemName"),
                    "paramname": d.attr("id"),
                    "value": d.val(),
                    "text": d.attr("text"),
                    "isselect": "true",
                    "flag": d.attr("flag")
                })
            }
        }
    });
    if (typeof ____json4fe == "object") {
        b.push({
            "paramname": "localId",
            "value": ____json4fe.locallist[0].dispid,
            "text": ____json4fe.locallist[0].name
        })
    }
    //对localArea.localDiduan做处理
    /* var arr = [];

     b.forEach(function(obj) {
         if (obj.paramname === 'localArea') {
             arr[0] = obj;
         } else if (obj.paramname === 'localDiduan') {
             arr[1] = obj;
         }
     });

     if (arr[0] && arr[1]) {
         arr[1].paramname = 'local';
     } else if (arr[0]) {
         arr[0].paramname = 'local';
     }*/
    b = JSON.stringify(b);

    return b;
};
//校验值
$.subscription.checkInput = function() {
    var j = $(".selectForm").find("input");
    var e = true;
    //console.log(j)
    for (var g = 0; g < j.length; g++) {
        var k = $(j[g]);
        var mesg = k.attr('msg');

        if (k.val() == "" && mesg) {
            WBAPP.toastMsg(mesg);
            return false;
        }


    }
    return true;
};
//订阅列表页
$.subscription.gotoSublist = function() {
    //订阅条件聚合页-我的订阅
    var url = "http://" + location.hostname + "/api/sub/index";
    //var c = b + "/getfirstpage?pagesize=10";//待定
    WBAPP.loadPage("subscription_list", url, "我的订阅");

};
//提交
$.subscription.submit = function() {

    var b = "http://" + location.hostname + "/api/sub";
    //$('body').text($.subscription.createData($(".selectForm input")));
    WBAPP.toggleLoadingBar("show");
    $.ajax({
        type: "POST",
        url: b + "/subscribe/" + cateName + "/submit/?isnative=0",
        data: {
            "data": $.subscription.createData($(".selectForm input"))
        },
        success: function(i) {
            WBAPP.toggleLoadingBar("hide");
            var j = typeof i == 'string' ? JSON.parse(i) : i;
            if (typeof j == "object") {
                if (j.status == "true") {
                    WBAPP.setWebLog('success', 'subscript', '', [cateTag]);

                    WBAPP.showDialog("single", "提示", "订阅成功", '$.subscription.gotoSublist', '确定');

                } else {
                    if (j.code == "1") {
                        WBAPP.showDialog("single", "提示", "您订阅的信息太多了，取消一些老信息吧", '$.subscription.gotoSublist', '确定');
                    } else {
                        WBAPP.setWebLog('repeat', 'subscript', '', [cateTag]);
                        WBAPP.showDialog("single", "提示", "该条件已订阅过，请重新订阅", "", "确定");
                    }
                }
            }
        },
        error: function() {

            WBAPP.showDialog("网络异常，订阅失败，请重新订阅.");
        }
    });
};
//修改
$.subscription.subUpdate = function() {

    var b = "http://" + location.hostname + "/api/sub";
    var __conditionId = typeof conditionId !== 'undefined' ? conditionId : '';
    var __cateName = typeof catename !== 'undefined' ? catename : '';

    WBAPP.toggleLoadingBar("show");
    $.ajax({
        type: "POST",
        url: b + "/updatesub/" + __cateName + "/submit/?conId="+ __conditionId,
        data: {
            "data": $.subscription.createData($(".selectForm input"))
        },
        success: function(e) {
            WBAPP.toggleLoadingBar("hide");
            var f = typeof i == 'string' ? JSON.parse(e) : e;
            if (typeof f == "object") {
                if (f.status == "true") {
                    WBAPP.showDialog("single", "提示", "修改成功", "$.subscription.gotoSublist", "确定");
                } else {
                    if(f.code == '2'){
                        WBAPP.showDialog("single", "提示", "该条件已订阅过，请重新订阅", "", "确定");
                    }
                }
            }
        },
        error: function() {
            WBAPP.toggleLoadingBar("hide");
            WBAPP.showDialog("网络异常，订阅失败，请重新订阅.");
        }
    })
};
//订阅提交
$('.submitBtn').on('click', function() {
    if ($.subscription.checkInput()) {
        $.subscription.submit();
    }
    if (cateTag) {
        WBAPP.setWebLog('subscript', 'subscript', '', [cateTag]);
    }
    //$('body').text($.subscription.createData($(".selectForm input")));

    return false;

});
//修改提交
$('.updateBtn').on('click', function() {
    if ($.subscription.checkInput()) {
        $.subscription.subUpdate();
    }
    var __cateName = typeof catename !== 'undefined' ? catename : '';
    WBAPP.setWebLog('edit', 'subscript', '', [__cateName]);
    //$('body').text($.subscription.createData($(".selectForm input")));

    return false;

});
//显示更多
$('.moreLi').on('click', function(event) {
    event.preventDefault();
    $('.moreLi').hide();
    $('.moreList').show();


});
//UI 调整
var inptcate = $('.cate');
inptcate.each(function(index, el) {
    var iptitemLi = $(this).find('.item'),
        iptitemLiLen = iptitemLi.length;
    if (($(this).attr('id') !== 'catename') &&($(this).attr('id') !== 'category')&& iptitemLiLen) {
        var len = iptitemLi.text().length,
            spHoldVal = $(this).find('.holderValue');
        if (len == '4') {
            spHoldVal.css("marginLeft", "17px");
        }
        if (len == '3') {
            spHoldVal.css("marginLeft", "30px");
        }
    }

    //alert(len);
});
//解析url查询字符串
function urlPara() {
    var objPara = {},
        urlSearchStr = location.search;
    if (urlSearchStr) {
        var arrPara = urlSearchStr.slice(1).split('&'),
            arrParaLen = arrPara.length;
        if (arrParaLen) {
            for (var i = 0; i < arrParaLen; i++) {
                if (arrPara[i] && -1 != arrPara[i].indexOf('=')) {
                    var keyValue = arrPara[i].split('=');
                    objPara[keyValue[0]] = keyValue[1];
                }
            }
        }
    }
    return objPara;
}