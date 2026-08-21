# skala-vue-yj

This template should help get you started developing with Vue 3 in Vite.

버그·에러 트러블슈팅 기록은 [TROUBLESHOOTING.md](TROUBLESHOOTING.md) 참고.

## 작업 일지 (2026-08-19)

날씨 목업 페이지 과제하면서 한 거 정리. (1일차)

- WeatherMockup.vue에서 v-for로 날씨 카드 반복 렌더링 구현함. `weatherList` 배열 돌면서 서울/수원/부산/광주 카드 뿌려주고, `:key`는 인덱스 말고 `weather.id`로 바인딩함. (key를 인덱스로 쓰면 나중에 배열 순서 바뀌거나 항목 삭제될 때 엉뚱한 DOM 재사용돼서 버그 날 수 있음)
- 온도 상태 표시를 v-if/v-else-if/v-else로 3단계(🔥 매우 더움 / ☀️ 따뜻함 / ❄️ 선선함)로 나눔.
- 카드 클릭하면 선택 표시되게 `selectedCity` 상태 추가하고, `:class="{ selected: selectedCity === weather.name }"`로 클릭한 카드만 테두리 색 바뀌도록 함. 클래스 바인딩을 객체 문법으로 쓰면 조건 여러 개 한 번에 처리 가능하다는 거 이번에 체감함.
- 온도 뱃지(`temp-badge--hot/warm/cool`)도 같은 방식으로 클래스 3개를 조건부로 토글.
- CitySearch.vue 컴포넌트 따로 만들어서 검색 입력창 구현. v-model 안 쓰고 `:value` + `@input`으로 직접 양방향 바인딩 흉내내봄. 근데 아직 WeatherMockup이랑 상태가 분리돼 있어서 검색해도 카드 목록엔 반영 안 됨 — 이건 2일차 computed에서 연결할 예정.
- 검색창은 flex로 가운데 정렬하고 입력창/버튼을 한 줄에 배치.

과제 요구사항 1번(배열 렌더링, v-for, key 바인딩)은 확인 결과 통과.

## 작업 일지 (2026-08-20)

Weather Composition 과제(2일차) 시작. computed/watch 붙이기 전에 구조부터 정리함.

- CitySearch.vue를 없애고 검색 상태를 WeatherMockup.vue 하나로 통합함. 컴포넌트 두 개로 나뉘어 있으니 검색어랑 날씨 목록이 서로 상태 공유가 안 돼서 필터링 자체가 불가능한 구조였음.
- 상태 이름을 과제 요구사항 이름에 맞춰 정리: `citySearch` → `searchQuery`, `selectedCity`(문자열) → `selectedCityInfo`(도시 객체 전체 저장). 이름 하나만 바꾼 게 아니라 selectedCityInfo는 나중에 watch에서 온도/습도까지 로그 찍으려고 객체로 통째로 저장하게 바꿈.
- `filteredWeatherList` computed 추가. `weatherList`를 `searchQuery` 기준으로 `filter` + `includes`. 검색어 빈 문자열일 때도 `''.includes('')`가 항상 true라서 if 분기 없이 전체 목록이 자연스럽게 나옴. (아직 템플릿에는 연결 안 함, v-for는 여전히 weatherList 참조 중)
- 입력창에 `@keyup.enter="searchCity"` 추가해서 Enter 키로도 검색되게 함.
- `selectedCityInfo` 감시하는 watch, `searchQuery` 추적하는 watchEffect 추가함. 콘솔에 각각 도시 선택 변경 로그 / 실시간 검색어 로그 찍힘.
- `v-for="weather in weatherList"` → `filteredWeatherList`로 교체해서 화면에 실제로 필터링 결과 반영되게 함.
- 검색 결과 없을 때 "일치하는 도시가 없습니다" 안내 문구 추가.

과제 요구사항 1~4번(반응형 상태 관리, computed 활용, watch/watchEffect, 검색 결과 표시)은 확인 결과 통과. 5번(본인만의 반응형 상태·computed·watcher 추가)은 아직 미착수.

