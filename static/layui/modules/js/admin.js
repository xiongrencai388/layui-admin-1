layui.define(['layer', 'upload'], function (exports) {
    var $ = layui.$,
        upload = layui.upload,
        element = layui.element;
    var changeURLPar = function (url, arg, arg_val) {
        var pattern = arg + '=([^&]*)';
        var replaceText = arg + '=' + arg_val;
        if (url.match(pattern)) {
            var tmp = '/(' + arg + '=)([^&]*)/gi';
            tmp = url.replace(eval(tmp), replaceText);
            return tmp;
        } else {
            if (url.match('[\?]')) {
                return url + '&' + replaceText;
            } else {
                return url + '?' + replaceText;
            }
        }
    };
    /**
     *验证码刷新
     */
    $('#login-code').click(function () {
        var url = $(this).attr('src');
        $(this).attr("src", changeURLPar(url, 'random', Math.random()));
    });

    function changeAdminTabLeft() {
        var ul_width = $('.admin-tabs .layui-tab .layui-tab-title').width();
        var all_width = 0;
        $('.admin-tabs .layui-tab .layui-tab-title li').each(function () {
            all_width += parseInt($(this).outerWidth(true));
            if ($(this).hasClass('layui-this')) {
                return false;
            }
        })
        if (ul_width - all_width < 20) {
            var left = 0;
            if ($('.admin-tabs .layui-tab .layui-tab-title .layui-this').outerWidth(true) >= 0) {
                left = (0 - $('.admin-tabs .layui-tab .layui-tab-title .layui-this').outerWidth(true)) + (ul_width - all_width);
            } else {
                left = $('.admin-tabs .layui-tab .layui-tab-title .layui-this').outerWidth(true) + (ul_width - all_width);
            }
            $('.admin-tabs .layui-tab ul').css('left', left + 'px');
        }
        //选择项距离左侧
        if ($('.admin-tabs .layui-tab .layui-tab-title .layui-this').offset().left - 40 - 220 < 100) {
            var offset = $('.admin-tabs .layui-tab .layui-tab-title .layui-this').offset().left;
            var offset = (0 - (offset - 40 - 220));
            if (offset < 200) {
                offset = 200
            }
            var left = parseInt($('.admin-tabs .layui-tab ul').css('left')) + offset;
            if (left > 0) {
                left = 0
            }
            $('.admin-tabs .layui-tab ul').css('left', left + 'px');
        }
    }

    /**
     * 事件定义以及绑定
     */
    //刷新当前iframe
    $("[admin-event='refresh']").click(function () {
        layui.event("refresh", "refresh('')");
    });
    layui.onevent("refresh", "refresh()", function () {
        $iframes = $('.layui-show .admin-tabs-body-iframe');
        $iframes[0].contentWindow.location.reload();
        return false;
    });
    //弹窗打开iframe
    $('body').on('click', "[admin-event='formLayer']", function () {
        var href = typeof $(this).attr('href') != 'undefined' ? $(this).attr('href') : $(this).attr('data-href');
        var title = $(this).attr('data-title');
        layui.event("formLayer", "formLayer('')", {
            'href': href,
            'title': title,
        });
        return false;
    });
    $('body').on('click', "[admin-event='formLayerSm']", function () {
        var href = typeof $(this).attr('href') != 'undefined' ? $(this).attr('href') : $(this).attr('data-href');
        var title = $(this).attr('data-title');
        layui.event("formLayerSm", "formLayerSm('')", {
            'href': href,
            'title': title,
        });
        return false;
    });
    //监听表单弹窗。
    layui.onevent("formLayer", "formLayer()", function (param) {
        layer.open({
            type: 2,
            title: param.title,
            shadeClose: true,
            shade: false,
            maxmin: true, //开启最大化最小化按钮
            area: ['100%', '100%'],
            content: param.href
        });
        return false;
    });
    layui.onevent("formLayerSm", "formLayerSm()", function (param) {
        layer.open({
            type: 2,
            title: param.title,
            shadeClose: true,
            shade: false,
            maxmin: true, //开启最大化最小化按钮
            area: ['80%', '80%'],
            content: param.href
        });
        return false;
    });
    //获取二级菜单点击事件监听
    $("[admin-event='getSecondMenu']").click(function () {
        var id = $(this).attr('lay-menuid');
        layui.event("getSecondMenu", "getSecondMenu('')", {
            'id': id
        });
        if (window.screen.width < 768) {
            //唤起侧边菜单
            layui.event("changeMobileMenu", "changeMobileMenu('')");
        }
    });
    /**
     * 获取二级菜单监听
     */
    layui.onevent("getSecondMenu", "getSecondMenu()", function (param) {
        obj.ajax('admin/menu/child/' + param.id, '', function (data) {
            if (data.code != '1001') {
                layer.msg(data.msg);
                return false;
            }
            var html = '';
            $.each(data.data, function (key, val) {
                if (val.status == 1 && val.checked) {
                    if (key == 0) {
                        var is_itemd = 'layui-nav-itemed';
                    } else {
                        var is_itemd = '';
                    }
                    if (val.icon == '') {
                        val.icon = 'layui-icon-home';
                    }
                    if (val.type == 3) {
                        html += '<li class="layui-nav-item ' + is_itemd + '">\n' +
                            '<a data-href="' + val.endpath + '" href="javascript:;"><i class=" layui-icon ' + val.icon + '"></i><span>' + val.name + '</span></a>\n';
                    } else {
                        html += '<li class="layui-nav-item ' + is_itemd + '">\n' +
                            '<a href="javascript:;"><i class=" layui-icon ' + val.icon + '"></i><span>' + val.name + '</span></a>\n';
                    }

                    if (val.children) {
                        $.each(val.children, function (i, v) {
                            if (v.status == 1 && val.checked) {
                                if (v.type == 3) {
                                    html += '<dl class="layui-nav-child">\n' +
                                        '<dd class=""><a data-href=\'' + v.endpath + '\' href="javascript:;"><span>' + v.name + '</span></a></dd>\n' +
                                        '</dl>\n';
                                } else {
                                    html += '<dl class="layui-nav-child">\n' +
                                        '<dd class=""><a href="javascript:;"><span>' + v.name + '</span></a></dd>\n' +
                                        '</dl>\n';
                                }
                            }
                        })
                    }
                    html += '</li>';
                }
            });
            if (!html) {
                return false;
            }
            $('.layui-nav-tree').html(html);
            element.render();
        }, '', 'get');
        return false;
    });
    //点击链接增加tab
    $(document).on('click', 'a[data-href]', function () {
        var href = $(this).attr('data-href');
        if (typeof href != 'undefined') {
            var title = $(this).children('span').html();
            if (typeof title == 'undefined') {
                var title = $(this).attr('lay-text');
            }
            obj.addAdminTab(element, title, href);
        }
    });
    //ajax请求
    $(document).on('click', 'a[data-ajax-href]', function () {
        var href = $(this).attr('data-ajax-href');
        obj.ajax(href, '', function (data) {
            layer.msg(data.msg);
        }, '', 'get');
        return false;
    });
    $("[admin-event='changeMenu']").click(function () {
        layui.event("changeMenu", "changeMenu('')");
    });
    //菜单展开
    var big = function () {
        $('.big-logo').css('display', 'block');
        $('.small-logo').css('display', 'none');
        $('.layui-layout-admin .layui-side-menu .layui-side-scroll').css('width', '240px');
        $('.layui-layout-admin .layui-side-menu,.layui-layout-admin .layui-logo').css('width', '220px');
        $('.layui-layout-admin .layui-side-menu .layui-nav .layui-nav-item a span').css('display', 'block');
        $('.layui-layout-admin .layui-body, .layui-layout-left,.admin-tabs').css('left', '220px');
        $('.pc-menu a .layui-icon-spread-left').addClass('layui-icon-shrink-right');
        $('.pc-menu a .layui-icon-spread-left').removeClass('layui-icon-spread-left');
    }
    //菜单收缩
    var small = function () {
        $('.big-logo').css('display', 'none');
        $('.small-logo').css('display', 'block');
        $('.layui-layout-admin .layui-side-menu .layui-side-scroll').css('width', '80px');
        $('.layui-layout-admin .layui-side-menu,.layui-layout-admin .layui-logo').css('width', '60px');
        $('.layui-layout-admin .layui-side-menu .layui-nav .layui-nav-item a span').css('display', 'none');
        $('.layui-layout-admin .layui-body, .layui-layout-left,.admin-tabs').css('left', '60px');
        $('.pc-menu a .layui-icon-shrink-right').addClass('layui-icon-spread-left');
        $('.pc-menu a .layui-icon-shrink-right').removeClass('layui-icon-shrink-right');
    }
    var is_need_small = false
    layui.onevent("changeMenu", "changeMenu()", function (param) {
        if ($('.big-logo').css('display') != 'none') {
            is_need_small = true
            small();
        } else {
            is_need_small = false
            big();
        }
        $('.layui-layout-admin .layui-side-menu').mouseover(function () {
            if (is_need_small) {
                big();
            }
            return false;
        });
        $('.layui-layout-admin .layui-side-menu').mouseout(function () {
            if (is_need_small) {
                small();
            }
            return false;
        });
        return false;
    });
    //手机下打开侧边菜单点击
    $("[admin-event='changeMobileMenu']").click(function () {
        layui.event("changeMobileMenu", "changeMobileMenu('')");
    });
    //手机菜单隐藏
    var mobileMenuHide = function () {
        $('.mobile-menu a .layui-icon-shrink-right').addClass('layui-icon-spread-left');
        $('.mobile-menu a .layui-icon-shrink-right').removeClass('layui-icon-shrink-right');
        $('.layui-body').css('transform', 'translate3d(0, 0, 0)');
        $('.layui-body').css('-webkit-transform', 'translate3d(0, 0, 0)');
        $('.layui-header').css('transform', 'translate3d(0, 0, 0)');
        $('.layui-header').css('-webkit-transform', 'translate3d(0, 0, 0)');
        $('.admin-tabs').css('transform', 'translate3d(0, 0, 0)');
        $('.admin-tabs').css('-webkit-transform', 'translate3d(0, 0, 0)');
        $('.layui-layout-admin .layui-side').css('transform', 'translate3d(-220px, 0, 0)');
        $('.layui-layout-admin .layui-side').css('-webkit-transform', 'translate3d(-220px, 0, 0)');
    }
    //手机版菜单展开
    var mobileMenuShow = function () {
        $('.mobile-menu a .layui-icon-spread-left').addClass('layui-icon-shrink-right');
        $('.mobile-menu a .layui-icon-spread-left').removeClass('layui-icon-spread-left');


        $('.layui-body').css('transform', 'translate3d(220px, 0, 0)');
        $('.layui-body').css('-webkit-transform', 'translate3d(220px, 0, 0)');

        $('.layui-header').css('transform', 'translate3d(220px, 0, 0)');
        $('.layui-header').css('-webkit-transform', 'translate3d(220px, 0, 0)');

        $('.admin-tabs').css('transform', 'translate3d(220px, 0, 0)');
        $('.admin-tabs').css('-webkit-transform', 'translate3d(220px, 0, 0)');
        $('.layui-layout-admin .layui-side').css('transform', 'translate3d(0, 0, 0)');
        $('.layui-layout-admin .layui-side').css('-webkit-transform', 'translate3d(0, 0, 0)');
    }
    //手机版菜单缩小
    layui.onevent("changeMobileMenu", "changeMobileMenu()", function (param) {
        big();
        if ($('.mobile-menu a i').hasClass('layui-icon-spread-left')) {
            mobileMenuShow();
            $('.admin-body-shade').css('display', 'block');
            $("[admin-event='shade']").click(function () {
                layui.event("shade", "shade('')", mobileMenuHide);
            });
        } else {
            mobileMenuHide();
        }
        return false;
    });

    layui.onevent("shade", "shade()", function (func) {
        $('.admin-body-shade').css('display', 'none');
        func();
        return false;
    });
    layui.onevent("addAdminTab", "addAdminTab()", function (param) {
        obj.addAdminTab(param.element, param.title, param.href);
        return false;
    });
    //监听tab切换
    var obj = {
        changeURLPar: changeURLPar,
        /**
         * 切换页面 layui-admin-tabs
         */
        changeAdminTab: function (element) {
            element.on('tab(layui-admin-tabs)', function (data) {
                var href = $(this).attr('lay-id');
                $('.layui-layout-admin .layui-body .admin-tabs-body').removeClass('layui-show');
                $('iframe[src="' + href + '"]').parent().addClass('layui-show');
                changeAdminTabLeft();
            });
        },
        addAdminTab: function (element, title, href) {
            var li = $('li[lay-id="' + href + '"]').length;
            if (li > 0) {
                element.tabChange('layui-admin-tabs', href);
            } else {
                element.tabAdd('layui-admin-tabs', {
                    title: title,
                    id: href
                });
                element.tabChange('layui-admin-tabs', href);
                $('.layui-layout-admin .layui-body .admin-tabs-body').removeClass('layui-show');
                $('.layui-layout-admin .layui-body').append('<div class="admin-tabs-body layui-show"><iframe class="admin-tabs-body-iframe" src="' + href + '"></iframe></div>');
            }
        },
        prevAdminTab: function () {
            $('.admin-tabs .layui-prev-controller').click(function () {
                var href = $('.admin-tabs .layui-tab-title .layui-this').prev().attr('lay-id');
                if (typeof href != 'undefined') {
                    element.tabChange('layui-admin-tabs', href);
                }
            });
        },
        nextAdminTab: function () {
            $('.admin-tabs .layui-next-controller').click(function () {
                var href = $('.admin-tabs .layui-tab-title .layui-this').next().attr('lay-id');
                if (typeof href != 'undefined') {
                    element.tabChange('layui-admin-tabs', href);
                }
            });
        },
        bindCloseTab: function () {
            $(".admin-tabs .layui-tab").on("click", function (e) {
                if ($(e.target).is(".layui-tab-close")) {
                    $('iframe[src="' + $(e.target).parent().attr("lay-id") + '"]').parent().remove();
                }
            })
            $('.closeNowTab').click(function () {
                if ($('.admin-tabs .layui-tab-title .layui-this').prev().length != 0) {
                    var next_href = $('.admin-tabs .layui-tab-title .layui-this').next().attr('lay-id');
                    var now_href = $('.admin-tabs .layui-tab-title .layui-this').attr('lay-id');
                    element.tabDelete('layui-admin-tabs', now_href);
                    $('iframe[src="' + now_href + '"]').parent().remove();
                    element.tabChange('layui-admin-tabs', next_href);
                }
            });
            $('.closeOtherTab').click(function () {
                $('.admin-tabs .layui-tab-title li').each(function (index, value) {
                    if (index != 0 && !$(this).hasClass('layui-this')) {
                        var href = $(this).attr('lay-id');
                        element.tabDelete('layui-admin-tabs', href);
                        $('iframe[src="' + href + '"]').parent().remove();
                    }
                });
            });
            $('.closeRightTab').click(function () {
                while ($('.admin-tabs .layui-tab-title .layui-this').next().length) {
                    var href = $('.admin-tabs .layui-tab-title .layui-this').next().attr('lay-id');
                    element.tabDelete('layui-admin-tabs', href);
                    $('iframe[src="' + href + '"]').parent().remove();
                }
            });
            $('.closeLeftTab').click(function () {
                while ($('.admin-tabs .layui-tab-title .layui-this').prev().prev().length) {
                    var href = $('.admin-tabs .layui-tab-title .layui-this').prev().attr('lay-id');
                    element.tabDelete('layui-admin-tabs', href);
                    $('iframe[src="' + href + '"]').parent().remove();
                }
            });
            $('.closeAllTab').click(function () {
                $('.admin-tabs .layui-tab-title li').each(function (index, value) {
                    if (index != 0) {
                        var href = $(this).attr('lay-id');
                        element.tabDelete('layui-admin-tabs', href);
                        $('iframe[src="' + href + '"]').parent().remove();
                    }
                });
            });
        },
        ajax: function (url, postData, succCallback, errorCallback, type, dataType) {
            if (typeof url == 'undefined') {
                layer.msg("错误");
                return false;
            }
            var index = layer.load(1);
            var type = type || "post";
            var dataType = dataType || "json";
            if (url.substr(0, 4) == 'http' || url.substr(0, 1) == '/') {
                var url = url;
            } else {
                var url = '/api/' + url;
            }
            var succCallback = succCallback || function (data) {
                if (data.code == 1001) {
                    layer.msg(data.msg, {
                        offset: '15px',
                        icon: 1,
                        time: 1000
                    }, function () {
                        if (data.redirect) {
                            location.href = data.redirect;
                        } else {
                            location.reload();
                        }
                    });
                } else {
                    layer.msg(data.msg);
                }
            };
            var errorCallback = errorCallback || function (e, t) {
                layer.msg('请求异常:' + t);
            };
            $.ajax({
                type: type,
                url: url,
                data: postData,
                dataType: dataType,
                success: function (res) {
                    layer.close(index);
                    succCallback(res);
                },
                error: function (e, t) {
                    layer.close(index);
                    errorCallback(e, t);
                }
            });
        }, //表格生成
        table: function (table, id, url, options, default_options) {
            if (url.substr(0, 4) == 'http' || url.substr(0, 1) == '/') {
                var url = url;
            } else {
                var url = '/api/' + url;
            }
            var default_options = default_options || {
                elem: '#' + id,
                id: id,
                url: url,
                response: {
                    statusCode: 1001,
                    countName: 'total'
                },
                limit: 15,
                limits: [15, 30, 50],
                page: true,
                loading: true,
                cellMinWidth: 80
            };
            options = $.extend(default_options, options);
            return table.render(options);
        }, //回车绑定
        enter: function (func) {
            document.onkeydown = function (e) {
                var theEvent = window.event || e;
                var code = theEvent.keyCode || theEvent.which;
                if (code == 13) {
                    func();
                }
            };
        },
        urlToJson: function (arr) {
            var theRequest = new Object();
            for (var i = 0; i < arr.length; i++) {
                var kye = arr[i].split("=")[0]
                var value = arr[i].split("=")[1]
                if (kye != '' && typeof kye != "undefined") {
                    theRequest[kye] = decodeURIComponent(value)
                }
            }
            return theRequest;
        },
        fileUploadBtn: function (plupload, elem) {
            obj.ajax('/open/upload/options', '', function (res) {
                var upload_options = res.data;
                var multipart_params = upload_options.posts ? upload_options.posts : '';
                var index;
                var options = {
                    browse_button: elem + '_upload',
                    max_file_size: upload_options.upload_file_size + "kb",
                    filters: {
                        mime_types: [
                            {title: "files", extensions: upload_options.upload_file_ext},
                        ]
                    },
                    url: upload_options.file_upload_url,
                    multipart_params: obj.urlToJson(multipart_params.split('&')),
                    FilesAdded: function (uploader, files) {
                        index = layer.load(1);
                        $('#' + elem + '_filename').html(files[0].name);
                        uploader.start()
                    },
                    UploadProgress: function (uploader, file) {
                        $('#' + elem + '_percent').css('width', file.percent + '%');
                        $('#' + elem + '_status').html(file.percent + '%');
                        if (file.percent == 100) {
                            $('#' + elem + '_status').html('完成');
                        }
                    },
                    FileUploaded: function (uploader, file, info) {
                        var res = JSON.parse(info.response);
                        if (info.status == 200) {
                            $('#' + elem + '_value').val(res.path);
                        }
                        layer.close(index);
                    },
                    Error: function (uploader, err) {
                        layer.msg("您选择的文件：" + err.file.name + "，" + err.message);
                        layer.close(index);
                    }
                };
                plupload.loader(options);
                $('#' + elem + '_preview').click(function () {
                    $('#' + elem + '_upload').click();
                });
            }, '', 'get');
        },
        imgUploadBtn: function (plupload, elem) {
            obj.ajax('/open/upload/options', '', function (res) {
                var upload_options = res.data;
                var multipart_params = upload_options.posts ? upload_options.posts : '';
                var index;
                var options = {
                    browse_button: elem + '_upload',
                    max_file_size: upload_options.upload_img_size + "kb",
                    filters: {
                        mime_types: [
                            {title: "Image files", extensions: upload_options.upload_img_ext},
                        ]
                    },
                    url: upload_options.image_upload_url,
                    multipart_params: obj.urlToJson(multipart_params.split('&')),
                    FilesAdded: function (uploader, files) {
                        index = layer.load(1);
                        uploader.start()
                    },
                    FileUploaded: function (uploader, file, info) {
                        console.log(info.status)
                        var res = JSON.parse(info.response);
                        if (info.status == 200) {
                            $('#' + elem + '_value').val(res.path);
                            $('#' + elem + '_preview').attr('src', '//' + upload_options.domain + '/' + res.path);
                        }
                        layer.close(index);
                    },
                    Error: function (uploader, err) {
                        layer.msg("您选择的文件：" + err.file.name + "，" + err.message);
                        layer.close(index);
                    }
                };
                plupload.loader(options);
                $('#' + elem + '_preview').click(function () {
                    $('#' + elem + '_upload').click();
                });
            }, '', 'get');
        }
        ,
        imgUpload: function (options) {
            if (typeof options.funcname == 'undefined') {
                options.funcname = '';
            }
            if (options.funcname) {
                var url = '/admin/uploadImage?func=' + encodeURIComponent(options.funcname);
            } else {
                var url = '/admin/uploadImage?preview=' + encodeURIComponent(options.preview) + '&input=' + encodeURIComponent(options.input);
            }
            $(options.elem).click(function () {
                layer.open({
                    type: 2,
                    title: "图片上传",
                    area: ['80% ', '80%'],
                    fixed: true,
                    maxmin: false,
                    content: url
                });
            });
        },
        isMobile: function (val) {
            var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
            if (!reg.test(val)) {
                return '手机号错误';
            } else {
                return false;
            }
        },
        isEmail: function (val) {
            var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
            if (!reg.test(val)) {
                return '邮箱错误';
            } else {
                return false;
            }
        },
        isUserLogin: function (val) {
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(val)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(val)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(val)) {
                return '用户名不能全为数字';
            }
        },
        isUserPass: function (val) {
            var reg = /^[\S]{6,12}$/;
            if (!reg.test(val)) {
                return '密码必须6到12位，且不能出现空格';
            } else {
                return false;
            }
        },
        closeSelf: function () {
            var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
            parent.layer.close(index);
        },
        openFormLayer: function (title, href) {
            layui.event("formLayer", "formLayer('')", {
                'href': href,
                'title': title
            });
        }
    };
    exports('admin', obj);
});