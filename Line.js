class Line {
    constructor(origin, originCenter, target, targetCenter){
        this.origin = origin;
        this.target = target;
        //해당 점으로부터 떨어진 정도를 델타값으로 저장하여 차후 원점 계산용으로 사용한다.
        
        this.oriDelta = {x: this.origin.x - originCenter.x, y: this.origin.y - originCenter.y};
        this.tarDelta = {x: this.target.x - targetCenter.x, y: this.target.y - targetCenter.y};
        
        this.r = Math.abs(this.tarDelta.x) > Math.abs(this.tarDelta.y) ? Math.abs(this.tarDelta.x) : Math.abs(this.tarDelta.y);
    }

    render(ctx){
        ctx.save();

        let c = {x:this.origin.x, y:this.origin.y}; //이 위치에서 이동해나가면서 그린다.
        
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#000";
        ctx.moveTo(c.x, c.y);
        c.x = c.x + this.oriDelta.x / 2;
        c.y = c.y + this.oriDelta.y / 2;
        ctx.lineTo(c.x, c.y);
        
        if(this.origin.x > this.target.x){
            //원본이 오른쪽
            if(this.oriDelta.x > 0 ){
                //그려야할 점이 원의 우측에 있다.
                c.y += (c.y - this.target.y < 0 ? this.r + 20 : -this.r -20) ;
                ctx.lineTo(c.x, c.y);
            }
            c.x -= (c.x - this.target.x) - this.r;
            ctx.lineTo(c.x, c.y);
            
            if(this.tarDelta.x > 0){
                //목적지 점이 원의 우측이다.
                c.y = this.target.y;
                ctx.lineTo(c.x, c.y);
            }else if(this.tarDelta.y <= 0) {
                //1번 또는 4번인 경우
                if(c.y > this.target.y){
                    c.y = this.target.y;
                    ctx.lineTo(c.x, c.y);
                }
                c.x = this.target.x;
                ctx.lineTo(c.x, c.y);
            }else{
                c.y = this.target.y + 20;
                ctx.lineTo(c.x, c.y);
                c.x = this.target.x;
                ctx.lineTo(c.x, c.y);
                c.y = this.target.y;
                ctx.lineTo(c.x, c.y);
            }

            ctx.lineTo(this.target.x, this.target.y)
        }else{
            //원본이 왼쪽
            if(this.oriDelta.x < 0 ){
                //그려야할 점이 원의 좌측에 있다.
                c.y += (c.y - this.target.y < 0 ? this.r + 20 : -this.r -20) ;
                ctx.lineTo(c.x, c.y);
            }
            c.x += (this.target.x - c.x) - this.r;
            ctx.lineTo(c.x, c.y);
            
            if(this.tarDelta.x < 0){
                //목적지 점이 원의 좌측이다.
                c.y = this.target.y;
                ctx.lineTo(c.x, c.y);
            }else if(this.tarDelta.y <= 0) {
                //1번 또는 4번인 경우
                if(c.y > this.target.y){
                    c.y = this.target.y;
                    ctx.lineTo(c.x, c.y);
                }
                c.x = this.target.x;
                ctx.lineTo(c.x, c.y);
            }else{
                c.y = this.target.y + 20;
                ctx.lineTo(c.x, c.y);
                c.x = this.target.x;
                ctx.lineTo(c.x, c.y);
            }
        }
        
        ctx.lineTo(this.target.x, this.target.y);
        ctx.stroke();
        ctx.restore();
    }

    update(delta){
        
    }

}