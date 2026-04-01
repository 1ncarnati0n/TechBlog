# Phase 1-1 — Basic Svelte: 소개 Introduction

> **학습 완료일:** 2026-04-01
> **공식 튜토리얼:** https://svelte.dev/tutorial/svelte/welcome-to-svelte
> **공식 문서:** https://svelte.dev/docs/svelte
> **레슨 범위:** 레슨 1~6

---

## 레슨 1: Welcome to Svelte — 컴파일러 vs 런타임

### 핵심 개념

Svelte는 **컴파일러**다. 빌드 시점에 코드를 순수 JavaScript로 변환하여, 브라우저에는 프레임워크 코드를 보내지 않는다.

### 건축 비유

| | 건축 비유 | 웹 개발 |
|---|---------|--------|
| **React (런타임)** | 현장 시공: 자재 + 크레인을 현장에 보냄 | 브라우저에 React 라이브러리(~40KB) + 앱 코드 전달 |
| **Svelte (컴파일러)** | 공장 프리캐스트(PC): 모듈만 현장에 운반 | 빌드 시 컴파일 → 순수 JS(~1.6KB)만 브라우저에 전달 |

### 번들 크기 비교

| 프레임워크 | Hello World 번들 크기 (gzip) |
|-----------|---------------------------|
| React | ~40KB |
| Vue | ~20KB |
| **Svelte** | **~1.6KB** |

---

## 레슨 2: Your first component — .svelte 파일의 3영역

### 핵심 개념

Svelte 컴포넌트(`.svelte` 파일)는 **세 영역**으로 구성된다. 세 영역 모두 **선택사항**이다.

```svelte
<script>
  // 1. JavaScript — 로직
</script>

<!-- 2. HTML — 화면 구조 (마크업) -->

<style>
  /* 3. CSS — 디자인 */
</style>
```

### React와의 차이

| | React | Svelte |
|---|-------|--------|
| 마크업 | JSX (JS 안에 HTML 비슷한 문법) | 순수 HTML |
| 스타일 | 별도 CSS 파일 또는 CSS-in-JS | 같은 파일 안 `<style>` 태그 |
| 로직 | JSX와 혼재 | `<script>` 태그에 분리 |

### 첫 번째 컴포넌트 예시

```svelte
<script>
  // 로직이 필요 없으면 비워두거나 생략 가능
</script>

<h1>첫 번째 Svelte 컴포넌트</h1>

<style>
  h1 {
    color: blue;
  }
</style>
```

---

## 레슨 3: Dynamic attributes — 중괄호 `{}` 바인딩

### 핵심 개념

`{}`는 **"여기에 JS 표현식을 넣겠다"**라는 의미. 변수, 연산, 함수 호출 등 **값을 반환하는 JS 표현식**이면 뭐든 들어간다.

### 텍스트에서 사용

```svelte
<script>
  let name = "설계팀";
  let count = 3;
</script>

<h1>{name} 프로젝트 {count + 1}건</h1>
<!-- 결과: "설계팀 프로젝트 4건" -->
```

### HTML 속성에서 사용

```svelte
<script>
  let src = "/photo.jpg";
</script>

<img src={src} alt="현장 사진">
```

### Shorthand attribute (축약 문법)

속성 이름과 변수 이름이 **같을 때** `속성이름=`을 생략 가능:

```svelte
<!-- 원래 방식 -->
<img src={src} alt="현장 사진">

<!-- 축약 방식 -->
<img {src} alt="현장 사진">
```

### {} 안에 들어갈 수 있는 것들

| 종류 | 예시 | 결과 |
|------|-----|------|
| 변수 | `{name}` | 변수값 표시 |
| 연산 | `{count + 1}` | 계산 결과 |
| 삼항 연산자 | `{active ? "활성" : "비활성"}` | 조건 결과 |
| 함수 호출 | `{name.toUpperCase()}` | 함수 반환값 |
| 템플릿 리터럴 | `{`${name}팀`}` | 문자열 조합 |

---

## 레슨 4: Styling — 스코프드 CSS

### 핵심 개념

Svelte의 CSS는 **해당 컴포넌트에만 적용**된다. 다른 컴포넌트에 영향을 주지 않는다.

### 건축 비유

> 각 세대(컴포넌트)의 인테리어(스타일)가 다른 세대에 영향을 주지 않는 것

### 작동 원리

Svelte 컴파일러가 빌드 시 **고유 클래스를 자동 부여**:

```svelte
<!-- 개발자가 작성하는 코드 -->
<p>부모 컴포넌트의 글자</p>

<style>
  p { color: red; }
</style>
```

```html
<!-- 브라우저에서 실제 렌더링되는 결과 -->
<p class="svelte-abc123">부모 컴포넌트의 글자</p>

<style>
  p.svelte-abc123 { color: red; }
</style>
```

### 스코프 확인 예시

```svelte
<!-- Parent.svelte -->
<script>
  import Child from './Child.svelte';
</script>

<p>나는 부모 컴포넌트의 글자</p>  <!-- 빨간색 ✅ -->
<Child />                        <!-- 영향 안 받음 -->

<style>
  p { color: red; }  <!-- Parent의 <p>에만 적용 -->
</style>
```

