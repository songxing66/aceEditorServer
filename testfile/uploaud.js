/** *  * @authors Your Name (you@example.org) * @date    2016-03-02 13:44:09 * @version $Id$ */
$(document).ready(function (){
	var aCheckAll=$(".checkall");
	var aCheckOne=$(".acheck");
	var aCheck="";
	var aFamilyName="";
	var relLeng="";
	var iTheNameNum="";
	var aAllChecBtn="";
	var aReadyName="";
	var mjfval="";
	var mjrval="";
	var firstval="";
	var changeslead="";
	var chandx="";
	if($("#p4uscripteditform-should_free")[0]){
		changeslead="p4uscripteditform";
		chandx="p4uScriptEditForm";
	}
	else{
		changeslead="p4upublishform";
		chandx="p4uPublishForm";
	}
	function couponStu(dom){
		//检测优惠状态
		var couponStuVal=$(dom).val();
		if(couponStuVal==3){
			mjfval=$("input[data-full]").val();
			mjrval=$("input[data-reduce-check]").val();
		}
		elseif(couponStuVal==1){
			firstval=$("input[data-month-check]").val();
		}
	}
	function checkFree(){
		//是否免费事件
		if($('#'+changeslead+'-should_free').val()==1){
			//免费状态
			$(".cartypebox .input-group-addon").removeClass('active');
			var trail=$('#'+changeslead+'-trail');
			trail.attr('disabled','disabled');
			trail.val();
			var cost;
			cost=$('input[name="'+chandx+'[cost-1]"]');
			cost.attr('disabled','disabled');
			cost=$('input[name="'+chandx+'[cost-2]"]');
			cost.attr('disabled','disabled');
			cost=$('input[name="'+chandx+'[cost-3]"]');
			cost.attr('disabled','disabled');
			$("#minus").hide();
			$("#"+changeslead+"-script_discount").val("0");
			$("#"+changeslead+"-script_discount").find("option").prop("selected","");
			$("#"+changeslead+"-script_discount").find("option[value=0]").prop("selected","selected");
			$("#p4upublishform-reduceblean").val("1");
			//str
			$("#tt").hide();
			$("#p4u-publishform-status4").hide();
			var discount=$('#'+changeslead+'-script_discount');
			discount.attr('disabled','disabled');
			//end
		}
		else{
			$(".cartypebox .input-group-addon").addClass('active');
			$('#'+changeslead+'-trail').removeAttr('disabled');
			$('input[name="'+chandx+'[cost-1]"]').removeAttr('disabled');
			$('input[name="'+chandx+'[cost-2]"]').removeAttr('disabled');
			$('input[name="'+chandx+'[cost-3]"]').removeAttr('disabled');
			//str
			$('#'+changeslead+'-script_discount').removeAttr('disabled');
			$('#'+changeslead+'-reduce').removeAttr('disabled');
			$('#'+changeslead+'-month').removeAttr('disabled');
			$('#'+changeslead+'-full').removeAttr('disabled');
			$('.p4u-publishform-status').removeAttr('disabled');
			//end
		}
	}
	function checkchanger(){
		//检测当前优惠类型
		$("#"+changeslead+"-reduceblean").val("1");
		var sDiscount=$("#"+changeslead+"-script_discount").val();
		if(sDiscount==3){
			//满减
			$("input[data-full]").val(mjfval);
			$("input[data-reduce-check]").val(mjrval);
			$("input[data-month-check]").val("");
			$("#tt").show();
			$("#minus").hide();
		}
		elseif(sDiscount==1){
			//首单优惠
			$("input[data-full]").val("");
			$("input[data-reduce-check]").val("");
			$("input[data-month-check]").val(firstval);
			$("#tt").hide();
			$('#minus').show();
		}
		else{
			//优惠无
			$("input[data-full]").val("");
			$("input[data-reduce-check]").val("");
			$("input[data-month-check]").val("");
			$("#tt").hide();
			$('#minus').hide();
			$("#p4upublishform-reduceblean").val("1");
		}
	}
	couponStu("#"+changeslead+"-script_discount");
	checkchanger();
	checkFree();
	$("#"+changeslead+"-script_discount").change(function (){
		$("#tt").find("input[data-interval]").val("");
		$("#minus").find("input[data-interval]").val("");
		$("div[data-reduce-box]").removeClass("has-error");
		$("div[data-month-box]").removeClass("has-error")$("p[data-reduce-erro]").hide();
		$("p[data-month-erro]").hide();
		$("#p4upublishform-reduceblean").val("1");
	})$(window).bind('beforeunload',function (){
		return'您输入的内容尚未保存, 确定离开此页面吗?';
	});
	$('#do-reset').click(function (e){
		if(!confirm('您确定要重置表单吗, 重置后现有更改将会丢失! ')){
			e.preventDefault();
		}
	});
	$('#form-publish').submit(function (e){
		$(window).unbind('beforeunload');
	});
	$('#form-edit').submit(function (e){
		$(window).unbind('beforeunload');
	});
	$('#'+changeslead+'-should_free').change(function (){
		checkFree();
	});
	aCheckAll.on("ifClicked",function (){
		//全选按钮事件
		allCheckBtn($(this));
	});
	$(".acheck").on("ifClicked",function (){
		//单选按钮事件
		aChecBtn($(this))
	});
	$(".tableinput").tagator();
	//块标签关键词
	//协议弹窗
	var xyInfoBtn=$(".tagagrbtn");
	xyInfoBtn.on('ifChecked',function (even){
		if(this.checked){
			if($(this).hasClass("date-ag")){
		}
			else{
				$('#myModal').modal();
				$(this).addClass("date-ag");
			}
		}
	})$('#myModal').on("click",function (even){
		var goWord="agr";
		var getRe=$(".tagagrbtn");
		if(even.target.id==goWord){
			getRe.iCheck('check');
		}
		else{
			getRe.iCheck('uncheck');
		}
	})//计算描述字数
	$(".keycomnum").keyup(function (){
		var textRemind=$(this).siblings("p.help-block").find(".readtxtnum");
		textRemind.show();
		var endTxt=$(this).val();
		var allTxtNum=50;
		var endTxtNum=endTxt.length;
		if((allTxtNum-endTxtNum)<1){
			textRemind.hide();
		}
		elseif((allTxtNum-endTxtNum)==50){
			textRemind.hide();
		}
		else{
			var endNumTxt=textRemind.find(".endtxtnum").text(endTxtNum.toString());
			var chaNumTxt=textRemind.find(".chatxtnum").text((allTxtNum-endTxtNum).toString());
		}
	})// /*切换os*/
	// $("#p4upublishform-compatible_type").change(function() {
	// 	$(".oslei input:checked").iCheck('uncheck');
	// 	iosChange($(this));
	// });
	/*优惠活动*/
	$("#"+changeslead+"-script_discount").on("change",function (){
		checkchanger();
	})/*联系方式切换清空*/
	var sOldVal=$("#p4upublishform-contact_type").val();
	if(sOldVal==7)$("#groupbox").show();
	var sOldCallVal=$("#p4upublishform-contact_text").val();
	var sOldQgroup=$("#qqgroup").val();
	$("#p4upublishform-contact_type").change(function (){
		var sNewVal=$(this).val();
		if(sNewVal==7){
			$("#groupbox").show().val(sOldQgroup);
		}
		else{
			$("#groupbox").hide().val("");
		}
		if(sOldVal==sNewVal){
			$("#p4upublishform-contact_text").val(sOldCallVal);
		}
		else{
			$("#p4upublishform-contact_text").val("");
		}
	});
	/*input区间判断*/
	$("input[data-interval]").on("change",function (){
		var iIntervalVal=parseInt($(this).val());
		var iIntervalMax=parseInt($(this).attr("max"));
		var iIntervalMin=parseInt($(this).attr("min"));
		if(iIntervalVal<iIntervalMin){
			$(this).val(iIntervalMin);
		}
		elseif(iIntervalVal>iIntervalMax){
			$(this).val(iIntervalMax);
		}
	})$("input[data-reduce-check]").blur(function (){
		var iMonCardNum=$("input[data-month-3]").val();
		var iFullNum=$("input[data-full]").val();
		var iRudactNum=$(this).val();
		var cost=iMonCardNum*6;
		//6倍
		var full=iFullNum*0.9;
		//90%
		if(iFullNum>cost || iRudactNum>full){
			$("div[data-reduce-box]").addClass("has-error");
			$("p[data-reduce-erro]").show();
			$("p[data-reduce-erro]").html('消费满点必须小于等于月卡点数*6，立减点数必须小于等于消费满点*0.9');
			$("#p4upublishform-reduceblean").val("");
		}
		else{
			$("#p4upublishform-reduceblean").val("1");
		}
		//            return true;
		//$("p[data-reduce-erro]").html(iMonCardNum+","+iFullNum+","+iRudactNum)
	})$("input[data-reduce-check]").focus(function (){
		$("p[data-reduce-erro]").hide();
		$("div[data-reduce-box]").removeClass("has-error");
	})$("input[data-month-check]").blur(function (){
		var iMonCardNum=$("input[data-month-3]").val();
		var iRudactNum=$(this).val();
		var cost=iMonCardNum*0.9;
		//90%
		if(iRudactNum>cost){
			$("div[data-month-box]").addClass("has-error");
			$("p[data-month-erro]").show();
			$("p[data-month-erro]").html('立减点数必须小于等于月卡点数*0.9');
			$("#p4upublishform-reduceblean").val("");
		}
		else{
			$("#p4upublishform-reduceblean").val("1");
		}
	})$("input[data-month-check]").focus(function (){
		$("p[data-month-erro]").hide();
		$("div[data-month-box]").removeClass("has-error");
	})
});