# masonry.js介绍

- 一款响应式瀑布流插件，模式为等宽不等高，可根据用户输入的参数自动布局，并且随着浏览器页面宽度的变化布局也随之变化
- 经测试支持Chrome和Safari浏览器
- 可自行下载压缩版和非压缩版js文件

![](https://img.shields.io/badge/author-oxf5da2-orange) ![](https://img.shields.io/badge/version-1.0.0-green) ![](https://img.shields.io/badge/publish-2021--8--31-yellow) ![](https://img.shields.io/badge/size-4kb%2F8kb-important) ![](https://img.shields.io/badge/support-chrome%2Fsafari-informational)

## 文档目录
- 背景介绍
- 插件的使用介绍
- 插件调用
 - 调用格式
 - 参数介绍
 -  插件使用示例
- LICENSE

## 背景介绍
为什么要写这个瀑布流插件呢？这是因为最近我看到B站里有个UP主发的讲解JS插件的开发视频，视频里他做的是表格渲染的插件开发，因此我收到启发就打算尝试写一个属于自己的插件。想到学Javascript的时候写过一个瀑布流布局，因此我就想把瀑布流布局功能做成一个插件，并命名为Masonry.js

## 插件使用介绍

1. 选择下载[masonry.js](https://github.com/ox4f5da2/masonry.js/blob/main/masonry.js)或[masonry.min.js](https://github.com/ox4f5da2/masonry.js/blob/main/masonry.min.js)二者之一至文件根目录下

2. 在html文件中的head标签内引入js文件
```html
<script src="./masonry.min.js"></script>
```
3. 使用 HTML标签 或者 JavaScript的`document.createElement`生成需要进行瀑布流布局的盒子，并用 JavaScript 的 `document.querySelectorAll()` 获取到所有元素节点，即获取到 NodeList 类数组，例如：
```js
var div = document.querySelectorAll('.masonry>div'); 
```
获得结果如下所示：
```
NodeList(5) [div, div, div, div, div]
```

4. 在 `<script></script>` 标签内新建Masonry对象来使用瀑布流插件
```js
new Masonry(boxs, '.masonry'); // 参数省略写法
```
或者
```js
new Masonry(boxs, '.masonry', 200, 10, 10); // 参数完整写法
```

5. 打开Chrome或Safari浏览器就能看到盒子已经完成瀑布流布局了

## 插件调用

### 调用格式
```
new Masonry(boxs, className, [boxWidth, padding, gap]); // 中括号内的参数可省略
```
### 参数介绍

|  参数   | 数据类型  |  是否必填   | 默认值  | 说明 |
|  ----  | ----  |  ----  | ----  | --- |
| boxs  | DOM节点 | 是  | 无 | 需要进行瀑布流布局的NodeList类数组 |
| className  | string | 是  | 无 | 存放瀑布流的最外层盒子的类名
| boxWidth  | number | 否  | 200 | 单位px,每个盒子的宽度
| padding  | number | 否  | 10 | 单位px,内边距不能大于盒子的一半宽度
| gap  | number | 否  | 10 | 单位px,每个盒子之间的缝隙

### 插件使用示例

```html
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>瀑布流插件案例</title>
    <script src="./masonry.min.js"></script>
</head>
```

```
<body>
    <h1 style="text-align: center;">响应式瀑布流布局</h1>
    <div class="masonry"></div>
    <script>{...}</script>
</body>
```

```
<script>
        var seedUrl =[
		"https://d301.paixin.com/thumbs/7670718/107312646/staff_1024.jpg",
		"https://d301.paixin.com/thumbs/1292828/92723720/staff_1024.jpg",
		"https://d301.paixin.com/thumbs/1037171/110576732/staff_1024.jpg",
		"https://d302.paixin.com/thumbs/1006362/125722756/staff_1024.jpg",
		"https://d302.paixin.com/thumbs/1027484/153703692/staff_1024.jpg",
		"https://d301.paixin.com/thumbs/1897095/83080196/staff_1024.jpg",
		"https://d301.paixin.com/thumbs/7164006/100409134/staff_1024.jpg",
		"https://d300.paixin.com/thumbs/1420973/19903293/staff_1024.jpg",
		"https://d301.paixin.com/thumbs/1011434/115601534/staff_1024.jpg",
		"https://d300.paixin.com/thumbs/1011382/28454079/staff_1024.jpg",
		"https://d301.paixin.com/thumbs/2813967/67238767/staff_1024.jpg",
		"https://d301.paixin.com/thumbs/1902695/85601914/staff_1024.jpg",
		"https://d300.paixin.com/thumbs/1001594/1342473/staff_1024.jpg",
		"https://d302.paixin.com/thumbs/1600374/143878163/staff_1024.jpg"
		];

        let boxs = [];
        for (let i = 0, num = 50, len = seedUrl.length; i < num; i++) { // 生成50张图片
            // 注意 最外层的盒子不要添加高度
            let box = document.createElement('div'),
		img = document.createElement('img'), 
		footer = document.createElement('div');
            new Element(box).css({
		'position': 'relative',
		'width': '400px', 
		'border-radius': '5px' 
	    })
            new Element(img).css({ 
		'width': '100%', 
		'border-radius': '3px'
	    })
            new Element(footer).css({ 
		'width': '100%', 
		'height': '20px', 
		'background-color': 'rgba(0, 0, 0, .3)', 
		'color': '#fff', 
		'text-align': 'center', 
		'line-height': '20px', 
		'border-radius': '3px'
	    })
            footer.innerHTML = '图' + (i + 1);
            img.src = seedUrl[Math.floor(Math.random() * num) % len];
            // 可自行添加addEventListener事件 否则使用默认样式
            box.appendChild(img);
            box.appendChild(footer);
            boxs.push(box);
        }
        new Masonry(boxs, '.masonry');
    </script>
```

## LICENSE

[Apache License 2.0](https://github.com/ox4f5da2/masonry.js/blob/main/LICENSE) &copy; ox4f5da2