```svelte
<!-- Child.svelte -->
<p>나는 자식 컴포넌트의 글자</p>  <!-- 기본 검정색 -->
```

### 기본 CSS 속성 참고

| 속성 | 역할 | 예시 |
|------|------|-----|
| `color` | 글자 **색상** | `color: blue;` |
| `font-size` | 글자 **크기** | `font-size: 1rem;` |
| `font-weight` | 글자 **굵기** | `font-weight: bold;` |
| `background` | **배경** 색상 | `background: #f0f0f0;` |

> 주의: 글자 색상은 `font-color`가 아니라 **`color`**이다!

---

## 레슨 5: Nested components — 컴포넌트 import

### 핵심 개념

다른 컴포넌트를 가져와 사용하려면 **ES Modules의 `import` 문법**을 쓴다. 이것은 Svelte 전용이 아니라 **순수 JavaScript 표준 문법**이다.

```svelte
<script>
  import Child from './Child.svelte';
</script>

<Child />
```

### ES Modules 기본

```javascript
// 기본 내보내기 가져오기 (default import)
import Child from './Child.svelte';

// 이름 내보내기 가져오기 (named import)
import { writable } from 'svelte/store';

// 여러 개 가져오기
import { fade, slide } from 'svelte/transition';
```

### Svelte의 특징: 바닐라 JS에 가까움

Svelte는 JS 표준 문법을 최대한 그대로 활용한다:
- `import` → 표준 ES Modules
- `{}` 표현식 → 표준 JS 표현식
- `<style>` → 표준 CSS
- HTML → 표준 HTML

---

## 레슨 6: HTML tags — {@html}과 XSS 보안

### 핵심 개념

`{}`는 기본적으로 내용을 **텍스트로 안전하게** 표시한다. HTML을 HTML로 렌더링하려면 `{@html}`을 사용한다.

### 기본 동작: 텍스트로 표시 (안전)

```svelte
<script>
  let content = "<strong>굵은 글씨</strong>";
</script>

<p>{content}</p>
<!-- 화면: <strong>굵은 글씨</strong> (태그가 텍스트로 보임) -->
```

### {@html}: HTML로 렌더링

```svelte
<p>{@html content}</p>
<!-- 화면: **굵은 글씨** (HTML로 해석됨) -->
```

### XSS(Cross-Site Scripting) 보안

| 방법 | 동작 | 보안 | 사용 시점 |
|------|------|------|----------|
| `{value}` | 텍스트로 표시 | **안전** (자동 이스케이프) | 기본적으로 항상 |
| `{@html value}` | HTML로 렌더링 | **위험** (스크립트 실행 가능) | 신뢰할 수 있는 콘텐츠만 |

### 건축 비유

> `{}` = **방화문** (기본 보호, 항상 닫혀 있음)
> `{@html}` = **방화문을 여는 것** (필요할 때만, 안전 확인 후)

### 사용 원칙

```svelte
<!-- ✅ 안전: 사용자 입력은 항상 {} -->
<p>{userComment}</p>

<!-- ⚠️ 주의: 신뢰할 수 있는 콘텐츠만 {@html} -->
<div>{@html adminNotice}</div>

<!-- ❌ 위험: 사용자 입력에 {@html} 절대 금지 -->
<div>{@html userComment}</div>
```

---

## Phase 1-1 전체 핵심 키워드

| 레슨 | 핵심 키워드 | 한 줄 요약 |
|------|-----------|----------|
| 1. Welcome | 컴파일러 | Svelte는 빌드 시 순수 JS로 변환하는 컴파일러 |
| 2. First component | 3영역 | `.svelte` = `<script>` + HTML + `<style>` (모두 선택) |
| 3. Dynamic attributes | `{}` 바인딩 | JS 표현식을 HTML에 넣는 방법, shorthand 축약 |
| 4. Styling | 스코프드 CSS | 컴포넌트의 CSS는 해당 컴포넌트에만 적용 |
| 5. Nested components | ES Modules import | `import`는 JS 표준 문법, Svelte 전용이 아님 |
| 6. HTML tags | `{@html}`, XSS | 기본은 안전한 텍스트, HTML 렌더링은 신뢰 콘텐츠만 |

---

## 함께 배운 JS/웹 기초 개념

| 개념 | 설명 |
|------|------|
| 컴파일러 vs 런타임 | 빌드 시 처리(Svelte) vs 브라우저에서 실행(React) |
| HTML 태그 구조 | 여는 태그/닫는 태그, self-closing vs 콘텐츠 담는 태그 |
| CSS 기초 속성 | `color`(글자색), `font-size`(크기), 선택자 |
| CSS 스코핑 | 전역 CSS vs 컴포넌트 스코프드 CSS |
| ES Modules | `import`/`export` — JS의 표준 모듈 시스템 |
| XSS 보안 | 사용자 입력의 HTML 삽입 공격과 방어 |
| 표현식(expression) | 값을 반환하는 JS 코드 (변수, 연산, 함수 호출 등) |

---

*출처: Svelte 공식 튜토리얼 (svelte.dev/tutorial)*
