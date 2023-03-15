# Vanilla-ts로 차트 구현하기

## 요구사항

> Canvas API를 이용해 Line Chart 컴포넌트를 제작합니다.

1. 차트의 축
   - [x] X축: 최근 5분 구간에 대해 실시간 갱신 가능해야 합니다.
   - [x] Y축: 기본으로 0 이상 100 이하의 값을 표시합니다.
2. 차트의 데이터
   - [x] 차트엔 두 줄의 라인이 표시될 수 있도록 합니다.
   - [x] 첫 번째 라인은 위의 Mock 데이터 호출 함수를 이용하여 초기 데이터 세팅, 업데이트를 진행합니다.
   - [x] 두 번째 라인은 초기 데이터는 없으며, 아래의 마우스 이벤트를 이용하여 데이터를 추가, 삭제를 진행합니다.
3. 마우스 이벤트
   - [x] 차트 마우스 호버 시: 가장 가까운 데이터 Plot에 가로 세로 라인(Crosshairs)을 그립니다.
   - [x] 마우스 클릭 시: 해당 마우스 위치에 데이터를 추가합니다.
   - [x] 마우스 우클릭 시: 해당 마우스 위치의 가장 가까운 데이터를 삭제합니다.
   - [x] 마우스 휠: 차트의 Y축의 최댓값을 변경합니다.
4. 반응형 스타일 적용
   - [x] 차트는 영역 크기에 따라 적절한 해상도를 제공해야 합니다.
   - [x] 테스트를 위해 차트 하단에 Width, Height 입력이 가능한 Input Element를 추가해주세요.
5. 애니메이션
   - [ ] 차트는 실시간 갱신됩니다. 실시간 성격에 어울리는 차트 애니메이션을 추가해주세요.
