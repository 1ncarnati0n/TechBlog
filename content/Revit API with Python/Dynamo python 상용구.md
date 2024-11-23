

```python
import clr 
# .NET의 Common Language Runtime. 여러 다른 언어의 코드를 실행할 수 있는 실행 환경.
import sys
# sys는 기본 파이썬 라이브러리-여기서는 표준 IronPython 라이브러리를 로드하는 데 사용.
sys.path.append('C:\Program Files (x86)\IronPython 2.7\Lib')
# 서버, 암호화, 정규표현식까지 모든 것을 다루는 표준 IronPython 라이브러리를 가져옴.
import System
#.NET의 루트에 있는 System 네임스페이스.
from System import Array
# 배열 정보를 처리하기 위한 .NET 클래스.
from System.Collections.Generic import *
# 제네릭을 처리할 수 있게 해줌. 
# Revit의 API는 때때로 IList라고 불리는 하드타입의 '제네릭' 리스트를 원한다. 
# 이것이 필요하지 않다면 이 줄을 삭제해도 됨.
clr.AddReference('ProtoGeometry')
# Dynamo의 프록시 지오메트리 클래스를 위한 라이브러리. 
# 지오메트리와 상호 작용하는 경우에만 이것이 필요.
from Autodesk.DesignScript.Geometry import *
# Dynamo의 지오메트리 라이브러리에 있는 모든 것을 로드.
clr.AddReference("RevitNodes")
# Revit을 위한 Dynamo의 노드.
import Revit # RevitNodes에서 Revit 네임스페이스를 로드.
clr.ImportExtensions(Revit.Elements) # Dynamo의 Revit 라이브러리를 더 로드한다.
clr.ImportExtensions(Revit.GeometryConversion)
# Dynamo의 Revit 라이브러리를 더 로드. 지오메트리와 상호 작용하는 경우만 필요.
clr.AddReference("RevitServices")
# Revit 문서를 처리하기 위한 Dynamo의 클래스들.
import RevitServices
from RevitServices.Persistence import DocumentManager  
# Dynamo가 현재 연결되어 있는 문서를 추적하는 Dynamo의 내부 클래스.
from RevitServices.Transactions import TransactionManager 
# Revit 문서의 데이터베이스를 변경하기 위해 트랜잭션을 열고 닫는 Dynamo 클래스.

clr.AddReference("RevitAPI") # Revit의 API DLL에 대한 참조를 추가함.
clr.AddReference("RevitAPIUI") #Revit의 API DLL에 대한 참조를 추가.

import Autodesk # Autodesk 네임스페이스를 로드.
from Autodesk.Revit.DB import * # Loading Revit's API classes
from Autodesk.Revit.UI import * # Loading Revit's API UI classes

doc = DocumentManager.Instance.CurrentDBDocument 
# 활성 Revit 문서에 대한 핸들 설정
uiapp = DocumentManager.Instance.CurrentUIApplication 
# 활성 Revit UI 문서에 대한 핸들 설정
app = uiapp.Application 
# 현재 열려 있는 Revit 애플리케이션 인스턴스에 핸들 설정
uidoc = uiapp.ActiveUIDocument
# 현재 열려 있는 Revit UI 애플리케이션 인스턴스에 핸들 설정

####### OK NOW YOU CAN CODE ########
```

Dynamo 2.0에서 Python [**스크립트 템플릿**](https://primer2.dynamobim.org/v/ko/8_coding_in_dynamo/8-3_python/3-python-templates)이 도입되었다. 이를 설정하면 Dynamo가 모든 Python 노드에 자동으로 보일러플레이트를 추가하게 되어, 많은 복사 및 붙여넣기 작업을 절약할 수 있다.

필요하지 않은 클래스는 임포트하지 않는다.

"From [namespace] import"  *는 모든 것을 임포트하는 무차별적인 방법으로, 수십 또는 수백 개의 불필요한 클래스를 로드하게 되어 코드의 속도를 늦출 것이다.*
