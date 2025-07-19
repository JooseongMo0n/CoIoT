import React, { useState } from 'react';
import { 
  Boxes, Brain, Shield, Cpu, Globe, Sparkles,
  Network, Eye, Zap, Atom, Layers, Cloud,
  Lock, Activity, GitBranch, Settings, Glasses,
  Smartphone, Binary, Rocket, Pentagon
} from 'lucide-react';

const IoTV4Architecture = () => {
  const [selectedTechnology, setSelectedTechnology] = useState('digital-twin');
  const [visualMode, setVisualMode] = useState('architecture');

  const v4Technologies = {
    'digital-twin': {
      title: '디지털 트윈',
      icon: <Boxes className="w-5 h-5" />,
      description: '물리적 공간의 실시간 가상 복제',
      components: [
        {
          name: '3D 공간 모델링',
          tech: 'Unity + Cesium + WebGL',
          features: [
            '실시간 3D 렌더링',
            '물리 시뮬레이션',
            'IoT 데이터 시각화',
            '공간 분석 도구'
          ],
          code: `// 디지털 트윈 엔진
class DigitalTwinEngine {
  constructor() {
    this.scene = new THREE.Scene();
    this.physics = new CANNON.World();
    this.iotDataStream = new DataStream();
  }

  async createTwin(physicalSpace) {
    // 3D 모델 로드
    const model = await this.loadModel(physicalSpace.modelUrl);
    
    // IoT 디바이스 매핑
    physicalSpace.devices.forEach(device => {
      const virtualDevice = this.createVirtualDevice(device);
      virtualDevice.bindToReal(device.id);
      
      // 실시간 상태 동기화
      this.iotDataStream.subscribe(device.id, (data) => {
        virtualDevice.updateState(data);
        this.runSimulation(virtualDevice, data);
      });
    });
    
    return this.scene;
  }
}`
        },
        {
          name: '예측 시뮬레이션',
          tech: 'TensorFlow.js + PhysX',
          features: [
            '에너지 흐름 시뮬레이션',
            '공간 최적화 제안',
            'What-if 시나리오',
            '예측 유지보수'
          ],
          code: `// 시뮬레이션 엔진
async runPredictiveSimulation(scenario) {
  const simulation = new PhysicsSimulation({
    timeStep: 0.016,
    gravity: [0, -9.81, 0]
  });
  
  // ML 모델로 미래 상태 예측
  const predictions = await this.mlModel.predict({
    currentState: this.getCurrentState(),
    scenario: scenario,
    timeHorizon: '24h'
  });
  
  // 시뮬레이션 실행
  for (const prediction of predictions) {
    simulation.step(prediction);
    await this.visualize(simulation.state);
  }
  
  return simulation.getOptimizations();
}`
        }
      ]
    },
    'blockchain-trust': {
      title: '블록체인 신뢰 네트워크',
      icon: <Network className="w-5 h-5" />,
      description: '탈중앙화 디바이스 신원 및 신뢰 관리',
      components: [
        {
          name: 'Device Identity Chain',
          tech: 'Hyperledger Fabric + IPFS',
          features: [
            '디바이스 DID (분산 신원)',
            '제조사 인증서 체인',
            '소유권 이력 추적',
            '펌웨어 무결성 검증'
          ],
          code: `// 블록체인 디바이스 레지스트리
class DeviceIdentityChain {
  async registerDevice(device) {
    // DID 생성
    const did = await this.createDID({
      publicKey: device.publicKey,
      manufacturer: device.manufacturer,
      model: device.model,
      serialNumber: device.serialNumber
    });
    
    // 스마트 컨트랙트 배포
    const contract = await this.deployContract({
      type: 'DeviceIdentity',
      did: did,
      metadata: {
        capabilities: device.capabilities,
        certifications: device.certifications,
        ownershipHistory: []
      }
    });
    
    // IPFS에 상세 정보 저장
    const ipfsHash = await this.ipfs.add({
      deviceInfo: device,
      timestamp: Date.now(),
      signature: this.sign(device)
    });
    
    return { did, contract, ipfsHash };
  }
}`
        },
        {
          name: 'Trust Score System',
          tech: 'Chainlink Oracles + Smart Contracts',
          features: [
            '디바이스 평판 시스템',
            '행동 기반 신뢰도',
            '제조사 신뢰도 집계',
            '자동 격리 메커니즘'
          ],
          code: `// 신뢰도 평가 시스템
contract DeviceTrustScore {
  mapping(address => uint256) public trustScores;
  mapping(address => TrustHistory[]) public history;
  
  function updateTrustScore(
    address deviceDID,
    uint256 behaviorScore,
    uint256 securityScore,
    uint256 reliabilityScore
  ) external onlyOracle {
    uint256 newScore = calculateWeightedScore(
      behaviorScore,
      securityScore,
      reliabilityScore
    );
    
    trustScores[deviceDID] = newScore;
    history[deviceDID].push(TrustHistory({
      score: newScore,
      timestamp: block.timestamp,
      factors: [behaviorScore, securityScore, reliabilityScore]
    }));
    
    emit TrustScoreUpdated(deviceDID, newScore);
  }
}`
        }
      ]
    },
    'ar-vr-interface': {
      title: 'AR/VR 인터페이스',
      icon: <Glasses className="w-5 h-5" />,
      description: '공간 컴퓨팅 기반 직관적 제어',
      components: [
        {
          name: 'AR 제어 시스템',
          tech: 'ARCore/ARKit + WebXR',
          features: [
            '공간 제스처 인식',
            '가상 컨트롤 패널',
            '실시간 데이터 오버레이',
            '다중 사용자 협업'
          ],
          code: `// AR 컨트롤러
class ARControlSystem {
  async initializeAR() {
    this.xrSession = await navigator.xr.requestSession('immersive-ar', {
      requiredFeatures: ['hand-tracking', 'plane-detection'],
      optionalFeatures: ['dom-overlay', 'light-estimation']
    });
    
    // 핸드 트래킹 설정
    this.handTracking = new HandTracking(this.xrSession);
    this.gestureRecognizer = new GestureRecognizer();
    
    // 공간 앵커 생성
    this.spatialAnchors = new Map();
  }
  
  async placeVirtualControl(device) {
    // 디바이스 위치에 가상 UI 배치
    const anchor = await this.createSpatialAnchor(device.position);
    
    const virtualUI = new VirtualControl({
      type: device.type,
      capabilities: device.capabilities,
      theme: 'holographic'
    });
    
    virtualUI.on('gesture', async (gesture) => {
      await this.handleGesture(device, gesture);
    });
    
    this.spatialAnchors.set(device.id, { anchor, ui: virtualUI });
  }
}`
        },
        {
          name: 'VR 관제 센터',
          tech: 'Unity XR + Oculus SDK',
          features: [
            '가상 관제실',
            '3D 데이터 시각화',
            '원격 현장 접속',
            'AI 어시스턴트 아바타'
          ],
          code: `// VR 관제 센터
public class VRControlCenter : MonoBehaviour {
  private XRRig playerRig;
  private Dictionary<string, GameObject> deviceHolograms;
  
  void Start() {
    // VR 환경 초기화
    InitializeVREnvironment();
    LoadDeviceHolograms();
    SetupVoiceCommands();
  }
  
  async void OnDeviceInteraction(GameObject device) {
    // 디바이스 상세 정보 표시
    var hologram = CreateDetailedHologram(device);
    
    // 제스처 기반 제어
    var gesture = await CaptureHandGesture();
    if (gesture.type == GestureType.Pinch) {
      ToggleDevice(device);
    } else if (gesture.type == GestureType.Swipe) {
      ShowDeviceAnalytics(device);
    }
  }
}`
        }
      ]
    },
    'autonomous-ai': {
      title: '자율 운영 AI',
      icon: <Brain className="w-5 h-5" />,
      description: '완전 자동화된 스마트홈 운영',
      components: [
        {
          name: 'Self-Learning System',
          tech: 'Reinforcement Learning + AutoML',
          features: [
            '자가 학습 최적화',
            '이상 상황 자율 대응',
            '예방적 문제 해결',
            '사용자 의도 예측'
          ],
          code: `// 자율 AI 시스템
class AutonomousHomeAI {
  constructor() {
    this.rlAgent = new ReinforcementLearningAgent({
      algorithm: 'PPO',
      stateSpace: this.defineStateSpace(),
      actionSpace: this.defineActionSpace(),
      rewardFunction: this.customRewardFunction
    });
    
    this.autoML = new AutoMLPipeline({
      targetMetric: 'user_satisfaction',
      searchSpace: 'full',
      maxTrials: 1000
    });
  }
  
  async autonomousDecision(context) {
    // 현재 상태 분석
    const state = await this.analyzeEnvironment(context);
    
    // 최적 행동 결정
    const action = this.rlAgent.selectAction(state);
    
    // 사용자 의도 예측
    const userIntent = await this.predictUserIntent(state);
    
    // 행동 조정
    const adjustedAction = this.alignWithIntent(action, userIntent);
    
    // 실행 및 학습
    const result = await this.execute(adjustedAction);
    this.rlAgent.learn(state, adjustedAction, result.reward);
    
    return result;
  }
}`
        },
        {
          name: 'Autonomous Maintenance',
          tech: 'Predictive AI + Robotics',
          features: [
            '자동 진단 및 복구',
            '예측적 부품 교체',
            '자가 치유 시스템',
            '로봇 유지보수 통합'
          ],
          code: `// 자율 유지보수 시스템
class AutonomousMaintenanceSystem {
  async performSelfDiagnosis() {
    const diagnostics = await this.runFullSystemScan();
    
    for (const issue of diagnostics.issues) {
      // 자가 치유 시도
      if (issue.selfHealable) {
        await this.attemptSelfHeal(issue);
      }
      // 예측적 유지보수
      else if (issue.predictedFailure) {
        await this.schedulePreventiveMaintenance(issue);
      }
      // 로봇 디스패치
      else if (issue.requiresPhysical) {
        await this.dispatchMaintenanceRobot(issue);
      }
    }
  }
  
  async attemptSelfHeal(issue) {
    const healingStrategies = [
      this.restartService,
      this.reallocateResources,
      this.switchToBackup,
      this.reconfigureSystem
    ];
    
    for (const strategy of healingStrategies) {
      if (await strategy(issue)) {
        await this.verifyHealing(issue);
        break;
      }
    }
  }
}`
        }
      ]
    },
    'quantum-security': {
      title: '양자 내성 보안',
      icon: <Atom className="w-5 h-5" />,
      description: '양자 컴퓨터 시대 대비 보안',
      components: [
        {
          name: 'Post-Quantum Crypto',
          tech: 'Lattice-based Cryptography',
          features: [
            'CRYSTALS-Kyber 암호화',
            'CRYSTALS-Dilithium 서명',
            '양자 키 분배 (QKD)',
            '하이브리드 암호 시스템'
          ],
          code: `// 양자 내성 암호화
class QuantumResistantCrypto {
  constructor() {
    // NIST 승인 양자 내성 알고리즘
    this.kyber = new KyberKEM({
      securityLevel: 'kyber1024',
      mode: 'CCA-secure'
    });
    
    this.dilithium = new DilithiumSign({
      securityLevel: 'dilithium5',
      mode: 'deterministic'
    });
  }
  
  async encryptData(data, recipientPublicKey) {
    // 하이브리드 암호화 (현재 + 양자 내성)
    const classicalCipher = await this.aesEncrypt(data);
    
    // Kyber KEM으로 키 캡슐화
    const { ciphertext, sharedSecret } = await this.kyber.encapsulate(
      recipientPublicKey
    );
    
    // 포스트 양자 암호화
    const quantumCipher = await this.encryptWithSharedSecret(
      classicalCipher,
      sharedSecret
    );
    
    return {
      ciphertext: quantumCipher,
      encapsulation: ciphertext,
      algorithm: 'hybrid-kyber-aes'
    };
  }
}`
        },
        {
          name: 'Quantum Random Generator',
          tech: 'QRNG Hardware Integration',
          features: [
            '진정한 무작위성',
            '예측 불가능 시드',
            '암호학적 안전성',
            '고속 엔트로피 생성'
          ],
          code: `// 양자 난수 생성기
class QuantumRandomGenerator {
  constructor() {
    this.qrngDevice = new QRNGHardware({
      source: 'photon-detection',
      rate: '1Gbps'
    });
  }
  
  async generateSecureRandom(bytes) {
    // 양자 소스에서 엔트로피 수집
    const quantumEntropy = await this.qrngDevice.getEntropy(bytes * 2);
    
    // 후처리 (von Neumann extractor)
    const processed = this.extractRandomness(quantumEntropy);
    
    // 건강성 검사
    if (!this.healthCheck(processed)) {
      throw new Error('Quantum source unhealthy');
    }
    
    return processed.slice(0, bytes);
  }
}`
        }
      ]
    },
    'edge-ai-swarm': {
      title: 'Edge AI Swarm',
      icon: <Cpu className="w-5 h-5" />,
      description: '분산 엣지 AI 군집 지능',
      components: [
        {
          name: 'Swarm Intelligence',
          tech: 'Distributed AI + Mesh Network',
          features: [
            '집단 의사결정',
            '자율 태스크 분배',
            '군집 학습',
            '장애 자가 복구'
          ],
          code: `// 엣지 AI 군집
class EdgeAISwarm {
  constructor() {
    this.nodes = new Map();
    this.consensus = new ByzantineConsensus();
    this.taskScheduler = new DistributedScheduler();
  }
  
  async joinSwarm(nodeId, capabilities) {
    const node = new SwarmNode({
      id: nodeId,
      capabilities,
      ml: new EdgeMLRuntime(),
      communication: new MeshProtocol()
    });
    
    // 이웃 노드 발견
    const neighbors = await this.discoverNeighbors(node);
    
    // 역할 협상
    const role = await this.negotiateRole(node, neighbors);
    
    // 집단 지능 참여
    node.on('task', async (task) => {
      const result = await this.collaborativeCompute(task, neighbors);
      await this.shareKnowledge(result);
    });
    
    this.nodes.set(nodeId, node);
  }
  
  async collaborativeCompute(task, neighbors) {
    // 태스크 분할
    const subtasks = this.partitionTask(task, neighbors.length + 1);
    
    // 병렬 처리
    const results = await Promise.all(
      subtasks.map((subtask, i) => 
        i === 0 
          ? this.localCompute(subtask)
          : neighbors[i-1].compute(subtask)
      )
    );
    
    // 결과 통합 및 검증
    return this.consensus.aggregate(results);
  }
}`
        }
      ]
    }
  };

  const futureIntegrations = {
    '6g-ready': {
      title: '6G 네트워크 준비',
      features: [
        '1Tbps 데이터 전송',
        '0.1ms 초저지연',
        '홀로그래픽 통신',
        'AI 네이티브 네트워크'
      ]
    },
    'metaverse': {
      title: '메타버스 통합',
      features: [
        '가상 스마트홈 복제',
        '아바타 기반 제어',
        'NFT 디바이스 소유권',
        '가상-현실 동기화'
      ]
    },
    'biointegration': {
      title: '생체 신호 통합',
      features: [
        '뇌파 제어 인터페이스',
        '생체 리듬 동기화',
        '건강 상태 기반 자동화',
        '감정 인식 환경 조정'
      ]
    }
  };

  const v4Metrics = {
    innovation: {
      'AI 자율성': '95%',
      '사용자 개입': '< 5%',
      '예측 정확도': '99.5%',
      '자가 치유율': '98%'
    },
    performance: {
      '응답 시간': '< 10ms',
      '동시 디바이스': '100M+',
      '데이터 처리': '1PB+/일',
      '가용성': '99.999%'
    },
    security: {
      '양자 내성': '완벽',
      '블록체인 검증': '모든 디바이스',
      '제로 트러스트': '완전 구현',
      '프라이버시': '완전 로컬'
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        스마트홈 IoT V4 - 차세대 혁신 기술 플랫폼
      </h1>

      {/* V4 비전 */}
      <div className="mb-8 p-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Rocket className="w-8 h-8" />
          V4 비전: 완전 자율 스마트홈
        </h2>
        <p className="text-lg mb-4">
          인간과 AI가 공존하는 차세대 생활 공간 - 생각만으로 제어되고, 
          스스로 진화하며, 완벽하게 안전한 미래의 집
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/20 p-4 rounded-lg">
            <Sparkles className="w-8 h-8 mb-2" />
            <h3 className="font-semibold mb-1">자율 지능</h3>
            <p className="text-sm">완전 자동화된 의사결정과 자가 최적화</p>
          </div>
          <div className="bg-white/20 p-4 rounded-lg">
            <Shield className="w-8 h-8 mb-2" />
            <h3 className="font-semibold mb-1">양자 보안</h3>
            <p className="text-sm">미래에도 안전한 양자 내성 암호화</p>
          </div>
          <div className="bg-white/20 p-4 rounded-lg">
            <Eye className="w-8 h-8 mb-2" />
            <h3 className="font-semibold mb-1">공간 컴퓨팅</h3>
            <p className="text-sm">AR/VR 기반 직관적 상호작용</p>
          </div>
        </div>
      </div>

      {/* 핵심 기술 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Layers className="w-6 h-6 text-purple-600" />
          V4 핵심 혁신 기술
        </h2>
        
        <div className="mb-4 flex gap-2 flex-wrap">
          {Object.keys(v4Technologies).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedTechnology(key)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                selectedTechnology === key
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {v4Technologies[key].icon}
              {v4Technologies[key].title}
            </button>
          ))}
        </div>

        {selectedTechnology && (
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              {v4Technologies[selectedTechnology].icon}
              {v4Technologies[selectedTechnology].title}
            </h3>
            <p className="text-gray-600 mb-4">
              {v4Technologies[selectedTechnology].description}
            </p>
            
            <div className="space-y-6">
              {v4Technologies[selectedTechnology].components.map((comp, idx) => (
                <div key={idx} className="border-l-4 border-purple-500 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-lg">{comp.name}</h4>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                      {comp.tech}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h5 className="font-medium text-sm mb-2 text-gray-700">주요 기능</h5>
                      <ul className="space-y-1">
                        {comp.features.map((feature, i) => (
                          <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                            <Zap className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {comp.code && (
                      <div>
                        <h5 className="font-medium text-sm mb-2 text-gray-700">구현 예시</h5>
                        <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto">
                          <code>{comp.code}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 미래 통합 기술 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Globe className="w-6 h-6 text-blue-600" />
          미래 기술 통합
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(futureIntegrations).map(([key, integration]) => (
            <div key={key} className="bg-white p-4 rounded-lg border hover:shadow-lg transition-shadow">
              <h3 className="font-semibold mb-2">{integration.title}</h3>
              <ul className="space-y-1">
                {integration.features.map((feature, idx) => (
                  <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                    <Binary className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 아키텍처 다이어그램 */}
      <div className="mb-8 bg-gray-900 p-6 rounded-lg text-white">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Network className="w-6 h-6 text-green-400" />
          V4 시스템 아키텍처
        </h2>
        <div className="font-mono text-sm">
          <pre className="text-green-400">{`
┌─────────────────────────────────────────────────────────────┐
│                      사용자 인터페이스 레이어                    │
│  [AR/VR] ←→ [음성/제스처] ←→ [생체신호] ←→ [메타버스]         │
└───────────────────┬─────────────────────────────────────────┘
                    │
┌───────────────────┴─────────────────────────────────────────┐
│                    자율 AI 오케스트레이션                      │
│  [의사결정 엔진] ←→ [예측 모델] ←→ [자가 학습] ←→ [최적화]    │
└───────────────────┬─────────────────────────────────────────┘
                    │
┌───────────────────┴─────────────────────────────────────────┐
│                      디지털 트윈 레이어                        │
│  [3D 모델링] ←→ [시뮬레이션] ←→ [실시간 동기화] ←→ [분석]     │
└───────────────────┬─────────────────────────────────────────┘
                    │
┌───────────────────┴─────────────────────────────────────────┐
│                    엣지 AI 군집 네트워크                       │
│  [분산 컴퓨팅] ←→ [집단 지능] ←→ [자율 협업] ←→ [연합 학습]   │
└───────────────────┬─────────────────────────────────────────┘
                    │
┌───────────────────┴─────────────────────────────────────────┐
│                  블록체인 신뢰 인프라                          │
│  [DID] ←→ [스마트 컨트랙트] ←→ [신뢰 점수] ←→ [감사 추적]    │
└───────────────────┬─────────────────────────────────────────┘
                    │
┌───────────────────┴─────────────────────────────────────────┐
│                    양자 내성 보안 레이어                        │
│  [PQC 암호화] ←→ [QRNG] ←→ [양자 키 분배] ←→ [격자 기반]     │
└─────────────────────────────────────────────────────────────┘
          `}</pre>
        </div>
      </div>

      {/* 성능 지표 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Activity className="w-6 h-6 text-orange-600" />
          V4 성능 지표
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(v4Metrics).map(([category, metrics]) => (
            <div key={category} className="bg-white p-4 rounded-lg border">
              <h3 className="font-semibold mb-3 capitalize">{category}</h3>
              <div className="space-y-2">
                {Object.entries(metrics).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{key}</span>
                    <span className="font-mono font-medium text-sm">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 구현 타임라인 */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <GitBranch className="w-6 h-6 text-blue-600" />
          V4 구현 로드맵 (12개월)
        </h2>
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="w-24 text-sm font-medium">Q1</div>
            <div className="flex-1 bg-blue-200 rounded p-2 text-sm">
              디지털 트윈 프로토타입 • 양자 내성 암호화 도입
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-24 text-sm font-medium">Q2</div>
            <div className="flex-1 bg-blue-300 rounded p-2 text-sm">
              블록체인 신뢰 네트워크 • AR/VR 인터페이스 베타
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-24 text-sm font-medium">Q3</div>
            <div className="flex-1 bg-blue-400 rounded p-2 text-sm text-white">
              자율 AI 시스템 • Edge AI Swarm 배포
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-24 text-sm font-medium">Q4</div>
            <div className="flex-1 bg-blue-500 rounded p-2 text-sm text-white">
              6G 준비 • 메타버스 통합 • 상용 서비스 시작
            </div>
          </div>
        </div>
      </div>

      {/* 미래 비전 */}
      <div className="mt-8 p-6 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg">
        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-600" />
          2030년의 스마트홈
        </h3>
        <p className="text-gray-700">
          V4 플랫폼이 완성되면, 집은 단순한 거주 공간을 넘어 <strong>생각하고 느끼는 유기체</strong>가 됩니다. 
          사용자의 생체 신호를 읽어 감정 상태에 맞춰 환경을 조정하고, 건강을 예측하여 미리 대응하며, 
          가상과 현실의 경계 없이 메타버스와 연결된 확장된 생활 공간을 제공합니다. 
          모든 것이 <strong>완전히 자율적으로, 그러나 완벽하게 안전하게</strong> 작동하는 미래의 집이 현실이 됩니다.
        </p>
      </div>
    </div>
  );
};

export default IoTV4Architecture;