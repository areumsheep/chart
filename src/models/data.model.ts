import { Point } from '../types/Chart';
import { Datum } from '../types/Data';

import { binarySearch } from '../utils/search';

class Data {
  #points: Point[] = [];
  #datas: Datum[] = [];

  constructor(datas: Datum[]) {
    this.#datas = datas;
  }

  get points() {
    return this.#points;
  }
  get datas() {
    return this.#datas;
  }

  setPoints(points: Point[]) {
    this.#points = points;
  }
  setDatas(datas: Datum[]) {
    this.#datas = datas;
  }

  findNearestXPoint = (point: number) => {
    const index = binarySearch<Point>(this.#points, point, 'x');
    return this.#points[index];
  };
}

export default Data;
