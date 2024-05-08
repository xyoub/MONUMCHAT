$(document).ready(function () {

    $("form input[type=submit]").click(function() {
        $("input[type=submit]", $(this).parents("form")).removeAttr("clicked");
        $(this).attr("clicked", "true");
    });

    var bgcover64 = null;
    $('body').off("submit", '.iplus_fauth');
    $('body').on("submit", '.iplus_fauth', function (e) {
        e.preventDefault();
        var params = $(this).serialize();
        var pcontainer = $(this).closest('.pcontainer').attr('id');
        var email = $(this).closest('form').find("input[name='email']").val();
        var btns  = $(this).closest('form').find("input[type='submit'][clicked=true]").attr('id'); 
        showLoading();
        init_alert();
        $.ajax({
            url: $(this).attr('action'),
            type: "POST",
            data: params,
            success: function (data, status, xhr) { 
                $(".cnx-container").removeClass("compte");
                hideLoading();
                if (xhr.getResponseHeader("content-type") == "application/json") {
                    if (data.status == 200) {
                        if (data.code == 'email_account_found') {
                            if(btns == 'crcompte'){
                                $('.mssg').text('un compte existe déjà pour cette adresse email');
                            }else{
                                $('#password_container .pass_subtitle').html(email);
                                $("#password_container [name='email']").val(email);
                                iPlusAnimate(pcontainer, 'password_container');
                            }          
                        }
                        else if(data.code == 'password_changed'){
                            $('#'+pcontainer).find('form').hide();
                            $("#"+pcontainer +" .alert-success").show();
                        }
                        else if (data.code == 'connected')
                            window.location.href = data.redirect;
                    }
                    else if (data.status == 401) {
                        if (data.code == 'invalid_credentials') {
                            $('#password_container .password_reset').show();
                            $('#password_container .password_error').show();
                            $('#password_container .password_forgot').hide();
                            $("#login_container [name='password']").val();
                        }
                        else if (data.code == 'no_subscription') {
                            iPlusAnimate(pcontainer, 'abonnement_step1_container');
                            $('.cnx-container').removeClass('compte');
                        }
                        else if (data.code == 'no_app_access') {
                            iPlusAnimate(pcontainer, 'autorisation_step1_container');
                            $('.cnx-container').removeClass('compte');
                        }
                        else if (data.code == 'require_field_empty' ) {
                            //alert(data.redirec);
                            window.location.href = data.redirect;
                        }
                        else if (data.code == 'require_captcha' ) {
                            showCaptchaModal();
                        }
                        
                    }
                    else if (data.status == 404) {
                        if(btns == 'crcompte'){
                            $(".cnx-container").addClass("compte");
                            $('#register_step2_container .pass_subtitle').html(email);
                            $("#register_step2_container .iplus_fregister input[name='email']").val(email);                            
                            iPlusAnimate(pcontainer, 'register_step2_container');
                            return;
                        }else{
                            $('.mssg').text('aucun compte associé à cette email');
                        }
                        
                    }
                    return;
                }
                else{
                    hideLoading();
                    $(".alert-danger strong ~ span").text('Unknown error.');
                    $(".alert-danger").show();
                }
                    
                
                

                
            },
            error:function(jqXHR,error, errorThrown) {  
                hideLoading();
                if(jqXHR.status&&jqXHR.status==400){
                    $(".alert-danger strong ~ span").text(jqXHR.responseText);
                    
                }else{
                    $(".alert-danger strong ~ span").text("Unknonw error");
                }
                $(".alert-danger").show();
           }
        });
        return false;

    });


    $('body').off("submit", '.iplus_fregister');
    $('body').on("submit", '.iplus_fregister', function (e) {
        e.preventDefault();
        var params = $(this).serialize();
        var pcontainer = $(this).closest('.pcontainer').attr('id');
        var email = $(this).closest('form').find("[name='email']").val();
        showLoading();
        init_alert();
        $.ajax({
            url: $(this).attr('action'),
            type: "POST",
            data: params,

            success: function (data, status, xhr) {
                hideLoading();
                $(".cnx-container").removeClass("compte");  
                if (xhr.getResponseHeader("content-type") == "application/json") {
                    
                    if (data.status == 200) {
                        if (data.code == 'email_account_found') {
                            $('#password_container .pass_subtitle').html(email);
                            $("#password_container form [name='email']").val(email);
                            $('#password_container .email_account_exist').show();
                            iPlusAnimate(pcontainer, 'password_container');
                        }
                        else if(data.code == 'validation_mail_sent'){
                            $(".cnx-container").removeClass("compte");
                            $('p .email').html(email);
                            iPlusAnimate(pcontainer, 'register_step3_container');
                        }
                        else if (data.code == 'connected')
                            window.location.href = data.redirect;
                    }
                    else if (data.status == 401) {
                        if (data.code == 'require_captcha' ) {
                            showCaptchaModal();
                        }
                    }
                    else if (data.status == 404) {
                        if (data.code == 'email_account_not_found') {
                            $('#register_step2_container .pass_subtitle').html(email);   
                            $("#register_step2_container form [name='email']").val(email); 
                            $(".cnx-container").addClass("compte");                        
                            iPlusAnimate(pcontainer, 'register_step2_container');
                        }
                    }
                    return;
                }
                $('#login_container .iplus_alert').html('Unknown error.');

            },
            error:function(jqXHR,error, errorThrown) {  
                hideLoading();
                if(jqXHR.status&&jqXHR.status==400){
                    $(".alert-danger strong ~ span").text(jqXHR.responseText);
                    
                }else{
                    $(".alert-danger strong ~ span").text("Unknonw error");
                }
                $(".alert-danger").show();
           }
        });
        return false;

    });

    $('body').off("submit", '.iplus_captcha');
    $('body').on("submit", '.iplus_captcha', function (e) {
        e.preventDefault();
        var params = $(this).serialize();
        params = params+"&json_resp=true";
        showLoading();
        init_alert();
        $.ajax({
            url: $(this).attr('action'),
            type: "POST",
            data: params,

            success: function (data, status, xhr) {
                hideLoading();
                if (xhr.getResponseHeader("content-type") == "application/json") {                    
                    if (data.status == 200) {
                        hideCaptchaModal();
                    }
                    else{
                        resetCaptchaModal();
                    }
                    return;
                }
                $('#login_container .iplus_alert').html('Unknown error.');

            },
            error:function(jqXHR,error, errorThrown) {  
                hideLoading();
                if(jqXHR.status&&jqXHR.status==400){
                    $(".alert-danger strong ~ span").text(jqXHR.responseText);
                    
                }else{
                    $(".alert-danger strong ~ span").text("Unknonw error");
                }
                $(".alert-danger").show();
           }
        });
        return false;

    });

    $('body').off("click", '.btnResetPassword');
    $('body').on("click", '.btnResetPassword', function (e) {
        e.preventDefault();
        var pcontainer = $(this).closest('.pcontainer').attr('id');
        var email = $(this).closest('form').find("input[name='email']").val();
        $("#password_reset_confirme_container form [name='email']").val(email);
        $('#password_reset_confirme_container .pass_subtitle').html(email);
        iPlusAnimate(pcontainer, 'password_reset_confirme_container');
    });

    $('body').off("submit", '.iplus_fresetpassword');
    $('body').on("submit", '.iplus_fresetpassword', function (e) {
        e.preventDefault();
        var pcontainer = $(this).closest('.pcontainer').attr('id');
        var email = $(this).closest('form').find("input[name='email']").val();
        showLoading();
        init_alert();
        $.ajax({
            url:  '/password/reset',
            type: "POST",
            data: {email:email,reset_password:true,json_resp:true},

            success: function (data, status, xhr) {
                hideLoading();
                if (xhr.getResponseHeader("content-type") == "application/json") {
                    if (data.status == 200) {
                        if (data.code == 'reset_password_mail_sent') {
                            $('p .email').html(email);
                            iPlusAnimate(pcontainer, 'reset_pwd_container');
                        }
                        return
                    }
                }
                $(".alert-danger strong ~ span").text("Unknonw error");
                $(".alert-danger").show();
            },
            error:function(jqXHR,error, errorThrown) {  
                hideLoading();
                if(jqXHR.status&&jqXHR.status==400){
                    $(".alert-danger strong ~ span").text(jqXHR.responseText);
                    
                }else{
                    $(".alert-danger strong ~ span").text("Unknonw error");
                }
                $(".alert-danger").show();
           }
        });
        return false;

    });

    $('body').off("click", '.iplus_switch');
    $('body').on("click", '.iplus_switch', function (e) {
        e.preventDefault();
        init_alert();
        var pcontainer = $(this).closest('.pcontainer').attr('id');
        var ncontainer = $(this).data('ncontainer');
        var animDirection = $(this).data('animdirection');

        if(ncontainer == 'register_step2_container')
            $(".cnx-container").addClass("compte");
        else
            $(".cnx-container").removeClass("compte");
        if (animDirection)
            iPlusAnimate(pcontainer, ncontainer, animDirection.split('-')[0], animDirection.split('-')[1]);
        else
            iPlusAnimate(pcontainer, ncontainer);
    });


    $('.box_slide_link').click(function (event) {
        if($(this).hasClass('is_open')){
            $('.box_parent_slide').removeClass("open");
            $('.box_slide_link').removeClass('is_open');
            event.preventDefault();
        }else{
            $('.pagination li > div').hide();
            $(this).addClass('is_open');
            cls = $(this).attr('data-class');
            $('.box_parent_slide').addClass("open");
            $('.box_slide_right').removeClass("width_50");
            $('.box_slide_right').removeClass("width_75");
            $('.box_slide_right').removeClass("width_100");
            $('.box_slide_right').addClass(cls);
        }
        event.preventDefault();
    });

    $('.page-item .langue').click(function (event) {
        $('.pagination li > div').hide();
        $('.box_parent_slide').removeClass("open");
        $(this).next().show();

        $('.box_parent_slide').removeClass("open");
        $('.box_slide_link').removeClass('is_open');
        //$('.cgmenu').slideToggle();
        event.preventDefault();
    });

    $('#defaultbgcover').click(function () {
       var bgcover = $('body').attr('data-bgcover');
       if(localStorage.getItem('bgcover'))
            localStorage.removeItem('bgcover');
        $('body').css({'background':'url('+bgcover+') no-repeat center center'});
        var domain = null;
        if(window.location.hostname.split('.').length>2){
            var dms = window.location.hostname.split('.');
            domain = dms[dms.length-2] +'.'+dms[dms.length-1]
        }
        else
        domain =window.location.hostname
            document.cookie = "bgcover=" + bgcover+"; path=/; domain="+domain;
        $('#ModalBgcover').modal('toggle'); 
        $('.menu_nav_auth ul li > div').hide();       
    });

    $('#close_slide').click(function () {
        $('.box_parent_slide').removeClass("open");
    });

    $('.box_parent_slide').click(function () {
        var $box = $(".box_slide_right");
        if ($box.has(event.target).length == 0 && !$box.is(event.target)) {
            $('.box_parent_slide').removeClass('open');
        }
    });

    $('body').on("click", '#showpwd', function (e) {
        $(this).parent().toggleClass("vu_pwd");
        if ($(this).parent().hasClass('vu_pwd')) {
            $('.password1 input').attr('type', 'text');
        } else {
            $('.password1 input').attr('type', 'password');
        }
    });

    $('select[name="codepays"]').change(function(){

        var element = $(this).find('option:selected'); 
        var myTag = element.attr("data-code");
        $('select.codetel option').removeAttr("selected");
        $('select.codetel option[value="'+myTag+'"]').attr('selected','selected');
    });

    $('#pays').change(function(){

        var elements = $(this).find('option:selected'); 
        var myTags = elements.attr("value");
        window.location.href = '/account/require?codepays=' + myTags ;
    });

    $('.bg-color img').click(function(){
        $('.bg-color').removeClass('active');
        $(this).parent().addClass('active');

        $('#valid_bgcover').removeAttr('disabled');
    });
    $('#valid_bgcover').click(function(){
        bgcover = $('.bg-color.active img').attr('src');
        if(bgcover){
            localStorage.removeItem('bgcover');
            var domain = null;
            if(window.location.hostname.split('.').length>2){
                var dms = window.location.hostname.split('.');
                domain = dms[dms.length-2] +'.'+dms[dms.length-1]
            }
            else
                domain =window.location.hostname
            document.cookie = "bgcover=" + bgcover+"; path=/; domain="+domain;
            $('body').css({'background':'url('+bgcover+') no-repeat center center'});
            $('#ModalBgcover').modal('toggle'); 
            $('.menu_nav_auth ul li > div').hide();
        }
    });

    $('body').off('click', '.langue');
    $('body').on('click', '.langue', function(){
        $('.smenu_change_cover').show();
    });

    $('.liuser span').click(function(){
        $('.smenu_change_cover').hide();
        $(this).next('.mnuser').show();
    });

    $('.apps.nav-link').click(function(){
        $('.mnuser').hide();
        $('.smenu_change_cover').hide();
    });



    $('.uploadcoverphoto input[type="file"]').change(function(e){
        var tmppath = URL.createObjectURL(event.target.files[0]);
        var fileName = e.target.files[0].name;
        $('.uploadcoverphoto span').text(" : "+fileName);
        var canvas = document.createElement("canvas");
        var file = document.querySelector('.uploadcoverphoto input[type="file"]').files[0];
        var reader = new FileReader();
        
        reader.onload = function (e) {
            var img = new Image(); 
            img.onload = function(e){        
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);

                var MAX_WIDTH = window.innerWidth;
                var MAX_HEIGHT = window.innerHeight;
                var width = img.width;
                var height = img.height;

                if (width > height) {
                  if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                  }
                } else {
                  if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                  }
                }
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);

                bgcover64 = canvas.toDataURL("image/png");    
            };
            img.src = e.target.result;                   
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
        reader.readAsDataURL(file);
        //console.log(data64img);

        $('#valid_bgcover').removeAttr('disabled');
        $('#valid_bgcover').addClass('coverperso');
        $('#valid_bgcover.coverperso').click(function(){             
            if(bgcover64){
                localStorage.setItem('bgcover',bgcover64);       
                $('body').css({'background':'url('+bgcover64+') no-repeat center center'});
                $('#ModalBgcover').modal('toggle'); 
                $('.menu_nav_auth ul li > div').hide();
            }
        });

    });

    $('.navbar-toggler').click(function(){
        $('.pagination').slideToggle();
    });


    beforeInitApp();
});


