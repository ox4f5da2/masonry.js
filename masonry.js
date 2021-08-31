{/* 
    响应式瀑布流效果:
        1.boxs--要展现瀑布流的盒子集合
        2.className 存放瀑布流的标签类名 例'.masonry'
        3.args [imgWidth, padding, gap]

    参数说明:
        不填默认值为: [200, 10, 10]
        boxWidth    // 每个盒子的宽度
        padding     // 单位px,内边距不能大于盒子的一半宽度
        gap         // 单位px,每个盒子之间的缝隙

    <h1 style="text-align: center;">响应式瀑布流布局</h1>
    <div class="masonry"></div>
    <script>
        var seedUrl = ["https://d301.paixin.com/thumbs/7670718/107312646/staff_1024.jpg", "https://d301.paixin.com/thumbs/1292828/92723720/staff_1024.jpg", "https://d301.paixin.com/thumbs/1037171/110576732/staff_1024.jpg", "https://d302.paixin.com/thumbs/1006362/125722756/staff_1024.jpg", "https://d302.paixin.com/thumbs/1027484/153703692/staff_1024.jpg", "https://d301.paixin.com/thumbs/1897095/83080196/staff_1024.jpg", "https://d301.paixin.com/thumbs/7164006/100409134/staff_1024.jpg", "https://d300.paixin.com/thumbs/1420973/19903293/staff_1024.jpg", "https://d301.paixin.com/thumbs/1011434/115601534/staff_1024.jpg", "https://d300.paixin.com/thumbs/1011382/28454079/staff_1024.jpg", "https://d301.paixin.com/thumbs/2813967/67238767/staff_1024.jpg", "https://d301.paixin.com/thumbs/1902695/85601914/staff_1024.jpg", "https://d300.paixin.com/thumbs/1001594/1342473/staff_1024.jpg", "https://d302.paixin.com/thumbs/1600374/143878163/staff_1024.jpg"]

        let boxs = [];
        for (let i = 0, num = 50, len = seedUrl.length; i < num; i++) { // 随机生成50张图片
            // 注意 最外层的盒子不要添加高度
            let box = document.createElement('div'), img = document.createElement('img'), footer = document.createElement('div');
            new Element(box).css({ 'position': 'relative', 'width': '200px', 'border-radius': '5px' })
            new Element(img).css({ 'width': '100%', 'border-radius': '3px' })
            new Element(footer).css({ 'width': '100%', 'height': '20px', 'background-color': 'rgba(0, 0, 0, .3)', 'color': '#fff', 'text-align': 'center', 'line-height': '20px', 'border-radius': '3px' })
            footer.innerHTML = '图' + (i + 1);
            img.src = seedUrl[Math.floor(Math.random() * num) % len];
            // 可自行添加addEventListener事件 否则使用默认样式
            box.appendChild(img);
            box.appendChild(footer);
            boxs.push(box);
        }
        new Masonry(boxs, '.masonry', 200, 100, 10);
    </script> */}

(function () {
    function Element(tag) {
        this.tag = tag;
    }
    Element.prototype.css = function (data) {
        for (let key in data) {
            this.tag.style[key] = data[key];
        }
    }

    function Masonry(boxs, className, ...args) {
        this.boxs = boxs;
        this.className = className;
        this.masonry = document.querySelector(this.className);
        // [this.boxWidth, this.padding, this.gap] = args;
        this.boxWidth = args[0] || 200;
        this.padding = args[1] || 10;
        this.gap = args[2] || 10;
        this.init()
    }

    Masonry.prototype.init = function () {
        let that = this;
        this.masonry.style.margin = '0 auto';
        this.masonry.style.position = 'relative';
        this.boxs.forEach(item => {
            new Element(item).css({
                'width': this.boxWidth + 'px',
                'padding': this.padding + 'px',
                'margin-right': this.gap + 'px',
                'box-sizing': 'border-box',
                'float': 'left',
                'border': '1px solid #ccc',
                'transition': 'all .5s'
            });
            item.addEventListener('mouseover', function () {
                item.style.cursor = 'pointer';
                item.style.boxShadow = '0px 0px 5px #666';
            })
            item.addEventListener('mouseout', function () {
                item.style.cursor = 'default';
                item.style.boxShadow = '';
            })
            this.masonry.appendChild(item);
        })
        window.addEventListener('load', function () {
            that.loadPage(document.body.offsetWidth, that.boxWidth + that.gap);
        })
        window.addEventListener('resize', function () {
            that.loadPage(document.body.offsetWidth, that.boxWidth + that.gap);
        })
    }
    Masonry.prototype.getMinimumIndex = function (arr) {
        let index = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] < arr[index]) {
                index = i;
            }
        }
        return index;
    }
    Masonry.prototype.loadPage = function (screenWidth, boxWidth) {
        console.log(screenWidth,boxWidth);
        let maxNum = Math.floor(screenWidth / boxWidth);
        this.masonry.style.marginLeft = (screenWidth - boxWidth * maxNum) / 2 + 'px';
        let boxHeight = [];
        console.log(maxNum);
        // 判断图片是否全部加载完成
        let boxIfLoadedTimer = setInterval(() => {
            let len = this.boxs.length
            for (var i = 0; i < len; i++) {
                if (this.boxs[i].querySelector('img') !== null) {
                    if (this.boxs[i].querySelector('img').offsetHeight === 0) {
                        break;
                    }
                }
            }
            if (i === this.boxs.length) {
                clearInterval(boxIfLoadedTimer);
                for (let i = 0; i < len; i++) {
                    if (i < maxNum) {
                        boxHeight[i] = this.boxs[i].offsetHeight;
                        this.boxs[i].style.position = 'static';
                        this.boxs[i].style.marginTop = this.gap + 'px';
                    }
                    else {
                        let minIndex = this.getMinimumIndex(boxHeight);
                        new Element(this.boxs[i]).css({
                            'margin-top': '0px',
                            'position': 'absolute',
                            'left': minIndex * boxWidth + 'px',
                            'top': boxHeight[minIndex] + 2 * this.gap + 'px'
                        })
                        boxHeight[minIndex] += this.boxs[i].offsetHeight + this.gap;
                    }
                }
            }
        }, 10)
    }
    window.Masonry = Masonry;
    window.Element = Element;
})()