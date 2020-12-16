/*
 * @Author: zhangyang
 * @Date: 2020-12-06 09:23:48
 * @LastEditTime: 2020-12-07 17:13:33
 * @Description: 黑客雨-JS特效
 */
const style = document.createElement('style');
style.append('* { margin: 0; padding: 0; } html { width: 100%; height: 100%; }');
document.body.appendChild(style)

const canvas = document.createElement('canvas');
canvas.setAttribute('id', 'number-rain-canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style = `
position: fixed;
left: 0;
top: 0;
z-index: -1;
background-color: #111;
display: none;
`;
document.body.appendChild(canvas);

//获取画布的上下文
const ctx = canvas.getContext("2d");
//每个文字的字体大小
const fontSize = 16;
//计算列
const colunms = Math.floor(window.innerWidth / fontSize);
//记录每列文字的y轴坐标
const arr = [];
//给每一个文字初始化一个起始点的位置
for (let i = 0; i < colunms; i++) {
  arr.push(0);
}
//运动的文字
const str = "1001011";
//绘画的函数
function draw() {
  //布满全屏的黑色遮罩层
  ctx.fillStyle = "rgba(0,0,0,0.01)";
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  //给字体设置样式
  ctx.font = "700 " + fontSize + "px  微软雅黑";
  //给字体添加颜色
  ctx.fillStyle = "#00cc33";
  //写入画布中
  for (let i = 0; i < colunms; i++) {
    const index = Math.floor(Math.random() * str.length);
    const x = i * fontSize;
    const y = arr[i] * fontSize;
    ctx.fillText(str[index], x, y);
    //如果文字的Y轴坐标大于画布的高度，1/100*colunms概率将该文字的Y轴坐标重置为0
    if (y >= canvas.height && Math.random() > 0.99) {
      arr[i] = 0;
    }
    //文字Y轴坐标+1
    arr[i]++;
  }
}
draw();
setInterval(draw, 30);

// 加点音乐
// const music = new Audio();
// music.src = 'https://isure.stream.qqmusic.qq.com/C400001z4tFZ2VvIoX.m4a?guid=9891695872&vkey=9A0DB7BEDD52B141F30A6739105910E7C1EEA934937C905EB5D3CABB9799B82BFE336D6F48177778DE0B7739E206343DBE7A485108567647&uin=7415&fromtag=66';
// music.autoplay = true;
// music.loop = true;
// const html = document.querySelector('html');

// html.addEventListener('click', () => {
//   try {
//     music.play();
//   } catch (error) {
//     return;
//   }
// })
// html.click();