function init_login() {
    $("#login_container [name='email']").val('');
    $('#login_container .email_account_not_found').hide();
    $('.btn_inscri').show();
}

function init_password() {
    $("#password_container [name='password']").val('');
    $('#password_container .invalid_credentials').hide();
    $('#password_container .invalid_credentials_hide').show();
}

function init_alert(){
    $('#password_container .invalid_credentials').hide();
    $('#password_container .invalid_credentials_hide').hide();
    $('#login_container .email_account_not_found').hide();
    $(".alert-danger").hide();
    $('#password_container .email_account_exist').hide();
    $('#password_container .password_reset').hide();
    $('#password_container .password_error').hide();
    $("#reset_password_container .alert-success").hide();

    $('#password_container .password_forgot').show();
    $('#reset_password_container').find('form').show();
}

function showLoading(){
    $('form [type=submit]').prop("disabled", true);
    $('a').prop("disabled", true);
    $(".lds-ring").show();
}

function hideLoading(){
    $(".lds-ring").hide();
    $('form [type=submit]').prop("disabled", false);
    $('a').prop("disabled", false);
}

function showCaptchaModal(){
    $("#contentCaptcha").load('/captcha/form');
    $("#showCaptchaModal").modal();
}

function hideCaptchaModal(){
    $('#showCaptchaModal').modal('hide');
}

function resetCaptchaModal(){
    $("#contentCaptcha").load('/captcha/form');
}

function iPlusAnimate(pcontainer, ncontainer, directionOut = 'Left', directionIn = 'Right') {
    var classToRemove = 'bounceInRight animated bounceOutLeft bounceInLeft bounceOutRight';
    $('#' + pcontainer).removeClass(classToRemove).
        addClass('bounceOut' + directionOut + ' animated').
        one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass(classToRemove);
            $('#' + pcontainer).hide();
            $('#' + ncontainer).show();
            $('#' + ncontainer).removeClass(classToRemove).
                addClass('bounceIn' + directionIn + ' animated').
                one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    $(this).removeClass(classToRemove);
                });
        });
}

function beforeInitApp(){
    if(localStorage.getItem('bgcover')){
        var bgcover64 = localStorage.getItem('bgcover');        
        if(bgcover64){
            $('body').css({'background':'url('+bgcover64+') no-repeat center center'});
        }
    }
}