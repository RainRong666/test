import type { SubmitAttackRequest } from '../../api/types'

export function validateAttackRequest(
  payload: SubmitAttackRequest,
  authorizedUse: boolean,
): string[] {
  const errors: string[] = []

  if (!payload.objective.trim()) {
    errors.push('目标为必填项。')
  } else if (payload.objective.length > 1000) {
    errors.push('目标不得超过 1000 个字符。')
  }

  if (payload.models.length === 0) {
    errors.push('至少选择一个模型。')
  }

  if (payload.temperature < 0 || payload.temperature > 2) {
    errors.push('Temperature 必须在 0 到 2 之间。')
  }

  if (payload.max_turns < 2 || payload.max_turns > 20) {
    errors.push('最大轮次必须在 2 到 20 之间。')
  }

  if (payload.seed !== null && !Number.isInteger(payload.seed)) {
    errors.push('Seed 必须为整数。')
  }

  if (!authorizedUse) {
    errors.push('提交前请确认已获授权的防御性使用。')
  }

  return errors
}