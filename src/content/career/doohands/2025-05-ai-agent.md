---
year: 2025
month: 5
period: 2025.05 – 2025.09
org: 두핸즈 · 데이터 엔지니어
title: AI Agent 개발
---

사내 업무 효율성 증대를 위해 슬랙 기반 AI Agent를 설계·개발했습니다.

- 여러 LLM(ChatGPT, Gemini, Claude, Llama 등)을 비교 테스트해 비용 대비 성능이 좋은 Gemini 2.5 Flash 채택
- 초기 RAG 설계에서 LangGraph + LangChain Tool Calling 기반 워크플로우로 전환, few-shot 프롬프팅으로 답변 정확도 50%→80%대까지 약 30% 향상
- Text-to-SQL로 질문에 맞는 쿼리를 생성하고 결과 기반 답변 생성
- FastAPI 기반 API 서버 개발, 슬랙 소켓 서버와 연동해 멘션 기반 실시간 응답 구현
- BigQuery로 데이터 마트 구축
- 슬랙 멘션만으로 사내 데이터에 접근해 답변을 받을 수 있게 되어 업무 효율성 및 데이터 기반 의사결정 환경 개선
