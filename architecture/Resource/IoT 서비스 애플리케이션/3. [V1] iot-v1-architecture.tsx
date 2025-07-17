import React, { useState } from 'react';
import { 
  Wifi, Shield, Database, Server, Smartphone, Home, 
  ArrowRight, ArrowDown, Code, Package, Layers, 
  GitBranch, AlertCircle, CheckCircle, Box,
  Terminal, Globe, Lock, Activity, Users
} from 'lucide-react';

const IoTV1Architecture = () => {
  const [selectedFlow, setSelectedFlow] = useState('device-registration');
  const [selectedComponent, setSelectedComponent] = useState(null);

  // V1 컴포넌트 구조
  const v1Components = {
    device: {
      title: "IoT 디바이스",
      tech: "ESP32 + MQTT Client",
      color: "bg-green-100 border-green-400",
      components: [
        {
          name: "WiFi Manager",
          code: `// ESP32 WiFi 연결 관리
WiFiManager wifiManager;
wifiManager.autoConnect("SmartHome-Setup");`,
          purpose: "디바이스 초기 설정"
        },
        {
          name: "MQTT Client",
          code: `// MQTT 통신 설정
PubSubClient mqtt(espClient);
mqtt.setServer(MQTT_BROKER, 1883);
mqtt.subscribe("device/+/command");`,
          purpose: "서버와 통신"
        },
        {
          name: "Sensor Module",
          code: `// 센서 데이터 읽기
float temp = dht.readTemperature();
mqtt.publish("telemetry/temp", String(temp));`,
          purpose: "센서 데이터 수집"
        }
      ]
    },
    gateway: {
      title: "로컬 게이트웨이",
      tech: "Node.js + Mosquitto",
      color: "bg-blue-100 border-blue-400",
      components: [
        {
          name: "MQTT Broker",
          code: `// Mosquitto 설정 (mosquitto.conf)
listener 1883
allow_anonymous false
password_file /etc/mosquitto/passwd`,
          purpose: "메시지 브로커"
        },
        {
          name: "Device Manager",
          code: `// 디바이스 연결 관리
const devices = new Map();
mqtt.on('connect', (client) => {
  devices.set(client.id, client);
});`,
          purpose: "디바이스 상태 추적"
        },
        {
          name: "Protocol Bridge",
          code: `// MQTT to HTTP 브릿지
mqtt.on('message', async (topic, message) => {
  await axios.post('/api/telemetry', {
    topic, data: JSON.parse(message)
  });
});`,
          purpose: "프로토콜 변환"
        }
      ]
    },
    backend: {
      title: "백엔드 서버",
      tech: "Node.js + Express + PostgreSQL",
      color: "bg-purple-100 border-purple-400",
      components: [
        {
          name: "REST API",
          code: `// Express API 라우터
app.post('/api/devices', authMiddleware, 
  deviceController.register);
app.get('/api/devices/:id/state', 
  deviceController.getState);`,
          purpose: "클라이언트 API"
        },
        {
          name: "Auth Service",
          code: `// JWT 인증
const token = jwt.sign(
  { userId, role }, 
  JWT_SECRET, 
  { expiresIn: '24h' }
);`,
          purpose: "사용자 인증"
        },
        {
          name: "Device Service",
          code: `// 디바이스 등록 로직
async function registerDevice(deviceData) {
  const device = await Device.create(deviceData);
  await mqtt.subscribe(\`device/\${device.id}/+\`);
  return device;
}`,
          purpose: "디바이스 관리"
        },
        {
          name: "Automation Engine",
          code: `// 간단한 자동화 규칙
if (temperature > threshold) {
  await sendCommand(aircon.id, 'turn_on');
  await notify(user, 'AC turned on');
}`,
          purpose: "자동화 실행"
        }
      ]
    },
    database: {
      title: "데이터베이스",
      tech: "PostgreSQL + Redis",
      color: "bg-yellow-100 border-yellow-400",
      components: [
        {
          name: "PostgreSQL",
          code: `-- 핵심 테이블 구조
CREATE TABLE devices (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  type VARCHAR(50),
  name VARCHAR(100),
  status JSONB
);`,
          purpose: "영구 데이터 저장"
        },
        {
          name: "Redis Cache",
          code: `// 디바이스 상태 캐싱
await redis.setex(
  \`device:\${deviceId}:state\`,
  60, // 60초 TTL
  JSON.stringify(state)
);`,
          purpose: "실시간 상태 캐싱"
        }
      ]
    },
    frontend: {
      title: "웹 대시보드",
      tech: "Vue.js 3 + Vuex",
      color: "bg-red-100 border-red-400",
      components: [
        {
          name: "Device List",
          code: `<!-- 디바이스 목록 컴포넌트 -->
<template>
  <div v-for="device in devices" :key="device.id">
    <DeviceCard :device="device" 
      @toggle="toggleDevice" />
  </div>
</template>`,
          purpose: "디바이스 표시"
        },
        {
          name: "Real-time Updates",
          code: `// WebSocket 연결
const ws = new WebSocket('ws://localhost:3000');
ws.onmessage = (event) => {
  store.commit('updateDevice', JSON.parse(event.data));
};`,
          purpose: "실시간 업데이트"
        },
        {
          name: "Automation Rules",
          code: `// 자동화 규칙 생성
const rule = {
  trigger: { device: sensor.id, condition: '>' },
  action: { device: actuator.id, command: 'on' }
};`,
          purpose: "자동화 설정"
        }
      ]
    }
  };

  // 주요 플로우 정의
  const flows = {
    'device-registration': {
      title: '디바이스 등록 플로우',
      steps: [
        { from: 'device', to: 'gateway', action: 'WiFi 설정 및 MQTT 연결' },
        { from: 'gateway', to: 'backend', action: '디바이스 정보 전송' },
        { from: 'backend', to: 'database', action: 'DB에 디바이스 저장' },
        { from: 'backend', to: 'frontend', action: 'WebSocket으로 알림' }
      ]
    },
    'telemetry': {
      title: '센서 데이터 수집 플로우',
      steps: [
        { from: 'device', to: 'gateway', action: 'MQTT로 센서값 전송' },
        { from: 'gateway', to: 'backend', action: 'HTTP API로 전달' },
        { from: 'backend', to: 'database', action: 'TimeSeries 저장' },
        { from: 'backend', to: 'frontend', action: '실시간 차트 업데이트' }
      ]
    },
    'command': {
      title: '디바이스 제어 플로우',
      steps: [
        { from: 'frontend', to: 'backend', action: 'REST API 제어 요청' },
        { from: 'backend', to: 'gateway', action: 'MQTT 명령 발행' },
        { from: 'gateway', to: 'device', action: '디바이스에 명령 전달' },
        { from: 'device', to: 'gateway', action: '실행 결과 응답' }
      ]
    },
    'automation': {
      title: '자동화 실행 플로우',
      steps: [
        { from: 'device', to: 'backend', action: '트리거 이벤트 발생' },
        { from: 'backend', to: 'backend', action: '규칙 평가 및 조건 확인' },
        { from: 'backend', to: 'gateway', action: '액션 명령 전송' },
        { from: 'gateway', to: 'device', action: '타겟 디바이스 제어' }
      ]
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        스마트홈 IoT V1 - MVP 구현 아키텍처
      </h1>

      {/* V1 범위 설명 */}
      <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-blue-600" />
          V1 MVP 범위 (3개월)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-medium mb-1">핵심 기능</h3>
            <ul className="space-y-1 text-gray-700">
              <li>• 기본 디바이스 등록 및 관리</li>
              <li>• 실시간 센서 데이터 수집</li>
              <li>• 간단한 On/Off 제어</li>
              <li>• 기본 자동화 규칙 (If-Then)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-1">기술 스택</h3>
            <ul className="space-y-1 text-gray-700">
              <li>• Backend: Node.js + Express</li>
              <li>• Frontend: Vue.js 3</li>
              <li>• Database: PostgreSQL + Redis</li>
              <li>• IoT: MQTT + ESP32</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 컴포넌트 아키텍처 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Layers className="w-6 h-6 text-purple-600" />
          컴포넌트 아키텍처
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(v1Components).map(([key, component]) => (
            <div
              key={key}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${component.color} ${
                selectedComponent === key ? 'ring-2 ring-offset-2 ring-purple-500 shadow-lg' : ''
              }`}
              onClick={() => setSelectedComponent(selectedComponent === key ? null : key)}
            >
              <h3 className="font-semibold mb-2">{component.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{component.tech}</p>
              
              {selectedComponent === key && (
                <div className="space-y-3 mt-4">
                  {component.components.map((comp, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-md">
                      <h4 className="font-medium text-sm mb-1">{comp.name}</h4>
                      <p className="text-xs text-gray-500 mb-2">{comp.purpose}</p>
                      <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                        <code>{comp.code}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 데이터 플로우 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Activity className="w-6 h-6 text-green-600" />
          주요 데이터 플로우
        </h2>
        <div className="mb-4 flex gap-2 flex-wrap">
          {Object.keys(flows).map((flowKey) => (
            <button
              key={flowKey}
              onClick={() => setSelectedFlow(flowKey)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                selectedFlow === flowKey
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {flows[flowKey].title}
            </button>
          ))}
        </div>

        {selectedFlow && (
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="font-semibold mb-3">{flows[selectedFlow].title}</h3>
            <div className="space-y-2">
              {flows[selectedFlow].steps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-sm font-medium w-20 text-right">{step.from}</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium w-20">{step.to}</span>
                  <span className="text-sm text-gray-600 flex-1">{step.action}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 프로젝트 구조 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <GitBranch className="w-6 h-6 text-orange-600" />
          프로젝트 구조
        </h2>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-auto">
          <pre>{`iot-platform-v1/
├── backend/
│   ├── src/
│   │   ├── controllers/    # API 엔드포인트 핸들러
│   │   ├── services/       # 비즈니스 로직
│   │   ├── models/         # 데이터 모델
│   │   ├── middleware/     # Express 미들웨어
│   │   └── config/         # 설정 파일
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Vue 컴포넌트
│   │   ├── store/          # Vuex 상태 관리
│   │   ├── api/            # API 클라이언트
│   │   └── views/          # 페이지 컴포넌트
│   └── package.json
├── gateway/
│   ├── mosquitto.conf      # MQTT 브로커 설정
│   └── bridge.js           # 프로토콜 브릿지
├── firmware/
│   └── esp32/              # IoT 디바이스 펌웨어
└── docker-compose.yml      # 개발 환경`}</pre>
        </div>
      </div>

      {/* 구현 가이드라인 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-red-600" />
          구현 가이드라인 및 주의사항
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h3 className="font-semibold mb-2 text-red-800">보안 필수사항</h3>
            <ul className="space-y-1 text-sm text-red-700">
              <li>• MQTT는 TLS 암호화 필수 (production)</li>
              <li>• API는 JWT 토큰 인증 구현</li>
              <li>• 디바이스는 고유 ID와 시크릿 키 사용</li>
              <li>• SQL Injection 방지 (Parameterized Query)</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h3 className="font-semibold mb-2 text-yellow-800">성능 최적화</h3>
            <ul className="space-y-1 text-sm text-yellow-700">
              <li>• Redis로 디바이스 상태 캐싱 (TTL 60초)</li>
              <li>• WebSocket으로 실시간 업데이트</li>
              <li>• 센서 데이터는 배치로 전송 (5초 간격)</li>
              <li>• DB 연결 풀링 설정 필수</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold mb-2 text-green-800">개발 순서</h3>
            <ol className="space-y-1 text-sm text-green-700 list-decimal list-inside">
              <li>Docker 환경 설정 (PostgreSQL, Redis, Mosquitto)</li>
              <li>Backend API 기본 구조 구축</li>
              <li>디바이스 등록/인증 구현</li>
              <li>실시간 데이터 수집 파이프라인</li>
              <li>Frontend 대시보드 개발</li>
              <li>간단한 자동화 규칙 엔진</li>
            </ol>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold mb-2 text-blue-800">테스트 전략</h3>
            <ul className="space-y-1 text-sm text-blue-700">
              <li>• MQTT 시뮬레이터로 디바이스 테스트</li>
              <li>• Jest로 Backend 유닛 테스트</li>
              <li>• Cypress로 Frontend E2E 테스트</li>
              <li>• 부하 테스트 (100개 디바이스 시뮬레이션)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 팀 역할 분담 */}
      <div className="mt-8 p-4 bg-purple-50 rounded-lg border border-purple-200">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Users className="w-5 h-5 text-purple-600" />
          V1 팀 역할 분담 (3개월)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="mb-1"><span className="font-medium">임베디드 개발자:</span> ESP32 펌웨어, MQTT 클라이언트</p>
            <p className="mb-1"><span className="font-medium">풀스택 개발자 1:</span> Backend API, 데이터베이스 설계</p>
            <p className="mb-1"><span className="font-medium">풀스택 개발자 2:</span> Frontend 대시보드, 실시간 업데이트</p>
          </div>
          <div>
            <p className="mb-1"><span className="font-medium">디자이너:</span> UI/UX 설계, 대시보드 디자인</p>
            <p className="mb-1"><span className="font-medium">회로 개발자:</span> 센서 통합, 하드웨어 프로토타입</p>
            <p className="mb-1"><span className="font-medium">AI 담당:</span> V2 준비, 자동화 규칙 설계</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IoTV1Architecture;