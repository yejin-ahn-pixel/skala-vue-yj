# 트러블슈팅

작업하면서 만난 버그·에러들 원인이랑 해결 방법 정리. 작업 일지(README.md)에서 순수 버그 관련 내용만 뽑아옴.

## 1일차 — Weather Mockup

- **App.vue `id="app"` 중복**: index.html에도 이미 `id="app"` 마운트 포인트가 있어서 중첩되고 있었음. class도 아니고 굳이 필요 없는 거라 정리 대상.
- **온도 조건 참조 에러**: `weather.temp`라고 써야 하는데 `city.temp`라고 오타 냄 → `weather.temp`로 수정.

## 2일차 — Weather Composition

- **검색 버튼 누르면 입력값이 바로 지워지는 버그**: `searchCity()` 함수 마지막 줄에 `searchQuery.value = ''` 초기화 코드가 있어서, 검색 버튼 누르는 순간 입력창이 비워짐. 실시간 필터링(computed) 도입 후엔 이 초기화가 오히려 방해가 돼서 제거함.
- **v-if와 v-for를 같은 태그에 못 씀**: 검색 결과 없을 때 안내 문구를 카드 목록 div에 같이 걸려고 했는데, Vue 3 기준 v-if가 v-for보다 우선순위가 높아서 v-for로 만들어질 각 항목의 변수를 v-if 조건에서 못 씀. `<p v-if="filteredWeatherList.length === 0">`를 v-for 걸린 요소랑 별개 요소로 분리해서 해결.

## 3일차 — Weather Component

- **BaseDashboardCard.vue 첫 작성 시 props 선언 누락**: `<script setup>` 없이 템플릿에서 `title`/`icon`을 바로 썼음. Vue가 모르는 속성이라 컴포넌트가 인식 못 하고, 특히 `title`은 HTML 표준 속성이라 최상위 DOM 요소에 그대로 fallthrough돼서 마우스 올리면 브라우저 네이티브 툴팁으로 뜨는 부작용까지 있었음. `defineProps({ title, icon })` 추가로 해결. 같은 파일에서 `<style>`에 `scoped`도 빠져 있었음 → `<style scoped>`로 수정.
- **SearchBar.vue 첫 작성 시 문법 에러 5개**: ①`class="city-search` 닫는 따옴표 누락 (뒤 라인까지 파싱이 밀려서 엉뚱한 줄에서 에러 남) ②`@input=""emit(...)"` 이중 따옴표 ③`import { defineProps } from 'vue'` — `<script setup>`에서 `defineProps`/`defineEmits`는 컴파일러 매크로라 import하면 안 됨 ④`.city-search` 닫는 `</div>` 누락 ⑤`searchedCity` 표시하는 `<p>` 마크업 자체가 빠짐.
- **WeatherParent.vue 블록 교체 후 중복 렌더링**: SearchBar를 BaseDashboardCard 슬롯에 끼워 넣으면서, SearchBar 내부에 이미 있는 "입력한 도시" 문구를 WeatherParent 쪽에도 남겨둬서 화면에 두 번 뜸. 또 스타일을 SearchBar로 옮긴 뒤 `.city-search` 감싸는 wrapper div가 빈 껍데기로 남음. 둘 다 제거.
- **`const props = defineProps(...)` unused-vars 에러**: BaseDashboardCard.vue, SearchBar.vue 둘 다 `props` 변수에 할당은 했지만 스크립트 안에서 한 번도 안 씀 (템플릿에선 `props.` 없이 바로 접근 가능해서). `const props =` 없이 `defineProps(...)`만 호출하는 형태로 수정.

## 4일차 — Weather Router

- **router/index.js 파일명 불일치**: `/` 경로가 `views/HomeView.vue`를 가리키는데 실제로 만든 파일은 슬라이드 명세대로 `WeatherHomeView.vue`라 빌드 시 `UNRESOLVED_IMPORT` 에러. 라우터 설정 쪽 이름에 맞춰 파일명 통일 후, 다시 슬라이드 이름 기준으로 라우터 쪽을 `WeatherHomeView.vue`/`WeatherAboutView.vue`로 수정.
- **weather-detail 라우트 경로 오류**: `component: () => import('../components/exercise/WeatherDetailView.vue')`로 잘못된 폴더를 가리키고 있었음. 페이지 컴포넌트는 `views/`에 있어야 해서 `../views/WeatherDetailView.vue`로 수정.
- **WeatherDetailView.vue 작성 중 발견 (아직 미해결)**:
  - `mockWeatherList` 정의/import 안 됨 (`no-undef`) — 마운트 시 `ReferenceError` 예상. `WeatherHomeView.vue`의 `weatherList`와 데이터를 공유해야 하는데 아직 분리 안 됨 (Pinia store로 뽑을 예정).
  - `cityId`라는 이름을 로컬 `ref`와 `defineProps(['cityId'])` 양쪽에서 동시에 씀 (`vue/no-dupe-keys`) — 템플릿에서 어느 쪽을 가리키는지 충돌.
  - `useRoute()`로 받아온 `route` 변수가 한 번도 안 쓰임 — `props: true`로 이미 `cityId`를 prop으로 받고 있어서 중복된 접근 경로.
  - 로직 버그: `mockWeatherList.find(...)`로 도시 객체를 찾아놓고 맨 끝에 `?.id`를 붙여서 다시 id 문자열만 저장함 → 이름/온도/상태 등 실제 표시할 정보가 다 버려짐.
  - `<template>` 블록 자체가 아직 없어서 화면에 아무것도 안 그려짐.
