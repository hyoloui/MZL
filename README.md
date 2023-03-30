# MZL 왕초보 mz완성

<br>

[프로젝트 결과물 정리 Notion](https://www.notion.so/8c7f89e3837d40eeac0ad255d771c3af?pvs=4)

<hr>

<h3>📌 컨셉</h3>
<p align="center">
  <img src="https://user-images.githubusercontent.com/115724947/228865893-2b004f5b-bd42-43e7-90b5-98255f42f713.png" width="30%" />
</p>


- 시대의 흐름을 따라가기 힘들어 뒤쳐진 억지 신세대를 위한 **신조어 단어장** 앱입니다.
- 단어를 외울 때 포스트잇을 많이 사용하여 **포스트잇** 느낌으로 ui를 구성했습니다.
- 조 이름이 7면조이기 때문에 **7개의 면**으로 로고를 만들었습니다.


<h1>프로젝트 pages</h1>

![Home-Light](https://user-images.githubusercontent.com/115724947/227960276-62f46a86-9ffc-4e76-8afb-042e5434c4cd.png)

![Create](https://user-images.githubusercontent.com/115724947/227960256-4a9cadff-cf11-4917-b0e3-3800adf94c5c.png)

![Detail](https://user-images.githubusercontent.com/115724947/227960265-c98c2be4-e180-477d-89aa-7eb4d698769f.png)

![Auth](https://user-images.githubusercontent.com/115724947/227960270-d3758a9a-685c-4d18-82d0-9204b4b72104.png)




<h3>Preview iOS update</h3>

<h4>
Scan the following QR code with an iOS<br>device to open it in Expo Go or a development build.
</h4>
<image width='300px' src='https://qr.expo.dev/eas-update?updateId=598f9023-cee1-4181-bf17-e923d107e00d&appScheme=exp&host=u.expo.dev'>



<hr>

<h3>Preview Android update</h3>

<h4>
Scan the following QR code with an Android<br> device to open it in Expo Go or a development build.
</h4>
<image width='300px' src='https://qr.expo.dev/eas-update?updateId=7ceb3d0c-55b0-4843-9c5e-417b5e182c0d&appScheme=exp&host=u.expo.dev'>



<h2>🚨 필수기능</h2>

- **AuthLogin**
    - 회원 가입 / 로그인 / 로그아웃
        - auth - email 유효성검사 / pw 유효성검사(6글자 이상) (하단에 빨간색 글씨로 나타내기)
            1. 아이디가 email 형식이 아니면 “ID를 Email 형식으로 입력해주세요.”
            2. pw가 6글자 미만이면 “PW는 6글자 이상이여야 합니다.”
        - login - 아이디, 비밀번호 유효성검사 (하단에 빨간색 글씨로 나타내기)
            1. 아이디가 없으면 “없는 ID 입니다.”
            2. 아이디가 이메일이 아니면 “ID를 Email 형식으로 입력해주세요.”
            3. 비밀번호가 틀리면 “비밀번호가 맞지 않습니다.”
        
        - 기능 : 비로그인 상태로 글쓰기 누르면 로그인 화면으로 이동
    - UI
    
- **Home**
    - read
    - UI
    
- **Detail**
    - read 
    - update
    - delete
    - UI
    
- **Post**
    - create
    - 기능 : 유효성검사
    - UI 
    
- **+ 추가 기능**
    - 추천기능
    - 마이페이지
    - 퀴즈
