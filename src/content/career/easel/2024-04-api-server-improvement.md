---
year: 2024
month: 4
period: 2024.04 – 2024.06
org: (주)이젤 · 데이터 엔지니어
company: (주)이젤
title: 데이터 API 서버 고도화
---

데이터 API 서버의 계산 성능과 처리량, 안정성을 개선했습니다.

- Pandas → Polars 마이그레이션으로 병렬 처리 지원, Pandas 대비 4~5배 속도 개선
- 분산 처리를 위한 다중 서버 구축, Auto Scaling Group으로 사용량 기반 스케일 아웃, PostgreSQL connection pool 적용
- EC2 메트릭 기반 CloudWatch 경보 생성, 접속 불가 시 자동 재시작 및 Docker 컨테이너 재기동 설정
