# IoTrust Frontend Practical Assignment

## 프로젝트 개요
본 프로젝트는 IoTrust 실기 과제로, 디센트(Decent) 모바일 앱의 Discovery 화면을 구현한 것입니다.  
React + TypeScript + TailwindCSS 기반으로 개발되었으며, 다양한 상황에서의 UI/UX, 컴포넌트 설계, 데이터 처리 능력을 확인하는 것이 목표입니다.

---

## 구현 목표
- **상단 배너**
  - 슬라이드 가능 (Swiper.js 사용)
  - CTA 버튼 클릭 시 전체 화면 로딩 표시
- **즐겨찾기 리스트**
  - 삭제 버튼 클릭 시 확인 팝업 후 삭제
- **dApp 리스트**
  - 언어, 플랫폼(Android/iOS), 환경(dev/stage/prod)에 따라 노출 여부 결정
  - 데이터 없는 경우 이용불가 메시지 표시

---

## 기술 스택
- React 19
- TypeScript
- TailwindCSS
- react-i18next (다국어)
- react-modal-sheet (바텀시트)
- Swiper.js (배너 슬라이드)
- Axios (API 통신)
- React-icons

---
## 설치 및 실행 방법
1.	레포지토리 클론
    ```bash
    git clone https://github.com/4uphwang/iotrust-discovery-kjh-20250906.git
    cd iotrust-discovery-kjh-20250906
    ```

2.	의존성 설치
    ```bash
    npm install 또는 yarn install
    ```
3.	환경변수 설정
    
    .env 파일 생성

    ```
	VITE_APP_ENV=dev
	VITE_API_BASE_URL=https://example.com/api        
    ```

4.	개발 서버 실행

    ```
    npm run dev 또는 yarn dev
    ```

5.	빌드

    ```
    npm run build 또는 yarn build
    ```
## 프로젝트 구조
- `src/components/` : 재사용 가능한 UI 컴포넌트 (ListItemCard, ListItemSheet, Banner 등)  
- `src/hooks/` : 커스텀 훅 (useDappsData 등)  
- `src/pages/` : 화면 단위 컴포넌트 (DiscoveryPage)  
- `src/services/` : API 호출 서비스 (DappService)  
- `src/types/` : TypeScript 타입 정의  
- `src/utils/` : 공통 유틸리티  
- `src/lib/` : 환경 설정 및 국제화 관련 모듈
	- `api.ts` : API 기본 설정 및 호출 함수
	- `i18n.ts` : 다국어 설정
	- `env.ts` : 환경별 상수 (dev/stage/prod)

---

## 구현 완료 사항
- 상단 배너 슬라이드 + CTA 버튼 전체 화면 로딩 표시  
- 즐겨찾기 리스트 삭제 기능 및 확인 팝업  
- 서비스 리스트 조건별 노출 (언어/플랫폼/환경)  
- 리스트 스켈레톤 + 애니메이션 적용
- 바텀시트 제스처로 닫을 수 있도록 구현  
- 다국어 지원 (한국어/영어 - 브라우저 언어 자동 감지)

---

## 추가 고려 사항
- 리스트 로컬 스토리지 캐싱 처리
- 일부 세부 UX 개선 가능 (예: 배너 자동 높이 조정)
- 테스트 파일 작성 (유닛 테스트 및 컴포넌트 테스트 추가 가능)
  - 유닛 테스트: 컴포넌트 단위 동작 검증 (ListItemCard, ListItemSheet)
  - 통합/화면 테스트: Discovery 화면 전체에서 필터링, 로딩, 스켈레톤 표시 동작 확인
  - 테스트 라이브러리: Jest + React Testing Library
- 상태 관리 개선
  - 현재는 useState / useEffect 중심, React Query 또는 SWR 사용 가능
  - API 캐싱 + 로딩/에러 상태 관리
- 추가 사용자 인터랙션
  - Swipe gesture: 즐겨찾기 삭제 시 스와이프 삭제
  - 터치/클릭 애니메이션: 버튼 클릭 시 간단한 피드백
  - Pull-to-Refresh: 리스트 상단에서 당겨 새로고침

---

### AI 도구 사용 기록

- AI 도구: ChatGPT

- 사용 목적 및 프롬프트:
	1.	과제 분석 및 구현 우선순위 설계
        -	프롬프트: "<과제 내용> 이 내용을 기반으로 필수 구현 항목과 선택 구현 항목을 체계적으로 정리하고 우선순위를 고려한 할 일 체크리스트를 생성해 각 항목별 중요도와 진행 순서를 포함하여 실무 프로젝트처럼 계획을 세워야한다"
	    -	사용 의도: 과제 진행 계획을 명확히 하고, 체계적 구현 순서 설계
	2.	조건별 Mock 데이터 설계
	    -	프롬프트: "언어(한국어/영어), 플랫폼(Android/iOS), 환경(dev/stage/prod) 조건을 모두 반영한 dApp 리스트 mock 데이터를 생성해. 각 항목의 설명도 언어별로 따로 제공하고, 지원하지 않는 언어의 항목은 제외하도록 해. 실무에서 API 테스트용 데이터 설계처럼 구성하고 싶다"
	    -	사용 의도: 다양한 조건에 따른 데이터 처리 및 테스트 환경 시뮬레이션
	3.	README 작성 및 기능 정리
	-	프롬프트: "현재 구현한 항목들을 기반으로 과제 README를 작성해. 구현 완료 기능과 추가 구현 가능하지만 구현하지 않은 기능을 명확히 구분하여 '추가 고려 사항'으로 정리하고, 구조화된 Markdown 형식으로 만들어 실무 문서처럼 보여주고 싶다"
	-	사용 의도: 문서화 품질 향상, 구현 현황 및 추가 개선 사항 명확히 기록