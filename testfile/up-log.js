/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-05-16 17:13:17
 * @version $Id$
 */
$(document).ready(function(){
	    /*更新日志菜单选择*/
    $("*[data-listopen]").click(function() {
            $('*[data-listopenbox]').stop().slideUp(200);
            $(this).siblings('*[data-listopenbox]').stop().slideDown(200);
        })
        /*更新日志菜单选择结束*/
})