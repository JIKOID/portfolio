export interface ArchitectureNode {
  title: string
  detail: string
}

export interface ProjectBlueprint {
  diagramTitle: string
  nodes: ArchitectureNode[]
  orchestration?: string
  outcome: string
  outcomeLabel: string
  outcomeHeading?: string
  parallel?: boolean
  returnPath?: string
}

// 이력서와 업무 정리의 각 항목에 대응하는 구성도입니다. PoC는 실제 도입 여부를 구분합니다.
export const projectBlueprints: Record<string, ProjectBlueprint> = {
  "GCP to AWS 서비스 데이터 마이그레이션": {
    "diagramTitle": "서비스 데이터 이전 흐름",
    "nodes": [
      {
        "title": "GCP",
        "detail": "Datastore · CloudSQL"
      },
      {
        "title": "스키마 재설계",
        "detail": "NoSQL → 관계형 구조 변환·검증"
      },
      {
        "title": "AWS RDS",
        "detail": "MySQL로 데이터 통합"
      }
    ],
    "orchestration": "웨어하우스 및 App Engine 배치의 엔드포인트·쿼리 함께 전환",
    "outcome": "데이터 이관 완료",
    "outcomeLabel": "분산된 데이터베이스를 통합해 관리 효율 개선"
  },
  "Apache Airflow 배치 스케줄러 운영": {
    "diagramTitle": "배치 작업 실행 구조",
    "orchestration": "AWS EC2 · Docker 기반 Airflow / 운영과 테스트 환경 분리",
    "nodes": [
      {
        "title": "수집 DAG",
        "detail": "스크래퍼 실행"
      },
      {
        "title": "가공·적재 DAG",
        "detail": "EMR Operator로 작업 제어"
      },
      {
        "title": "AWS EMR",
        "detail": "Spark Application 실행"
      }
    ],
    "outcome": "필요한 시점에만 실행",
    "outcomeLabel": "EMR 클러스터 생성·종료 자동화로 비용 절감"
  },
  "데이터 API 서버 고도화": {
    "diagramTitle": "API 서버를 구성하는 주요 요소",
    "nodes": [
      {
        "title": "EC2 · Auto Scaling",
        "detail": "다중 서버 · 사용량 기반 확장"
      },
      {
        "title": "Polars",
        "detail": "병렬 데이터 연산"
      },
      {
        "title": "PostgreSQL",
        "detail": "Connection pool 적용"
      }
    ],
    "parallel": true,
    "orchestration": "CloudWatch 경보 · 서버 및 Docker 컨테이너 자동 재기동",
    "outcome": "연산 속도 4~5배",
    "outcomeLabel": "Pandas에서 Polars로 전환해 계산 성능 개선"
  },
  "데이터 파이프라인 구축": {
    "diagramTitle": "운영과 분석을 분리한 데이터 파이프라인",
    "orchestration": "Airflow · S3 → 웨어하우스 → 데이터 마트 적재 자동화",
    "nodes": [
      {
        "title": "운영 DB",
        "detail": "서비스 데이터"
      },
      {
        "title": "Delta Lake · S3",
        "detail": "일자별 증분 적재"
      },
      {
        "title": "PostgreSQL",
        "detail": "온프레미스 · Docker DW"
      },
      {
        "title": "Data Mart",
        "detail": "목적별 분석 데이터"
      },
      {
        "title": "데이터 분석",
        "detail": "운영 DB 직접 조회 분리"
      }
    ],
    "outcome": "분석 조회 부하 제거",
    "outcomeLabel": "운영 서비스에 부담 없이 분석할 수 있는 환경 구축"
  },
  "Redash 대시보드 구축": {
    "diagramTitle": "반복 데이터 요청의 대시보드 전환",
    "nodes": [
      {
        "title": "데이터 파이프라인",
        "detail": "정기 데이터 적재"
      },
      {
        "title": "Data Mart",
        "detail": "대시보드용 데이터 설계"
      },
      {
        "title": "Redash",
        "detail": "온프레미스 서버"
      },
      {
        "title": "사내 대시보드",
        "detail": "필요한 데이터 직접 조회"
      }
    ],
    "outcome": "데이터 문의 약 90% 감소",
    "outcomeLabel": "반복 문의를 대시보드로 제공해 데이터팀 리소스 효율화"
  },
  "고객사 리포트": {
    "diagramTitle": "고객사 리포트 제공 흐름",
    "nodes": [
      {
        "title": "사내 데이터",
        "detail": "고객사별 데이터"
      },
      {
        "title": "추출·가공",
        "detail": "리포트용 추출 자동화"
      },
      {
        "title": "정합성 검증",
        "detail": "제공 데이터 검증"
      },
      {
        "title": "고객사 리포트",
        "detail": "선정 고객사 5곳에 제공"
      }
    ],
    "outcome": "5개 고객사에 제공",
    "outcomeLabel": "데이터 검증과 리포트를 통해 고객 신뢰도 향상에 기여"
  },
  "실시간 그라파나 대시보드 구축": {
    "diagramTitle": "물류센터 작업 현황 시각화 흐름",
    "nodes": [
      {
        "title": "물류 작업 데이터",
        "detail": "실시간 현황"
      },
      {
        "title": "쿼리 최적화",
        "detail": "쿼리 스트리밍으로 추출"
      },
      {
        "title": "Grafana",
        "detail": "온프레미스 · Docker"
      },
      {
        "title": "센터별 대시보드",
        "detail": "작업 현황과 인력 배치 확인"
      }
    ],
    "outcome": "쿼리 실행 1초 이내",
    "outcomeLabel": "엑셀 수작업 현황 관리를 실시간 대시보드로 전환"
  },
  "통계 서비스 API 서버 이관": {
    "diagramTitle": "통계 서비스 데이터 제공 구조",
    "orchestration": "Node.js → Python FastAPI 마이그레이션 / AWS EKS 배포",
    "nodes": [
      {
        "title": "통계 Data Mart",
        "detail": "통계 서비스용 데이터 설계"
      },
      {
        "title": "FastAPI",
        "detail": "쿼리 최적화 · 인증 · Health Check"
      },
      {
        "title": "통계 서비스",
        "detail": "안정적인 API 응답 제공"
      }
    ],
    "outcome": "쿼리 실행 속도 약 2배",
    "outcomeLabel": "서브 쿼리 제거와 데이터 마트 도입 · 잦은 timeout 해결"
  },
  "AI Agent 개발": {
    "diagramTitle": "슬랙에서 사내 데이터를 조회하는 AI Agent",
    "orchestration": "Gemini 2.5 Flash · Few-shot prompting",
    "nodes": [
      {
        "title": "Slack",
        "detail": "멘션으로 질문 입력"
      },
      {
        "title": "FastAPI",
        "detail": "슬랙 소켓 서버 연동"
      },
      {
        "title": "LangGraph",
        "detail": "LangChain Tool Calling · Text-to-SQL"
      },
      {
        "title": "BigQuery",
        "detail": "사내 데이터 마트 조회"
      }
    ],
    "returnPath": "조회 결과를 바탕으로 답변 생성 → Slack 응답",
    "outcome": "답변 정확도 50% → 80%대",
    "outcomeLabel": "사내 데이터 접근과 업무 의사결정 지원"
  },
  "데이터 마트 마이그레이션 (On-Premise to AWS RDS)": {
    "diagramTitle": "온프레미스 데이터 마트의 클라우드 이전",
    "nodes": [
      {
        "title": "온프레미스 DB",
        "detail": "기존 데이터 마트"
      },
      {
        "title": "구조 정비",
        "detail": "테이블 정리 · 네이밍 통일"
      },
      {
        "title": "AWS RDS",
        "detail": "파이프라인 적재 대상 전환"
      },
      {
        "title": "Redash",
        "detail": "데이터 소스 · 쿼리 변경"
      }
    ],
    "outcome": "AWS RDS 이관·구조 정비",
    "outcomeLabel": "리소스 부족·정합성 문제에 대응하고 유지보수 부담 완화를 목표로 이관"
  },
  "데이터 웨어하우스 플랫폼 운영": {
    "diagramTitle": "Hadoop 데이터 처리 및 작업 배포 구성",
    "nodes": [
      {
        "title": "GitLab",
        "detail": "Spark Application 빌드·배포"
      },
      {
        "title": "Scala · SparkSQL",
        "detail": "ETL 작업 실행"
      },
      {
        "title": "HDFS · S3",
        "detail": "데이터 웨어하우스 저장"
      },
      {
        "title": "Hive · Presto",
        "detail": "메타데이터 관리·분석"
      }
    ],
    "outcome": "7시간 → 3분 이내",
    "outcomeLabel": "약 7만 개 파티션 검색의 병목을 정적 파티셔닝으로 개선",
    "orchestration": "Oozie workflow·coordinator / Hue 스케줄 관리"
  },
  "배치 작업 스케줄러 플랫폼 운영": {
    "diagramTitle": "환경별 배치 실행 구성",
    "nodes": [
      {
        "title": "Rundeck",
        "detail": "Python 작업 실행·코드 백업"
      },
      {
        "title": "App Engine",
        "detail": "API 서버 · Cron Job"
      },
      {
        "title": "MySQL",
        "detail": "이벤트·프로시저 기반 배치"
      }
    ],
    "outcome": "다양한 배치 환경 운영",
    "outcomeLabel": "실행 환경별 제약에 대응해 작업 소스와 스케줄 관리",
    "parallel": true
  },
  "데이터 마트 집계·적재 및 분석 플랫폼 운영": {
    "diagramTitle": "집계 데이터 제공 흐름",
    "nodes": [
      {
        "title": "Data Warehouse",
        "detail": "원천 데이터 추출"
      },
      {
        "title": "Batch Job",
        "detail": "가공·정기 적재"
      },
      {
        "title": "Data Mart",
        "detail": "목적별 집계 데이터"
      },
      {
        "title": "Tableau",
        "detail": "분석·시각화"
      }
    ],
    "outcome": "정기 집계·시각화 제공",
    "outcomeLabel": "분석 목적의 데이터 가공부터 데이터 마트·Tableau 운영"
  },
  "인프라 운영 및 그룹웨어 관리": {
    "diagramTitle": "사내 운영 환경 구성",
    "nodes": [
      {
        "title": "NAS · 네트워크",
        "detail": "LDAP·NAC·DHCP·VPN·UTM"
      },
      {
        "title": "그룹웨어",
        "detail": "Jira·Slack·G-Suite"
      },
      {
        "title": "Django",
        "detail": "관리자 기능·Modal View 개선"
      }
    ],
    "outcome": "인프라부터 관리자 웹까지",
    "outcomeLabel": "사내 시스템 운영과 관리자 웹 기능·사용성 개선",
    "parallel": true
  },
  "Data Scraper 개발 및 고도화": {
    "diagramTitle": "옥션 데이터 수집과 구조화",
    "nodes": [
      {
        "title": "옥션 사이트",
        "detail": "데이터 소스"
      },
      {
        "title": "BeautifulSoup4 · Selenium",
        "detail": "수집·스크래퍼 정상화"
      },
      {
        "title": "LangChain · OpenAI",
        "detail": "Pydantic 기반 추출·번역"
      },
      {
        "title": "Amazon S3",
        "detail": "원본 수집·가공 단계 분리"
      }
    ],
    "outcome": "한국어 번역 정확도 80%+",
    "outcomeLabel": "프롬프트 검증과 데이터 레이크 전환으로 수집 품질 개선"
  },
  "데이터 파이프라인 구축 및 운영": {
    "diagramTitle": "수집 데이터를 웨어하우스로 적재하는 흐름",
    "nodes": [
      {
        "title": "수집 데이터",
        "detail": "옥션 데이터 스크랩·저장"
      },
      {
        "title": "EMR · PySpark",
        "detail": "데이터 정규화·통합"
      },
      {
        "title": "Data Warehouse",
        "detail": "가공 데이터 적재"
      }
    ],
    "outcome": "Spark 분산 처리 안정화",
    "outcomeLabel": "Executor·노드 리소스·파티션 수 조정으로 비정상 종료 문제 개선"
  },
  "데이터 웨어하우스 제안 및 도입": {
    "diagramTitle": "웨어하우스 재구축 과정",
    "nodes": [
      {
        "title": "기존 파이프라인",
        "detail": "정합성·신뢰성 문제 파악"
      },
      {
        "title": "모델링 · ERD",
        "detail": "목적별 단계·구조 정의"
      },
      {
        "title": "테스트 PoC",
        "detail": "이슈 검토·개선"
      },
      {
        "title": "AWS RDS",
        "detail": "검증 후 웨어하우스 재구축"
      }
    ],
    "outcome": "모델링·ERD 설계 50% 기여",
    "outcomeLabel": "비용을 고려한 설계와 PoC 검증을 거쳐 재구축"
  },
  "사내 데이터 분석 플랫폼 개발": {
    "diagramTitle": "사내 분석 화면 구성",
    "nodes": [
      {
        "title": "분석 데이터",
        "detail": "테이블·그래프용 데이터"
      },
      {
        "title": "Streamlit",
        "detail": "분석 플랫폼 개발·배포"
      },
      {
        "title": "사내 분석 화면",
        "detail": "테이블·그래프 시각화 제공"
      }
    ],
    "outcome": "분석 플랫폼 개발·배포",
    "outcomeLabel": "데이터 분석을 위한 테이블과 시각화 자료 제공"
  },
  "데이터 메타데이터 관리 플랫폼 구축": {
    "diagramTitle": "메타데이터 수집·관리 구조",
    "nodes": [
      {
        "title": "테이블 메타데이터",
        "detail": "수집 대상"
      },
      {
        "title": "DataHub 스케줄러",
        "detail": "메타데이터 수집"
      },
      {
        "title": "DataHub",
        "detail": "메타데이터 관리"
      }
    ],
    "outcome": "메타데이터 수집 체계 구축",
    "outcomeLabel": "Docker Compose 서버 구성 · GitHub Actions CD",
    "orchestration": "Docker Compose / GitHub Actions 기반 서버 배포"
  },
  "온프레미스 데이터 인프라 서버 운영": {
    "diagramTitle": "온프레미스 데이터팀 운영 구성",
    "nodes": [
      {
        "title": "PostgreSQL",
        "detail": "데이터 저장"
      },
      {
        "title": "Airflow · Spark",
        "detail": "스케줄링·데이터 처리"
      },
      {
        "title": "Redash · Grafana",
        "detail": "분석·대시보드"
      }
    ],
    "outcome": "데이터팀 운영 기반 구축",
    "outcomeLabel": "Docker 기반 서비스 운영과 리소스 부족 Slack 알림",
    "orchestration": "온프레미스 · Docker / 리소스 모니터링 → Slack 경고",
    "parallel": true
  },
  "데이터 플랫폼 및 파이프라인 운영": {
    "diagramTitle": "플랫폼 내 Firestore 백업·적재 경로",
    "nodes": [
      {
        "title": "Firestore",
        "detail": "데이터 백업"
      },
      {
        "title": "GCS",
        "detail": "백업 데이터 업로드"
      },
      {
        "title": "BigQuery",
        "detail": "웨어하우스 적재"
      }
    ],
    "outcome": "일간 약 1억 건 · 월간 약 2TB",
    "outcomeLabel": "게임 이벤트 로그·메타데이터·백업을 포함한 플랫폼 전체 수집 규모",
    "orchestration": "Airflow / 이벤트 로그·메타데이터 동기화 / Pub/Sub 데드레터 / Merge 기반 멱등성"
  },
  "마케팅 광고 데이터 수집 파이프라인 운영": {
    "diagramTitle": "게임별 마케팅 데이터 수집 구조",
    "nodes": [
      {
        "title": "광고 네트워크 · MMP",
        "detail": "Moloco·AppLovin·Unity Ads·Google Ads"
      },
      {
        "title": "Airflow",
        "detail": "KPI·소재·리텐션별 DAG"
      },
      {
        "title": "Cloud Run",
        "detail": "Bundle ID별 병렬 작업"
      },
      {
        "title": "마케팅 데이터",
        "detail": "게임별 수집 결과"
      }
    ],
    "outcome": "목적별 DAG·게임별 병렬화",
    "outcomeLabel": "AppsFlyer SSoT 전환 및 신규 게임 수집 파이프라인 적용",
    "orchestration": "Cloud Run API 503 재시도 / 리포트 수집 실패 로그 / 매체별 정합성 검증"
  },
  "BI 대시보드 운영": {
    "diagramTitle": "대시보드 운영 및 장애 대응 구성",
    "nodes": [
      {
        "title": "Redash",
        "detail": "게임 지표·ROAS D1~D180"
      },
      {
        "title": "query_runner",
        "detail": "결과 크기 임계값으로 실행 차단"
      },
      {
        "title": "Redis",
        "detail": "대용량 결과 누적·메모리 이슈 대응"
      }
    ],
    "outcome": "동일 원인 장애 재발 0건",
    "outcomeLabel": "약 6천만 행 조회 장애 조치 후 · 이력서 작성 시점 기준",
    "parallel": true,
    "orchestration": "신작 5종 출시 단계별 분석 지원 / SQL·시각화·대시보드 가이드 전사 배포"
  },
  "Text2SQL 서비스 운영": {
    "diagramTitle": "자연어 질의를 분석에 활용하는 흐름",
    "nodes": [
      {
        "title": "자연어 질의",
        "detail": "사내 사용자 질문"
      },
      {
        "title": "LLM Gateway",
        "detail": "사내 LLM 모델 연동"
      },
      {
        "title": "Text2SQL",
        "detail": "SQL 생성·정합성 검증"
      },
      {
        "title": "Redash",
        "detail": "생성 쿼리의 대시보드 반영"
      }
    ],
    "outcome": "자연어 질의 → 대시보드",
    "outcomeLabel": "분석 쿼리를 예제 컨텍스트에 반영해 응답 품질 개선",
    "returnPath": "실제 분석 쿼리 → 예제 쿼리 컨텍스트 보강"
  },
  "Text2SQL 서비스 고도화 PoC": {
    "diagramTitle": "검증한 태그·임베딩 기반 검색 컨셉",
    "nodes": [
      {
        "title": "컨텍스트 분류",
        "detail": "카테고리별 태그 정의"
      },
      {
        "title": "질문 태그 추출",
        "detail": "검색 조건 구성"
      },
      {
        "title": "임베딩 검색",
        "detail": "관련 컨텍스트 조회 방식 검증"
      }
    ],
    "outcome": "태그 기반 방식 재검토",
    "outcomeLabel": "명확한 태그 기준 설정의 구조적 한계를 확인하고 PoC 종료",
    "outcomeHeading": "PoC 결론"
  },
  "마케팅 광고 소재 데이터 수집 파이프라인 구축": {
    "diagramTitle": "광고 소재 KPI·매출 코호트 집계 흐름",
    "nodes": [
      {
        "title": "AppsFlyer API · Data Locker",
        "detail": "소재 KPI·매출 데이터 수집"
      },
      {
        "title": "코호트 집계",
        "detail": "설치·구매·매출 가공"
      },
      {
        "title": "Data Mart",
        "detail": "소재별 지표 테이블"
      },
      {
        "title": "Looker Studio",
        "detail": "마케팅 데이터 조회"
      }
    ],
    "outcome": "집계 정합성 98% 검증",
    "outcomeLabel": "광고 소재 정보 100% 통합 · 수작업 다운로드·집계 자동화"
  },
  "Databricks Genie 서비스 도입 PoC": {
    "diagramTitle": "PoC에서 검증한 데이터 분석 환경",
    "nodes": [
      {
        "title": "BigQuery",
        "detail": "기존 Google Cloud 데이터"
      },
      {
        "title": "AWS S3",
        "detail": "PoC 데이터 복제"
      },
      {
        "title": "Databricks",
        "detail": "AWS 연동·카탈로그 생성"
      },
      {
        "title": "Genie",
        "detail": "대화형 차트·대시보드 검증"
      }
    ],
    "outcome": "검증 후 미도입 결정",
    "outcomeLabel": "카탈로그 확장성·대시보드 제약·클라우드 이전 비용 검토",
    "outcomeHeading": "PoC 결론"
  },
  "RAG 컨텍스트 지식 베이스 구축 및 통합": {
    "diagramTitle": "여러 에이전트가 공유하는 컨텍스트 검색 구조",
    "nodes": [
      {
        "title": "업무 지식 · 공지사항",
        "detail": "예제 쿼리·게임 메타데이터·스키마 수집"
      },
      {
        "title": "변경 감지 · 설명 보강",
        "detail": "해시 기반 갱신·LLM 설명"
      },
      {
        "title": "BigQuery 임베딩",
        "detail": "Pgvector 저장소 통합 이전"
      },
      {
        "title": "Vector Search",
        "detail": "질문 임베딩과 비교·검색"
      },
      {
        "title": "Text2SQL 에이전트",
        "detail": "관련 컨텍스트 활용"
      }
    ],
    "outcome": "응답 정확도 70% → 90%",
    "outcomeLabel": "초기 구축 시 Few-shot 19개 → 49개 · 이후 컨텍스트 확장·갱신 자동화",
    "orchestration": "공지사항 수집 DAG / 벡터 스토어 갱신 자동화 / DEV·PROD 테이블·스토리지 분리"
  },
  "LLM/MLOps 인프라 구축": {
    "diagramTitle": "카카오 클라우드 기반 LLM·ML 운영 구성",
    "nodes": [
      {
        "title": "Airflow",
        "detail": "작업 스케줄링"
      },
      {
        "title": "MLflow",
        "detail": "모델 실험·버전 이력 관리"
      },
      {
        "title": "Langfuse",
        "detail": "응답 추적·사용량·비용 관리"
      }
    ],
    "outcome": "모델 실험·LLM 호출 중앙 추적",
    "outcomeLabel": "실험 재현성과 프롬프트·응답 가시성 확보",
    "orchestration": "카카오 클라우드 · Docker / 사내 네트워크·방화벽 설정",
    "parallel": true
  },
  "마케팅 캠페인 구매 데이터 수집 파이프라인 구축": {
    "diagramTitle": "재집계되는 코호트를 반영하는 구매 데이터 파이프라인",
    "nodes": [
      {
        "title": "AppsFlyer API · Data Locker",
        "detail": "af_purchase·파트너 집계"
      },
      {
        "title": "동적 청크 수집",
        "detail": "직전 수집 건수에 따라 호출 범위 조절"
      },
      {
        "title": "파티션 교체 적재",
        "detail": "변경된 코호트 파티션 교체"
      },
      {
        "title": "Data Mart",
        "detail": "구매 유저 수·금액 집계"
      },
      {
        "title": "Looker Studio",
        "detail": "마케팅팀 자체 조회"
      }
    ],
    "outcome": "약 19분 → 12분 이내",
    "outcomeLabel": "D30 → D90 확장·백필 / 예상 API 호출 약 600회 → 약 105회",
    "orchestration": "분당 60회·쿼리당 30,000행 API 제한에 대응 / 코호트 파티션 교체 적재"
  },
  "클라이언트 변조 기반 어뷰징 탐지 배치 파이프라인 구축": {
    "diagramTitle": "탐지 이후 알림·제재 확인 처리 흐름",
    "nodes": [
      {
        "title": "게임 이벤트 로그",
        "detail": "탐지 대상 데이터"
      },
      {
        "title": "탐지 쿼리",
        "detail": "비용 사전 산정·주기적 실행"
      },
      {
        "title": "Slack · Google Drive",
        "detail": "탐지 알림·결과 업로드"
      },
      {
        "title": "제재 여부 필터링",
        "detail": "후속 처리와 연계"
      }
    ],
    "outcome": "탐지·알림·후속 처리 자동화",
    "outcomeLabel": "수작업 확인에서 실제 제재 프로세스와 연계되는 배치로 전환",
    "orchestration": "Airflow 주기 실행 / 게임 정책 변경 시 해당 탐지 DAG 중지"
  },
  "확률 데이터 분석 및 파이프라인 구축": {
    "diagramTitle": "대외 공개 확률 정보의 집계 구조",
    "nodes": [
      {
        "title": "게임 이벤트 로그",
        "detail": "집계 불가 케이스 로그 설계·반영"
      },
      {
        "title": "일 배치",
        "detail": "확률 데이터 가공·적재"
      },
      {
        "title": "디멘전 · 팩트 마트",
        "detail": "11종을 단일 스키마로 수용"
      },
      {
        "title": "유저 공개 페이지",
        "detail": "실측 확률 검증 결과 연동"
      }
    ],
    "outcome": "확률 콘텐츠 11종 전체 집계",
    "outcomeLabel": "새 콘텐츠 추가 시 마트 구조 변경 없이 확장 가능한 설계",
    "orchestration": "신규 보석 뽑기 카테고리 검증·수집 확장 / ASSERT 조건 개선"
  },
  "이벤트 로그 스키마 확장 및 수집 서비스 전환": {
    "diagramTitle": "공통 프로퍼티 도입부터 운영 검증까지",
    "nodes": [
      {
        "title": "게임 이벤트",
        "detail": "installation_id 프로퍼티 추가"
      },
      {
        "title": "Cloud Run Function",
        "detail": "테스트 검증 후 수집 서비스 전환"
      },
      {
        "title": "이벤트 로그 테이블",
        "detail": "컬럼·적재 파이프라인 변경"
      },
      {
        "title": "백필 · 모니터링",
        "detail": "기존 데이터 보완·수집 상태 확인"
      }
    ],
    "orchestration": "GitLab CI 배포 절차 / 앱 업데이트·재설치 QA / 설치 이벤트 흐름 문서화",
    "outcome": "스키마 변경·운영 전환 완료",
    "outcomeLabel": "수집 코드·테이블·적재·기존 데이터를 함께 변경하고 백필 후 검증"
  },
  "게임 메타데이터 연동 및 공통 스키마 설계": {
    "diagramTitle": "게임별 메타데이터의 연동·활용 흐름",
    "nodes": [
      {
        "title": "게임별 시트",
        "detail": "아이템·상품·재화 원본"
      },
      {
        "title": "공통 스키마 설계",
        "detail": "Item·ShopProduct 공통 항목 정리"
      },
      {
        "title": "연동 검증",
        "detail": "다국어 매핑·개발·QA 확인"
      },
      {
        "title": "운영툴 · Redash",
        "detail": "메타데이터·아이템 필터 반영"
      }
    ],
    "orchestration": "운영용 뷰와 개발·QA 조회 경로 분리 / 테이블·컬럼 명세 문서화",
    "outcome": "2개 게임 연동·공통 모델링",
    "outcomeLabel": "랜덤다이스2·Sheep Duck 연동 및 분석 에이전트 컨텍스트 활용"
  },
  "데이터 분석 에이전트 평가 체계 구축": {
    "diagramTitle": "대표 질문을 기준으로 반복 검증하는 평가 절차",
    "nodes": [
      {
        "title": "질문 · 정답 SQL",
        "detail": "게임별 분석 기준 작성·검증"
      },
      {
        "title": "Langfuse 데이터셋",
        "detail": "평가 테스트 케이스 등록"
      },
      {
        "title": "쿼리 · 리포트 검증",
        "detail": "기존 분석 재현·전체 흐름 테스트"
      },
      {
        "title": "지침 · 예제 보완",
        "detail": "운영 담당자 피드백 반영"
      }
    ],
    "outcome": "4개 게임 평가 데이터셋",
    "outcomeLabel": "실제 리포트와 정답 쿼리를 기준으로 생성 결과 검증",
    "returnPath": "게임 지침·비즈니스 로직·예제 쿼리 개선 → 동일 질문으로 재검증"
  },
  "대용량 데이터 추출 및 분석 지표 검증": {
    "diagramTitle": "대량 추출 전 검증과 데이터 제공 절차",
    "nodes": [
      {
        "title": "이벤트 로그",
        "detail": "세션·구매·게임 운영 데이터"
      },
      {
        "title": "집계 기준 검토",
        "detail": "쿼리 비용·제재·이상 로그 확인"
      },
      {
        "title": "샘플 · 모의 검증",
        "detail": "일부 데이터로 결과 사전 확인"
      },
      {
        "title": "실제 데이터 제공",
        "detail": "매체 S3·인포그래픽 데이터"
      }
    ],
    "outcome": "세션 약 3.5억 건 전달",
    "outcomeLabel": "1년치 구매 약 576만 건 함께 제공 / 인포그래픽 50개 지표 별도 검증"
  }
}
