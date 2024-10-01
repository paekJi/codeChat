# codeChat

### 프로젝트의 시작의 계기
##### 동료 개발자들과 네이트 온등 메신저로 소통하면서 생각보다 짧은 코드를 주고받는 일이 많았다.   업무 대화와 코드를 구분하기도 힘들뿐아니라 코드의 가독성이 매우 떨어진다는 문제가 있었다.   또한 주고 받는 코드 중 다시 확인하고 싶은 코드를 확인하는 것이 힘들었다. 떄문에 업무대화와 코드를 쉽게 구분해서 볼 수 있고 개발자들이 쉽게 간단한 코드를 주고받을 수 있는 메신저 프로그램을 만들어보고 싶었다.

### 프로젝트의 지향점 
- slack과 nateOn의 중간쯤 되는 desktop application
- 코드와 일반 대화의 쉬운 구분
- coding tool에 옮기지 않아도 쉽게 파악할 수 있는 가독성 확보
- 중요 코드 저장 및 전달 기능
- 로그인 보안 강화
- 트레픽 관리 (어뷰징 관리 등)


### 프로젝트 기본세팅  
#### SERVER
- node.js / express
- mongoDB
- morgan / winston logging 

#### CLIENT 
- electron
- react

#### 공통
- socket.io

### 인증 절차 구조 
- 비밀번호는 bcrypt을 사용하여 hashing
- access token / refresh token 각 토큰을 http only & secure cookies 로 관리


### 프로젝트에서 고민하는점 

