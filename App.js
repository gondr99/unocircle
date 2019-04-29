class App {
    constructor(el) {
        this.circleList = [];
        this.lineList = [];
        this.prevTime = new Date(); //현재시간 넣고
        this.canvas = document.querySelector(el);
        this.ctx = this.canvas.getContext("2d");

        this.startDrag = false;
        this.dragTarget = null;
        this.dragClone = null;
        this.mousePos = { x: 0, y: 0 };
        this.deltaPos = { dx: 0, dy: 0 };

        this.canvas.addEventListener("mousedown", this.mouseDown.bind(this));
        this.canvas.addEventListener("mouseup", this.mouseup.bind(this));
        this.canvas.addEventListener("dblclick", this.dblClick.bind(this));

        document.addEventListener("keydown", (e) => {
            if(e.keyCode == 27){
                //ESC키를 누르면 리셋
                this.startDrag = false;
                if(this.dragTarget != null){
                    this.dragTarget.disable = false;
                    this.dragTarget = null;
                }
                this.dragClone = null;
                this.circleList.forEach(x => x.mode =0);
            }
        });

        this.canvas.addEventListener("mousemove", (e) => {
            this.movePie(e);
        })
    }

    dblClick(e) {
        for (let i = 0; i < this.circleList.length; i++) {
            let x = this.circleList[i];
            let d = this.getDistance(e.offsetX, e.offsetY, x.x, x.y);
            if (d <= x.r) {
                x.mode = 1;
                break;
            }
        }
    }

    mouseDown(e) {
        this.mousePos.x = e.offsetX;
        this.mousePos.y = e.offsetY;

        this.circleList.forEach(x => {
            let d = this.getDistance(this.mousePos.x, this.mousePos.y, x.x, x.y);
            if (d <= x.r) {
                if (x.mode == 0) {
                    this.dragClone = x;
                    this.startDrag = true;
                } else if (x.mode == 1) {
                    let pieNo = this.checkClickedPie(this.mousePos.x - x.x, this.mousePos.y - x.y);
                    if (pieNo === undefined) return;

                    this.dragTarget = x.list[pieNo];
                    this.dragClone = new Pie();
                    this.dragClone.clone(this.dragTarget);
                    this.dragTarget.disable = true;
                }
                //마우스 클릭된 위치와 중점과의 오프셋 위치
                this.deltaPos.dx = x.x - this.mousePos.x;
                this.deltaPos.dy = x.y - this.mousePos.y;

                this.startDrag = true;
            }
        });
    }

    //클릭된 파이를 찾아주는 매서드
    checkClickedPie(x, y) {
        if ((x > 0 && y < 0 && x < -y) || (x < 0 && y < 0 && -x < -y)) {
            return 0;  //0번 파이
        }

        if ((x > 0 && y < 0 && x > -y) || (x > 0 && y > 0 && x > y)) {
            return 1;
        }

        if ((x > 0 && y > 0 && x < y) || (x < 0 && y > 0 && -x < y)) {
            return 2;
        }

        if ((x < 0 && y < 0 && x < y) || (x < 0 && y > 0 && -x > y)) {
            return 3;
        }
    }

    getDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    }

    mouseup(e) {
        //드래그 중이였다면 현재 드랍된 위치가 어디인지 파악
        if (this.startDrag) {
            this.startDrag = false;
            this.dragClone = null;

            if (this.dragTarget != null) {
                
                this.circleList.forEach(x => {
                    if(x.mode == 0 ) return;
                    let d = this.getDistance(e.offsetX, e.offsetY, x.x, x.y);
                    if (d <= x.r && (x.x != this.dragTarget.x || x.y != this.dragTarget.y)) {
                        let pieNo = this.checkClickedPie(e.offsetX - x.x, e.offsetY - x.y);

                        if (pieNo === undefined) {
                            this.dragTraget = null;
                            return;
                        }

                        this.lineList.push(new Line(this.dragTarget.point, {x:this.dragTarget.x, y:this.dragTarget.y}, x.list[pieNo].point, {x:x.x, y:x.y}));
                    }
                });
                
                this.dragTarget.disable = false;
                this.dragTarget = null;
            }
        }
        
    }

    movePie(e) {
        if (!this.startDrag) return;

        this.dragClone.x = e.offsetX + this.deltaPos.dx;
        this.dragClone.y = e.offsetY + this.deltaPos.dy;
    }

    addCircle(circle) {
        this.circleList.push(circle);
    }

    startDraw() {
        this.ctx.clearRect(0, 0, 600, 400);
        let now = new Date();
        let delta = (this.prevTime - now) / 1000;
        this.prevTime = now;

        this.circleList.forEach(x => {
            x.update(delta);
            x.render(this.ctx);
        });

        this.lineList.forEach(x => {
            x.update(delta);
            x.render(this.ctx);
        })

        if (this.dragClone != null) {
            this.dragClone.update(delta);
            this.dragClone.render(this.ctx);
        }

        requestAnimationFrame(this.startDraw.bind(this));
    }
}

window.onload = function () {
    let app = new App("#myCanvas");

    //테스트로 2개의 원을 더한다.
    let c1 = new Circle(100, 200, 40);
    app.addCircle(c1);

    let c2 = new Circle(500, 200, 40);
    app.addCircle(c2);

    app.startDraw();
}