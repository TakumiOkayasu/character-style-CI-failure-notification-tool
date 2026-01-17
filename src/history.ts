/**
 * KV保存キー
 */
const HISTORY_KEY = 'tone_history';

/**
 * Workers KVから口調履歴を読み込み
 * @param kv KVNamespace
 * @returns 履歴配列(最大5件)
 */
export async function loadHistory(kv: KVNamespace): Promise<string[]> {
  try {
    const stored = await kv.get(HISTORY_KEY, 'json');
    return Array.isArray(stored) ? stored : [];
  } catch {
    // KV読み込み失敗時は空配列
    return [];
  }
}

/**
 * Workers KVに口調履歴を保存
 * @param kv KVNamespace
 * @param history 履歴配列
 */
export async function saveHistory(kv: KVNamespace, history: string[]): Promise<void> {
  // 最新5件のみ保持
  const toSave = history.slice(-5);
  await kv.put(HISTORY_KEY, JSON.stringify(toSave));
}
