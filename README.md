# skala-vue-yj

This template should help get you started developing with Vue 3 in Vite.

## 작업 일지 (2026-08-19)

날씨 목업 페이지 과제하면서 한 거 정리. (1일차)

- App.vue에 `id="app"` 왜 붙어있나 봤더니, index.html에도 이미 `id="app"` 마운트 포인트가 있어서 중첩되고 있던 거였음. class도 아니고 굳이 필요 없는 거라 정리 대상.
- WeatherMockup.vue에서 v-for로 날씨 카드 반복 렌더링 구현함. `weatherList` 배열 돌면서 서울/수원/부산/광주 카드 뿌려주고, `:key`는 인덱스 말고 `weather.id`로 바인딩함. (key를 인덱스로 쓰면 나중에 배열 순서 바뀌거나 항목 삭제될 때 엉뚱한 DOM 재사용돼서 버그 날 수 있음)
- 온도 상태 표시를 v-if/v-else-if/v-else로 3단계(🔥 매우 더움 / ☀️ 따뜻함 / ❄️ 선선함)로 나눔. 처음엔 `city.temp`라고 잘못 써서 참조 에러 났었음 → `weather.temp`로 수정.
- 카드 클릭하면 선택 표시되게 `selectedCity` 상태 추가하고, `:class="{ selected: selectedCity === weather.name }"`로 클릭한 카드만 테두리 색 바뀌도록 함. 클래스 바인딩을 객체 문법으로 쓰면 조건 여러 개 한 번에 처리 가능하다는 거 이번에 체감함.
- 온도 뱃지(`temp-badge--hot/warm/cool`)도 같은 방식으로 클래스 3개를 조건부로 토글.
- CitySearch.vue 컴포넌트 따로 만들어서 검색 입력창 구현. v-model 안 쓰고 `:value` + `@input`으로 직접 양방향 바인딩 흉내내봄. 근데 아직 WeatherMockup이랑 상태가 분리돼 있어서 검색해도 카드 목록엔 반영 안 됨 — 이건 2일차 computed에서 연결할 예정.
- 검색창은 flex로 가운데 정렬하고 입력창/버튼을 한 줄에 배치.

과제 요구사항 1번(배열 렌더링, v-for, key 바인딩)은 확인 결과 통과.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
