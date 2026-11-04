---
year: 2026
month: 5
period: 2026.05
org: 111퍼센트 · 데이터 엔지니어
company: 111퍼센트
title: RAG 컨텍스트 지식 베이스 구축 및 통합
---

여러 에이전트가 함께 사용하는 RAG 컨텍스트를 BigQuery Vector Search 기반 지식 베이스로 통합하고, Text2SQL 응답 정확도를 70%에서 90%로 개선했습니다.

### 담당 업무
- 비즈니스 로직·Few-shot 예제·이벤트 로그·BigQuery 스키마를 수집해 카테고리별로 구조화
- 컨텍스트 수집 파이프라인을 구축하고 해시값 기반 변경 감지·업데이트 구현
- LLM으로 컨텍스트 설명을 자동 보강
- 기존 분석 쿼리를 정리해 Few-shot 예제 컨텍스트를 19개에서 49개로 확대
- Pgvector 기반 저장소를 BigQuery로 통합 이전
- BigQuery 데이터셋 내 임베딩 모델을 생성하고 컨텍스트 임베딩 적재
- BigQuery Vector Search로 질문 임베딩과 관련 컨텍스트를 비교·검색

### 성과
- Few-shot 예제 확대와 설명 보강으로 Text2SQL LLM 에이전트 응답 정확도 70% → 90% 개선
- Pgvector·개별 문서에 분산된 컨텍스트를 여러 에이전트가 공유·재사용하는 단일 체계로 통합
