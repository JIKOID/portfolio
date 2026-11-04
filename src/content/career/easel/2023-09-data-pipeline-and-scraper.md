---
year: 2023
month: 9
period: 2023.09 – 2024.08
org: (주)이젤 · 데이터 엔지니어
company: (주)이젤
title: 데이터 파이프라인 구축 및 운영
---

옥션 사이트에서 수집한 데이터를 정규화·통합하고, AWS EMR 기반 PySpark로 가공·적재하는 ETL 파이프라인을 구축·운영했습니다.

### 담당 업무
- 데이터 스크랩·저장 단계와 가공·웨어하우스 적재 단계를 구분한 파이프라인 구성
- PySpark Application으로 수집 데이터 정규화 및 목적별 통합
- AWS EMR Cluster에서 Spark Application 분산 처리
- Primary·Core·Task Node 리소스 설정, Executor 개수·메모리 및 파티션 수를 반복 테스트·조정

### 문제 해결
메모리 부족으로 Executor가 비정상 종료되는 문제를 분석하고, 리소스에 맞는 Executor 수와 파티션 수를 최적화해 안정적인 분산 처리를 구현했습니다.
