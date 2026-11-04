---
year: 2022
month: 4
period: 2022.04 – 2022.11
org: (주)키다리스튜디오 · 데이터 엔지니어
company: (주)키다리스튜디오
title: 데이터 웨어하우스 플랫폼 운영
---

AWS EC2 기반 Hadoop 클러스터와 HDFS·S3 데이터 웨어하우스를 운영하고, Scala 기반 SparkSQL ETL 및 배치 파이프라인을 관리했습니다.

### 담당 업무
- HDFS·Hue·Oozie·Hive·Spark·Presto 등 Hadoop 생태계 운영
- Scala 기반 SparkSQL ETL 스크립트 작성 및 GitLab을 통한 Spark Application 빌드·배포
- Oozie workflow·coordinator 정의, Hue를 통한 쿼리·워크플로우·스케줄 관리
- HiveQL 및 Presto 기반 데이터 조회·ad-hoc 분석
- 파이프라인 작업 이슈 개선 및 작업 실패 후 데이터 복구

### 성능 개선
Hive Metastore에서 약 7만 개 파티션을 동적으로 검색하며 7시간 동안 실행되다 실패하던 작업을 정적 파티셔닝으로 전환해, 처리 시간을 3분 이내로 단축했습니다.

### 기술 검증
AWS Glue 기반 파이프라인 이관 PoC를 수행했습니다. 멀티 리전 운영 환경에서 리전별 개별 관리 부담을 확인하고 도입을 보류했습니다.
