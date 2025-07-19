import React, { useState } from 'react';
import { ChevronRight, Wifi, Cloud, Shield, Database, Cpu, MessageSquare, Home, Smartphone, Globe, Lock, Activity, Settings, Users, Box, Zap, Radio } from 'lucide-react';

const IoTArchitectureDiagram = () => {
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState(null);

  const layers = {
    device: {
      title: "디바이스 레이어",
      color: "bg-green-100 border-green-300",
      icon: <Home className="w-5 h-5" />,
      components: [
        { name: "AI 스피커", tech: "ESP32 + Whisper + Piper", protocol: "MQTT/Thread" },
        { name: "센서 디바이스", tech: "ESP8266/ESP32", protocol: "Zigbee/MQTT" },
        { name: "스마트 가전", tech: "임베디드 Linux", protocol: "Wi-Fi/Matter" },
        { name: "보안 장치", tech: "ESP32-CAM", protocol: "RTSP/MQTT" }
      ]
    },
    edge: {
      title: "엣지 게이트웨이",
      color: "bg-blue-100 border-blue-300",
      icon: <Radio className="w-5 h-5" />,
      components: [
        { name: "프로토콜 브릿지", tech: "Node.js + Zigbee2MQTT", role: "프로토콜 변환" },
        { name: "로컬 처리 엔진", tech: "Node-RED + TensorFlow Lite", role: "실시간 분석" },
        { name: "캐싱 서비스", tech: "Redis", role: "임시 데이터 저장" },
        { name: "보안 게이트웨이", tech: "Nginx + mTLS", role: "보안 통신" }
      ]
    },
    cloud: {
      title: "클라우드 서비스",
      color: "bg-purple-100 border-purple-300",
      icon: <Cloud className="w-5 h-5" />,
      components: [
        { name: "API 게이트웨이", tech: "Kong/Express.js", role: "API 라우팅" },
        { name: "마이크로서비스", tech: "Node.js + Docker", role: "비즈니스 로직" },
        { name: "메시지 브로커", tech: "RabbitMQ/Redis Pub-Sub", role: "이벤트 처리" },
        { name: "데이터베이스", tech: "TimescaleDB + MongoDB", role: "데이터 저장" }
      ]
    },
    client: {
      title: "클라이언트 레이어",
      color: "bg-yellow-100 border-yellow-300",
      icon: <Smartphone className="w-5 h-5" />,
      components: [
        { name: "웹 애플리케이션", tech: "Vue.js + Vuex", platform: "PWA" },
        { name: "모바일 앱", tech: "Vue + Capacitor", platform: "iOS/Android" },
        { name: "관리자 대시보드", tech: "Vue.js + Chart.js", platform: "Web" },
        { name: "B2B 포털", tech: "Nuxt.js", platform: "SSR Web" }
      ]
    }
  };

  const domains = {
    device: {
      title: "디바이스 관리",
      icon: <Box className="w-5 h-5" />,
      color: "bg-red-50 border-red-200",
      services: [
        "디바이스 등록/프로비저닝",
        "펌웨어 OTA 업데이트",
        "디바이스 상태 모니터링",
        "디바이스 메타데이터 관리"
      ]
    },
    auth: {
      title: "인증/인가",
      icon: <Lock className="w-5 h-5" />,
      color: "bg-orange-50 border-orange-200",
      services: [
        "사용자 인증 (JWT)",
        "디바이스 인증 (mTLS)",
        "권한 관리 (RBAC)",
        "OAuth2/SSO 통합"
      ]
    },
    data: {
      title: "데이터 처리",
      icon: <Database className="w-5 h-5" />,
      color: "bg-blue-50 border-blue-200",
      services: [
        "시계열 데이터 수집",
        "실시간 스트림 처리",
        "배치 분석 작업",
        "데이터 집계/변환"
      ]
    },
    automation: {
      title: "자동화 엔진",
      icon: <Zap className="w-5 h-5" />,
      color: "bg-green-50 border-green-200",
      services: [
        "규칙 기반 자동화",
        "시나리오 실행 엔진",
        "스케줄링 서비스",
        "트리거 관리"
      ]
    },
    ai: {
      title: "AI/ML 서비스",
      icon: <Cpu className="w-5 h-5" />,
      color: "bg-purple-50 border-purple-200",
      services: [
        "음성 인식/합성",
        "자연어 처리",
        "예측 분석",
        "이상 탐지"
      ]
    },
    notification: {
      title: "알림 서비스",
      icon: <MessageSquare className="w-5 h-5" />,
      color: "bg-pink-50 border-pink-200",
      services: [
        "푸시 알림",
        "이메일/SMS 발송",
        "웹훅 전달",
        "이벤트 구독 관리"
      ]
    }
  };

  const techStack = {
    foundation: {
      title: "Foundation Stack (V1)",
      items: [
        { category: "Backend", tech: "Node.js + Express.js", reason: "빠른 개발, IoT 생태계" },
        { category: "Frontend", tech: "Vue.js 3", reason: "낮은 학습곡선, 생산성" },
        { category: "Database", tech: "PostgreSQL + TimescaleDB", reason: "시계열 데이터 최적화" },
        { category: "Cache", tech: "Redis", reason: "실시간 데이터, Pub/Sub" },
        { category: "IoT Protocol", tech: "MQTT", reason: "경량, 광범위한 지원" },
        { category: "Embedded", tech: "ESP32 + Arduino", reason: "빠른 프로토타이핑" }
      ]
    },
    scaling: {
      title: "Scaling Stack (V2+)",
      items: [
        { category: "Container", tech: "Docker + Kubernetes", reason: "확장성, 관리 용이성" },
        { category: "Message Queue", tech: "RabbitMQ", reason: "신뢰성, 유연한 라우팅" },
        { category: "API Gateway", tech: "Kong", reason: "성능, 플러그인 생태계" },
        { category: "Monitoring", tech: "Prometheus + Grafana", reason: "오픈소스, 강력한 기능" },
        { category: "Edge AI", tech: "TensorFlow Lite", reason: "모바일/임베디드 최적화" },
        { category: "New Protocol", tech: "Thread + Matter", reason: "미래 표준, 상호운용성" }
      ]
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gray-50 rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        스마트홈 IoT 서비스 아키텍처
      </h1>

      {/* 레이어 아키텍처 */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Globe className="w-6 h-6 text-blue-600" />
          시스템 레이어 구조
        </h2>
        <div className="space-y-4">
          {Object.entries(layers).map(([key, layer]) => (
            <div 
              key={key}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${layer.color} ${
                selectedLayer === key ? 'ring-2 ring-offset-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedLayer(selectedLayer === key ? null : key)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {layer.icon}
                  <h3 className="font-semibold text-lg">{layer.title}</h3>
                </div>
                <ChevronRight className={`w-5 h-5 transition-transform ${
                  selectedLayer === key ? 'rotate-90' : ''
                }`} />
              </div>
              
              {selectedLayer === key && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {layer.components.map((comp, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-md shadow-sm">
                      <h4 className="font-medium text-gray-800">{comp.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{comp.tech}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {comp.protocol || comp.role || comp.platform}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 데이터 흐름 표시 */}
        <div className="mt-6 text-center">
          <div className="inline-flex flex-col items-center space-y-2">
            <Activity className="w-6 h-6 text-gray-400" />
            <span className="text-sm text-gray-500">양방향 데이터 흐름</span>
          </div>
        </div>
      </div>

      {/* 도메인 구조 */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Settings className="w-6 h-6 text-purple-600" />
          핵심 도메인 서비스
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(domains).map(([key, domain]) => (
            <div
              key={key}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${domain.color} ${
                selectedDomain === key ? 'ring-2 ring-offset-2 ring-purple-500' : ''
              }`}
              onClick={() => setSelectedDomain(selectedDomain === key ? null : key)}
            >
              <div className="flex items-center gap-2 mb-3">
                {domain.icon}
                <h3 className="font-semibold">{domain.title}</h3>
              </div>
              
              <ul className="space-y-1">
                {domain.services.map((service, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start gap-1">
                    <span className="text-gray-400 mt-1">•</span>
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 기술 스택 */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Shield className="w-6 h-6 text-green-600" />
          단계별 기술 스택
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.entries(techStack).map(([key, stack]) => (
            <div key={key} className="border rounded-lg p-4 bg-white">
              <h3 className="font-semibold mb-3 text-lg">{stack.title}</h3>
              <div className="space-y-2">
                {stack.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 pb-2 border-b last:border-0">
                    <span className="text-sm font-medium text-gray-600 w-24">{item.category}:</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{item.tech}</p>
                      <p className="text-xs text-gray-500">{item.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 통신 프로토콜 매트릭스 */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <Wifi className="w-5 h-5 text-blue-600" />
          프로토콜 전략
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-gray-700 mb-1">디바이스 ↔ 게이트웨이</h4>
            <p className="text-gray-600">MQTT, Zigbee, Thread</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-1">게이트웨이 ↔ 클라우드</h4>
            <p className="text-gray-600">MQTT over TLS, WebSocket</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-1">클라이언트 ↔ 클라우드</h4>
            <p className="text-gray-600">REST API, WebSocket, gRPC</p>
          </div>
        </div>
      </div>

      {/* 팀 역할 매핑 */}
      <div className="mt-8 p-4 bg-green-50 rounded-lg">
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <Users className="w-5 h-5 text-green-600" />
          팀 역할 분담
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="space-y-1">
            <p><span className="font-medium">디자이너:</span> UI/UX, 음성 인터페이스 설계</p>
            <p><span className="font-medium">회로개발:</span> 하드웨어 설계, 센서 통합</p>
            <p><span className="font-medium">임베디드:</span> 펌웨어, 디바이스 통신</p>
          </div>
          <div className="space-y-1">
            <p><span className="font-medium">AI 담당:</span> 음성처리, 자동화 엔진</p>
            <p><span className="font-medium">풀스택 (2명):</span> 백엔드 API, 프론트엔드, DevOps</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IoTArchitectureDiagram;