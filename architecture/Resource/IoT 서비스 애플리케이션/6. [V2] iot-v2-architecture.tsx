import React, { useState } from 'react';
import { 
  Mic, Brain, Speaker, Cpu, Layers, Shield, 
  Activity, Zap, Cloud, Database, GitBranch,
  ArrowRight, AlertCircle, CheckCircle, Users,
  Volume2, MessageSquare, Settings, Globe
} from 'lucide-react';

const IoTV2Architecture = () => {
  const [selectedFeature, setSelectedFeature] = useState('voice-pipeline');
  const [selectedComponent, setSelectedComponent] = useState(null);

  const v2Features = {
    'voice-pipeline': {
      title: 'AI 음성 처리 파이프라인',
      icon: <Mic className="w-5 h-5" />,
      description: '로컬 음성 인식 및 자연어 처리',
      components: [
        {
          name: 'Wake Word Detection',
          tech: 'Porcupine + ESP32-S3',
          code: `// ESP32-S3에서 실행되는 Wake Word 감지
#include "porcupine.h"

void detectWakeWord() {
  if (porcupine_process(audioBuffer) == 1) {
    startListening();
    mqtt.publish("speaker/wake", "detected");
  }
}`,
          flow: 'Always-on listening → "Hey Home" 감지 → 녹음 시작'
        },
        {
          name: 'Speech Recognition',
          tech: 'Whisper (로컬) + Faster Whisper',
          code: `# 로컬 음성 인식 서비스
import whisper
import faster_whisper

class LocalSTT:
    def __init__(self):
        self.model = faster_whisper.WhisperModel(
            "small", device="cpu", compute_type="int8"
        )
    
    async def transcribe(self, audio_data):
        segments, _ = self.model.transcribe(audio_data)
        return " ".join([s.text for s in segments])`,
          flow: '오디오 스트림 → VAD → Whisper STT → 텍스트'
        },
        {
          name: 'Intent Recognition',
          tech: 'spaCy + Custom NER',
          code: `// 의도 인식 및 엔티티 추출
const nlp = require('./nlpService');

async function processIntent(text) {
  const doc = await nlp.process(text);
  
  return {
    intent: doc.intent,        // "control_device"
    entities: doc.entities,    // {device: "거실 조명", action: "켜기"}
    confidence: doc.confidence
  };
}`,
          flow: '텍스트 → 의도 분류 → 엔티티 추출 → 명령 매핑'
        },
        {
          name: 'Text-to-Speech',
          tech: 'Piper TTS (로컬)',
          code: `# 로컬 TTS 서비스
from piper import PiperVoice

class LocalTTS:
    def __init__(self):
        self.voice = PiperVoice.load("ko_KR-kss-medium")
    
    def synthesize(self, text):
        audio = self.voice.synthesize(text)
        return audio  # PCM audio data`,
          flow: '응답 텍스트 → Piper TTS → 오디오 스트림 → 스피커'
        }
      ]
    },
    'advanced-automation': {
      title: '고급 자동화 엔진',
      icon: <Brain className="w-5 h-5" />,
      description: '컨텍스트 기반 지능형 자동화',
      components: [
        {
          name: 'Scene Management',
          tech: 'Node.js + Rule Engine',
          code: `// 씬(Scene) 기반 자동화
class SceneManager {
  async activateScene(sceneName, context) {
    const scene = await Scene.findOne({ name: sceneName });
    
    // 컨텍스트 기반 조정
    const actions = this.adjustForContext(scene.actions, context);
    
    // 병렬 실행
    await Promise.all(actions.map(action => 
      this.executeAction(action)
    ));
  }
}`,
          purpose: '복잡한 시나리오 관리'
        },
        {
          name: 'Routine Engine',
          tech: 'Node-RED + Custom Nodes',
          code: `// 시간 기반 루틴
const routines = {
  morning: {
    trigger: { time: "07:00", days: ["mon-fri"] },
    actions: [
      { device: "커튼", action: "open", delay: 0 },
      { device: "커피머신", action: "start", delay: 300 },
      { tts: "좋은 아침입니다. 오늘의 날씨는..." }
    ]
  }
};`,
          purpose: '일상 루틴 자동화'
        },
        {
          name: 'Adaptive Learning',
          tech: 'TensorFlow.js + Edge ML',
          code: `// 사용 패턴 학습
class AdaptiveAutomation {
  async learnPattern(userId, events) {
    const features = this.extractFeatures(events);
    const prediction = await this.model.predict(features);
    
    if (prediction.confidence > 0.8) {
      await this.suggestAutomation(userId, prediction);
    }
  }
}`,
          purpose: '사용자 행동 학습'
        }
      ]
    },
    'edge-computing': {
      title: '엣지 컴퓨팅 강화',
      icon: <Cpu className="w-5 h-5" />,
      description: '로컬 처리 능력 극대화',
      components: [
        {
          name: 'Local Model Server',
          tech: 'ONNX Runtime + FastAPI',
          code: `# 엣지 AI 모델 서버
from fastapi import FastAPI
import onnxruntime as ort

app = FastAPI()

class EdgeAI:
    def __init__(self):
        self.session = ort.InferenceSession(
            "models/home_assistant.onnx",
            providers=['CPUExecutionProvider']
        )
    
    @app.post("/inference")
    async def infer(self, data):
        return self.session.run(None, {
            "input": data.input_tensor
        })`,
          purpose: '로컬 AI 추론'
        },
        {
          name: 'Event Processing',
          tech: 'Apache Pulsar (경량화)',
          code: `// 실시간 이벤트 처리
const pulsar = require('pulsar-client');

class EventProcessor {
  async processStream() {
    const consumer = await this.client.subscribe({
      topic: 'device-events',
      subscription: 'edge-processor'
    });
    
    for await (const msg of consumer) {
      await this.handleEvent(msg.getData());
    }
  }
}`,
          purpose: '고속 이벤트 처리'
        }
      ]
    },
    'multi-protocol': {
      title: '멀티 프로토콜 지원',
      icon: <Globe className="w-5 h-5" />,
      description: 'Matter/Thread 통합',
      components: [
        {
          name: 'Matter Bridge',
          tech: 'matter.js + Node.js',
          code: `// Matter 프로토콜 브릿지 (예제)
class MatterBridge {
  constructor() {
    this.matterServer = null; // Matter 서버 인스턴스
    this.endpoints = new Map();
  }
  
  async bridgeDevice(legacyDevice) {
    // Matter Endpoint 구성 (의사코드)
    const endpoint = {
      deviceType: 'LIGHT',
      clusters: ['OnOff', 'LevelControl'],
      handlers: new Map()
    };
    
    // 레거시 디바이스를 Matter로 노출
    endpoint.handlers.set('toggle', async () => {
      await legacyDevice.toggle();
      return { status: 'success' };
    });
    
    this.endpoints.set(legacyDevice.id, endpoint);
    console.log(\`Matter bridge created for \${legacyDevice.name}\`);
  }
}`,
          purpose: 'Matter 호환성'
        },
        {
          name: 'Thread Network',
          tech: 'OpenThread + ESP32-H2',
          code: `// Thread 네트워크 설정
#include <openthread/thread.h>

void setupThreadNetwork() {
  otInstance *instance = otInstanceInitSingle();
  
  // Thread 네트워크 구성
  otThreadSetNetworkName(instance, "SmartHome");
  otThreadSetExtendedPanId(instance, extPanId);
  
  // Border Router 모드
  otBorderRouterInit(instance);
}`,
          purpose: 'Thread 메시 네트워크'
        }
      ]
    }
  };

  const implementationPhases = {
    phase1: {
      title: 'Phase 1: 음성 인터페이스 (1개월)',
      tasks: [
        'ESP32-S3 기반 AI 스피커 하드웨어 제작',
        'Wake Word Detection 구현',
        'Whisper 로컬 STT 통합',
        'Piper TTS 한국어 모델 최적화',
        '기본 음성 명령 처리'
      ],
      deliverables: [
        '음성으로 조명 켜기/끄기',
        '온도/습도 음성 조회',
        '간단한 대화형 인터페이스'
      ]
    },
    phase2: {
      title: 'Phase 2: 지능형 자동화 (1개월)',
      tasks: [
        'Scene/Routine 관리 시스템',
        'Node-RED 커스텀 노드 개발',
        '컨텍스트 인식 자동화',
        '음성 기반 자동화 설정',
        '학습 기반 추천 시스템'
      ],
      deliverables: [
        '"아침 루틴 시작해줘" 명령',
        '위치/시간 기반 자동 실행',
        '사용 패턴 기반 제안'
      ]
    },
    phase3: {
      title: 'Phase 3: 프로토콜 확장 (1개월)',
      tasks: [
        'Matter 컨트롤러 구현',
        'Thread Border Router 설정',
        '레거시 디바이스 브릿징',
        '멀티 프로토콜 테스트',
        '상호운용성 검증'
      ],
      deliverables: [
        'Matter 인증 디바이스 지원',
        'Thread 메시 네트워크',
        '타사 제품 통합'
      ]
    }
  };

  const technicalChallenges = [
    {
      challenge: '음성 인식 정확도',
      solution: '한국어 특화 모델 파인튜닝 + 노이즈 캔슬링',
      priority: 'High'
    },
    {
      challenge: '응답 지연 시간',
      solution: '엣지 처리 + 모델 경량화 (INT8 양자화)',
      priority: 'High'
    },
    {
      challenge: '다중 사용자 구분',
      solution: '화자 인식 모델 추가 (향후 구현)',
      priority: 'Medium'
    },
    {
      challenge: 'Matter 호환성',
      solution: '점진적 마이그레이션 + 브릿지 패턴',
      priority: 'Medium'
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        스마트홈 IoT V2 - AI 스피커 & 지능형 자동화
      </h1>

      {/* V2 주요 업그레이드 */}
      <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Zap className="w-6 h-6 text-purple-600" />
          V2 핵심 업그레이드
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <Speaker className="w-8 h-8 text-purple-500 mb-2" />
            <h3 className="font-semibold mb-1">AI 스피커</h3>
            <p className="text-sm text-gray-600">음성 명령으로 전체 시스템 제어</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <Brain className="w-8 h-8 text-blue-500 mb-2" />
            <h3 className="font-semibold mb-1">지능형 자동화</h3>
            <p className="text-sm text-gray-600">컨텍스트 인식 & 학습 기반</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <Shield className="w-8 h-8 text-green-500 mb-2" />
            <h3 className="font-semibold mb-1">로컬 우선 처리</h3>
            <p className="text-sm text-gray-600">프라이버시 보호 & 저지연</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <Globe className="w-8 h-8 text-orange-500 mb-2" />
            <h3 className="font-semibold mb-1">Matter/Thread</h3>
            <p className="text-sm text-gray-600">차세대 표준 프로토콜 지원</p>
          </div>
        </div>
      </div>

      {/* 기능별 상세 구현 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Layers className="w-6 h-6 text-blue-600" />
          V2 핵심 기능 구현
        </h2>
        
        <div className="mb-4 flex gap-2 flex-wrap">
          {Object.keys(v2Features).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedFeature(key)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                selectedFeature === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <span className="flex items-center gap-2">
                {v2Features[key].icon}
                {v2Features[key].title}
              </span>
            </button>
          ))}
        </div>

        {selectedFeature && (
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="font-semibold text-lg mb-2">
              {v2Features[selectedFeature].title}
            </h3>
            <p className="text-gray-600 mb-4">
              {v2Features[selectedFeature].description}
            </p>
            
            <div className="space-y-4">
              {v2Features[selectedFeature].components.map((comp, idx) => (
                <div key={idx} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{comp.name}</h4>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {comp.tech}
                    </span>
                  </div>
                  
                  {comp.flow && (
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">플로우:</span> {comp.flow}
                    </p>
                  )}
                  
                  {comp.purpose && (
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">목적:</span> {comp.purpose}
                    </p>
                  )}
                  
                  <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
                    <code>{comp.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* AI 스피커 하드웨어 스펙 */}
      <div className="mb-8 bg-purple-50 p-6 rounded-lg border border-purple-200">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Mic className="w-5 h-5 text-purple-600" />
          AI 스피커 하드웨어 구성
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">핵심 컴포넌트</h4>
            <ul className="space-y-1 text-sm">
              <li>• <strong>MCU:</strong> ESP32-S3 (AI 가속 지원)</li>
              <li>• <strong>마이크:</strong> INMP441 MEMS 배열 (4개)</li>
              <li>• <strong>스피커:</strong> MAX98357A I2S 앰프 + 3W 스피커</li>
              <li>• <strong>LED:</strong> WS2812B RGB 링 (상태 표시)</li>
              <li>• <strong>메모리:</strong> 8MB PSRAM (오디오 버퍼)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">소프트웨어 스택</h4>
            <ul className="space-y-1 text-sm">
              <li>• <strong>Wake Word:</strong> Porcupine (온디바이스)</li>
              <li>• <strong>음성 인식:</strong> Whisper Small (엣지 서버)</li>
              <li>• <strong>자연어 처리:</strong> spaCy + Custom NER</li>
              <li>• <strong>음성 합성:</strong> Piper TTS (한국어)</li>
              <li>• <strong>오디오 처리:</strong> ESP-ADF Framework</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 구현 단계 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <GitBranch className="w-6 h-6 text-green-600" />
          단계별 구현 계획
        </h2>
        <div className="space-y-4">
          {Object.values(implementationPhases).map((phase, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg border">
              <h3 className="font-semibold mb-3">{phase.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">주요 작업</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {phase.tasks.map((task, i) => (
                      <li key={i}>• {task}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">결과물</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {phase.deliverables.map((deliverable, i) => (
                      <li key={i}>✓ {deliverable}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 기술적 도전 과제 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-orange-600" />
          기술적 도전 과제
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {technicalChallenges.map((item, idx) => (
            <div key={idx} className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-orange-900">{item.challenge}</h4>
                <span className={`text-xs px-2 py-1 rounded ${
                  item.priority === 'High' 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {item.priority}
                </span>
              </div>
              <p className="text-sm text-gray-700">
                <span className="font-medium">해결책:</span> {item.solution}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 새로운 시스템 플로우 */}
      <div className="mb-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-600" />
          음성 명령 처리 플로우
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-3">
            <span className="font-medium w-32">사용자</span>
            <ArrowRight className="w-4 h-4" />
            <span className="flex-1">"헤이 홈, 거실 불 켜줘"</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-medium w-32">Wake Word</span>
            <ArrowRight className="w-4 h-4" />
            <span className="flex-1">Porcupine가 "헤이 홈" 감지 → 녹음 시작</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-medium w-32">STT</span>
            <ArrowRight className="w-4 h-4" />
            <span className="flex-1">Whisper로 "거실 불 켜줘" 변환</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-medium w-32">NLU</span>
            <ArrowRight className="w-4 h-4" />
            <span className="flex-1">의도: control_device, 엔티티: {`{room: "거실", device: "조명", action: "on"}`}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-medium w-32">실행</span>
            <ArrowRight className="w-4 h-4" />
            <span className="flex-1">MQTT 명령 전송 → 디바이스 제어</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-medium w-32">TTS</span>
            <ArrowRight className="w-4 h-4" />
            <span className="flex-1">Piper TTS로 "거실 조명을 켰습니다" 음성 출력</span>
          </div>
        </div>
      </div>

      {/* 팀 역할 업데이트 */}
      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Users className="w-5 h-5 text-green-600" />
          V2 팀 역할 분담
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="mb-1"><span className="font-medium">AI 담당:</span> 음성 처리 파이프라인, NLU 모델 개발</p>
            <p className="mb-1"><span className="font-medium">임베디드:</span> ESP32-S3 펌웨어, Wake Word 최적화</p>
            <p className="mb-1"><span className="font-medium">회로 개발:</span> AI 스피커 하드웨어 설계 및 제작</p>
          </div>
          <div>
            <p className="mb-1"><span className="font-medium">풀스택 1:</span> 음성 서비스 API, 자동화 엔진 고도화</p>
            <p className="mb-1"><span className="font-medium">풀스택 2:</span> Matter/Thread 통합, 프로토콜 브릿지</p>
            <p className="mb-1"><span className="font-medium">디자이너:</span> 음성 UX 설계, 피드백 시스템</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IoTV2Architecture;