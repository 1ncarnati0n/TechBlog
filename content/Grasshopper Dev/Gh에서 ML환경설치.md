Rhino8을 설치 후 
`C:\Users\내컴퓨터이름\.rhinocode\py39-rh8\Scripts` 폴더를 확인하면 
`pip.exe` 등의 파일들을 확인할 수 있다.

이후 윈도우의 CMD실행, `cd C:\Users\내컴퓨터이름\.rhinocode\py39-rh8\Scripts` 로 해당 디렉토리로 이동,

numpy와 scikit-learn 최신 버전 등 설치가 순조롭다. 
하지만 Pandas 에서 한국어 버전 윈도우 경우, 충돌이 있는 듯하다. 
그러므로 pandas 하위 버전에 맞는 버전을 설치함으로 해결하고 

*UTF-8* 문제는 pandas 임포트 시
```python
import locale
locale.setlocale(locale.LC_ALL, 'en_US.UTF-8')
```
코드로 해결.

간단한 KNN 알고리즘으로 테스트 해볼 수 있다.
```python
import locale
locale.setlocale(locale.LC_ALL, 'en_US.UTF-8')

import numpy as np
import pandas as pd

import sklearn
from sklearn import datasets
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score

print(f'numpy ver: {np.__version__}')
print(f'pandas ver: {pd.__version__}')
print(f'sklearn ver: {sklearn.__version__}')

# 데이터 로드
iris = datasets.load_iris()
X = iris.data
y = iris.target

# 데이터 분할
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# 모델 생성 및 학습
knn = KNeighborsClassifier(n_neighbors=3)
knn.fit(X_train, y_train)

# 예측
predictions = knn.predict(X_test)

# 정확도 계산
accuracy = accuracy_score(y_test, predictions)
print("정확도:", accuracy)

# 새로운 데이터 예측 테스트
new_data = [[5.1, 3.5, 1.4, 0.2]]  # 한 개의 꽃 데이터
prediction = knn.predict(new_data)
print("예측 결과:", prediction)
print("꽃 이름:", iris.target_names[prediction])
```

```bash
numpy ver: 1.23.5
pandas ver: 1.5.3
sklearn ver: 1.0.2
정확도: 1.0
예측 결과: [0]
꽃 이름: ['setosa']
```
결과값을 grasshopper python scripter로 확인해볼 수 있다.