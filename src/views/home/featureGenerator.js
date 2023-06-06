

//包装Math.random的rand函数:   min-max        Math.random生成浮点数,其中Math.random*m+n   最小值为n,最大值为m+n
function rand(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}


function featureGenerator(size, num) {
    let contentStyle = {};
    let len = size.length * 25;
    var cm = rand(30 + len, 50 + len);
    contentStyle.width = cm + 'px';
    contentStyle.height = cm + 'px';
    contentStyle.position = 'absolute';
    contentStyle.left = rand(0 + num * 100, 100 + num * 100) + 'px';
    contentStyle.top = rand(0, 35) + 'vh';
    contentStyle.borderRadius = '50%';
    contentStyle.lineHeight = cm + 'px';
    contentStyle.textAlign = 'center';

    var r = rand(0, 255);
    var g = rand(0, 255);
    var b = rand(0, 255);
    var color = `rgba(${r},${g},${b},0.2)`;
    contentStyle.backgroundColor = color;
    return contentStyle;
}



export default featureGenerator;