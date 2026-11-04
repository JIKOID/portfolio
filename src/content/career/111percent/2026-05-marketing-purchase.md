---
year: 2026
month: 5
period: 2026.05 – 2026.07
org: 111퍼센트 · 데이터 엔지니어
company: 111퍼센트
title: 마케팅 캠페인 구매 데이터 수집 파이프라인 구축
---

AppsFlyer 코호트 API와 Data Locker를 활용해 캠페인 구매 이벤트를 자동 수집하고, 마케팅팀이 직접 데이터를 조회할 수 있는 환경을 구축했습니다.

### 담당 업무
- 엑셀 수작업 집계를 Data Locker·AppsFlyer API 기반 자동 수집으로 전환
- 일별 파트너 집계 및 af_purchase 이벤트 기반 코호트 데이터 수집
- 매번 재집계되는 코호트 특성에 맞춰 파티션 교체(Partition-Replacement) 방식 적재 구조 설계
- 캠페인별 구매 유저 수·구매 금액 마트 생성 및 Looker Studio 연동

### 성과
- 게임별 4회 반복하던 수작업 집계를 자동화해 게임 수 증가에도 반복 작업 없이 대응
- 데이터 반영 주기를 기존 1~2일에서 당일로 단축
- 별도 데이터 요청 없이 마케팅팀이 자체 조회하는 Self-Service 체계 구축

### 데이터 정합성 이슈 대응
- Data Locker Actual Revenue 불일치를 확인하고 AppsFlyer 문의 티켓으로 원인 조사
- 네트워크별 AMM 약관 미동의 시 restricted 소스로 분류되어 일부 값이 집계되지 않는 문제 확인
- RAW 데이터 식별자 제한이 Data Locker 조회에 적용되며 대시보드에는 동일 제한이 없음을 확인
- 플랫폼별 약관 관리 부담을 고려해 해당 매출은 AppsFlyer 대시보드를 기준으로 확인하도록 결정
