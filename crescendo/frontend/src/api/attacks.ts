import type {
    SubmitAttackRequest,
    SubmitAttackResponse,
  } from './types'
  
  const MOCK_DELAY_MS = 700
  
  export async function submitAttack(
    payload: SubmitAttackRequest,
  ): Promise<SubmitAttackResponse> {
    // 模拟网络延迟
    await new Promise<void>((resolve) => window.setTimeout(resolve, MOCK_DELAY_MS))
  
    // 可重复的失败测试路径
    if (payload.objective.includes('[mock-error]')) {
      throw new Error('模拟提交失败')
    }
  
    return {
      job_id: `mock-job-${Date.now()}`,
      status: 'queued',
      objective: payload.objective,
      strategy: payload.strategy,
      models: payload.models,
      max_turns: payload.max_turns,
    }
  }