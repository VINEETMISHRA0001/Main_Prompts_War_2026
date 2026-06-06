import { SageAIHub } from '@/components/sage-ai/SageAIHub'
import type { EmbeddedPageProps } from '@/constants/desktopApps'

export default function SageAIPage({ embedded }: EmbeddedPageProps = {}) {
  return <SageAIHub embedded={embedded} />
}
