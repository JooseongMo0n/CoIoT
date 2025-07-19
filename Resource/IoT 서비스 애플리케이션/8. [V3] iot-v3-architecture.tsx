import React, { useState } from 'react';
import { 
  Building2, Users, Globe, BarChart3, Shield, Cloud,
  Layers, GitBranch, Server, Database, Lock, Zap,
  Network, Activity, Settings, Package, AlertTriangle,
  TrendingUp, Cpu, ArrowRight, CheckCircle, Info
} from 'lucide-react';

const IoTV3Architecture = () => {
  const [selectedArchitecture, setSelectedArchitecture] = useState('microservices');
  const [selectedFeature, setSelectedFeature] = useState('multi-tenancy');

  const architectureTransition = {
    microservices: {
      title: '마이크로서비스 아키텍처',
      icon: <Layers className="w-5 h-5" />,
      description: '확장 가능한 분산 시스템으로 전환',
      services: [
        {
          name: 'API Gateway',
          tech: 'Kong / Envoy',
          responsibility: '라우팅, 인증, 속도 제한',
          connections: ['Auth Service', 'Device Service', 'Analytics Service']
        },
        {
          name: 'Device Management Service',
          tech: 'Node.js + gRPC',
          responsibility: '디바이스 생명주기 관리',
          connections: ['Device Registry', 'Telemetry Service']
        },
        {
          name: 'Telemetry Service',
          tech: 'Go + Kafka Streams',
          responsibility: '실시간 데이터 처리',
          connections: ['TimescaleDB', 'Analytics Service']
        },
        {
          name: 'Automation Service',
          tech: 'Python + Celery',
          responsibility: '규칙 엔진 및 워크플로우',
          connections: ['Rule Engine', 'ML Service']
        },
        {
          name: 'Voice Processing Service',
          tech: 'Python + RabbitMQ',
          responsibility: '음성 명령 처리 파이프라인',
          connections: ['STT Service', 'NLU Service', 'TTS Service']
        },
        {
          name: 'Analytics Service',
          tech: 'Apache Spark + ClickHouse',
          responsibility: '실시간 및 배치 분석',
          connections: ['Data Lake', 'ML Service']
        },
        {
          name: 'Tenant Management Service',
          tech: 'Java Spring + PostgreSQL',
          responsibility: '멀티테넌시 및 격리',
          connections: ['Auth Service', 'Billing Service']
        },
        {
          name: 'Notification Service',
          tech: 'Node.js + Redis Pub/Sub',
          responsibility: '멀티채널 알림',
          connections: ['Email Service', 'Push Service', 'SMS Service']
        }
      ]
    }
  };

  const v3Features = {
    'multi-tenancy': {
      title: '멀티테넌시 & B2B',
      icon: <Building2 className="w-5 h-5" />,
      components: [
        {
          name: 'Tenant Isolation',
          description: '완벽한 데이터 격리와 보안',
          implementation: `// 테넌트 격리 미들웨어
class TenantIsolation {
  async isolateRequest(req, res, next) {
    const tenantId = this.extractTenantId(req);
    
    // 데이터베이스 연결 라우팅
    req.db = await this.getTenantDB(tenantId);
    
    // 테넌트별 설정 로드
    req.tenantConfig = await this.loadConfig(tenantId);
    
    // Row-Level Security 설정
    await req.db.query(\`SET app.tenant_id = '\${tenantId}'\`);
    
    next();
  }
}`,
          features: [
            'Schema-per-tenant 또는 Row-level security',
            '테넌트별 커스터마이징',
            '독립적인 백업/복구',
            '규정 준수 데이터 위치'
          ]
        },
        {
          name: 'White-Label Support',
          description: '완전한 브랜딩 커스터마이징',
          implementation: `// 화이트라벨 설정
{
  "tenant": "enterprise-a",
  "branding": {
    "logo": "https://...",
    "colors": {
      "primary": "#2E86C1",
      "secondary": "#F39C12"
    },
    "domain": "iot.enterprise-a.com",
    "emailTemplates": "custom"
  },
  "features": {
    "voiceAssistant": true,
    "advancedAnalytics": true,
    "customIntegrations": ["salesforce", "sap"]
  }
}`,
          features: [
            '커스텀 도메인',
            'UI/UX 완전 커스터마이징',
            'API 엔드포인트 커스터마이징',
            '맞춤형 보고서'
          ]
        }
      ]
    },
    'analytics-platform': {
      title: '고급 분석 플랫폼',
      icon: <BarChart3 className="w-5 h-5" />,
      components: [
        {
          name: 'Real-time Analytics',
          description: '실시간 인사이트와 대시보드',
          implementation: `// Apache Flink 실시간 처리
class DeviceAnalytics extends ProcessFunction {
  processElement(event: DeviceEvent) {
    // 실시간 집계
    const metrics = {
      deviceId: event.deviceId,
      avgValue: this.calculateAverage(event),
      anomalyScore: this.detectAnomaly(event),
      trend: this.calculateTrend(event)
    };
    
    // ClickHouse로 전송
    this.sink.send(metrics);
    
    // 알림 트리거
    if (metrics.anomalyScore > 0.8) {
      this.alert(event);
    }
  }
}`,
          features: [
            '실시간 디바이스 모니터링',
            '이상 감지 및 알림',
            '예측 분석',
            '커스텀 대시보드 빌더'
          ]
        },
        {
          name: 'Business Intelligence',
          description: '경영 인사이트 도출',
          implementation: `// BI 리포트 생성
class BusinessIntelligence {
  async generateReport(tenantId, period) {
    const data = await this.dataWarehouse.query(\`
      SELECT 
        DATE_TRUNC('day', timestamp) as date,
        COUNT(DISTINCT device_id) as active_devices,
        AVG(usage_minutes) as avg_usage,
        SUM(energy_saved) as total_savings
      FROM device_analytics
      WHERE tenant_id = $1 
        AND timestamp >= $2
      GROUP BY date
    \`, [tenantId, period.start]);
    
    return this.visualize(data);
  }
}`,
          features: [
            'ROI 계산 도구',
            '에너지 절감 리포트',
            '사용 패턴 분석',
            '비교 벤치마킹'
          ]
        }
      ]
    },
    'integration-hub': {
      title: '통합 허브',
      icon: <Network className="w-5 h-5" />,
      components: [
        {
          name: 'Enterprise Integrations',
          description: '주요 엔터프라이즈 시스템 연동',
          implementation: `// 통합 어댑터 패턴
class IntegrationAdapter {
  // Salesforce 통합
  async syncToSalesforce(event) {
    const sfData = this.transformToSF(event);
    await this.sf.sobject('IoT_Event__c')
      .create(sfData);
  }
  
  // SAP 통합
  async syncToSAP(deviceData) {
    const sapPayload = this.transformToSAP(deviceData);
    await this.sap.post('/equipment/update', sapPayload);
  }
  
  // Microsoft Teams 알림
  async notifyTeams(alert) {
    await this.teams.sendActivity({
      type: 'message',
      text: alert.message,
      attachments: [this.createAdaptiveCard(alert)]
    });
  }
}`,
          integrations: [
            'Salesforce (CRM)',
            'SAP (ERP)',
            'Microsoft 365',
            'Google Workspace',
            'Slack/Teams',
            'ServiceNow',
            'Tableau/PowerBI'
          ]
        },
        {
          name: 'Open API Platform',
          description: '서드파티 개발자 생태계',
          implementation: `// OpenAPI 3.0 명세
openapi: 3.0.0
paths:
  /api/v3/devices:
    get:
      summary: List devices
      security:
        - OAuth2: [read:devices]
      parameters:
        - $ref: '#/components/parameters/pagination'
      responses:
        200:
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/DeviceList'`,
          features: [
            'RESTful & GraphQL API',
            'OAuth 2.0 인증',
            'Rate Limiting',
            'Webhook 지원',
            'SDK 제공 (Python, JS, Java)',
            'API 마켓플레이스'
          ]
        }
      ]
    },
    'global-scale': {
      title: '글로벌 확장',
      icon: <Globe className="w-5 h-5" />,
      components: [
        {
          name: 'Multi-Region Deployment',
          description: '전 세계 분산 배포',
          implementation: `// 지역별 라우팅
class GlobalRouter {
  async route(request) {
    const userRegion = this.detectRegion(request.ip);
    const nearestCluster = this.clusters[userRegion];
    
    // 지연시간 기반 라우팅
    if (nearestCluster.latency < 50) {
      return nearestCluster.handle(request);
    }
    
    // 글로벌 동기화
    await this.syncGlobally({
      region: userRegion,
      data: request.data,
      consistency: 'eventual'
    });
  }
}`,
          regions: [
            'Asia-Pacific (Seoul, Tokyo, Singapore)',
            'Europe (Frankfurt, London)',
            'Americas (Virginia, Oregon)',
            'Middle East (Dubai)'
          ]
        },
        {
          name: 'Localization',
          description: '다국어 및 현지화',
          implementation: `// i18n 서비스
{
  "ko": {
    "voice": {
      "wake_word": ["하이 홈", "안녕 집"],
      "responses": {
        "device_on": "{device}을(를) 켰습니다",
        "temperature": "현재 온도는 {value}도입니다"
      }
    }
  },
  "en": { ... },
  "ja": { ... },
  "zh": { ... }
}`,
          languages: [
            '한국어 (Native)',
            'English',
            '日本語',
            '中文',
            'Español',
            'Deutsch'
          ]
        }
      ]
    },
    'edge-clustering': {
      title: '엣지 클러스터링',
      icon: <Server className="w-5 h-5" />,
      components: [
        {
          name: 'Edge Orchestration',
          description: 'K3s 기반 엣지 오케스트레이션',
          implementation: `# K3s 엣지 클러스터 설정
apiVersion: apps/v1
kind: Deployment
metadata:
  name: edge-ai-processor
spec:
  replicas: 3
  template:
    spec:
      nodeSelector:
        node-type: edge
      containers:
      - name: ai-inference
        resources:
          requests:
            memory: "2Gi"
            nvidia.com/gpu: 1`,
          features: [
            '분산 엣지 처리',
            '자동 페일오버',
            '로드 밸런싱',
            'GPU 가속 지원'
          ]
        },
        {
          name: 'Federated Learning',
          description: '분산 머신러닝',
          implementation: `// 연합 학습 구현
class FederatedLearning {
  async trainLocalModel(edgeNode) {
    // 로컬 데이터로 학습
    const localModel = await edgeNode.train({
      data: edgeNode.localData,
      epochs: 5,
      privacy: 'differential'
    });
    
    // 중앙 서버로 가중치만 전송
    await this.aggregator.submit({
      nodeId: edgeNode.id,
      weights: localModel.weights,
      samples: edgeNode.dataSize
    });
  }
}`,
          benefits: [
            '프라이버시 보호',
            '네트워크 효율성',
            '개인화 모델',
            '규정 준수'
          ]
        }
      ]
    }
  };

  const deploymentArchitecture = {
    infrastructure: [
      { layer: 'CDN', tech: 'CloudFlare', purpose: '정적 자원 배포' },
      { layer: 'Load Balancer', tech: 'AWS ALB / Nginx', purpose: '트래픽 분산' },
      { layer: 'API Gateway', tech: 'Kong / AWS API Gateway', purpose: 'API 관리' },
      { layer: 'Container Orchestration', tech: 'Kubernetes (EKS/GKE)', purpose: '컨테이너 관리' },
      { layer: 'Service Mesh', tech: 'Istio', purpose: '서비스 간 통신' },
      { layer: 'Message Queue', tech: 'Kafka / RabbitMQ', purpose: '비동기 처리' },
      { layer: 'Cache', tech: 'Redis Cluster', purpose: '성능 최적화' },
      { layer: 'Database', tech: 'PostgreSQL (RDS) + TimescaleDB', purpose: '데이터 저장' },
      { layer: 'Object Storage', tech: 'S3 / MinIO', purpose: '파일 저장' },
      { layer: 'Monitoring', tech: 'Prometheus + Grafana + ELK', purpose: '모니터링' }
    ]
  };

  const scalingMetrics = {
    target: {
      users: '100,000+ B2B 고객',
      devices: '10M+ 연결 디바이스',
      requests: '1M+ req/sec',
      data: '100TB+/월 처리',
      availability: '99.99% SLA'
    },
    architecture: {
      microservices: '20+ 독립 서비스',
      regions: '4개 대륙 배포',
      edge_nodes: '1000+ 엣지 노드',
      languages: '6개 언어 지원'
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        스마트홈 IoT V3 - 엔터프라이즈 플랫폼
      </h1>

      {/* V3 핵심 가치 */}
      <div className="mb-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-indigo-600" />
          V3 엔터프라이즈 전환
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <Building2 className="w-8 h-8 text-indigo-500 mb-2" />
            <h3 className="font-semibold mb-1">B2B SaaS</h3>
            <p className="text-sm text-gray-600">멀티테넌시 기반 엔터프라이즈 솔루션</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <Globe className="w-8 h-8 text-green-500 mb-2" />
            <h3 className="font-semibold mb-1">글로벌 확장</h3>
            <p className="text-sm text-gray-600">다국어 지원 및 지역별 최적화</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <BarChart3 className="w-8 h-8 text-blue-500 mb-2" />
            <h3 className="font-semibold mb-1">비즈니스 인텔리전스</h3>
            <p className="text-sm text-gray-600">데이터 기반 의사결정 지원</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <Shield className="w-8 h-8 text-red-500 mb-2" />
            <h3 className="font-semibold mb-1">엔터프라이즈 보안</h3>
            <p className="text-sm text-gray-600">SOC2, ISO27001 준수</p>
          </div>
        </div>
      </div>

      {/* 마이크로서비스 아키텍처 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Layers className="w-6 h-6 text-purple-600" />
          마이크로서비스 전환
        </h2>
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="font-semibold mb-4">{architectureTransition.microservices.title}</h3>
          <p className="text-gray-600 mb-4">{architectureTransition.microservices.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {architectureTransition.microservices.services.map((service, idx) => (
              <div key={idx} className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-medium mb-1">{service.name}</h4>
                <p className="text-xs text-gray-500 mb-2">{service.tech}</p>
                <p className="text-sm text-gray-700 mb-2">{service.responsibility}</p>
                <div className="text-xs text-gray-500">
                  연결: {service.connections.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* V3 주요 기능 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Package className="w-6 h-6 text-blue-600" />
          엔터프라이즈 기능
        </h2>
        
        <div className="mb-4 flex gap-2 flex-wrap">
          {Object.keys(v3Features).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedFeature(key)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                selectedFeature === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {v3Features[key].icon}
              {v3Features[key].title}
            </button>
          ))}
        </div>

        {selectedFeature && (
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="font-semibold text-lg mb-4">{v3Features[selectedFeature].title}</h3>
            <div className="space-y-6">
              {v3Features[selectedFeature].components.map((comp, idx) => (
                <div key={idx} className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium text-lg mb-2">{comp.name}</h4>
                  <p className="text-gray-600 mb-3">{comp.description}</p>
                  
                  {comp.implementation && (
                    <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto mb-3">
                      <code>{comp.implementation}</code>
                    </pre>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {comp.features && (
                      <div>
                        <h5 className="font-medium text-sm mb-2">주요 기능</h5>
                        <ul className="space-y-1 text-sm text-gray-600">
                          {comp.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {comp.integrations && (
                      <div>
                        <h5 className="font-medium text-sm mb-2">지원 통합</h5>
                        <ul className="space-y-1 text-sm text-gray-600">
                          {comp.integrations.map((integration, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Network className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              {integration}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {comp.regions && (
                      <div>
                        <h5 className="font-medium text-sm mb-2">배포 지역</h5>
                        <ul className="space-y-1 text-sm text-gray-600">
                          {comp.regions.map((region, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Globe className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              {region}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 인프라 스택 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Server className="w-6 h-6 text-orange-600" />
          엔터프라이즈 인프라 스택
        </h2>
        <div className="bg-white p-4 rounded-lg border">
          <div className="space-y-2">
            {deploymentArchitecture.infrastructure.map((layer, idx) => (
              <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded">
                <div className="w-40 font-medium text-sm">{layer.layer}</div>
                <div className="flex-1 text-sm text-blue-600">{layer.tech}</div>
                <div className="text-sm text-gray-500">{layer.purpose}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 확장성 목표 */}
      <div className="mb-8 bg-green-50 p-6 rounded-lg border border-green-200">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-green-600" />
          V3 확장성 목표
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-3">비즈니스 목표</h3>
            <ul className="space-y-2">
              {Object.entries(scalingMetrics.target).map(([key, value]) => (
                <li key={key} className="flex justify-between">
                  <span className="text-sm text-gray-600">{key}:</span>
                  <span className="font-medium">{value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-3">기술 목표</h3>
            <ul className="space-y-2">
              {Object.entries(scalingMetrics.architecture).map(([key, value]) => (
                <li key={key} className="flex justify-between">
                  <span className="text-sm text-gray-600">{key}:</span>
                  <span className="font-medium">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 마이그레이션 경고 */}
      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-yellow-800 mb-1">V2 → V3 마이그레이션 고려사항</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• 제로 다운타임 마이그레이션을 위한 Blue-Green 배포</li>
              <li>• 데이터베이스 샤딩 및 파티셔닝 전략 수립</li>
              <li>• API 버전 관리 및 하위 호환성 유지</li>
              <li>• 점진적 마이크로서비스 분리 (Strangler Fig Pattern)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IoTV3Architecture;