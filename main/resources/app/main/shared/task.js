import { TaskIndicator } from '../../shared/elements.js'

/**
 * @param {() => Promise<{ title: string; message: string } | void>} task
 */
export default function (task) {
  const taskIndicator = document.createElement('task-indicator')
  if (!(taskIndicator instanceof TaskIndicator))
    throw new TypeError('type-indicator element')
  taskIndicator.task = task
  document.body.shadowRoot?.appendChild(taskIndicator)
}
