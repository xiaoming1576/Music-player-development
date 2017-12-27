
// 什么元素 触发 什么事件 实现 什么效果

var oPlay = document.getElementById("play");
var oMusic = document.getElementById("music");
var oText = document.getElementById("text");
var oContent = document.getElementById("content");
var onOff = true;//做一个开关来记录音乐的播放状态
oPlay.onclick=function(){
	if(onOff){
		//播放音乐
		oMusic.play();
		//this就指代oPlay 谁用指代谁
		this.className = "play rotate";
	}else{
		//暂停播放
		oMusic.pause();
		this.className = "play"; 
	}
	onOff = !onOff; //每点击一次就取相反状态  ！ 取反	
}
//获取歌词并添加到lrc盒子里面
//console.log(oText.value);
var lrc = oText.value.split("["); //从 [ 处分割开 
// console.log(lrc);
var html='';
for(var i=0;i<lrc.length;i++){
	var lrcArr = lrc[i].split("]");
	//console.log(lrcArr[1]);歌词
	// console.log(lrcArr[0]);

	//对时间进行切割
	var time =lrcArr[0].split(".");
	//console.log(time);
	var times=time[0].split(":");
	//console.log(times);
	var sec = times[0]*60+times[1]*1; //全部转化成秒
	// console.log(sec);


	if(lrcArr[1]){
		html += "<p id="+sec+">"+lrcArr[1]+"</p>"
	}
}
oContent.innerHTML = html;//把content盒子的内容设置为html
var aP = oContent.getElementsByTagName("p");
var num = 0;
//监听到音乐播放的进度  然后让相应的歌词显色
oMusic.addEventListener("timeupdate",function(){
	//console.log(oMusic.currentTime);//获取音乐播放的当前时间
	var curr = parseInt(oMusic.currentTime);
	//console.log(curr);
	if(document.getElementById(curr)){
		for(var i=0;i<aP.length;i++){
			aP[i].style.color="#fff";
			aP[i].style.fontSize="14px";
		}
		document.getElementById(curr).style.color="red";
		document.getElementById(curr).style.fontSize="20px";
		//让歌词往上移动
		if(aP[15+num].id == curr){
			oContent.style.top = -20*num + "px";
			num++;
		}
	}
});









