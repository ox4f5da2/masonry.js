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
