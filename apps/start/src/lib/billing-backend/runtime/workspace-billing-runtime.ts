import { Layer } from 'effect'
import { makeRuntimeRunner } from '@/lib/server-effect'
import { WorkspaceBillingService } from '../services/workspace-billing.service'

const layer = Layer.mergeAll(WorkspaceBillingService.layer)
const runtime = makeRuntimeRunner(layer)

export const WorkspaceBillingRuntime = {
  layer,
  run: runtime.run,
  runExit: runtime.runExit,
  dispose: runtime.dispose,
}
