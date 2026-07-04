---
year: 2025
month: 1
period: 2025.01 – 2025.03
org: 두핸즈 · 데이터 엔지니어
company: 두핸즈
title: 통계 서비스 API 서버 이관
---

모놀리식 아키텍처에서 MSA로 전환하면서 통계 서비스 API 서버를 Node.js에서 Python FastAPI로 이관했습니다.

- 통계 서비스 관련 API 분석 및 쿼리 최적화, 통계 서비스 데이터 마트 구축
- Node.js → FastAPI 마이그레이션, AWS EKS 기반 배포
- 인증, Swagger/API Docs, Health Check 등 Node.js 생태계에서 라이브러리로 처리하던 기능을 FastAPI 환경에 맞게 직접 구현
- 서브 쿼리 제거 및 데이터 마트 도입 등 쿼리 최적화로 실행 속도 약 2배 개선, 잦은 timeout 문제 해결
