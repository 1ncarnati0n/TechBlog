# Phase 0 — TypeScript 마무리: 상세 요약 정리

> **학습 완료일:** 2026-04-01
> **공식 문서:** https://www.typescriptlang.org/docs/handbook/utility-types.html

---

## 0-1. Utility Types

> **핵심 개념:** 이미 만들어둔 타입을 **변형**하는 내장 도구

### 기본 타입 (예제 전체에서 사용)

```typescript
interface Project {
  name: string;
  status: string;
  budget: number;
  manager: string;
}
```

---

### Partial\<T\> — "모든 필드를 선택적으로"

```typescript
type EditableProject = Partial<Project>;

// 결과:
// {
//   name?: string;
//   status?: string;
//   budget?: number;
//   manager?: string;
// }
```

**사용 예시:** 수정(update) 시 일부 필드만 보낼 때

```typescript
function updateProject(id: string, changes: Partial<Project>) {
  // changes에는 바꾸고 싶은 필드만 넣으면 됨
}

updateProject("P001", { budget: 50000000 });           // ✅ 1개만 변경
updateProject("P001", { name: "강남", status: "시공중" }); // ✅ 2개만 변경
```

---

### Required\<T\> — "모든 필드를 필수로" (Partial의 반대)

```typescript
interface Draft {
  name?: string;
  status?: string;
  budget?: number;
  manager?: string;
}

type FinalProject = Required<Draft>;

// 결과: 모든 필드에서 ? 제거 → 전부 필수
// {
//   name: string;
//   status: string;
//   budget: number;
//   manager: string;
// }
```

**사용 예시:** 초안(Draft)을 최종 확정(Final)할 때

---

### Pick\<T, Keys\> — "이것만 뽑겠다"

```typescript
type ProjectSummary = Pick<Project, "name" | "status">;

// 결과:
// {
//   name: string;
//   status: string;
// }
```

**사용 예시:** 목록 화면에서 일부 필드만 표시할 때

```typescript
function renderList(projects: Pick<Project, "name" | "status">[]) {
  // name과 status만 사용
}
```

---

### Omit\<T, Keys\> — "이것만 빼겠다" (Pick의 반대)

```typescript
type ProjectWithoutBudget = Omit<Project, "budget">;

// 결과:
// {
//   name: string;
//   status: string;
//   manager: string;
// }
```

**사용 예시:** 민감한 정보(예산 등)를 제외하고 보여줄 때

---

### Record\<Keys, Value\> — "키-값 매핑 테이블"

```typescript
// 기본 사용: 키와 값의 타입만 지정
const price: Record<string, number> = {
  "사과": 1500,
  "바나나": 3000,
  "포도": 5000
};

// 키를 제한하면 더 안전
type Status = "설계중" | "시공중" | "완료";

const statusColor: Record<Status, string> = {
  "설계중": "#3B82F6",
  "시공중": "#F59E0B",
  "완료": "#10B981"
};
// → 세 가지 키가 모두 있어야 함. 하나라도 빠지면 에러!
```

**사용 예시:** 상태별 색상, 카테고리별 개수 등 매핑 테이블

---

### 5가지 비교표

| Utility Type | 하는 일 | 키워드 |
|-------------|--------|--------|
| `Partial<T>` | 모든 필드에 `?` 붙이기 | 선택적으로 |
| `Required<T>` | 모든 필드에서 `?` 떼기 | 필수로 |
| `Pick<T, K>` | 지정한 필드만 뽑기 | 이것만 뽑겠다 |
| `Omit<T, K>` | 지정한 필드만 빼기 | 이것만 빼겠다 |
| `Record<K, V>` | 키-값 매핑 객체 만들기 | 매핑 테이블 |

### 상황별 선택 가이드

| 상황 | 사용할 Utility Type |
|------|-------------------|
| 수정 폼에서 일부만 변경 | `Partial` |
| 초안을 최종 확정 | `Required` |
| 목록에서 일부 필드만 표시 | `Pick` |
| 민감 정보 제외하고 전달 | `Omit` |
| 상태별 색상/라벨 매핑 | `Record` |

---

## 0-2. Enum & Literal Types

