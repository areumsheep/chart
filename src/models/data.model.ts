import COLOR from '../constants/color';
import { Point } from '../types/Chart';
import { Datum } from '../types/Data';

import { binarySearch } from '../utils/search';

class Data {
  lineColor: string;
  #points: Point[] = [];
  #datas: Datum[] = [];

  constructor(datas: Datum[], lineColor?: string) {
    this.lineColor = lineColor || COLOR.darkgray;
    this.#datas = datas;
  }

  get points() {
    return this.#points;
  }
  get datas() {
    return this.#datas;
  }

  // 덮어쓰기
  setPoints(points: Point[]) {
    this.#points = points;
  }
  setDatas(datas: Datum[]) {
    this.#datas = datas;
  }

  // 추가하기
  updateData(data: Datum) {
    this.#datas.push(data);
  }

  // 탐색하기
  findNearestXPoint = (point: number) => {
    const index = binarySearch<Point>(this.#points, point, 'x');
    return this.#points[index];
  };
  findNearestXPointIndex = (point: number) => {
    return binarySearch<Point>(this.#points, point, 'x');
  };

  // 제거하기
  removePoint = (index: number) => {
    this.#points.splice(index, 1);
    this.#datas.splice(index, 1);
  };
}

export default Data;
