---
year: 2026
month: 1
period: 2026.01부터 · 상시 운영
org: 111퍼센트 · 데이터 엔지니어
company: 111퍼센트
title: 마케팅 광고 데이터 수집 파이프라인 운영
current: true
---

광고 네트워크·퍼블리셔·MMP의 마케팅 데이터를 수집하는 파이프라인을 운영하고, 게임별 병렬 처리와 목적별 DAG 구조를 정비했습니다.

### 담당 업무
- Moloco, AppLovin, Unity Ads, Google Ads 등 광고 네트워크 API 기반 데이터 수집 파이프라인 운영
- Airflow에서 Cloud Run 작업을 실행해 게임별 Bundle ID 단위로 병렬 처리
- 네트워크사별 API 토큰 만료에 대응해 토큰 갱신·적용
- 단일 마케팅 DAG를 KPI·소재·리텐션 등 목적별 DAG로 분리·리팩터링
- AppsFlyer SSoT 데이터 수집 체계로 전환하고 기존 SKAN API 파이프라인 제거
- 신규 게임 소프트 런칭 시 마케팅 수집 파이프라인 적용
