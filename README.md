# Huistagram

## 기술스택

- Next.js (13.5.2)
- typescript (5.2.2)
- sanity (3.16.7) : 컨텐츠 관리를 위해 사용 (headless CMS)
- swr (^2.2.4) : 서버상태관리에 사용
- tailwindcss (3.3.3) : 스타일링을 빠르게 구현하기 위해 사용
- next-auth (^4.23.1) : OAuth서비스 이용
- react-icons (^4.11.0) : icon사용
- react-multi-carousel (^2.8.4) : following bar 캐러셀 구현
- react-spinners (^0.13.8) : 로딩 스피너에 사용

## 프로젝트 진행 목적

- Nextjs의 최신 버전인 13버전으로 인스타그램을 클론코딩하며 server component와 client component에 대한 이해를 위해 시작하였습니다.
- Next의 api 폴더를 활용해 직접 route를 구성하고 sanity를 통해 데이터를 받아오는 등 backend 지식을 넓혔습니다.
- UI로직과 비즈니스로직을 최대한 분리시켜 가독성과 재사용성을 고려하는 연습을 하였습니다.
- 반복되는 코드를 커스텀훅을 통해 코드 양을 줄이고 캡슐화 하여 사용하기 편하게 만드는 연습을 하였습니다.

## 기능

- OAuth : next-auth에서 제공하는 GoogleProvider를 활용하여 Google로그인이 가능합니다.
- Post 작성 : 이미지와 텍스트를 받아서 Post를 작성합니다.
- Followers Post 보기 : 친구들이 작성한 포스트를 모아서 봅니다.
- UserPage : 각 사용자가 올린 사진, 혹은 북마크하거나 좋아요를 누른 사진을 볼 수 있습니다.
- Follow : 친구를 follow / unfollow 할 수 있습니다.
- Search user : 사용자를 검색하여 follow 할 수 있습니다.
- Like & Bookmark : 모든 포스트에 대해 좋아요나 북마크를 지정할 수 있습니다.
- Comment : 모든 포스트에 대해 댓글을 입력할 수 있습니다.

## 성능개선

#### 검색기능

- 문제 : 검색 keyword를 입력하면, 매 순간 재 렌더링이 일어나고, swr을 통해 새로운 요청을 보내게 됨
- 해결 : 검색 keyword를 입력 받으면 약간의 딜레이를 가진 후 디바운스된 keyword를 반환하는 커스텀훅을 만들어 그것을 swr 쿼리 키로 전달함
- 짧은 순간에 입력되는 keyword는 디바운스 되지 않으므로 쿼리 키가 변하지 않아 새로운 요청을 보내지 않게 됨

</br>

#### 재렌더링 시 느린 반응

- 문제 : 커스텀 훅을 통해 bookmark와 like기능을 만들고, 또 다른 커스텀 훅을통해 post들을 불러오도록 만들었다. 이 때, 커스텀 훅 자체에도 복잡한 기능이 많아 재 렌더링 되면서 동작이 느려지게 되었다.
- 해결 : 커스텀 훅에서 사용되는 함수를 useCallback으로 감싸서 캐시되도록 했다. 이 경우 복잡한 로직을 모두 다시 불러오게 되므로 동일한 함수는 함수 자체가 캐시되도록 한 것이다.

</br>

#### like, bookmark의 느린 반응

- 문제 : like나 bookmark를 누르면 서버의 응답을 기다린 후 성공한 뒤 UI가 바뀌게 되어 딜레이가 체감되었다.
- 해결 : swr mutate의 optimisticData 기능을 활용하여 UI를 미리 변경 하고, 로직은 뒤에서 처리되도록 하였다.
- 만약 서버 응답이 실패하는 경우 rollbackOnError을 활용하여 원래대로 롤백 시킬수 있다.
