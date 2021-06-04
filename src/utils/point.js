export default class Point {
  /**
   * NOTE: 한 번에 웨이브를 그려내지 않고,
   * 화면에 간격을 가진 점을 찍어 점 사이를 연결하는 방식.
   *
   * 웨이브를 그리는데 이용되는 점은
   * 아래 위로 랜덤하게 offset 값을 가짐
   */
  constructor(index, x, y) {
    this.x = x;
    this.y = y;
    this.fieldY = y; // 기본 Y 중심
    this.speed = 0.1;
    this.cur = index; // 각 점이 최대한 평행하지 않도록 각각 다른 시작점을 가지게 한다.
    this.max = Math.random() * 100 + 150;
  }

  update() {
    /**
     * NOTE: 스피드 만큼 cur 값이 더해진다.
     * cur 값은 계속 커지지만,
     * y값은 sin 함수의 주기를 따르기 때문에 무한히 -1 ~ 1 사이를 반복
     */
    this.cur += this.speed;
    /**
     * y값이 sin(cur) + max 만큼 늘어남
     * sin(cur)는 sin 함수의 주기에 따라 -1에서 1까지 반복
     * -1 ~ 1 까지의 값에 max(150 ~ 250)값을 곱해준다.
     */
    this.y = this.fieldY + Math.sin(this.cur) * this.max;
  }
}
