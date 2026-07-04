---
year: 2022
month: 8
period: 2022.08 – 2022.11
org: (주)키다리스튜디오 · 데이터 엔지니어
company: (주)키다리스튜디오
title: GCP to AWS 서비스 데이터 마이그레이션
---

GCP에서 운영 중인 서비스 데이터를 AWS로 이전하는 프로젝트를 수행했습니다.

- GCP Datastore(NoSQL) + CloudSQL 데이터를 AWS RDS(MySQL)로 이관, 스키마 없는 NoSQL 데이터를 RDBMS 구조로 재설계 후 검증
- Hadoop oozie 기반 데이터 웨어하우스 파이프라인의 DB 엔드포인트·쿼리를 AWS RDS 기준으로 변경 및 운영 반영
- GCP App Engine 배치 작업의 엔드포인트·쿼리도 함께 변경
- 두 플랫폼에 분산되어 있던 데이터베이스를 하나로 통합해 관리 효율성 향상, 이관 100% 완료
