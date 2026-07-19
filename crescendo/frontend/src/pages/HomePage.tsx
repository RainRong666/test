import { useEffect, useState } from 'react'
import { getModels } from '../api/models'
import type { ModelInfo } from '../api/types'
import { ModelList } from '../components/ModelList'
import { AttackComposer } from '../components/attack/AttackComposer'



export function HomePage() {
  const [models, setModels] = useState<ModelInfo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  {!isLoading && !error && models.length > 0 && (
    <AttackComposer models={models} />
  )}

  useEffect(() => {
    let ignore = false

    async function loadModels() {
      try {
        const result = await getModels()
        if (!ignore) setModels(result.models)
      } catch (cause) {
        const message = cause instanceof Error ? cause.message : '未知错误'
        if (!ignore) setError(message)
      } finally {
        if (!ignore) setIsLoading(false)
      }
    }

    loadModels()

    return () => {
      ignore = true
    }
  }, [])

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <p className="eyebrow">Crescendo 前端</p>
        <h1>AI 安全评估仪表板</h1>
        <p className="lead">
          可选的评估模型已从后端 API 加载。
        </p>

        <div className="models-section">
          <h2>可用模型</h2>
          {isLoading && <p className="status-message">正在加载模型...</p>}
          {error && <p className="error-message">加载模型失败：{error}</p>}
          {!isLoading && !error && <ModelList models={models} />}
        </div>
      </section>
    </main>
  )
}