## 작업 일지 (2026-08-21)

Weather Component 과제(3일차). WeatherMockup.vue 하나였던 걸 기능 변경 없이 4개 컴포넌트로 분리함.

- `WeatherMockup.vue` → `WeatherParent.vue`로 이름 변경, 상태·computed·watch/watchEffect는 그대로 유지 (요구사항 1)
- `BaseDashboardCard.vue` 새로 만듦. 제목+아이콘 헤더에 `<slot>`으로 내용물 자리 비워두는 공통 박스 컴포넌트 (요구사항 2)
- `SearchBar.vue`, `WeatherCard.vue` 새로 만듦. 둘 다 자기 상태 없이 props로 값 받고 emit으로 이벤트 올려보내는 방식 (`update:query`/`search`, `select-card`/`click-detail`)으로 WeatherParent와 통신 (요구사항 3, 4)
- 각 컴포넌트 담당 CSS를 원래 있던 WeatherParent.vue에서 잘라내서 각자 `<style scoped>`로 이관 (요구사항 5)
- SearchBar/WeatherCard가 BaseDashboardCard 슬롯 안에 있어도 WeatherParent가 직접 props/emit 바인딩 가능한 것 확인 — 슬롯 콘텐츠는 부모 스코프에서 평가되기 때문 (요구사항 6)

요구사항 1~6번 통과.

### 개인화: 최근 확인한 도시 (Miller's Law, 7±2)

전공(인지과학/심리학)에서 아이디어 가져옴 — 작업기억이 한 번에 담을 수 있는 항목 수가 제한적이라는 개념(Miller's Law)을 "최근 확인한 도시는 최대 5개까지만 보여준다"로 구현. 2일차 요구사항 5번(본인만의 상태·computed·watcher)과 3일차 요구사항 7번(본인 컴포넌트 추가)을 동시에 충족.

1. `recentlyViewed = ref([])` 상태 추가
2. 기존 `watch(selectedCityInfo)` 안에 로직 추가 — 새로 선택된 도시를 배열에서 중복 제거 후 맨 앞에 `unshift` (재클릭해도 중복 안 쌓이고, 가장 최근이 항상 맨 앞)
3. `recentCities` computed 추가 — `recentlyViewed`를 앞에서 5개만 `slice`
4. `recentlyViewed` 전용 watch 추가 — 목록 갱신될 때마다 콘솔 로그 (요구사항이 "watcher 추가"를 명시해서 기존 watch에 얹지 않고 새로 하나 더 만듦)
5. `RecentlyViewedList.vue` 새 컴포넌트 생성 — props로 `cities` 배열 받아서 칩(chip) 형태로 표시, 클릭하면 `select-card` emit
6. WeatherParent.vue에 세 번째 `BaseDashboardCard`(제목 "최근 확인한 도시" 🕓)로 감싸서 연결

과제 요구사항 전부(1일차 1번, 2일차 1~5번, 3일차 1~7번) 통과.

## 작업 일지 (2026-08-21, Weather Router 과제)

Weather Router 과제(4일차) 진행 중. `vue-router` 설치, `router/index.js` 라우트 4개(lazy loading + catch-all) 정의, `main.js`에 `app.use(router)` 연결, `App.vue`를 네비게이션 바 + `RouterView` 구조로 교체, `views/WeatherHomeView.vue` 작성(WeatherParent 기반, `showDetail`을 `router.push`로 교체)까지 완료.

`components/weather/` 폴더는 슬라이드 구조에 맞춰 `components/exercise/`로 이름 변경.

Weather Store 과제(Pinia)를 미리 고려해서, `WeatherDetailView.vue`가 필요로 하는 mock 데이터를 별도 JS 파일 대신 `stores/weatherStore.js`(Pinia store)로 뽑음. `WeatherHomeView.vue`의 로컬 `weatherList`를 제거하고 `weatherStore.weatherList`를 참조하도록 연결 완료. `WeatherDetailView.vue` 연결은 진행 중 (자세한 내용은 [TROUBLESHOOTING.md](TROUBLESHOOTING.md) 참고).

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
