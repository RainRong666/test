import { useState, type FormEvent } from 'react'

import { submitAttack } from '../../api/attacks'
import type {
  ModelInfo,
  StrategyName,
  SubmitAttackRequest,
  SubmitAttackResponse,
} from '../../api/types'
import { validateAttackRequest } from '../../features/attack/validation'

interface AttackComposerProps {
  models: ModelInfo[]
}

export function AttackComposer({ models }: AttackComposerProps) {
    const [objective, setObjective] = useState('')
    const [selectedModels, setSelectedModels] = useState<string[]>([])
    const [strategy, setStrategy] = useState<StrategyName>('template')
    const [temperature, setTemperature] = useState(0.7)
    const [maxTurns, setMaxTurns] = useState(10)
    const [seed, setSeed] = useState('')
    const [authorizedUse, setAuthorizedUse] = useState(false)
  
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState<string[]>([])
    const [result, setResult] = useState<SubmitAttackResponse | null>(null)
  
    // 在此处插入步骤 6 和 7 的处理函数。
    function toggleModel(modelId: string) {
        setSelectedModels((current) =>
          current.includes(modelId)
            ? current.filter((id) => id !== modelId)
            : [...current, modelId],
        )
      }
      async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
      
        const payload: SubmitAttackRequest = {
          objective: objective.trim(),
          models: selectedModels,
          strategy,
          temperature,
          max_turns: maxTurns,
          seed: seed.trim() === '' ? null : Number(seed),
        }
      
        const nextErrors = validateAttackRequest(payload, authorizedUse)
        setErrors(nextErrors)
        setResult(null)
      
        if (nextErrors.length > 0) {
          return
        }
      
        setIsSubmitting(true)
      
        try {
          const response = await submitAttack(payload)
          setResult(response)
        } catch (error) {
          const message = error instanceof Error ? error.message : '未知错误'
          setErrors([message])
        } finally {
          setIsSubmitting(false)
        }
      }
    // 用步骤 8 的返回块替换这些注释。
    return (
        <section className="attack-composer">
          <h2>创建评估作业</h2>
          <p className="form-intro">
            配置一次已获授权的防御性评估。此步骤使用前端模拟。
          </p>
      
          <form onSubmit={handleSubmit}>
            <label className="form-field">
              <span>评估目标</span>
              <textarea
                value={objective}
                maxLength={1000}
                rows={5}
                placeholder="描述一个安全且已授权的评估目标"
                onChange={(event) => setObjective(event.target.value)}
                disabled={isSubmitting}
              />
              <small>{objective.length}/1000</small>
            </label>
      
            <fieldset className="form-field">
              <legend>目标模型</legend>
              <div className="model-options">
                {models.map((model) => (
                  <label className="model-option" key={model.id}>
                    <input
                      type="checkbox"
                      checked={selectedModels.includes(model.id)}
                      onChange={() => toggleModel(model.id)}
                      disabled={isSubmitting}
                    />
                    <span>
                      <strong>{model.id}</strong>
                      <small>{model.huggingface_id}</small>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
      
            <div className="form-grid">
              <label className="form-field">
                <span>策略</span>
                <select
                  value={strategy}
                  onChange={(event) => setStrategy(event.target.value as StrategyName)}
                  disabled={isSubmitting}
                >
                  <option value="template">Template</option>
                  <option value="reactive">Reactive</option>
                  <option value="gemini">Gemini</option>
                </select>
              </label>
      
              <label className="form-field">
                <span>最大轮次</span>
                <input
                  type="number"
                  min={2}
                  max={20}
                  value={maxTurns}
                  onChange={(event) => setMaxTurns(Number(event.target.value))}
                  disabled={isSubmitting}
                />
              </label>
      
              <label className="form-field">
                <span>Temperature: {temperature.toFixed(1)}</span>
                <input
                  type="range"
                  min={0}
                  max={2}
                  step={0.1}
                  value={temperature}
                  onChange={(event) => setTemperature(Number(event.target.value))}
                  disabled={isSubmitting}
                />
              </label>
      
              <label className="form-field">
                <span>Seed（可选）</span>
                <input
                  type="number"
                  step={1}
                  value={seed}
                  placeholder="随机"
                  onChange={(event) => setSeed(event.target.value)}
                  disabled={isSubmitting}
                />
              </label>
            </div>
      
            <label className="authorization-check">
              <input
                type="checkbox"
                checked={authorizedUse}
                onChange={(event) => setAuthorizedUse(event.target.checked)}
                disabled={isSubmitting}
              />
              <span>
                我只会将此工具用于已获授权的防御性评估，且不会提交机密或个人信息。
              </span>
            </label>
      
            <button className="submit-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? '提交中...' : '启动模拟评估'}
            </button>
          </form>
      
          {errors.length > 0 && (
            <div className="form-message error-message" role="alert">
              <strong>提交被阻止</strong>
              <ul>
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}
      
          {result && (
            <div className="form-message success-message">
              <strong>模拟作业已接受</strong>
              <dl>
                <div><dt>Job ID</dt><dd>{result.job_id}</dd></div>
                <div><dt>状态</dt><dd>{result.status}</dd></div>
                <div><dt>策略</dt><dd>{result.strategy}</dd></div>
                <div><dt>模型</dt><dd>{result.models.join(', ')}</dd></div>
              </dl>
            </div>
          )}
        </section>
      )
  }