> **핵심 개념:** 정해진 값만 허용하도록 제한하는 두 가지 방법

### 문자열 리터럴 유니온 타입

```typescript
type Status = "설계중" | "시공중" | "완료";

let current: Status = "설계중";  // ✅
let wrong: Status = "폐기";     // ❌ 에러! 허용된 값이 아님
```

**컴파일 후:** 완전히 사라짐 (0KB). 타입 검사만 빌드 시 수행.

---

### enum

```typescript
enum Status {
  Design = "설계중",
  Construction = "시공중",
  Complete = "완료"
}

let current = Status.Design;  // "설계중"
```

**컴파일 후 남는 JavaScript:**

```javascript
var Status;
(function (Status) {
  Status["Design"] = "설계중";
  Status["Construction"] = "시공중";
  Status["Complete"] = "완료";
})(Status || (Status = {}));
```

---

### 비교표

| | 리터럴 유니온 | enum |
|---|------------|------|
| 컴파일 후 | **사라짐 (0KB)** | JS 코드로 남음 |
| 번들 크기 | 가벼움 | 약간 추가됨 |
| 런타임 순회 | 불가능 | `Object.values(Status)` 가능 |
| **권장 상황** | **대부분의 경우** | 값 목록을 런타임에 써야 할 때 |

### 선택 기준

> 런타임에 값 목록이 필요한가?
> - **아니오** → 리터럴 유니온 (대부분의 경우)
> - **예** → enum

**Svelte와의 궁합:** Svelte는 컴파일러이므로 번들 크기 최소화가 중요 → **리터럴 유니온 타입 선호**

---

### 숫자 리터럴도 가능

```typescript
type Floor = 1 | 2 | 3 | 4 | 5;

let myFloor: Floor = 3;   // ✅
let wrong: Floor = 99;    // ❌ 에러!
```

---

### 실전 조합: 리터럴 유니온 + Record

```typescript
type Status = "설계중" | "시공중" | "완료";

const statusColor: Record<Status, string> = {
  "설계중": "#3B82F6",
  "시공중": "#F59E0B",
  "완료": "#10B981"
};
// 하나라도 빠뜨리면 TypeScript가 에러로 잡아줌
```

---

## 0-3. TypeScript + Svelte 맛보기

> **핵심:** `<script lang="ts">`만 추가하면 Svelte에서 TypeScript 사용 가능

### 기본 문법

```svelte
<!-- JavaScript (기본) -->
<script>
  let name = "설계팀";
</script>

<!-- TypeScript 사용 -->
<script lang="ts">
  let name: string = "설계팀";
</script>
```

### 실전 예시: 타입 + 인터페이스 + 컴포넌트

```svelte
<script lang="ts">
  type Status = 'ongoing' | 'finished';

  interface Project {
    name: string;
    status: Status;
  }

  let project: Project = {
    name: "강남 오피스",
    status: 'ongoing'
  };
</script>

<h1>{project.name}</h1>
<p>상태: {project.status}</p>
```

### 핵심 포인트

- `<script lang="ts">` 한 줄이면 TypeScript 활성화
- 기존에 배운 TypeScript 문법(인터페이스, 제네릭, 유니온 타입, Utility Types 등) **전부 그대로 사용**
- Svelte 컴파일러가 TypeScript도 함께 처리해줌

---

## Phase 0 핵심 키워드 정리

| 개념 | 한 줄 요약 |
|------|----------|
| `Partial<T>` | 모든 필드 선택적 (? 붙이기) |
| `Required<T>` | 모든 필드 필수 (? 떼기) |
| `Pick<T, K>` | 지정 필드만 뽑기 |
| `Omit<T, K>` | 지정 필드만 빼기 |
| `Record<K, V>` | 키-값 매핑 테이블 |
| 리터럴 유니온 | `"A" \| "B" \| "C"` — 컴파일 후 사라짐, 대부분 이걸 쓸 것 |
| enum | 런타임에 남음 — 값 목록 순회가 필요할 때만 |
| `<script lang="ts">` | Svelte에서 TypeScript 활성화 |

---

*출처: TypeScript 공식 문서 (typescriptlang.org/docs/handbook/utility-types.html)*
