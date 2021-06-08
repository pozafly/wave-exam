import Point from './point';

export default class Wave {
  constructor(color) {
    this.color = color;
    this.points = [];
    this.numberOfPoints = 6;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    // 중간을 각각 넓이, 높이를 2로 나눈 값으로 지정
    this.centerX = stageWidth / 2;
    this.centerY = stageHeight / 2;

    /**
     * 각 점 간격은 '전체 넓이 / (전체 점의 숫자 - 1)' 이 된다.
     * 이렇게 점의 간격을 나누면 화면의 시작부터 끝까지 고른 간격으로 점을 찍을 수 있다.
     */
    this.pointGap = this.stageWidth / (this.numberOfPoints - 1);

    this.init();
  }

  init() {
    // 가운데 하나의 점 만들기
    // this.point = new Point(this.centerX, this.centerY);

    /**
     * points에 각각의 점의 좌표와 인덱스를 넣어준다.
     * 인덱스를 넣어주는 이유는 각 점의 위치에 따라 파동이 움직이는 모양도 다르게 하기 위함.
     */
    for (let i = 0; i < this.numberOfPoints; i++) {
      this.points[i] = new Point(i, this.pointGap * i, this.centerY);
    }
  }

  draw(ctx) {
    /**
     * NOTE: 그리기의 경로를 시작하는 메서드
     * https://developer.mozilla.org/ko/docs/Web/HTML/Canvas/Tutorial/Drawing_shapes
     * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/beginPath
     */
    ctx.beginPath();

    // 점의 시작점으로 붓 이동하기
    ctx.moveTo(this.points[0].x, this.points[0].y);

    for (let i = 0; i < this.numberOfPoints; i++) {
      /* 
      호(arc)를 그리는 메소드를 이용하여 원을 그림 
      2 * Math.PI = 반지름 * 2 = 지름
      */
      // ctx.arc(this.points[i].x, this.points[i].y, 30, 0, 2 * Math.PI);

      /* 각 좌표에 선 긋기 */
      ctx.lineTo(this.points[i].x, this.points[i].y);

      // 공의 위치 변경하기
      if (i !== 0 && i !== this.numberOfPoints - 1) {
        this.points[i].update();
      }
    }
    // 색상 RED & 채우기
    ctx.fillStyle = '#ff0000';
    ctx.fill();

    // 붓 끝내기
    ctx.closePath();
  }
  
}
