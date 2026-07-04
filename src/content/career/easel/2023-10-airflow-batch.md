---
year: 2023
month: 10
period: 2023.10 – 2024.08
org: (주)이젤 · 데이터 엔지니어
company: (주)이젤
title: Apache Airflow 배치 스케줄러 운영
---

AWS EC2 서버 환경에서 Docker 기반 Airflow를 구축·운영했습니다.

- 스크래퍼 실행 및 데이터 가공·적재를 위한 DAG를 각각 구성해 파이프라인 완성
- AWS EMR Cluster에서 Spark Application 실행, Airflow EMR Operator로 작업 시점에만 클러스터를 생성·종료해 비용 절감
- 운영 환경과 분리된 테스트 전용 Airflow 서버를 별도 EC2에 구축해 DAG 검증 안정성 확보
