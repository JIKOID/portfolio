---
year: 2022
month: 4
period: 2022.04 – 2022.11
org: (주)키다리스튜디오 · 데이터 엔지니어
title: 하둡 데이터 웨어하우스 운영 및 배치 스케줄러 운영
---

AWS EC2 기반 Hadoop 클러스터로 데이터 웨어하우스를 운영했습니다.

- HDFS, Hue, Oozie, Hive, Spark, Presto 등 하둡 에코시스템 운영, Scala 기반 SparkSQL로 ETL 스크립트 작성
- Hive Metastore에서 약 7만 개 파티션 동적 검색으로 인한 7시간 소요 작업을 정적 파티셔닝으로 전환해 3분 이내로 단축
- AWS Glue 기반 파이프라인 이관 PoC 진행 후 멀티 리전 운영 특성상 보류, 운영 노하우는 확보
- Rundeck, GCP App Engine Cron Job, MySQL 이벤트/프로시저 등 다양한 방식의 배치 작업 운영
- 데이터 웨어하우스 집계 데이터를 Data Mart에 적재하고 Tableau로 분석·시각화
- NAS/LDAP/NAC/DHCP/VPN/UTM 등 사내 인프라 및 Jira/Slack/G-Suite 그룹웨어 운영, Django 기반 사내 관리자 웹 고도화
