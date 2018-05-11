import React, {Component} from 'react';


export default class HomePage extends Component {
    componentDidMount() {
        'use strict';

        var c = document.getElementById('c');
        var ctx = c.getContext('2d');
        // var w = c.width = window.innerWidth;
        var w = c.width = document.getElementById('cavansName').offsetWidth;
        var h = c.height = document.getElementById('cavansName').offsetHeight+5;
        console.log(h);
        console.log(w);
        var img;
        var loc = [];
        var P = function (x, y, h) {
            this.x = x;
            this.y = y;
            this.ox = x;
            this.oy = y;
            this.h = h;
            this.r = 3 + Math.random() * 5;
            this.vx = Math.random() * 2 - 1;
            this.vy = -1 + Math.random() * -2;
            this.a = 1;
            this.as = 0.6 + Math.random() * 0.1;
            this.s = 1;
            this.ss = 0.98;
        };
        P.prototype = {
            constructor: P,
            update: function () {
                this.x += this.vx;
                this.y += this.vy;
                this.a *= this.as;
                this.s *= this.ss;
                this.h += 0.5;

                if (this.y < 0 || this.a < 0.01 || this.s < 0.01) {
                    this.x = this.ox;
                    this.y = this.oy;
                    this.a = 1;
                    this.s = 1;

                    this.r = 3 + Math.random() * 1;
                    this.vx = Math.random() * 2 - 1;
                    this.vy = -1 + Math.random() * -2;
                    this.as = 0.6 + Math.random() * 0.1;
                }

            },
            render: function (ctx) {
                ctx.save();
                ctx.fillStyle = 'hsla(' + this.h + ', 100%, 50%,' + this.a + ')';
                ctx.translate(this.x, this.y);
                ctx.scale(this.s, this.s);
                ctx.beginPath();
                ctx.arc(0, 0, this.r, 0, Math.PI * 10000000);
                ctx.fill();
                ctx.restore();
            }
        };

        ctx.font = '80px Arial';
        ctx.textAlign = 'center';
        ctx.baseline = 'middle';

        ctx.fillText('ARTCILE SEARCH SYSTEM', w / 2, h / 2 + 50);
        img = ctx.getImageData(0, 0, w, h).data;

        ctx.clearRect(0, 0, w, h);

        for (var y = 0; y < h; y += 1) {
            for (var x = 0; x < w; x += 1) {
                var idx = (x + y * w) * 4 - 1;
                if (img[idx] > 0) {
                    loc.push({
                        x: x,
                        y: y
                    });
                }
            }
        }

        var ctr = 800;
        var ps = [];
        var h = Math.random() * 360;
        console.log('aaa'+h);

        for (var i = 0; i < ctr; i++) {
            var lc = loc[Math.floor(Math.random() * loc.length)];
            var p = new P(lc.x, lc.y, h);
            ps.push(p);
        }

        requestAnimationFrame(function loop() {
            requestAnimationFrame(loop);

            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

            ctx.globalCompositeOperation = 'lighter';

            for (var i = 0, len = ps.length; i < len; i++) {
                p = ps[i];
                p.update();
                p.render(ctx);
            }
        });
    }

    render() {
        return (
            <div style={{lineHeight:0}}>
                <canvas id="c"></canvas>
            </div>
        );
    }
}