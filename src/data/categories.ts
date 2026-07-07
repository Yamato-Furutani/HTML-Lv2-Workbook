import type { Category } from '../types'

export const categories: Category[] = [
  {
    id: 'javascript',
    order: 1,
    name: '2.1 JavaScript',
    shortName: 'JavaScript',
    description: '変数・関数・クロージャ・クラス構文・非同期処理などプログラミング言語の基礎',
    color: '#f7df1e',
  },
  {
    id: 'web-api',
    order: 2,
    name: '2.2 WebブラウザにおけるJavaScript API',
    shortName: 'Web API',
    description: 'DOM操作・イベント処理・Web Componentsなどブラウザ環境での実装',
    color: '#3b82f6',
  },
  {
    id: 'graphics-animation',
    order: 3,
    name: '2.3 グラフィックス・アニメーション',
    shortName: 'グラフィックス',
    description: 'Canvas・SVG・WebGL・CSSアニメーションなどビジュアル表現技術',
    color: '#a855f7',
  },
  {
    id: 'multimedia',
    order: 4,
    name: '2.4 マルチメディア',
    shortName: 'マルチメディア',
    description: 'audio/video要素やWeb Audio APIなど音声・動画の取り扱い',
    color: '#ec4899',
  },
  {
    id: 'storage',
    order: 5,
    name: '2.5 ストレージ',
    shortName: 'ストレージ',
    description: 'Cookie・Web Storage・IndexedDB・File APIなどデータ保存機能',
    color: '#22c55e',
  },
  {
    id: 'communication',
    order: 6,
    name: '2.6 通信',
    shortName: '通信',
    description: 'Fetch・WebSocket・Server-Sent Events・CORSなどネットワーク通信技術',
    color: '#06b6d4',
  },
  {
    id: 'device-access',
    order: 7,
    name: '2.7 デバイスアクセス',
    shortName: 'デバイスアクセス',
    description: 'Geolocation・Device Orientation・Pointer Eventsなど端末機能へのアクセス',
    color: '#f97316',
  },
  {
    id: 'performance-offline',
    order: 8,
    name: '2.8 パフォーマンスとオフライン',
    shortName: 'パフォーマンス',
    description: 'Service Worker・Web Worker・Performance APIなど最適化とオフライン機能',
    color: '#14b8a6',
  },
  {
    id: 'security',
    order: 9,
    name: '2.9 セキュリティモデル',
    shortName: 'セキュリティ',
    description: '同一オリジンポリシー・CORS・CSP・XSS対策などセキュリティ関連技術',
    color: '#ef4444',
  },
  {
    id: 'comprehensive',
    order: 10,
    name: '2.10 レベル2に関する総合問題',
    shortName: '総合問題',
    description: '複数分野を組み合わせた複合的な問題演習',
    color: '#6366f1',
  },
]

export const categoryMap: Record<string, Category> = Object.fromEntries(
  categories.map((c) => [c.id, c]),
)
