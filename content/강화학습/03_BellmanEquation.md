---
title: 3. 벨만 방정식
---
## 3.1 벨만 방정식
주어진 정책 $\pi$ 의 상태별 밸류 $v_\pi(s)$를 구하는 것이 생각보다 어려운 일이다. 밸류를 계산하는 방법은 "벨만 방정식을 이용해서 구한다." 나 다름이 없을 정도로 강화학습에서 중요한 수식이다.

이후 다이나믹 프로그래밍<sup>dynamic programming</sup>을 이용하여 벨만 방정식을 반복적으로 사용하여 임의로 초기화 되어 있던 값들이 조금씩 실제 밸류에 가까워지는 방식에 대해 다룰것이다.

**재귀 함수**
피보나치 수열이 대표적인 예이다.

- 일반적인 함수로 표현
$$
\mathrm{fib}(n) = \frac{1}{\sqrt{5}}\left(\left(\frac{1+\sqrt{5}}{2}\right)^n-\left(\frac{1+\sqrt{5}}{2}\right)^n \right)
$$


- 재귀 함수로 표현

$$
\mathrm{fib}(n) = \mathrm{fib}(n-1) + \mathrm{fib}(n-2)
$$

현재 시점$(T)$ 다음 시점$(T+1$) 사이의 재귀적 관계를 이용해 정의하여 벨만 방정식을 사용한다.

---

<br>

### 벨만 기대 방정식

> [!quote] 0 단계
>$$
>v_\pi(s_t) = \mathbb{E}_\pi[r_{t+1}+\gamma v_\pi(s_{t+1})]
>$$
>$$
>q_\pi(s_t, a_t) = \mathbb{E}_\pi[r_{t+1}+\gamma q_\pi(s_{t+1},a_{t+1})]
>$$

> [!quote] 1 단계
>$$
>v_\pi(s) = \sum_{a \in A} \pi (a|s)q_\pi(s,a)
>$$
>$$
>q_\pi(s, a) = r^a_s + \gamma \sum_{s' \in S}P^a_{ss'}v_{\pi}(s')
>$$

> [!quote] 2 단계
>$$
>v_\pi(s) = \sum_{a \in A}\pi(a|s) \left(r^a_s + \gamma \sum_{s'\in S} P^a_{ss'}v_\pi(s') \right)
>$$
>$$
>q_\pi(s, a) = r^a_s + \gamma \sum_{s' \in S}P^a_{ss'} \sum_{a' \in A} \pi(a'|s')q_\pi(s', a')
>$$


**0 단계**
$$
v_\pi(s_t) = \mathbb{E}_\pi[r_{t+1}+\gamma v_\pi(s_{t+1})]
$$
$$
v_\pi(s_t) = \mathbb{E}_\pi[G_t]
$$ 

**1 단계**

**2 단계**




## 3.2 벨만 최적 방정식

### 최적 밸류와 최적 정책




### 벨만 최적 방정식


